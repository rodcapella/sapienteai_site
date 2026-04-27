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
  "border-[#0A8AFF]/55",
  "border-[#7B81FF]/55",
  "border-[#00F0FF]/55",
];

export default function Home() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const isPT = lang === "pt";
  const content = isPT ? homePT : homeEN;

  const [isContactOpen, setIsContactOpen] = useState(false);

  const coreServiceIcons = [Icons.Bot, Icons.Cog, Icons.Cpu, Icons.ShieldCheck, Icons.BarChart3, Icons.MessageCircle];
  const marketingIcons = [Icons.Target, Icons.Brain, Icons.BarChart3];
  const automationIcons = [Icons.Zap, Icons.Calendar, Icons.TrendingUp];
  const conversionIcons = [Icons.User, Icons.Tag, Icons.CheckCircle, Icons.BarChart3, Icons.Target, Icons.Share2];
  const webMobileIcons = [Icons.Lightbulb, Icons.Cpu, Icons.TrendingUp];
  const brandbookIcons = [Icons.Bot, Icons.Brain, Icons.TrendingUp, Icons.PieChart, Icons.Cog, Icons.MessageCircle, Icons.ShieldCheck];

  return (
    <div className="flex flex-col bg-background">
      <Section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-modern-gradient tech-grid scanlines pt-28 pb-20 md:pt-40 md:pb-28">
        {isPT && (
          <div className="absolute inset-0">
            <img src="/brandbook/moodboard-main.jpeg" alt="Moodboard Sapiente.AI" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,27,0.96),rgba(26,31,46,0.88),rgba(10,138,255,0.45))]" />
          </div>
        )}
        <TechBackdrop intensity="strong" />
        <TechParticleField className="opacity-75" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,240,255,0.24),transparent_52%)]"
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <div className="glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.32em] text-[var(--brand-cyan)] sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-cyan-bright)] shadow-[0_0_20px_rgba(0,240,255,0.95)]" />
              {content.hero.label}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-10 font-heading text-4xl font-extrabold leading-[0.95] tracking-tight text-[var(--brand-offwhite)] sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_0_35px_rgba(0,240,255,0.25)]">
              {content.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={190}>
            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-[var(--brand-offwhite)]/85 sm:text-xl md:text-2xl">{content.hero.subtitle}</p>
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
                className="group inline-flex items-center gap-4 rounded-full border border-[var(--brand-primary)]/55 bg-[var(--brand-night)]/45 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-offwhite)]/80 backdrop-blur-xl transition-all duration-500 hover:border-[var(--brand-cyan)] hover:text-[var(--brand-offwhite)] hover:shadow-[0_0_35px_rgba(0,209,255,0.45)]"
                onClick={() => {
                  const el = document.getElementById("core-services");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
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
        <Section className="relative overflow-hidden border-y border-[var(--tech-border)] bg-[#060B1E] py-8">
          <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6">
            {homePT.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-[var(--brand-cyan)]/30 bg-[var(--brand-night)]/60 px-4 py-2 text-xs font-black tracking-[0.18em] text-[var(--brand-offwhite)]/85"
              >
                {keyword}
              </span>
            ))}
          </div>
        </Section>
      )}

      {isPT && (
        <Section className="relative overflow-hidden bg-[#05081B] tech-grid py-24 md:py-32">
          <TechBackdrop intensity="soft" />
          <SectionHeader>
            <Reveal>
              <SectionTitle label={homePT.brandPillars.label} title={homePT.brandPillars.title} />
            </Reveal>
          </SectionHeader>

          <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-6 px-6 md:grid-cols-2">
            {homePT.brandPillars.items.map((pillar, i) => (
              <SectionCard key={pillar.title} delay={i * 0.08} className={`rounded-[2rem] border bg-[#070D24]/70 p-0 ${pillarBorder[i % pillarBorder.length]}`}>
                <div className="relative h-56 w-full overflow-hidden rounded-t-[2rem]">
                  <img src={pillar.image} alt={pillar.title} className="h-full w-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05081B] via-[#05081B]/35 to-transparent" />
                </div>

                <div className="p-7 md:p-8">
                  <h3 className="font-heading text-2xl font-black tracking-tight text-[var(--brand-offwhite)]">{pillar.title}</h3>
                  <p className="mt-3 text-[var(--brand-offwhite)]/76">{pillar.description}</p>
                </div>
              </SectionCard>
            ))}
          </div>
        </Section>
      )}

      <Section id="core-services" className="relative overflow-hidden bg-[#05081B] tech-grid py-24 md:py-36">
        {isPT && <img src="/brandbook/solucoes-completas.jpeg" alt="Soluções Sapiente" className="absolute inset-0 h-full w-full object-cover opacity-18" />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,27,0.9),rgba(5,8,27,0.92),rgba(26,31,46,0.94))]" />
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
              <SectionCard key={service.title} delay={i * 0.07} className="glass-panel cyber-border rounded-3xl bg-[#071129]/58 p-7 md:p-8">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/55 bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)] shadow-[0_0_24px_rgba(0,209,255,0.34)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--brand-cyan)]/24">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 font-heading text-2xl font-black tracking-tight text-[var(--brand-offwhite)]">{service.title}</h3>
                <p className="text-base leading-relaxed text-[var(--brand-offwhite)]/78">{service.description}</p>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-modern-gradient tech-grid scanlines py-24 md:py-36">
        {isPT && <img src="/brandbook/marketing-ia.jpeg" alt="Marketing IA" className="absolute inset-0 h-full w-full object-cover opacity-18" />}
        <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(5,8,27,0.92),rgba(26,31,46,0.85),rgba(10,138,255,0.28))]" />
        <TechBackdrop intensity="medium" />
        <TechParticleField className="opacity-55" />

        <SectionHeader>
          <Reveal>
            <SectionTitle label={content.marketingAI.label} title={content.marketingAI.title} description={content.marketingAI.subtitle} />
          </Reveal>
        </SectionHeader>

        <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-7 px-6 lg:grid-cols-3 md:gap-9">
          {content.marketingAI.cards.map((card, i) => {
            const Icon = marketingIcons[i % marketingIcons.length];

            return (
              <SectionCard key={card.title} delay={i * 0.1} variant="highlight" className="rounded-[2rem] bg-[#06102A]/60 p-8 md:p-10">
                <div className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--brand-primary)]/55 bg-[var(--brand-primary)]/15 text-[var(--brand-cyan)] shadow-[0_0_26px_rgba(0,209,255,0.32)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--brand-cyan)]/20">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-4 font-heading text-3xl font-black tracking-tight text-[var(--brand-offwhite)]">{card.title}</h3>

                <ul className="space-y-3">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[var(--brand-offwhite)]/82">
                      <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-cyan)]" />
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
        {isPT && <img src="/brandbook/automacao-inteligente.jpeg" alt="Automação inteligente" className="absolute inset-0 h-full w-full object-cover opacity-16" />}
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(5,8,27,0.94),rgba(26,31,46,0.86))]" />
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
                <div className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/45 bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)] shadow-[0_0_24px_rgba(0,209,255,0.25)]">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-4 font-heading text-3xl font-black tracking-tight text-[var(--brand-offwhite)]">{column.title}</h3>

                <ul className="space-y-3">
                  {column.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[var(--brand-offwhite)]/82">
                      <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-cyan)]" />
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
        {isPT && <img src="/brandbook/websites-convertem.jpeg" alt="Websites que convertem" className="absolute inset-0 h-full w-full object-cover opacity-14" />}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(5,8,27,0.92),rgba(26,31,46,0.84),rgba(123,129,255,0.18))]" />
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
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--brand-cyan)]/45 bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)]">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-lg font-bold text-[var(--brand-offwhite)]/90">{item}</p>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-[#050d24] tech-grid scanlines py-24 md:py-36">
        {isPT && <img src="/brandbook/web-mobile.jpeg" alt="Desenvolvimento Web e Mobile" className="absolute inset-0 h-full w-full object-cover opacity-15" />}
        <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(5,8,27,0.92),rgba(10,138,255,0.2),rgba(26,31,46,0.9))]" />
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
                <div className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--brand-primary)]/55 bg-[var(--brand-primary)]/15 text-[var(--brand-cyan)] shadow-[0_0_26px_rgba(0,209,255,0.32)]">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-heading text-3xl font-black tracking-tight text-[var(--brand-offwhite)]">{pillar.title}</h3>

                <ul className="space-y-3">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[var(--brand-offwhite)]/82">
                      <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-cyan)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      {isPT && (
        <Section className="relative overflow-hidden bg-[#05081B] tech-grid py-24 md:py-32">
          <TechBackdrop intensity="soft" className="opacity-85" />
          <SectionHeader>
            <Reveal>
              <SectionTitle label={homePT.brandPersonality.label} title={homePT.brandPersonality.title} />
            </Reveal>
          </SectionHeader>

          <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-6 px-6 md:grid-cols-2 xl:grid-cols-5">
            {homePT.brandPersonality.traits.map((trait, i) => {
              const Icon = brandbookIcons[i % brandbookIcons.length];

              return (
                <SectionCard key={trait.title} delay={i * 0.07} variant="subtle" className="rounded-3xl bg-[#071129]/62 p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--brand-cyan)]/45 bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-[var(--brand-offwhite)]">{trait.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--brand-offwhite)]/75">{trait.description}</p>
                </SectionCard>
              );
            })}
          </div>
        </Section>
      )}

      {isPT && (
        <Section className="relative overflow-hidden bg-[#060B1E] tech-grid py-24 md:py-32">
          <TechBackdrop intensity="soft" />
          <SectionHeader>
            <Reveal>
              <SectionTitle label={homePT.applications.label} title={homePT.applications.title} />
            </Reveal>
          </SectionHeader>

          <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
            {homePT.applications.items.map((application, i) => (
              <SectionCard key={application.title} delay={i * 0.06} className="rounded-[1.8rem] border border-[var(--brand-primary)]/30 bg-[#071129]/60 p-0">
                <div className="relative h-52 overflow-hidden rounded-t-[1.8rem]">
                  <img src={application.image} alt={application.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05081B] via-[#05081B]/20 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="font-heading text-xl font-bold text-[var(--brand-offwhite)]">{application.title}</p>
                </div>
              </SectionCard>
            ))}
          </div>
        </Section>
      )}

      <Section className="relative overflow-hidden bg-ice py-24 text-center md:py-36 tech-grid">
        <TechBackdrop intensity="soft" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="font-heading text-4xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl">{content.finalCta.title}</h2>
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
