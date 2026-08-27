import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { getIndexableRoutes, SITE_ORIGIN } from "./site-routes.js";

const distDir = path.resolve("dist");
const routes = getIndexableRoutes();
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

function read(file) {
  check(fs.existsSync(file), `Missing artifact: ${path.relative(process.cwd(), file)}`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

const sitemap = `${read(path.resolve("client/public/sitemap-pages.xml"))}\n${read(path.resolve("client/public/sitemap-blog.xml"))}`;
const entryHtml = read(path.resolve("dist/index.html"));
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
check(sitemapLocations.length === routes.length, `Sitemap has ${sitemapLocations.length} URLs; expected ${routes.length}`);
check(entryHtml.includes("<style data-entry-css>"), "Entry CSS was not inlined into the production HTML");
check(!/<link\s+rel="stylesheet"\s+crossorigin\s+href="\/assets\/index-[^"]+\.css">/i.test(entryHtml), "Render-blocking entry stylesheet is still present");
const homePreloads = [...entryHtml.matchAll(/<link rel="modulepreload" href="\/assets\/([^"]+\.js)"/g)].map((match) => match[1]);
check(homePreloads.some((asset) => /^Home-[\w-]+\.js$/.test(asset)), "Initial Home chunk is not preloaded");
check(homePreloads.length >= 5, `Only ${homePreloads.length} initial route modules are preloaded`);

for (const route of routes) {
  const directory = path.join(distDir, ...route.routePath.split("/").filter(Boolean));
  const html = read(path.join(directory, "index.html"));
  const markdown = read(path.join(directory, "index.md"));
  const canonical = `${SITE_ORIGIN}${route.routePath}`;
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const schemaBlocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const modulePreloads = [...html.matchAll(/<link rel="modulepreload" href="\/assets\/([^"]+\.js)"/g)].map((match) => match[1]);
  const localPath = route.routePath.replace(/^\/(pt|en)(?=\/|$)/, "") || "/";

  check(sitemapLocations.includes(canonical), `Route absent from sitemap: ${canonical}`);
  check(canonicalMatch === canonical, `Invalid canonical for ${route.routePath}: ${canonicalMatch || "missing"}`);
  check(h1Count === 1, `${route.routePath} has ${h1Count} H1 elements; expected 1`);
  check(schemaBlocks.length >= 3, `${route.routePath} is missing route-specific JSON-LD`);
  for (const [, json] of schemaBlocks) {
    try { JSON.parse(json); } catch (error) { failures.push(`Invalid JSON-LD for ${route.routePath}: ${error.message}`); }
  }
  if (route.schemaType === "BlogPosting") {
    const routeSchema = schemaBlocks
      .map(([, json]) => { try { return JSON.parse(json); } catch { return null; } })
      .find((schema) => Array.isArray(schema?.["@graph"]));
    const graph = routeSchema?.["@graph"] || [];
    const webPage = graph.find((entity) => entity?.["@type"] === "WebPage");
    const article = graph.find((entity) => entity?.["@type"] === "BlogPosting");
    check(webPage?.["@id"] === `${canonical}#webpage`, `${route.routePath} has an invalid WebPage identifier`);
    check(article?.["@id"] === `${canonical}#article`, `${route.routePath} has an invalid BlogPosting identifier`);
    check(webPage?.mainEntity?.["@id"] === `${canonical}#article`, `${route.routePath} WebPage does not reference its article`);
    check(article?.mainEntityOfPage?.["@id"] === `${canonical}#webpage`, `${route.routePath} article does not reference its WebPage`);
    check(article?.author?.name === (route.article.author || "Rodrigo Póvoa"), `${route.routePath} has an invalid article author`);
    check(article?.publisher?.["@id"] === `${SITE_ORIGIN}/#organization`, `${route.routePath} has an invalid article publisher`);
  }
  check(markdown.length > 100, `Markdown is empty or too short for ${route.routePath}`);
  check(markdown.includes(`# ${route.heading}`), `Markdown heading mismatch for ${route.routePath}`);
  check(markdown.includes(`Canonical: ${canonical}`), `Markdown canonical missing for ${route.routePath}`);
  if (localPath !== "/") check(!modulePreloads.some((asset) => /^Home-[\w-]+\.js$/.test(asset)), `${route.routePath} incorrectly preloads the Home chunk`);
  if (localPath === "/projects") check(modulePreloads.some((asset) => /^Projects-[\w-]+\.js$/.test(asset)), `${route.routePath} is missing its Projects preload`);
  if (localPath === "/cookies") {
    check(modulePreloads.some((asset) => /^CookiesPage-[\w-]+\.js$/.test(asset)), `${route.routePath} is missing its Cookies preload`);
    check(html.includes("bg_LegalPages-768.webp 768w"), `${route.routePath} is missing the responsive legal hero preload`);
  }
}

const agent = read(path.join(distDir, ".well-known", "agent.json"));
try {
  const parsed = JSON.parse(agent);
  check(parsed.url === SITE_ORIGIN, "agent.json has an invalid canonical URL");
  check(parsed.discovery?.llms === `${SITE_ORIGIN}/llms.txt`, "agent.json does not reference llms.txt");
} catch (error) { failures.push(`Invalid agent.json: ${error.message}`); }
check(read(path.join(distDir, "llms.txt")).includes("# Sapiente.AI"), "Generated llms.txt is invalid");
check(read(path.join(distDir, "llms-full.txt")).includes("## Canonical public pages"), "Generated llms-full.txt is invalid");
check(read(path.join(distDir, "404.html")).includes("noindex, nofollow"), "404 document must be noindex");

const vercel = JSON.parse(read(path.resolve("vercel.json")));
const varyHeader = vercel.headers?.flatMap((rule) => rule.headers || []).find((header) => header.key.toLowerCase() === "vary");
const markdownRewrite = vercel.rewrites?.find((rule) => rule.has?.some((condition) => condition.key?.toLowerCase() === "accept"));
const markdownHeader = vercel.headers?.find((rule) =>
  rule.has?.some((condition) => condition.key?.toLowerCase() === "accept") &&
  rule.headers?.some((header) => header.key.toLowerCase() === "content-type" && header.value.startsWith("text/markdown"))
);
check(varyHeader?.value === "Accept", "vercel.json must send Vary: Accept");
check(Boolean(markdownRewrite), "vercel.json is missing Accept: text/markdown negotiation");
check(Boolean(markdownHeader), "vercel.json is missing the negotiated text/markdown content type");

if (failures.length) throw new Error(`Build validation failed:\n- ${failures.join("\n- ")}`);

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const wantsMarkdown = request.headers.accept?.includes("text/markdown");
  const relative = pathname.replace(/^\/+|\/+$/g, "");
  const routeDirectory = path.resolve(distDir, relative);
  const target = path.join(routeDirectory, wantsMarkdown ? "index.md" : "index.html");
  const insideDist = target.startsWith(`${distDir}${path.sep}`);
  response.setHeader("Vary", "Accept");
  if (insideDist && fs.existsSync(target)) {
    response.statusCode = 200;
    response.setHeader("Content-Type", wantsMarkdown ? "text/markdown; charset=utf-8" : "text/html; charset=utf-8");
    response.end(fs.readFileSync(target));
    return;
  }
  response.statusCode = 404;
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.end(fs.readFileSync(path.join(distDir, "404.html")));
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
try {
  const { port } = server.address();
  for (const route of routes) {
    const htmlResponse = await fetch(`http://127.0.0.1:${port}${route.routePath}`);
    const markdownResponse = await fetch(`http://127.0.0.1:${port}${route.routePath}`, { headers: { Accept: "text/markdown" } });
    assert.equal(htmlResponse.status, 200, `HTML status for ${route.routePath}`);
    assert.equal(markdownResponse.status, 200, `Markdown status for ${route.routePath}`);
    assert.match(markdownResponse.headers.get("content-type") || "", /^text\/markdown/, `Markdown content type for ${route.routePath}`);
    assert.equal(markdownResponse.headers.get("vary"), "Accept", `Vary header for ${route.routePath}`);
  }
  const missing = await fetch(`http://127.0.0.1:${port}/pt/definitely-not-a-real-page`);
  assert.equal(missing.status, 404, "Unknown URLs must return HTTP 404");
} finally {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}

console.log(`Build validation passed: ${routes.length} HTML pages, Markdown variants, schemas, sitemap entries and HTTP contracts.`);
