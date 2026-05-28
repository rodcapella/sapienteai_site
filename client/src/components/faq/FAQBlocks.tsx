import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ContactModal from "@/components/ContactModal";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Icons } from "@/lib/icons";
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
      <p className="mb-4 font-detail text-[12px] font-black uppercase tracking-[0.2em] text-[#0A84FF]/70 dark:text-[#00D1FF]/72">
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
                "group flex min-w-max items-center gap-3 rounded-xl border px-4 py-3 text-left font-serif text-[14px] font-semibold transition-colors duration-200 lg:min-w-0",
                isActive
                  ? "border-[#0A84FF]/35 bg-[#EAF6FF] text-[#001547] shadow-[0_10px_28px_rgba(10,132,255,0.08)] dark:border-[#00D1FF]/42 dark:bg-[#001547] dark:text-[#EAF6FF]"
                  : "border-transparent bg-transparent text-[#001547]/54 hover:bg-[#EAF6FF]/70 hover:text-[#001547] dark:text-[#EAF6FF]/54 dark:hover:bg-[#001547]/72 dark:hover:text-[#EAF6FF]",
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#0A84FF] dark:text-[#00D1FF]" : "text-[#001547]/34 dark:text-[#EAF6FF]/34")} />
              <span>{category.label}</span>
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-[10px] font-black",
                  isActive ? "bg-[#0A84FF]/10 text-[#0A84FF] dark:bg-[#00D1FF]/12 dark:text-[#00D1FF]" : "bg-[#EAF6FF] text-[#001547]/32 dark:bg-[#001547] dark:text-[#EAF6FF]/32",
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
    <div className="border-t border-[#0A84FF]/14 last:border-b dark:border-[#00D1FF]/16">
      <button type="button" onClick={onToggle} className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-opacity duration-200 hover:opacity-85">
        <span className="font-heading text-[15px] font-black leading-snug text-[#001547] md:text-[16px] dark:text-[#EAF6FF]">
          {item.question}
        </span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[18px] font-light transition-all duration-300",
            isOpen ? "rotate-45 border-[#0A84FF] text-[#0A84FF] dark:border-[#00D1FF] dark:text-[#00D1FF]" : "border-[#0A84FF]/20 text-[#001547]/45 dark:border-[#00D1FF]/22 dark:text-[#EAF6FF]/48",
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
            <p className="max-w-3xl pb-7 font-serif text-[14px] font-medium leading-[1.85] text-[#001547]/62 dark:text-[#55D4F2]">
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
        <p className="mb-5 font-detail text-[12px] font-black uppercase tracking-[0.2em] text-[#0A84FF] dark:text-[#00D1FF]">
          {active.label}
        </p>
        <div className="rounded-2xl border border-[#0A84FF]/10 bg-white/72 px-6 shadow-[0_18px_44px_rgba(0,21,71,0.06)] backdrop-blur-sm dark:border-[#7861FF]/36 dark:bg-[#001547]/78 dark:shadow-[0_18px_44px_rgba(5,8,22,0.2)] md:px-8">
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
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-2xl border border-[#0A84FF]/22 bg-[linear-gradient(135deg,rgba(10,132,255,0.12),rgba(234,246,255,0.88))] p-7 shadow-[0_18px_44px_rgba(0,21,71,0.08)] dark:border-[#00D1FF]/28 dark:bg-[linear-gradient(135deg,rgba(0,209,255,0.12),rgba(0,21,71,0.92))] md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <h2 className="font-heading text-[26px] font-black leading-tight text-[#001547] dark:text-[#EAF6FF]">
            {content.title}
          </h2>
          <p className="mt-3 max-w-xl font-serif text-[14px] font-medium leading-relaxed text-[#001547]/62 dark:text-[#EAF6FF]/74">
            {content.description}
          </p>
        </div>

        <PremiumButton onClick={() => setIsContactOpen(true)} className="w-full md:w-auto" size="md">
          {content.button}
          <Icons.ArrowRight className="h-4 w-4" />
        </PremiumButton>
      </div>

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </section>
  );
}
