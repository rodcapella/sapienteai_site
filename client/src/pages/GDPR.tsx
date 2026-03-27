import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";

export default function GDPR() {
  return (
    <div className="
      min-h-screen
      bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)]
      text-white
      relative
      overflow-hidden
    ">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      <Header />

      {/* HERO */}
      <Section>
        <SectionHeader>
          <SectionTitle
            label="Legal"
            title="Data Protection Policy"
          />
        </SectionHeader>

        <div className="text-slate-400 text-center max-w-2xl mx-auto">
          <p>Last updated: February 12, 2026</p>
        </div>
      </Section>

      {/* CONTENT */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-6">

          {/* INTRO */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-slate-400">
              SAPIENTE.AI is committed to protecting your personal data. This policy explains how we collect, use and protect your information.
            </p>
          </SectionCard>

          {/* DATA */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">2. Data We Collect</h2>
            <ul className="text-slate-400 space-y-2 list-disc ml-5">
              <li>Contact information (name, email, phone)</li>
              <li>Navigation data (cookies, IP)</li>
              <li>Form submissions</li>
              <li>Transaction data</li>
              <li>Communication data</li>
            </ul>
          </SectionCard>

          {/* USAGE */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Data</h2>
            <ul className="text-slate-400 space-y-2 list-disc ml-5">
              <li>Provide services</li>
              <li>Respond to requests</li>
              <li>Marketing (with consent)</li>
              <li>Legal compliance</li>
              <li>Fraud prevention</li>
            </ul>
          </SectionCard>

          {/* LEGAL BASIS */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">4. Legal Basis</h2>
            <ul className="text-slate-400 space-y-2 list-disc ml-5">
              <li>User consent</li>
              <li>Contract execution</li>
              <li>Legal obligations</li>
              <li>Legitimate interests</li>
            </ul>
          </SectionCard>

          {/* SHARING */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">5. Data Sharing</h2>
            <p className="text-slate-400">
              We do not sell your data. Sharing only occurs when legally required or with trusted partners.
            </p>
          </SectionCard>

          {/* SECURITY */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">6. Security</h2>
            <p className="text-slate-400">
              We use encryption, access control and monitoring to protect your data.
            </p>
          </SectionCard>

          {/* RETENTION */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">7. Retention</h2>
            <p className="text-slate-400">
              Data is stored only as long as necessary and then securely deleted.
            </p>
          </SectionCard>

          {/* RIGHTS */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
            <ul className="text-slate-400 space-y-2 list-disc ml-5">
              <li>Access data</li>
              <li>Correct data</li>
              <li>Delete data</li>
              <li>Restrict processing</li>
              <li>Portability</li>
              <li>Withdraw consent</li>
            </ul>
          </SectionCard>

          {/* CONTACT */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">9. Contact</h2>
            <p className="text-slate-400">
              sapiente.ai.oficial@gmail.com
            </p>
          </SectionCard>

          {/* CHANGES */}
          <SectionCard>
            <h2 className="text-xl font-semibold mb-3">10. Updates</h2>
            <p className="text-slate-400">
              This policy may change over time. Updates will be published here.
            </p>
          </SectionCard>

        </div>
      </Section>

      {/* ACTIONS */}
      <Section className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <a href="/">
            <Button>
              Go to Home
            </Button>
          </a>

        </div>
      </Section>

      <Footer />
    </div>
  );
}