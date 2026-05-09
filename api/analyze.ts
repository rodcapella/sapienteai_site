import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import * as cheerio from "cheerio";

interface SEOResult {
  fetched: boolean;
  url: string;
  error?: string;
  seo?: {
    score: number;
    good: string[];
    issues: string[];
    title: string;
    metaDesc: string;
    h1: string | null;
    h2Count: number;
    isHttps: boolean;
    viewport: boolean;
    lang: string;
    canonical: boolean;
    ogImage: boolean;
  };
  geo?: {
    score: number;
    good: string[];
    issues: string[];
    schemas: string[];
    hasStructuredData: boolean;
  };
}

async function analyzeSEOGEO(rawUrl: string): Promise<SEOResult> {
  const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  try {
    const { data: html } = await axios.get<string>(url, {
      timeout: 12000,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; DigitalPresenceBot/1.0)",
        "Accept-Language": "pt-PT,pt;q=0.9,en;q=0.8",
      },
      maxRedirects: 5,
    });

    const $ = cheerio.load(html);

    const title = $("title").text().trim();
    const metaDesc = $("meta[name='description']").attr("content")?.trim() ?? "";
    const canonical = $("link[rel='canonical']").attr("href") ?? "";
    const viewport = $("meta[name='viewport']").attr("content") ?? "";
    const langAttr = $("html").attr("lang") ?? "";
    const ogTitle = $("meta[property='og:title']").attr("content") ?? "";
    const ogDesc = $("meta[property='og:description']").attr("content") ?? "";
    const ogImage = $("meta[property='og:image']").attr("content") ?? "";
    const twCard = $("meta[name='twitter:card']").attr("content") ?? "";
    const h1s = $("h1").map((_, el) => $(el).text().trim()).get().filter(Boolean);
    const h2Count = $("h2").length;
    const isHttps = url.startsWith("https://");
    const totalImgs = $("img").length;
    const altImgs = $("img[alt]").filter((_, el) => ($(el).attr("alt") ?? "").trim() !== "").length;

    const schemas: string[] = [];
    $("script[type='application/ld+json']").each((_, el) => {
      try {
        const data = JSON.parse($(el).html() ?? "{}");
        const type = data["@type"] ?? data.type;
        if (type) schemas.push(Array.isArray(type) ? type.join("/") : String(type));
      } catch {
        // Ignore malformed JSON-LD.
      }
    });

    let seoScore = 0;
    const seoGood: string[] = [];
    const seoIssues: string[] = [];

    if (title) {
      seoScore += 12;
      seoGood.push(`Título presente: "${title.substring(0, 55)}${title.length > 55 ? "…" : ""}"`);
      if (title.length >= 30 && title.length <= 65) {
        seoScore += 8;
        seoGood.push(`Comprimento do título ideal (${title.length} chars)`);
      } else {
        seoIssues.push(`Título com ${title.length} chars (ideal 30–65)`);
      }
    } else {
      seoIssues.push("Sem tag <title>");
    }

    if (metaDesc) {
      seoScore += 12;
      seoGood.push(`Meta description presente (${metaDesc.length} chars)`);
      if (metaDesc.length >= 120 && metaDesc.length <= 165) {
        seoScore += 8;
        seoGood.push("Comprimento da meta description ideal");
      } else {
        seoIssues.push(`Meta description com ${metaDesc.length} chars (ideal 120–165)`);
      }
    } else {
      seoIssues.push("Sem meta description");
    }

    if (h1s.length === 1) {
      seoScore += 15;
      seoGood.push(`H1 único: "${h1s[0].substring(0, 50)}"`);
    } else if (h1s.length === 0) {
      seoIssues.push("Sem tag H1");
    } else {
      seoScore += 5;
      seoIssues.push(`${h1s.length} H1s encontrados — deve ser único`);
    }

    if (h2Count > 0) {
      seoScore += 5;
      seoGood.push(`${h2Count} tags H2 encontradas`);
    } else {
      seoIssues.push("Sem H2s — estrutura de conteúdo fraca");
    }

    if (isHttps) {
      seoScore += 10;
      seoGood.push("HTTPS ativo");
    } else {
      seoIssues.push("Site sem HTTPS — penalização em SEO");
    }

    if (canonical) {
      seoScore += 5;
      seoGood.push("URL canónica definida");
    } else {
      seoIssues.push("Sem URL canónica");
    }

    if (viewport) {
      seoScore += 10;
      seoGood.push("Meta viewport presente (mobile-friendly)");
    } else {
      seoIssues.push("Sem meta viewport — possível problema mobile");
    }

    if (langAttr) {
      seoScore += 5;
      seoGood.push(`Atributo lang: "${langAttr}"`);
    } else {
      seoIssues.push("Sem atributo lang na tag <html>");
    }

    if (ogTitle && ogDesc) {
      seoScore += 3;
      seoGood.push("Open Graph configurado (og:title, og:description)");
    } else {
      seoIssues.push("Open Graph incompleto — partilhas sociais prejudicadas");
    }

    if (ogImage) {
      seoScore += 2;
      seoGood.push("og:image presente");
    }

    if (totalImgs > 0) {
      const pct = Math.round((altImgs / totalImgs) * 100);
      if (pct >= 80) {
        seoScore += 5;
        seoGood.push(`Alt text em ${altImgs}/${totalImgs} imagens (${pct}%)`);
      } else {
        seoIssues.push(`Alt text só em ${pct}% das imagens (${altImgs}/${totalImgs})`);
      }
    }

    if (twCard) seoGood.push("Twitter/X Card configurado");

    let geoScore = 0;
    const geoGood: string[] = [];
    const geoIssues: string[] = [];

    const hasOrg = schemas.some((schema) => ["Organization", "LocalBusiness", "Corporation", "Store"].includes(schema));
    const hasFaq = schemas.some((schema) => schema === "FAQPage");
    const hasArticle = schemas.some((schema) => ["Article", "BlogPosting", "NewsArticle"].includes(schema));
    const hasBread = schemas.some((schema) => schema === "BreadcrumbList");
    const hasWebSite = schemas.some((schema) => schema === "WebSite");
    const hasProduct = schemas.some((schema) => schema === "Product");
    const hasPerson = schemas.some((schema) => schema === "Person");

    if (hasOrg) {
      geoScore += 30;
      geoGood.push("Schema Organization/LocalBusiness — entidade identificável por AI");
    } else {
      geoIssues.push("Sem schema Organization — AI não identifica claramente a empresa");
    }

    if (hasFaq) {
      geoScore += 20;
      geoGood.push("FAQPage schema — favorece respostas directas em AI Search e SGE");
    } else {
      geoIssues.push("Sem FAQPage schema — grande oportunidade GEO perdida");
    }

    if (hasArticle) {
      geoScore += 10;
      geoGood.push("Schema de artigos/blog presente");
    }

    if (hasBread) {
      geoScore += 10;
      geoGood.push("BreadcrumbList — estrutura de navegação clara para AI");
    } else {
      geoIssues.push("Sem BreadcrumbList schema");
    }

    if (hasWebSite) {
      geoScore += 10;
      geoGood.push("WebSite schema presente");
    } else {
      geoIssues.push("Sem WebSite schema — sitelinks search box não disponível");
    }

    if (hasProduct) {
      geoScore += 5;
      geoGood.push("Product schema presente");
    }

    if (hasPerson) {
      geoScore += 5;
      geoGood.push("Person schema — autoria identificável");
    }

    if (schemas.length === 0) {
      geoScore = 0;
      geoIssues.push("Sem dados estruturados (JSON-LD) — site invisível para AI Search");
    } else {
      geoGood.push(`${schemas.length} schema(s) JSON-LD detectado(s): ${schemas.join(", ")}`);
    }

    if (langAttr.startsWith("pt")) {
      geoScore += 5;
      geoGood.push("Idioma PT declarado — relevância para pesquisas em português");
    } else {
      geoIssues.push('Idioma não declarado como Português (lang="pt" ou "pt-PT")');
    }

    if (metaDesc.length > 0) {
      geoScore += 5;
      geoGood.push("Meta description usável como snippet em respostas AI");
    }

    return {
      fetched: true,
      url,
      seo: {
        score: Math.min(seoScore, 100),
        good: seoGood,
        issues: seoIssues,
        title,
        metaDesc,
        h1: h1s[0] ?? null,
        h2Count,
        isHttps,
        viewport: Boolean(viewport),
        lang: langAttr,
        canonical: Boolean(canonical),
        ogImage: Boolean(ogImage),
      },
      geo: {
        score: Math.min(geoScore, 100),
        good: geoGood,
        issues: geoIssues,
        schemas,
        hasStructuredData: schemas.length > 0,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { fetched: false, url, error: message };
  }
}

