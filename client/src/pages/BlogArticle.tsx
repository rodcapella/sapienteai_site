import { useEffect } from "react";
import { Link } from "wouter";
import { Calendar, Clock } from "@/lib/icons";
import { getBlogArticleAlternateSlugs, getBlogArticleBySlug } from "@/lib/blogData";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";

type BlogArticleProps = { lang: string; slug: string };

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g).filter(Boolean);

  return <>{parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="font-black text-[var(--brand-night)]">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    return <span key={index}>{part}</span>;
  })}</>;
}

function AIAdoptionChart({ lang }: { lang: string }) {
  const bars = [
    { label: "Portugal", value: 11.5 },
    { label: lang === "en" ? "European Union" : "União Europeia", value: 20 },
  ];
  const ticks = [25, 18.75, 12.5, 6.25, 0];
  const formatNumber = (value: number) => lang === "en" ? String(value) : String(value).replace(".", ",");

  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-white/10 bg-[#171717] p-5 text-white shadow-[0_24px_60px_rgba(0,20,50,.18)] sm:p-7" aria-labelledby="ai-adoption-chart-title ai-adoption-chart-source">
      <h3 id="ai-adoption-chart-title" className="!text-base font-black !text-white sm:!text-lg">
        {lang === "en" ? "Business adoption of AI still has significant room to grow" : "A adoção de IA nas empresas ainda tem muito espaço para crescer"}
      </h3>
      <p className="mt-1 text-sm text-white/60">{lang === "en" ? "Enterprises with 10 or more people employed that used AI technologies in 2025." : "Empresas com 10 ou mais pessoas que utilizavam tecnologias de IA em 2025."}</p>

      <div className="relative mt-7 h-[300px] pl-12 sm:h-[340px] sm:pl-14" role="img" aria-label={lang === "en" ? "Portugal: 11.5%. European Union: 20%. Source: Eurostat, 2025." : "Portugal: 11,5%. União Europeia: 20%. Fonte: Eurostat, 2025."}>
        <div className="absolute inset-y-0 left-0 flex w-11 flex-col justify-between pb-8 text-right text-[11px] text-white/55 sm:w-13 sm:text-xs">
          {ticks.map((tick) => <span key={tick}>{formatNumber(tick)}%</span>)}
        </div>
        <div className="absolute inset-x-12 bottom-8 top-0 sm:left-14 sm:right-0">
          {ticks.map((tick, index) => (
            <span key={tick} className="absolute left-0 right-0 border-t border-dashed border-white/[0.07]" style={{ top: `${index * 25}%` }} />
          ))}
        </div>
        <div className="absolute inset-x-12 bottom-0 top-0 flex items-end justify-around gap-8 sm:left-14 sm:right-0 sm:gap-20">
          {bars.map((bar) => (
            <div key={bar.label} className="flex h-full w-full max-w-[122px] flex-col justify-end text-center">
              <span className="mb-2 text-sm font-black text-[var(--brand-cyan)]">{formatNumber(bar.value)}%</span>
              <div className="mx-auto w-full rounded-t-xl bg-gradient-to-b from-[#36a7ff] to-[#1687ec] shadow-[0_0_28px_rgba(54,167,255,.18)]" style={{ height: `${(bar.value / 25) * 100}%` }} />
              <span className="mt-2 min-h-6 text-xs font-medium text-white/60 sm:text-sm">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      <figcaption id="ai-adoption-chart-source" className="mt-5 text-xs text-white/55">{lang === "en" ? "Source: Eurostat, 2025." : "Fonte: Eurostat, 2025."}</figcaption>
    </figure>
  );
}

function ArticleBody({ content, lang }: { content: string; lang: string }) {
  return content.split(/\n\n+/).map((block, index) => {
    const text = block.trim();
    if (!text) return null;
    if (text.startsWith("[GRÁFICO") || text.startsWith("[CHART")) return <AIAdoptionChart key={index} lang={lang} />;
    if (text.startsWith("*Fonte: Eurostat") || text.startsWith("*Source: Eurostat")) return null;
    if (text.startsWith("### ")) return <h3 key={index} className="mt-8 font-heading text-2xl font-black" style={{ color: "var(--brand-primary)" }}><InlineText text={text.slice(4)} /></h3>;
    if (text.startsWith("## ")) return <h2 key={index} className="mt-12 font-heading text-3xl font-black leading-tight" style={{ color: "var(--brand-primary)" }}><InlineText text={text.slice(3)} /></h2>;
    if (text.startsWith("# ")) return null;
    if (text.split("\n").every((line) => /^[-*]\s/.test(line))) {
      return <ul key={index} className="my-6 list-disc space-y-2 pl-6">{text.split("\n").map((line) => <li key={line}><InlineText text={line.replace(/^[-*]\s/, "")} /></li>)}</ul>;
    }
    if (text.startsWith("#InteligenciaArtificial") || text.startsWith("#ArtificialIntelligence")) return null;
    const isStatement = text.startsWith("**") && text.endsWith("**");
    return <p key={index} className={isStatement
      ? "my-8 rounded-2xl border-l-4 border-[var(--brand-cyan)] bg-[var(--brand-primary)]/7 px-6 py-5 text-lg leading-8 text-[var(--brand-night)]"
      : "my-5 leading-8 text-foreground/75"}><InlineText text={text} /></p>;
  });
}

export default function BlogArticle({ lang, slug }: BlogArticleProps) {
  const { lang: activeLang } = useTranslation();
  const article = getBlogArticleBySlug(slug, lang);
  const alternateSlugs = getBlogArticleAlternateSlugs(slug);
  const canonical = `https://www.sapienteai.com/${lang}/blog/${slug}`;

  useSEOHead({
    title: article?.seoTitle || article?.title || (activeLang === "en" ? "Article not found" : "Artigo não encontrado"),
    description: article?.seoDescription || article?.excerpt || "Sapiente.AI",
    image: article ? `https://www.sapienteai.com${article.image}` : undefined,
    keywords: article?.keywords || article?.tags.join(", "),
    url: canonical,
    type: "article",
    alternateUrls: alternateSlugs ? {
      pt: `https://www.sapienteai.com/pt/blog/${alternateSlugs.pt}`,
      en: `https://www.sapienteai.com/en/blog/${alternateSlugs.en}`,
    } : undefined,
    noindex: !article,
  }, [article, activeLang, canonical]);

  useEffect(() => {
    if (!article) return;
    const schema = document.createElement("script");
    schema.id = "blog-article-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${canonical}#article`,
      headline: article.title, description: article.seoDescription || article.excerpt, keywords: article.keywords || article.tags.join(", "), datePublished: article.date, dateModified: article.date,
      image: `https://www.sapienteai.com${article.image}`, inLanguage: lang === "pt" ? "pt-PT" : "en",
      author: { "@type": "Person", name: article.author || "Rodrigo Póvoa" }, publisher: { "@id": "https://www.sapienteai.com/#organization" },
      url: canonical,
      mainEntityOfPage: { "@id": `${canonical}#webpage` },
      isPartOf: { "@id": "https://www.sapienteai.com/#website" },
    });
    document.head.appendChild(schema);
    return () => schema.remove();
  }, [article, canonical, lang]);

  if (!article) return <section aria-labelledby="blog-not-found-title" className="mx-auto max-w-4xl px-6 py-32"><h1 id="blog-not-found-title" className="font-heading text-5xl font-black">404</h1><Link href={`/${lang}/blog`} className="mt-8 inline-block font-bold text-primary underline underline-offset-4">Blog</Link></section>;

  return (
    <article className="bg-[#f4f9ff] pb-20 md:pb-28">
      <header className="border-b border-[#cfe2f6] bg-[#eaf4ff] px-6 pb-14 pt-20 md:pb-16 md:pt-28">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-[#587594] sm:text-sm">
            <span className="rounded-full border border-[#9bc8f5] bg-white/75 px-3 py-1.5 font-black text-[var(--brand-primary)]">{article.category}</span>
            <time className="flex items-center gap-2" dateTime={article.date}><Calendar className="h-4 w-4" aria-hidden="true" />{new Date(`${article.date}T12:00:00`).toLocaleDateString(lang === "en" ? "en-US" : "pt-PT", { day: "2-digit", month: "long", year: "numeric" })}</time>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" aria-hidden="true" />{article.readTime} {lang === "en" ? "min read" : "min de leitura"}</span>
          </div>

          <h1 className="mt-7 max-w-5xl font-heading text-[clamp(2.35rem,6vw,4.5rem)] font-black leading-[1.04]" style={{ color: "var(--brand-primary)" }}>{article.title}</h1>
          <p className="mt-7 max-w-4xl text-lg font-medium leading-8 text-[#587594] md:text-xl">{article.excerpt}</p>

        </div>
      </header>

      <div className="mx-auto max-w-[340px] px-0 pt-10 sm:max-w-6xl sm:px-8 sm:pt-12 md:pt-16">
        <figure className="overflow-hidden rounded-xl border border-[#b8d6f3] bg-white shadow-[0_20px_55px_rgba(0,58,122,.1)] sm:rounded-2xl md:rounded-3xl md:shadow-[0_24px_70px_rgba(0,58,122,.12)]">
          <img src={article.image} alt={article.title} width="1559" height="1009" className="h-auto w-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
        </figure>
      </div>

      <div className="mx-auto mt-8 max-w-[340px] px-0 sm:mt-10 sm:max-w-4xl sm:px-8 md:mt-14">
        <div className="rounded-xl border border-[#d7e7f6] bg-white px-5 py-7 shadow-[0_16px_45px_rgba(0,58,122,.07)] sm:rounded-2xl sm:px-9 sm:py-8 md:rounded-3xl md:px-14 md:py-12 md:shadow-[0_18px_55px_rgba(0,58,122,.08)]">
          <div className="prose max-w-none"><ArticleBody content={article.content} lang={lang} /></div>
          <aside className="mt-10 border-t border-foreground/10 pt-4 text-[10px] leading-4" style={{ color: "rgba(0, 0, 0, 0.48)" }} aria-label={lang === "en" ? "Statistical source" : "Fonte estatística"}>
          <p>
            <span className="font-semibold">{lang === "en" ? "Statistical source: " : "Fonte estatística: "}</span>
            {lang === "en" ? "Eurostat, Enterprises using artificial intelligence technologies, 2025 (dataset isoc_eb_ai)." : "Eurostat, Empresas que utilizam tecnologias de inteligência artificial, 2025 (conjunto de dados isoc_eb_ai)."}{" "}
            <a
              href="https://ec.europa.eu/eurostat/documents/7870049/23260410/KS-01-26-009-EN-N.pdf/37d063cb-28cf-3b4e-91f3-c3784c970842"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-inherit underline decoration-1 underline-offset-2 transition-opacity hover:opacity-70"
            >
              {lang === "en" ? "View the official Eurostat publication" : "Consultar a publicação oficial da Eurostat"}
            </a>
          </p>
          </aside>
          <Link href={`/${lang}/blog`} className="mt-10 inline-block font-black text-[var(--brand-primary)] underline decoration-2 underline-offset-4">← {lang === "en" ? "Back" : "Voltar"}</Link>
        </div>
      </div>
    </article>
  );
}
