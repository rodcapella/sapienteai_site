/*
 * Política de Privacidade - Privacy Policy Page
 * Portuguese (Portugal) - Default language
 * Design: Matches SAPIENTE.AI visual identity with dark header, white content, dark footer
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

export default function Privacidade() {
  const { t } = useTranslation();

  useEffect(() => {
    setSEOHead({
      title: 'Politica de Privacidade - SAPIENTE.AI',
      description: 'Politica de privacidade da SAPIENTE.AI. Conformidade com LGPD e GDPR. Protecao de dados pessoais.',
      keywords: 'privacidade, LGPD, GDPR, protecao de dados, politica de privacidade',
      url: 'https://sapiente-ai.manus.space/privacidade',
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
              {t('legal.privacy.title')}
            </h1>
            <p className="text-lg text-white/70">
              {t('legal.privacy.lastUpdated')} 16 de Fevereiro de 2026
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
                <span className="text-cyan-500">1.</span> {t('legal.privacy.overview')}
              </h2>
              <p className="text-slate-600">
                {t('legal.privacy.intro')}
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">2.</span> Dados que Recolhemos
              </h2>
              <p className="text-slate-600 mb-4">
                Recolhemos dados pessoais que você nos fornece diretamente, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Nome e informações de contacto (email, telefone)</li>
                <li>Informações da empresa e cargo</li>
                <li>Dados de navegação e uso do site</li>
                <li>Informações de transações e pagamentos</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">3.</span> Como Utilizamos os Seus Dados
              </h2>
              <p className="text-slate-600 mb-4">
                Utilizamos os dados recolhidos para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Fornecer e melhorar os nossos serviços</li>
                <li>Comunicar atualizações e ofertas relevantes</li>
                <li>Cumprir obrigações legais</li>
                <li>Prevenir fraude e garantir segurança</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">4.</span> Segurança dos Dados
              </h2>
              <p className="text-slate-600">
                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">5.</span> Conformidade LGPD/GDPR
              </h2>
              <p className="text-slate-600">
                SAPIENTE.AI está em conformidade total com a Lei Geral de Proteção de Dados (LGPD) brasileira e o Regulamento Geral sobre a Proteção de Dados (GDPR) europeu.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">6.</span> Seus Direitos
              </h2>
              <p className="text-slate-600 mb-4">
                Você tem o direito de:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados imprecisos</li>
                <li>Solicitar exclusão de dados</li>
                <li>Revogar consentimento a qualquer momento</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">7.</span> Contacte-nos
              </h2>
              <p className="text-slate-600">
                Para questões sobre privacidade, entre em contacto conosco através da página de contacto do site.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
