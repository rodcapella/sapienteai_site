import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
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

export default function LGPD() {
  useEffect(() => {
    setSEOHead({
      title: 'LGPD & RGPD - Protecao de Dados - SAPIENTE.AI',
      description: 'Conformidade LGPD e GDPR. Politica de protecao de dados da SAPIENTE.AI para Brasil e Europa.',
      keywords: 'LGPD, GDPR, protecao de dados, conformidade, privacidade',
      url: 'https://sapiente-ai.manus.space/lgpd',
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
              LGPD & RGPD - Proteção de Dados
            </h1>
            <p className="text-lg text-white/70">
              Conformidade com Lei Geral de Proteção de Dados (Brasil) e Regulamento Geral de Proteção de Dados (Europa)
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
                <span className="text-cyan-500">1.</span> Conformidade LGPD & RGPD
              </h2>
              <p className="text-slate-600">
                SAPIENTE.AI está em conformidade total com a Lei Geral de Proteção de Dados (LGPD) brasileira e com o Regulamento Geral de Proteção de Dados (RGPD) europeu. Implementamos todas as medidas necessárias para proteger dados pessoais de usuários em ambos os continentes.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">2.</span> Armazenamento de Dados em Servidores Europeus
              </h2>
              <p className="text-slate-600 mb-4">
                Dados pessoais de usuários brasileiros podem ser processados em servidores localizados na Europa. SAPIENTE.AI garante:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Criptografia end-to-end de todos os dados em trânsito e em repouso</li>
                <li>Conformidade com padrões de segurança internacionais (ISO 27001)</li>
                <li>Acordos de Processamento de Dados (DPA) com provedores de infraestrutura</li>
                <li>Transferências internacionais seguras com mecanismos aprovados (Standard Contractual Clauses)</li>
                <li>Direito de acesso, correção e exclusão de dados em qualquer jurisdição</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">3.</span> Direitos dos Titulares de Dados
              </h2>
              <p className="text-slate-600 mb-4">
                Conforme LGPD e RGPD, você tem direito a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados imprecisos</li>
                <li>Solicitar exclusão de dados ("direito ao esquecimento")</li>
                <li>Revogar consentimento a qualquer momento</li>
                <li>Portabilidade de dados em formato estruturado</li>
                <li>Oposição ao processamento</li>
                <li>Restrição do processamento</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">4.</span> Bases Legais para Processamento
              </h2>
              <p className="text-slate-600">
                Processamos dados pessoais apenas com base em: consentimento expresso, execução de contrato, cumprimento de obrigações legais, ou interesses legítimos da SAPIENTE.AI.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">5.</span> Segurança de Dados
              </h2>
              <p className="text-slate-600">
                Implementamos criptografia end-to-end, auditorias de segurança contínuas, testes de penetração regulares e conformidade com padrões internacionais de proteção de dados.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">6.</span> Delegado de Proteção de Dados (DPO)
              </h2>
              <p className="text-slate-600">
                SAPIENTE.AI designou um Delegado de Proteção de Dados responsável por garantir conformidade com LGPD e RGPD. Entre em contacto conosco para questões relacionadas a proteção de dados.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">7.</span> Incidentes de Segurança
              </h2>
              <p className="text-slate-600">
                Em caso de incidente que comprometa dados pessoais, SAPIENTE.AI notificará os titulares e autoridades competentes conforme exigido pela LGPD e RGPD, dentro dos prazos legais.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">8.</span> Contato para Questões LGPD/RGPD
              </h2>
              <p className="text-slate-600">
                Para questões sobre proteção de dados, exercer seus direitos, ou reportar incidentes, entre em contacto conosco através da página de contacto do site.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
