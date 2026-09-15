import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import * as cheerio from "cheerio";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { isValidatorRateLimited } from "./_validatorRateLimit.js";

type ValidationType = "seo" | "aeo";
type ValidationStatus = "found" | "partial" | "not-found";

type Result = {
  type: ValidationType;
  score: number;
  status: ValidationStatus;
  title: string;
  description: string;
  details: string[];
  checks: Array<{ label: string; passed: boolean; evidence: string; points: number; maxPoints: number; scored?: boolean }>;
};

type PublicResult = Omit<Result, "details" | "checks">;

const MAX_HTML_BYTES = 1_500_000;

function canShowDetailedResults() {
  return process.env.NODE_ENV !== "production" && process.env.VERCEL_ENV !== "production";
}

function publicResult(result: Result): PublicResult {
  const { details: _details, checks: _checks, ...summary } = result;
  return summary;
}

function isPrivateAddress(address: string) {
  const normalized = address.toLowerCase();
  if (normalized === "::1" || normalized === "0:0:0:0:0:0:0:1" || normalized.startsWith("fe80:") || normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
  const parts = normalized.split(".").map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return false;
  const [a, b] = parts;
  return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224;
}

async function assertPublicUrl(value: string) {
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("invalid_url");
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("invalid_url");
  if (url.hostname === "localhost" || url.hostname.endsWith(".local")) throw new Error("blocked_host");
  const addresses = isIP(url.hostname) ? [{ address: url.hostname }] : await lookup(url.hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) throw new Error("blocked_host");
  return url;
}

async function fetchPublicText(initialUrl: string, optional = false, requestHeaders: Record<string, string> = {}): Promise<{ text: string; url: string; status: number; headers: Record<string, string> } | null> {
  let current = await assertPublicUrl(initialUrl);
  for (let redirects = 0; redirects <= 4; redirects += 1) {
    try {
      const response = await axios.get<string>(current.toString(), {
        timeout: 8000,
        maxRedirects: 0,
        maxContentLength: MAX_HTML_BYTES,
        responseType: "text",
        validateStatus: (status) => status >= 200 && status < 400,
        headers: { "User-Agent": "SapienteAI-VisibilityValidator/1.0", Accept: "text/html,text/plain,application/xml;q=0.9", ...requestHeaders },
      });
      if (response.status >= 300) {
        const location = response.headers.location;
        if (!location) throw new Error("invalid_redirect");
        current = await assertPublicUrl(new URL(location, current).toString());
        continue;
      }
      return {
        text: String(response.data).slice(0, MAX_HTML_BYTES),
        url: current.toString(),
        status: response.status,
        headers: Object.fromEntries(Object.entries(response.headers).map(([key, value]) => [key.toLowerCase(), String(value)])),
      };
    } catch (error) {
      if (optional) return null;
      throw error;
    }
  }
  if (optional) return null;
  throw new Error("too_many_redirects");
}

type SchemaNode = Record<string, unknown>;

function schemaNodes($: cheerio.CheerioAPI) {
  const nodes: SchemaNode[] = [];
  $("script[type='application/ld+json']").each((_, element) => {
    try {
      const visit = (value: unknown): void => {
        if (!value || typeof value !== "object") return;
        if (Array.isArray(value)) return value.forEach(visit);
        const item = value as SchemaNode;
        const type = item["@type"];
        const definesEntity = Object.keys(item).some((key) => key !== "@type" && key !== "@id");
        if (definesEntity && (typeof type === "string" || (Array.isArray(type) && type.some((entry) => typeof entry === "string")))) nodes.push(item);
        Object.values(item).forEach(visit);
      };
      visit(JSON.parse($(element).html() || "{}"));
    } catch { /* malformed JSON-LD is treated as absent */ }
  });
  return nodes;
}

function typesOf(node: SchemaNode) {
  const value = node["@type"];
  return (Array.isArray(value) ? value : [value]).filter((type): type is string => typeof type === "string");
}

function hasSchemaValue(value: unknown) {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value && typeof value === "object");
}

const SCHEMA_PROPERTIES: Record<string, string[]> = {
  Article: ["headline", "author", "datePublished", "image"],
  BlogPosting: ["headline", "author", "datePublished", "image"],
  NewsArticle: ["headline", "author", "datePublished", "image"],
  FAQPage: ["mainEntity"],
  HowTo: ["name", "step"],
  Organization: ["name", "url", "logo", "sameAs"],
  LocalBusiness: ["name", "url", "address", "telephone"],
  Corporation: ["name", "url", "logo", "sameAs"],
  WebSite: ["name", "url", "publisher"],
  Service: ["name", "description", "provider"],
  ItemList: ["name", "itemListElement"],
};

