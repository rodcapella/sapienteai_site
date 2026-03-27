import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { TOC } from "@/components/ui/navigation/TOC";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { setSEOHead } from '@/components/SEOHead';

export default function LGPD() {

  useEffect(() => {
    setSEOHead({
      title: 'LGPD & RGPD - Protecao de Dados - SAPIENTE.AI',
      description: 'Conformidade LGPD e GDPR.',
      keywords: 'LGPD, GDPR, protecao de dados',
      url: 'https://sapienteai.com/lgpd',
      type: 'website'
    });
  }, []);

  const tocItems = [
    { id: "compliance", label: "Conformidade" },
    { id: "storage", label: "Armazenamento" },
    { id: "rights", label: "Direitos" },
    { id: "legal", label: "Bases Legais" },
    { id: "security", label: "Segurança" },
    { id: "dpo", label: "DPO" },
    { id: "incidents", label: "Incidentes" },
    { id: "contact", label: "Contato" }
  ];

  const activeId = useScrollSpy(tocItems.map(i => i.id));

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
            title="LGPD & GDPR Compliance"
          />
        </SectionHeader>

        <div className="text-center max-w-2xl mx-auto text-slate-400">
          <p>
            Proteção de dados com conformidade total entre Brasil e Europa.
          </p>
        </div>
      </Section>

      {/* CONTENT + TOC */}
      <Section>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[250px_1fr] gap-12">

          {/* TOC */}
          <div className="hidden md:block">
            <TOC items={tocItems} activeId={activeId} />
          </div>

          {/* CONTENT */}
          <div className="space-y-6">

            <SectionCard id="compliance">
              <h2 className="text-xl font-semibold mb-3">1. Conformidade LGPD & RGPD</h2>
              <p className="text-slate-400">
                SAPIENTE.AI está em conformidade com LGPD e RGPD, garantindo proteção de dados em múltiplas jurisdições.
              </p>
            </SectionCard>

            <SectionCard id="storage">
              <h2 className="text-xl font-semibold mb-3">2. Armazenamento de Dados</h2>
              <ul className="text-slate-400 space-y-2 list-disc ml-5">
                <li>Criptografia end-to-end</li>
                <li>ISO 27001</li>
                <li>DPA com fornecedores</li>
                <li>Transferências seguras (SCC)</li>
              </ul>
            </SectionCard>

            <SectionCard id="rights">
              <h2 className="text-xl font-semibold mb-3">3. Direitos dos Titulares</h2>
              <ul className="text-slate-400 space-y-2 list-disc ml-5">
                <li>Acesso</li>
                <li>Correção</li>
                <li>Exclusão</li>
                <li>Portabilidade</li>
              </ul>
            </SectionCard>

            <SectionCard id="legal">
              <h2 className="text-xl font-semibold mb-3">4. Bases Legais</h2>
              <p className="text-slate-400">
                Consentimento, contrato, obrigação legal e interesse legítimo.
              </p>
            </SectionCard>

            <SectionCard id="security">
              <h2 className="text-xl font-semibold mb-3">5. Segurança</h2>
              <p className="text-slate-400">
                Criptografia, auditorias contínuas e proteção avançada.
              </p>
            </SectionCard>

            <SectionCard id="dpo">
              <h2 className="text-xl font-semibold mb-3">6. DPO</h2>
              <p className="text-slate-400">
                Responsável dedicado à proteção de dados.
              </p>
            </SectionCard>

            <SectionCard id="incidents">
              <h2 className="text-xl font-semibold mb-3">7. Incidentes</h2>
              <p className="text-slate-400">
                Notificação conforme exigências legais.
              </p>
            </SectionCard>

            <SectionCard id="contact">
              <h2 className="text-xl font-semibold mb-3">8. Contato</h2>
              <p className="text-slate-400">
                Entre em contato via site para exercer seus direitos.
              </p>
            </SectionCard>

          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}