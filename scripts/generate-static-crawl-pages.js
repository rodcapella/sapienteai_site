import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve("dist");
const BASE_HTML_PATH = path.join(DIST_DIR, "index.html");
const SITE_ORIGIN = "https://www.sapienteai.com";

const sharedLinks = {
  pt: [
    ["/pt", "Início"],
    ["/pt/about", "Sobre"],
    ["/pt/services", "Serviços"],
    ["/pt/projects", "Projetos"],
    ["/pt/faq", "FAQ"],
    ["/pt/blog", "Blog"],
    ["/pt/sitemap", "Mapa do site"],
  ],
  en: [
    ["/en", "Home"],
    ["/en/about", "About"],
    ["/en/services", "Services"],
    ["/en/projects", "Projects"],
    ["/en/faq", "FAQ"],
    ["/en/blog", "Blog"],
    ["/en/sitemap", "Sitemap"],
  ],
};

const pages = [
  {
    path: "/pt",
    lang: "pt",
    title: "Sapiente.AI - Inteligência Artificial Aplicada ao seu Negócio",
    description: "Inteligência artificial, automação, dados, websites e marketing digital orientados ao crescimento de empresas.",
    heading: "Inteligência que impulsiona. Resultados que transformam.",
    text: "A Sapiente.AI aplica inteligência artificial, análise de dados e automação para acelerar decisões, reduzir custos, conquistar clientes e gerar crescimento real.",
  },
  {
    path: "/en",
    lang: "en",
    title: "Sapiente.AI - Applied Artificial Intelligence for Business",
    description: "Artificial intelligence, automation, data, websites and digital marketing focused on business growth.",
    heading: "Intelligence that drives. Results that transform.",
    text: "Sapiente.AI applies artificial intelligence, data analysis and automation to accelerate decisions, reduce costs, acquire customers and generate measurable growth.",
  },
  {
    path: "/pt/about",
    lang: "pt",
    title: "Sapiente.AI - Sobre",
    description: "Conheça a Sapiente.AI, a sua abordagem e os fundadores em São João da Madeira, Aveiro, Portugal.",
    heading: "Sobre a Sapiente.AI",
    text: "Somos uma parceira tecnológica que combina estratégia, inteligência artificial e execução para transformar necessidades reais em soluções digitais úteis e mensuráveis.",
  },
  {
    path: "/en/about",
    lang: "en",
    title: "Sapiente.AI - About",
    description: "Meet Sapiente.AI, its approach and founders in São João da Madeira, Aveiro, Portugal.",
    heading: "About Sapiente.AI",
    text: "We are a technology partner combining strategy, artificial intelligence and execution to turn real needs into useful, measurable digital solutions.",
  },
  {
    path: "/pt/services",
    lang: "pt",
    title: "Sapiente.AI - Serviços",
    description: "IA aplicada, automação, crescimento, dados e BI, desenvolvimento web e marketing digital com IA.",
    heading: "Serviços pensados para gerar impacto real",
    text: "Ajudamos empresas com inteligência artificial aplicada, automação de processos, aquisição de clientes, dados e BI, websites orientados à conversão e marketing digital.",
  },
  {
    path: "/en/services",
    lang: "en",
    title: "Sapiente.AI - Services",
    description: "Applied AI, automation, growth, data and BI, web development and AI-powered digital marketing.",
    heading: "Services designed to generate real impact",
    text: "We help companies with applied artificial intelligence, process automation, customer acquisition, data and BI, conversion-oriented websites and digital marketing.",
  },
  {
    path: "/pt/projects",
    lang: "pt",
    title: "Sapiente.AI - Projetos",
    description: "Conheça os produtos digitais em desenvolvimento da Sapiente.AI.",
    heading: "Ideias que ganham forma. Soluções que criam impacto.",
    text: "Projetos atuais: Hoje em SJM, uma plataforma de trocas especializadas e um validador online de SEO, GEO e AEO.",
  },
  {
    path: "/en/projects",
    lang: "en",
    title: "Sapiente.AI - Projects",
    description: "Discover the digital products currently being developed by Sapiente.AI.",
    heading: "Ideas taking shape. Solutions creating impact.",
    text: "Current projects: Hoje em SJM, a specialized exchange platform and an online SEO, GEO and AEO validator.",
  },
  {
    path: "/pt/faq",
    lang: "pt",
    title: "Sapiente.AI - Perguntas Frequentes",
    description: "Respostas sobre serviços, inteligência artificial, automação, marketing digital e projetos da Sapiente.AI.",
    heading: "Perguntas frequentes",
    text: "Consulte respostas sobre a forma de trabalho, serviços, aplicações de inteligência artificial, automação, websites, dados e marketing digital.",
  },
  {
    path: "/en/faq",
    lang: "en",
    title: "Sapiente.AI - Frequently Asked Questions",
    description: "Answers about Sapiente.AI services, artificial intelligence, automation, digital marketing and projects.",
    heading: "Frequently asked questions",
    text: "Find answers about our approach, services and applications of artificial intelligence, automation, websites, data and digital marketing.",
  },
  {
    path: "/pt/blog",
    lang: "pt",
    title: "Sapiente.AI - Blog",
    description: "Artigos sobre inteligência artificial, automação, dados, tecnologia e crescimento digital.",
    heading: "Conteúdos e perspetivas Sapiente.AI",
    text: "Artigos práticos sobre inteligência artificial aplicada, machine learning, automação, dados, transformação digital e crescimento empresarial.",
  },
  {
    path: "/en/blog",
    lang: "en",
    title: "Sapiente.AI - Blog",
    description: "Articles about artificial intelligence, automation, data, technology and digital growth.",
    heading: "Sapiente.AI insights",
    text: "Practical articles about applied artificial intelligence, machine learning, automation, data, digital transformation and business growth.",
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceMeta(html, selector, value) {
  const escaped = escapeHtml(value);
  if (selector === "title") {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escaped}</title>`);
  }

  const expression = new RegExp(`(<meta\\s+name="${selector}"\\s+content=")[^"]*(")`, "i");
  return html.replace(expression, `$1${escaped}$2`);
}

function fallbackMarkup(page) {
  const links = sharedLinks[page.lang]
    .map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join("");
  const discoveryLabel = page.lang === "pt" ? "Recursos para agentes" : "Agent resources";

  return `<div id="root"><noscript>
    <main>
      <article>
        <h1>${escapeHtml(page.heading)}</h1>
        <p>${escapeHtml(page.text)}</p>
        <p>${escapeHtml(page.description)}</p>
      </article>
      <nav aria-label="${page.lang === "pt" ? "Navegação principal" : "Main navigation"}">
        <ul>${links}</ul>
      </nav>
      <section>
        <h2>${discoveryLabel}</h2>
        <p><a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">llms-full.txt</a> · <a href="/sitemap.xml">sitemap.xml</a></p>
      </section>
      <address>Sapiente.AI · São João da Madeira, Aveiro, Portugal · <a href="mailto:contacto@sapienteai.com">contacto@sapienteai.com</a></address>
    </main>
  </noscript></div>`;
}

if (!fs.existsSync(BASE_HTML_PATH)) {
  throw new Error("dist/index.html not found. Run this script after vite build.");
}

const baseHtml = fs.readFileSync(BASE_HTML_PATH, "utf8");

for (const page of pages) {
  let html = replaceMeta(baseHtml, "title", page.title);
  html = replaceMeta(html, "description", page.description);
  html = html
    .replace('<html lang="pt-PT">', `<html lang="${page.lang === "pt" ? "pt-PT" : "en"}">`)
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/>/i,
      `<link rel="canonical" href="${SITE_ORIGIN}${page.path}" />`,
    )
    .replace('<div id="root"></div>', fallbackMarkup(page));

  const outputDirectory = path.join(DIST_DIR, ...page.path.split("/").filter(Boolean));
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, "index.html"), html);
}

console.log(`Generated static crawl fallbacks for ${pages.length} primary routes.`);
