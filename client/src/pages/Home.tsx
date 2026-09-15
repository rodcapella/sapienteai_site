import { Suspense, lazy, useState } from "react";

import { Link } from "wouter";

import { useTranslation } from "@/hooks/useTranslation";
import { useSEOHead } from "@/hooks/useSEOHead";
import { ArrowRight, Brain, Search } from "@/lib/icons";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { DirectAnswerSection } from "@/components/ui/section/DirectAnswerSection";

import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

const ContactModal = lazy(() => import("@/components/ContactModal"));

const HOME_BANNER_BASE_PATH = "/media/banners";
const HOME_BANNERS = [
  "home_o_que_nos_diferencia.webp",
  "home_resultados_gera_ia.webp",
  "home_marketing_digital_ia.webp",
  "home_personalidade_marca.webp",
];

type BannerTextContent = {
  eyebrow?: string;
  title: string;
  description: string;
  items?: { title: string; description?: string }[];
  /** posição do card: esquerda ou direita da imagem */
  align?: "left" | "right";
};

type HomeBannerSectionProps = {
  lang: string;
  file: string;
  label?: string;
  id?: string;
  textContent?: BannerTextContent;
};

function getHomeBannerSrc(lang: string, file: string) {
  const folder = lang === "en" ? "EN" : "PT";
  const englishFileMap: Record<string, string> = {
    "home_o_que_nos_diferencia.webp":  "home_o_que_nos_diferencia_en.webp",
    "home_resultados_gera_ia.webp":    "home_resultados_gera_ia_en.webp",
    "home_marketing_digital_ia.webp":  "home_marketing_digital_ia_en.webp",
    "home_personalidade_marca.webp":   "home_personalidade_marca_en.webp",
  };
  const localizedFile = lang === "en" ? englishFileMap[file] || file : file;
  return `${HOME_BANNER_BASE_PATH}/${folder}/${localizedFile}`;
}

function getResponsiveBannerSrc(src: string, width: 480 | 768 | 960 | 1440) {
  return src.replace(/\.webp$/, `-${width}.webp`);
}

