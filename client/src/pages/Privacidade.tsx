/**
 * Política de Privacidade - Privacy Policy Page
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

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Content */}
      <main className="pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="container max-w-4xl">
          <AnimatedSection className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Política de Privacidade
            </h1>
            <p className="text-lg text-foreground/70">
              Última atualização: 12 de Fevereiro de 2026
            </p>
          </AnimatedSection>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">1. Visão Geral</h2>
              <p>
                A SAPIENTE.AI respeita a sua privacidade e está comprometida em ser transparente sobre como recolhemos, utilizamos e protegemos os seus dados pessoais. Esta Política de Privacidade descreve as nossas práticas de privacidade.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">2. Informações que Recolhemos</h2>
              <p className="mb-4">Podemos recolher as seguintes informações:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Informações de Contacto:</strong> Nome, email, telefone, endereço, empresa</li>
                <li><strong>Informações de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo gasto</li>
                <li><strong>Cookies e Tecnologias Similares:</strong> Para melhorar a experiência do utilizador</li>
                <li><strong>Informações de Formulários:</strong> Dados que voluntariamente submete</li>
                <li><strong>Informações de Comunicação:</strong> Conteúdo de emails e mensagens</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">3. Como Utilizamos as Informações</h2>
              <p className="mb-4">Utilizamos as informações para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fornecer e melhorar os nossos serviços</li>
                <li>Responder às suas consultas e pedidos</li>
                <li>Enviar atualizações e comunicações de marketing</li>
                <li>Personalizar a sua experiência</li>
                <li>Análise de dados e otimização de website</li>
                <li>Cumprir obrigações legais</li>
                <li>Prevenir fraude e abusos</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">4. Cookies</h2>
              <p>
                Utilizamos cookies para melhorar a sua experiência. Cookies são pequenos ficheiros armazenados no seu dispositivo. Pode controlar as preferências de cookies nas configurações do seu navegador. Alguns cookies são essenciais para a funcionalidade do website.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">5. Partilha de Informações</h2>
              <p>
                Não vendemos as suas informações pessoais. Podemos partilhar informações com parceiros de confiança que nos ajudam a fornecer serviços, sob acordos de confidencialidade rigorosos. Também podemos divulgar informações quando exigido por lei.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">6. Segurança de Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger os seus dados contra acesso não autorizado, alteração ou destruição. Utilizamos criptografia SSL/TLS, firewalls e controlo de acesso rigoroso.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">7. Retenção de Dados</h2>
              <p>
                Mantemos os seus dados apenas enquanto necessário para os fins descritos. Você pode solicitar a eliminação dos seus dados a qualquer momento, sujeito a obrigações legais de retenção.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">8. Os Seus Direitos</h2>
              <p className="mb-4">Tem os seguintes direitos:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Direito de acesso aos seus dados</li>
                <li>Direito de correção de dados inexatos</li>
                <li>Direito ao esquecimento (eliminação)</li>
                <li>Direito de restrição do processamento</li>
                <li>Direito de portabilidade de dados</li>
                <li>Direito de retirada de consentimento</li>
                <li>Direito de oposição ao processamento</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">9. Links Externos</h2>
              <p>
                O nosso website pode conter links para sites externos. Não somos responsáveis pelas políticas de privacidade de terceiros. Recomendamos que revise as políticas de privacidade de qualquer site que visite.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">10. Contacte-nos</h2>
              <p>
                Para questões sobre esta Política de Privacidade ou para exercer os seus direitos, contacte-nos em: <strong>sapiente.ai.oficial@gmail.com</strong>
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">11. Alterações a Esta Política</h2>
              <p>
                Podemos atualizar esta política periodicamente. Notificaremos sobre alterações significativas publicando a nova política neste website.
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
