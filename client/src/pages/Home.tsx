import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

import { Icons } from "@/lib/icons";
import ContactModal from "@/components/ContactModal";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";

import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

const homeSectionClass = "standard-section-bg relative overflow-hidden py-24 text-foreground md:py-36";
const compactCardTextClass = "font-heading text-[12px] font-black leading-tight tracking-tight md:text-[14px]";

export default function Home() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const isPT = lang === "pt";
  const content = isPT ? homePT : homeEN;

  const [isContactOpen, setIsContactOpen] = useState(false);

  const coreServiceIcons = [Icons.Bot, Icons.Cog, Icons.Cpu, Icons.ShieldCheck, Icons.BarChart3, Icons.MessageCircle];
  const conversionIcons = [Icons.FileText, Icons.Award, Icons.Users, Icons.Bot, Icons.Target, Icons.Scissors, Icons.TrendingUp, Icons.Rocket];
  const keywordIcons = [Icons.FileText, Icons.Award, Icons.Users, Icons.Bot, Icons.Target, Icons.Cog, Icons.TrendingUp, Icons.BarChart3];
  const brandbookIcons = [Icons.Bot, Icons.Brain, Icons.TrendingUp, Icons.PieChart, Icons.Cog, Icons.MessageCircle, Icons.ShieldCheck];

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

      <div className="relative w-full overflow-hidden bg-[#EAF6FF]">
        <Reveal>
          <img
            src="/media/banners/home_resultados_gera_ia.png"
            alt=""
            className="block h-auto w-full object-contain"
          />
        </Reveal>
      </div>

      <div className="relative w-full overflow-hidden bg-[#EAF6FF]" aria-label={content.coreServices.title}>
        <Reveal>
          <img
            src="/media/banners/home_como_ajudamos_ai.png"
            alt={content.coreServices.title}
            className="block h-auto w-full object-contain"
          />
        </Reveal>
      </div>

      <div className="relative w-full overflow-hidden bg-[#EAF6FF]" aria-label={content.marketingAI.title}>
        <Reveal>
          <img
            src="/media/banners/home_marketing_digital_ia.jpeg"
            alt={content.marketingAI.title}
            className="block h-auto w-full object-contain"
          />
        </Reveal>
      </div>

      <div className="relative w-full overflow-hidden bg-[#EAF6FF]">
        <Reveal>
          <img
            src="/media/banners/home_automacao_ia.png"
            alt=""
            className="block h-auto w-full object-contain"
          />
        </Reveal>
      </div>

      <div className="relative w-full overflow-hidden bg-[#EAF6FF]" aria-label={content.brandPersonality.title}>
        <Reveal>
          <img
            src="/media/banners/home_personalidade_marca.png"
            alt={content.brandPersonality.title}
            className="block h-auto w-full object-contain"
          />
        </Reveal>
      </div>
      
      <FinalCTA title={content.finalCta.title} title_highlight={content.finalCta.highlight} description={content.finalCta.subtitle} button={content.finalCta.button} />

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
