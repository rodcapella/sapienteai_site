import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

import { Icons } from "@/lib/icons";
import ContactModal from "@/components/ContactModal";

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TechBackdrop, TechParticleField } from "@/components/ui/tech/TechBackground";

import { homePT } from "@/content/pt/home";
import { homeEN } from "@/content/en/home";

const pillarBorder = [
  "border-[#00D1FF]/55",
  "border-[var(--brand-primary)]/55",
  "border-[#7B81FF]/55",
  "border-[#00F0FF]/55",
];

const lightSectionClass = "relative overflow-hidden bg-[#EAF6FF] py-24 text-foreground md:py-36";
const darkSectionClass = "relative overflow-hidden border-y border-[var(--tech-border)] bg-[#060B1E] tech-grid py-24 md:py-36";
const ctaSectionClass = "relative overflow-hidden bg-[linear-gradient(135deg,#05081B_0%,#06102A_44%,#0A2F66_72%,#7B81FF_100%)] py-24 text-center md:py-36 tech-grid";

export default function Home() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const isPT = lang === "pt";
  const content = isPT ? homePT : homeEN;

  const [isContactOpen, setIsContactOpen] = useState(false);

  const coreServiceIcons = [Icons.Bot, Icons.Cog, Icons.Cpu, Icons.ShieldCheck, Icons.BarChart3, Icons.MessageCircle];
  const marketingIcons = [Icons.Target, Icons.Brain, Icons.BarChart3];
  const automationIcons = [Icons.Zap, Icons.Calendar, Icons.TrendingUp];
  const conversionIcons = [Icons.FileText, Icons.Award, Icons.Users, Icons.Bot, Icons.Target, Icons.Scissors, Icons.TrendingUp, Icons.Rocket];
  const keywordIcons = [Icons.FileText, Icons.Award, Icons.Users, Icons.Bot, Icons.Target, Icons.Scissors, Icons.TrendingUp, Icons.Rocket];
  const brandbookIcons = [Icons.Bot, Icons.Brain, Icons.TrendingUp, Icons.PieChart, Icons.Cog, Icons.MessageCircle, Icons.ShieldCheck];

  return (
    <div className="flex flex-col bg-background">
      <Section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-modern-gradient tech-grid scanlines pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <img src="/media/banners/hero-banner.webp" alt="Sapiente.AI" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,27,0.96),rgba(26,31,46,0.88),rgba(10,138,255,0.45))]" />
        </div>
        <TechBackdrop intensity="strong" />
        <TechParticleField className="opacity-75" />

        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,240,255,0.24),transparent_52%)]" animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <div className="glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.32em] text-[var(--brand-cyan)] sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-cyan-bright)] shadow-[0_0_20px_rgba(0,240,255,0.95)]" />
              {content.hero.label}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mx-auto mt-10 max-w-5xl font-heading text-[clamp(2.75rem,6.4vw,6rem)] font-extrabold leading-[1.02] text-[#F8FCFF] drop-shadow-[0_8px_32px_rgba(0,0,0,0.58)] [text-shadow:0_0_28px_rgba(0,209,255,0.22),0_2px_12px_rgba(5,8,27,0.78)]">{content.hero.title}</h1>
          </Reveal>

          <Reveal delay={190}>
            <p className="mx-auto mt-8 max-w-4xl text-lg font-medium leading-relaxed text-[#F8FCFF]/88 drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] sm:text-xl md:text-2xl">{content.hero.subtitle}</p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
              <PremiumButton onClick={() => setIsContactOpen(true)} size="lg" variant="primary" className="w-full sm:w-auto">
                {content.hero.ctaPrimary}
              </PremiumButton>

              <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="group inline-flex items-center gap-4 rounded-full border border-[var(--brand-primary)]/55 bg-[var(--brand-night)]/45 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-offwhite)]/80 backdrop-blur-xl transition-all duration-500 hover:border-[var(--brand-cyan)] hover:text-[var(--brand-offwhite)] hover:shadow-[0_0_35px_rgba(0,209,255,0.45)]" onClick={() => document.getElementById("core-services")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-cyan)]/60 bg-[var(--brand-cyan)]/20 text-[var(--brand-cyan-bright)] transition-transform duration-500 group-hover:translate-x-1">
                  <Icons.ArrowRight className="h-4 w-4" />
                </span>
                {content.hero.ctaSecondary}
              </motion.button>
            </div>
          </Reveal>
        </div>
      </Section>

      {isPT && (
        <Section className={darkSectionClass.replace("py-24 md:py-36", "py-12")}>
          <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,209,255,0.2),transparent_45%)]" />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {homePT.keywords.map((keyword, i) => {
              const Icon = keywordIcons[i % keywordIcons.length];
              return (
                <Reveal key={keyword} delay={i * 45}>
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25, ease: "easeOut" }} className="group relative min-h-[118px] overflow-hidden rounded-3xl border border-[var(--brand-cyan)]/35 bg-[linear-gradient(145deg,rgba(5,8,27,0.96),rgba(10,24,58,0.92))] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition-all duration-500 hover:border-[var(--brand-cyan)] hover:shadow-[0_24px_70px_rgba(0,209,255,0.28)]">
                    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-cyan),var(--brand-purple))]" />
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--brand-cyan)]/18 blur-3xl transition-all duration-500 group-hover:bg-[var(--brand-cyan)]/32" />
                    <div className="relative z-10 flex h-full items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/45 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] shadow-[0_0_26px_rgba(0,209,255,0.26)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--brand-cyan)] group-hover:text-[#06102A]"><Icon className="h-6 w-6" /></div>
                      <p className="font-heading text-lg font-black leading-tight tracking-tight text-[var(--brand-offwhite)] md:text-xl">{keyword}</p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      <Section id="core-services" className={lightSectionClass}>
        <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />
        <TechBackdrop intensity="soft" className="opacity-75" />
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

      <Section className={darkSectionClass}>
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-20" />
        <SectionHeader><Reveal><SectionTitle label={content.marketingAI.label} title={content.marketingAI.title} description={content.marketingAI.subtitle} variant="light" /></Reveal></SectionHeader>
        <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-7 px-6 lg:grid-cols-3 md:gap-9">
          {content.marketingAI.cards.map((card, i) => {
            const Icon = marketingIcons[i % marketingIcons.length];

            return (
              <Reveal key={card.title} delay={i * 70}>
                <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25, ease: "easeOut" }} className="group relative h-full min-h-[360px] overflow-hidden rounded-3xl border border-[var(--brand-cyan)]/35 bg-[linear-gradient(145deg,rgba(5,8,27,0.96),rgba(10,24,58,0.92))] p-8 shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition-all duration-500 hover:border-[var(--brand-cyan)] hover:shadow-[0_24px_70px_rgba(0,209,255,0.28)] md:p-10">
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-cyan),var(--brand-purple))]" />
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--brand-cyan)]/18 blur-3xl transition-all duration-500 group-hover:bg-[var(--brand-cyan)]/32" />

                  <div className="relative z-10 mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/45 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] shadow-[0_0_26px_rgba(0,209,255,0.26)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--brand-cyan)] group-hover:text-[#06102A]">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="relative z-10 mb-5 font-heading text-3xl font-black leading-tight tracking-tight text-[var(--brand-offwhite)]">{card.title}</h3>

                  <ul className="relative z-10 space-y-4">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[var(--brand-offwhite)]/82">
                        <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-cyan)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className={darkSectionClass}>
        <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />
        <TechBackdrop intensity="soft" />
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

      <Section className={lightSectionClass}>
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-20" />
        <SectionHeader><Reveal><SectionTitle label={content.conversionWebsites.label} title={content.conversionWebsites.title} variant="light" /></Reveal></SectionHeader>
        <div className="relative z-10 mx-auto mt-14 grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.conversionWebsites.items.map((item, i) => { const Icon = conversionIcons[i % conversionIcons.length]; return (
            <Reveal key={item} delay={i * 55}><motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25, ease: "easeOut" }} className="group relative overflow-hidden rounded-3xl border border-primary/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(234,246,255,0.86))] p-5 shadow-[0_18px_45px_rgba(10,17,40,0.1)] transition-all duration-500 hover:border-[var(--brand-cyan)]/70 hover:shadow-[0_22px_60px_rgba(0,209,255,0.22)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-cyan),var(--brand-purple))] opacity-80" /><div className="relative z-10 flex items-center gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/40 bg-[#06102A] text-[var(--brand-cyan)]"><Icon className="h-6 w-6" /></div><p className="font-heading text-base font-black leading-tight tracking-tight text-foreground md:text-lg">{item}</p></div>
            </motion.div></Reveal>
          ); })}
        </div>
      </Section>
      {isPT && (
        <Section className={darkSectionClass}>
          <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />
          <SectionHeader><Reveal><SectionTitle label={homePT.brandPersonality.label} title={homePT.brandPersonality.title} /></Reveal></SectionHeader>
          <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-6 px-6 md:grid-cols-2 xl:grid-cols-5">
            {homePT.brandPersonality.traits.map((trait, i) => { const Icon = brandbookIcons[i % brandbookIcons.length]; return (
              <SectionCard key={trait.title} delay={i * 0.07} variant="subtle" className="rounded-3xl border border-[var(--brand-cyan)]/20 bg-[#071129]/58 p-6 text-[var(--brand-offwhite)] shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--brand-cyan)]/35 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]"><Icon className="h-6 w-6" /></div>
                <h3 className="font-heading text-xl font-extrabold text-[var(--brand-offwhite)]">{trait.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--brand-offwhite)]/75">{trait.description}</p>
              </SectionCard>
            ); })}
          </div>
        </Section>
      )}

      <Section className={ctaSectionClass}>
        <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,209,255,0.22),transparent_45%)]" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal><h2 className="font-heading text-4xl font-black tracking-tight text-[var(--brand-offwhite)] sm:text-6xl md:text-7xl">{content.finalCta.title}</h2></Reveal>
          <Reveal delay={110}><p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-[var(--brand-offwhite)]/78 sm:text-2xl">{content.finalCta.subtitle}</p></Reveal>
          <Reveal delay={220}><motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="mt-12 inline-block"><PremiumButton onClick={() => setIsContactOpen(true)} variant="primary" size="lg">{content.finalCta.button}</PremiumButton></motion.div></Reveal>
        </div>
      </Section>

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