function HomeBannerSection({ lang, file, label, id, textContent }: HomeBannerSectionProps) {
  const bannerSrc = getHomeBannerSrc(lang, file);
  const align = textContent?.align ?? "left";

  return (
    <section
      id={id}
      className="content-atmosphere relative w-full overflow-hidden bg-[var(--section-ice)] aspect-[16/8.5] sm:aspect-[1920/700]"
      aria-label={label}
    >
      {/* Imagem de fundo */}
      <Reveal className="absolute inset-0">
        <img
          src={bannerSrc}
          srcSet={`${getResponsiveBannerSrc(bannerSrc, 480)} 480w, ${getResponsiveBannerSrc(bannerSrc, 768)} 768w, ${getResponsiveBannerSrc(bannerSrc, 960)} 960w, ${getResponsiveBannerSrc(bannerSrc, 1440)} 1440w, ${bannerSrc} 1920w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          width="1920"
          height="700"
          className={`h-full w-full scale-[1.3] object-cover sm:scale-100 sm:object-contain ${align === "right" ? "origin-right object-[68%_center]" : "origin-left object-[32%_center]"} sm:origin-center sm:object-center`}
          loading="lazy"
          fetchPriority="low"
          decoding="async"
        />
      </Reveal>

      {/* Transcrição indexável/acessível do conteúdo que está na imagem do banner */}
      {textContent && (
        <div data-speakable className="sr-only">
          {textContent.eyebrow && <p>{textContent.eyebrow}</p>}
          <h2>{textContent.title}</h2>
          <p>{textContent.description}</p>
          {textContent.items && textContent.items.length > 0 && (
            <ul>
              {textContent.items.slice(0, 5).map((item) => (
                <li key={item.title}>
                  {item.title}
                  {item.description ? `: ${item.description}` : ""}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const { lang } = useTranslation();
  const isPT = lang === "pt";
  const content = isPT ? homePT : homeEN;
  const validatorCta = isPT
    ? {
        label: "Validador gratuito",
        title: "O seu site está preparado para ser encontrado?",
        description: "Descubra como está a sua presença no Google e nas respostas de inteligência artificial. Receba uma avaliação clara de SEO e AEO em poucos instantes.",
        seo: "Melhor posicionamento no Google",
        aeo: "Mais visibilidade nas respostas de IA",
        button: "Testar SEO e AEO",
      }
    : {
        label: "Free validator",
        title: "Is your website ready to be found?",
        description: "Discover how your brand appears on Google and in AI-generated answers. Get a clear SEO and AEO assessment in just a few moments.",
        seo: "Better positioning on Google",
        aeo: "More visibility in AI answers",
        button: "Test SEO and AEO",
      };
  const heroTitle = isPT ? (
    <>
      <span className="sm:hidden">
        Inteligência que
        <br />
        impulsiona.
      </span>
      <span className="hidden sm:inline">{content.hero.title}</span>
    </>
  ) : (
    <>
      <span className="sm:hidden">
        Intelligence that
        <br />
        drives growth.
      </span>
      <span className="hidden sm:inline">{content.hero.title}</span>
    </>
  );
  const heroHighlight = isPT ? (
    <>
      <span className="sm:hidden">
        Resultados que
        <br />
        transformam.
      </span>
      <span className="hidden sm:inline">{content.hero.highlight}</span>
    </>
  ) : (
    <>
      <span className="sm:hidden">
        Results that
        <br />
        scale.
      </span>
      <span className="hidden sm:inline">{content.hero.highlight}</span>
    </>
  );

  useSEOHead({
    title: isPT
      ? "IA Aplicada para Empresas | Automação, Conversão e Crescimento"
      : "Applied AI for Business | Automation, Conversion and Growth",
    description: isPT
      ? "A Sapiente.AI ajuda empresas a crescer com automação, websites orientados à conversão, chatbots, análise de dados e marketing digital com inteligência artificial."
      : "Sapiente.AI helps businesses grow with automation, conversion-focused websites, chatbots, data analytics and AI-powered digital marketing.",
    url: `https://www.sapienteai.com/${lang}`,
  }, [lang]);

  const [isContactOpen, setIsContactOpen] = useState(false);

  const bannerTextContent = [
    // Banner 1 — O que nos diferencia
    {
      eyebrow: isPT ? "Por que a Sapiente.AI" : "Why Sapiente.AI",
      title: isPT ? "O que nos diferencia" : "What makes us different",
      description: isPT
        ? "Combinamos estratégia, IA, automação e validação humana para criar soluções digitais orientadas a resultados reais."
        : "We combine strategy, AI, automation, and human validation to build digital solutions focused on measurable business outcomes.",
      items: isPT
        ? [
            { title: "Parceiro único do início ao fim" },
            { title: "Transparência e métricas reais" },
            { title: "Tecnologia aplicada ao seu negócio específico" },
            { title: "Resultados mensuráveis, não relatórios bonitos" },
          ]
        : [
            { title: "Single partner from start to finish" },
            { title: "Full transparency and real metrics" },
            { title: "Technology tailored to your specific business" },
            { title: "Measurable results, not polished reports" },
          ],
      align: "left" as const,
    },
    // Banner 2 — Core Services
    {
      eyebrow: content.coreServices?.label,
      title: content.coreServices?.title ?? (isPT ? "Onde a IA impacta o seu negócio" : "Where AI impacts your business"),
      description: isPT
        ? "Aquisição de clientes, eficiência operacional, websites de conversão, análise de dados, chatbots 24/7, redes sociais e conteúdo visual."
        : "Customer acquisition, operational efficiency, conversion websites, data analytics, 24/7 chatbots, social media and visual content.",
      items: content.coreServices?.items?.slice(0, 5),
      align: "right" as const,
    },
    // Banner 3 — Marketing AI
    {
      eyebrow: content.marketingAI?.label,
      title: content.marketingAI?.title ?? (isPT ? "Marketing digital com inteligência artificial" : "Digital marketing with artificial intelligence"),
      description: content.marketingAI?.subtitle ?? (isPT
        ? "Branding estratégico, conteúdo com IA e reporting de performance para crescimento sustentável."
        : "Strategic branding, AI-powered content and performance reporting for sustainable growth."),
      items: content.marketingAI?.cards?.map((c: { title: string }) => ({ title: c.title })),
      align: "left" as const,
    },
    // Banner 4 — Brand Personality
    {
      eyebrow: content.brandPersonality?.label,
      title: content.brandPersonality?.title ?? (isPT ? "Uma parceira tecnológica para o crescimento" : "A technology partner for growth"),
      description: isPT
        ? "Trabalhamos como extensão da sua equipa — inteligentes, visionários, confiáveis e focados em resultados."
        : "We work as an extension of your team — intelligent, visionary, reliable, and results-focused.",
      items: content.brandPersonality?.traits?.map((t: { title: string }) => ({ title: t.title })),
      align: "right" as const,
    },
  ];

  const homeSeoSummary = isPT
    ? {
        eyebrow: "IA aplicada para empresas",
        title: "Automação, aquisição de clientes e crescimento com foco comercial",
        description:
          "A Sapiente.AI combina estratégia, inteligência artificial e execução para transformar tecnologia em captação de leads, eficiência operacional e resultados mensuráveis.",
        points: [
          "Automação de processos, atendimento e operações internas",
          "Websites orientados à conversão e geração de oportunidades",
          "Marketing digital com IA, conteúdos e campanhas de performance",
          "Dashboards, análise de dados e apoio à decisão comercial",
        ],
      }
    : {
        eyebrow: "Applied AI for business",
        title: "Automation, lead generation and growth with commercial focus",
        description:
          "Sapiente.AI combines strategy, artificial intelligence and execution to turn technology into lead generation, operational efficiency and measurable business results.",
        points: [
          "Process, support and internal operations automation",
          "Conversion-focused websites built to generate opportunities",
          "AI-powered digital marketing, content and performance campaigns",
          "Dashboards, data analytics and decision support for growth",
        ],
      };

  const directAnswers = isPT
    ? {
        label: "Respostas diretas",
        title: "Como a inteligência artificial cria valor para uma empresa?",
        answers: [
          {
            question: "O que é IA aplicada aos negócios?",
            answer: "IA aplicada aos negócios é o uso de inteligência artificial para resolver objetivos concretos, como automatizar tarefas, qualificar leads, analisar dados, melhorar o atendimento e apoiar decisões comerciais.",
          },
          {
            question: "Como a Sapiente.AI ajuda empresas?",
            answer: "A Sapiente.AI analisa processos e objetivos, identifica oportunidades de maior impacto e implementa soluções de IA, automação, dados, websites e marketing digital orientadas a resultados mensuráveis.",
          },
          {
            question: "A IA substitui a equipa?",
            answer: "Não necessariamente. A abordagem da Sapiente.AI automatiza trabalho repetitivo e mantém pessoas responsáveis pela validação, pelo contexto e pelas decisões que exigem experiência e julgamento.",
          },
        ],
      }
    : {
        label: "Direct answers",
        title: "How does artificial intelligence create business value?",
        answers: [
          {
            question: "What is applied AI for business?",
            answer: "Applied AI for business uses artificial intelligence to solve specific goals, including task automation, lead qualification, data analysis, customer support, and commercial decision support.",
          },
          {
            question: "How does Sapiente.AI help businesses?",
            answer: "Sapiente.AI reviews processes and objectives, identifies high-impact opportunities, and implements AI, automation, data, website, and digital marketing solutions focused on measurable results.",
          },
          {
            question: "Does AI replace the team?",
            answer: "Not necessarily. Sapiente.AI automates repetitive work while keeping people responsible for validation, context, and decisions that require experience and human judgment.",
          },
        ],
      };

  return (
    <div className="home-page flex flex-col bg-[var(--section-ice)]">
      <InternalHero label={content.hero.label} title={heroTitle} highlight={heroHighlight} subtitle={content.hero.subtitle}>
        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-6">
          <PremiumButton
            onClick={() => setIsContactOpen(true)}
            size="lg"
            variant="primary"
            className="w-full !rounded-2xl !border !border-[var(--brand-cyan-bright)] !bg-[var(--brand-cyan)] !px-7 !py-2.5 !text-[var(--brand-night)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-cyan-bright)_42%,transparent),0_18px_44px_color-mix(in_srgb,var(--brand-cyan-bright)_30%,transparent)] hover:!bg-[var(--brand-cyan-bright)] hover:!text-[var(--brand-night)] sm:!w-auto sm:!rounded-full sm:!px-11 sm:!py-5 [&>span]:!text-[var(--brand-night)]"
          >
            {content.hero.ctaPrimary}
          </PremiumButton>

          <button
            type="button"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[var(--brand-cyan-bright)]/55 bg-transparent px-4 py-2.5 text-sm font-black uppercase tracking-[0.18em] text-[var(--brand-cyan)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-[var(--brand-cyan-bright)]/80 hover:bg-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] hover:text-[var(--brand-cyan-bright)] hover:shadow-[0_0_28px_color-mix(in_srgb,var(--brand-cyan-bright)_16%,transparent)] active:scale-[0.98] sm:w-auto sm:justify-start sm:rounded-full sm:px-5 sm:py-3 sm:border-white/35 sm:bg-white/8 sm:text-[var(--brand-offwhite)] sm:hover:border-[var(--brand-cyan-bright)]/70 sm:hover:bg-white/14 sm:hover:text-[var(--brand-offwhite)] sm:hover:shadow-[0_0_28px_color-mix(in_srgb,var(--brand-cyan-bright)_20%,transparent)]"
            onClick={() => document.getElementById("core-services")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--brand-cyan-bright)]/55 bg-[var(--brand-cyan-bright)]/10 text-[var(--brand-cyan-bright)] transition-transform duration-500 group-hover:translate-x-1 sm:h-8 sm:w-8 sm:bg-[var(--brand-cyan-bright)]/12">
              <ArrowRight className="h-4 w-4" />
            </span>
            {content.hero.ctaSecondary}
          </button>
        </div>
      </InternalHero>

      <section className="content-atmosphere bg-white px-4 py-7 sm:px-6 sm:py-10 md:py-14">
        <div className="mx-auto max-w-6xl rounded-[22px] border border-[var(--brand-mid)]/30 bg-[color-mix(in_srgb,var(--section-ice)_88%,white)] p-4 shadow-[0_16px_36px_color-mix(in_srgb,var(--brand-deep)_8%,transparent)] sm:rounded-[30px] sm:p-6 md:p-8 lg:p-10">
          <p className="font-[var(--font-body)] text-[10px] font-black uppercase tracking-[0.16em] text-[var(--brand-primary)] sm:text-[12px] sm:tracking-[0.18em]">
            {homeSeoSummary.eyebrow}
          </p>
          <div className="mt-3 grid gap-4 sm:mt-4 sm:gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div data-speakable>
              <h2 className="font-[var(--font-heading)] text-[1.5rem] font-black leading-[1.08] text-[var(--brand-night)] sm:text-[clamp(1.9rem,3.2vw,3rem)] sm:leading-[1.05]">
                {homeSeoSummary.title}
              </h2>
              <p className="mt-3 max-w-2xl font-[var(--font-body)] text-[13px] font-medium leading-[1.55] text-[var(--brand-night)]/74 sm:mt-4 sm:text-[15px] sm:leading-relaxed md:text-[16px]">
                {homeSeoSummary.description}
              </p>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1">
              {homeSeoSummary.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 rounded-xl border border-[var(--brand-mid)]/25 bg-white/88 px-3 py-2.5 font-[var(--font-body)] text-[12px] font-semibold leading-[1.45] text-[var(--brand-night)] shadow-[0_10px_22px_color-mix(in_srgb,var(--brand-deep)_6%,transparent)] sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-4 sm:text-[14px] sm:leading-relaxed"
                >
                  <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <DirectAnswerSection {...directAnswers} />

      {HOME_BANNERS.map((banner, index) => (
        <HomeBannerSection
          key={`${lang}-${banner}`}
          id={index === 0 ? "core-services" : undefined}
          lang={lang}
          file={banner}
          label={bannerTextContent[index]?.title}
          textContent={bannerTextContent[index]}
        />
      ))}

      <section className="content-atmosphere relative overflow-hidden bg-[var(--brand-night)] px-4 py-5 sm:px-6 sm:py-10 md:py-16" aria-labelledby="home-validator-title">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_25%,color-mix(in_srgb,var(--brand-cyan-bright)_20%,transparent),transparent_34%),radial-gradient(circle_at_88%_80%,color-mix(in_srgb,var(--brand-primary)_22%,transparent),transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[18px] border border-[var(--brand-cyan-bright)]/45 bg-white/[0.12] px-4 py-4 shadow-[0_14px_34px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:rounded-[26px] sm:px-6 sm:py-8 md:rounded-[30px] md:px-10 md:py-11 md:shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--brand-cyan-bright)]/20 blur-3xl" />
          <div className="relative z-10 grid items-center gap-4 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div>
              <p className="inline-flex rounded-full border border-[var(--brand-cyan-bright)]/35 bg-[var(--brand-cyan-bright)]/10 px-2 py-0.5 font-[var(--font-body)] text-[8px] font-black uppercase tracking-[0.15em] text-[var(--brand-cyan-bright)] sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.2em]">
                {validatorCta.label}
              </p>
              <h2 id="home-validator-title" className="mt-2.5 max-w-3xl font-[var(--font-heading)] text-[1.3rem] font-black leading-[1.08] !text-white sm:mt-4 sm:text-[clamp(1.9rem,3.2vw,3rem)] sm:leading-[1.05]">
                {validatorCta.title}
              </h2>
              <p className="mt-2.5 max-w-3xl font-[var(--font-body)] text-[12px] font-medium leading-[1.5] !text-[#2cb4f2] sm:mt-4 sm:text-[15px] sm:leading-relaxed md:text-[16px]">
                {validatorCta.description}
              </p>
              <div className="mt-3 grid max-w-3xl gap-1.5 font-[var(--font-body)] text-[11px] font-bold text-white/90 sm:mt-6 sm:grid-cols-2 sm:gap-3 sm:text-[13px]">
                <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3">
                  <Search className="h-4 w-4 shrink-0 text-[var(--brand-cyan-bright)] sm:h-5 sm:w-5" aria-hidden="true" />
                  {validatorCta.seo}
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3">
                  <Brain className="h-4 w-4 shrink-0 text-[var(--brand-cyan-bright)] sm:h-5 sm:w-5" aria-hidden="true" />
                  {validatorCta.aeo}
                </span>
              </div>
            </div>
            <Link
              href={`/${lang}/seo-aeo-validator`}
              className="neon-shimmer group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/15 bg-[var(--brand-primary)] px-4 py-2 font-[var(--font-body)] text-[9px] font-extrabold uppercase tracking-[0.13em] text-white shadow-[0_10px_24px_color-mix(in_srgb,var(--brand-cyan-mid)_26%,transparent)] transition-all duration-500 hover:scale-[1.03] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-cyan-mid)_28%,transparent),0_18px_42px_color-mix(in_srgb,var(--brand-cyan-mid)_24%,transparent)] active:scale-95 sm:gap-3 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.16em] md:px-8 md:py-4 md:text-[12px]"
            >
              {validatorCta.button}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      
      <QuizCTA />
      <FinalCTA 
        title={content.finalCta.title} 
        title_highlight={content.finalCta.title_highlight} 
        description={content.finalCta.description} 
        description_highlight={content.finalCta.description_highlight} 
        button={content.finalCta.button} 
        variant="home" />

      <Suspense fallback={null}>{isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}</Suspense>
    </div>
  );
}
