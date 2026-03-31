import { getAllBlogArticles } from "@/lib/blogData";

const BASE_URL = "https://sapienteai.com";

const languages = ["pt", "en"];

export function generateSitemap() {
  const staticPages = [
    "",
    "/portfolio",
    "/about",
    "/blog",
    "/news",
    "/faq",
    "/privacy",
    "/terms",
    "/team",
    "/trust",
    "/lgpd",
  ];

  const blogArticles = getAllBlogArticles();

  const urls = [
    // 🔥 páginas estáticas multilíngua
    ...languages.flatMap((lang) =>
      staticPages.map((path) => ({
        loc: `${BASE_URL}/${lang}${path}`,
        priority: path === "" ? "1.0" : "0.8",
      }))
    ),

    // 🔥 blog multilíngua (se tiver)
    ...blogArticles.flatMap((article) =>
      languages.map((lang) => ({
        loc: `${BASE_URL}/${lang}/blog/${article.slug}`,
        priority: "0.7",
      }))
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;
}