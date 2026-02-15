/**
 * Termos de Serviço - Terms of Service Page
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

export default function Termos() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Content */}
      <main className="pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="container max-w-4xl">
          <AnimatedSection className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Termos de Serviço
            </h1>
            <p className="text-lg text-foreground/70">
              Última atualização: 12 de Fevereiro de 2026
            </p>
          </AnimatedSection>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao aceder e utilizar o website e serviços da SAPIENTE.AI, você concorda em estar vinculado por estes Termos de Serviço. Se não concordar com qualquer parte destes termos, não deve utilizar os nossos serviços.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">2. Descrição dos Serviços</h2>
              <p>
                A SAPIENTE.AI fornece soluções de Inteligência Artificial, Machine Learning, Automação Inteligente e Consultoria Estratégica para empresas. Os serviços são fornecidos conforme descrito no website e em acordos específicos com clientes.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">3. Uso Aceitável</h2>
              <p className="mb-4">Você concorda em não:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Utilizar os serviços para fins ilegais ou prejudiciais</li>
                <li>Transmitir conteúdo ofensivo, abusivo ou discriminatório</li>
                <li>Tentar ganhar acesso não autorizado aos sistemas</li>
                <li>Interferir com a operação normal dos serviços</li>
                <li>Violar direitos de propriedade intelectual</li>
                <li>Enviar spam ou conteúdo malicioso</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">4. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo, código, design e materiais fornecidos pela SAPIENTE.AI são protegidos por direitos de autor e propriedade intelectual. Você não pode reproduzir, distribuir ou modificar sem permissão expressa.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">5. Limitação de Responsabilidade</h2>
              <p>
                A SAPIENTE.AI não é responsável por danos indiretos, incidentais, especiais ou consequentes resultantes do uso ou incapacidade de usar os serviços, mesmo que tenha sido informada da possibilidade de tais danos.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">6. Garantia de Serviços</h2>
              <p>
                Os serviços são fornecidos "tal como estão" sem garantias de qualquer tipo, expressas ou implícitas. A SAPIENTE.AI não garante que os serviços serão ininterruptos, seguros ou livres de erros.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">7. Rescisão</h2>
              <p>
                A SAPIENTE.AI pode rescindir ou suspender o acesso aos serviços a qualquer momento, por qualquer motivo, com ou sem aviso prévio. Você também pode rescindir a qualquer momento.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">8. Modificações dos Termos</h2>
              <p>
                A SAPIENTE.AI reserva-se o direito de modificar estes termos a qualquer momento. As alterações entram em vigor quando publicadas. O uso continuado dos serviços após as alterações constitui aceitação dos novos termos.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">9. Lei Aplicável</h2>
              <p>
                Estes Termos de Serviço são regidos pelas leis de Portugal. Qualquer disputa será resolvida nos tribunais competentes de Portugal.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">10. Contacto</h2>
              <p>
                Para questões sobre estes termos, contacte-nos em: <strong>sapiente.ai.oficial@gmail.com</strong>
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
