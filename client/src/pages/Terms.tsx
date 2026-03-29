import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

import { setSEOHead } from '@/components/SEOHead';

export default function Termos() {

  useEffect(() => {
    setSEOHead({
      title: 'Termos de Serviço - SAPIENTE.AI',
      description: 'Condições de uso dos serviços SAPIENTE.AI.',
      url: 'https://sapienteai.com/terms',
      type: 'website'
    });
  }, []);

  const sections = [
    {
      title: "1. Aceitação dos Termos",
      content:
        "Ao aceder ou utilizar os serviços da SAPIENTE.AI, o utilizador declara ter lido, compreendido e concordado integralmente com os presentes Termos de Serviço."
    },
    {
      title: "2. Descrição dos Serviços",
      content:
        "A SAPIENTE.AI disponibiliza soluções tecnológicas baseadas em Inteligência Artificial, automação e consultoria estratégica, podendo estas evoluir ou ser alteradas ao longo do tempo."
    },
    {
      title: "3. Elegibilidade e Uso",
      content: [
        "Utilizar os serviços apenas para fins legais",
        "Fornecer informações verdadeiras e atualizadas",
        "Não interferir com a segurança ou integridade dos sistemas",
        "Não utilizar os serviços para fins abusivos ou ilícitos"
      ]
    },
    {
      title: "4. Propriedade Intelectual",
      content:
        "Todos os conteúdos, algoritmos, modelos e sistemas disponibilizados são propriedade exclusiva da SAPIENTE.AI, sendo proibida a sua reprodução, modificação ou redistribuição sem autorização expressa."
    },
    {
      title: "5. Dados e Privacidade",
      content:
        "O tratamento de dados pessoais é realizado de acordo com a Política de Privacidade, em conformidade com o RGPD e LGPD."
    },
    {
      title: "6. Uso de Inteligência Artificial",
      content:
        "Os serviços podem envolver sistemas de IA, sendo responsabilidade do utilizador validar decisões críticas e não depender exclusivamente de outputs automatizados."
    },
    {
      title: "7. Disponibilidade e SLA",
      content:
        "A SAPIENTE.AI envida esforços para garantir disponibilidade contínua dos serviços, não garantindo, contudo, ausência de interrupções, especialmente em casos de manutenção ou fatores externos."
    },
    {
      title: "8. Limitação de Responsabilidade",
      content:
        "Na máxima extensão permitida por lei, a SAPIENTE.AI não será responsável por danos indiretos, incidentais ou consequenciais decorrentes da utilização dos serviços."
    },
    {
      title: "9. Indemnização",
      content:
        "O utilizador concorda em indemnizar a SAPIENTE.AI por quaisquer danos, responsabilidades ou custos decorrentes da utilização indevida dos serviços."
    },
    {
      title: "10. Modificações dos Termos",
      content:
        "A SAPIENTE.AI reserva-se o direito de atualizar estes termos a qualquer momento, sendo as alterações comunicadas através do website."
    },
    {
      title: "11. Suspensão e Cancelamento",
      content:
        "A SAPIENTE.AI poderá suspender ou encerrar o acesso aos serviços em caso de violação destes termos."
    },
    {
      title: "12. Lei Aplicável",
      content:
        "Os presentes termos são regidos pelas legislações aplicáveis em Portugal e, quando relevante, no Brasil."
    },
    {
      title: "13. Disposições Gerais",
      content:
        "Caso alguma disposição seja considerada inválida, as restantes permanecerão em pleno vigor."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">

      <Header />
      <Breadcrumb />

      {/* HERO */}
      <section className="pt-32 pb-16 text-center">
        <div className="container max-w-3xl">

          <a href="/" className="inline-block mb-6 text-gray-400 hover:text-gray-900 transition">
            <ArrowLeft className="h-5 w-5" />
          </a>

          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Termos de Serviço
          </h1>

          <p className="text-gray-500">
            Última atualização: 16 de Fevereiro de 2026
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <main className="flex-grow pb-24">
        <div className="container max-w-4xl space-y-12">

          {sections.map((section, i) => (
            <section key={i} className="space-y-3">

              <h2 className="text-xl font-semibold">
                {section.title}
              </h2>

              {Array.isArray(section.content) ? (
                <ul className="list-disc ml-5 space-y-2 text-gray-600">
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
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
      </main>

      <Footer />
    </div>
  );
}