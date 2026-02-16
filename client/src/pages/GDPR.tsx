/*
 * GDPR (General Data Protection Regulation) - Legal Compliance Page
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

export default function GDPR() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Content */}
      <main className="pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="container max-w-4xl">
          <AnimatedSection className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Data Protection Policy
            </h1>
            <p className="text-lg text-foreground/70">
              Last updated: February 12, 2026
            </p>
          </AnimatedSection>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                SAPIENTE.AI is committed to protecting your personal data. This Data Protection Policy explains how we collect, use, disclose and protect your information in compliance with the General Data Protection Law (LGPD) and applicable regulations.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">2. Data We Collect</h2>
              <p className="mb-4">We collect the following types of personal data:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact information (name, email, phone, company)</li>
                <li>Navigation data (cookies, IP address, browser type)</li>
                <li>Form information (inquiries, messages)</li>
                <li>Transaction data (if applicable)</li>
                <li>Communication information (emails, chats)</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">3. How We Use Your Data</h2>
              <p className="mb-4">We use your data to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send marketing communications (with consent)</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and abuse</li>
                <li>Behavioral analysis and experience optimization</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">4. Legal Basis for Processing</h2>
              <p className="mb-4">We process your data based on:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Explicit user consent</li>
                <li>Contract execution</li>
                <li>Compliance with legal obligations</li>
                <li>Legitimate interests of SAPIENTE.AI</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">5. Data Sharing</h2>
              <p>
                We do not sell, rent or share your personal data with third parties without your consent, except when necessary to comply with legal obligations or when trusted partners process data on our behalf under strict confidentiality agreements.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">6. Data Security</h2>
              <p>
                We implement robust technical and organizational security measures, including encryption, firewalls, access control and regular audits to protect your data against unauthorized access, alteration or destruction.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">7. Data Retention</h2>
              <p>
                We retain your data only as long as necessary for the purposes described in this policy or as required by law. After that period, data is securely deleted or anonymized.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">8. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete data ("right to be forgotten")</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
                <li>Object to processing</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">9. Contact Us</h2>
              <p>
                To exercise your rights or for questions about this policy, contact us at: <strong>sapiente.ai.oficial@gmail.com</strong>
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this policy periodically. We will notify you of significant changes by posting the new policy on this site and updating the "Last updated" date.
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
