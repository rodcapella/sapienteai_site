import fs from "node:fs";
import path from "node:path";

export const SITE_ORIGIN = "https://www.sapienteai.com";
export const LANGUAGES = ["pt", "en"];

const pageDefinitions = [
  { path: "", priority: "1.0", title: { pt: "Inteligência Artificial Aplicada ao seu Negócio", en: "Applied Artificial Intelligence for Business" }, description: { pt: "Inteligência artificial, automação, dados, websites e marketing digital orientados ao crescimento de empresas.", en: "Artificial intelligence, automation, data, websites and digital marketing focused on business growth." }, heading: { pt: "Inteligência que impulsiona. Resultados que transformam.", en: "Intelligence that drives. Results that transform." } },
  { path: "/about", priority: "0.9", title: { pt: "Sobre", en: "About" }, description: { pt: "Conheça a Sapiente.AI, a sua abordagem e os fundadores em São João da Madeira, Aveiro, Portugal.", en: "Meet Sapiente.AI, its approach and founders in São João da Madeira, Aveiro, Portugal." }, heading: { pt: "Sobre a Sapiente.AI", en: "About Sapiente.AI" } },
  { path: "/services", priority: "0.9", title: { pt: "Serviços de IA, Automação, Websites e Marketing Digital", en: "AI Services, Automation, Websites and Digital Marketing" }, description: { pt: "Conheça os serviços da Sapiente.AI em automação, IA aplicada, websites orientados à conversão, análise de dados e marketing digital.", en: "Explore Sapiente.AI services for automation, applied AI, conversion-focused websites, data analytics and digital marketing." }, heading: { pt: "Serviços pensados para gerar impacto real", en: "Services designed to generate real impact" }, schemaType: "CollectionPage" },
  { path: "/projects", priority: "0.9", title: { pt: "Projetos", en: "Projects" }, description: { pt: "Conheça os produtos digitais em desenvolvimento da Sapiente.AI.", en: "Discover the digital products currently being developed by Sapiente.AI." }, heading: { pt: "Ideias que ganham forma. Soluções que criam impacto.", en: "Ideas taking shape. Solutions creating impact." }, schemaType: "CollectionPage" },
  { path: "/faq", priority: "0.9", title: { pt: "FAQ | Respostas sobre IA, automação e serviços digitais", en: "FAQ | AI, automation and digital services answers" }, description: { pt: "Encontre respostas sobre os serviços da Sapiente.AI, modelo de trabalho, automação e inteligência artificial aplicada.", en: "Find answers about Sapiente.AI services, delivery model, automation and applied artificial intelligence." }, heading: { pt: "Perguntas frequentes", en: "Frequently asked questions" }, schemaType: "FAQPage" },
  { path: "/blog", priority: "0.8", title: { pt: "Blog", en: "Blog" }, description: { pt: "Artigos sobre inteligência artificial, automação, dados, tecnologia e crescimento digital.", en: "Articles about artificial intelligence, automation, data, technology and digital growth." }, heading: { pt: "Conteúdos e perspetivas Sapiente.AI", en: "Sapiente.AI insights" }, schemaType: "Blog" },
  { path: "/sitemap", priority: "0.5", title: { pt: "Mapa do site", en: "Sitemap" }, description: { pt: "Encontre todas as páginas e recursos públicos da Sapiente.AI.", en: "Find every public Sapiente.AI page and resource." }, heading: { pt: "Mapa do site", en: "Sitemap" } },
  { path: "/cookies", priority: "0.4", title: { pt: "Política de Cookies", en: "Cookie Policy" }, description: { pt: "Informação sobre os cookies utilizados pela Sapiente.AI e como gerir as suas preferências.", en: "Information about cookies used by Sapiente.AI and how to manage your preferences." }, heading: { pt: "Política de Cookies", en: "Cookie Policy" } },
  { path: "/terms", priority: "0.4", title: { pt: "Termos de Serviço", en: "Terms of Service" }, description: { pt: "Termos aplicáveis à utilização do website e dos serviços da Sapiente.AI.", en: "Terms that apply to the use of the Sapiente.AI website and services." }, heading: { pt: "Termos de Serviço", en: "Terms of Service" } },
  { path: "/privacy", priority: "0.4", title: { pt: "Política de Privacidade", en: "Privacy Policy" }, description: { pt: "Como a Sapiente.AI recolhe, utiliza e protege os dados pessoais.", en: "How Sapiente.AI collects, uses and protects personal data." }, heading: { pt: "Política de Privacidade", en: "Privacy Policy" } },
  { path: "/trust", priority: "0.4", title: { pt: "Confiança e Segurança", en: "Trust & Security" }, description: { pt: "Princípios de segurança, ética e responsabilidade aplicados pela Sapiente.AI.", en: "Security, ethics and accountability principles applied by Sapiente.AI." }, heading: { pt: "Confiança e Segurança", en: "Trust & Security" } },
  { path: "/generative-ai-policy", priority: "0.4", title: { pt: "Política de IA Generativa", en: "Generative AI Policy" }, description: { pt: "Princípios para uma utilização responsável e transparente de inteligência artificial generativa.", en: "Principles for responsible and transparent use of generative artificial intelligence." }, heading: { pt: "Política de IA Generativa", en: "Generative AI Policy" } },
];

