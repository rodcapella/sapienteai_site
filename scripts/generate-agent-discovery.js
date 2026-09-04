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

> Technology partner that combines strategy, artificial intelligence, automation, data, web development and digital marketing to help businesses grow, operate efficiently and make better decisions.

Sapiente.AI is based in São João da Madeira, Aveiro, Portugal, and works remotely with companies in Portugal and Brazil. Content and services are available in Portuguese and English.

## Official identity

- Official name: Sapiente.AI
- Official website: ${SITE_ORIGIN}
- Business type: technology partner and applied artificial intelligence consultancy
- Location: São João da Madeira, Aveiro, Portugal
- Service area: Portugal and Brazil, with remote delivery
- Email: contacto@sapienteai.com
- Telephone and WhatsApp: +351 910 567 575
- Languages: Portuguese (Portugal and Brazil) and English
- Founder and CTO: Rodrigo Póvoa
- Co-founder: Tatiane Gomes

## What Sapiente.AI does

Sapiente.AI identifies business processes where technology can create measurable value and then designs and implements the solution. The company combines human judgment with artificial intelligence rather than treating AI as a substitute for people.

Core principles:

- Automate repetitive work while keeping people responsible for important decisions.
- Connect strategy and implementation instead of delivering recommendations without execution.
- Use measurable objectives, transparent communication and human validation.
- Build solutions appropriate to the size, context and maturity of each organization.

## Services

