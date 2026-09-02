import fs from "node:fs";
import path from "node:path";
import { alternatePath, getIndexableRoutes, SITE_ORIGIN } from "./site-routes.js";

const distDir = path.resolve("dist");
const basePath = path.join(distDir, "index.html");
if (!fs.existsSync(basePath)) throw new Error("dist/index.html not found. Run after vite build.");
const baseHtml = fs.readFileSync(basePath, "utf8");
const assetNames = fs.readdirSync(path.join(distDir, "assets"));
const bootstrapAssets = new Set(
  [...baseHtml.matchAll(/<script[^>]*\stype="module"[^>]*\ssrc="[^"]*\/([^/"?]+\.js)"[^>]*><\/script>/g)]
    .map((match) => match[1]),
);

const escapeHtml = (value = "") => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const absoluteImage = (image) => image?.startsWith("http") ? image : `${SITE_ORIGIN}${image || "/media/og/og-image.jpg"}`;
const formattedTitle = (title) => title === "Sapiente.AI" ? title : `Sapiente.AI - ${title}`;

const heroImages = new Map([
  ["/", "/media/bg/bg_hero.webp"],
  ["/about", "/media/bg/sobre/bg_Sobre_nos.webp"],
  ["/services", "/media/bg/servicos/bg_Servicos.webp"],
  ["/projects", "/media/bg/bg_Projetos.webp"],
  ["/faq", "/media/bg/bg_FAQ.webp"],
  ["/blog", "/media/bg/bg_blog.webp"],
  ["/sitemap", "/media/bg/bg_Mapa_Site.webp"],
  ["/quiz-ia", "/media/bg/bg_Quiz.webp"],
  ["/quiz-ai", "/media/bg/bg_Quiz.webp"],
  ["/cookies", "/media/bg/bg_LegalPages.webp"],
  ["/terms", "/media/bg/bg_LegalPages.webp"],
  ["/privacy", "/media/bg/bg_LegalPages.webp"],
  ["/trust", "/media/bg/bg_LegalPages.webp"],
  ["/generative-ai-policy", "/media/bg/bg_LegalPages.webp"],
]);

const routeChunkPrefixes = new Map([
  ["/", "Home"], ["/about", "About"], ["/services", "Services"],
  ["/projects", "Projects"], ["/faq", "FAQ"], ["/blog", "Blog"],
  ["/sitemap", "Sitemap"], ["/quiz-ia", "QuizAI"], ["/quiz-ai", "QuizAI"],
  ["/cookies", "CookiesPage"], ["/terms", "Terms"], ["/privacy", "Privacy"],
  ["/trust", "Trust"], ["/generative-ai-policy", "GenerativeAIPolicy"],
]);

function localRoutePath(route) {
  return route.routePath.replace(/^\/(pt|en)(?=\/|$)/, "") || "/";
}

function routeModulePreloads(route) {
  const localPath = localRoutePath(route);
  const prefix = route.schemaType === "BlogPosting" ? "BlogArticle" : routeChunkPrefixes.get(localPath);
  if (!prefix) return "";
  const chunk = assetNames.find((asset) => new RegExp(`^${prefix}-[\\w-]+\\.js$`).test(asset));
  if (!chunk) return "";
  const source = fs.readFileSync(path.join(distDir, "assets", chunk), "utf8");
  const dependencies = [...source.matchAll(/from"\.\/([^"]+\.js)"/g)]
    .map((match) => match[1])
    .filter((asset, index, list) => !bootstrapAssets.has(asset) && list.indexOf(asset) === index);
  return [chunk, ...dependencies]
    .map((asset) => `  <link rel="modulepreload" href="/assets/${asset}" />`)
    .join("\n");
}

function heroPreload(route) {
  const localPath = localRoutePath(route);
  const image = heroImages.get(localPath);
  if (!image) return "";
  if (localPath === "/") {
    return `  <link rel="preload" href="/media/bg/bg_hero.webp" as="image" type="image/webp" imagesrcset="/media/bg/bg_hero-960.webp 960w, /media/bg/bg_hero-1600.webp 1600w, /media/bg/bg_hero.webp 1618w" imagesizes="100vw" fetchpriority="high" />`;
  }
  if (localPath === "/projects") {
    return `  <link rel="preload" href="/media/bg/bg_Projetos.webp" as="image" type="image/webp" imagesrcset="/media/bg/bg_Projetos-640.webp 640w, /media/bg/bg_Projetos.webp 1024w" imagesizes="100vw" fetchpriority="high" />`;
  }
  if (localPath === "/sitemap") {
    return `  <link rel="preload" href="/media/bg/bg_Mapa_Site-1600.webp" as="image" type="image/webp" imagesrcset="/media/bg/bg_Mapa_Site-768.webp 768w, /media/bg/bg_Mapa_Site-1600.webp 1600w, /media/bg/bg_Mapa_Site.webp 2076w" imagesizes="100vw" fetchpriority="high" />`;
  }
  if (["/cookies", "/terms", "/privacy", "/trust", "/generative-ai-policy"].includes(localPath)) {
    return `  <link rel="preload" href="/media/bg/bg_LegalPages-1600.webp" as="image" type="image/webp" imagesrcset="/media/bg/bg_LegalPages-768.webp 768w, /media/bg/bg_LegalPages-1600.webp 1600w, /media/bg/bg_LegalPages.webp 1920w" imagesizes="100vw" fetchpriority="high" />`;
  }
  return `  <link rel="preload" href="${image}" as="image" type="image/webp" fetchpriority="high" />`;
}

function replaceMeta(html, attribute, name, value) {
  const expression = new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*\\/?>(?![\\s\\S]*<meta\\s+${attribute}="${name}")`, "i");
  const tag = `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`;
  return expression.test(html) ? html.replace(expression, tag) : html.replace("</head>", `  ${tag}\n  </head>`);
}

function routeSchema(route) {
  const url = `${SITE_ORIGIN}${route.routePath}`;
  if (route.schemaType === "BlogPosting") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: route.title,
          description: route.description,
          inLanguage: route.lang === "pt" ? "pt-PT" : "en",
          isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
          about: { "@id": `${SITE_ORIGIN}/#organization` },
          mainEntity: { "@id": `${url}#article` },
        },
        {
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          url,
          headline: route.article.title,
          description: route.description,
          keywords: route.article.keywords,
          datePublished: route.article.date,
          dateModified: route.article.date,
          image: absoluteImage(route.article.image),
          inLanguage: route.lang === "pt" ? "pt-PT" : "en",
          author: {
            "@type": "Person",
            name: route.article.author || "Rodrigo Póvoa",
            ...(route.article.authorImage ? { image: absoluteImage(route.article.authorImage) } : {}),
          },
          publisher: { "@id": `${SITE_ORIGIN}/#organization` },
          ...(route.article.sourceUrl ? { citation: route.article.sourceUrl } : {}),
          mainEntityOfPage: { "@id": `${url}#webpage` },
          isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        },
      ],
    };
  }

  const common = {
    "@context": "https://schema.org",
    "@type": route.schemaType || "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: route.lang === "pt" ? "pt-PT" : "en",
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    about: { "@id": `${SITE_ORIGIN}/#organization` },
  };
  if (route.schemaType === "FAQPage") common.mainEntity = route.faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  }));
  return common;
}

