import fs from "fs";
import { generateSitemaps } from "../src/lib/generateSitemaps.js";

const { pages, blog } = generateSitemaps();

fs.writeFileSync("./public/sitemap-pages.xml", pages);
fs.writeFileSync("./public/sitemap-blog.xml", blog);

fs.writeFileSync("./public/sitemap.xml", `
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://sapienteai.com/sitemap-pages.xml</loc></sitemap>
  <sitemap><loc>https://sapienteai.com/sitemap-blog.xml</loc></sitemap>
</sitemapindex>
`);

console.log("🔥 Sitemaps enterprise gerados");