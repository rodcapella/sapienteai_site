import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";

import { FAQContactCTA, type FAQCategory, type FAQItem } from "@/components/faq/FAQBlocks";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { Reveal } from "@/components/ui/motion/Reveal";
import { setSEOHead } from "@/components/SEOHead";
import { generateFAQSchema } from "@/lib/faqSchema";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";
import "@/content/styles/faq.css";

function createFAQCategories(items: FAQItem[], lang: string): FAQCategory[] {
  const labels =
    lang === "en"
      ? {
          general: "General",
          content: "Marketing & content",
          automation: "Websites, AI & automation",
          data: "BI & Data",
          business: "Investment & support",
        }
      : {
          general: "Geral",
          content: "Marketing e conteúdos",
          automation: "Websites, IA e automação",
          data: "BI & Dados",
          business: "Investimento e suporte",
        };

  return [
    { id: "general", label: labels.general, icon: Icons.HelpCircle, items: items.slice(0, 4) },
    { id: "content", label: labels.content, icon: Icons.MessageCircle, items: items.slice(4, 13) },
    { id: "automation", label: labels.automation, icon: Icons.Cpu, items: items.slice(13, 17) },
    { id: "business", label: labels.business, icon: Icons.BarChart3, items: items.slice(17, 21) },
    { id: "data", label: labels.data, icon: Icons.Database, items: items.slice(21) },
  ].filter((category) => category.items.length > 0);
}

function getFAQCopy(lang: string) {
  return lang === "en"
    ? {
        label: "Frequently asked questions",
        title: "Have questions?",
        highlight: "We have answers.",
        subtitle: "We gathered the most common questions about how we work, what we deliver and how Sapiente.AI creates business impact with AI, automation and digital strategy.",
        sidebar: "Categories",
      }
    : {
        label: "Perguntas frequentes",
        title: "Tem dúvidas?",
        highlight: "Temos respostas.",
        subtitle: "Reunimos as perguntas mais comuns sobre como trabalhamos, o que entregamos e como a Sapiente.AI ajuda negócios a crescer com IA, automação e estratégia digital.",
        sidebar: "Categorias",
      };
}

function FAQIllustration() {
  return (
    <svg viewBox="0 0 440 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="faq-illustration" aria-hidden="true">
      <rect x="20" y="20" width="280" height="80" rx="16" fill="#F0F8FF" stroke="rgba(10,132,255,0.22)" strokeWidth="1.5" />
      <path d="M60 100 L48 118 L80 100Z" fill="#F0F8FF" stroke="rgba(10,132,255,0.22)" strokeWidth="1.5" />
      <rect x="36" y="38" width="180" height="10" rx="5" fill="rgba(0,21,71,0.12)" />
      <rect x="36" y="55" width="240" height="8" rx="4" fill="rgba(0,21,71,0.08)" />
      <rect x="36" y="69" width="160" height="8" rx="4" fill="rgba(0,21,71,0.06)" />
      <rect x="140" y="128" width="280" height="80" rx="16" fill="var(--brand-primary)" />
      <path d="M370 128 L382 110 L354 128Z" fill="var(--brand-primary)" />
      <rect x="156" y="146" width="200" height="10" rx="5" fill="rgba(255,255,255,0.32)" />
      <rect x="156" y="163" width="240" height="8" rx="4" fill="rgba(255,255,255,0.22)" />
      <rect x="156" y="177" width="180" height="8" rx="4" fill="rgba(255,255,255,0.16)" />
      {[60, 130, 200, 270, 340].map((cx, index) => (
        <g key={cx}>
          <circle cx={cx} cy="230" r="22" fill={index === 2 ? "var(--brand-primary)" : "#F0F8FF"} stroke="rgba(10,132,255,0.16)" strokeWidth="1" />
          <circle cx={cx} cy="230" r="6" fill={index === 2 ? "#EAF6FF" : "var(--brand-primary)"} opacity="0.88" />
        </g>
      ))}
    </svg>
  );
}

export default function FAQ() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const normalizedLang = lang === "en" ? "en" : "pt";
  const content = getContent("faq", lang);
  const pageCopy = getFAQCopy(normalizedLang);
  const categories = useMemo(() => createFAQCategories(content.items, normalizedLang), [content.items, normalizedLang]);

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "general");
  const [openQuestion, setOpenQuestion] = useState<string | null>(`${categories[0]?.id || "general"}-0`);
  const active = categories.find((category) => category.id === activeCategory) || categories[0];

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - Sapiente.AI`,
      description: content.subtitle,
      url: `${window.location.origin}/${lang}/faq`,
      type: "website",
    });
  }, [lang, content]);

  useEffect(() => {
    const existing = document.getElementById("faq-schema");
    if (existing) existing.remove();

    const schema = generateFAQSchema(content.items);
    const script = document.createElement("script");
    script.id = "faq-schema";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [content]);

  return (
    <div className="faq-page flex flex-col">
      <section className="faq-hero-card">
        <div className="faq-hero-bg" />
        <div className="faq-hero-grid" />
        <div className="faq-hero-inner">
          <Reveal>
            <div>
              <span className="faq-section-label">{pageCopy.label}</span>
              <h1 className="faq-hero-title">
                {pageCopy.title}
                <br />
                <span className="accent">{pageCopy.highlight}</span>
              </h1>
              <p className="faq-hero-sub">{pageCopy.subtitle}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <FAQIllustration />
          </Reveal>
        </div>
      </section>

      <section className="faq-main">
        <div className="faq-inner">
          <Reveal>
            <aside className="faq-sidebar">
              <div className="faq-sidebar-title">{pageCopy.sidebar}</div>
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
                      <span className="faq-cat-count">{category.items.length}</span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </Reveal>

          <Reveal delay={80}>
            <div className="faq-content">
              <div className="faq-group-title">{active.label}</div>
              <div className="faq-list">
                {active.items.map((item, index) => {
                  const questionId = `${active.id}-${index}`;
                  const isOpen = openQuestion === questionId;
                  return (
                    <div key={item.question} className={`faq-item ${isOpen ? "open" : ""}`}>
                      <button type="button" className="faq-q" onClick={() => setOpenQuestion(isOpen ? null : questionId)}>
                        <span className="faq-q-text">{item.question}</span>
                        <span className="faq-q-icon">+</span>
                      </button>
                      <div className="faq-a">
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
