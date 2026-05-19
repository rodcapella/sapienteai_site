import { useEffect } from 'react';
import { Link, useLocation } from "wouter";
import { Icons } from "@/lib/icons";

import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { setSEOHead } from '@/components/SEOHead';
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from '@/hooks/useTranslation';

export default function About() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("about", lang);

  useEffect(() => {
    setSEOHead({
      title: `${t('nav.about')} - SAPIENTE.AI`,
      description: content.hero.title,
      url: `https://sapienteai.com/${lang}/about`,
      type: 'website'
    });
  }, [lang, content, t]);

  return (
    <div className="flex flex-col">
      <div className="page-hero-banner relative flex h-[400px] w-full items-center justify-center overflow-hidden md:h-[600px]">
        <div className="container max-w-5xl px-6 text-center">
          <Reveal>
            <h1 className="mb-10 text-4xl font-black leading-[0.9] tracking-tighter text-[var(--brand-offwhite)] md:text-8xl">
              {content.hero.title} <br/>
              <span className="text-[var(--brand-cyan)] drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">{content.hero.highlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl font-black uppercase tracking-[0.2em] text-[var(--brand-offwhite)]/75 drop-shadow-md md:text-3xl">
              {content.hero.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      {/* MANIFESTO - Solid Ice White */}
      <Section className="bg-ice py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <div className="sticky top-28 hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-2xl lg:block">
                <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">
                  SAPIENTE.AI
                </p>
                <div className="grid gap-4">
                  {content.proof.items.map((item: { value: string; title: string }) => (
                    <div key={item.value} className="flex items-center gap-4 rounded-2xl bg-foreground/[0.03] p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                        {item.value}
                      </span>
                      <span className="text-sm font-black tracking-tight text-foreground">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-8">
                {content.manifesto.map((line: string, i: number) => (
                  <p key={i} className={`text-2xl md:text-5xl font-black tracking-tight leading-tight ${line === "" ? "h-8" : "text-foreground"}`}>
                    {line}
                  </p>
                ))}

                <Link
                  href={`/${lang}/team`}
                  className="inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-1 hover:bg-primary hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                >
                  {content.teamCta.link}
                  <Icons.ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* PROOF - Commercial Method */}
      <Section className="bg-white py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <Reveal>
              <div>
                <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">
                  {content.proof.eyebrow}
                </p>
                <h2 className="mb-8 text-4xl font-black leading-none tracking-tighter text-foreground md:text-7xl">
                  {content.proof.title}
                </h2>
                <p className="text-lg font-medium leading-relaxed text-foreground/60 md:text-2xl">
                  {content.proof.text}
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5">
              {content.proof.items.map((item: { value: string; title: string; text: string }, i: number) => (
                <Reveal key={item.value} delay={i * 100}>
                  <div className="grid gap-5 rounded-[1.5rem] border border-foreground/5 bg-ice p-6 shadow-[0_18px_50px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:border-primary/20 md:grid-cols-[96px_1fr] md:p-8">
                    <div className="text-5xl font-black leading-none tracking-tighter text-primary/30">
                      {item.value}
                    </div>
                    <div>
                      <h3 className="mb-3 text-2xl font-black tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-base font-medium leading-relaxed text-foreground/60">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SHIFT - Blue Tint Solid */}
      <Section className="bg-blue-tint py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-7xl font-black mb-20 text-foreground tracking-tighter leading-none">
                {content.shift.title}
              </h2>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {content.shift.items.map((item: string, i: number) => (
                <Reveal key={i} delay={i * 100}>
                  <SectionCard className="min-h-[220px] bg-white border-foreground/5 p-7 shadow-xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-700">
                    <p className="mb-8 text-sm font-black text-primary/50">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-xl font-black text-foreground tracking-tight leading-tight">
                      {item.split(' → ').map((part, idx) => (
                        <span key={idx} className={idx === 1 ? "text-primary block mt-3" : "text-foreground/40 block"}>
                          {idx === 1 ? `→ ${part}` : part}
                        </span>
                      ))}
                    </p>
                  </SectionCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PROBLEM & VISION - Modern Gradient */}
      <Section className="bg-modern-gradient py-24 md:py-48 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-neon-purple/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="space-y-10">
                <h3 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-none">
                  {content.problem.title}
                </h3>
                <p className="text-xl md:text-2xl text-foreground/60 font-medium leading-relaxed">
                  {content.problem.text}
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <SectionCard className="bg-white p-12 md:p-16 shadow-2xl border-primary/10 relative group">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-2xl rotate-[-12deg] group-hover:rotate-0 transition-all duration-500">
                  <Icons.Zap className="text-white w-10 h-10" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none mb-10">
                  {content.vision.title}
                </h3>
                <p className="text-xl md:text-2xl text-foreground/70 font-medium leading-relaxed">
                  {content.vision.text}
                </p>
              </SectionCard>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* TEAM CTA */}
      <Section className="bg-foreground py-24 md:py-40">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-[var(--brand-cyan)]">
                  {content.teamCta.eyebrow}
                </p>
                <h2 className="mb-6 max-w-3xl text-4xl font-black leading-none tracking-tighter text-white md:text-7xl">
                  {content.teamCta.title}
                </h2>
                <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/60 md:text-2xl">
                  {content.teamCta.text}
                </p>
              </div>

              <Link
                href={`/${lang}/team`}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--brand-cyan)] px-8 py-5 text-sm font-black uppercase tracking-[0.18em] text-foreground transition hover:-translate-y-1 hover:bg-white"
              >
                {content.teamCta.link}
                <Icons.Users className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SYMBOL - Solid Ice White */}
      <Section className="bg-ice py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h3 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-none mb-16">
                {content.logo.title}
              </h3>
            </Reveal>

            <div className="space-y-6">
              {content.logo.text.map((line: string, i: number) => (
                <Reveal key={i} delay={i * 50}>
                  <p className={`text-xl md:text-3xl font-bold tracking-tight ${line === "" ? "h-8" : "text-foreground/50"}`}>
                    {line}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <div className="mt-24 pt-24 border-t border-foreground/5">
                <p className="text-5xl md:text-9xl font-black text-primary tracking-tighter opacity-10 uppercase select-none">
                  {content.closing}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
