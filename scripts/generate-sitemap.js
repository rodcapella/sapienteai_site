import fs from "fs";
import path from "path";

const BASE_URL = "https://sapienteai.com";

const languages = ["pt", "en"];

const pages = [
  "",
  "/about",
  "/portfolio",
  "/faq",
  "/privacy",
  "/terms",
  "/team",
  "/lgpd"
];

const urls = languages.flatMap((lang) =>
  pages.map((p) => `${BASE_URL}/${lang}${p}`)
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
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

const publicDir = path.resolve("./public");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml);

console.log("✅ Sitemap gerado");