/*
 * Termos de Serviço - Terms of Service Page
 * Portuguese (Portugal)
 * Design: Matches SAPIENTE.AI visual identity
 */

import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useTranslation } from '@/hooks/useTranslation';
import { setSEOHead } from '@/components/SEOHead';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Termos() {
  const { t } = useTranslation();

  useEffect(() => {
    setSEOHead({
      title: 'Termos de Servico - SAPIENTE.AI',
      description: 'Termos de servico da SAPIENTE.AI. Condicoes de uso, direitos e responsabilidades.',
      keywords: 'termos de servico, condicoes de uso, termos e condicoes',
      url: 'https://sapiente-ai.manus.space/termos',
      type: 'website'
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Breadcrumb />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <a href="/" className="text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {t('legal.terms.title')}
            </h1>
            <p className="text-lg text-white/70">
              {t('legal.terms.lastUpdated')} 16 de Fevereiro de 2026
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <main className="flex-grow py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="space-y-12 text-slate-700 leading-relaxed">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">1.</span> Aceitação dos Termos
              </h2>
              <p className="text-slate-600">
                Ao acessar e usar o website e serviços da SAPIENTE.AI, você concorda em cumprir estes Termos de Serviço. Se não concordar com qualquer parte destes termos, você não deve usar nossos serviços.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">2.</span> Descrição dos Serviços
              </h2>
              <p className="text-slate-600">
                SAPIENTE.AI fornece soluções de Inteligência Artificial, consultoria estratégica e serviços de implementação de IA para empresas. Nossos serviços incluem análise de dados, automação inteligente e otimização de processos.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">3.</span> Responsabilidades do Usuário
              </h2>
              <p className="text-slate-600 mb-4">
                Você concorda em:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Fornecer informações precisas e completas</li>
                <li>Manter a confidencialidade de suas credenciais</li>
                <li>Usar nossos serviços de forma legal e ética</li>
                <li>Não tentar contornar medidas de segurança</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">4.</span> Propriedade Intelectual
              </h2>
              <p className="text-slate-600">
                Todo o conteúdo, código, design e materiais fornecidos pela SAPIENTE.AI são protegidos por direitos autorais e propriedade intelectual. Você não pode reproduzir, distribuir ou modificar sem permissão explícita.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">5.</span> Limitação de Responsabilidade
              </h2>
              <p className="text-slate-600">
                SAPIENTE.AI não será responsável por danos indiretos, incidentais ou consequentes resultantes do uso ou incapacidade de usar nossos serviços.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">6.</span> Modificações dos Termos
              </h2>
              <p className="text-slate-600">
                SAPIENTE.AI se reserva o direito de modificar estes Termos a qualquer momento. Mudanças significativas serão comunicadas aos usuários.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">7.</span> Lei Aplicável
              </h2>
              <p className="text-slate-600">
                Estes Termos são regidos pelas leis de Portugal e Brasil, conforme aplicável.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
