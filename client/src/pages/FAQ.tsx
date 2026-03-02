/**
 * FAQ Page - Frequently Asked Questions
 * Modern tech-forward design with accordion layout
 */

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { setSEOHead } from '@/components/SEOHead';

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-blue-800/50 rounded-lg overflow-hidden hover:border-cyan-400/50 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 md:px-8 md:py-6 bg-gradient-to-r from-blue-900/30 to-slate-900/30 hover:from-blue-900/50 hover:to-slate-900/50 transition-all duration-300 flex items-center justify-between"
      >
        <h3 className="text-left text-lg font-semibold text-white">{item.question}</h3>
        <ChevronDown 
          className={`h-6 w-6 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 md:px-8 md:py-6 bg-slate-900/20 border-t border-blue-800/50">
          <p className="text-slate-300 leading-relaxed text-base md:text-lg">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    setSEOHead({
      title: 'FAQ - SAPIENTE.AI | Perguntas Frequentes sobre IA e Transformação Digital',
      description: 'Encontre respostas para as perguntas mais frequentes sobre soluções de IA, implementação, segurança e ROI.',
      keywords: 'FAQ, perguntas frequentes, IA, inteligência artificial, LGPD, segurança, ROI',
      url: 'https://sapiente-ai.manus.space/faq',
      type: 'website'
    });
  }, []);

  const faqs: FAQItem[] = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: 'Qual é o investimento mínimo para um projeto de IA?',
      answer: 'Não existe um investimento mínimo fixo. Oferecemos soluções escaláveis desde projetos pilotos (€5K-€15K) até implementações enterprise. O importante é começar pequeno, validar resultados e escalar progressivamente.'
    },
    {
      question: 'Como funciona o suporte após a implementação?',
      answer: 'Oferecemos suporte técnico 24/7, monitoramento contínuo dos modelos, otimizações periódicas e treinamento da sua equipe. Temos planos de suporte flexíveis que se adaptam às suas necessidades.'
    },
    {
      question: 'Posso integrar a IA com meus sistemas existentes?',
      answer: 'Sim! Nossas soluções são projetadas para integração com sistemas legados. Trabalhamos com APIs, webhooks e integrações customizadas para garantir compatibilidade total com sua infraestrutura.'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 min-h-screen">
      <Header />

      {/* HERO SECTION */}
      <section className="pt-20 md:pt-32 pb-16 md:pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center">
            <p className="text-cyan-400 font-semibold mb-4 text-sm md:text-base uppercase tracking-wider">
              {t('faq.label')}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-slate-300">
              Encontre respostas para as dúvidas mais comuns sobre nossas soluções de IA
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQAccordion
                key={idx}
                item={faq}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Não encontrou sua resposta?
          </h2>
          <p className="text-lg text-slate-300 mb-12">
            Entre em contato com nossos especialistas e tire suas dúvidas diretamente
          </p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-300">
            Fale com um Especialista
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
