import { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { Icons } from "@/lib/icons";

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { PremiumButton } from "@/components/ui/button/PremiumButton";

import { setSEOHead } from '@/components/SEOHead';
import { generateFAQSchema } from "@/lib/faqSchema";
import { getContent } from "@/lib/content";

const ChevronDown = Icons.ChevronDown;

function FAQAccordion({ item, isOpen, onToggle }: any) {
  return (
    <SectionCard
      className={`cursor-pointer transition-all bg-white border-foreground/5 shadow-sm hover:shadow-md ${
        isOpen ? 'border-primary/40' : ''
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg md:text-xl font-bold text-foreground">
          {item.question}
        </h3>

        <ChevronDown
          className={`h-6 w-6 text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-foreground/70 text-lg leading-relaxed">
          {item.answer}
        </p>
      </div>
    </SectionCard>
  );
}

export default function FAQ() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const content = getContent("faq", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/faq`,
      type: 'website'
    });
  }, [lang, content]);

  useEffect(() => {
    const schema = generateFAQSchema(content.items);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [content]);

  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img 
          src="/media/banners/hero-banner.webp" 
          alt="Sapiente AI FAQ Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
              {content.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mt-6 drop-shadow-md max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ LIST - Ice White */}
      <Section className="bg-ice py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {content.items.map((faq, idx) => (
              <FAQAccordion
                key={idx}
                item={faq}
                isOpen={openIndex === idx}
                onToggle={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
              />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA - Blue Tint */}
      <Section className="bg-blue-tint py-24 md:py-40 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <SectionCard className="bg-white p-10 md:p-16 shadow-xl hover:shadow-2xl transition-all duration-500 border-primary/10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground leading-tight">
                {content.cta.title}
              </h2>

              <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
                {content.cta.description}
              </p>

              <PremiumButton className="scale-110">
                {content.cta.button}
              </PremiumButton>
            </SectionCard>
          </div>
        </div>
      </Section>
    </div>
  );
}
