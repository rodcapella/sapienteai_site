/**
 * SAPIENTE.AI Homepage - Complete Redesign
 * Positioning: LABORATÓRIO DE INOVAÇÃO TECNOLÓGICA E INTELIGÊNCIA DIGITAL APLICADA
 * Design Philosophy: Minimalist, technological, institutional
 * Focus: Innovation laboratory, not marketing agency
 */

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Smartphone, Globe, Zap, Brain, BarChart3, Sparkles, ChevronDown } from "lucide-react";
import ContactModal from '@/components/ContactModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/hooks/useTranslation';
import { setSEOHead } from '@/components/SEOHead';
import AppDownloadButtons from '@/components/AppDownloadButtons';

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

interface FAQItem {
  question: string;
  answer: string;
}

export default function Home() {
  const { t } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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
      title: 'SAPIENTE.AI - Laboratório de Inovação Tecnológica | IA Aplicada',
      description: 'Laboratório de inovação que desenvolve aplicações, sistemas inteligentes, automações e estratégias digitais. Engenharia de software + IA como ferramenta técnica.',
      keywords: 'laboratório inovação, IA aplicada, desenvolvimento software, sistemas inteligentes, automação, estratégia digital, engenharia',
      url: 'https://sapiente-ai.manus.space',
      type: 'website'
    });
  }, []);

  const areasOfExpertise = [
    {
      title: 'Engenharia e Desenvolvimento',
      items: ['Aplicações Mobile', 'Plataformas Web', 'Projetos chave na mão'],
      icon: Code2
    },
    {
      title: 'Sistemas Inteligentes',
      items: ['Algoritmos personalizados', 'Sistemas de scoring', 'Motores de recomendação'],
      icon: Brain
    },
    {
      title: 'Automação de Processos',
      items: ['Workflows inteligentes', 'Otimização operacional', 'Integração de sistemas'],
      icon: Zap
    },
    {
      title: 'Marketing e Inteligência Digital',
      items: ['Gestão estratégica de redes', 'SEO avançado', 'GEO e AEO'],
      icon: BarChart3
    }
  ];

  const portfolioItems = [
    {
      name: 'Simulador IR',
      description: 'Aplicativo inteligente para cálculo de Imposto de Renda',
      features: [
        'Validação automatizada da legislação brasileira',
        'Motor de cálculo estruturado',
        'Automatização normativa com apoio de IA'
      ],
      stats: '100K+ Downloads',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      name: 'CupãoMania',
      description: 'Plataforma inteligente de cupons e descontos',
      features: [
        'Sistema de scoring avançado',
        'Algoritmo de recomendação',
        'Estrutura escalável'
      ],
      stats: 'Em desenvolvimento',
      color: 'from-purple-600 to-pink-500'
    },
    {
      name: 'ScanMyName',
      description: 'Análise de pegada digital e reputação online',
      features: [
        'Análise de pegada digital',
        'Sistema de scoring de reputação',
        'Monitorização pública'
      ],
      stats: '50K+ Usuários',
      color: 'from-emerald-600 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onContactClick={() => setIsContactOpen(true)} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/nJNdvNUoutu5GjhQkzulAU-img-1_1771535875000_na1fn_aGVyby1sYWJvcmF0b3J5LWlubm92YXRpb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L25KTmR2TlVvdXR1NUdqaFFrenVsQVUtaW1nLTFfMTc3MTUzNTg3NTAwMF9uYTFmbl9hR1Z5Ynkxc1lXSnZjbUYwYjNKNUxXbHVibTkyWVhScGIyNC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=QfQSHTf4tBXfOiiFO7FlyWkQtsOvaJZy6aOpQlVt~hGPuyPQLzCEsKAM3eBCae0rz4onBa6A-tTStYlow0H79wQ0ZvjcHkWcDs1uI3XC8Qd2KRZa4OJJXsPR9GGY1DRmRWS3JfqZl06JvTOpcpCIBqkxfZoiqQxTT0JXC4WcDU0WuTXpsYZUMxaJh489ZF7AC8JVxROIE6voaZyfGvyG9-QcLo0D-5Q1Yk7rq7MUAHoLmyR1joDFOHk5G4c2kER20DK16G5-z48rnx~ufpMAU2nRGmIO26cswfVzjPzU8achcIPEeXIY9b22q7i0HPNRHSU4hyUmLp9NSW5NxDN6Vw__)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Transformamos tecnologia e inteligência digital em vantagem estratégica.
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            A Sapiente.AI é um laboratório de inovação tecnológica que desenvolve aplicações, sistemas inteligentes, automações e estratégias digitais orientadas a dados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg h-auto font-semibold"
            >
              Solicitar Diagnóstico Estratégico
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg h-auto font-semibold"
            >
              Explorar Portfólio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Quem Somos
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Somos um laboratório de inovação tecnológica dedicado a transformar desafios empresariais em oportunidades de crescimento através de soluções digitais inteligentes e sustentáveis.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                    Engenharia Primeiro
                  </h3>
                  <p className="text-muted-foreground">
                    A IA é uma ferramenta de apoio técnico, não um substituto de engenharia sólida. Combinamos arquitetura de software robusta com inteligência artificial aplicada.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-3">
                    <Brain className="h-6 w-6 text-blue-600" />
                    Supervisão Especializada
                  </h3>
                  <p className="text-muted-foreground">
                    Cada solução é desenvolvida com supervisão especializada, garantindo qualidade, segurança e conformidade com regulamentações como LGPD e GDPR.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Áreas de Atuação
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expertise consolidada em desenvolvimento, inteligência artificial, automação e estratégia digital.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {areasOfExpertise.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <Icon className="h-8 w-8 text-blue-600" />
                      <h3 className="text-xl font-semibold text-foreground">
                        {area.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {area.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-muted-foreground">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Portfólio de Sucesso
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Soluções desenvolvidas e implementadas com sucesso.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {portfolioItems.map((item, idx) => (
                <div key={idx} className="group overflow-hidden rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${item.color} p-8 text-white`}>
                    <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                    <p className="text-sm opacity-90">{item.stats}</p>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    <p className="text-muted-foreground">{item.description}</p>
                    
                    <div className="space-y-3">
                      {item.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <span className="text-blue-600 font-bold mt-1">✓</span>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* App Download Buttons */}
                    {idx === 0 && (
                      <div className="pt-4 border-t border-gray-200">
                        <AppDownloadButtons 
                          appName={item.name}
                          playStoreUrl="https://play.google.com/store/apps/details?id=com.sapiente.simulador_ir"
                          appStoreUrl="https://apps.apple.com/br/app/simulador-ir/id1234567890"
                        />
                      </div>
                    )}
                    {idx === 2 && (
                      <div className="pt-4 border-t border-gray-200">
                        <AppDownloadButtons 
                          appName={item.name}
                          playStoreUrl="https://play.google.com/store/apps/details?id=com.sapiente.scanmyname"
                          appStoreUrl="https://apps.apple.com/br/app/scanmyname/id0987654321"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ECOSSISTEMA DE PRODUTOS */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ecossistema de Produtos
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Todos os nossos produtos estão disponíveis nas principais plataformas de distribuição digital.
            </p>

            <div className="bg-white p-12 rounded-lg border border-gray-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Baixe nossos aplicativos
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Acesse a página oficial do developer Sapiente.AI para explorar todos os produtos.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://play.google.com/store/apps/developer?id=Sapiente.AI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.609 22.186a1.5 1.5 0 0 1-2.131 0l-.001-.001a1.5 1.5 0 0 1 0-2.121L10.55 12 1.477 3.936a1.5 1.5 0 0 1 0-2.121l.001-.001a1.5 1.5 0 0 1 2.131 0z"/>
                    </svg>
                    Google Play
                  </a>
                  <a 
                    href="https://apps.apple.com/app/sapiente-ai/id0000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 13.5c-.91 0-1.82.55-2.25 1.51.93.64 1.54 1.62 1.54 2.76 0 .59-.13 1.15-.37 1.65.46.3.99.47 1.55.47 1.93 0 3.5-1.57 3.5-3.5S18.98 13.5 17.05 13.5zM6.5 13c-1.93 0-3.5 1.57-3.5 3.5S4.57 20 6.5 20s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0-12C2.91 1 0 3.91 0 7.5S2.91 14 6.5 14s6.5-2.91 6.5-6.5S10.09 1 6.5 1z"/>
                    </svg>
                    App Store
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 md:py-32 bg-blue-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para Transformar sua Empresa?
            </h2>
            <p className="text-lg text-white/90 mb-12">
              Agende uma reunião com nossos especialistas e descubra como podemos gerar resultados reais no seu negócio.
            </p>
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg h-auto font-semibold"
            >
              Solicitar Diagnóstico Estratégico
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