function schemaQuality(nodes: SchemaNode[], acceptedTypes: string[]) {
  const assessments = acceptedTypes.flatMap((type) => nodes
    .filter((node) => typesOf(node).includes(type))
    .map((node) => {
      const properties = SCHEMA_PROPERTIES[type] || [];
      const missing = properties.filter((property) => !hasSchemaValue(node[property]));
      if (type === "FAQPage") {
        const questions = Array.isArray(node.mainEntity) ? node.mainEntity : [];
        const validQuestions = questions.filter((entry) => {
          if (!entry || typeof entry !== "object") return false;
          const question = entry as SchemaNode;
          const answer = question.acceptedAnswer as SchemaNode | undefined;
          return hasSchemaValue(question.name) && hasSchemaValue(answer?.text);
        });
        if (!validQuestions.length && !missing.includes("mainEntity.Question(name, acceptedAnswer.text)")) {
          missing.push("mainEntity.Question(name, acceptedAnswer.text)");
        }
      }
      const total = properties.length + (type === "FAQPage" ? 1 : 0);
      return { type, quality: total ? Math.max(0, (total - missing.length) / total) : 1, missing };
    }));

  const bestByType = new Map<string, typeof assessments[number]>();
  assessments.forEach((assessment) => {
    const current = bestByType.get(assessment.type);
    if (!current || assessment.quality > current.quality) bestByType.set(assessment.type, assessment);
  });
  const best = [...bestByType.values()];
  return {
    quality: best.length ? best.reduce((sum, item) => sum + item.quality, 0) / best.length : 0,
    types: best.map((item) => item.type),
    missing: [...new Set(best.flatMap((item) => item.missing))],
  };
}

function schemaExternalReferences($: cheerio.CheerioAPI) {
  const references = new Set<string>();
  $("script[type='application/ld+json']").each((_, element) => {
    try {
      const visit = (value: unknown): void => {
        if (!value || typeof value !== "object") return;
        if (Array.isArray(value)) return value.forEach(visit);
        const item = value as Record<string, unknown>;
        const sameAs = item.sameAs;
        const candidates = Array.isArray(sameAs) ? sameAs : [sameAs];
        candidates.forEach((candidate) => {
          if (typeof candidate !== "string") return;
          try {
            const url = new URL(candidate);
            if (["http:", "https:"].includes(url.protocol)) references.add(url.toString());
          } catch { /* invalid references do not count */ }
        });
        Object.values(item).forEach(visit);
      };
      visit(JSON.parse($(element).html() || "{}"));
    } catch { /* malformed JSON-LD is treated as absent */ }
  });
  return references.size;
}

function normalizeEntityName(value: string) {
  return value.normalize("NFKD").replace(/[^\p{L}\p{N}]+/gu, "").toLowerCase();
}

const AI_BOT_PATTERN = /^(gptbot|chatgpt-user|google-extended|ccbot|anthropic-ai|claudebot|claude-web|perplexitybot)$/i;

function blocksAiBots(robotsText: string) {
  let agents: string[] = [];
  let directivesStarted = false;
  let blocked = false;

  for (const rawLine of robotsText.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const userAgent = line.match(/^user-agent\s*:\s*(.+)$/i)?.[1].trim();
    if (userAgent) {
      if (directivesStarted) agents = [];
      agents.push(userAgent);
      directivesStarted = false;
      continue;
    }
    if (!/^(allow|disallow)\s*:/i.test(line)) continue;
    directivesStarted = true;
    if (agents.some((agent) => AI_BOT_PATTERN.test(agent)) && /^disallow\s*:\s*\/\s*$/i.test(line)) blocked = true;
  }

  return blocked;
}

function status(score: number): ValidationStatus {
  if (score >= 75) return "found";
  if (score >= 50) return "partial";
  return "not-found";
}

function buildResult(type: ValidationType, checks: Array<{ label: string; passed: boolean; evidence: string; weight: number; points?: number; scored?: boolean }>, lang: "pt" | "en"): Result {
  const awardedPoints = (check: typeof checks[number]) => Math.max(0, Math.min(check.weight, check.points ?? (check.passed ? check.weight : 0)));
  const scoredChecks = checks.filter((check) => check.scored !== false);
  const awardedTotal = scoredChecks.reduce((sum, check) => sum + awardedPoints(check), 0);
  const maximumTotal = scoredChecks.reduce((sum, check) => sum + check.weight, 0);
  const score = maximumTotal > 0 ? Math.round((awardedTotal / maximumTotal) * 100) : 0;
  const isPT = lang === "pt";
  const failed = checks.filter((check) => !check.passed);
  return {
    type,
    score,
    status: status(score),
    title: type === "seo" ? (isPT ? "SEO (Pesquisa)" : "SEO (Search)") : isPT ? "AEO (Respostas e agentes de IA)" : "AEO (AI answers and agents)",
    description: type === "seo"
      ? (isPT ? "Análise técnica da página e dos sinais de indexação." : "Technical analysis of the page and its indexing signals.")
      : (isPT ? "Conteúdo, autoridade e capacidade técnica para ser compreendido e citado por sistemas de IA." : "Content, authority, and technical readiness to be understood and cited by AI systems."),
    details: (failed.length ? failed : checks.filter((check) => check.passed)).slice(0, 5).map((check) => check.evidence),
    checks: checks.map((check) => ({
      label: check.label,
      passed: awardedPoints(check) >= check.weight,
      evidence: check.evidence,
      points: Math.round(awardedPoints(check) * 10) / 10,
      maxPoints: check.weight,
      scored: check.scored,
    })),
  };
}