function parseBlogArticles(lang = "pt") {
  const sourcePath = path.resolve("client/src/lib/blogData.ts");
  if (!fs.existsSync(sourcePath)) return [];
  const source = fs.readFileSync(sourcePath, "utf8");
  const starts = [...source.matchAll(/\n\s*\{\s*\n\s*id:\s*['"][^'"]+['"],/g)].map((match) => match.index ?? 0);
  return starts.map((start, index) => source.slice(start, starts[index + 1] ?? source.indexOf("\n];", start)))
    .map((block) => {
      const read = (field) => block.match(new RegExp(`${field}:\\s*['\"]([^'\"]+)['\"]`))?.[1] || "";
      const readContent = (field) => block.match(new RegExp(`${field}:\\s*\\\`([\\s\\S]*?)\\\`\\s*[,}]?`))?.[1]?.trim() || "";
      const slugs = { pt: read("slug"), en: read("slugEn") || read("slug") };
      return {
        published: !/published:\s*false/.test(block),
        availableLanguages: /availableLanguages:\s*\[\s*['"]pt['"]\s*\]/.test(block) ? ["pt"] : ["pt", "en"],
        slug: slugs[lang],
        slugs,
        title: lang === "en" ? read("titleEn") || read("title") : read("title"),
        excerpt: lang === "en" ? read("excerptEn") || read("excerpt") : read("excerpt"),
        seoTitle: lang === "en" ? read("seoTitleEn") || read("seoTitle") : read("seoTitle"),
        seoDescription: lang === "en" ? read("seoDescriptionEn") || read("seoDescription") : read("seoDescription"),
        keywords: lang === "en" ? read("keywordsEn") || read("keywords") : read("keywords"),
        author: read("author"),
        authorImage: read("authorImage"),
        sourceName: read("sourceName"),
        sourceUrl: read("sourceUrl"),
        date: read("date"),
        image: lang === "en" ? read("imageEn") || read("image") : read("image"),
        content: lang === "en" ? readContent("contentEn") || readContent("content") : readContent("content"),
      };
    })
    .filter((article) => article.slug && article.published && article.availableLanguages.includes(lang));
}

function parseFaqItems(lang) {
  const sourcePath = path.resolve(`client/src/content/${lang}/faq.ts`);
  if (!fs.existsSync(sourcePath)) return [];
  const source = fs.readFileSync(sourcePath, "utf8");
  return [...source.matchAll(/question:\s*"([^"]+)",[\s\S]*?answer:\s*\n?\s*"([^"]+)"/g)]
    .map((match) => ({ question: match[1], answer: match[2] }));
}

export function getIndexableRoutes() {
  const pages = LANGUAGES.flatMap((lang) => pageDefinitions.map((page) => ({
    ...page,
    lang,
    routePath: `/${lang}${page.path}`,
    title: page.title[lang],
    description: page.description[lang],
    heading: page.heading[lang],
    ...(page.path === "/faq" ? { faqItems: parseFaqItems(lang) } : {}),
  })));

  pages.push(
    { lang: "pt", routePath: "/pt/quiz-ia", priority: "0.8", title: "Quiz IA", description: "Descubra onde a inteligência artificial pode gerar mais eficiência e crescimento no seu negócio.", heading: "Descubra o potencial da IA para o seu negócio" },
    { lang: "en", routePath: "/en/quiz-ai", priority: "0.8", title: "AI Quiz", description: "Discover where artificial intelligence can create more efficiency and growth in your business.", heading: "Discover the potential of AI for your business" },
  );

  const articles = LANGUAGES.flatMap((lang) => parseBlogArticles(lang).map((article) => ({
    lang,
    routePath: `/${lang}/blog/${article.slug}`,
    priority: "0.7",
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    heading: article.title,
    image: article.image,
    schemaType: "BlogPosting",
    article,
    availableLanguages: article.availableLanguages,
  })));

  return [...pages, ...articles];
}

export function alternatePath(route, language) {
  if (route.routePath === "/pt/quiz-ia" || route.routePath === "/en/quiz-ai") return language === "pt" ? "/pt/quiz-ia" : "/en/quiz-ai";
  if (route.schemaType === "BlogPosting" && route.article?.slugs) return `/${language}/blog/${route.article.slugs[language]}`;
  return route.routePath.replace(/^\/(pt|en)(?=\/|$)/, `/${language}`);
}
