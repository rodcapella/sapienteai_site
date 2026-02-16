/*
 * Privacy Policy - Política de Privacidade Page
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

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Content */}
      <main className="pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="container max-w-4xl">
          <AnimatedSection className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-foreground/70">
              Last updated: February 12, 2026
            </p>
          </AnimatedSection>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">1. Overview</h2>
              <p>
                SAPIENTE.AI respects your privacy and is committed to being transparent about how we collect, use and protect your personal data. This Privacy Policy describes our privacy practices.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="mb-4">We may collect the following information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Contact Information:</strong> Name, email, phone, address, company</li>
                <li><strong>Navigation Information:</strong> IP address, browser type, pages visited, time spent</li>
                <li><strong>Cookies and Similar Technologies:</strong> To improve user experience</li>
                <li><strong>Form Information:</strong> Data you voluntarily submit</li>
                <li><strong>Communication Information:</strong> Content of emails and messages</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">3. How We Use Information</h2>
              <p className="mb-4">We use information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send updates and marketing communications</li>
                <li>Personalize your experience</li>
                <li>Data analysis and website optimization</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">4. Cookies</h2>
              <p>
                We use cookies to improve your experience. Cookies are small files stored on your device. You can control cookie preferences in your browser settings. Some cookies are essential for website functionality.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">5. Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share information with trusted partners who help us provide services, under strict confidentiality agreements. We may also disclose information when required by law.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">6. Data Security</h2>
              <p>
                We implement technical and organizational security measures to protect your data against unauthorized access, alteration or destruction. We use SSL/TLS encryption, firewalls and strict access control.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">7. Data Retention</h2>
              <p>
                We retain your data only as long as necessary for the purposes described. You can request deletion of your data at any time, subject to legal retention obligations.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">8. Your Rights</h2>
              <p className="mb-4">You have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Right to access your data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to be forgotten (deletion)</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
                <li>Right to object to processing</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">9. External Links</h2>
              <p>
                Our website may contain links to external sites. We are not responsible for third-party privacy policies. We recommend that you review the privacy policies of any website you visit.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">10. Contact Us</h2>
              <p>
                For questions about this Privacy Policy or to exercise your rights, contact us at: <strong>sapiente.ai.oficial@gmail.com</strong>
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this policy periodically. We will notify you of significant changes by posting the new policy on this website.
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
