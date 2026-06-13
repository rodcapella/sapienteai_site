import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";

import { useTranslation } from "@/hooks/useTranslation";
import { useSEOHead } from "@/hooks/useSEOHead";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { CheckCircle, Cpu, Database, History, Lock, Mail, Scale, ShieldCheck, UserCheck } from "@/lib/icons";
import "@/styles/faq_legal.css";

type LegalContentSection = {
  id?: string;
  navLabel?: string;
  title: string;
  content: ReactNode | string | string[];
  icon?: ComponentType<{ className?: string }>;
};

type LegalCta = {
  title: string;
  highlight?: string;
  title_highlight?: string;
  description: string;
  description_highlight?: string;
  button: string;
};

type LegalContent = {
  label?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  lastUpdated?: string;
  sections: LegalContentSection[];
  sidebarTitle?: string;
  groupTitle?: string;
  cta?: LegalCta;
};

interface LegalDocumentPageProps {
  content: LegalContent;
  slug: string;
  fallbackDescription: string;
  showQuizCTA?: boolean;
}

/** Remove leading "1. ", "2. " ... from section titles for display */
const stripNumber = (s: string) => s.replace(/^\d+\.\s*/, "");

const fallbackIcons = [
  ShieldCheck,
  Scale,
  Lock,
  Database,
  UserCheck,
  Cpu,
  History,
  Mail,
];

function renderHeroSubtitle(text?: string, lastUpdated?: string) {
  const cleanText = text?.trim();
  const cleanLastUpdated = lastUpdated?.trim();

  if (!cleanText && !cleanLastUpdated) return undefined;

  return (
    <>
      {cleanText && <span>{cleanText}</span>}
      {cleanText && cleanLastUpdated && <br />}
      {cleanLastUpdated && (
        <span style={{ fontSize: "calc(1em - 2px)", lineHeight: "inherit" }}>
          {cleanLastUpdated}
        </span>
      )}
    </>
  );
}

function getLegalPageTitle(slug: string, lang: string) {
  const titles: Record<string, Record<string, string>> = {
    terms: { pt: "Termos de Serviço", en: "Terms of Service" },
    privacy: { pt: "Política de Privacidade", en: "Privacy Policy" },
    trust: { pt: "Confiança e Segurança", en: "Trust & Security" },
    "generative-ai-policy": { pt: "Política de IA Generativa", en: "Generative AI Policy" },
    cookies: { pt: "Política de Cookies", en: "Cookie Policy" },
  };

  return titles[slug]?.[lang === "en" ? "en" : "pt"];
}

function getLegalCta(lang: string): LegalCta {
  if (lang === "en") {
    return {
      title: "Need help applying this",
      title_highlight: "to your business?",
      description: "Talk to us and understand how we can",
      description_highlight: "structure a clear, secure solution aligned with your goals.",
      button: "Get in Touch",
    };
  }

  return {
    title: "Precisa de ajuda para aplicar isto",
    title_highlight: "ao seu negócio?",
    description: "Fale connosco e perceba como podemos",
    description_highlight: "estruturar uma solução clara, segura e alinhada aos seus objetivos.",
    button: "Falar Connosco",
  };
}

export default function LegalDocumentPage({
  content,
  slug,
  fallbackDescription,
  showQuizCTA = true,
}: LegalDocumentPageProps) {
  const { lang } = useTranslation();
  const pageTitle = getLegalPageTitle(slug, lang) || content.title;
  const cta = content.cta || getLegalCta(lang);
  const statementHeroSlugs = ["terms", "privacy", "generative-ai-policy", "trust"];
  const usesStatementHero = statementHeroSlugs.includes(slug);
  const heroLabel = content.label || pageTitle;
  const heroTitle = usesStatementHero ? content.subtitle || content.title : content.title;
  const heroSubtitle = usesStatementHero
    ? renderHeroSubtitle(undefined, content.lastUpdated || content.title)
    : renderHeroSubtitle(content.subtitle, content.lastUpdated);
  const defaultLegalCopy = lang === "en"
    ? { sidebar: "Topics", group: "Document details" }
    : { sidebar: "Tópicos", group: "Detalhes do documento" };
  const legalCopy = {
    sidebar: content.sidebarTitle || defaultLegalCopy.sidebar,
    group: content.groupTitle || defaultLegalCopy.group,
  };
  const sections = useMemo(
    () =>
      content.sections.map((section, index) => ({
        ...section,
        id: section.id || `section-${index}`,
        Icon: section.icon || fallbackIcons[index % fallbackIcons.length],
      })),
    [content.sections],
  );

  const [openSection, setOpenSection] = useState("");
  const activeSection = sections.find((section) => section.id === openSection) || sections[0];

  useSEOHead({
    title: `${content.title} - Sapiente.AI`,
    description: content.subtitle || fallbackDescription,
    url: `https://www.sapienteai.com/${lang}/${slug}`,
    type: "website",
  }, [lang, content, slug, fallbackDescription]);

  useEffect(() => {
    setOpenSection("");
  }, [sections]);

  return (
    <div className="legal-page flex flex-col">
      <InternalHero
        label={heroLabel}
        title={heroTitle}
        highlight={content.highlight}
        subtitle={heroSubtitle}
        image="/media/bg/bg_LegalPages.webp"
        imageAlt="Sapiente.AI Legal"
        compact
      />

      <section className="legal-main">
        <div className="legal-inner">

          {/* Sidebar de tópicos */}
          <aside className="legal-sidebar">
            <div className="legal-sidebar-label">{legalCopy.sidebar}</div>
            <div className="legal-cats">
              {sections.map((section) => {
                const isActive = section.id === activeSection?.id;
                const Icon = section.Icon;

                return (
                  <button key={section.id} type="button" className={`legal-cat ${isActive ? "active" : ""}`} onClick={() => setOpenSection(section.id)}>
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{section.navLabel || stripNumber(section.title)}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Conteúdo das secções */}
          <Reveal delay={80}>
            <div className="legal-content">
              <div className="legal-group-title">{legalCopy.group}</div>
              <div className="legal-document-card legal-document-card--list">
                <div className="legal-list">
                  {sections.map((section) => {
                    const isOpen = openSection === section.id;
                    const Icon = section.Icon;

                    return (
                      <div key={section.id} className={`legal-item ${isOpen ? "open" : ""}`}>
                        <button type="button" className="legal-q" onClick={() => setOpenSection(isOpen ? "" : section.id)}>
                          <span className="legal-q-main">
                            <Icon className="legal-q-symbol" />
                            <span className="legal-q-text">{stripNumber(section.title)}</span>
                          </span>
                          <span className="legal-q-icon" aria-hidden="true">{isOpen ? "-" : "+"}</span>
                        </button>
                        <div className="legal-a">
                          <div className="legal-a-inner">
                            {Array.isArray(section.content) ? (
                              <ul>
                                {section.content.map((item, index) => (
                                  <li key={index}>
                                    <CheckCircle className="legal-check" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : typeof section.content === "string" ? (
                              <p>{section.content}</p>
                            ) : (
                              section.content
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {showQuizCTA && <QuizCTA />}
      <FinalCTA
        title={cta.title}
        title_highlight={cta.title_highlight || cta.highlight}
        description={cta.description}
        description_highlight={cta.description_highlight}
        button={cta.button}
        backgroundSrc="/media/bg/finalCTA/bg_finalCTA.webp"
      />
    </div>
  );
}
