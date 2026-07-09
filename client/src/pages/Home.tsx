import { Suspense, lazy, useState } from "react";

import { useTranslation } from "@/hooks/useTranslation";
import { useSEOHead } from "@/hooks/useSEOHead";
import { ArrowRight } from "@/lib/icons";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";

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
  /** posiÃ§Ã£o do card: esquerda ou direita da imagem */
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

function HomeBannerSection({ lang, file, label, id, textContent }: HomeBannerSectionProps) {
  const bannerSrc = getHomeBannerSrc(lang, file);
  const align = textContent?.align ?? "left";

  return (
    <section
      id={id}
      className="content-atmosphere relative w-full overflow-hidden bg-[var(--section-ice)] aspect-[1920/700] sm:aspect-[1920/700]"
      aria-label={label}
    >
      {/* Imagem de fundo */}
      <Reveal className="absolute inset-0">
        <img
          src={bannerSrc}
          alt=""
          aria-hidden="true"
          width="1920"
          height="700"
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
        />
      </Reveal>

      {/* TranscriÃ§Ã£o indexÃ¡vel/acessÃ­vel do conteÃºdo que estÃ¡ na imagem do banner */}
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
  const heroTitle = isPT ? (
    <>
      <span className="sm:hidden">
        InteligÃªncia que
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
      ? "IA Aplicada para Empresas | AutomaÃ§Ã£o, ConversÃ£o e Crescimento"
      : "Applied AI for Business | Automation, Conversion and Growth",
    description: isPT
      ? "A Sapiente.AI ajuda empresas a crescer com automaÃ§Ã£o, websites orientados Ã  conversÃ£o, chatbots, anÃ¡lise de dados e marketing digital com inteligÃªncia artificial."
      : "Sapiente.AI helps businesses grow with automation, conversion-focused websites, chatbots, data analytics and AI-powered digital marketing.",
    url: `https://www.sapienteai.com/${lang}`,
  }, [lang]);

  const [isContactOpen, setIsContactOpen] = useState(false);

  const bannerTextContent = [
    // Banner 1 â€” O que nos diferencia
    {
      eyebrow: isPT ? "Por que a Sapiente.AI" : "Why Sapiente.AI",
      title: isPT ? "O que nos diferencia" : "What makes us different",
      description: isPT
        ? "Combinamos estratÃ©gia, IA, automaÃ§Ã£o e validaÃ§Ã£o humana para criar soluÃ§Ãµes digitais orientadas a resultados reais."
        : "We combine strategy, AI, automation, and human validation to build digital solutions focused on measurable business outcomes.",
      items: isPT
        ? [
            { title: "Parceiro Ãºnico do inÃ­cio ao fim" },
            { title: "TransparÃªncia e mÃ©tricas reais" },
            { title: "Tecnologia aplicada ao seu negÃ³cio especÃ­fico" },
            { title: "Resultados mensurÃ¡veis, nÃ£o relatÃ³rios bonitos" },
          ]
        : [
            { title: "Single partner from start to finish" },
            { title: "Full transparency and real metrics" },
            { title: "Technology tailored to your specific business" },
            { title: "Measurable results, not polished reports" },
          ],
      align: "left" as const,
    },
    // Banner 2 â€” Core Services
    {
      eyebrow: content.coreServices?.label,
      title: content.coreServices?.title ?? (isPT ? "Onde a IA impacta o seu negÃ³cio" : "Where AI impacts your business"),
      description: isPT
        ? "AquisiÃ§Ã£o de clientes, eficiÃªncia operacional, websites de conversÃ£o, anÃ¡lise de dados, chatbots 24/7, redes sociais e conteÃºdo visual."
        : "Customer acquisition, operational efficiency, conversion websites, data analytics, 24/7 chatbots, social media and visual content.",
      items: content.coreServices?.items?.slice(0, 5),
      align: "right" as const,
    },
    // Banner 3 â€” Marketing AI
    {
      eyebrow: content.marketingAI?.label,
      title: content.marketingAI?.title ?? (isPT ? "Marketing digital com inteligÃªncia artificial" : "Digital marketing with artificial intelligence"),
      description: content.marketingAI?.subtitle ?? (isPT
        ? "Branding estratÃ©gico, conteÃºdo com IA e reporting de performance para crescimento sustentÃ¡vel."
        : "Strategic branding, AI-powered content and performance reporting for sustainable growth."),
      items: content.marketingAI?.cards?.map((c: { title: string }) => ({ title: c.title })),
      align: "left" as const,
    },
    // Banner 4 â€” Brand Personality
    {
      eyebrow: content.brandPersonality?.label,
      title: content.brandPersonality?.title ?? (isPT ? "Uma parceira tecnolÃ³gica para o crescimento" : "A technology partner for growth"),
      description: isPT
        ? "Trabalhamos como extensÃ£o da sua equipa â€” inteligentes, visionÃ¡rios, confiÃ¡veis e focados em resultados."
        : "We work as an extension of your team â€” intelligent, visionary, reliable, and results-focused.",
      items: content.brandPersonality?.traits?.map((t: { title: string }) => ({ title: t.title })),
      align: "right" as const,
    },
  ];

  const homeSeoSummary = isPT
    ? {
        eyebrow: "IA aplicada para empresas",
        title: "AutomaÃ§Ã£o, aquisiÃ§Ã£o de clientes e crescimento com foco comercial",
        description:
          "A Sapiente.AI combina estratÃ©gia, inteligÃªncia artificial e execuÃ§Ã£o para transformar tecnologia em captaÃ§Ã£o de leads, eficiÃªncia operacional e resultados mensurÃ¡veis.",
        points: [
          "AutomaÃ§Ã£o de processos, atendimento e operaÃ§Ãµes internas",
          "Websites orientados Ã  conversÃ£o e geraÃ§Ã£o de oportunidades",
          "Marketing digital com IA, conteÃºdos e campanhas de performance",
          "Dashboards, anÃ¡lise de dados e apoio Ã  decisÃ£o comercial",
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

      <section className="content-atmosphere bg-white px-6 py-10 md:py-14">
        <div className="mx-auto max-w-6xl rounded-[30px] border border-[var(--brand-mid)]/30 bg-[color-mix(in_srgb,var(--section-ice)_88%,white)] p-6 shadow-[0_20px_48px_color-mix(in_srgb,var(--brand-deep)_8%,transparent)] md:p-8 lg:p-10">
          <p className="font-[var(--font-body)] text-[12px] font-black uppercase tracking-[0.18em] text-[var(--brand-primary)]">
            {homeSeoSummary.eyebrow}
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div data-speakable>
              <h2 className="font-[var(--font-heading)] text-[clamp(1.9rem,3.2vw,3rem)] font-black leading-[1.05] text-[var(--brand-night)]">
                {homeSeoSummary.title}
              </h2>
              <p className="mt-4 max-w-2xl font-[var(--font-body)] text-[15px] font-medium leading-relaxed text-[var(--brand-night)]/74 md:text-[16px]">
                {homeSeoSummary.description}
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {homeSeoSummary.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--brand-mid)]/25 bg-white/88 px-4 py-4 font-[var(--font-body)] text-[14px] font-semibold leading-relaxed text-[var(--brand-night)] shadow-[0_12px_28px_color-mix(in_srgb,var(--brand-deep)_6%,transparent)]"
                >
                  <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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


