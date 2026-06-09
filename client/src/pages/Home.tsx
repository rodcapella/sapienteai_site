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
  "home_o_que_nos_diferencia.webp",
  "home_resultados_gera_ia.webp",
  "home_marketing_digital_ia.webp",
  "home_personalidade_marca.webp",
];

type HomeBannerSectionProps = {
  lang: string;
  file: string;
  label?: string;
  id?: string;
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

function HomeBannerSection({ lang, file, label, id }: HomeBannerSectionProps) {
  const bannerSrc = getHomeBannerSrc(lang, file);

  return (
    <section
      id={id}
      className="relative block w-full overflow-hidden bg-[var(--section-ice)] m-0 p-0 border-0"
      aria-label={label}
    >
      <Reveal>
        <img
          src={bannerSrc}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full object-contain"
          loading="lazy"
        />
      </Reveal>
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
    url: `https://sapienteai.com/${lang}`,
  }, [lang]);

  const [isContactOpen, setIsContactOpen] = useState(false);

  const bannerLabels: (string | undefined)[] = [
    isPT ? "O que nos diferencia" : "What makes us different",
    content.coreServices?.label,
    content.marketingAI?.title,
    content.brandPersonality?.title,
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
          label={bannerLabels[index]}
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
