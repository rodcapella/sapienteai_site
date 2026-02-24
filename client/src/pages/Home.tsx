/**
 * SAPIENTE.AI Homepage - Intermediate Positioning
 * Between: Innovation Laboratory + Strategic Digital Transformation Partner
 * Tone: Portuguese corporate, institutional, technical
 * Design Philosophy: Minimalist, technological, institutional
 */

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Smartphone, Globe, Zap, Brain, BarChart3, Sparkles, Building2, Shield, Cpu } from "lucide-react";
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
      title: 'SAPIENTE.AI - Laboratório de Inovação | Transformação Digital para PME',
      description: 'Laboratório de inovação tecnológica com produtos próprios. Parceiro estratégico em transformação digital, sistemas inteligentes e automação para organizações.',
      keywords: 'laboratório inovação, transformação digital, sistemas inteligentes, automação, PME, engenharia software, IA aplicada',
      url: 'https://sapiente-ai.manus.space',
      type: 'website'
    });
  }, []);

  const areasOfExpertise = [
    {
      title: 'Engenharia e Desenvolvimento',
      items: ['Aplicações Mobile', 'Plataformas Web', 'Arquitetura escalável', 'Projetos chave na mão'],
      icon: Code2
    },
    {
      title: 'Sistemas Inteligentes',
      items: ['Algoritmos personalizados', 'Sistemas de scoring', 'Motores de recomendação', 'Análise preditiva'],
      icon: Brain
    },
    {
      title: 'Automação e Eficiência Operacional',
      items: ['Workflows inteligentes', 'Otimização de processos', 'Integração de sistemas', 'RPA e automação'],
      icon: Zap
    },
    {
      title: 'Inteligência Digital e Branding Estratégico',
      items: ['SEO avançado', 'GEO e AEO', 'Estruturação estratégica de presença digital', 'Estudos de branding orientados a dados'],
      icon: BarChart3
    },
    {
      title: 'Modelos Virtuais e Ativos Digitais',
      items: ['Avatares digitais', 'Influenciadores virtuais', 'Identidade visual baseada em IA', 'Experiências imersivas'],
      icon: Sparkles
    }
  ];

  const portfolioItems = [
    {
      name: 'Simulador IR',
      description: 'Aplicativo inteligente para cálculo de Imposto de Renda',
      features: [
        'Validação automatizada da legislação brasileira',
        'Motor normativo estruturado',
        'Automatização interpretativa com apoio de IA'
      ],
      stats: '100K+ Downloads',
      color: 'from-blue-600 to-cyan-500',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sapiente.simulador_ir',
      appStoreUrl: 'https://apps.apple.com/br/app/simulador-ir/id1234567890'
    },
    {
      name: 'CupãoMania',
      description: 'Plataforma inteligente de cupons e descontos',
      features: [
        'Sistema de scoring avançado',
        'Algoritmo de recomendação personalizado',
        'Estrutura escalável e resiliente'
      ],
      stats: 'Em desenvolvimento',
      color: 'from-purple-600 to-pink-500',
      playStoreUrl: '#',
      appStoreUrl: '#'
    },
    {
      name: 'ScanMyName',
      description: 'Análise de pegada digital e reputação online',
      features: [
        'Sistema de scoring de reputação',
        'Monitorização estruturada de presença digital',
        'Relatórios detalhados e acionáveis'
      ],
      stats: '50K+ Usuários',
      color: 'from-emerald-600 to-teal-500',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sapiente.scanmyname',
      appStoreUrl: 'https://apps.apple.com/br/app/scanmyname/id0987654321'
    }
  ];

  const industries = [
    'Serviços Financeiros',
    'Retalho e E-commerce',
    'Saúde e Bem-estar',
    'Educação e Formação',
    'Manufatura e Indústria',
    'Turismo e Hospitalidade',
    'Administração Pública',
    'Telecomunicações'
  ];

  const technologies = [
    { title: 'Arquitetura Escalável', desc: 'Sistemas desenhados para crescimento' },
    { title: 'Integrações via API', desc: 'Conectividade com ecossistemas existentes' },
    { title: 'Metodologia Ágil', desc: 'Desenvolvimento iterativo e adaptativo' },
    { title: 'Segurança em Primeiro Lugar', desc: 'Conformidade com LGPD, GDPR e standards internacionais' }
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
            Tecnologia estruturada para inovação e crescimento sustentável.
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            A Sapiente.AI é um laboratório de inovação tecnológica que desenvolve produtos próprios e atua como parceiro estratégico na transformação digital de organizações.
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
              Explorar Soluções
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
                  Somos um laboratório de inovação tecnológica que combina desenvolvimento de produtos próprios com consultoria estratégica em transformação digital. Os nossos produtos são prova viva da nossa capacidade técnica e da nossa compreensão profunda dos desafios empresariais.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-3">
                    <Code2 className="h-6 w-6 text-blue-600" />
                    Produtos Próprios
                  </h3>
                  <p className="text-muted-foreground">
                    Desenvolvemos produtos como Simulador IR, CupãoMania e ScanMyName que demonstram a nossa expertise em engenharia, IA aplicada e estratégia digital. Cada produto é uma solução completa, do conceito à escala.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-3">
                    <Brain className="h-6 w-6 text-blue-600" />
                    IA com Validação Humana
                  </h3>
                  <p className="text-muted-foreground">
                    A inteligência artificial é uma ferramenta de apoio técnico, nunca um substituto da engenharia sólida. Cada solução passa por validação especializada, garantindo qualidade, segurança e conformidade regulatória.
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {areasOfExpertise.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <Icon className="h-8 w-8 text-blue-600" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {area.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {area.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-sm text-muted-foreground">
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
                Portfólio de Produtos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Soluções desenvolvidas e implementadas com sucesso, disponíveis nas principais plataformas.
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
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    
                    <div className="space-y-3">
                      {item.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <span className="text-blue-600 font-bold mt-1">✓</span>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Official App Store Buttons */}
                    {idx < 2 && (
                      <div className="pt-4 border-t border-gray-200">
                        <AppDownloadButtons
                          appName={item.name}
                          playStoreUrl={item.playStoreUrl}
                          appStoreUrl={item.appStoreUrl}
                          className="justify-start"
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

      {/* INDÚSTRIAS */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Indústrias
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experiência comprovada em diversos setores económicos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
                  <p className="text-foreground font-semibold">{industry}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TECNOLOGIA E METODOLOGIA */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Tecnologia e Metodologia
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Abordagem técnica rigorosa e boas práticas consolidadas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {technologies.map((tech, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{tech.title}</h3>
                      <p className="text-muted-foreground">{tech.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 md:py-32 bg-blue-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para Transformar a sua Organização?
            </h2>
            <p className="text-lg text-white/90 mb-12">
              Agende uma reunião com os nossos especialistas e descubra como podemos gerar resultados reais no seu negócio.
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
