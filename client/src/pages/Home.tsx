/**
 * SAPIENTE.AI Homepage - Modern Tech-Forward Design
 * Focus on Values, Mission, Vision, and Products
 * Design: Dark blue tones, white accents, technological aesthetic
 */

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Trophy, Handshake, Target, Zap, Brain, BarChart3, Sparkles } from "lucide-react";
import ContactModal from '@/components/ContactModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadButtons from '@/components/AppDownloadButtons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/hooks/useTranslation';
import { setSEOHead } from '@/components/SEOHead';

// Animated Section Wrapper
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Listen for contact modal open event from Footer
  useEffect(() => {
    const handleOpenContactModal = () => {
      setIsContactOpen(true);
    };
    window.addEventListener('openContactModal', handleOpenContactModal);
    return () => window.removeEventListener('openContactModal', handleOpenContactModal);
  }, []);

  useEffect(() => {
    setSEOHead({
      title: 'SAPIENTE.AI - Inteligência Artificial Aplicada | Transformação Digital',
      description: 'Soluções de IA aplicada para empresas. Transformação digital, automação inteligente e resultados mensuráveis.',
      keywords: 'IA, inteligência artificial, transformação digital, automação, machine learning, consultoria IA',
      url: 'https://sapiente-ai.manus.space',
      type: 'website'
    });
  }, []);

  const values = [
    {
      icon: Lightbulb,
      title: t('values.innovation'),
      description: t('values.innovation.desc')
    },
    {
      icon: Trophy,
      title: t('values.excellence'),
      description: t('values.excellence.desc')
    },
    {
      icon: Handshake,
      title: t('values.partnership'),
      description: t('values.partnership.desc')
    },
    {
      icon: Target,
      title: t('values.results'),
      description: t('values.results.desc')
    }
  ];

  const products = [
    {
      name: 'Simulador IR',
      description: 'Aplicativo inteligente para cálculo de Imposto de Renda',
      features: [
        'Validação automatizada da legislação',
        'Motor normativo estruturado',
        'Automatização com apoio de IA'
      ],
      stats: '100K+ Downloads',
      color: 'from-blue-600 to-cyan-500',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sapiente.simulador_ir',
      appStoreUrl: 'https://apps.apple.com/br/app/simulador-ir/id1234567890'
    },
    {
      name: 'CupãoMania',
      description: 'Plataforma de gestão de cupons e promoções',
      features: [
        'Análise inteligente de ofertas',
        'Integração com múltiplos varejistas',
        'Recomendações personalizadas'
      ],
      stats: '50K+ Usuários',
      color: 'from-purple-600 to-pink-500',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sapiente.cupaomania',
      appStoreUrl: 'https://apps.apple.com/br/app/cupaomania/id1234567891'
    },
    {
      name: 'ScanMyName',
      description: 'Verificador inteligente de disponibilidade de nomes',
      features: [
        'Busca em múltiplas plataformas',
        'Análise de similaridade',
        'Sugestões alternativas'
      ],
      stats: '30K+ Buscas',
      color: 'from-green-600 to-emerald-500',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sapiente.scanmyname',
      appStoreUrl: 'https://apps.apple.com/br/app/scanmyname/id1234567892'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 min-h-screen">
      <Header />

      <div className="bg-red-500 text-white p-10 text-2xl">
        TESTE TAILWIND
      </div>

      {/* HERO SECTION */}
      <section className="pt-20 md:pt-32 pb-24 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <AnimatedSection className="text-center">
            <p className="text-cyan-400 font-semibold mb-4 text-sm md:text-base uppercase tracking-wider">
              {t('hero.subtitle')}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              {t('hero.tagline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg h-auto font-semibold"
              >
                {t('hero.cta1')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 text-lg h-auto font-semibold"
              >
                {t('hero.cta2')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-24 md:py-32 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <p className="text-cyan-400 font-semibold mb-4 uppercase tracking-wider text-sm">
              {t('values.label')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('values.title')}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={idx} className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-800/50 rounded-lg p-8 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{value.description}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <AnimatedSection className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 border border-blue-800/50 rounded-lg p-12">
              <p className="text-cyan-400 font-semibold mb-4 uppercase tracking-wider text-sm">
                {t('mission.label')}
              </p>
              <h3 className="text-3xl font-bold text-white mb-6">{t('mission.title')}</h3>
              <p className="text-slate-300 text-lg leading-relaxed">{t('mission.desc')}</p>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-800/50 rounded-lg p-12">
              <p className="text-cyan-400 font-semibold mb-4 uppercase tracking-wider text-sm">
                {t('vision.label')}
              </p>
              <h3 className="text-3xl font-bold text-white mb-6">{t('vision.title')}</h3>
              <p className="text-slate-300 text-lg leading-relaxed">{t('vision.desc')}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 md:py-32 px-4 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="text-cyan-400 font-semibold mb-4 uppercase tracking-wider text-sm">
              {t('services.label')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('services.title')}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              {t('services.description')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, key: 'services.ml' },
              { icon: Zap, key: 'services.automation' },
              { icon: BarChart3, key: 'services.consulting' }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <AnimatedSection key={idx} className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-800/50 rounded-lg p-8 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{t(`${service.key}`)}</h3>
                  <p className="text-slate-300 mb-6">{t(`${service.key}.desc`)}</p>
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2">
                    {t('services.more')} <ArrowRight className="h-4 w-4" />
                  </a>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <p className="text-cyan-400 font-semibold mb-4 uppercase tracking-wider text-sm">
              {t('portfolio.label')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('portfolio.title')}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              {t('portfolio.description')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <AnimatedSection key={idx} className="group">
                <div className={`bg-gradient-to-br ${product.color} rounded-lg p-8 text-white mb-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Sparkles className="h-32 w-32 absolute -top-8 -right-8" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-white/90 mb-4">{product.description}</p>
                    <div className="text-sm text-white/80">{product.stats}</div>
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, fidx) => (
                      <li key={fidx} className="text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <AppDownloadButtons 
                    appName={product.name}
                    playStoreUrl={product.playStoreUrl}
                    appStoreUrl={product.appStoreUrl}
                    className="flex flex-col gap-3"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Button 
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg h-auto font-semibold"
            >
              {t('portfolio.more')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-slate-300 mb-12">
              {t('cta.description')}
            </p>
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg h-auto font-semibold"
            >
              {t('cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      {!isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
