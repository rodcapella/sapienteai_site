import { useState } from "react";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
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
  "home_como_ajudamos_ai.webp",
  "home_marketing_digital_ia.webp",
  "home_automacao_ia.webp",
  "home_personalidade_marca.webp",
];

type HomeBannerSectionProps = {
  lang: string;
  file: string;
  label?: string;
  id?: string;
  maxHeight?: number;
  desktopHeight?: 480;
};

function getHomeBannerSrc(lang: string, file: string) {
  const folder = lang === "en" ? "EN" : "PT";
  const englishFileMap: Record<string, string> = {
    "home_o_que_nos_diferencia.webp": "home_o_que_nos_diferencia_en.webp",
    "home_resultados_gera_ia.webp": "home_resultados_gera_ia_en.webp",
    "home_automacao_ia.webp": "home_automacao_ia_en.webp",
    "home_personalidade_marca.webp": "home_personalidade_marca_en.webp",
    "home_como_ajudamos_ai.webp": "home_como_ajudamos_ai_en.webp",
    "home_marketing_digital_ia.webp": "home_marketing_digital_ia_en.webp",
  };
  const localizedFile = lang === "en" ? englishFileMap[file] || file : file;
  return `${HOME_BANNER_BASE_PATH}/${folder}/${localizedFile}`;
}

function HomeBannerSection({ lang, file, label, id, maxHeight, desktopHeight }: HomeBannerSectionProps) {
  const backgroundSrc = getHomeBannerSrc(lang, file);

  return (
    <section
      id={id}
      className={[
        "relative block w-full overflow-hidden bg-[var(--section-ice)] bg-contain bg-center bg-no-repeat m-0 p-0 border-0",
        desktopHeight === 480 ? "md:h-[480px]" : "",
      ].filter(Boolean).join(" ")}
      style={{ backgroundImage: `url(${backgroundSrc})`, maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
      aria-label={label}
    >
      <Reveal>
        <img
          src={backgroundSrc}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full object-contain opacity-0"
          style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
        />
      </Reveal>
    </section>
  );
}

export default function Home() {
  const { lang } = useTranslation();
  const isPT = lang === "pt";
  const content = isPT ? homePT : homeEN;

  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="home-page flex flex-col bg-[var(--section-ice)]">
      <InternalHero label={content.hero.label} title={content.hero.title} highlight={content.hero.highlight} subtitle={content.hero.subtitle}>
        <div className="flex flex-col items-start justify-start gap-5 sm:flex-row sm:gap-8">
          <PremiumButton onClick={() => setIsContactOpen(true)} size="lg" variant="primary" className="w-full !rounded-2xl sm:w-auto sm:!rounded-full">
            {content.hero.ctaPrimary}
          </PremiumButton>

          <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="group inline-flex items-center gap-4 rounded-full border border-[var(--brand-primary)]/55 bg-[var(--brand-primary)] px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-offwhite)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-[var(--brand-offwhite)] hover:shadow-[0_0_35px_color-mix(in_srgb,var(--brand-primary) 45%,transparent)]" onClick={() => document.getElementById("core-services")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-offwhite)]/45 bg-[var(--brand-offwhite)]/15 text-[var(--brand-offwhite)] transition-transform duration-500 group-hover:translate-x-1">
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
          desktopHeight={index === 0 || index === 4 || index === 5 ? 480 : undefined}
          maxHeight={index === 4 || index === 5 ? 580 : undefined}
          label={[
            isPT ? "O que nos diferencia" : "What makes us different",
            content.coreServices.label,
            content.coreServices.title,
            content.marketingAI.title,
            content.beforeAfter.title,
            content.brandPersonality.title,
          ][index]}
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
