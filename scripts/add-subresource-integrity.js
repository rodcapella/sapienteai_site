import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
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

const assets = await readdir(path.join(projectRoot, "dist", "assets"));
const homeChunk = assets.find((asset) => /^Home-[\w-]+\.js$/.test(asset));

if (!homeChunk) {
  throw new Error("No production Home chunk was found for module preloading.");
}

const homeSource = await readFile(path.join(projectRoot, "dist", "assets", homeChunk), "utf8");
const bootstrapAssets = new Set(matches.map((match) => path.basename(match[2])));
const homeDependencies = [...homeSource.matchAll(/from"\.\/([^"]+\.js)"/g)]
  .map((match) => match[1])
  .filter((asset, index, list) => !bootstrapAssets.has(asset) && list.indexOf(asset) === index);
const preloadedAssets = [homeChunk, ...homeDependencies];
const preloadTags = preloadedAssets
  .map((asset) => `    <link rel="modulepreload" href="/assets/${asset}" />`)
  .join("\n");

html = html.replace("</head>", `${preloadTags}\n  </head>`);

await writeFile(indexPath, html, "utf8");
console.log(`Added SHA-384 integrity validation to ${matches.length} production bootstrap script(s).`);
console.log(`Added module preload for Home and ${homeDependencies.length} direct dependencies.`);
