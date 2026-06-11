import { useEffect, useMemo, useState } from "react";

import { FAQContactCTA, type FAQCategory, type FAQItem } from "@/components/faq/FAQBlocks";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { generateFAQSchema } from "@/lib/faqSchema";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { BarChart3, Cpu, Database, Globe, HelpCircle, MessageCircle } from "@/lib/icons";
import "@/styles/faq_legal.css";

function createFAQCategories(items: FAQItem[], lang: string): FAQCategory[] {
  const labels =
    lang === "en"
      ? {
          general: "General",
          content: "Marketing & content",
          websites: "Websites & SEO",
          automation: "AI & Automation",
          data: "BI & Data",
          business: "Investment & support",
        }
      : {
          general: "Geral",
          content: "Marketing e conteúdos",
          websites: "Websites & SEO",
          automation: "IA e Automação",
          data: "BI & Dados",
          business: "Investimento e suporte",
        };

  return [
    { id: "general",    label: labels.general,    icon: HelpCircle,    items: items.slice(0, 8) },
    { id: "content",    label: labels.content,    icon: MessageCircle, items: items.slice(8, 17) },
    { id: "websites",   label: labels.websites,   icon: Globe,         items: items.slice(17, 24) },
    { id: "automation", label: labels.automation, icon: Cpu,           items: items.slice(24, 31) },
    { id: "data",       label: labels.data,       icon: Database,      items: items.slice(35) },
    { id: "business",   label: labels.business,   icon: BarChart3,     items: items.slice(31, 35) },
  ].filter((category) => category.items.length > 0);
}

function getFAQCopy(lang: string) {
  return lang === "en"
    ? {
        label: "Frequently Asked Questions",
        title: "Have questions?",
        highlight: "We have answers.",
        subtitle: "We gathered the most common questions about how we work, what we deliver and how\nSapiente.AI creates business impact with AI, automation and digital strategy.",
        sidebar: "Categories",
      }
    : {
        label: "Perguntas frequentes",
        title: "Tem dúvidas?",
        highlight: "Temos respostas.",
        subtitle: "Reunimos as perguntas mais comuns sobre como trabalhamos, o que entregamos e como\na Sapiente.AI ajuda negócios a crescer com IA, automação e estratégia digital.",
        sidebar: "Categorias",
      };
}

export default function FAQ() {
  const { lang } = useTranslation();
  const normalizedLang = lang === "en" ? "en" : "pt";
  const content = getContent("faq", lang);
  const pageCopy = getFAQCopy(normalizedLang);
  const categories = useMemo(() => createFAQCategories(content.items, normalizedLang), [content.items, normalizedLang]);

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "general");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const active = categories.find((category) => category.id === activeCategory) || categories[0];

  useSEOHead({
    title: `${content.title} - Sapiente.AI`,
    description: content.subtitle,
    url: `https://www.sapienteai.com/${lang}/faq`,
    type: "website",
  }, [lang, content]);

  useEffect(() => {
    // Schema completo (todas as perguntas) — crawlers que executam JS
    const existing = document.getElementById("faq-schema");
    if (existing) existing.remove();

    const schema = generateFAQSchema(content.items);
    const script = document.createElement("script");
    script.id = "faq-schema";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    // Schema parcial estático (top 8) — crawlers que NÃO executam JS (Bing, Perplexity, etc.)
    const existingStatic = document.getElementById("faq-schema-static");
    if (existingStatic) existingStatic.remove();

    const staticSchema = generateFAQSchema(content.items.slice(0, 8));
    const staticScript = document.createElement("script");
    staticScript.id = "faq-schema-static";
    staticScript.type = "application/ld+json";
    staticScript.innerHTML = JSON.stringify(staticSchema);
    document.head.insertBefore(staticScript, document.head.firstChild);

    return () => {
      document.getElementById("faq-schema")?.remove();
      document.getElementById("faq-schema-static")?.remove();
    };
  }, [content]);

  return (
    <div className="faq-page flex flex-col">
      <InternalHero
        label={pageCopy.label}
        title={pageCopy.title}
        highlight={pageCopy.highlight}
        subtitle={pageCopy.subtitle}
        image="/media/bg/bg_FAQ.webp"
        imageAlt="Sapiente.AI"
        imagePosition="right center"
        compact
      />

      <section className="faq-main">
        <div className="faq-inner">

          {/* Sidebar de categorias */}
          <aside className="faq-sidebar">
            <div className="faq-sidebar-label">{pageCopy.sidebar}</div>
            <div className="faq-cats">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = category.id === active.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`faq-cat ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setOpenQuestion(null);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Conteúdo das perguntas */}
          <Reveal delay={80}>
            <div className="faq-content">
              <div className="faq-group-title">{active.label}</div>
              <div className="faq-list">
                {active.items.map((item, index) => {
                  const questionId = `${active.id}-${index}`;
                  const answerId  = `${questionId}-answer`;
                  const isOpen = openQuestion === questionId;
                  return (
                    <div key={item.question} className={`faq-item ${isOpen ? "open" : ""}`}>
                      <button
                        type="button"
                        id={questionId}
                        className="faq-q"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => setOpenQuestion(isOpen ? null : questionId)}
                      >
                        <span className="faq-q-text">{item.question}</span>
                        <span className="faq-q-icon" aria-hidden="true">+</span>
                      </button>
                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        className="faq-a"
                      >
                        <div className="faq-a-inner">{item.answer}</div>
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
        title={content.cta.title}
        title_highlight={content.cta.title_highlight}
        description={content.cta.description}
        description_highlight={content.cta.description_highlight}
        button={content.cta.button}
      />
    </div>
  );
}
