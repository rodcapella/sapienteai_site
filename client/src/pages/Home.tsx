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
  const conversionIcons = [Icons.FileText, Icons.Award, Icons.Users, Icons.Bot, Icons.Target, Icons.Scissors, Icons.TrendingUp, Icons.Rocket];
  const keywordIcons = [Icons.FileText, Icons.Award, Icons.Users, Icons.Bot, Icons.Target, Icons.Cog, Icons.TrendingUp, Icons.BarChart3];
  const brandbookIcons = [Icons.Bot, Icons.Brain, Icons.TrendingUp, Icons.PieChart, Icons.Cog, Icons.MessageCircle, Icons.ShieldCheck];

  return (
    <div className="flex flex-col bg-background">
      <Section className="hero relative flex min-h-[90vh] items-center justify-start overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <img src="/media/bg/bg_hero.jpeg" alt="Sapiente.AI" className="h-full w-full object-cover" />
        </div>

        <div className="relative z-10 w-full max-w-6xl px-8 text-left sm:px-10 md:ml-12 lg:ml-20 xl:ml-24">
          <Reveal>
            <div className="glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.32em] text-[var(--brand-night)] dark:text-[var(--brand-cyan)] sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-cyan-bright)] shadow-[0_0_20px_color-mix(in_srgb,var(--brand-cyan-bright)_60%,transparent)]" />
              {content.hero.label}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-10 max-w-5xl font-heading text-[clamp(2.75rem,6.4vw,6rem)] font-extrabold leading-[1.02] text-[var(--brand-offwhite)] drop-shadow-[0_8px_32px_rgba(0,0,0,0.58)] [text-shadow:0_0_28px_color-mix(in_srgb,var(--brand-cyan)_22%,transparent),0_2px_12px_color-mix(in_srgb,var(--brand-night)_78%,transparent)]">
              {content.hero.title}
              {content.hero.highlight && (
                <>
                  <br />
                  <span className="internal-hero-highlight">{content.hero.highlight}</span>
                </>
              )}
            </h1>
          </Reveal>

          <Reveal delay={190}>
            <p className="mt-8 max-w-4xl text-lg font-medium leading-relaxed text-[var(--brand-offwhite)]/88 drop-shadow-[0_4px_18px_color-mix(in_srgb,var(--brand-night)_45%,transparent)] sm:text-xl md:text-2xl">{content.hero.subtitle}</p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-12 flex flex-col items-start justify-start gap-5 sm:flex-row sm:gap-8">
              <PremiumButton onClick={() => setIsContactOpen(true)} size="lg" variant="primary" className="w-full !bg-[var(--brand-cyan-bright)] !text-[var(--brand-night)] hover:!bg-[var(--brand-primary)] hover:!text-[var(--brand-offwhite)] [&>span]:!text-[var(--brand-night)] hover:[&>span]:!text-[var(--brand-offwhite)] sm:w-auto">
                {content.hero.ctaPrimary}
              </PremiumButton>

              <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="group inline-flex items-center gap-4 rounded-full border border-[var(--brand-purple)]/55 bg-[var(--brand-night)]/45 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-offwhite)]/80 backdrop-blur-xl transition-all duration-500 hover:border-[var(--brand-cyan-bright)] hover:text-[var(--brand-offwhite)] hover:shadow-[0_0_35px_color-mix(in_srgb,var(--brand-cyan-bright)_45%,transparent)]" onClick={() => document.getElementById("core-services")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-purple)]/60 bg-[var(--brand-cyan)]/20 text-[var(--brand-cyan-bright)] transition-transform duration-500 group-hover:translate-x-1">
                  <Icons.ArrowRight className="h-4 w-4" />
                </span>
                {content.hero.ctaSecondary}
              </motion.button>
            </div>
          </Reveal>
        </div>
      </Section>

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
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group relative flex min-h-[194px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--brand-purple)]/35 bg-[var(--brand-offwhite)]/90 p-6 text-center shadow-[0_8px_30px_color-mix(in_srgb,var(--brand-deep)_6%,transparent)] backdrop-blur-xl transition-all duration-300 hover:bg-[var(--brand-night)] hover:shadow-[0_14px_38px_color-mix(in_srgb,var(--brand-primary)_18%,transparent)]">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-offwhite)] text-[var(--brand-primary)] transition-all duration-300 group-hover:bg-[var(--brand-offwhite)]/10 group-hover:text-[var(--brand-cyan-bright)]"><Icon className="h-8 w-8" /></div>
                    <div className="mb-4 h-0.5 w-5 rounded-full bg-[var(--brand-primary)] transition-all duration-300 group-hover:bg-[var(--brand-cyan-bright)]" />
                    <div className="relative z-10 flex min-h-[3.2rem] items-center justify-center"><p className="max-w-[12rem] font-heading text-xl font-black leading-tight tracking-tight text-[var(--brand-night)] transition-colors duration-300 group-hover:text-[var(--brand-offwhite)] md:text-2xl">{keyword}</p></div>
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
            <SectionCard key={service.title} delay={i * 0.07} className="glass-panel cyber-border rounded-3xl bg-[var(--brand-deep)]/58 p-7 md:p-8">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--brand-purple)]/55 bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)] shadow-[0_0_24px_color-mix(in_srgb,var(--brand-cyan-bright)_34%,transparent)]"><Icon className="h-7 w-7" /></div>
              <h3 className="mb-3 font-heading text-2xl font-black tracking-tight text-[var(--brand-offwhite)]">{service.title}</h3><p className="text-base leading-relaxed text-[var(--brand-offwhite)]/78">{service.description}</p>
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
            <Reveal key={item} delay={i * 55}><motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25, ease: "easeOut" }} className="group relative overflow-hidden rounded-3xl border border-[var(--brand-purple)]/35 bg-[var(--brand-offwhite)]/90 p-5 shadow-[0_18px_45px_color-mix(in_srgb,var(--brand-deep)_10%,transparent)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--brand-cyan-bright)]/70 hover:shadow-[0_22px_60px_color-mix(in_srgb,var(--brand-cyan-bright)_22%,transparent)]"><div className="absolute inset-x-0 top-0 h-1 [background:var(--brand-gradient-border)] opacity-80" /><div className="relative z-10 flex items-center gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--brand-purple)]/40 bg-[var(--brand-deep)] text-[var(--brand-cyan)]"><Icon className="h-6 w-6" /></div><p className="font-heading text-base font-black leading-tight tracking-tight text-foreground md:text-lg">{item}</p></div></motion.div></Reveal>
          ); })}
        </div>
      </Section>

      {isPT && (
        <Section className={homeSectionClass}>
          <SectionHeader><Reveal><SectionTitle label={homePT.brandPersonality.label} title={homePT.brandPersonality.title} /></Reveal></SectionHeader>
          <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-6 px-6 md:grid-cols-2 xl:grid-cols-5">
            {homePT.brandPersonality.traits.map((trait, i) => { const Icon = brandbookIcons[i % brandbookIcons.length]; return (
              <SectionCard key={trait.title} delay={i * 0.07} variant="subtle" className="rounded-3xl border border-[var(--brand-purple)]/35 bg-[var(--brand-deep)]/58 p-6 text-[var(--brand-offwhite)] shadow-[0_20px_50px_color-mix(in_srgb,var(--brand-night)_18%,transparent)]"><div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--brand-purple)]/35 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]"><Icon className="h-6 w-6" /></div><h3 className="font-heading text-xl font-extrabold text-[var(--brand-offwhite)]">{trait.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--brand-offwhite)]/75">{trait.description}</p></SectionCard>
            ); })}
          </div>
        </Section>
      )}

      <FinalCTA title={content.finalCta.title} description={content.finalCta.subtitle} button={content.finalCta.button} />

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
