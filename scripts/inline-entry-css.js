import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html not found. Run this script after vite build.");
}

const html = fs.readFileSync(indexPath, "utf8");
const stylesheetPattern = /\s*<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/index-[^"]+\.css)">/i;
const stylesheetMatch = html.match(stylesheetPattern);

if (!stylesheetMatch) {
  throw new Error("Entry stylesheet link was not found in dist/index.html.");
}

const stylesheetPath = path.join(distDir, ...stylesheetMatch[1].split("/").filter(Boolean));
if (!fs.existsSync(stylesheetPath)) {
  throw new Error(`Entry stylesheet not found: ${stylesheetPath}`);
}

const css = fs.readFileSync(stylesheetPath, "utf8").replaceAll("</style", "<\\/style");
const optimizedHtml = html.replace(
  stylesheetPattern,
  `\n    <style data-entry-css>${css}</style>`
);

fs.writeFileSync(indexPath, optimizedHtml);
console.log(`Inlined entry CSS: ${stylesheetMatch[1]} (${Buffer.byteLength(css)} bytes before compression).`);
