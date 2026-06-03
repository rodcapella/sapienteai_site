import fs from "fs";
import path from "path";

const BASE_URL = "https://sapienteai.com";

const languages = ["pt", "en"];

const pages = [
  "",
  "/about",
  "/services",
  "/faq",
  "/terms",
  "/privacy",
  "/trust",
  "/generative-ai-policy",
  "/blog",
  "/seo-geo-aeo-validator",
  "/sitemap"
];

const urls = languages.flatMap((lang) => [
  ...pages.map((p) => `${BASE_URL}/${lang}${p}`),
  `${BASE_URL}/${lang}/${lang === "pt" ? "quiz-ia" : "quiz-ai"}`,
]);

const blogDataPath = path.resolve("./client/src/lib/blogData.ts");
const blogSlugs = fs.existsSync(blogDataPath)
  ? [...fs.readFileSync(blogDataPath, "utf8").matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1])
  : [];
const blogUrls = languages.flatMap((lang) =>
  blogSlugs.map((slug) => `${BASE_URL}/${lang}/blog/${slug}`)
);

function toUrlSet(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <priority>${url.endsWith(`/${url.split("/")[3]}`) ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;
}

const xml = toUrlSet(urls);

const publicDir = path.resolve("./client/public");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml);
fs.writeFileSync(path.join(publicDir, "sitemap-pages.xml"), xml);
fs.writeFileSync(path.join(publicDir, "sitemap-blog.xml"), toUrlSet(blogUrls));
fs.writeFileSync(path.join(publicDir, "sitemap-blog-xml"), toUrlSet(blogUrls));
fs.writeFileSync(path.join(publicDir, "sitemap-news.xml"), toUrlSet([]));

console.log("✅ Sitemap gerado");
