import { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { Icons } from "@/lib/icons";

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { setSEOHead } from '@/components/SEOHead';
import { generateFAQSchema } from "@/lib/faqSchema";

import { getContent } from "@/lib/content";

const ChevronDown = Icons.ChevronDown; 

const content = getContent("faq", lang);

function FAQAccordion({ item, isOpen, onToggle }: any) {
  return (
    <SectionCard
      className={`cursor-pointer transition-all ${isOpen ? 'border-cyan-400/40' : ''}`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-medium text-white">
          {item.question}
        </h3>

        <ChevronDown
          className={`h-5 w-5 text-cyan-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <p className="text-slate-400 leading-relaxed">
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

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/faq`,
      type: 'website'
    });
  }, [lang]);

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)] text-white">

      <Header />

      {/* HERO */}
      <Section>
        <SectionHeader>
          <SectionTitle
            label={content.label}
            title={content.title}
          />
        </SectionHeader>

        <div className="text-center max-w-2xl mx-auto text-slate-400">
          <p>{content.subtitle}</p>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-4">
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
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <div className="max-w-2xl mx-auto">
          <SectionCard variant="highlight">

            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {content.cta.title}
            </h2>

            <p className="text-slate-400 mb-6">
              {content.cta.description}
            </p>

            <button className="
              bg-cyan-400 text-black font-medium
              px-6 py-3 rounded-full
              hover:scale-[1.03] transition
            ">
              {content.cta.button}
            </button>

          </SectionCard>
        </div>
      </Section>

      <Footer />
    </div>
  );
}