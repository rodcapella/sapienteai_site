import { useLocation } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { Section } from "@/components/ui/section/Section";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { useSEOHead } from "@/hooks/useSEOHead";
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from "@/hooks/useTranslation";

export default function About() {
  const { t, lang } = useTranslation();

  const content = getContent("about", lang);
  const aboutLabel = lang === "pt" ? "Sobre Nós" : t("nav.about");

  useSEOHead(
    {
      title: `${aboutLabel} - SAPIENTE.AI`,
      description: content.hero.title,
      url: `https://sapienteai.com/${lang}/about`,
      type: "website",
    },
    [lang, content, aboutLabel]
  );

  return (
    <div className="flex flex-col">

      {/* HERO */}
      <InternalHero
        label={aboutLabel}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
        image="/media/bg/sobre/bg_Sobre_nos.png"
        imageAlt="Sapiente.AI"
      />

      {/* COMO TRABALHAMOS */}
      <Section
        className="bg-blue-tint py-24 md:py-48 relative overflow-hidden"
        style={{
          backgroundImage:
            lang === "pt"
              ? "url(/media/bg/sobre/pt/bg_Sobre_como_trabalhamos.png)"
              : "url(/media/bg/sobre/en/bg_Sobre_como_trabalhamos_en.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-6">
          <Reveal>
            <h2 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-none">
              {content.proof.title}
            </h2>
          </Reveal>
        </div>
      </Section>

      {/* FOUNDERS INTRO */}
      <Section className="bg-ice py-24 md:py-40 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">

            <Reveal>
              <div
                className="h-full p-7 md:p-9 relative overflow-hidden"
                style={{
                  backgroundImage:
                    lang === "pt"
                      ? "url(/media/bg/sobre/pt/bg_Sobre_Founders.png)"
                      : "url(/media/bg/sobre/en/bg_Sobre_Founders_en.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="relative z-10">
                  <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">
                    {content.founders.intro.eyebrow}
                  </p>

                  <h2 className="mb-8 text-4xl font-black leading-none text-foreground md:text-6xl">
                    {content.founders.intro.title}
                  </h2>

                  <p className="text-xl font-medium leading-relaxed !text-[#00D1FF] md:text-[26px]">
                    {content.founders.intro.text}
                  </p>

                  <div className="mt-10 grid grid-cols-2 gap-4 border-t border-primary/10 pt-8 sm:grid-cols-3">
                    {content.founders.intro.capabilities.map((item: any) => (
                      <div key={`${item.value}-${item.label}`}>
                        <p className="text-3xl font-black text-primary">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-foreground/45">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-7 lg:content-between">
              {content.founders.intro.highlights.map((item: any, index: number) => (
                <Reveal key={item.value} delay={index * 100}>
                  <div className="grid gap-5 p-6 transition duration-500 hover:-translate-y-1 md:grid-cols-[80px_1fr] md:p-8">
                    <div className="text-[2.375rem] font-black leading-none text-[#0057FF]">
                      {item.value}
                    </div>
                    <div>
                      <h3 className="mb-3 text-2xl font-black text-[#0057FF]">
                        {item.title}
                      </h3>
                      <p className="text-base font-medium leading-relaxed text-[#0057FF]/75">
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

      {/* FINAL CTAs */}
      <QuizCTA />

      <FinalCTA
        title={content.founders.cta.title}
        title_highlight={content.founders.cta.title_highlight}
        description={content.founders.cta.description}
        description_highlight={content.founders.cta.description_highlight}
        button={content.founders.cta.button}
        variant="about"
        backgroundSrc="/media/bg/final_CTA_sobre.png"
      />

    </div>
  );
}