function staticContent(route) {
  const navigation = route.lang === "pt"
    ? [["/pt", "Início"], ["/pt/about", "Sobre"], ["/pt/services", "Serviços"], ["/pt/projects", "Projetos"], ["/pt/faq", "FAQ"], ["/pt/blog", "Blog"]]
    : [["/en", "Home"], ["/en/about", "About"], ["/en/services", "Services"], ["/en/projects", "Projects"], ["/en/faq", "FAQ"], ["/en/blog", "Blog"]];
  return `<main id="prerendered-content" data-prerendered="true" hidden aria-hidden="true">
    <article>
      <h1>${escapeHtml(route.heading)}</h1>
      <p>${escapeHtml(route.description)}</p>
      ${route.schemaType === "BlogPosting" ? `<p>${escapeHtml(route.article.excerpt)}</p><p>${escapeHtml(route.article.author)} · <time datetime="${escapeHtml(route.article.date)}">${escapeHtml(route.article.date)}</time></p>${route.article.sourceUrl ? `<p>${route.lang === "pt" ? "Publicado originalmente em" : "Originally published by"} <a href="${escapeHtml(route.article.sourceUrl)}">${escapeHtml(route.article.sourceName)}</a></p>` : ""}` : ""}
      ${route.schemaType === "FAQPage" ? route.faqItems.map((item) => `<section><h2>${escapeHtml(item.question)}</h2><p>${escapeHtml(item.answer)}</p></section>`).join("") : ""}
    </article>
    <nav aria-label="${route.lang === "pt" ? "Navegação principal" : "Main navigation"}"><ul>${navigation.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul></nav>
    <address>Sapiente.AI · São João da Madeira, Aveiro, Portugal · <a href="mailto:contacto@sapienteai.com">contacto@sapienteai.com</a></address>
  </main>`;
}

