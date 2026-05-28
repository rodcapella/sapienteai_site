import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

import { Icons } from "@/lib/icons";
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
  "home_resultados_gera_ia.png",
  "home_como_ajudamos_ai.png",
  "home_marketing_digital_ia.jpeg",
  "home_automacao_ia.png",
  "home_personalidade_marca.png",
];

type HomeBannerSectionProps = {
  lang: string;
  file: string;
  label?: string;
};

function getHomeBannerSrc(lang: string, file: string) {
  const folder = lang === "en" ? "EN" : "PT";
  const englishFileMap: Record<string, string> = {
    "home_resultados_gera_ia.png": "home_resultados_gera_ia_en.png",
    "home_automacao_ia.png": "home_automacao_ia_en.png",
    "home_personalidade_marca.png": "home_personalidade_marca_en.png",
    "home_como_ajudamos_ai.png": "home_como_ajudamos_ai_en.png",
  };
  const localizedFile = lang === "en" ? englishFileMap[file] || file : file;
  return `${HOME_BANNER_BASE_PATH}/${folder}/${localizedFile}`;
}

function HomeBannerSection({ lang, file, label }: HomeBannerSectionProps) {
  const backgroundSrc = getHomeBannerSrc(lang, file);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#EAF6FF] bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundSrc})` }}
      aria-label={label}
    >
      <Reveal>
        <img
          src={backgroundSrc}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full object-contain opacity-0"
        />
      </Reveal>
    </section>
  );
}

export default function Home() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const isPT = lang === "pt";
  const content = isPT ? homePT : homeEN;

  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="home-page flex flex-col bg-[#EAF6FF]">
      <InternalHero label={content.hero.label} title={content.hero.title} highlight={content.hero.highlight} subtitle={content.hero.subtitle}>
        <div className="flex flex-col items-start justify-start gap-5 sm:flex-row sm:gap-8">
          <PremiumButton onClick={() => setIsContactOpen(true)} size="lg" variant="primary" className="w-full sm:w-auto">
            {content.hero.ctaPrimary}
          </PremiumButton>

          <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="group inline-flex items-center gap-4 rounded-full border border-[#0A84FF]/55 bg-[#0A84FF] px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-[#EAF6FF] backdrop-blur-xl transition-all duration-500 hover:border-[#0A84FF] hover:bg-[#0A84FF] hover:text-[#EAF6FF] hover:shadow-[0_0_35px_rgba(10,132,255,0.45)]" onClick={() => document.getElementById("core-services")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EAF6FF]/45 bg-[#EAF6FF]/15 text-[#EAF6FF] transition-transform duration-500 group-hover:translate-x-1">
              <Icons.ArrowRight className="h-4 w-4" />
            </span>
            {content.hero.ctaSecondary}
          </motion.button>
        </div>
      </InternalHero>

      {HOME_BANNERS.map((banner, index) => (
        <HomeBannerSection
          key={`${lang}-${banner}`}
          lang={lang}
          file={banner}
          label={[
            content.coreServices.label,
            content.coreServices.title,
            content.marketingAI.title,
            content.beforeAfter.title,
            content.brandPersonality.title,
          ][index]}
        />
      ))}
      
      <QuizCTA />
      <FinalCTA title={content.finalCta.title} title_highlight={content.finalCta.title_highlight} description={content.finalCta.description} description_highlight={content.finalCta.description_highlight} button={content.finalCta.button} variant="home" />

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
