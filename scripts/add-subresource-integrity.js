import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(projectRoot, "dist", "index.html");
let html = await readFile(indexPath, "utf8");

const moduleScriptPattern = /<script([^>]*\stype="module"[^>]*\ssrc="([^"]+)"[^>]*)><\/script>/g;
const matches = [...html.matchAll(moduleScriptPattern)];

if (matches.length === 0) {
  throw new Error("No production module bootstrap was found for SRI validation.");
}

for (const match of matches) {
  const [tag, attributes, source] = match;
  const assetPath = path.join(projectRoot, "dist", source.replace(/^\//, ""));
  const asset = await readFile(assetPath);
  const integrity = `sha384-${createHash("sha384").update(asset).digest("base64")}`;
  const crossorigin = /\scrossorigin(?:=|\s|$)/.test(attributes)
    ? ""
    : ' crossorigin="anonymous"';
  const securedTag = `<script${attributes} integrity="${integrity}"${crossorigin}></script>`;
  html = html.replace(tag, securedTag);
}

await writeFile(indexPath, html, "utf8");
console.log(`Added SHA-384 integrity validation to ${matches.length} production bootstrap script(s).`);