function routeMarkdown(route) {
  const url = `${SITE_ORIGIN}${route.routePath}`;
  const lines = [
    `# ${route.heading}`,
    "",
    route.description,
    "",
    `- Canonical: ${url}`,
    `- Language: ${route.lang === "pt" ? "pt-PT" : "en"}`,
    `- Publisher: Sapiente.AI`,
  ];
  if (route.schemaType === "FAQPage") {
    lines.push("", "## Questions and answers", "");
    for (const item of route.faqItems) lines.push(`### ${item.question}`, "", item.answer, "");
  }
  if (route.schemaType === "BlogPosting") {
    lines.push("", `- Author: ${route.article.author || "Sapiente.AI"}`, `- Published: ${route.article.date}`, "", route.article.content || route.article.excerpt);
    if (route.article.sourceUrl) lines.push("", `Original publication: [${route.article.sourceName}](${route.article.sourceUrl})`);
  }
  lines.push("", `Source: ${url}`, "");
  return lines.join("\n");
}

function render(route) {
  const url = `${SITE_ORIGIN}${route.routePath}`;
  const title = formattedTitle(route.title);
  const image = absoluteImage(route.image);
  let html = baseHtml
    .replace(/\s*<link rel="modulepreload" href="\/assets\/[^"]+\.js" \/>/g, "")
    .replace(/<html lang="[^"]*">/i, `<html lang="${route.lang === "pt" ? "pt-PT" : "en"}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${url}" />`)
    .replace(/<link rel="alternate" hreflang="pt" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="pt" href="${SITE_ORIGIN}${alternatePath(route, "pt")}" />`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="en" href="${SITE_ORIGIN}${alternatePath(route, "en")}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${alternatePath(route, "pt")}" />`)
    .replace("</head>", `${routeModulePreloads(route)}\n${heroPreload(route)}\n  </head>`)
    .replace("</head>", `  <link rel="alternate" type="text/markdown" href="${url}" />\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${staticContent(route)}</div>`);

  if (route.availableLanguages && !route.availableLanguages.includes("en")) {
    html = html
      .replace(/\s*<link rel="alternate" hreflang="en" href="[^"]*"\s*\/>/i, "")
      .replace(/<meta property="og:locale:alternate" content="[^"]*"\s*\/>/i, "");
  }

  for (const [attribute, name, value] of [
    ["name", "description", route.description], ["name", "keywords", route.article?.keywords || "artificial intelligence, automation, digital transformation, Sapiente.AI"], ["name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"],
    ["property", "og:title", title], ["property", "og:description", route.description], ["property", "og:url", url], ["property", "og:type", route.schemaType === "BlogPosting" ? "article" : "website"], ["property", "og:image", image],
    ["property", "og:locale", route.lang === "pt" ? "pt_PT" : "en_US"], ["property", "og:locale:alternate", route.lang === "pt" ? "en_US" : "pt_PT"],
    ["name", "twitter:title", title], ["name", "twitter:description", route.description], ["name", "twitter:url", url], ["name", "twitter:image", image], ["name", "twitter:card", "summary_large_image"],
  ]) html = replaceMeta(html, attribute, name, value);

  html = html.replace("</head>", `  <script type="application/ld+json" id="route-schema">${JSON.stringify(routeSchema(route)).replaceAll("<", "\\u003c")}</script>\n  </head>`);
  return html;
}

const routes = getIndexableRoutes();
for (const route of routes) {
  const directory = path.join(distDir, ...route.routePath.split("/").filter(Boolean));
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), render(route));
  fs.writeFileSync(path.join(directory, "index.md"), routeMarkdown(route));
}

const notFound = baseHtml
  .replace(/<title>[\s\S]*?<\/title>/i, "<title>404 - Sapiente.AI</title>")
  .replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/>/i, '<meta name="robots" content="noindex, nofollow" />')
  .replace('<div id="root"></div>', '<div id="root"><main><h1>404</h1><p>Page not found.</p><p><a href="/pt">Sapiente.AI</a></p></main></div>');
fs.writeFileSync(path.join(distDir, "404.html"), notFound);

console.log(`Pre-rendered ${routes.length} indexable routes and a real 404 document.`);
