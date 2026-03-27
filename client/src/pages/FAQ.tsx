import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { useTranslation } from '@/hooks/useTranslation';
import { setSEOHead } from '@/components/SEOHead';

import { generateFAQSchema } from "@/lib/faqSchema";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({
  item,
  isOpen,
  onToggle
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <SectionCard
      className={`
        cursor-pointer
        transition-all
        ${isOpen ? 'border-cyan-400/40' : ''}
      `}
      onClick={onToggle}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-medium text-white">
          {item.question}
        </h3>

        <ChevronDown
          className={`
            h-5 w-5 text-cyan-400
            transition-transform duration-300
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </div>

      {/* CONTENT */}
      <div
        className={`
          overflow-hidden
          transition-all duration-300
          ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <p className="text-slate-400 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </SectionCard>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    setSEOHead({
      title: 'FAQ - SAPIENTE.AI',
      description: 'Perguntas frequentes sobre IA, implementação e ROI.',
      keywords: 'FAQ IA, inteligência artificial, automação',
      url: 'https://sapienteai.com/faq',
      type: 'website'
    });
  }, []);

  const faqs: FAQItem[] = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    {
      question: 'Qual é o investimento mínimo para um projeto de IA?',
      answer:
        'Projetos podem começar pequenos (€5K–€15K) e escalar conforme os resultados. O foco é validar rápido e crescer com segurança.'
    },
    {
      question: 'Como funciona o suporte após a implementação?',
      answer:
        'Monitoramento contínuo, suporte técnico, otimizações e evolução dos modelos conforme o negócio cresce.'
    },
    {
      question: 'Posso integrar com sistemas existentes?',
      answer:
        'Sim. Integramos com APIs, sistemas legados e ferramentas atuais sem fricção.'
    }
  ];

  useEffect(() => {
    const existing = document.getElementById("faq-schema");
    if (existing) existing.remove();

    const schema = generateFAQSchema(faqs);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.innerHTML = JSON.stringify(schema);

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [faqs]);

  return (
    <div className="
      min-h-screen
      bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)]
      text-white
      relative
      overflow-hidden
    ">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      <Header />

      {/* HERO */}
      <Section id="home">
        <SectionHeader>
          <SectionTitle
            label={t('faq.label')}
            title={t('faq.title')}
          />
        </SectionHeader>

        <div className="text-center max-w-2xl mx-auto text-slate-400">
          <p>
            Encontre respostas diretas sobre como usamos IA para gerar resultados reais.
          </p>
        </div>
      </Section>

      {/* FAQ LIST */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
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
              Ainda com dúvidas?
            </h2>

            <p className="text-slate-400 mb-6">
              Fala direto com quem implementa IA no mundo real.
            </p>

            <button className="
              bg-cyan-400
              text-black
              font-medium
              px-6 py-3
              rounded-full
              hover:scale-[1.03]
              transition
            ">
              Falar com especialista
            </button>
          </SectionCard>
        </div>
      </Section>

      <Footer />
    </div>
  );
}