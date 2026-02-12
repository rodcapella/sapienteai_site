/**
 * SAPIENTE.AI Homepage - Optimized for Design, UX, SEO, GEO, and AEO
 * Design Philosophy: Neo-Brutalism meets Swiss Modernism
 * - Improved contrast with alternating backgrounds
 * - Stronger CTAs throughout
 * - Clear H1/H2 hierarchy for SEO
 * - FAQ section for GEO/AEO optimization
 * - Generous spacing and visual separation
 */

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Cpu, Zap, Target, Shield, TrendingUp, Award, Users, ChevronDown } from "lucide-react";
import ContactModal from '@/components/ContactModal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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

const faqs: FAQItem[] = [
  {
    question: 'O que é Inteligência Artificial aplicada a negócios?',
    answer: 'Inteligência Artificial aplicada a negócios é o uso de algoritmos, modelos preditivos e automação inteligente para otimizar processos, analisar grandes volumes de dados e tomar decisões mais precisas. A SAPIENTE.AI especializa-se em implementar soluções de IA que geram ROI mensurável e transformação digital real.'
  },
  {
    question: 'Como a IA pode reduzir custos empresariais?',
    answer: 'A IA reduz custos através de: automação de processos repetitivos (redução de até 40% em custos operacionais), otimização de inventário com previsão de demanda, análise preditiva para evitar desperdícios, e tomada de decisão mais rápida e precisa. Nossos clientes reportam economia média de 35% após implementação.'
  },
  {
    question: 'Qual a diferença entre IA e automação?',
    answer: 'Automação executa tarefas pré-programadas. IA aprende com dados e se adapta continuamente. A SAPIENTE.AI combina ambas: usamos automação para eficiência e IA para inteligência adaptativa. Isso resulta em sistemas que melhoram com o tempo, sem reprogramação constante.'
  },
  {
    question: 'Quanto tempo leva para implementar uma solução de IA?',
    answer: 'Depende da complexidade. Projetos simples: 4-8 semanas. Projetos complexos: 3-6 meses. A SAPIENTE.AI trabalha em sprints ágeis, entregando valor incremental. Você vê resultados desde as primeiras semanas, com otimizações contínuas.'
  },
  {
    question: 'A IA da SAPIENTE.AI é segura e em conformidade com LGPD/GDPR?',
    answer: 'Sim. Implementamos os mais altos padrões de segurança: criptografia de dados, validação robusta, monitoramento contínuo, versionamento de modelos e testes de adversarialidade. Garantimos conformidade total com LGPD, GDPR e outras regulamentações.'
  },
  {
    question: 'Como medir o ROI de um projeto de IA?',
    answer: 'Medimos através de: redução de custos operacionais, aumento de receita, melhoria em eficiência de tempo, satisfação do cliente, e precisão de decisões. Estabelecemos KPIs claros no início e acompanhamos continuamente. A maioria dos clientes vê ROI positivo em 6-12 meses.'
  }
];

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-foreground shadow-lg">
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            <a href="/" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
              
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">Serviços</a>
              <a href="#processo" className="text-sm font-medium hover:text-primary transition-colors">Processo</a>
              <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">Portfólio</a>
              <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</a>
              <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="bg-primary text-white hover:bg-primary/90 border-2 border-primary font-bold"
              >
                Fale com Especialista
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden bg-gradient-to-br from-white via-primary/5 to-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/FYRwdgClQVohvsom.png" 
            alt="SAPIENTE.AI - AI Innovation" 
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.3em] text-primary uppercase mb-6 font-bold">
              
            </p>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] mb-8 text-foreground">
              Inteligência Artificial para <span className="text-primary">Empresas</span>
            </h1>
            <p className="text-lg md:text-xl mb-4 text-foreground/80 font-medium">
              Soluções de IA Aplicada • Transformação Digital • Resultados Mensuráveis
            </p>
            <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-foreground/70">
              Tecnologia de ponta para empresas que querem crescer com dados, automação inteligente e decisões baseadas em IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => setIsContactOpen(true)}
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 border-2 border-primary text-lg px-8 py-6 h-auto font-bold"
              >
                Solicitar Diagnóstico <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => setIsContactOpen(true)}
                size="lg" 
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground/5 text-lg px-8 py-6 h-auto font-bold"
              >
                Agendar Reunião
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="servicos" className="py-24 md:py-32 bg-white border-t-4 border-b-4 border-foreground">
        <div className="container">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">O QUE FAZEMOS</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Serviços de IA Aplicada:
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Oferecemos soluções especializadas em machine learning, automação inteligente e análise de dados para empresas que querem evoluir com tecnologia.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Machine Learning',
                description: 'Modelos preditivos e algoritmos avançados para análise de dados, previsão de demanda e otimização de processos.'
              },
              {
                icon: Cpu,
                title: 'Automação Inteligente',
                description: 'Automação de processos repetitivos com IA, reduzindo custos operacionais em até 40% e aumentando produtividade.'
              },
              {
                icon: Target,
                title: 'Consultoria Estratégica',
                description: 'Análise de oportunidades de IA na sua empresa, roadmap de implementação e acompanhamento de resultados.'
              }
            ].map((service, index) => (
              <AnimatedSection key={index} className={index >= 1 ? 'delay-100' : ''}>
                <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 hover:border-primary hover:shadow-lg transition-all duration-300">
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>
                  <Button 
                    onClick={() => setIsContactOpen(true)}
                    className="w-full bg-primary text-white hover:bg-primary/90 border-2 border-primary font-bold"
                  >
                    Saiba Mais
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="processo" className="py-24 md:py-32 bg-gradient-to-br from-primary/5 to-white">
        <div className="container">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">COMO FUNCIONA</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Processo em 4 Etapas:
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Metodologia comprovada para implementar IA com sucesso na sua empresa.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Diagnóstico', desc: 'Análise profunda de oportunidades e desafios' },
              { num: '02', title: 'Estratégia', desc: 'Planejamento de implementação e roadmap' },
              { num: '03', title: 'Implementação', desc: 'Desenvolvimento e integração da solução' },
              { num: '04', title: 'Otimização', desc: 'Monitoramento contínuo e melhoria' }
            ].map((step, index) => (
              <AnimatedSection key={index} className={index >= 2 ? 'delay-100' : ''}>
                <div className="relative">
                  <div className="text-8xl font-black text-primary/20 mb-4">{step.num}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 absolute top-0">{step.title}</h3>
                  <p className="text-foreground/70 mt-16">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 bg-white border-t-4 border-b-4 border-foreground">
        <div className="container">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">RESULTADOS REAIS</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Portfólio de Sucesso:
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Confira os resultados que alcançamos para empresas em diversos setores.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { company: 'RetailCorp', metric: '+45% Eficiência', desc: 'Automação de inventário com ML' },
              { company: 'FinanceHub', metric: '-38% Custos', desc: 'Análise preditiva de risco' },
              { company: 'LogisticsPro', metric: '+52% Velocidade', desc: 'Otimização de rotas com IA' },
              { company: 'HealthTech', metric: '+89% Precisão', desc: 'Diagnóstico assistido por IA' },
              { company: 'ManufactureCo', metric: '-42% Defeitos', desc: 'Visão computacional QA' },
              { company: 'MarketingAI', metric: '+156% ROI', desc: 'Segmentação e personalização' }
            ].map((case_, index) => (
              <AnimatedSection key={index} className={index >= 3 ? 'delay-100' : ''}>
                <div className="p-8 border-2 border-foreground hover:border-primary hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-primary/5">
                  <p className="text-sm font-bold text-primary uppercase tracking-wide mb-2">{case_.company}</p>
                  <p className="text-4xl font-black text-foreground mb-2">{case_.metric}</p>
                  <p className="text-foreground/70">{case_.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <Button 
              onClick={() => setIsContactOpen(true)}
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 border-2 border-primary text-lg px-8 py-6 h-auto font-bold"
            >
              Ver Mais Casos de Sucesso <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Differentials Section */}
      <section id="diferenciais" className="py-24 md:py-32 bg-gradient-to-br from-primary/5 to-white">
        <div className="container">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">DIFERENCIAIS</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Por que escolher SAPIENTE.AI ?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Shield, title: 'Segurança Garantida', desc: 'LGPD, GDPR e conformidade total' },
              { icon: TrendingUp, title: 'ROI Mensurável', desc: 'Resultados comprovados em 6-12 meses' },
              { icon: Award, title: 'Expertise Comprovada', desc: 'Equipe com + 5 anos de experiência' },
              { icon: Users, title: 'Suporte Dedicado', desc: 'Acompanhamento contínuo do projeto' }
            ].map((diff, index) => (
              <AnimatedSection key={index} className={index >= 2 ? 'delay-100' : ''}>
                <div className="flex gap-6 p-8 bg-white border-2 border-primary/30 hover:border-primary transition-all">
                  <diff.icon className="h-12 w-12 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{diff.title}</h3>
                    <p className="text-foreground/70">{diff.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section for GEO/AEO */}
      <section id="faq" className="py-24 md:py-32 bg-white border-t-4 border-b-4 border-foreground">
        <div className="container">
          <AnimatedSection className="mb-16 max-w-3xl">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">PERGUNTAS FREQUENTES</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Dúvidas sobre IA para Empresas
            </h2>
            <p className="text-lg text-foreground/70">
              Respostas diretas sobre inteligência artificial, machine learning, automação e implementação de IA em negócios.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} className={index >= 3 ? 'delay-100' : ''}>
                <div className="border-2 border-foreground overflow-hidden hover:border-primary transition-all">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between bg-gradient-to-r from-white to-primary/5 hover:from-primary/5 hover:to-primary/10 transition-all"
                  >
                    <h3 className="text-lg font-bold text-foreground text-left">{faq.question}</h3>
                    <ChevronDown 
                      className={`h-6 w-6 text-primary flex-shrink-0 transition-transform ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-8 py-6 bg-primary/5 border-t-2 border-primary/30">
                      <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #00CFFF 0%, transparent 50%), radial-gradient(circle at 80% 80%, #1E3A8A 0%, transparent 50%)'
          }}></div>
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Pronto para Transformar sua Empresa?
            </h2>
            <p className="text-lg text-white/90 mb-12">
              Agende uma reunião com nossos especialistas e descubra como IA pode gerar resultados reais no seu negócio.
            </p>
            <Button 
              onClick={() => setIsContactOpen(true)}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 border-2 border-white text-lg px-8 py-6 h-auto font-bold"
            >
              Agendar Reunião Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white border-t-4 border-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4">SAPIENTE.AI</h3>
              <p className="text-sm text-white/70">
                Inteligência Artificial Aplicada aos Negócios
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#processo" className="hover:text-white transition-colors">Processo</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#portfolio" className="hover:text-white transition-colors">Portfólio</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="/" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              © 2026 SAPIENTE.AI • Todos os direitos reservados
            </p>
            <div className="flex gap-6">
              <a href="/" className="text-sm text-white/70 hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
