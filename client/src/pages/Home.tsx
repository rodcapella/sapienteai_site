import { useState } from "react";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useSEOHead } from "@/hooks/useSEOHead";
import { ArrowRight } from "@/lib/icons";
import ContactModal from "@/components/ContactModal";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";

import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

const HOME_BANNER_BASE_PATH = "/media/banners";
const HOME_BANNERS = [
  "home_o_que_nos_diferencia.png",
  "home_resultados_gera_ia.png",
  "home_marketing_digital_ia.png",
  "home_personalidade_marca.png",
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
    "home_o_que_nos_diferencia.png":  "home_o_que_nos_diferencia_en.png",
    "home_resultados_gera_ia.png":    "home_resultados_gera_ia_en.png",
    "home_marketing_digital_ia.png":  "home_marketing_digital_ia_en.png",
    "home_personalidade_marca.png":   "home_personalidade_marca_en.png",
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
      className="content-atmosphere relative min-h-[320px] w-full overflow-hidden bg-[var(--section-ice)] sm:aspect-[1920/700] sm:min-h-0"
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

  useSEOHead({
    title: isPT
      ? "Sapiente.AI - Inteligência Artificial Aplicada | Transformação Digital"
      : "Sapiente.AI - Applied Artificial Intelligence | Digital Transformation",
    description: isPT
      ? "Soluções de IA aplicada para transformação digital. Machine Learning, IA Generativa, Automação Inteligente."
      : "Applied AI solutions for digital transformation. Machine Learning, Generative AI, Intelligent Automation.",
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

  return (
    <div className="home-page flex flex-col bg-[var(--section-ice)]">
      <InternalHero label={content.hero.label} title={content.hero.title} highlight={content.hero.highlight} subtitle={content.hero.subtitle}>
        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-6">
          <PremiumButton onClick={() => setIsContactOpen(true)} size="lg" variant="primary" className="w-full !rounded-2xl sm:w-auto sm:!rounded-full">
            {content.hero.ctaPrimary}
          </PremiumButton>

          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[var(--brand-primary)]/55 bg-[var(--brand-primary)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--brand-offwhite)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:shadow-[0_0_35px_color-mix(in_srgb,var(--brand-primary)_45%,transparent)] sm:w-auto sm:justify-start sm:rounded-full"
            onClick={() => document.getElementById("core-services")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--brand-offwhite)]/45 bg-[var(--brand-offwhite)]/15 text-[var(--brand-offwhite)] transition-transform duration-500 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
            {content.hero.ctaSecondary}
          </motion.button>
        </div>
      </InternalHero>

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

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
