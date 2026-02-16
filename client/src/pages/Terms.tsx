/*
 * Terms of Service - Termos de Serviço Page
 * English version
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

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Content */}
      <main className="pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="container max-w-4xl">
          <AnimatedSection className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-foreground/70">
              Last updated: February 12, 2026
            </p>
          </AnimatedSection>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the SAPIENTE.AI website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our services.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">2. Description of Services</h2>
              <p>
                SAPIENTE.AI provides Artificial Intelligence solutions, Machine Learning, Intelligent Automation and Strategic Consulting for companies. Services are provided as described on the website and in specific agreements with customers.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">3. Acceptable Use</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the services for illegal or harmful purposes</li>
                <li>Transmit offensive, abusive or discriminatory content</li>
                <li>Attempt to gain unauthorized access to systems</li>
                <li>Interfere with the normal operation of services</li>
                <li>Violate intellectual property rights</li>
                <li>Send spam or malicious content</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">4. Intellectual Property</h2>
              <p>
                All content, code, design and materials provided by SAPIENTE.AI are protected by copyright and intellectual property rights. You may not reproduce, distribute or modify without express permission.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">5. Limitation of Liability</h2>
              <p>
                SAPIENTE.AI is not responsible for indirect, incidental, special or consequential damages resulting from the use or inability to use the services, even if informed of the possibility of such damages.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">6. Service Warranty</h2>
              <p>
                Services are provided "as is" without warranties of any kind, express or implied. SAPIENTE.AI does not warrant that services will be uninterrupted, secure or error-free.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">7. Termination</h2>
              <p>
                SAPIENTE.AI may terminate or suspend access to services at any time, for any reason, with or without prior notice. You may also terminate at any time.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">8. Modifications to Terms</h2>
              <p>
                SAPIENTE.AI reserves the right to modify these terms at any time. Changes take effect when published. Continued use of services after changes constitutes acceptance of the new terms.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">9. Applicable Law</h2>
              <p>
                These Terms of Service are governed by the laws of Portugal. Any dispute will be resolved in the competent courts of Portugal.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">10. Contact</h2>
              <p>
                For questions about these terms, contact us at: <strong>sapiente.ai.oficial@gmail.com</strong>
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
                ← Back
              </Button>
              <a href="/" className="inline-block">
                <Button className="bg-primary text-white hover:bg-primary/90 border-2 border-primary">
                  Go to Home
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
