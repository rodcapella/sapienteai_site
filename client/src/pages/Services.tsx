import { useEffect } from "react";
import { useLocation } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { setSEOHead } from "@/components/SEOHead";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

export default function Services(_props: { lang?: string }) {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("services", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.hero.label} - Sapiente.AI`,
      description: content.hero.subtitle,
      url: `https://sapienteai.com/${lang}/services`,
      type: "website",
    });
  }, [content, lang]);

  return (
    <div className="flex flex-col">
      <InternalHero
        label={content.hero.label}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
        image="/media/bg/servicos/bg_Servicos.png"
        imageAlt="Sapiente.AI"
        compact
      />

      <Section className="bg-ice py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <Reveal>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-primary">{content.intro.eyebrow}</p>
              <h2 className="mb-7 text-4xl font-black leading-none text-foreground md:text-7xl">{content.intro.title}</h2>
              <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-foreground/60 md:text-2xl">{content.intro.text}</p>
            </Reveal>
          </div>

          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.services.map((item, index) => (
              <Reveal key={item.value} delay={index * 80}>
                <SectionCard className="h-full border-[var(--brand-purple)]/20 bg-[var(--card)] p-7 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-[var(--brand-purple)]/35">
                  <p className="mb-7 text-sm font-black text-primary/50">{item.value}</p>
                  <h3 className="mb-4 text-2xl font-black leading-tight text-foreground">{item.title}</h3>
                  <p className="text-base font-medium leading-relaxed text-foreground/60">{item.text}</p>
                </SectionCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-blue-tint py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <div>
                <p className="mb-6 inline-flex rounded-full border border-primary/30 px-5 py-2 text-sm font-black uppercase tracking-[0.24em] text-primary">
                  {content.intro.eyebrow}
                </p>
                <h2 className="text-4xl font-black leading-none text-foreground md:text-7xl">{content.process.title}</h2>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {content.process.items.map((item, index) => (
                <Reveal key={item} delay={index * 90}>
                  <div className="flex items-start gap-4 rounded-2xl border border-[var(--brand-purple)]/18 bg-[var(--card)] p-5 shadow-[0_16px_34px_rgba(1,32,80,0.06)]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-[#EAF6FF]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base font-black leading-relaxed text-foreground md:text-lg">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="relative overflow-hidden py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {[content.problem, content.vision].map((block, index) => (
              <Reveal key={block.title} delay={index * 120}>
                <SectionCard className="h-full border-[var(--brand-purple)]/20 bg-[var(--card)] p-8 shadow-2xl md:p-10">
                  <Icons.Zap className="mb-8 h-9 w-9 text-primary" />
                  <h3 className="mb-6 text-3xl font-black leading-tight text-foreground md:text-5xl">{block.title}</h3>
                  <p className="text-lg font-medium leading-relaxed text-foreground/65">{block.text}</p>
                </SectionCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <FinalCTA
        title={content.finalCta.title}
        title_highlight={content.finalCta.highlight}
        description={content.finalCta.description}
        button={content.finalCta.button}
      />
    </div>
  );
}
