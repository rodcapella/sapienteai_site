import { Link } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { getAllBlogArticles } from "@/lib/blogData";
import { ArrowRight, Calendar, Clock } from "@/lib/icons";

export default function Blog() {
  const { lang } = useTranslation();
  const articles = getAllBlogArticles(lang);

  useSEOHead({
    title: lang === "en" ? "AI and Digital Growth Blog | Sapiente.AI" : "Blog de IA e Crescimento Digital | Sapiente.AI",
    description: lang === "en"
      ? "Articles and practical perspectives on artificial intelligence, automation, data, technology, and digital growth."
      : "Artigos e perspetivas práticas sobre inteligência artificial, automação, dados, tecnologia e crescimento digital.",
    keywords: lang === "en"
      ? "AI blog, business automation, data, digital growth"
      : "blog inteligência artificial, automação empresarial, dados, crescimento digital",
    url: `https://www.sapienteai.com/${lang}/blog`,
    type: "website",
  }, [lang]);

  const copy = lang === "en"
    ? {
        heroLabel: "Blog", heroTitle: "Ideas that clarify.", heroHighlight: "Knowledge that creates impact.",
        heroSubtitle: "Practical perspectives on AI, automation, data, and technology applied to business.",
        introLabel: "Latest insights", introTitle: "Knowledge to make better decisions",
        introText: "Explore analyses, trends, and practical ideas for turning technology into measurable progress.",
        read: "Read article", minutes: "min read",
        ctaTitle: "Ready to apply these", ctaHighlight: "ideas to your business?",
        ctaDescription: "We turn knowledge into a clear strategy, useful solutions, and",
        ctaDescriptionHighlight: "measurable results.", ctaButton: "Talk to us",
      }
    : {
        heroLabel: "Blog", heroTitle: "Ideias que esclarecem.", heroHighlight: "Conhecimento que cria impacto.",
        heroSubtitle: "Perspetivas práticas sobre IA, automação, dados e tecnologia aplicada aos negócios.",
        introLabel: "Conteúdos recentes", introTitle: "Conhecimento para decidir melhor",
        introText: "Explore análises, tendências e ideias práticas para transformar tecnologia em progresso mensurável.",
        read: "Ler artigo", minutes: "min de leitura",
        ctaTitle: "Pronto para aplicar estas", ctaHighlight: "ideias ao seu negócio?",
        ctaDescription: "Transformamos conhecimento em estratégia clara, soluções úteis e",
        ctaDescriptionHighlight: "resultados mensuráveis.", ctaButton: "Falar connosco",
      };

  return (
    <div className="flex flex-col">
      <InternalHero label={copy.heroLabel} title={copy.heroTitle} highlight={copy.heroHighlight}
        subtitle={copy.heroSubtitle} image="/media/bg/bg_blog.webp" imageAlt={copy.heroLabel} mobileImagePosition="right center" compact />

      <section className="bg-[#080d12] px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
              <p className="type-label text-[var(--brand-cyan)]">{copy.introLabel}</p>
              <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.2rem)] font-black leading-tight !text-white">{copy.introTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/65">{copy.introText}</p>
            </div>
          </Reveal>

          <div className="mx-auto max-w-[320px] sm:max-w-2xl">
              {articles.map((article, index) => (
                <Reveal key={article.id} delay={index * 80}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#16467c] bg-[#0d141d] transition duration-300 hover:-translate-y-1 hover:border-[#278dff] hover:shadow-[0_24px_60px_rgba(0,112,255,.18)]">
                    <Link href={`/${lang}/blog/${article.slug}`} className="relative block aspect-[16/9] overflow-hidden border-b border-white/5">
                      <img src={article.image} alt="" width="960" height="540"
                        loading={index < 2 ? "eager" : "lazy"} decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                      <span
                        className="absolute top-5 rounded-full border border-[#348dde]/50 bg-[#06111d]/45 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#35a8ff] shadow-[0_6px_18px_rgba(0,20,50,.12)] backdrop-blur-[2px]"
                        style={{ right: "1.25rem", left: "auto" }}
                      >
                        {article.category}
                      </span>
                    </Link>

                    <div className="flex flex-1 flex-col p-5 sm:p-8">
                      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#8da8c4]">
                        <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden="true" />
                          <time dateTime={article.date}>{new Date(`${article.date}T12:00:00`).toLocaleDateString(lang === "en" ? "en-US" : "pt-PT", { day: "2-digit", month: "long", year: "numeric" })}</time>
                        </span>
                        <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" aria-hidden="true" />{article.readTime} {copy.minutes}</span>
                      </div>
                      <h2 className="font-heading !text-[28px] font-black !leading-[1.12] !text-[#0877ff] transition-colors group-hover:!text-[#35a8ff] sm:!text-[clamp(1.35rem,2.6vw,1.8rem)] sm:!leading-tight">
                        <Link href={`/${lang}/blog/${article.slug}`}>{article.title}</Link>
                      </h2>
                      <p className="mt-5 line-clamp-3 text-[15px] font-medium leading-7 text-[#8da8c4]">{article.excerpt}</p>
                      <Link href={`/${lang}/blog/${article.slug}`}
                        className="mt-7 inline-flex w-fit items-center gap-3 text-sm font-black text-[var(--brand-primary)] underline decoration-transparent underline-offset-4 transition hover:text-[var(--brand-cyan)] hover:decoration-current"
                        aria-label={`${copy.read}: ${article.title}`}>{copy.read}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
                    </div>
                  </article>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <QuizCTA />
      <FinalCTA title={copy.ctaTitle} title_highlight={copy.ctaHighlight} description={copy.ctaDescription}
        description_highlight={copy.ctaDescriptionHighlight} button={copy.ctaButton} />
    </div>
  );
}
