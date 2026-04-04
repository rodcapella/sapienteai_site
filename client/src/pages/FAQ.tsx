import { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { Icons } from "@/lib/icons";
import { ChevronDown, MessageSquare } from 'lucide-react';

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { PremiumButton } from "@/components/ui/button/PremiumButton";

import { setSEOHead } from '@/components/SEOHead';
import { generateFAQSchema } from "@/lib/faqSchema";
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function FAQAccordion({ item, isOpen, onToggle }: any) {
  return (
    <SectionCard
      className={`cursor-pointer transition-all duration-700 bg-white/80 border-foreground/5 shadow-xl hover:shadow-2xl mb-6 p-10 md:p-12 ${
        isOpen ? 'border-primary/40' : ''
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-6">
        <h3 className="text-xl md:text-3xl font-black text-foreground tracking-tight leading-none">
          {item.question}
        </h3>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-primary/5 text-primary'}`}>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? 'max-h-[800px] mt-10 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-foreground/60 text-xl leading-relaxed font-medium border-t border-foreground/5 pt-10">
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
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* HERO BANNER - Modern Gradient */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-modern-gradient flex items-center justify-center">
        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container max-w-5xl text-center px-6">
          <Reveal>
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

      {/* FAQ LIST - Solid Blue Tint */}
      <Section className="bg-blue-tint py-24 md:py-48 flex-grow">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {content.items.map((faq: any, idx: number) => (
              <Reveal key={idx} delay={idx * 100}>
                <FAQAccordion
                  item={faq}
                  isOpen={openIndex === idx}
                  onToggle={() =>
                    setOpenIndex(openIndex === idx ? null : idx)
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA - Modern Gradient */}
      <Section className="bg-modern-gradient py-32 md:py-56 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 blur-[100px] rounded-full -z-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionCard className="bg-white/80 backdrop-blur-2xl p-16 md:p-24 shadow-2xl border-primary/10 relative group">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-neon-purple rounded-3xl flex items-center justify-center shadow-2xl rotate-[-12deg] group-hover:rotate-0 transition-all duration-500">
                <MessageSquare className="text-white w-10 h-10" />
              </div>
              
              <h2 className="text-4xl md:text-7xl font-black mb-10 text-foreground tracking-tighter leading-none">
                {content.cta.title}
              </h2>

              <p className="text-xl md:text-2xl text-foreground/50 mb-16 leading-relaxed font-medium">
                {content.cta.description}
              </p>

              <PremiumButton className="scale-125">
                {content.cta.button}
              </PremiumButton>
            </SectionCard>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
