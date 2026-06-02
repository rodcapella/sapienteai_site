import { useEffect, useMemo, useState, type ComponentType } from "react";
import { useLocation } from "wouter";

import { setSEOHead } from "@/components/SEOHead";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Icons } from "@/lib/icons";
import "@/content/styles/legal.css";

type LegalContentSection = {
  id?: string;
  title: string;
  content: string | string[];
  icon?: ComponentType<{ className?: string }>;
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
    terms: { pt: "Termos de Serviço", en: "Terms of Service" },
    privacy: { pt: "Política de Privacidade", en: "Privacy Policy" },
    trust: { pt: "Confiança e Segurança", en: "Trust & Security" },
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
  const legalCopy = lang === "en" ? { sidebar: "Topics", group: "Document details" } : { sidebar: "Tópicos", group: "Detalhes do documento" };
  const sections = useMemo(
    () =>
      content.sections.map((section, index) => ({
        ...section,
        id: section.id || `section-${index}`,
        Icon: section.icon || fallbackIcons[index % fallbackIcons.length],
      })),
    [content.sections],
  );

  const [openSection, setOpenSection] = useState(sections[0]?.id || "section-0");
  const activeSection = sections.find((section) => section.id === openSection) || sections[0];

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - Sapiente.AI`,
      description: content.subtitle || fallbackDescription,
      url: `https://sapienteai.com/${lang}/${slug}`,
      type: "website",
    });
  }, [lang, content, slug, fallbackDescription]);

  useEffect(() => {
    setOpenSection(sections[0]?.id || "section-0");
  }, [sections]);

  return (
    <div className="legal-page flex flex-col">
      <InternalHero label={heroLabel} title={heroTitle} highlight={content.highlight} subtitle={heroSubtitle} compact />

      <section className="legal-main">
        <div className="legal-main-bg" />
        <div className="legal-inner">
          <Reveal>
            <aside className="legal-sidebar">
              <div className="legal-sidebar-title">{legalCopy.sidebar}</div>
              <div className="legal-cats">
                {sections.map((section, index) => {
                  const isActive = section.id === activeSection?.id;
                  const Icon = section.Icon;

                  return (
                    <button key={section.id} type="button" className={`legal-cat ${isActive ? "active" : ""}`} onClick={() => setOpenSection(section.id)}>
                      <Icon className="h-4 w-4" />
                      <span>{section.title}</span>
                      <span className="legal-cat-count">{index + 1}</span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </Reveal>

          <Reveal delay={80}>
            <div className="legal-content">
              <div className="legal-group-title">{legalCopy.group}</div>
              <div className="legal-list">
                {sections.map((section) => {
                  const isOpen = openSection === section.id;
                  const Icon = section.Icon;

                  return (
                    <div key={section.id} className={`legal-item ${isOpen ? "open" : ""}`}>
                      <button type="button" className="legal-q" onClick={() => setOpenSection(isOpen ? "" : section.id)}>
                        <span className="legal-q-main">
                          <Icon className="legal-q-symbol" />
                          <span className="legal-q-text">{section.title}</span>
                        </span>
                        <span className="legal-q-icon">+</span>
                      </button>
                      <div className="legal-a">
                        <div className="legal-a-inner">
                          {Array.isArray(section.content) ? (
                            <ul>
                              {section.content.map((item, index) => (
                                <li key={index}>
                                  <Icons.CheckCircle className="legal-check" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{section.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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
