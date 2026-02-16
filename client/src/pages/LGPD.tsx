import { ArrowLeft } from 'lucide-react';
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

export default function LGPD() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <a href="/" className="text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              LGPD - Lei Geral de Proteção de Dados
            </h1>
            <p className="text-lg text-white/70">
              Última atualização: 16 de Fevereiro de 2026
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <main className="flex-grow py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="space-y-12 text-slate-700 leading-relaxed">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-cyan-500">1.</span> Conformidade LGPD
              </h2>
              <p className="text-slate-600">
                SAPIENTE.AI está em conformidade total com a Lei Geral de Proteção de Dados (LGPD) brasileira.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