async function analyze(brand: string, rawWebsite: string, types: ValidationType[], lang: "pt" | "en") {
  const supplied = /^https?:\/\//i.test(rawWebsite) ? rawWebsite : `https://${rawWebsite}`;
  const page = await fetchPublicText(supplied);
  if (!page) throw new Error("fetch_failed");
  const finalUrl = new URL(page.url);
  const origin = finalUrl.origin;
  const [robots, llms, llmsFull, agentManifest, markdown] = await Promise.all([
    fetchPublicText(`${origin}/robots.txt`, true),
    fetchPublicText(`${origin}/llms.txt`, true),
    fetchPublicText(`${origin}/llms-full.txt`, true),
    fetchPublicText(`${origin}/.well-known/agent.json`, true),
    fetchPublicText(page.url, true, { Accept: "text/markdown" }),
  ]);
  const sitemapCandidates = [
    ...(robots?.text.match(/^\s*Sitemap\s*:\s*(\S+)/gim) || []).map((line) => line.replace(/^\s*Sitemap\s*:\s*/i, "")),
    `${origin}/sitemap.xml`,
  ].filter((value, index, values) => values.indexOf(value) === index);
  let sitemap: Awaited<ReturnType<typeof fetchPublicText>> = null;
  for (const candidate of sitemapCandidates) {
    const response = await fetchPublicText(candidate, true, { Accept: "application/xml,text/xml;q=0.9,*/*;q=0.8" });
    if (response && /<(urlset|sitemapindex)\b/i.test(response.text)) {
      sitemap = response;
      break;
    }
  }
  const $ = cheerio.load(page.text);
  const title = $("title").first().text().trim();
  const description = $("meta[name='description']").attr("content")?.trim() || "";
  const h1s = $("h1").map((_, el) => $(el).text().trim()).get().filter(Boolean);
  const h2s = $("h2").map((_, el) => $(el).text().trim()).get().filter(Boolean);
  const canonical = $("link[rel='canonical']").attr("href") || "";
  const robotsMeta = $("meta[name='robots']").attr("content")?.toLowerCase() || "";
  const langAttr = $("html").attr("lang") || "";
  const parsedSchemaNodes = schemaNodes($);
  const schemas = [...new Set(parsedSchemaNodes.flatMap(typesOf))];
  const generalSchemaQuality = schemaQuality(parsedSchemaNodes, Object.keys(SCHEMA_PROPERTIES));
  const entitySchemaQuality = schemaQuality(parsedSchemaNodes, ["Organization", "LocalBusiness", "Corporation", "WebSite"]);
  const answerSchemaQuality = schemaQuality(parsedSchemaNodes, ["FAQPage", "HowTo", "Article", "BlogPosting", "NewsArticle", "Service", "ItemList"]);
  const htmlSource = page.text.toLowerCase();
  const isWordPress = /<meta[^>]+name=["']generator["'][^>]+content=["']wordpress\b/i.test(page.text)
    || /\bwp-(?:content|includes)\//i.test(page.text);
  const wordpressSeoPlugins = [
    ["Yoast SEO", /(?:wordpress-seo|yoast-schema-graph|yoast seo)/i],
    ["Rank Math", /(?:rank-math|rank_math|rankmath)/i],
    ["All in One SEO", /(?:all-in-one-seo-pack|aioseo)/i],
    ["SEOPress", /(?:wp-seopress|seopress)/i],
    ["The SEO Framework", /(?:autodescription|the seo framework)/i],
  ].filter(([, signature]) => (signature as RegExp).test(htmlSource)).map(([name]) => name as string);
  const images = $("img").length;
  const missingAlt = $("img").filter((_, el) => $(el).attr("alt") === undefined).length;
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const questionHeadings = [...h1s, ...h2s, ...$("h3").map((_, el) => $(el).text().trim()).get()].filter((heading) => /\?$/.test(heading)).length;
  const externalLinks = $("a[href^='http']").filter((_, el) => {
    try { return new URL($(el).attr("href") || "", finalUrl).hostname !== finalUrl.hostname; } catch { return false; }
  }).length + schemaExternalReferences($);
  const hasEntitySchema = schemas.some((type) => ["Organization", "LocalBusiness", "Corporation", "WebSite"].includes(type));
  const hasAuthoredSchema = parsedSchemaNodes.some((node) =>
    typesOf(node).some((type) => ["Article", "BlogPosting", "NewsArticle"].includes(type)) && hasSchemaValue(node.author));
  const hasNamedPersonSchema = parsedSchemaNodes.some((node) => typesOf(node).includes("Person") && hasSchemaValue(node.name));
  const hasAuthor = (hasEntitySchema && entitySchemaQuality.quality >= 0.5) || hasAuthoredSchema || hasNamedPersonSchema || /\b(author|autor|por|by)\b/i.test(bodyText);
  const brandMentioned = normalizeEntityName(bodyText).includes(normalizeEntityName(brand));
  const isPT = lang === "pt";
  const robotsAllows = Boolean(robots && !/user-agent:\s*\*[^]*?disallow:\s*\/\s*(?:\r?\n|$)/i.test(robots.text));
  const robotsLines = robots?.text.split(/\r?\n/).map((line) => line.replace(/#.*$/, "").trim()).filter(Boolean) || [];
  const validRobotsDirectives = /^(user-agent|allow|disallow|sitemap|crawl-delay|host|content-signal)\s*:/i;
  const robotsValid = Boolean(robots && robots.status === 200 && robotsLines.some((line) => /^user-agent\s*:/i.test(line)) && robotsLines.every((line) => validRobotsDirectives.test(line)));
  const sitemapValid = Boolean(sitemap && /<(urlset|sitemapindex)\b/i.test(sitemap.text));
  const contentSignals = Boolean((robots && /content-signal\s*:/i.test(robots.text)) || page.headers["content-signal"]);
  const linkHeader = page.headers.link || "";
  const discoveryLinks = linkHeader.split(/,(?=\s*<)/).flatMap((entry) => {
    const target = entry.match(/<([^>]+)>/)?.[1];
    const relations = entry.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1].toLowerCase().split(/\s+/) || [];
    const relation = relations.find((value) => ["describedby", "service-desc", "service-doc", "api-catalog", "sitemap"].includes(value));
    if (!target || !relation) return [];
    try { return [{ relation, url: new URL(target, finalUrl).toString() }]; } catch { return []; }
  });
  const discoveryResponses = await Promise.all(discoveryLinks.map(async (link) => ({
    ...link,
    response: await fetchPublicText(link.url, true, { Accept: "text/plain,text/markdown,application/json,application/xml;q=0.9,*/*;q=0.8" }),
  })));
  const validDiscoveryLinks = discoveryResponses.filter(({ relation, response }) => {
    if (!response?.text.trim()) return false;
    if (relation === "sitemap") return /<(urlset|sitemapindex)\b/i.test(response.text);
    if (["service-desc", "api-catalog"].includes(relation)) {
      try { JSON.parse(response.text); return /json/i.test(response.headers["content-type"] || ""); } catch { return false; }
    }
    return !/^(?:<!doctype\s+html|<html\b)/i.test(response.text.trim());
  });
  const hasDiscoveryLink = validDiscoveryLinks.length > 0;
  const markdownBody = markdown?.text.trim() || "";
  const markdownIsHtml = /^(?:<!doctype\s+html|<html\b)|<(?:html|head|body)\b/i.test(markdownBody.slice(0, 2000));
  const markdownAvailable = Boolean(
    markdown
    && markdown.status === 200
    && /(?:text\/markdown|text\/x-markdown)/i.test(markdown.headers["content-type"] || "")
    && markdownBody.length >= 40
    && !markdownIsHtml
  );
  const agentManifestValid = Boolean(agentManifest && /application\/json/i.test(agentManifest.headers["content-type"] || "") && (() => {
    try {
      const manifest = JSON.parse(agentManifest.text) as Record<string, unknown>;
      return typeof manifest.name === "string"
        && manifest.name.trim().length > 0
        && typeof manifest.description === "string"
        && manifest.description.trim().length > 0
        && typeof manifest.url === "string"
        && ["http:", "https:"].includes(new URL(manifest.url).protocol);
    } catch { return false; }
  })());
  const aiBotRules = Boolean(robots && /(gptbot|chatgpt-user|google-extended|ccbot|anthropic-ai|claude)/i.test(robots.text));
  const aiBotsBlocked = Boolean(robots && blocksAiBots(robots.text));
  const hasFaqOrHowToSchema = schemas.some((type) => ["FAQPage", "HowTo"].includes(type));

  const titlePoints = title.length === 0 ? 0
    : title.length >= 30 && title.length <= 65 ? 8
      : (title.length >= 20 && title.length < 30) || (title.length > 65 && title.length <= 75) ? 6
        : 4;
  const descriptionPoints = description.length === 0 ? 0
    : description.length >= 70 && description.length <= 170 ? 8
      : (description.length >= 50 && description.length < 70) || (description.length > 170 && description.length <= 200) ? 6
        : 4;
  const titleEvidence = title.length === 0
    ? (isPT ? "Tag title ausente." : "Missing title tag.")
    : `Title: ${title.length} ${isPT ? "caracteres" : "characters"}; ${titlePoints === 8
      ? (isPT ? "comprimento adequado." : "appropriate length.")
      : titlePoints === 6
        ? (isPT ? "comprimento aceitável, mas pode ser otimizado." : "acceptable length, but it can be optimized.")
        : (isPT ? "demasiado curto ou longo; recomenda-se revisão." : "too short or long; revision is recommended.")}`;
  const descriptionEvidence = description.length === 0
    ? (isPT ? "Meta description ausente." : "Missing meta description.")
    : `Meta description: ${description.length} ${isPT ? "caracteres" : "characters"}; ${descriptionPoints === 8
      ? (isPT ? "comprimento adequado." : "appropriate length.")
      : descriptionPoints === 6
        ? (isPT ? "comprimento aceitável, mas pode ser otimizado." : "acceptable length, but it can be optimized.")
        : (isPT ? "demasiado curta ou longa; recomenda-se revisão." : "too short or long; revision is recommended.")}`;
  const schemaEvidence = (quality: ReturnType<typeof schemaQuality>, absent: string) => {
    if (!quality.types.length) return absent;
    const completeness = Math.round(quality.quality * 100);
    const missing = quality.missing.length
      ? `${isPT ? " Propriedades em falta" : " Missing properties"}: ${quality.missing.join(", ")}.`
      : "";
    return `${isPT ? "Qualidade dos schemas" : "Schema quality"} ${quality.types.join(", ")}: ${completeness}%.${missing}`;
  };

  const anchors = $("a").toArray();
  const genericLinkText = /^(clique aqui|aqui|saiba mais|ler mais|mais|link|click here|here|learn more|read more)$/i;
  const nonDescriptiveLinks = anchors.filter((element) => {
    const anchor = $(element);
    const accessibleText = [anchor.text(), anchor.attr("aria-label"), anchor.attr("title"), anchor.find("img[alt]").attr("alt")].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
    return !accessibleText || genericLinkText.test(accessibleText);
  }).length;
  const nonCrawlableLinks = anchors.filter((element) => {
    const href = ($(element).attr("href") || "").trim();
    if (/^(mailto:|tel:)/i.test(href)) return false;
    return !href || href === "#" || /^javascript:/i.test(href) || /^data:/i.test(href);
  }).length;

  const hreflangs = $("link[rel='alternate'][hreflang]").map((_, element) => ({
    lang: ($(element).attr("hreflang") || "").trim().toLowerCase(),
    href: ($(element).attr("href") || "").trim(),
  })).get();
  const validLanguageTag = /^(x-default|[a-z]{2,3}(?:-[a-z]{2}|-[a-z]{4})?)$/i;
  const hreflangValid = hreflangs.length === 0 || (new Set(hreflangs.map((item) => item.lang)).size === hreflangs.length && hreflangs.every((item) => {
    try { return validLanguageTag.test(item.lang) && ["http:", "https:"].includes(new URL(item.href).protocol); } catch { return false; }
  }));
  let canonicalValid = false;
  if (canonical) {
    try {
      const canonicalUrl = new URL(canonical);
      const canonicalPage = canonicalUrl.toString() === finalUrl.toString() ? page : await fetchPublicText(canonicalUrl.toString(), true);
      canonicalValid = ["http:", "https:"].includes(canonicalUrl.protocol) && Boolean(canonicalPage?.status === 200);
    } catch { canonicalValid = false; }
  }

  const seoChecks = [
    { label: "HTTPS", passed: finalUrl.protocol === "https:", weight: 6, evidence: finalUrl.protocol === "https:" ? (isPT ? "HTTPS ativo." : "HTTPS is active.") : (isPT ? "A página não usa HTTPS." : "The page does not use HTTPS.") },
    { label: "HTTP", passed: page.status === 200, weight: 8, evidence: `${isPT ? "Resposta HTTP" : "HTTP response"}: ${page.status}.` },
    { label: "Title", passed: titlePoints === 8, points: titlePoints, weight: 8, evidence: titleEvidence },
    { label: "Meta description", passed: descriptionPoints === 8, points: descriptionPoints, weight: 8, evidence: descriptionEvidence },
    { label: "H1", passed: h1s.length === 1, points: h1s.length === 1 ? 8 : h1s.length > 1 ? 4 : 0, weight: 8, evidence: h1s.length === 1 ? (isPT ? "Foi encontrado um único H1." : "A single H1 was found.") : h1s.length > 1 ? `${h1s.length} H1 ${isPT ? "encontrados; existe um título principal, mas a hierarquia deve ser corrigida." : "found; a primary heading exists, but the hierarchy should be corrected."}` : (isPT ? "Nenhum H1 encontrado." : "No H1 found.") },
    { label: isPT ? "Canonical válido" : "Valid canonical", passed: canonicalValid, weight: 10, evidence: canonicalValid ? `${isPT ? "Canonical válido" : "Valid canonical"}: ${canonical}` : (isPT ? "Canonical ausente, relativo ou inacessível." : "Canonical is missing, relative, or unreachable.") },
    { label: isPT ? "Indexação" : "Indexing", passed: !robotsMeta.includes("noindex") && robotsAllows, weight: 8, evidence: robotsMeta.includes("noindex") ? (isPT ? "Meta robots contém noindex." : "The robots meta tag contains noindex.") : (robotsAllows ? (isPT ? "Indexação permitida." : "Indexing allowed.") : (isPT ? "O robots.txt bloqueia o rastreio." : "robots.txt blocks crawling.")) },
    { label: "Mobile", passed: Boolean($("meta[name='viewport']").length), weight: 4, evidence: $("meta[name='viewport']").length ? (isPT ? "Meta viewport presente." : "Viewport meta tag is present.") : (isPT ? "Meta viewport ausente." : "Viewport meta tag is missing.") },
    { label: isPT ? "Idioma" : "Language", passed: Boolean(langAttr), weight: 4, evidence: langAttr ? `HTML lang: ${langAttr}.` : (isPT ? "HTML lang ausente." : "HTML lang is missing.") },
    { label: "Headings", passed: h2s.length > 0, weight: 4, evidence: `${h2s.length} H2 ${isPT ? "encontrado(s)" : "found"}.` },
    { label: isPT ? "Imagens" : "Images", passed: images === 0 || missingAlt === 0, points: images === 0 ? 4 : 4 * ((images - missingAlt) / images), weight: 4, evidence: `${missingAlt}/${images} ${isPT ? "imagens sem o atributo alt" : "images missing the alt attribute"}.` },
    { label: isPT ? "Qualidade dos dados estruturados" : "Structured data quality", passed: generalSchemaQuality.quality === 1, points: 4 * generalSchemaQuality.quality, weight: 4, evidence: schemaEvidence(generalSchemaQuality, isPT ? "JSON-LD reconhecido ausente." : "No recognized JSON-LD found.") },
    { label: isPT ? "Sitemap válido" : "Valid sitemap", passed: sitemapValid, weight: 4, evidence: sitemapValid ? (isPT ? "Sitemap XML válido encontrado." : "A valid XML sitemap was found.") : (isPT ? "Sitemap XML ausente ou inválido." : "The XML sitemap is missing or invalid.") },
    { label: isPT ? "Texto dos links" : "Link text", passed: nonDescriptiveLinks === 0, points: anchors.length === 0 ? 6 : 6 * ((anchors.length - nonDescriptiveLinks) / anchors.length), weight: 6, evidence: `${nonDescriptiveLinks}/${anchors.length} ${isPT ? "links sem texto descritivo" : "links without descriptive text"}.` },
    { label: isPT ? "Links rastreáveis" : "Crawlable links", passed: nonCrawlableLinks === 0, points: anchors.length === 0 ? 5 : 5 * ((anchors.length - nonCrawlableLinks) / anchors.length), weight: 5, evidence: `${nonCrawlableLinks}/${anchors.length} ${isPT ? "links não rastreáveis" : "links are not crawlable"}.` },
    { label: isPT ? "robots.txt válido" : "Valid robots.txt", passed: robotsValid, weight: 5, evidence: robotsValid ? (isPT ? "robots.txt apresenta uma estrutura válida." : "robots.txt has a valid structure.") : (isPT ? "robots.txt ausente ou com diretivas inválidas." : "robots.txt is missing or contains invalid directives.") },
    { label: isPT ? "hreflang válido" : "Valid hreflang", passed: hreflangValid, weight: 4, evidence: hreflangs.length === 0 ? (isPT ? "Sem hreflang; não aplicável a uma página monolingue." : "No hreflang; not applicable to a monolingual page.") : hreflangValid ? `${hreflangs.length} ${isPT ? "alternates hreflang válidos" : "valid hreflang alternates"}.` : (isPT ? "Foram encontrados valores hreflang inválidos ou duplicados." : "Invalid or duplicate hreflang values were found.") },
    ...(isWordPress ? [{
      label: isPT ? "WordPress — Plugins de SEO" : "WordPress — SEO plugins",
      passed: wordpressSeoPlugins.length <= 1,
      weight: 0,
      scored: false,
      evidence: wordpressSeoPlugins.length === 0
        ? (isPT ? "Não foram detetados plugins de SEO no HTML público; recomenda-se confirmação no painel WordPress." : "No SEO plugins were detected in the public HTML; confirmation in the WordPress dashboard is recommended.")
        : wordpressSeoPlugins.length === 1
          ? `${wordpressSeoPlugins[0]} ${isPT ? "detetado; não há sinais públicos de conflito com outro plugin de SEO." : "detected; there are no public signs of a conflict with another SEO plugin."}`
          : `${isPT ? "Possível conflito: foram detetados" : "Possible conflict: detected"} ${wordpressSeoPlugins.join(", ")}.`,
    }] : []),
  ];

  const aeoChecks = [
    { label: isPT ? "Conteúdo — Entidade" : "Content — Entity", passed: entitySchemaQuality.quality === 1, points: 18 * entitySchemaQuality.quality, weight: 18, evidence: schemaEvidence(entitySchemaQuality, isPT ? "Falta schema Organization ou WebSite." : "Missing Organization or WebSite schema.") },
    { label: isPT ? "Conteúdo — Dados estruturados" : "Content — Structured data", passed: answerSchemaQuality.quality === 1, points: 18 * answerSchemaQuality.quality, weight: 18, evidence: schemaEvidence(answerSchemaQuality, isPT ? "Falta FAQPage, Article, Service, ItemList ou HowTo." : "Missing FAQPage, Article, Service, ItemList, or HowTo schema.") },
    { label: isPT ? "Conteúdo — Respostas diretas" : "Content — Direct answers", passed: questionHeadings > 0 || schemas.includes("FAQPage"), weight: 17, evidence: questionHeadings > 0 ? `${questionHeadings} ${isPT ? "perguntas em títulos" : questionHeadings === 1 ? "question heading" : "question headings"}.` : (isPT ? "Não foram detetadas perguntas em títulos." : "No question headings detected.") },
    { label: isPT ? "Conteúdo — Marca" : "Content — Brand", passed: brandMentioned, weight: 11, evidence: brandMentioned ? (isPT ? "Marca mencionada no conteúdo." : "Brand mentioned in page content.") : (isPT ? "Marca não encontrada no conteúdo visível." : "Brand not found in visible content.") },
    { label: isPT ? "Conteúdo — Responsabilidade editorial" : "Content — Editorial responsibility", passed: hasAuthor, weight: 12, evidence: hasAuthor ? (isPT ? "Autoria ou entidade responsável identificada." : "Author or responsible entity identified.") : (isPT ? "Responsabilidade editorial não identificada." : "Editorial responsibility not identified.") },
    { label: isPT ? "Conteúdo — Fontes e referências" : "Content — Sources and references", passed: externalLinks > 0, weight: 8, evidence: `${externalLinks} ${isPT ? "links externos ou referências sameAs" : "external links or sameAs references"}.` },
    { label: isPT ? "Complementar — Ficheiro llms.txt" : "Complementary — llms.txt file", passed: Boolean(llms), weight: 1, evidence: llms ? (llmsFull ? (isPT ? "llms.txt e llms-full.txt encontrados; sinal complementar não utilizado pelo Google Search." : "llms.txt and llms-full.txt were found; a complementary signal not used by Google Search.") : (isPT ? "llms.txt encontrado; recurso complementar." : "llms.txt found; complementary resource.")) : (isPT ? "llms.txt ausente; recurso complementar." : "llms.txt is missing; complementary resource.") },
    { label: isPT ? "Técnico — Acesso geral de bots" : "Technical — General bot access", passed: robotsAllows, weight: 3, evidence: robotsAllows ? (isPT ? "O robots.txt permite rastreio geral." : "robots.txt allows general crawling.") : (isPT ? "O robots.txt bloqueia o rastreio geral." : "robots.txt blocks general crawling.") },
    { label: isPT ? "Técnico — Acesso de bots de IA" : "Technical — AI bot access", passed: aiBotRules || robotsAllows, weight: 3, evidence: aiBotRules ? (isPT ? "Regras específicas para bots de IA encontradas." : "Specific rules for AI bots were found.") : robotsAllows ? (isPT ? "O rastreio geral está permitido, incluindo bots de IA; não existem regras específicas." : "General crawling is allowed, including AI bots; no specific rules are declared.") : (isPT ? "O acesso de bots de IA não está declarado ou permitido." : "AI bot access is not declared or allowed.") },
    { label: isPT ? "Técnico — Sitemap" : "Technical — Sitemap", passed: sitemapValid, weight: 3, evidence: sitemapValid ? `Sitemap ${isPT ? "válido" : "valid"}: ${sitemap?.url}.` : (isPT ? "Sitemap ausente ou inválido." : "Sitemap is missing or invalid.") },
    { label: isPT ? "Técnico — Cabeçalho Link" : "Technical — Link header", passed: hasDiscoveryLink, weight: 3, evidence: hasDiscoveryLink ? `${validDiscoveryLinks.length}/${discoveryLinks.length} ${isPT ? "recursos anunciados no cabeçalho Link foram validados" : "resources advertised in the Link header were validated"}.` : (isPT ? "Nenhum recurso válido foi encontrado no cabeçalho Link." : "No valid resource was found in the Link header.") },
    { label: isPT ? "Complementar — Markdown" : "Complementary — Markdown", passed: markdownAvailable, weight: 1, evidence: markdownAvailable ? (isPT ? "A página entrega Markdown real; sinal complementar não utilizado pelo Google Search." : "The page returns real Markdown; a complementary signal not used by Google Search.") : (isPT ? "A resposta Markdown está ausente ou contém HTML; recurso complementar." : "The Markdown response is missing or contains HTML; complementary resource.") },
    { label: isPT ? "Complementar — Content Signals" : "Complementary — Content Signals", passed: contentSignals, weight: 1, evidence: contentSignals ? (isPT ? "Preferências de utilização por IA declaradas; sinal complementar." : "AI usage preferences are declared; complementary signal.") : (isPT ? "Content Signals não encontrados; recurso complementar." : "Content Signals were not found; complementary resource.") },
    { label: isPT ? "Complementar — Manifesto de agente" : "Complementary — Agent manifest", passed: agentManifestValid, weight: 1, evidence: agentManifestValid ? (isPT ? "agent.json válido encontrado; sinal complementar." : "A valid agent.json file was found; complementary signal.") : (isPT ? "agent.json ausente ou inválido; recurso complementar." : "agent.json is missing or invalid; complementary resource.") },
    ...(isWordPress ? [
      {
        label: isPT ? "WordPress — Bloqueio de bots de IA" : "WordPress — AI bot blocking",
        passed: Boolean(robots) && !aiBotsBlocked,
        weight: 0,
        scored: false,
        evidence: !robots
          ? (isPT ? "Não foi possível confirmar as regras de acesso no robots.txt." : "The access rules in robots.txt could not be confirmed.")
          : aiBotsBlocked
            ? (isPT ? "O robots.txt contém um bloqueio total dirigido a um ou mais bots de IA." : "robots.txt contains a full block targeting one or more AI bots.")
            : (isPT ? "Não foi detetado um bloqueio total dirigido a bots de IA." : "No full block targeting AI bots was detected."),
      },
      {
        label: isPT ? "WordPress — Schema FAQ/HowTo" : "WordPress — FAQ/HowTo schema",
        passed: hasFaqOrHowToSchema,
        weight: 0,
        scored: false,
        evidence: hasFaqOrHowToSchema
          ? `${isPT ? "Cobertura encontrada" : "Coverage found"}: ${schemas.filter((type) => ["FAQPage", "HowTo"].includes(type)).join(", ")}.`
          : (isPT ? "Não foi encontrado schema FAQPage ou HowTo nesta página." : "No FAQPage or HowTo schema was found on this page."),
      },
    ] : []),
  ];

  return {
    analyzedUrl: page.url,
    analyzedAt: new Date().toISOString(),
    results: types.map((type) => buildResult(type, type === "seo" ? seoChecks : aeoChecks, lang)),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  if (isValidatorRateLimited(req)) return res.status(429).json({ error: "rate_limited" });
  const { brandName, website, types, lang } = (req.body || {}) as { brandName?: unknown; website?: unknown; types?: unknown; lang?: unknown };
  if (typeof brandName !== "string" || !brandName.trim() || brandName.length > 120 || typeof website !== "string" || !website.trim() || website.length > 300) return res.status(400).json({ error: "invalid_input" });
  try {
    const supplied = /^https?:\/\//i.test(website) ? website : `https://${website}`;
    const hostname = new URL(supplied).hostname.toLowerCase().replace(/\.$/, "");
    if (hostname === "sapienteai.com" || hostname.endsWith(".sapienteai.com")) {
      return res.status(403).json({ error: "self_validation_not_allowed" });
    }
  } catch {
    return res.status(400).json({ error: "invalid_website" });
  }
  const selected = Array.isArray(types) ? types.filter((type): type is ValidationType => type === "seo" || type === "aeo") : [];
  if (!selected.length) return res.status(400).json({ error: "invalid_types" });
  try {
    const analysis = await analyze(brandName.trim(), website.trim(), selected, lang === "en" ? "en" : "pt");
    const detailed = canShowDetailedResults();
    return res.status(200).json({
      ...analysis,
      detailed,
      results: detailed ? analysis.results : analysis.results.map(publicResult),
    });
  } catch (error) {
    console.error("[visibility] analysis failed", error instanceof Error ? error.message : error);
    const code = error instanceof Error && ["invalid_url", "blocked_host"].includes(error.message) ? 400 : 422;
    return res.status(code).json({ error: code === 400 ? "invalid_website" : "website_unreachable" });
  }
}
