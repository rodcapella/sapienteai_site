import fs from "fs";
import path from "path";
import { generateSitemap } from "../src/lib/generateSitemap.js"; // ajusta o path se necessário

const publicDir = path.resolve("./public");
const filePath = path.join(publicDir, "sitemap-pages.xml");

// 🔥 garante que a pasta existe
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemap = generateSitemap();

// escreve o ficheiro
fs.writeFileSync(filePath, sitemap);

console.log("✅ Sitemap gerado em:", filePath);