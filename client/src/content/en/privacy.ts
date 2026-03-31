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

export default function Privacy() {

  useEffect(() => {
    setSEOHead({
      title: 'Privacy Policy - SAPIENTE.AI',
      description: 'SAPIENTE.AI Privacy Policy. GDPR and LGPD compliance. Personal data protection.',
      keywords: 'privacy, GDPR, LGPD, data protection',
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
              Privacy Policy
            </h1>

            <p className="text-white/70">
              Last updated: February 16, 2026
            </p>
          </AnimatedSection>

        </div>
      </section>

      {/* CONTENT */}
      <main className="flex-grow py-20">
        <div className="container max-w-4xl space-y-16 text-slate-700 leading-relaxed">

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. General Overview</h2>
            <p>
              SAPIENTE.AI is committed to protecting personal data and operates in full compliance
              with the General Data Protection Regulation (GDPR) and the Brazilian General Data Protection Law (LGPD).
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Personal Data Collected</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Identification data (name, email, phone)</li>
              <li>Professional information (company, role)</li>
              <li>Technical data (IP address, device, browsing behavior)</li>
              <li>Service usage data</li>
            </ul>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Purpose of Processing</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Service delivery and improvement</li>
              <li>Customer relationship management</li>
              <li>Compliance with legal obligations</li>
              <li>Security and fraud prevention</li>
            </ul>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Legal Basis</h2>
            <p>
              Data processing is based on consent, contract execution, legal obligations,
              and legitimate interest.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Sharing</h2>
            <p>
              SAPIENTE.AI works exclusively with providers that comply with GDPR,
              supported by Data Processing Agreements (DPA) and appropriate legal safeguards.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. International Transfers</h2>
            <p>
              International data transfers are carried out using legal mechanisms such as
              Standard Contractual Clauses (SCC), ensuring adequate protection levels.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Information Security</h2>
            <p>
              Technical and organizational measures are implemented in line with international standards,
              including encryption, access control, and continuous monitoring.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              8. Privacy by Design & Data Minimization
            </h2>
            <p>
              Systems are designed based on Privacy by Design and Privacy by Default principles,
              ensuring that only the minimum necessary data is processed.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Data Retention</h2>
            <p>
              Personal data is retained only for as long as necessary to fulfill its intended purposes.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Data Subject Rights</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Access, correction, and deletion</li>
              <li>Restriction and objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
          </AnimatedSection>

          {/* 🔥 ENTERPRISE CLAUSES */}

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Records & Audit</h2>
            <p>
              Records of processing activities are maintained to ensure traceability,
              auditability, and ongoing compliance.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Impact Assessments (DPIA)</h2>
            <p>
              Where applicable, Data Protection Impact Assessments are conducted to mitigate risks,
              especially in AI-based systems.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Accountability</h2>
            <p>
              SAPIENTE.AI implements control mechanisms, documentation, and governance processes
              to demonstrate continuous compliance with GDPR and LGPD.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              14. European Infrastructure & Compliance
            </h2>
            <p>
              SAPIENTE.AI prioritizes providers with infrastructure in the European Union or with
              equivalent data protection guarantees, ensuring international compliance.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">15. Contact</h2>
            <p>
              To exercise your rights or request further information, you may contact SAPIENTE.AI
              through official channels available on the website.
            </p>
          </AnimatedSection>

        </div>
      </main>

      <Footer />
    </div>
  );
}
