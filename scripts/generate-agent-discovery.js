import fs from "node:fs";
import path from "node:path";
import { getIndexableRoutes, SITE_ORIGIN } from "./site-routes.js";

const publicDir = path.resolve("client/public");
const wellKnownDir = path.join(publicDir, ".well-known");
const routes = getIndexableRoutes();
const institutional = routes.filter((route) => route.schemaType !== "BlogPosting");
const articles = routes.filter((route) => route.schemaType === "BlogPosting");

const linkList = (items) => items.map((route) => `- [${route.title}](${SITE_ORIGIN}${route.routePath}): ${route.description}`).join("\n");
const concise = `# Sapiente.AI

> Applied artificial intelligence, automation, data, web development and digital growth company based in São João da Madeira, Aveiro, Portugal.

## Official information

- Website: ${SITE_ORIGIN}
- Email: contacto@sapienteai.com
- Telephone and WhatsApp: +351 910 567 575
- Languages: Portuguese and English
- Content preferences: ai-train=no, search=yes, ai-input=yes

## Main pages

${linkList(institutional.filter((route) => ["/pt", "/en", "/pt/about", "/pt/services", "/pt/projects", "/pt/faq", "/pt/blog"].includes(route.routePath)))}

## Discovery

- [Full context](${SITE_ORIGIN}/llms-full.txt)
- [Agent manifest](${SITE_ORIGIN}/.well-known/agent.json)
- [Sitemap](${SITE_ORIGIN}/sitemap.xml)
- [Robots policy](${SITE_ORIGIN}/robots.txt)
`;

const full = `# Sapiente.AI — Full website context

## Identity

Sapiente.AI combines strategy, artificial intelligence and execution to help organisations acquire customers, automate operations, improve decisions and create measurable digital growth.

- Official domain: ${SITE_ORIGIN}
- Location: São João da Madeira, Aveiro, Portugal
- Contact: contacto@sapienteai.com · +351 910 567 575
- Primary languages: Portuguese (Portugal) and English

## Capabilities

- Applied artificial intelligence and generative AI
- Intelligent process automation and systems integration
- Data analysis, dashboards and business intelligence
- Conversion-oriented websites and web platforms
- Digital marketing, content and performance campaigns
- SEO, GEO and AEO strategy

## Canonical public pages

${linkList(institutional)}

## Published articles

${linkList(articles)}

## Official social profiles

- LinkedIn: https://www.linkedin.com/company/sapiente-ai/
- Instagram: https://www.instagram.com/sapienteai/
- Facebook: https://www.facebook.com/sapienteai
- TikTok: https://www.tiktok.com/@sapienteai
- X: https://x.com/SapienteAI
- Pinterest: https://www.pinterest.com/sapienteai

## Attribution and usage

Public factual information may be quoted or summarised with attribution to Sapiente.AI and a link to the relevant canonical page. The website pages remain the authoritative source. Content signals: ai-train=no, search=yes, ai-input=yes.
`;

const manifest = {
  schema_version: "1.0",
  name: "Sapiente.AI",
  description: "Applied AI, automation, data, web development and digital growth.",
  url: SITE_ORIGIN,
  languages: ["pt-PT", "en"],
  contact: { email: "contacto@sapienteai.com", telephone: "+351910567575" },
  location: { locality: "São João da Madeira", region: "Aveiro", country: "PT" },
  discovery: {
    llms: `${SITE_ORIGIN}/llms.txt`,
    llms_full: `${SITE_ORIGIN}/llms-full.txt`,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    robots: `${SITE_ORIGIN}/robots.txt`,
  },
  content_negotiation: { media_type: "text/markdown", header: "Accept: text/markdown" },
  content_signals: { ai_train: false, search: true, ai_input: true },
  capabilities: ["applied-ai", "automation", "data-analytics", "web-development", "digital-marketing", "seo", "geo", "aeo"],
};

fs.mkdirSync(wellKnownDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "llms.txt"), concise);
fs.writeFileSync(path.join(publicDir, "llms-full.txt"), full);
fs.writeFileSync(path.join(wellKnownDir, "agent.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated llms.txt, llms-full.txt and agent.json from ${routes.length} canonical routes.`);
