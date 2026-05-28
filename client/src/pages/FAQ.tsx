import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { FAQContactCTA, FAQQuestionLayout, type FAQCategory, type FAQItem } from "@/components/faq/FAQBlocks";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { setSEOHead } from "@/components/SEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { generateFAQSchema } from "@/lib/faqSchema";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

const compactBodyTextClass = "text-[12px] leading-relaxed md:text-[14px]";

function createFAQCategories(items: FAQItem[], lang: string): FAQCategory[] {
  const labels =
    lang === "en"
      ? {
          general: "General",
          content: "Marketing & content",
          automation: "Websites, AI & automation",
          business: "Investment & support",
        }
      : {
          general: "Geral",
          content: "Marketing e conteúdos",
          automation: "Websites, IA e automação",
          business: "Investimento e suporte",
        };

  return [
    { id: "general", label: labels.general, icon: Icons.HelpCircle, items: items.slice(0, 4) },
    { id: "content", label: labels.content, icon: Icons.MessageCircle, items: items.slice(4, 13) },
    { id: "automation", label: labels.automation, icon: Icons.Cpu, items: items.slice(13, 17) },
    { id: "business", label: labels.business, icon: Icons.BarChart3, items: items.slice(17) },
  ].filter((category) => category.items.length > 0);
}

function getFAQSidebarTitle(lang: string) {
  return lang === "en" ? "Categories" : "Categorias";
}

export default function FAQ() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";
  const normalizedLang = lang === "en" ? "en" : "pt";

  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>("general-0");
  const content = getContent("faq", lang);
  const categories = createFAQCategories(content.items, normalizedLang);

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
    <div className="flex flex-col">
      <InternalHero label={t("nav.faq")} title={content.title} subtitle={content.subtitle} />

      <Section className="standard-section-bg relative flex-grow overflow-hidden py-24 md:py-36">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="relative mb-14 overflow-hidden rounded-2xl border border-[#0A84FF]/14 bg-white/72 p-6 text-center shadow-[0_18px_44px_rgba(0,21,71,0.06)] backdrop-blur-sm dark:border-[#7861FF]/36 dark:bg-[#001547]/78 md:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(0,21,71,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(0,21,71,0.45)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-[0.08] dark:[background-image:linear-gradient(rgba(234,246,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(234,246,255,0.35)_1px,transparent_1px)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7861FF,#00D1FF,#0A84FF)]" />
              <p className="relative z-10 text-sm font-black uppercase tracking-[0.28em] text-[#0A84FF] dark:text-[#00D1FF]">
                {lang === "pt" ? "Dúvidas frequentes" : "Common questions"}
              </p>
              <p className={`relative z-10 mx-auto mt-3 max-w-3xl text-[#001547]/62 dark:text-[#EAF6FF]/78 ${compactBodyTextClass}`}>
                {lang === "pt"
                  ? "Organizámos as respostas por temas práticos para ajudar a perceber onde a IA, a automação e o marketing podem gerar impacto real."
                  : "We organised the answers around practical topics to help you understand where AI, automation and marketing can create real impact."}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <FAQQuestionLayout
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(categoryId) => {
              setActiveCategory(categoryId);
              setOpenQuestion(null);
            }}
            openQuestion={openQuestion}
            onQuestionToggle={(questionId) => setOpenQuestion(openQuestion === questionId ? null : questionId)}
            sidebarTitle={getFAQSidebarTitle(normalizedLang)}
          />
        </Reveal>
      </Section>

      <QuizCTA />
      <FAQContactCTA lang={normalizedLang} />
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
