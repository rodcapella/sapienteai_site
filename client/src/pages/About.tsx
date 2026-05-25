import { useEffect } from 'react';
import { useLocation } from "wouter";
import { Icons } from "@/lib/icons";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { InternalHero } from "@/components/ui/hero/InternalHero";
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
      <InternalHero
        label={t("nav.about")}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
      />

      <Section className="bg-ice py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <div className="sticky top-28 hidden rounded-[2rem] border border-foreground/5 bg-[#EAF6FF] p-8 shadow-2xl lg:block">
                <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">SAPIENTE.AI</p>
                <div className="grid gap-4">
                  {content.proof.items.map((item: { value: string; title: string }) => (
                    <div key={item.value} className="flex items-center gap-4 rounded-2xl bg-foreground/[0.03] p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-[#EAF6FF]">{item.value}</span>
                      <span className="text-sm font-black tracking-tight text-foreground">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-8">
                {content.manifesto.map((line: string, i: number) => (
                  <p key={i} className={`text-2xl md:text-5xl font-black tracking-tight leading-tight ${line === "" ? "h-8" : "text-foreground"}`}>{line}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-[#EAF6FF] py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <Reveal>
              <div>
                <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">{content.proof.eyebrow}</p>
                <h2 className="mb-8 text-4xl font-black leading-none tracking-tighter text-foreground md:text-7xl">{content.proof.title}</h2>
                <p className="text-lg font-medium leading-relaxed text-foreground/60 md:text-2xl">{content.proof.text}</p>
              </div>
            </Reveal>

            <div className="grid gap-5">
              {content.proof.items.map((item: { value: string; title: string; text: string }, i: number) => (
                <Reveal key={item.value} delay={i * 100}>
                  <div className="grid gap-5 rounded-[1.5rem] border border-foreground/5 bg-ice p-6 shadow-[0_18px_50px_rgba(5,8,22,0.04)] transition hover:-translate-y-1 hover:border-primary/20 md:grid-cols-[96px_1fr] md:p-8">
                    <div className="text-5xl font-black leading-none tracking-tighter text-primary/30">{item.value}</div>
                    <div>
                      <h3 className="mb-3 text-2xl font-black tracking-tight text-foreground">{item.title}</h3>
                      <p className="text-base font-medium leading-relaxed text-foreground/60">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-blue-tint py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal><h2 className="text-4xl md:text-7xl font-black mb-20 text-foreground tracking-tighter leading-none">{content.shift.title}</h2></Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {content.shift.items.map((item: string, i: number) => (
                <Reveal key={i} delay={i * 100}>
                  <SectionCard className="min-h-[220px] bg-[#EAF6FF] border-foreground/5 p-7 shadow-xl hover:shadow-[0_20px_60px_rgba(5,8,22,0.1)] transition-all duration-700">
                    <p className="mb-8 text-sm font-black text-primary/50">{String(i + 1).padStart(2, "0")}</p>
                    <p className="text-xl font-black text-foreground tracking-tight leading-tight">
                      {item.split(' → ').map((part, idx) => (
                        <span key={idx} className={idx === 1 ? "text-primary block mt-3" : "text-foreground/40 block"}>{idx === 1 ? `→ ${part}` : part}</span>
                      ))}
                    </p>
                  </SectionCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-24 md:py-48 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#0A84FF]/5 blur-[120px] rounded-full -z-10"></div>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="space-y-10">
                <h3 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-none">{content.problem.title}</h3>
                <p className="text-xl md:text-2xl text-foreground/60 font-medium leading-relaxed">{content.problem.text}</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <SectionCard className="bg-[#EAF6FF] p-12 md:p-16 shadow-2xl border-primary/10 relative group">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-2xl rotate-[-12deg] group-hover:rotate-0 transition-all duration-500">
                  <Icons.Zap className="text-[#EAF6FF] w-10 h-10" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none mb-10">{content.vision.title}</h3>
                <p className="text-xl md:text-2xl text-foreground/70 font-medium leading-relaxed">{content.vision.text}</p>
              </SectionCard>
            </Reveal>
          </div>
        </div>
      </Section>

      <FinalCTA
        title={content.teamCta.title}
        title_highlight={content.teamCta.highlight}
        description={content.teamCta.text}
        button={content.teamCta.link}
        href={`/${lang}/team`}
      />
    </div>
  );
}
