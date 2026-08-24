import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { getIndexableRoutes, SITE_ORIGIN } from "./site-routes.js";

const publicDir = path.resolve("client/public");
const existingDates = new Map();

for (const file of ["sitemap-pages.xml", "sitemap-blog.xml"]) {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) continue;
  const xml = fs.readFileSync(filePath, "utf8");
  for (const match of xml.matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>([^<]+)<\/lastmod>[\s\S]*?<\/url>/g)) existingDates.set(match[1], match[2]);
}

function gitDate(files) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], { encoding: "utf8" }).trim() || undefined;
  } catch {
    return undefined;
  }
}

function sourcesFor(route) {
  if (route.schemaType === "BlogPosting") return ["client/src/lib/blogData.ts"];
  const segment = route.routePath.split("/")[2] || "home";
  const pageSources = {
    home: ["client/src/pages/Home.tsx", `client/src/content/${route.lang}/home.ts`],
    about: ["client/src/pages/About.tsx", `client/src/content/${route.lang}/about.ts`],
    services: ["client/src/pages/Services.tsx", `client/src/content/${route.lang}/services.ts`],
    projects: ["client/src/pages/Projects.tsx"], faq: ["client/src/pages/FAQ.tsx", `client/src/content/${route.lang}/faq.ts`],
    blog: ["client/src/pages/Blog.tsx", "client/src/lib/blogData.ts"], sitemap: ["client/src/pages/Sitemap.tsx", `client/src/content/${route.lang}/sitemap.ts`],
    cookies: ["client/src/pages/CookiesPage.tsx", `client/src/content/${route.lang}/cookies.ts`], terms: ["client/src/pages/Terms.tsx", `client/src/content/${route.lang}/terms.ts`],
    privacy: ["client/src/pages/Privacy.tsx", `client/src/content/${route.lang}/privacy.ts`], trust: ["client/src/pages/Trust.tsx", `client/src/content/${route.lang}/trust.ts`],
    "generative-ai-policy": ["client/src/pages/GenerativeAIPolicy.tsx", `client/src/content/${route.lang}/iaGenerativaPolicy.ts`],
    "quiz-ia": ["client/src/pages/QuizAI.tsx", `client/src/content/${route.lang}/quiz.ts`], "quiz-ai": ["client/src/pages/QuizAI.tsx", `client/src/content/${route.lang}/quiz.ts`],
  };
  return pageSources[segment] || ["client/src/App.tsx"];
}

const routes = getIndexableRoutes().map((route) => {
  const loc = `${SITE_ORIGIN}${route.routePath}`;
  const lastmod = route.schemaType === "BlogPosting"
    ? route.article.date
    : gitDate(sourcesFor(route)) || existingDates.get(loc) || "2026-01-01";
  return { ...route, loc, lastmod };
});

const entry = ({ loc, lastmod, priority }) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
const urlset = (items) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${items.map(entry).join("\n")}\n\n</urlset>`;
const pageRoutes = routes.filter((route) => route.schemaType !== "BlogPosting");
const blogRoutes = routes.filter((route) => route.schemaType === "BlogPosting");
const maxDate = (items) => items.map((item) => item.lastmod).sort().at(-1) || "2026-01-01";

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap-pages.xml"), urlset(pageRoutes));
fs.writeFileSync(path.join(publicDir, "sitemap-blog.xml"), urlset(blogRoutes));
fs.writeFileSync(path.join(publicDir, "sitemap-news.xml"), urlset([]));
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${SITE_ORIGIN}/sitemap-pages.xml</loc><lastmod>${maxDate(pageRoutes)}</lastmod></sitemap>\n  <sitemap><loc>${SITE_ORIGIN}/sitemap-blog.xml</loc><lastmod>${maxDate(blogRoutes)}</lastmod></sitemap>\n</sitemapindex>\n`);

console.log(`Sitemaps generated: ${pageRoutes.length} pages and ${blogRoutes.length} articles.`);
