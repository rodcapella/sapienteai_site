import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

import { useTranslation } from '@/hooks/useTranslation';
import { setSEOHead } from '@/components/SEOHead';

export default function Termos() {
  const { t } = useTranslation();

  useEffect(() => {
    setSEOHead({
      title: 'Termos de Servico - SAPIENTE.AI',
      description: 'Condições de uso dos serviços SAPIENTE.AI.',
      url: 'https://sapienteai.com/termos',
      type: 'website'
    });
  }, []);

  return (
    <div className="
      min-h-screen
      bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)]
      text-white
      flex flex-col
      relative
      overflow-hidden
    ">

      {/* BG GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      <Header />
      <Breadcrumb />

      {/* HERO */}
      <section className="pt-32 pb-16 text-center">
        <div className="container max-w-3xl">

          <a href="/" className="inline-block mb-6 text-white/50 hover:text-white transition">
            <ArrowLeft className="h-5 w-5" />
          </a>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {t('legal.terms.title')}
          </h1>

          <p className="text-white/50">
            {t('legal.terms.lastUpdated')} 16 de Fevereiro de 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="flex-grow pb-24">
        <div className="container max-w-4xl space-y-8">

          {[
            {
              title: 'Aceitação dos Termos',
              content: 'Ao utilizar os serviços da SAPIENTE.AI, você concorda com estes termos.'
            },
            {
              title: 'Descrição dos Serviços',
              content: 'Oferecemos soluções de IA, automação e consultoria estratégica.'
            },
            {
              title: 'Responsabilidades do Usuário',
              content: `
              • Fornecer informações corretas  
              • Utilizar os serviços de forma legal  
              • Não contornar sistemas de segurança  
              `
            },
            {
              title: 'Propriedade Intelectual',
              content: 'Todo o conteúdo pertence à SAPIENTE.AI e não pode ser reutilizado sem autorização.'
            },
            {
              title: 'Limitação de Responsabilidade',
              content: 'Não nos responsabilizamos por danos indiretos decorrentes do uso do serviço.'
            },
            {
              title: 'Modificações',
              content: 'Os termos podem ser atualizados a qualquer momento.'
            },
            {
              title: 'Lei Aplicável',
              content: 'Regido pelas leis de Portugal e Brasil.'
            }
          ].map((section, i) => (

            <div
              key={i}
              className="
                bg-white/[0.03]
                backdrop-blur-xl
                border border-white/10
                rounded-2xl
                p-6 md:p-8

                transition-all duration-300
                hover:border-cyan-400/30
                hover:shadow-[0_0_60px_rgba(0,255,255,0.08)]
              "
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-3 flex gap-3">
                <span className="text-cyan-400">{i + 1}.</span>
                {section.title}
              </h2>

              <p className="text-white/60 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>

          ))}

        </div>
      </main>

      <Footer />
    </div>
  );
}
