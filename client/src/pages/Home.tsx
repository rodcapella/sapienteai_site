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

export default function Home() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const isPT = lang === "pt";
  const content = isPT ? homePT : homeEN;

  const [isContactOpen, setIsContactOpen] = useState(false);

  const coreServiceIcons = [Icons.Bot, Icons.Cog, Icons.Cpu, Icons.ShieldCheck, Icons.BarChart3, Icons.MessageCircle];
  const automationIcons = [Icons.Zap, Icons.Calendar, Icons.TrendingUp];
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

          <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="group inline-flex items-center gap-4 rounded-full border border-[var(--brand-primary)]/55 bg-[var(--brand-primary)] px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-500 hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_0_35px_rgba(10,180,255,0.45)]" onClick={() => document.getElementById("core-services")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-white/15 text-white transition-transform duration-500 group-hover:translate-x-1">
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
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group relative flex min-h-[194px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#DCEAF8] bg-white/90 p-6 text-center shadow-[0_8px_30px_rgba(0,21,71,.06)] backdrop-blur-xl transition-all duration-300 hover:bg-[#001547] hover:shadow-[0_14px_38px_rgba(0,21,71,.16)]">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6FF] text-[var(--brand-primary)] transition-all duration-300 group-hover:bg-white/10 group-hover:text-[var(--brand-primary)]"><Icon className="h-8 w-8" /></div>
                    <div className="mb-4 h-0.5 w-5 rounded-full bg-[var(--brand-primary)] transition-all duration-300 group-hover:bg-[var(--brand-primary)]" />
                    <div className="relative z-10 flex min-h-[3.2rem] items-center justify-center"><p className="max-w-[12rem] font-heading text-xl font-black leading-tight tracking-tight text-[#050A30] transition-colors duration-300 group-hover:text-white md:text-2xl">{keyword}</p></div>
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
            <SectionCard key={service.title} delay={i * 0.07} className="glass-panel cyber-border rounded-3xl bg-[#071129]/58 p-7 md:p-8">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/55 bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)] shadow-[0_0_24px_rgba(0,209,255,0.34)]"><Icon className="h-7 w-7" /></div>
              <h3 className="mb-3 font-heading text-2xl font-black tracking-tight text-[var(--brand-offwhite)]">{service.title}</h3><p className="text-base leading-relaxed text-[var(--brand-offwhite)]/78">{service.description}</p>
            </SectionCard>
          ); })}
        </div>
      </Section>

      <Section className={homeSectionClass}>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal>
            <img
              src="/media/banners/home_marketing_digital_ia.jpeg"
              alt={content.marketingAI.title}
              className="w-full rounded-[2rem] border border-[var(--brand-cyan)]/20 object-cover shadow-[0_24px_70px_rgba(1,32,80,0.16)]"
            />
          </Reveal>
        </div>
      </Section>

      <Section className={homeSectionClass}>
        <SectionHeader><Reveal><SectionTitle label={content.smartAutomation.label} title={content.smartAutomation.title} /></Reveal></SectionHeader>
        <div className="relative z-10 mx-auto mt-16 grid max-w-7xl gap-7 px-6 lg:grid-cols-3 md:gap-9">
          {content.smartAutomation.columns.map((column, i) => { const Icon = automationIcons[i % automationIcons.length]; return (
            <SectionCard key={column.title} delay={i * 0.09} className="rounded-[2rem] bg-[#06102A]/58 p-8 md:p-10">
              <div className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/45 bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)]"><Icon className="h-8 w-8" /></div>
              <h3 className="mb-4 font-heading text-3xl font-black tracking-tight text-[var(--brand-offwhite)]">{column.title}</h3>
              <ul className="space-y-3">{column.points.map((point) => <li key={point} className="flex items-start gap-3 text-[var(--brand-offwhite)]/82"><Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-cyan)]" /><span>{point}</span></li>)}</ul>
            </SectionCard>
          ); })}
        </div>
      </Section>

      <Section className={homeSectionClass}>
        <SectionHeader><Reveal><SectionTitle label={content.conversionWebsites.label} title={content.conversionWebsites.title} variant="light" /></Reveal></SectionHeader>
        <div className="relative z-10 mx-auto mt-14 grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.conversionWebsites.items.map((item, i) => { const Icon = conversionIcons[i % conversionIcons.length]; return (
            <Reveal key={item} delay={i * 55}><motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25, ease: "easeOut" }} className="group relative overflow-hidden rounded-3xl border border-primary/25 bg-white/90 p-5 shadow-[0_18px_45px_rgba(10,17,40,0.1)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--brand-cyan)]/70 hover:shadow-[0_22px_60px_rgba(0,209,255,0.22)]"><div className="absolute inset-x-0 top-0 h-1 [background:var(--brand-gradient-border)] opacity-80" /><div className="relative z-10 flex items-center gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/40 bg-[#06102A] text-[var(--brand-cyan)]"><Icon className="h-6 w-6" /></div><p className="font-heading text-base font-black leading-tight tracking-tight text-foreground md:text-lg">{item}</p></div></motion.div></Reveal>
          ); })}
        </div>
      </Section>
      {isPT && (
        <Section className={homeSectionClass}>
          <SectionHeader><Reveal><SectionTitle label={homePT.brandPersonality.label} title={homePT.brandPersonality.title} /></Reveal></SectionHeader>
          <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-6 px-6 md:grid-cols-2 xl:grid-cols-5">
            {homePT.brandPersonality.traits.map((trait, i) => { const Icon = brandbookIcons[i % brandbookIcons.length]; return (
              <SectionCard key={trait.title} delay={i * 0.07} variant="subtle" className="rounded-3xl border border-[var(--brand-cyan)]/20 bg-[#071129]/58 p-6 text-[var(--brand-offwhite)] shadow-[0_20px_50px_rgba(0,0,0,0.18)]"><div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--brand-cyan)]/35 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]"><Icon className="h-6 w-6" /></div><h3 className="font-heading text-xl font-extrabold text-[var(--brand-offwhite)]">{trait.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--brand-offwhite)]/75">{trait.description}</p></SectionCard>
            ); })}
          </div>
        </Section>
      )}

      <FinalCTA title={content.finalCta.title} description={content.finalCta.subtitle} button={content.finalCta.button} />

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
