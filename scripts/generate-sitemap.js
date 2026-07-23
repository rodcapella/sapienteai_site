<<<<<<< HEAD
import fs from "fs";
import path from "path";

const BASE_URL = "https://www.sapienteai.com";
const TODAY = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
const languages = ["pt", "en"];

// Páginas com prioridades explícitas
const pages = [
  { path: "",                        priority: "1.0" },
  { path: "/about",                  priority: "0.9" },
  { path: "/services",               priority: "0.9" },
  { path: "/projects",               priority: "0.9" },
  { path: "/faq",                    priority: "0.9" },
  { path: "/blog",                   priority: "0.8" },  { path: "/sitemap",                priority: "0.5" },
  { path: "/cookies",                priority: "0.4" },
  { path: "/terms",                  priority: "0.4" },
  { path: "/privacy",                priority: "0.4" },
  { path: "/trust",                  priority: "0.4" },
  { path: "/generative-ai-policy",   priority: "0.4" },
];

const pageUrls = languages.flatMap((lang) => [
  ...pages.map(({ path: p, priority }) => ({
    loc: `${BASE_URL}/${lang}${p}`,
    priority,
  })),
  {
    loc: `${BASE_URL}/${lang}/${lang === "pt" ? "quiz-ia" : "quiz-ai"}`,
    priority: "0.8",
  },
]);

const blogDataPath = path.resolve("./client/src/lib/blogData.ts");
const blogSlugs = fs.existsSync(blogDataPath)
  ? [...fs.readFileSync(blogDataPath, "utf8").matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
  : [];
const blogUrls = languages.flatMap((lang) =>
  blogSlugs.map((slug) => ({
    loc: `${BASE_URL}/${lang}/blog/${slug}`,
    priority: "0.7",
  }))
);

// ── Helpers ──────────────────────────────────────────────────────────────────

function toUrlEntry({ loc, priority }) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
}

function toUrlSet(entries) {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ``,
    ...entries.map(toUrlEntry),
    ``,
    `</urlset>`,
  ].join("\n");
}

function toSitemapIndex(sitemaps) {
  const items = sitemaps
    .map(
      (loc) =>
        `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`
    )
    .join("\n");
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!-- Sitemap Index — gerado automaticamente por scripts/generate-sitemap.js -->`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ``,
    items,
    ``,
    `</sitemapindex>`,
  ].join("\n");
}

// ── Escrita ───────────────────────────────────────────────────────────────────

const publicDir = path.resolve("./client/public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// sitemap.xml → sitemap index
fs.writeFileSync(
  path.join(publicDir, "sitemap.xml"),
  toSitemapIndex([
    `${BASE_URL}/sitemap-pages.xml`,
    `${BASE_URL}/sitemap-blog.xml`,
  ])
);

// sitemap-pages.xml
fs.writeFileSync(path.join(publicDir, "sitemap-pages.xml"), toUrlSet(pageUrls));

// sitemap-blog.xml
fs.writeFileSync(path.join(publicDir, "sitemap-blog.xml"), toUrlSet(blogUrls));

// sitemap-news.xml (reservado para notícias futuras)
fs.writeFileSync(path.join(publicDir, "sitemap-news.xml"), toUrlSet([]));

console.log(`✅ Sitemaps gerados (${TODAY})`);
console.log(`   sitemap.xml         → sitemap index`);
console.log(`   sitemap-pages.xml   → ${pageUrls.length} URLs`);
console.log(`   sitemap-blog.xml    → ${blogUrls.length} URLs`);
=======
import fs from "fs";
import path from "path";

const BASE_URL = "https://www.sapienteai.com";
const TODAY = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
const languages = ["pt", "en"];

// Páginas com prioridades explícitas
const pages = [
  { path: "",                        priority: "1.0" },
  { path: "/about",                  priority: "0.9" },
  { path: "/services",               priority: "0.9" },
  { path: "/projects",               priority: "0.9" },
  { path: "/faq",                    priority: "0.9" },
  { path: "/blog",                   priority: "0.8" },  { path: "/sitemap",                priority: "0.5" },
  { path: "/cookies",                priority: "0.4" },
  { path: "/terms",                  priority: "0.4" },
  { path: "/privacy",                priority: "0.4" },
  { path: "/trust",                  priority: "0.4" },
  { path: "/generative-ai-policy",   priority: "0.4" },
];

const pageUrls = languages.flatMap((lang) => [
  ...pages.map(({ path: p, priority }) => ({
    loc: `${BASE_URL}/${lang}${p}`,
    priority,
  })),
  {
    loc: `${BASE_URL}/${lang}/${lang === "pt" ? "quiz-ia" : "quiz-ai"}`,
    priority: "0.8",
  },
]);

const blogDataPath = path.resolve("./client/src/lib/blogData.ts");
const blogSlugs = fs.existsSync(blogDataPath)
  ? [...fs.readFileSync(blogDataPath, "utf8").matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
  : [];
const blogUrls = languages.flatMap((lang) =>
  blogSlugs.map((slug) => ({
    loc: `${BASE_URL}/${lang}/blog/${slug}`,
    priority: "0.7",
  }))
);

// ── Helpers ──────────────────────────────────────────────────────────────────

function toUrlEntry({ loc, priority }) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
}

function toUrlSet(entries) {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ``,
    ...entries.map(toUrlEntry),
    ``,
    `</urlset>`,
  ].join("\n");
}

function toSitemapIndex(sitemaps) {
  const items = sitemaps
    .map(
      (loc) =>
        `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`
    )
    .join("\n");
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!-- Sitemap Index — gerado automaticamente por scripts/generate-sitemap.js -->`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ``,
    items,
    ``,
    `</sitemapindex>`,
  ].join("\n");
}

// ── Escrita ───────────────────────────────────────────────────────────────────

const publicDir = path.resolve("./client/public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// sitemap.xml → sitemap index
fs.writeFileSync(
  path.join(publicDir, "sitemap.xml"),
  toSitemapIndex([
    `${BASE_URL}/sitemap-pages.xml`,
    `${BASE_URL}/sitemap-blog.xml`,
  ])
);

// sitemap-pages.xml
fs.writeFileSync(path.join(publicDir, "sitemap-pages.xml"), toUrlSet(pageUrls));

// sitemap-blog.xml
fs.writeFileSync(path.join(publicDir, "sitemap-blog.xml"), toUrlSet(blogUrls));

// sitemap-news.xml (reservado para notícias futuras)
fs.writeFileSync(path.join(publicDir, "sitemap-news.xml"), toUrlSet([]));

console.log(`✅ Sitemaps gerados (${TODAY})`);
console.log(`   sitemap.xml         → sitemap index`);
console.log(`   sitemap-pages.xml   → ${pageUrls.length} URLs`);
console.log(`   sitemap-blog.xml    → ${blogUrls.length} URLs`);
>>>>>>> 905c10211b180135d5caf429c4a8cc37c6dbebe8
