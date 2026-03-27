import fs from "fs";
import { getAllBlogArticles } from "./blogData.js";

const BASE = "https://sapienteai.com";

  const pages = [
    "",
    "/portfolio",
    "/faq",
    "/privacy",
    "/blog",
    "/news",
    "/terms",
    "/lgpd",
    "/inteligencia-artificial-empresas"
  ];

const blog = getAllBlogArticles();

const build = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${BASE}${u}</loc></url>`).join("")}
</urlset>`;

// gerar arquivos
fs.writeFileSync("./public/sitemap-pages.xml", build(pages));
fs.writeFileSync("./public/sitemap-blog.xml", build(blog.map(a => `/blog/${a.slug}`)));
fs.writeFileSync("./public/sitemap-news.xml", build(["/noticias"]));

// index
fs.writeFileSync("./public/sitemap.xml", `
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${BASE}/sitemap-pages.xml</loc></sitemap>
  <sitemap><loc>${BASE}/sitemap-blog.xml</loc></sitemap>
  <sitemap><loc>${BASE}/sitemap-news.xml</loc></sitemap>
</sitemapindex>
`);

console.log("🔥 Sitemap enterprise criado");