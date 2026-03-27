import { getAllBlogArticles } from "@/lib/blogData";

const BASE_URL = "https://sapienteai.com";

export function generateSitemap() {
  const staticPages = [
    "",
    "/portfolio",
    "/blog",
    "/news",
    "/faq",
    "/privacy",
    "/terms",
    "/lgpd",
    "/gdpr",
    "/AiPillar",
    "/inteligencia-artificial-empresas",
  ];

  const blogArticles = getAllBlogArticles();

  const urls = [
    ...staticPages.map((path) => ({
      loc: `${BASE_URL}${path}`,
      priority: path === "" ? "1.0" : "0.8",
    })),

    ...blogArticles.map((article) => ({
      loc: `${BASE_URL}/blog/${article.slug}`,
      priority: "0.7",
    })),
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