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

  const valueIcons = [Icons.Lightbulb, Icons.Trophy, Icons.Handshake, Icons.Target];
  const serviceIcons = [Icons.Brain, Icons.Zap, Icons.BarChart3];

  return (
    <div className="flex flex-col bg-background">
      <Section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-modern-gradient pt-28 pb-20 md:pt-40 md:pb-28">
        <TechBackdrop intensity="strong" />
        <TechParticleField className="opacity-70" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <div className="glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.35em] text-primary sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
              {content.hero.label}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-10 text-4xl font-black leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              {content.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-foreground/70 sm:text-xl md:text-2xl">
              {content.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
              <PremiumButton onClick={() => setIsContactOpen(true)} size="lg" variant="purple" className="w-full sm:w-auto">
                {content.hero.cta1}
              </PremiumButton>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-4 rounded-full border border-[var(--tech-border)] bg-[var(--glass-bg)] px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-foreground/70 backdrop-blur-xl transition-all duration-500 hover:border-primary/60 hover:text-foreground hover:shadow-[var(--shadow-neon-blue)]"
                onClick={() => {
                  const el = document.getElementById("services");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary transition-transform duration-500 group-hover:translate-x-1">
                  <Icons.ArrowRight className="h-4 w-4" />
                </span>
                {content.hero.cta2}
              </motion.button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-blue-tint py-24 md:py-36">
        <TechBackdrop intensity="soft" className="opacity-60" />

        <SectionHeader>
          <Reveal>
            <SectionTitle
              label={content.values.label}
              title={content.values.title}
              className="text-foreground"
            />
          </Reveal>
        </SectionHeader>

        <div className="relative z-10 mx-auto mt-16 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {content.values.items.map((value, i) => {
            const Icon = valueIcons[i];

            return (
              <SectionCard key={value.title} delay={i * 0.08} className="glass-panel cyber-border rounded-3xl p-7 md:p-8">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/35 bg-primary/10 text-primary shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-2xl font-black tracking-tight text-foreground">{value.title}</h3>
                <p className="text-base leading-relaxed text-foreground/70">{value.description}</p>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      <Section id="services" className="relative overflow-hidden bg-modern-gradient py-24 md:py-36">
        <TechBackdrop intensity="medium" />
        <TechParticleField className="opacity-45" />

        <SectionHeader>
          <Reveal>
            <SectionTitle
              label={content.services.label}
              title={content.services.title}
            />
          </Reveal>
        </SectionHeader>

        <div className="relative z-10 mx-auto mt-16 grid max-w-7xl gap-7 px-6 lg:grid-cols-3 md:gap-9">
          {content.services.items.map((service, i) => {
            const Icon = serviceIcons[i];

            return (
              <SectionCard key={service.title} delay={i * 0.1} variant="highlight" className="glass-panel cyber-border rounded-[2rem] p-8 md:p-10">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-purple/40 bg-accent-purple/12 text-accent-purple shadow-[0_0_24px_rgba(168,85,247,0.28)] transition-all duration-500 group-hover:scale-110 group-hover:bg-accent-purple/20">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-4 text-3xl font-black tracking-tight text-foreground">{service.title}</h3>
                <p className="text-lg leading-relaxed text-foreground/75">{service.description}</p>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-ice py-24 text-center md:py-40">
        <TechBackdrop intensity="soft" />

        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {content.cta.title}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-foreground/70 sm:text-2xl">
              {content.cta.description}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-12 inline-block">
              <PremiumButton
                onClick={() => setIsContactOpen(true)}
                variant="purple"
                size="lg"
                className="neon-button"
              >
                {content.cta.button}
              </PremiumButton>
            </motion.div>
          </Reveal>
        </div>
      </Section>

      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </div>
  );
}
