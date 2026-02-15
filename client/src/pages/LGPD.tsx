/**
 * LGPD (Lei Geral de Proteção de Dados) - Legal Compliance Page
 * Portuguese (Portugal) - Default language
 */

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Content */}
      <main className="pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="container max-w-4xl">
          <AnimatedSection className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Política de Proteção de Dados
            </h1>
            <p className="text-lg text-foreground/70">
              Última atualização: 12 de Fevereiro de 2026
            </p>
          </AnimatedSection>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">1. Introdução</h2>
              <p>
                A SAPIENTE.AI está comprometida com a proteção dos seus dados pessoais. Esta Política de Proteção de Dados explica como recolhemos, utilizamos, divulgamos e protegemos as suas informações em conformidade com a Lei Geral de Proteção de Dados (LGPD) e regulamentações aplicáveis.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">2. Dados que Recolhemos</h2>
              <p className="mb-4">Recolhemos os seguintes tipos de dados pessoais:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Informações de contacto (nome, email, telefone, empresa)</li>
                <li>Dados de navegação (cookies, endereço IP, tipo de navegador)</li>
                <li>Informações de formulários (consultas, mensagens)</li>
                <li>Dados de transações (se aplicável)</li>
                <li>Informações de comunicação (emails, chats)</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">3. Como Utilizamos os Seus Dados</h2>
              <p className="mb-4">Utilizamos os seus dados para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fornecer e melhorar os nossos serviços</li>
                <li>Responder às suas consultas e pedidos</li>
                <li>Enviar comunicações de marketing (com consentimento)</li>
                <li>Cumprir obrigações legais</li>
                <li>Prevenir fraude e abusos</li>
                <li>Análise de comportamento e otimização de experiência</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">4. Base Legal para Processamento</h2>
              <p className="mb-4">Processamos os seus dados com base em:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Consentimento expresso do utilizador</li>
                <li>Execução de contrato</li>
                <li>Cumprimento de obrigações legais</li>
                <li>Interesses legítimos da SAPIENTE.AI</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">5. Partilha de Dados</h2>
              <p>
                Não vendemos, alugamos ou partilhamos os seus dados pessoais com terceiros sem o seu consentimento, exceto quando necessário para cumprir obrigações legais ou quando parceiros de confiança processam dados em nosso nome sob acordos de confidencialidade rigorosos.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">6. Segurança de Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais robustas, incluindo criptografia, firewalls, controlo de acesso e auditorias regulares para proteger os seus dados contra acesso não autorizado, alteração ou destruição.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">7. Retenção de Dados</h2>
              <p>
                Mantemos os seus dados apenas enquanto necessário para os fins descritos nesta política ou conforme exigido pela lei. Após esse período, os dados são eliminados ou anonimizados de forma segura.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">8. Os Seus Direitos</h2>
              <p className="mb-4">Tem direito a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acesso aos seus dados pessoais</li>
                <li>Correção de dados inexatos</li>
                <li>Eliminação de dados ("direito ao esquecimento")</li>
                <li>Restrição do processamento</li>
                <li>Portabilidade de dados</li>
                <li>Retirada de consentimento</li>
                <li>Oposição ao processamento</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">9. Contacte-nos</h2>
              <p>
                Para exercer os seus direitos ou para questões sobre esta política, contacte-nos em: <strong>sapiente.ai.oficial@gmail.com</strong>
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">10. Alterações a Esta Política</h2>
              <p>
                Podemos atualizar esta política periodicamente. Notificaremos sobre alterações significativas publicando a nova política neste site e atualizando a data de "Última atualização".
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-16 pt-12 border-t-4 border-foreground">
            <div className="flex gap-4">
              <Button 
                onClick={() => window.history.back()}
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground/5"
              >
                ← Voltar
              </Button>
              <a href="/" className="inline-block">
                <Button className="bg-primary text-white hover:bg-primary/90 border-2 border-primary">
                  Ir para Home
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
}
