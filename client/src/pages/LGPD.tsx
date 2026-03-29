import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Section } from "@/components/ui/section/Section";
import { TOC } from "@/components/ui/navigation/TOC";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { setSEOHead } from '@/components/SEOHead';

export default function LGPD() {

  useEffect(() => {
    setSEOHead({
      title: 'LGPD & GDPR - Proteção de Dados - SAPIENTE.AI',
      description: 'Conformidade LGPD e GDPR.',
      keywords: 'LGPD, GDPR, proteção de dados',
      url: 'https://sapienteai.com/lgpd',
      type: 'website'
    });
  }, []);

  const sections = [
    {
      id: "compliance",
      title: "1. Conformidade Regulatória",
      content:
        "A SAPIENTE.AI atua em conformidade com a LGPD (Lei nº 13.709/2018) e o RGPD (UE 2016/679), adotando práticas alinhadas às melhores referências internacionais."
    },
    {
      id: "ai",
      title: "2. Uso de Inteligência Artificial",
      content:
        "Utilizamos IA de forma responsável, garantindo explicabilidade, minimização de dados e supervisão humana quando necessário."
    },
    {
      id: "infrastructure",
      title: "3. Infraestrutura e Jurisdição",
      content:
        "Utilizamos exclusivamente ferramentas e provedores com conformidade própria em GDPR, com processamento em ambiente europeu (UE/EEA)."
    },
    {
      id: "vendors",
      title: "4. Subprocessadores",
      content:
        "Todos os parceiros passam por validação com DPA, SCC e critérios rigorosos de segurança."
    },
    {
      id: "storage",
      title: "5. Armazenamento e Proteção",
      content: [
        "Criptografia em trânsito e em repouso",
        "Arquitetura Zero Trust",
        "Segregação de dados",
        "Políticas de retenção seguras"
      ]
    },
    {
      id: "rights",
      title: "6. Direitos dos Titulares",
      content: [
        "Acesso e confirmação",
        "Correção",
        "Eliminação",
        "Portabilidade",
        "Revogação de consentimento"
      ]
    },
    {
      id: "security",
      title: "7. Segurança da Informação",
      content:
        "Controles alinhados a ISO 27001 e NIST, com monitoramento contínuo e auditorias periódicas."
    },
    {
      id: "governance",
      title: "8. Governança",
      content:
        "Processos estruturados garantem rastreabilidade e conformidade contínua."
    },
    {
      id: "incidents",
      title: "9. Incidentes",
      content:
        "Resposta estruturada com notificação conforme exigido por lei."
    },
    {
      id: "dpo",
      title: "10. DPO",
      content:
        "Responsável designado para proteção de dados e comunicação regulatória."
    },
    {
      id: "international",
      title: "11. Transferência Internacional",
      content:
        "Realizada com SCC e mecanismos legais adequados."
    },
    {
      id: "privacy",
      title: "15. Privacy by Design & Data Minimization",
      content:
        "A SAPIENTE.AI adota os princípios de Privacy by Design e Privacy by Default, garantindo que a coleta e o processamento de dados sejam limitados ao mínimo necessário para cada finalidade. Nossos sistemas são projetados desde a origem para reduzir exposição de dados, aplicar anonimização sempre que possível e evitar retenção desnecessária, assegurando conformidade contínua com os requisitos do GDPR e LGPD."
    },
    {
      id: "ai-ethics",
      title: "16. AI Ethics & Responsible AI",
      content:
        "A SAPIENTE.AI desenvolve e utiliza sistemas de Inteligência Artificial seguindo princípios de responsabilidade, transparência e controle humano. Garantimos que modelos não sejam utilizados para decisões automatizadas sensíveis sem supervisão adequada, evitando vieses, discriminação e uso indevido de dados."
    },
    {
      id: "retention",
      title: "12. Retenção",
      content:
        "Dados mantidos apenas pelo tempo necessário, seguindo princípios de minimização."
    },
    {
      id: "contact",
      title: "13. Contato",
      content:
        "Solicitações podem ser realizadas através dos canais oficiais."
    }
  ];

  const tocItems = sections.map(s => ({
    id: s.id,
    label: s.title.replace(/^\d+\.\s/, "")
  }));

  const activeId = useScrollSpy(sections.map(s => s.id));

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Header />

      {/* HERO */}
      <Section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto text-center">

          <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider">
            Documento Legal
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            LGPD & GDPR Compliance
          </h1>

          <p className="text-gray-600">
            Política de proteção de dados e conformidade internacional.
          </p>

        </div>
      </Section>

      {/* CONTENT */}
      <Section>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[220px_1fr] gap-16">

          {/* TOC */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <TOC items={tocItems} activeId={activeId} />
            </div>
          </aside>

          {/* DOCUMENT */}
          <div className="space-y-12">

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4">

                <h2 className="text-xl font-semibold">
                  {section.title}
                </h2>

                {Array.isArray(section.content) ? (
                  <ul className="list-disc ml-5 space-y-2 text-gray-600">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}

                <div className="border-b border-gray-200 pt-6" />

              </section>
            ))}

          </div>
        </div>
      </Section>

      <Footer />

    </div>
  );
}