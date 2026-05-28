import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { setSEOHead } from "@/components/SEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { generateFAQSchema } from "@/lib/faqSchema";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

const faqIcons = [
  Icons.HelpCircle,
  Icons.Bot,
  Icons.ShieldCheck,
  Icons.Zap,
  Icons.Target,
  Icons.BarChart3,
  Icons.Cpu,
  Icons.MessageCircle,
];

const compactCardTextClass = "font-heading text-[10px] font-black leading-tight tracking-tight md:text-[12px]";
const compactBodyTextClass = "text-[12px] leading-relaxed md:text-[14px]";

function FAQAccordion({ item, isOpen, onToggle, icon: Icon }: any) {
  return (
    <SectionCard
      className={cn(
        "group mb-5 cursor-pointer overflow-hidden rounded-[2rem] border p-0 transition-all duration-500",
        "border-[#7861FF]/55 bg-[#001547] shadow-[0_18px_45px_rgba(26,31,46,0.1)] backdrop-blur-2xl",
        "hover:-translate-y-1 hover:border-[#7861FF] hover:shadow-[0_24px_70px_rgba(120,97,255,0.18)]",
        isOpen ? "border-[#7861FF]" : "border-[#7861FF]/55",
      )}
      onClick={onToggle}
    >
      <div className="relative p-6 md:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#7861FF] opacity-90" />
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00D1FF]/10 blur-3xl transition-all duration-500 group-hover:bg-[#00D1FF]/22" />

        <div className="relative z-10 flex items-start justify-between gap-5">
          <div className="flex items-start gap-4 md:gap-5">
            {Icon && (
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-[#00D1FF]/35 bg-[#050816] text-[#00D1FF] shadow-[0_0_22px_rgba(0,209,255,0.2)] md:h-14 md:w-14">
                <Icon className="h-6 w-6" />
              </div>
            )}

            <div>
              <h3 className={`${compactCardTextClass} text-white`}>
                {item.question}
              </h3>
            </div>
          </div>

          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 md:h-12 md:w-12",
              isOpen ? "rotate-180 bg-white text-[#00D1FF] shadow-[0_0_26px_rgba(255,255,255,0.2)]" : "bg-white text-[#00D1FF]",
            )}
          >
            <Icons.ChevronDown className="h-6 w-6" />
          </div>
        </div>

        <div className={cn("overflow-hidden transition-all duration-700", isOpen ? "mt-7 max-h-[900px] opacity-100" : "max-h-0 opacity-0")}>
          <div className="ml-0 border-t border-[#7861FF]/35 pt-6 md:ml-[4.25rem]">
            <p className="rounded-2xl border border-[#7861FF]/35 bg-[#001547] px-5 py-5 font-medium text-[#00D1FF] text-[14px] leading-relaxed md:text-[16px]">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default function FAQ() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const content = getContent("faq", lang);

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
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mb-12 rounded-[2rem] border border-primary/20 bg-[#EAF6FF]/72 p-6 text-center shadow-[0_18px_45px_rgba(26,31,46,0.1)] backdrop-blur-xl md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#0A84FF]">
                {lang === "pt" ? "Dúvidas frequentes" : "Common questions"}
              </p>
              <p className={`mx-auto mt-3 max-w-3xl text-foreground/70 ${compactBodyTextClass}`}>
                {lang === "pt"
                  ? "Organizámos as respostas por temas práticos para ajudar a perceber onde a IA, a automação e o marketing podem gerar impacto real."
                  : "We organised the answers around practical topics to help you understand where AI, automation and marketing can create real impact."}
              </p>
            </div>
          </Reveal>

          {content.items.map((faq: any, idx: number) => {
            const Icon = faqIcons[idx % faqIcons.length];

            return (
              <Reveal key={idx} delay={idx * 55}>
                <FAQAccordion item={faq} icon={Icon} isOpen={openIndex === idx} onToggle={() => setOpenIndex(openIndex === idx ? null : idx)} />
              </Reveal>
            );
          })}
        </div>
      </Section>

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