async function callGemini(prompt: string): Promise<Record<string, unknown>> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada nas variáveis de ambiente.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await axios.post(url, {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 2048 },
  });

  const textResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (typeof textResponse !== "string") {
    throw new Error("Resposta inválida da Gemini API.");
  }

  const cleanJson = textResponse
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  return JSON.parse(cleanJson);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { company, website, sector } = req.body as {
    company?: string;
    website?: string;
    sector?: string;
  };

  if (!company?.trim()) {
    return res.status(400).json({ error: 'O campo "company" é obrigatório.' });
  }

  let seoData: SEOResult | null = null;

  if (website?.trim()) {
    seoData = await analyzeSEOGEO(website.trim());
  }

  const seoContext = seoData?.fetched
    ? `\n\nDADOS TÉCNICOS DO WEBSITE (recolhidos agora via crawler):
- SEO Score: ${seoData.seo?.score}/100
- GEO Score: ${seoData.geo?.score}/100
- Título: ${seoData.seo?.title || "não encontrado"}
- Meta Description: ${seoData.seo?.metaDesc ? `${seoData.seo.metaDesc.substring(0, 100)}…` : "não encontrada"}
- H1: ${seoData.seo?.h1 || "não encontrado"} | H2s: ${seoData.seo?.h2Count ?? 0}
- HTTPS: ${seoData.seo?.isHttps ? "Sim" : "Não"} | Mobile viewport: ${seoData.seo?.viewport ? "Sim" : "Não"}
- JSON-LD schemas: ${seoData.geo?.schemas.length ? seoData.geo.schemas.join(", ") : "nenhum"}`
    : website?.trim()
      ? "\n\nWebsite fornecido mas não foi possível aceder para análise técnica."
      : "";

  const prompt = `És um especialista em presença digital para o mercado português.
Com base no teu conhecimento de treino, analisa a empresa "${company}"${sector ? ` (sector: ${sector})` : ""}.${seoContext}

Responde APENAS com JSON válido (sem markdown, sem texto adicional) com esta estrutura exata:
{
  "company_name": "string",
  "overall_score": number 0-100,
  "summary": "2-3 frases PT resumindo a presença digital global",
  "categories": {
    "social_media": {
      "score": number,
      "platforms": {
        "facebook": { "found": boolean, "estimated_followers": "string ou null" },
        "instagram": { "found": boolean, "estimated_followers": "string ou null" },
        "linkedin": { "found": boolean, "estimated_followers": "string ou null" },
        "youtube": { "found": boolean, "subscribers": "string ou null" },
        "tiktok": { "found": boolean, "estimated_followers": "string ou null" }
      },
      "findings": ["máx 4 observações em PT"],
      "status": "good|medium|poor"
    },
    "local_presence": {
      "score": number,
      "google_business": boolean,
      "google_maps": boolean,
      "reviews_found": boolean,
      "avg_rating": "string ou null",
      "findings": ["máx 4 observações em PT"],
      "status": "good|medium|poor"
    },
    "media_mentions": {
      "score": number,
      "recent_mentions": boolean,
      "outlets": ["nomes de outlets PT"],
      "findings": ["máx 4 observações em PT"],
      "status": "good|medium|poor"
    },
    "directories": {
      "score": number,
      "paginas_amarelas": boolean,
      "infopedia": boolean,
      "other_directories": ["outros diretórios encontrados"],
      "findings": ["máx 4 observações em PT"],
      "status": "good|medium|poor"
    }
  },
  "recommendations": ["3-5 recomendações acionáveis PT — inclui sugestões SEO/GEO se relevante"],
  "competitor_context": "string ou null"
}`;

  try {
    const analysis = await callGemini(prompt);
    return res.status(200).json({ ...analysis, seo_data: seoData });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[analyze] Gemini error:", message);
    return res.status(500).json({ error: `Erro na análise: ${message}` });
  }
}
