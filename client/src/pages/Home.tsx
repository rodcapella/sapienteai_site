/*
 * SAPIENTE.AI Homepage - Optimized for Design, UX, SEO, GEO, and AEO
 * Design Philosophy: Neo-Brutalism meets Swiss Modernism
 * - Improved contrast with alternating backgrounds
 * - Stronger CTAs throughout
 * - Clear H1/H2 hierarchy for SEO
 * - FAQ section for GEO/AEO optimization
 * - Generous spacing and visual separation
 * - Full i18n support with dynamic language switching
 */

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Cpu, Zap, Target, Shield, TrendingUp, Award, Users, ChevronDown } from "lucide-react";
import ContactModal from '@/components/ContactModal';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/hooks/useTranslation';

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

  // FAQ items from translations
  const faqs: FAQItem[] = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
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

  const services = [
    {
      icon: Brain,
      title: t('services.ml'),
      description: t('services.ml.desc')
    },
    {
      icon: Cpu,
      title: t('services.automation'),
      description: t('services.automation.desc')
    },
    {
      icon: Target,
      title: t('services.consulting'),
      description: t('services.consulting.desc')
    }
  ];

  const processSteps = [
    { number: '01', title: t('process.step1'), description: t('process.step1.desc') },
    { number: '02', title: t('process.step2'), description: t('process.step2.desc') },
    { number: '03', title: t('process.step3'), description: t('process.step3.desc') },
    { number: '04', title: t('process.step4'), description: t('process.step4.desc') }
  ];

  const portfolioItems = [
    {
      company: 'TechCorp Brasil',
      result: '+35% Eficiência',
      description: 'Automação de processos de RH com IA'
    },
    {
      company: 'RetailMax',
      result: '-40% Custos',
      description: 'Otimização de inventário com ML'
    },
    {
      company: 'FinanceHub',
      result: '+250% ROI',
      description: 'Análise preditiva de risco'
    },
    {
      company: 'LogisticaPro',
      result: '-30% Tempo',
      description: 'Roteirização inteligente'
    },
    {
      company: 'SalesForce AI',
      result: '+45% Conversão',
      description: 'Previsão de demanda'
    },
    {
      company: 'HealthTech',
      result: '+60% Precisão',
      description: 'Diagnóstico assistido por IA'
    }
  ];

  const differentials = [
    { icon: Shield, title: t('differentials.security'), desc: t('differentials.security.desc') },
    { icon: TrendingUp, title: t('differentials.roi'), desc: t('differentials.roi.desc') },
    { icon: Award, title: t('differentials.expertise'), desc: t('differentials.expertise.desc') },
    { icon: Users, title: t('differentials.support'), desc: t('differentials.support.desc') }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/vRKqoJgFxdCzRRqV.png" 
                alt="SAPIENTE.AI" 
                className="h-8 object-contain"
              />
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.servicos')}</a>
              <a href="#processo" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.processo')}</a>
              <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.portfolio')}</a>
              <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.blog')}</a>
              <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">{t('nav.faq')}</a>
              <LanguageSelector />
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="bg-primary text-white hover:bg-primary/90 border-2 border-primary font-bold"
              >
                {t('nav.fale')}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pb-32 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/vRKqoJgFxdCzRRqV.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.3em] text-primary uppercase mb-6 font-bold">
              {t('hero.subtitle')}
            </p>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] mb-8 text-foreground">
              {t('hero.title').split(' ').slice(0, 2).join(' ')} <span className="text-primary">{t('hero.title').split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-lg text-foreground/70 mb-6" style={{fontWeight: '600'}}>{t('hero.description')}</p>
            <p className="text-base text-foreground mb-12 max-w-2xl mx-auto" style={{color: '#0057dc', fontWeight: '600'}}>{t('hero.tagline')}</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Button 
                onClick={() => setIsContactOpen(true)}
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 border-2 border-primary text-lg px-8 py-6 h-auto font-bold"
              >
                {t('hero.cta1')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 md:py-32 bg-white">
        <div className="container">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">{t('services.label')}</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              {t('services.title')}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {t('services.description')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} className={index >= 1 ? 'delay-100' : ''}>
                <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 hover:border-primary hover:shadow-lg transition-all duration-300" style={{height: '464px'}}>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5">
                    {t('services.more')}
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processo" className="py-24 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">{t('process.label')}</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              {t('process.title')}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {t('process.description')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <AnimatedSection key={index} className={index >= 2 ? 'delay-100' : ''}>
                <div className="relative">
                  <div className="text-8xl font-black text-primary/10 mb-4">{step.number}</div>
                  <div className="absolute top-0 left-0">
                    <div className="text-6xl font-black text-primary">{step.number}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 mt-8">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 bg-white">
        <div className="container">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">{t('portfolio.label')}</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              {t('portfolio.title')}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {t('portfolio.description')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {portfolioItems.map((item, index) => (
              <AnimatedSection key={index} className={index >= 2 ? 'delay-100' : ''}>
                <div className="p-8 bg-gradient-to-br from-primary/5 to-cyan/5 border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-300" style={{height: '180px'}}>
                  <div className="text-3xl font-black text-primary mb-2">{item.result}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.company}</h3>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">{t('differentials.label')}</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              {t('differentials.title')}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {differentials.map((diff, index) => (
              <AnimatedSection key={index} className={index >= 2 ? 'delay-100' : ''}>
                <div className="flex gap-6 p-8 bg-white border-2 border-primary/30 hover:border-primary transition-all" style={{height: '180px'}}>
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

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-32 bg-white">
        <div className="container">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">{t('faq.label')}</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              {t('faq.title')}
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index}>
                <div className="border-2 border-primary/20 hover:border-primary transition-all">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-foreground text-left">{faq.question}</h3>
                    <ChevronDown 
                      className={`h-5 w-5 text-primary transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6 pt-0 border-t-2 border-primary/20 bg-primary/5">
                      <p className="text-foreground/70">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-cover bg-center" style={{
        backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/9wDqWqFxdCzRRqV.png)'
      }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/70"></div>
        <div className="container relative z-10">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{t('cta.title')}</h2>
            <p className="text-lg text-white/90 mb-12" style={{color: '#000000'}}>{t('cta.description')}</p>
            <Button 
              onClick={() => setIsContactOpen(true)}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 border-2 border-white text-lg px-8 py-6 h-auto font-bold" style={{color: '#3a7ee5', backgroundColor: '#f0f2f4'}}
            >
              {t('cta.button')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white border-t-4 border-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/vRKqoJgFxdCzRRqV.png" 
                alt="SAPIENTE.AI" 
                className="h-16 mb-4 object-contain"
              />
              <p className="text-sm text-white/70">
                Inteligência Artificial Aplicada aos Negócios
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#servicos" className="hover:text-white transition-colors">{t('nav.servicos')}</a></li>
                <li><a href="#processo" className="hover:text-white transition-colors">{t('nav.processo')}</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/ia-para-empresas" className="hover:text-white transition-colors">Sobre IA</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">{t('nav.faq')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/privacidade" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="/termos" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
                <li><a href="/lgpd" className="hover:text-white transition-colors">{t('footer.lgpd')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-white/70">
                {t('footer.copyright')}
              </p>
              <div className="flex gap-6">
                <a href="/" className="text-sm text-white/70 hover:text-white transition-colors"></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
