import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ContactModal from "@/components/ContactModal";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { ArrowRight } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  items: FAQItem[];
};

type FAQCategoryNavProps = {
  categories: FAQCategory[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
  sidebarTitle: string;
};

type FAQAccordionLineProps = {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
};

type FAQQuestionLayoutProps = {
  categories: FAQCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  openQuestion: string | null;
  onQuestionToggle: (questionId: string) => void;
  sidebarTitle: string;
};

type FAQContactCTAProps = {
  lang: "pt" | "en";
};

const ctaContent = {
  pt: {
    title: "Não encontrou a resposta que procurava?",
    description: "Fale diretamente connosco. Respondemos a todas as dúvidas sem compromisso e sem guiões de venda.",
    button: "Falar connosco",
  },
  en: {
    title: "Still looking for the right answer?",
    description: "Talk directly with us. We will answer your questions clearly, without pressure or a scripted sales pitch.",
    button: "Talk to us",
  },
};

export function FAQCategoryNav({ categories, activeCategory, onChange, sidebarTitle }: FAQCategoryNavProps) {
  return (
    <aside className="lg:sticky lg:top-28">
      <p className="mb-4 font-detail text-[12px] font-black uppercase tracking-[0.2em] text-[var(--brand-primary)]/70 dark:text-[var(--brand-cyan-bright)]/72">
        {sidebarTitle}
      </p>
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={cn(
                "group flex min-w-max items-center gap-3 rounded-xl border px-4 py-3 text-left font-[var(--font-body)] text-[14px] font-semibold transition-colors duration-200 lg:min-w-0",
                isActive
                  ? "border-[var(--brand-purple-bright)]/35 bg-[var(--card)] text-[var(--brand-night)] shadow-[0_10px_28px_color-mix(in_srgb,var(--brand-purple) 8%,transparent)] dark:border-[var(--brand-cyan-bright)]/42 dark:bg-[var(--brand-night)] dark:text-[var(--brand-offwhite)]"
                  : "border-transparent bg-transparent text-[var(--brand-night)]/54 hover:bg-[var(--brand-purple)]/10 hover:text-[var(--brand-night)] dark:text-[var(--brand-offwhite)]/54 dark:hover:bg-[var(--brand-night)]/72 dark:hover:text-[var(--brand-offwhite)]",
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[var(--brand-primary)] dark:text-[var(--brand-cyan-bright)]" : "text-[var(--brand-night)]/34 dark:text-[var(--brand-offwhite)]/34")} />
              <span>{category.label}</span>
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-[10px] font-black",
                  isActive ? "bg-[var(--brand-purple-bright)]/12 text-[var(--brand-purple-bright)] dark:bg-[var(--brand-cyan-bright)]/12 dark:text-[var(--brand-cyan-bright)]" : "bg-[var(--card)] text-[var(--brand-night)]/32 dark:bg-[var(--brand-night)] dark:text-[var(--brand-offwhite)]/32",
                )}
              >
                {category.items.length}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export function FAQAccordionLine({ item, isOpen, onToggle }: FAQAccordionLineProps) {
  return (
    <div className="border-t border-[var(--brand-primary)]/14 last:border-b dark:border-[var(--brand-cyan-bright)]/16">
      <button type="button" onClick={onToggle} aria-expanded={isOpen} aria-label={`${isOpen ? "Fechar" : "Abrir"}: ${item.question}`} className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-opacity duration-200 hover:opacity-85">
        <span className="font-heading text-[15px] font-black leading-snug text-[var(--brand-night)] md:text-[16px] dark:text-[var(--brand-offwhite)]">
          {item.question}
        </span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[18px] font-light transition-all duration-300",
            isOpen ? "rotate-45 border-[var(--brand-primary)] text-[var(--brand-primary)] dark:border-[var(--brand-cyan-bright)] dark:text-[var(--brand-cyan-bright)]" : "border-[var(--brand-primary)]/20 text-[var(--brand-night)]/45 dark:border-[var(--brand-cyan-bright)]/22 dark:text-[var(--brand-offwhite)]/48",
          )}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-7 font-[var(--font-body)] text-[14px] font-medium leading-[1.85] text-[var(--brand-night)]/62 dark:text-[var(--brand-cyan)]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQQuestionLayout({ categories, activeCategory, onCategoryChange, openQuestion, onQuestionToggle, sidebarTitle }: FAQQuestionLayoutProps) {
  const active = categories.find((category) => category.id === activeCategory) || categories[0];

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[240px_1fr] lg:gap-20">
      <FAQCategoryNav categories={categories} activeCategory={active.id} onChange={onCategoryChange} sidebarTitle={sidebarTitle} />

      <div>
        <p className="mb-5 font-detail text-[12px] font-black uppercase tracking-[0.2em] text-[var(--brand-primary)] dark:text-[var(--brand-cyan-bright)]">
          {active.label}
        </p>
        <div className="rounded-2xl border border-[var(--brand-purple-bright)]/10 bg-[var(--card)] px-6 shadow-[0_18px_44px_color-mix(in_srgb,var(--brand-night) 6%,transparent)] backdrop-blur-sm dark:border-[var(--brand-purple-bright)]/22 dark:bg-[var(--brand-night)]/78 dark:shadow-[0_18px_44px_color-mix(in_srgb,var(--brand-darkest) 20%,transparent)] md:px-8">
          {active.items.map((item, index) => {
            const questionId = `${active.id}-${index}`;
            return (
              <FAQAccordionLine
                key={item.question}
                item={item}
                isOpen={openQuestion === questionId}
                onToggle={() => onQuestionToggle(questionId)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function FAQContactCTA({ lang }: FAQContactCTAProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const content = ctaContent[lang];

  return (
    <section className="standard-section-bg relative overflow-hidden px-6 pb-20 pt-2 md:pb-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-2xl border border-[var(--brand-purple-bright)]/16 bg-[linear-gradient(135deg,color-mix(in srgb,var(--brand-purple) 14%,transparent),color-mix(in srgb,var(--brand-offwhite) 88%,transparent))] p-7 shadow-[0_18px_44px_color-mix(in_srgb,var(--brand-night) 8%,transparent)] dark:border-[var(--brand-cyan-bright)]/20 dark:bg-[linear-gradient(135deg,color-mix(in srgb,var(--brand-cyan-bright) 12%,transparent),color-mix(in srgb,var(--brand-night) 92%,transparent))] md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <h2 className="font-heading text-[26px] font-black leading-tight text-[var(--brand-night)] dark:text-[var(--brand-offwhite)]">
            {content.title}
          </h2>
          <p className="mt-3 max-w-xl font-[var(--font-body)] text-[14px] font-medium leading-relaxed text-[var(--brand-night)]/62 dark:text-[var(--brand-offwhite)]/74">
            {content.description}
          </p>
        </div>

        <PremiumButton onClick={() => setIsContactOpen(true)} className="w-full md:w-auto" size="md">
          {content.button}
          <ArrowRight className="h-4 w-4" />
        </PremiumButton>
      </div>

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </section>
  );
}
