import fs from "node:fs";
import path from "node:path";
import { alternatePath, getIndexableRoutes, SITE_ORIGIN } from "./site-routes.js";

const distDir = path.resolve("dist");
const basePath = path.join(distDir, "index.html");
if (!fs.existsSync(basePath)) throw new Error("dist/index.html not found. Run after vite build.");
const baseHtml = fs.readFileSync(basePath, "utf8");

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
]);

function heroPreload(route) {
  const localPath = route.routePath.replace(/^\/(pt|en)(?=\/|$)/, "") || "/";
  const image = heroImages.get(localPath);
  if (!image) return "";
  if (localPath === "/") {
    return `  <link rel="preload" href="/media/bg/bg_hero.webp" as="image" type="image/webp" imagesrcset="/media/bg/bg_hero-960.webp 960w, /media/bg/bg_hero-1600.webp 1600w, /media/bg/bg_hero.webp 1618w" imagesizes="100vw" fetchpriority="high" />`;
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
  if (route.schemaType === "BlogPosting") Object.assign(common, {
    headline: route.article.title,
    keywords: route.article.keywords,
    datePublished: route.article.date,
    dateModified: route.article.date,
    image: absoluteImage(route.article.image),
    author: { "@type": "Person", name: route.article.author || "Rodrigo Póvoa" },
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    mainEntityOfPage: { "@id": `${url}#webpage` },
  });
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
      ${route.schemaType === "BlogPosting" ? `<p>${escapeHtml(route.article.excerpt)}</p><p>${escapeHtml(route.article.author)} · <time datetime="${escapeHtml(route.article.date)}">${escapeHtml(route.article.date)}</time></p>` : ""}
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
  }
  lines.push("", `Source: ${url}`, "");
  return lines.join("\n");
}

function render(route) {
  const url = `${SITE_ORIGIN}${route.routePath}`;
  const title = formattedTitle(route.title);
  const image = absoluteImage(route.image);
  let html = baseHtml
    .replace(/<html lang="[^"]*">/i, `<html lang="${route.lang === "pt" ? "pt-PT" : "en"}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${url}" />`)
    .replace(/<link rel="alternate" hreflang="pt" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="pt" href="${SITE_ORIGIN}${alternatePath(route, "pt")}" />`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="en" href="${SITE_ORIGIN}${alternatePath(route, "en")}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/>/i, `<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${alternatePath(route, "pt")}" />`)
    .replace("</head>", `${heroPreload(route)}\n  </head>`)
    .replace("</head>", `  <link rel="alternate" type="text/markdown" href="${url}" />\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${staticContent(route)}</div>`);

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
