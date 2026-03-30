import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { setSEOHead } from '@/components/SEOHead';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Privacidade() {

  useEffect(() => {
    setSEOHead({
      title: 'Política de Privacidade - SAPIENTE.AI',
      description: 'Política de privacidade da SAPIENTE.AI. Conformidade com RGPD e LGPD. Proteção de dados pessoais.',
      keywords: 'privacidade, RGPD, LGPD, proteção de dados',
      url: 'https://sapienteai.com/privacy',
      type: 'website'
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <Header />
      <Breadcrumb />

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 md:py-32">
        <div className="container max-w-4xl">

          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <a href="/" className="text-white/60 hover:text-white transition">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Política de Privacidade
            </h1>

            <p className="text-white/70">
              Última atualização: 16 de Fevereiro de 2026
            </p>
          </AnimatedSection>

        </div>
      </section>

      {/* CONTENT */}
      <main className="flex-grow py-20">
        <div className="container max-w-4xl space-y-16 text-slate-700 leading-relaxed">

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Enquadramento Geral</h2>
            <p>
              A SAPIENTE.AI compromete-se a proteger os dados pessoais dos seus utilizadores,
              atuando em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD)
              e a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Dados Pessoais Tratados</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Dados de identificação (nome, email, telefone)</li>
              <li>Informações profissionais (empresa, função)</li>
              <li>Dados técnicos (IP, dispositivo, navegação)</li>
              <li>Dados de utilização dos serviços</li>
            </ul>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Finalidades do Tratamento</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Prestação e melhoria dos serviços</li>
              <li>Gestão de relacionamento com clientes</li>
              <li>Cumprimento de obrigações legais</li>
              <li>Segurança e prevenção de fraude</li>
            </ul>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Bases Legais</h2>
            <p>
              O tratamento de dados é realizado com base em consentimento, execução de contrato,
              cumprimento de obrigações legais e interesse legítimo.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Partilha de Dados</h2>
            <p>
              A SAPIENTE.AI recorre exclusivamente a fornecedores que cumpram RGPD,
              com contratos DPA e salvaguardas legais adequadas.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Transferências Internacionais</h2>
            <p>
              Transferências internacionais são realizadas com base em mecanismos legais como SCC,
              garantindo níveis adequados de proteção.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Segurança da Informação</h2>
            <p>
              São implementadas medidas técnicas e organizacionais alinhadas com padrões internacionais,
              incluindo criptografia, controlo de acessos e monitorização contínua.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              8. Privacy by Design e Minimização de Dados
            </h2>
            <p>
              Os sistemas são concebidos com base nos princípios de Privacy by Design e Privacy by Default,
              assegurando tratamento apenas do mínimo necessário de dados.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Retenção de Dados</h2>
            <p>
              Os dados são conservados apenas pelo período necessário para cumprimento das finalidades definidas.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Direitos dos Titulares</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Acesso, retificação e eliminação</li>
              <li>Limitação e oposição ao tratamento</li>
              <li>Portabilidade dos dados</li>
              <li>Revogação de consentimento</li>
            </ul>
          </AnimatedSection>

          {/* 🔥 NOVAS CLÁUSULAS ENTERPRISE */}

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Registos e Auditoria</h2>
            <p>
              São mantidos registos de atividades de tratamento para garantir rastreabilidade,
              auditoria e conformidade contínua.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Avaliação de Impacto (DPIA)</h2>
            <p>
              Sempre que aplicável, são realizadas avaliações de impacto para mitigar riscos,
              especialmente em sistemas baseados em Inteligência Artificial.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Responsabilização</h2>
            <p>
              A SAPIENTE.AI adota mecanismos de controlo, documentação e governança para demonstrar
              conformidade contínua com RGPD e LGPD.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              14. Infraestrutura e Conformidade Europeia
            </h2>
            <p>
              A SAPIENTE.AI privilegia fornecedores com infraestrutura na União Europeia ou com
              garantias equivalentes de proteção de dados, assegurando conformidade internacional.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">15. Contacto</h2>
            <p>
              Para exercer os seus direitos ou obter esclarecimentos, poderá contactar a SAPIENTE.AI
              através dos canais oficiais disponibilizados no website.
            </p>
          </AnimatedSection>

        </div>
      </main>

      <Footer />
    </div>
  );
}
