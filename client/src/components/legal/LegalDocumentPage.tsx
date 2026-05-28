import { useEffect } from "react";
import { useLocation } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { setSEOHead } from "@/components/SEOHead";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { Icons } from "@/lib/icons";

type LegalContentSection = {
  title: string;
  content: string | string[];
  icon?: React.ComponentType<{ className?: string }>;
};

type LegalContent = {
  label?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  lastUpdated?: string;
  sections: LegalContentSection[];
};

interface LegalDocumentPageProps {
  content: LegalContent;
  slug: string;
  fallbackDescription: string;
}

const fallbackIcons = [
  Icons.ShieldCheck,
  Icons.Scale,
  Icons.Lock,
  Icons.Database,
  Icons.UserCheck,
  Icons.Cpu,
  Icons.History,
  Icons.Mail,
];

function getLegalPageTitle(slug: string, lang: string) {
  const titles: Record<string, Record<string, string>> = {
    terms: { pt: "Termos", en: "Terms" },
    privacy: { pt: "Privacidade", en: "Privacy" },
    trust: { pt: "Confiança", en: "Trust" },
    "generative-ai-policy": { pt: "Política de IA Generativa", en: "Generative AI Policy" },
  };

  return titles[slug]?.[lang === "en" ? "en" : "pt"];
}

function getLegalCta(lang: string) {
  if (lang === "en") {
    return {
      title: "Need help applying this",
      title_highlight: "to your business?",
      description: "Talk to us and understand how we can",
      description_highlight: "structure a clear, secure solution aligned with your goals.",
      button: "Contact",
    };
  }

  return {
    title: "Precisa de ajuda para aplicar isto",
    title_highlight: "ao seu negócio?",
    description: "Fale connosco e perceba como podemos",
    description_highlight: "estruturar uma solução clara, segura e alinhada aos seus objetivos.",
    button: "Contacto",
  };
}

export default function LegalDocumentPage({ content, slug, fallbackDescription }: LegalDocumentPageProps) {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const pageTitle = getLegalPageTitle(slug, lang) || content.title;
  const cta = getLegalCta(lang);
  const statementHeroSlugs = ["terms", "privacy", "generative-ai-policy"];
  const usesStatementHero = statementHeroSlugs.includes(slug);
  const heroLabel = content.label || pageTitle;
  const heroTitle = usesStatementHero ? content.subtitle || content.title : content.title;
  const heroSubtitle = usesStatementHero ? content.lastUpdated || content.title : content.subtitle || content.lastUpdated;

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - Sapiente.AI`,
      description: content.subtitle || fallbackDescription,
      url: `https://sapienteai.com/${lang}/${slug}`,
      type: "website",
    });
  }, [lang, content, slug, fallbackDescription]);

  return (
    <div className="flex flex-col">
      <InternalHero label={heroLabel} title={heroTitle} highlight={content.highlight} subtitle={heroSubtitle} compact />

      <Section className="relative overflow-hidden bg-[#EAF6FF] py-24 text-[#0A1024] md:py-36">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(5,8,22,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(5,8,22,0.65)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,209,255,0.16),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#7861FF,#00D1FF,transparent)]" />

        <div className="relative z-10 container mx-auto px-6">
          <Reveal>
            <SectionCard className="relative mx-auto mb-12 max-w-5xl overflow-hidden rounded-[2rem] border border-[#7861FF]/55 bg-[#001547] p-7 text-center shadow-[0_18px_38px_rgba(1,32,80,0.18),0_0_20px_rgba(10,180,255,0.08)] md:p-9">
              <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(234,246,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(234,246,255,0.35)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7861FF,#00D1FF,#0A84FF)]" />
              <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#00D1FF]">
                  {lang === "pt" ? "Documento legal" : "Legal document"}
                </p>
                <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#EAF6FF]/84 md:text-lg">
                  {content.subtitle || fallbackDescription}
                </p>
              </div>
            </SectionCard>
          </Reveal>

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {content.sections.map((section, idx) => {
              const Icon = section.icon || fallbackIcons[idx % fallbackIcons.length];

              return (
                <Reveal key={`${section.title}-${idx}`} delay={idx * 45}>
                  <SectionCard className="group h-full rounded-[2rem] border border-[#7861FF]/45 bg-[#001547] p-0 shadow-[0_18px_38px_rgba(1,32,80,0.16),0_0_18px_rgba(10,180,255,0.06)] transition-colors duration-300 hover:border-[#00D1FF]/65 hover:shadow-[0_20px_46px_rgba(10,132,255,0.12)]">
                    <div className="relative h-full overflow-hidden rounded-[2rem] p-7 md:p-8">
                      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(234,246,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(234,246,255,0.35)_1px,transparent_1px)] [background-size:30px_30px]" />
                      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7861FF,#00D1FF,#0A84FF)] opacity-90" />
                      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#00D1FF]/10 blur-3xl transition-colors duration-300 group-hover:bg-[#00D1FF]/16" />

                      <div className="relative z-10 flex items-start gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#7861FF]/45 bg-[#050816] text-[#00D1FF] shadow-[0_0_22px_rgba(0,209,255,0.18)]">
                          <Icon className="h-7 w-7" />
                        </div>

                        <div>
                          <h2 className="font-heading text-2xl font-black leading-tight tracking-tight text-[#EAF6FF] md:text-3xl">
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      <div className="relative z-10 mt-7 border-t border-[#7861FF]/35 pt-6 text-base font-medium leading-relaxed text-[#EAF6FF]/84 md:text-lg">
                        {Array.isArray(section.content) ? (
                          <ul className="space-y-4">
                            {section.content.map((item, i) => (
                              <li key={i} className="flex gap-3">
                                <Icons.CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#00D1FF]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>{section.content}</p>
                        )}
                      </div>
                    </div>
                  </SectionCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <QuizCTA />
      <FinalCTA
        title={cta.title}
        title_highlight={cta.title_highlight}
        description={cta.description}
        description_highlight={cta.description_highlight}
        button={cta.button}
      />
    </div>
  );
}
