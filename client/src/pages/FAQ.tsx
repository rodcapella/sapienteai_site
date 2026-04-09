import { useState, useEffect } from 'react';
import { useLocation, Link } from "wouter";
import { ChevronDown, MessageSquare } from 'lucide-react';
import { Icons } from "@/lib/icons";

import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { PremiumButton } from "@/components/ui/button/PremiumButton";

import { setSEOHead } from '@/components/SEOHead';
import { generateFAQSchema } from "@/lib/faqSchema";
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from '@/hooks/useTranslation';

const ArrowLeft = Icons.ArrowLeft;

const faqIcons = [
  Icons.HelpCircle,
  Icons.Bot,
  Icons.Shield,
  Icons.Zap
];

function FAQAccordion({ item, isOpen, onToggle, icon: Icon }: any) {
  return (
    <SectionCard
      className={`cursor-pointer transition-all duration-700 bg-white/80 border-foreground/5 shadow-xl hover:shadow-2xl mb-6 p-10 md:p-12 ${
        isOpen ? 'border-primary/40' : ''
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-6">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
          )}

          <h3 className="text-xl md:text-2xl font-black text-foreground leading-tight">
            {item.question}
          </h3>

        </div>

        {/* RIGHT */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
          isOpen ? 'bg-primary text-white rotate-180' : 'bg-primary/5 text-primary'
        }`}>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-700 ${
        isOpen ? 'max-h-[800px] mt-10 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <p className="text-foreground/60 text-lg leading-relaxed font-medium border-t border-foreground/5 pt-10 ml-16">
          {item.answer}
        </p>
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
      title: `${content.title} - SAPIENTE.AI`,
      description: content.subtitle,
      url: `${window.location.origin}/${lang}/faq`,
      type: 'website'
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
      {/* HERO BANNER - Modern Gradient */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-modern-gradient flex items-center justify-center">
        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container max-w-5xl text-center px-6">
          <Reveal>
            <Link 
              href={`/${lang}`}
              className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest mb-8 hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('nav.home')}
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-10">
              {content.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-3xl text-foreground/60 font-black uppercase tracking-[0.2em] drop-shadow-md">
              {content.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      {/* FAQ */}
      <Section className="bg-blue-tint py-24 md:py-48 flex-grow">
        <div className="max-w-4xl mx-auto px-6">

          {content.items.map((faq: any, idx: number) => {
            const Icon = faqIcons[idx % faqIcons.length];

            return (
              <Reveal key={idx} delay={idx * 100}>
                <FAQAccordion
                  item={faq}
                  icon={Icon}
                  isOpen={openIndex === idx}
                  onToggle={() =>
                    setOpenIndex(openIndex === idx ? null : idx)
                  }
                />
              </Reveal>
            );
          })}

        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-modern-gradient py-32 md:py-56 text-center">
        <div className="max-w-4xl mx-auto px-6">

          <SectionCard className="bg-white/80 p-16 md:p-24 shadow-2xl relative">

            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-neon-purple rounded-3xl flex items-center justify-center shadow-2xl">
              <MessageSquare className="text-white w-10 h-10" />
            </div>

            <h2 className="text-4xl md:text-7xl font-black mb-10">
              {content.cta.title}
            </h2>

            <p className="text-xl md:text-2xl text-foreground/50 mb-16">
              {content.cta.description}
            </p>

            <PremiumButton onClick={() => window.location.href = `/${lang}/contact`}>
              {content.cta.button}
            </PremiumButton>

          </SectionCard>

        </div>
      </Section>
    </div>
  );
}
