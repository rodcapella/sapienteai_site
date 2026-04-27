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

export default function Home() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = lang === "en" ? homeEN : homePT;

  const [isContactOpen, setIsContactOpen] = useState(false);

  const coreServiceIcons = [Icons.Target, Icons.Zap, Icons.Brain, Icons.Shield, Icons.BarChart3, Icons.Users];
  const marketingIcons = [Icons.Lightbulb, Icons.Brain, Icons.TrendingUp];
  const automationIcons = [Icons.Zap, Icons.Calendar, Icons.Trophy];
  const conversionIcons = [Icons.User, Icons.Tag, Icons.CheckCircle, Icons.BarChart3, Icons.Target, Icons.Share2];
  const webMobileIcons = [Icons.Lightbulb, Icons.Brain, Icons.TrendingUp];

  return (
    <div className="flex flex-col bg-background">
      <Section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-modern-gradient tech-grid scanlines pt-28 pb-20 md:pt-40 md:pb-28">
        <TechBackdrop intensity="strong" />
        <TechParticleField className="opacity-75" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,212,255,0.26),transparent_48%)]"
          animate={{ opacity: [0.2, 0.42, 0.2] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <div className="glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.32em] text-[#00D4FF] sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.95)]" />
              {content.hero.label}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-10 text-4xl font-black leading-[0.94] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_0_35px_rgba(0,212,255,0.35)]">
              {content.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={190}>
            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-white/85 sm:text-xl md:text-2xl">{content.hero.subtitle}</p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
              <PremiumButton onClick={() => setIsContactOpen(true)} size="lg" variant="primary" className="w-full sm:w-auto">
                {content.hero.ctaPrimary}
              </PremiumButton>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-4 rounded-full border border-[#3B82F6]/55 bg-[#0A1128]/40 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl transition-all duration-500 hover:border-[#00D4FF] hover:text-white hover:shadow-[0_0_35px_rgba(0,212,255,0.45)]"
                onClick={() => {
                  const el = document.getElementById("core-services");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#00D4FF]/60 bg-[#00D4FF]/20 text-[#00D4FF] transition-transform duration-500 group-hover:translate-x-1">
                  <Icons.ArrowRight className="h-4 w-4" />
                </span>
                {content.hero.ctaSecondary}
              </motion.button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="core-services" className="relative overflow-hidden bg-[#050d24] tech-grid py-24 md:py-36">
        <TechBackdrop intensity="soft" className="opacity-75" />
        <div className="pointer-events-none absolute inset-0 dots-matrix opacity-25" />

        <SectionHeader>
          <Reveal>
            <SectionTitle label={content.coreServices.label} title={content.coreServices.title} />
          </Reveal>
        </SectionHeader>

        <div className="relative z-10 mx-auto mt-16 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 xl:grid-cols-3 md:gap-8">
          {content.coreServices.items.map((service, i) => {
            const Icon = coreServiceIcons[i % coreServiceIcons.length];

            return (
              <SectionCard key={service.title} delay={i * 0.07} className="glass-panel cyber-border rounded-3xl p-7 md:p-8 bg-[#071129]/55">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00D4FF]/55 bg-[#00D4FF]/12 text-[#00D4FF] shadow-[0_0_24px_rgba(0,212,255,0.34)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#00D4FF]/24">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-2xl font-black tracking-tight text-white">{service.title}</h3>
                <p className="text-base leading-relaxed text-white/78">{service.description}</p>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-modern-gradient tech-grid scanlines py-24 md:py-36">
        <TechBackdrop intensity="medium" />
        <TechParticleField className="opacity-55" />

        <SectionHeader>
          <Reveal>
            <SectionTitle
              label={content.marketingAI.label}
              title={content.marketingAI.title}
              description={content.marketingAI.subtitle}
            />
          </Reveal>
        </SectionHeader>

        <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-7 px-6 lg:grid-cols-3 md:gap-9">
          {content.marketingAI.cards.map((card, i) => {
            const Icon = marketingIcons[i % marketingIcons.length];

            return (
              <SectionCard key={card.title} delay={i * 0.1} variant="highlight" className="rounded-[2rem] bg-[#06102A]/60 p-8 md:p-10">
                <div className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#3B82F6]/55 bg-[#3B82F6]/15 text-[#22D3EE] shadow-[0_0_26px_rgba(34,211,238,0.32)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#00D4FF]/20">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-4 text-3xl font-black tracking-tight text-white">{card.title}</h3>

                <ul className="space-y-3">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-white/82">
                      <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#22D3EE]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-[#020817] tech-grid py-24 md:py-36">
        <TechBackdrop intensity="soft" />

        <SectionHeader>
          <Reveal>
            <SectionTitle label={content.smartAutomation.label} title={content.smartAutomation.title} />
          </Reveal>
        </SectionHeader>

        <div className="relative z-10 mx-auto mt-16 grid max-w-7xl gap-7 px-6 lg:grid-cols-3 md:gap-9">
          {content.smartAutomation.columns.map((column, i) => {
            const Icon = automationIcons[i % automationIcons.length];

            return (
              <SectionCard key={column.title} delay={i * 0.09} className="rounded-[2rem] bg-[#06102A]/58 p-8 md:p-10">
                <div className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00D4FF]/45 bg-[#00D4FF]/12 text-[#22D3EE] shadow-[0_0_24px_rgba(0,212,255,0.25)]">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-4 text-3xl font-black tracking-tight text-white">{column.title}</h3>

                <ul className="space-y-3">
                  {column.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-white/82">
                      <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#22D3EE]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-modern-gradient tech-grid py-24 md:py-36">
        <TechBackdrop intensity="soft" className="opacity-75" />

        <SectionHeader>
          <Reveal>
            <SectionTitle label={content.conversionWebsites.label} title={content.conversionWebsites.title} />
          </Reveal>
        </SectionHeader>

        <div className="relative z-10 mx-auto mt-14 grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.conversionWebsites.items.map((item, i) => {
            const Icon = conversionIcons[i % conversionIcons.length];

            return (
              <SectionCard key={item} delay={i * 0.05} variant="subtle" className="rounded-3xl bg-[#06102A]/50 p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/12 text-[#22D3EE]">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-lg font-bold text-white/90">{item}</p>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-[#050d24] tech-grid scanlines py-24 md:py-36">
        <TechBackdrop intensity="medium" />
        <TechParticleField className="opacity-45" />

        <SectionHeader>
          <Reveal>
            <SectionTitle label={content.webMobile.label} title={content.webMobile.title} />
          </Reveal>
        </SectionHeader>

        <div className="relative z-10 mx-auto mt-16 grid max-w-7xl gap-7 px-6 lg:grid-cols-3">
          {content.webMobile.pillars.map((pillar, i) => {
            const Icon = webMobileIcons[i % webMobileIcons.length];

            return (
              <SectionCard key={pillar.title} delay={i * 0.1} variant="highlight" className="rounded-[2rem] bg-[#06102A]/62 p-8 md:p-10">
                <div className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#3B82F6]/55 bg-[#3B82F6]/15 text-[#22D3EE] shadow-[0_0_26px_rgba(34,211,238,0.32)]">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-3xl font-black tracking-tight text-white">{pillar.title}</h3>

                <ul className="space-y-3">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-white/82">
                      <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#22D3EE]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-ice py-24 text-center md:py-36 tech-grid">
        <TechBackdrop intensity="soft" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl">{content.finalCta.title}</h2>
          </Reveal>

          <Reveal delay={110}>
            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-foreground/75 sm:text-2xl">{content.finalCta.subtitle}</p>
          </Reveal>

          <Reveal delay={170}>
            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-foreground/85">
              <span className="text-base font-semibold sm:text-lg">{content.finalCta.phone}</span>
              <span className="text-base sm:text-lg">{content.finalCta.website}</span>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="mt-12 inline-block">
              <PremiumButton onClick={() => setIsContactOpen(true)} variant="primary" size="lg" className="neon-button">
                {content.finalCta.button}
              </PremiumButton>
            </motion.div>
          </Reveal>
        </div>
      </Section>

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
