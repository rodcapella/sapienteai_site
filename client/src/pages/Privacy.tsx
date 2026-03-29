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
      url: 'https://sapiente-ai.manus.space/privacy',
      type: 'website'
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Breadcrumb />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-32 md:py-40">
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
      <main className="flex-grow py-16 md:py-32 md:py-40">
        <div className="container max-w-4xl">
          <div className="space-y-16 text-slate-700 leading-relaxed">

            {/* 1 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                1. Enquadramento Geral
              </h2>
              <p className="text-slate-600">
                A SAPIENTE.AI compromete-se a proteger a privacidade e os dados pessoais dos seus utilizadores,
                atuando em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD - UE 2016/679)
                e a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </AnimatedSection>

            {/* 2 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                2. Dados Pessoais Tratados
              </h2>
              <ul className="list-disc ml-5 space-y-2 text-slate-600">
                <li>Dados de identificação (nome, email, telefone)</li>
                <li>Informações profissionais (empresa, função)</li>
                <li>Dados técnicos (IP, dispositivo, navegação)</li>
                <li>Dados de utilização dos serviços</li>
              </ul>
            </AnimatedSection>

            {/* 3 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                3. Finalidades do Tratamento
              </h2>
              <ul className="list-disc ml-5 space-y-2 text-slate-600">
                <li>Prestação e melhoria dos serviços</li>
                <li>Gestão de relacionamento com clientes</li>
                <li>Cumprimento de obrigações legais</li>
                <li>Segurança e prevenção de fraude</li>
              </ul>
            </AnimatedSection>

            {/* 4 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                4. Bases Legais
              </h2>
              <p className="text-slate-600">
                O tratamento de dados é realizado com base em consentimento, execução de contrato,
                cumprimento de obrigações legais e interesse legítimo, conforme previsto no RGPD e LGPD.
              </p>
            </AnimatedSection>

            {/* 5 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                5. Partilha de Dados e Subprocessadores
              </h2>
              <p className="text-slate-600">
                A SAPIENTE.AI poderá recorrer a fornecedores e subprocessadores que cumpram integralmente
                o RGPD, mediante acordos de processamento de dados (DPA) e cláusulas contratuais padrão (SCC),
                garantindo níveis adequados de proteção.
              </p>
            </AnimatedSection>

            {/* 6 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                6. Transferências Internacionais
              </h2>
              <p className="text-slate-600">
                Sempre que aplicável, as transferências internacionais de dados são realizadas com base em
                mecanismos legais adequados, incluindo SCC e garantias equivalentes de proteção.
              </p>
            </AnimatedSection>

            {/* 7 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                7. Segurança da Informação
              </h2>
              <p className="text-slate-600">
                São implementadas medidas técnicas e organizacionais alinhadas com frameworks internacionais,
                incluindo criptografia, controlo de acessos e monitorização contínua.
              </p>
            </AnimatedSection>

            {/* 8 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                8. Privacy by Design e Minimização de Dados
              </h2>
              <p className="text-slate-600">
                Os sistemas da SAPIENTE.AI são concebidos com base nos princípios de Privacy by Design e
                Privacy by Default, assegurando que apenas os dados estritamente necessários são tratados
                para cada finalidade.
              </p>
            </AnimatedSection>

            {/* 9 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                9. Retenção de Dados
              </h2>
              <p className="text-slate-600">
                Os dados pessoais são conservados apenas pelo período necessário ao cumprimento das finalidades
                definidas, respeitando obrigações legais e regulatórias.
              </p>
            </AnimatedSection>

            {/* 10 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                10. Direitos dos Titulares
              </h2>
              <ul className="list-disc ml-5 space-y-2 text-slate-600">
                <li>Acesso, retificação e eliminação</li>
                <li>Limitação e oposição ao tratamento</li>
                <li>Portabilidade dos dados</li>
                <li>Revogação de consentimento</li>
              </ul>
            </AnimatedSection>

            {/* 11 */}
            <AnimatedSection>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                11. Contacto
              </h2>
              <p className="text-slate-600">
                Para exercer os seus direitos ou esclarecer questões relacionadas com proteção de dados,
                poderá contactar a SAPIENTE.AI através dos canais oficiais disponibilizados no website.
              </p>
            </AnimatedSection>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
