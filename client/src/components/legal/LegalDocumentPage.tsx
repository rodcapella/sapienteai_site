import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

import ContactModal from "@/components/ContactModal";
import { setSEOHead } from "@/components/SEOHead";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { useTranslation } from "@/hooks/useTranslation";
import { Icons } from "@/lib/icons";

type LegalContentSection = {
  title: string;
  content: string | string[];
  icon?: React.ComponentType<{ className?: string }>;
};

type LegalContent = {
  title: string;
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
    rgpd: { pt: "RGPD", en: "GDPR" },
    "generative-ai-policy": { pt: "Política de IA Generativa", en: "Generative AI Policy" },
  };

  return titles[slug]?.[lang === "en" ? "en" : "pt"];
}

export default function LegalDocumentPage({ content, slug, fallbackDescription }: LegalDocumentPageProps) {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";
  const pageTitle = getLegalPageTitle(slug, lang) || content.title;
  const [isContactOpen, setIsContactOpen] = useState(false);

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
      <InternalHero label={lang === "pt" ? "Documento legal" : "Legal document"} title={pageTitle} subtitle={content.subtitle || content.lastUpdated} compact />

      <Section className="relative overflow-hidden bg-[#EAF6FF] py-24 text-[#0A1024] md:py-36">
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,209,255,0.16),transparent_42%)]" />

        <div className="relative z-10 container mx-auto px-6">
          <Reveal>
            <SectionCard className="mx-auto mb-12 max-w-5xl rounded-[2rem] border border-[#0A8AFF]/20 bg-white/78 p-7 text-center shadow-[0_22px_60px_rgba(10,17,40,0.12)] backdrop-blur-2xl md:p-9">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--brand-primary)]">
                {lang === "pt" ? "Documento legal" : "Legal document"}
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#0A1024]/72 md:text-lg">
                {content.subtitle || fallbackDescription}
              </p>
            </SectionCard>
          </Reveal>

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {content.sections.map((section, idx) => {
              const Icon = section.icon || fallbackIcons[idx % fallbackIcons.length];

              return (
                <Reveal key={`${section.title}-${idx}`} delay={idx * 45}>
                  <SectionCard className="group h-full rounded-[2rem] border border-[#0A8AFF]/18 bg-white/88 p-0 shadow-[0_18px_45px_rgba(10,17,40,0.1)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[var(--brand-cyan)]/60 hover:shadow-[0_24px_70px_rgba(0,209,255,0.18)]">
                    <div className="relative h-full overflow-hidden rounded-[2rem] p-7 md:p-8">
                      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-cyan),var(--brand-purple))] opacity-75" />
                      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[var(--brand-cyan)]/10 blur-3xl transition-all duration-500 group-hover:bg-[var(--brand-cyan)]/22" />

                      <div className="relative z-10 flex items-start gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/35 bg-[#06102A] text-[var(--brand-cyan)] shadow-[0_0_24px_rgba(0,209,255,0.22)]">
                          <Icon className="h-7 w-7" />
                        </div>

                        <div>
                          <h2 className="font-heading text-2xl font-black leading-tight tracking-tight text-[#0A1024] md:text-3xl">
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      <div className="relative z-10 mt-7 border-t border-[#0A8AFF]/14 pt-6 text-base font-medium leading-relaxed text-[#0A4F8F] md:text-lg">
                        {Array.isArray(section.content) ? (
                          <ul className="space-y-4">
                            {section.content.map((item, i) => (
                              <li key={i} className="flex gap-3">
                                <Icons.CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-primary)]" />
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

      <Section className="relative overflow-hidden bg-[linear-gradient(135deg,#05081B_0%,#06102A_44%,#0A2F66_72%,#7B81FF_100%)] py-24 text-center md:py-36 tech-grid">
        <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,209,255,0.22),transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="font-heading text-4xl font-black tracking-tight text-[var(--brand-offwhite)] sm:text-6xl md:text-7xl">
              {lang === "pt" ? "Precisa de ajuda para aplicar isto ao seu negócio?" : "Need help applying this to your business?"}
            </h2>
          </Reveal>

          <Reveal delay={110}>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[var(--brand-offwhite)]/78 sm:text-2xl">
              {lang === "pt"
                ? "Fale connosco e perceba como podemos estruturar uma solução clara, segura e alinhada aos seus objetivos."
                : "Talk to us and understand how we can structure a clear, secure solution aligned with your goals."}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-12 inline-block">
              <PremiumButton onClick={() => setIsContactOpen(true)} variant="primary" size="lg">
                {lang === "pt" ? "Contacto" : "Contact"}
              </PremiumButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