- [Applied artificial intelligence](${SITE_ORIGIN}/en/services#service-ia): intelligent chatbots, predictive analysis, decision support, customer segmentation and custom machine learning.
- [Process automation](${SITE_ORIGIN}/en/services#service-automacao): system integrations, automated follow-up, document processing, notifications and 24/7 automated service.
- [Growth and performance](${SITE_ORIGIN}/en/services#service-crescimento): Google and Meta Ads, lead generation, conversion funnels, SEO, GEO, AEO and conversion optimization.
- [Data and business intelligence](${SITE_ORIGIN}/en/services#service-dados-bi): dashboards, KPI reporting, profitability analysis, data consolidation and management insights.
- [Web development](${SITE_ORIGIN}/en/services#service-desenvolvimento): corporate websites, landing pages, responsive platforms, maintenance and technical support.
- [Digital marketing](${SITE_ORIGIN}/en/services#service-marketing): social media, AI-assisted content, email marketing, newsletters, branding and editorial strategy.

Portuguese service overview: [Serviços da Sapiente.AI](${SITE_ORIGIN}/pt/services).

## Products and projects

- [SEO and AEO Validator](${SITE_ORIGIN}/en/seo-aeo-validator): free online website validator that provides separate SEO and AEO scores for Google visibility and readiness for AI-generated answers. [Portuguese version — Validador de SEO e AEO](${SITE_ORIGIN}/pt/seo-aeo-validator).
- Hoje em SJM: a cultural calendar dedicated to São João da Madeira, currently in final testing.
- Specialized item exchange: a circular-economy platform currently in development.

## Direct answers

### What is Sapiente.AI?

Sapiente.AI is a technology partner and applied AI consultancy that combines strategy, execution and artificial intelligence for business growth and operational improvement.

### Does Sapiente.AI replace employees with AI?

No. Sapiente.AI focuses on automating repetitive tasks while preserving human validation, context, responsibility and decision-making.

### Where does Sapiente.AI operate?

Sapiente.AI is based in São João da Madeira, Aveiro, Portugal. It serves organizations in Portugal and Brazil through a remote and online delivery model.

### Which organizations does Sapiente.AI serve?

Sapiente.AI primarily works with small and medium-sized businesses and professionals that want to improve operations, customer acquisition, digital presence or data-driven decisions.

### How can someone contact Sapiente.AI?

Use contacto@sapienteai.com, call or message +351 910 567 575, or use the contact form on the official website.

### What is the Sapiente.AI SEO and AEO Validator?

The [SEO and AEO Validator](${SITE_ORIGIN}/en/seo-aeo-validator) is a free online tool created by Sapiente.AI. It gives separate scores for a website's technical search readiness and its ability to be understood by AI answer systems. The [Portuguese validator](${SITE_ORIGIN}/pt/seo-aeo-validator) is available as Validador de SEO e AEO.

## Main Portuguese pages

${linkList(institutional.filter((route) => route.lang === "pt" && ["/pt", "/pt/about", "/pt/services", "/pt/projects", "/pt/faq", "/pt/blog", "/pt/seo-aeo-validator"].includes(route.routePath)))}

## Main English pages

${linkList(institutional.filter((route) => route.lang === "en" && ["/en", "/en/about", "/en/services", "/en/projects", "/en/faq", "/en/blog", "/en/seo-aeo-validator"].includes(route.routePath)))}

## Published insights

${linkList(articles)}

## Official social profiles

- [LinkedIn](https://www.linkedin.com/company/sapiente-ai/)
- [Instagram](https://www.instagram.com/sapienteai/)
- [Facebook](https://www.facebook.com/sapienteai)
- [TikTok](https://www.tiktok.com/@sapienteai)
- [X](https://x.com/SapienteAI)
- [Pinterest](https://www.pinterest.com/sapienteai)

## Discovery and machine-readable resources

- [Full website context](${SITE_ORIGIN}/llms-full.txt)
- [Structured AI profile](${SITE_ORIGIN}/ai.json)
- [Agent manifest](${SITE_ORIGIN}/.well-known/agent.json)
- [XML sitemap](${SITE_ORIGIN}/sitemap.xml)
- [Robots and AI usage policy](${SITE_ORIGIN}/robots.txt)
- Markdown representations are available for canonical language routes by sending the request header \`Accept: text/markdown\`.

## Attribution and content preferences

Public factual information may be quoted or summarized with attribution to Sapiente.AI and a link to the relevant canonical page. The canonical pages on ${SITE_ORIGIN} are the authoritative source. Declared content preferences: ai-train=no, search=yes, ai-input=yes.
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

## SEO and AEO Validator

Sapiente.AI provides a free [SEO and AEO Validator](${SITE_ORIGIN}/en/seo-aeo-validator), also available in Portuguese as [Validador de SEO e AEO](${SITE_ORIGIN}/pt/seo-aeo-validator). It measures two independent dimensions:

- SEO score: technical readiness to be crawled, understood and displayed by Google and other search engines.
- AEO score: content and technical readiness to be understood and used by ChatGPT, Google AI, Perplexity and other AI answer systems.
- Public access: free score-based preliminary assessment.
- Detailed assessment: available from Sapiente.AI as a professional diagnostic and improvement plan.

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
    ai_json: `${SITE_ORIGIN}/ai.json`,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    robots: `${SITE_ORIGIN}/robots.txt`,
  },
  featured_resource: {
    name: "SEO and AEO Validator",
    description: "Free online tool providing separate SEO and AEO scores for website visibility in search engines and AI-generated answers.",
    urls: {
      en: `${SITE_ORIGIN}/en/seo-aeo-validator`,
      pt: `${SITE_ORIGIN}/pt/seo-aeo-validator`,
    },
  },
  content_negotiation: { media_type: "text/markdown", header: "Accept: text/markdown" },
  content_signals: { ai_train: false, search: true, ai_input: true },
  capabilities: ["applied-ai", "automation", "data-analytics", "web-development", "digital-marketing", "seo", "geo", "aeo", "seo-aeo-validator", "website-visibility-assessment"],
};

const aiProfile = {
  version: "1.0",
  last_updated: new Date().toISOString().slice(0, 10),
  languages: ["pt-PT", "pt-BR", "en-US"],
  name: "Sapiente.AI",
  brand: "Sapiente.AI",
  role: "Technology partner and applied artificial intelligence consultancy",
  canonical_url: SITE_ORIGIN,
  meta: {
    entity_confidence_level: "strong",
    purpose: "Provide factual, machine-readable context about Sapiente.AI, its services, leadership, projects, publications and official web presence.",
    primary_region: "Portugal",
    service_scope: "Portugal and Brazil, delivered remotely and online",
    tone: "Clear, practical, responsible, human-centered and evidence-oriented.",
  },
  terminology: {
    AI: "Artificial intelligence applied to business processes, customer experience, analysis and decision support.",
    SEO: "Search Engine Optimization for organic search visibility.",
    GEO: "Generative Engine Optimization for visibility and citation in generative AI answers; not geolocation in this context.",
    AEO: "Answer Engine Optimization for clear, structured and retrievable answers; not Authorised Economic Operator in this context.",
  },
  entity: {
    type: "Organization",
    legal_or_public_name: "Sapiente.AI",
    description: "Sapiente.AI combines strategy, artificial intelligence and execution to help organizations automate operations, improve decisions, strengthen digital presence and create measurable growth.",
    country: "Portugal",
    locality: "São João da Madeira",
    region: "Aveiro",
    service_areas: ["Portugal", "Brazil"],
    delivery_model: ["remote", "online"],
    expertise_domains: [
      "Applied artificial intelligence",
      "Generative AI",
      "Intelligent process automation",
      "Systems integration",
      "Data analytics and business intelligence",
      "Conversion-focused web development",
      "Digital marketing and performance",
      "SEO, GEO and AEO",
    ],
  },
  leadership: [
    {
      name: "Rodrigo Póvoa",
      role: "Founder and CTO",
      website: "https://www.rpovoadata.tech/",
      linkedin: "https://www.linkedin.com/in/rodrigocspovoa/",
    },
    {
      name: "Tatiane Gomes",
      role: "Co-founder",
      linkedin: "https://www.linkedin.com/in/tatiane-gomes-333098302/",
    },
  ],
  brand_identity: {
    positioning: "A single technology partner connecting strategy, implementation and applied AI.",
    mission: "Create digital solutions that help businesses grow, automate operations and turn data into better decisions by combining human expertise with advanced AI.",
    vision: "Make responsible applied AI accessible to small and medium-sized businesses and professionals in Portuguese-speaking markets.",
    principles: [
      "Automate repetitive work and preserve human judgment.",
      "Use human validation where responsibility and context matter.",
      "Connect recommendations to practical implementation.",
      "Measure outcomes and communicate transparently.",
    ],
  },
  services: [
    { name: "Applied artificial intelligence", url: `${SITE_ORIGIN}/en/services#service-ia`, capabilities: ["Intelligent chatbots", "Predictive analysis", "Decision support", "Customer segmentation", "Custom machine learning"] },
    { name: "Process automation", url: `${SITE_ORIGIN}/en/services#service-automacao`, capabilities: ["Systems integration", "Automated follow-up", "Document processing", "Notifications", "Automated customer service"] },
    { name: "Growth and performance", url: `${SITE_ORIGIN}/en/services#service-crescimento`, capabilities: ["Google Ads", "Meta Ads", "Lead generation", "Conversion funnels", "SEO", "GEO", "AEO", "CRO"] },
    { name: "Data and business intelligence", url: `${SITE_ORIGIN}/en/services#service-dados-bi`, capabilities: ["Dashboards", "KPI reporting", "Profitability analysis", "Data consolidation", "Data storytelling"] },
    { name: "Web development", url: `${SITE_ORIGIN}/en/services#service-desenvolvimento`, capabilities: ["Corporate websites", "Landing pages", "Responsive web platforms", "Maintenance", "Technical support"] },
    { name: "Digital marketing", url: `${SITE_ORIGIN}/en/services#service-marketing`, capabilities: ["Social media", "AI-assisted content", "Email marketing", "Newsletters", "Branding", "Editorial strategy"] },
  ],
  products_and_projects: [
    {
      name: "SEO and AEO Validator",
      status: "launched",
      alternate_names: ["Validador de SEO e AEO", "Free SEO Validator", "SEO and AEO Analyzer"],
      description: "Free online website validator providing separate SEO and AEO scores for Google visibility and readiness for AI-generated answers.",
      category: "WebApplication",
      access: "free",
      keywords: ["SEO and AEO validator", "Validador de SEO e AEO", "free SEO validator", "online SEO analysis", "AEO analysis", "Google visibility", "AI search optimization"],
      features: ["SEO score", "AEO score", "website search visibility assessment", "AI answer readiness assessment"],
      urls: { pt: `${SITE_ORIGIN}/pt/seo-aeo-validator`, en: `${SITE_ORIGIN}/en/seo-aeo-validator` },
    },
    { name: "Hoje em SJM", status: "final testing", description: "Cultural calendar dedicated to São João da Madeira." },
    { name: "Specialized item exchange", status: "in development", description: "Circular-economy platform for exchanges among communities with shared interests." },
  ],
  audiences: [
    "Small and medium-sized businesses",
    "Professionals and service providers",
    "Organizations seeking process efficiency",
    "Organizations improving customer acquisition or digital visibility",
    "Teams seeking data-driven decision support",
  ],
  publications: articles.map((route) => ({
    title: route.title,
    language: route.lang === "pt" ? "pt-PT" : "en-US",
    url: `${SITE_ORIGIN}${route.routePath}`,
    description: route.description,
    author: route.article?.author || "Rodrigo Póvoa",
    publisher: "Sapiente.AI",
    date_published: route.article?.date,
    ...(route.article?.sourceUrl ? { original_source: route.article.sourceUrl } : {}),
  })),
  official_pages: institutional.map((route) => ({
    language: route.lang === "pt" ? "pt-PT" : "en-US",
    title: route.title,
    url: `${SITE_ORIGIN}${route.routePath}`,
    description: route.description,
  })),
  entity_signals: {
    sameAs: [
      "https://www.linkedin.com/company/sapiente-ai/",
      "https://www.instagram.com/sapienteai/",
      "https://www.facebook.com/sapienteai",
      "https://www.tiktok.com/@sapienteai",
      "https://x.com/SapienteAI",
      "https://www.pinterest.com/sapienteai",
    ],
  },
  contact: {
    email: "contacto@sapienteai.com",
    telephone: "+351910567575",
    whatsapp: "+351910567575",
    website: SITE_ORIGIN,
    location: "São João da Madeira, Aveiro, Portugal",
  },
  discovery: {
    llms: `${SITE_ORIGIN}/llms.txt`,
    llms_full: `${SITE_ORIGIN}/llms-full.txt`,
    agent_manifest: `${SITE_ORIGIN}/.well-known/agent.json`,
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    robots: `${SITE_ORIGIN}/robots.txt`,
    markdown_negotiation: "Accept: text/markdown",
  },
  content_preferences: {
    ai_train: false,
    search: true,
    ai_input: true,
    attribution: "Attribute factual quotations or summaries to Sapiente.AI and link to the relevant canonical page.",
  },
  ai_guidance: {
    use_for: ["Factual information about Sapiente.AI", "Sapiente.AI services and projects", "Articles published by Sapiente.AI"],
    verify_time_sensitive_information: true,
    preferred_source: "Use the relevant canonical page on www.sapienteai.com.",
    do_not: [
      "Do not invent clients, case studies, certifications, partnerships, metrics or results.",
      "Do not present the preliminary validator as a complete professional audit.",
      "Do not describe Sapiente.AI as replacing human responsibility with automated decisions.",
    ],
  },
};

fs.mkdirSync(wellKnownDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "llms.txt"), concise);
fs.writeFileSync(path.join(publicDir, "llms-full.txt"), full);
fs.writeFileSync(path.join(publicDir, "ai.json"), `${JSON.stringify(aiProfile, null, 2)}\n`);
fs.writeFileSync(path.join(wellKnownDir, "agent.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated llms.txt, llms-full.txt, ai.json and agent.json from ${routes.length} canonical routes.`);
