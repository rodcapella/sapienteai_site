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
        "group mb-5 cursor-pointer overflow-hidden rounded-[1.75rem] border p-0 transition-colors duration-300",
        "border-[#7861FF]/42 bg-[linear-gradient(145deg,#001547,#050816)] shadow-[0_16px_36px_rgba(1,32,80,0.16)]",
        "hover:border-[#00D1FF]/58 hover:shadow-[0_18px_40px_rgba(10,132,255,0.12)]",
        isOpen ? "border-[#00D1FF]/68" : "border-[#7861FF]/42",
      )}
      onClick={onToggle}
    >
      <div className="relative p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(234,246,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(234,246,255,0.35)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7861FF,#00D1FF,#0A84FF)] opacity-90" />
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00D1FF]/10 blur-3xl transition-colors duration-300 group-hover:bg-[#00D1FF]/14" />

        <div className="relative z-10 flex items-start justify-between gap-5">
          <div className="flex items-start gap-4 md:gap-5">
            {Icon && (
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-[#7861FF]/45 bg-[#050816] text-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.16)] md:h-14 md:w-14">
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
              isOpen ? "rotate-180 border border-[#00D1FF]/50 bg-[#EAF6FF] text-[#001547]" : "border border-[#7861FF]/35 bg-[#050816] text-[#00D1FF]",
            )}
          >
            <Icons.ChevronDown className="h-6 w-6" />
          </div>
        </div>

        <div className={cn("overflow-hidden transition-all duration-700", isOpen ? "mt-7 max-h-[900px] opacity-100" : "max-h-0 opacity-0")}>
          <div className="ml-0 border-t border-[#7861FF]/35 pt-6 md:ml-[4.25rem]">
            <p className="rounded-2xl border border-[#00D1FF]/28 bg-[#050816]/82 px-5 py-5 text-[14px] font-medium leading-relaxed text-[#55D4F2] md:text-[16px]">
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
            <div className="relative mb-12 overflow-hidden rounded-[2rem] border border-[#7861FF]/42 bg-[#001547] p-6 text-center shadow-[0_18px_42px_rgba(1,32,80,0.18)] md:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(234,246,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(234,246,255,0.35)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7861FF,#00D1FF,#0A84FF)]" />
              <p className="relative z-10 text-sm font-black uppercase tracking-[0.28em] text-[#00D1FF]">
                {lang === "pt" ? "Dúvidas frequentes" : "Common questions"}
              </p>
              <p className={`relative z-10 mx-auto mt-3 max-w-3xl text-[#EAF6FF]/78 ${compactBodyTextClass}`}>
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
