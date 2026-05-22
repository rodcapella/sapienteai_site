import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
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

function FAQAccordion({ item, isOpen, onToggle, icon: Icon }: any) {
  return (
    <SectionCard
      className={cn(
        "group mb-5 cursor-pointer overflow-hidden rounded-[2rem] border p-0 transition-all duration-500",
        "bg-white/88 shadow-[0_18px_45px_rgba(10,17,40,0.1)] backdrop-blur-2xl",
        "hover:-translate-y-1 hover:border-[var(--brand-cyan)]/60 hover:shadow-[0_24px_70px_rgba(0,209,255,0.18)]",
        isOpen ? "border-[var(--brand-cyan)]/70" : "border-primary/20",
      )}
      onClick={onToggle}
    >
      <div className="relative p-6 md:p-8">
        <div className="absolute inset-x-0 top-0 h-1 [background:var(--brand-gradient-border)] opacity-70" />
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--brand-cyan)]/10 blur-3xl transition-all duration-500 group-hover:bg-[var(--brand-cyan)]/22" />

        <div className="relative z-10 flex items-start justify-between gap-5">
          <div className="flex items-start gap-4 md:gap-5">
            {Icon && (
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/35 bg-[#06102A] text-[var(--brand-cyan)] shadow-[0_0_22px_rgba(0,209,255,0.2)] md:h-14 md:w-14">
                <Icon className="h-6 w-6" />
              </div>
            )}

            <div>
              <h3 className="font-heading text-xl font-black leading-tight tracking-tight text-foreground md:text-2xl">
                {item.question}
              </h3>
            </div>
          </div>

          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 md:h-12 md:w-12",
              isOpen ? "rotate-180 bg-[var(--brand-primary)] text-white shadow-[0_0_26px_rgba(10,138,255,0.35)]" : "bg-[#EAF6FF] text-[var(--brand-primary)]",
            )}
          >
            <Icons.ChevronDown className="h-6 w-6" />
          </div>
        </div>

        <div className={cn("overflow-hidden transition-all duration-700", isOpen ? "mt-7 max-h-[900px] opacity-100" : "max-h-0 opacity-0")}>
          <div className="ml-0 border-t border-primary/15 pt-6 md:ml-[4.25rem]">
            <p className="rounded-2xl border border-[var(--brand-cyan)]/16 bg-[#06102A]/[0.04] px-5 py-5 text-base font-medium leading-relaxed text-foreground/70 md:text-lg">
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
            <div className="mb-12 rounded-[2rem] border border-primary/20 bg-white/72 p-6 text-center shadow-[0_18px_45px_rgba(10,17,40,0.1)] backdrop-blur-xl md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[var(--brand-primary)]">
                {lang === "pt" ? "Dúvidas frequentes" : "Common questions"}
              </p>
              <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
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

      <FinalCTA title={content.cta.title} description={content.cta.description} button={content.cta.button} />
    </div>
  );
}
