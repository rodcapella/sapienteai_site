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
    <div className="home-page flex flex-col bg-background">
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

      {isPT && (
        <Section className={homeSectionClass}>
          <SectionHeader>
            <Reveal>
              <SectionTitle label="Resultados que a IA gera" title="O que a IA entrega ao seu negócio" description="Mais eficiência. Menos esforço. Crescimento real." variant="light" />
            </Reveal>
          </SectionHeader>

          <div className="relative z-10 mx-auto mt-12 grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {homePT.keywords.map((keyword, i) => {
              const Icon = keywordIcons[i % keywordIcons.length];
              return (
                <Reveal key={keyword} delay={i * 45}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group relative flex min-h-[194px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#EAF6FF] bg-[#EAF6FF]/90 p-6 text-center shadow-[0_8px_30px_rgba(5,8,22,.06)] backdrop-blur-xl transition-all duration-300 hover:bg-[#050816] hover:shadow-[0_14px_38px_rgba(5,8,22,.16)]">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6FF] text-[#0A84FF] transition-all duration-300 group-hover:bg-[#EAF6FF]/10 group-hover:text-[#0A84FF]"><Icon className="h-8 w-8" /></div>
                    <div className="mb-4 h-0.5 w-5 rounded-full bg-[#0A84FF] transition-all duration-300 group-hover:bg-[#0A84FF]" />
                    <div className="relative z-10 flex min-h-[3.2rem] items-center justify-center"><p className={`max-w-[12rem] ${compactCardTextClass} text-[#050816] transition-colors duration-300 group-hover:text-[#EAF6FF]`}>{keyword}</p></div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      <Section id="core-services" className={homeSectionClass}>
        <SectionHeader><Reveal><SectionTitle label={content.coreServices.label} title={content.coreServices.title} /></Reveal></SectionHeader>
        <div className="relative z-10 mx-auto mt-16 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 xl:grid-cols-3 md:gap-8">
          {content.coreServices.items.map((service, i) => { const Icon = coreServiceIcons[i % coreServiceIcons.length]; return (
            <SectionCard key={service.title} delay={i * 0.07} className="glass-panel cyber-border rounded-3xl bg-[#050816]/58 p-7 md:p-8">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00D1FF]/55 bg-[#00D1FF]/12 text-[#00D1FF] shadow-[0_0_24px_rgba(0,209,255,0.34)]"><Icon className="h-7 w-7" /></div>
              <h3 className={`mb-3 ${compactCardTextClass} text-[#EAF6FF]`}>{service.title}</h3><p className="text-base leading-relaxed text-[#EAF6FF]/78">{service.description}</p>
            </SectionCard>
          ); })}
        </div>
      </Section>

      <Section
        className="relative min-h-[700px] overflow-hidden bg-[url('/media/banners/home_marketing_digital_ia.jpeg')] bg-cover bg-center bg-no-repeat py-24 md:min-h-[760px] md:py-36"
        aria-label={content.marketingAI.title}
      >
        <Reveal>
          <div className="relative z-10 mx-auto max-w-7xl px-6" />
        </Reveal>
      </Section>

      <Section className={homeSectionClass}>
        <SectionHeader><Reveal><SectionTitle label={content.conversionWebsites.label} title={content.conversionWebsites.title} variant="light" /></Reveal></SectionHeader>
        <div className="relative z-10 mx-auto mt-14 grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.conversionWebsites.items.map((item, i) => { const Icon = conversionIcons[i % conversionIcons.length]; return (
            <Reveal key={item} delay={i * 55}><motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25, ease: "easeOut" }} className="group relative overflow-hidden rounded-3xl border border-primary/25 bg-[#EAF6FF]/90 p-5 shadow-[0_18px_45px_rgba(26,31,46,0.1)] backdrop-blur-xl transition-all duration-500 hover:border-[#00D1FF]/70 hover:shadow-[0_22px_60px_rgba(0,209,255,0.22)]"><div className="absolute inset-x-0 top-0 h-1 [background:var(--brand-gradient-border)] opacity-80" /><div className="relative z-10 flex items-center gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#00D1FF]/40 bg-[#050816] text-[#00D1FF]"><Icon className="h-6 w-6" /></div><p className={`${compactCardTextClass} text-foreground`}>{item}</p></div></motion.div></Reveal>
          ); })}
        </div>
      </Section>

      {isPT && (
        <Section className={homeSectionClass}>
          <SectionHeader><Reveal><SectionTitle label={homePT.brandPersonality.label} title={homePT.brandPersonality.title} /></Reveal></SectionHeader>
          <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-6 px-6 md:grid-cols-2 xl:grid-cols-5">
            {homePT.brandPersonality.traits.map((trait, i) => { const Icon = brandbookIcons[i % brandbookIcons.length]; return (
              <SectionCard key={trait.title} delay={i * 0.07} variant="subtle" className="rounded-3xl border border-[#00D1FF]/20 bg-[#050816]/58 p-6 text-[#EAF6FF] shadow-[0_20px_50px_rgba(5,8,22,0.18)]"><div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#00D1FF]/35 bg-[#00D1FF]/10 text-[#00D1FF]"><Icon className="h-6 w-6" /></div><h3 className={`${compactCardTextClass} text-[#EAF6FF]`}>{trait.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#EAF6FF]/75">{trait.description}</p></SectionCard>
            ); })}
          </div>
        </Section>
      )}

      <FinalCTA title={content.finalCta.title} description={content.finalCta.subtitle} button={content.finalCta.button} />

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
