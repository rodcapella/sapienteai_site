/**
 * SAPIENTE.AI Homepage
 * Design Philosophy: Neo-Brutalism meets Swiss Modernism
 * - Raw geometric shapes with precise mathematical grids
 * - Stark contrast between heavy black typography and electric blue accents
 * - Asymmetric layouts that break conventional centering
 * - Bold, unapologetic use of negative space as a structural element
 * - Diagonal clip-path cuts between sections creating dynamic transitions
 * - Oversized numbers for process steps
 * - Thick border frames around key sections (8px solid borders)
 * - Scroll animations for dynamic engagement
 * - Contact form modal for lead capture
 * - Portfolio section with case studies and metrics
 */

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Cpu, Zap, Target, Shield, TrendingUp, Award, Users, Zap as ZapIcon } from "lucide-react";
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

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground">
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/UCZcamqTyYghcjGW.png" 
                alt="SAPIENTE.AI" 
                className="h-14 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">Serviços</a>
              <a href="#processo" className="text-sm font-medium hover:text-primary transition-colors">Processo</a>
              <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">Portfólio</a>
              <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</a>
              <a href="#diferenciais" className="text-sm font-medium hover:text-primary transition-colors">Diferenciais</a>
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="bg-foreground text-background hover:bg-foreground/90 border-2 border-foreground text-sm"
              >
                Contactar
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/FYRwdgClQVohvsom.png" 
            alt="SAPIENTE.AI - AI Innovation" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.3em] text-muted-foreground mb-6 uppercase">
              Inteligência Artificial Aplicada // 2026
            </p>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8">
              O Futuro da <span className="text-primary">Inteligência</span>
            </h1>
            <p className="text-lg md:text-xl mb-4 text-muted-foreground">
              Soluções de IA Aplicada • Transformação Digital • Resultados Mensuráveis
            </p>
            <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto">
              Tecnologia de ponta para empresas que pensam no amanhã
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => setIsContactOpen(true)}
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-foreground text-lg px-8 py-6 h-auto"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-foreground text-lg px-8 py-6 h-auto hover:bg-foreground hover:text-background"
              >
                Conhecer Soluções
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section - O Que Fazemos */}
      <section id="servicos" className="py-24 md:py-32 bg-foreground text-background clip-diagonal-top">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16">
              <p className="text-sm font-medium tracking-[0.3em] text-accent mb-4 uppercase">
                O Que Fazemos
              </p>
              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                Soluções de IA<br />para o seu negócio
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <AnimatedSection>
              <div className="border-2 border-background p-8 hover:bg-primary hover:border-primary transition-all duration-150">
                <Brain className="h-16 w-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Consultoria em IA</h3>
                <p className="text-background/80 leading-relaxed">
                  Estratégia e implementação de soluções de inteligência artificial personalizadas para transformar o seu negócio.
                </p>
              </div>
            </AnimatedSection>
            
            {/* Service 2 */}
            <AnimatedSection>
              <div className="border-2 border-background p-8 hover:bg-primary hover:border-primary transition-all duration-150">
                <Cpu className="h-16 w-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Desenvolvimento Customizado</h3>
                <p className="text-background/80 leading-relaxed">
                  Modelos e aplicações sob medida para seu negócio, desenvolvidos com as tecnologias mais avançadas do mercado.
                </p>
              </div>
            </AnimatedSection>
            
            {/* Service 3 */}
            <AnimatedSection>
              <div className="border-2 border-background p-8 hover:bg-primary hover:border-primary transition-all duration-150">
                <Zap className="h-16 w-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Automação Inteligente</h3>
                <p className="text-background/80 leading-relaxed">
                  Processos otimizados com machine learning e IA generativa para aumentar eficiência e reduzir custos.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process Section - Como Funciona */}
      <section id="processo" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-4_1770834586000_na1fn_cHJvY2Vzcy1hdXRvbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L244Y0RCV2NtVzRUMVFjTmY4WEEwbnYtaW1nLTRfMTc3MDgzNDU4NjAwMF9uYTFmbl9jSEp2WTJWemN5MWhkWFJ2YldGMGFXOXUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=i38YIwFvJre4D31xIuRrk87os1YLeuvqRUvNgxsZaNQS-wAtU4xUpo7iSb3jfrienkS3SOargcfC07yNS1PIflFOOOHI09DiJ3Ubb98BIft~0WYkNaHNc4wMdvhE-S9F7RfenmN0X0o1JpAUXvaZSRPs8mU62kW8CYuFeAQ0KB8uUB1bDW~2j2AdyHNEJtO25OH6fuVPFGAxdAhWfGpC8fAObjYf8V1CipRluOMECGS89S73Yw6JGmkLkW6ej6hk6vsrc~WcPf7LO7Q8QV38rTh3dqePJhz0IYeElhdeh5EO05ewSAF20-pOPzY1nWOSomfgswr9Xib0gvzEJQs9Bw__" 
            alt="Process" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <p className="text-sm font-medium tracking-[0.3em] text-primary mb-4 uppercase">
                Como Funciona
              </p>
              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                Processo em 4 Etapas
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Diagnóstico', desc: 'Análise profunda das necessidades e oportunidades do seu negócio' },
              { num: '02', title: 'Estratégia', desc: 'Planejamento da solução ideal alinhada aos seus objetivos' },
              { num: '03', title: 'Implementação', desc: 'Desenvolvimento e integração das soluções de IA' },
              { num: '04', title: 'Evolução', desc: 'Monitoramento e otimização contínua dos resultados' },
            ].map((step) => (
              <AnimatedSection key={step.num}>
                <div className="text-center">
                  <div className="text-[120px] font-black leading-none text-primary mb-4">{step.num}</div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 bg-muted relative overflow-hidden">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <p className="text-sm font-medium tracking-[0.3em] text-primary mb-4 uppercase">
                Nossos Resultados
              </p>
              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                Portfólio de <span className="text-primary">Casos</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Automação de Processos RH',
                client: 'Empresa Financeira',
                metrics: [
                  { label: 'Redução de Tempo', value: '65%' },
                  { label: 'Economia Anual', value: '€250K' },
                ],
                description: 'Sistema de IA para automação de recrutamento e onboarding',
              },
              {
                title: 'Análise Preditiva de Vendas',
                client: 'E-commerce B2B',
                metrics: [
                  { label: 'Precisão', value: '94%' },
                  { label: 'Aumento de Vendas', value: '+42%' },
                ],
                description: 'Modelo de ML para previsão de demanda e otimização de estoque',
              },
              {
                title: 'Chatbot Inteligente 24/7',
                client: 'Empresa de Telecom',
                metrics: [
                  { label: 'Satisfação', value: '4.8/5' },
                  { label: 'Tickets Resolvidos', value: '78%' },
                ],
                description: 'Assistente de IA para atendimento ao cliente multilíngue',
              },
              {
                title: 'Detecção de Fraude',
                client: 'Instituição Bancária',
                metrics: [
                  { label: 'Fraudes Detectadas', value: '+89%' },
                  { label: 'Falsos Positivos', value: '-12%' },
                ],
                description: 'Sistema de detecção de anomalias em transações financeiras',
              },
              {
                title: 'Otimização de Logística',
                client: 'Empresa de Distribuição',
                metrics: [
                  { label: 'Redução de Rotas', value: '31%' },
                  { label: 'Economia de Combustível', value: '€180K' },
                ],
                description: 'IA para otimização de rotas e gestão de frota inteligente',
              },
              {
                title: 'Análise de Sentimento',
                client: 'Marca de Moda',
                metrics: [
                  { label: 'Menções Analisadas', value: '500K+' },
                  { label: 'Insights/Mês', value: '50+' },
                ],
                description: 'Monitoramento de redes sociais com análise de sentimento em tempo real',
              },
            ].map((caseStudy, idx) => (
              <AnimatedSection key={idx}>
                <div className="border-2 border-foreground p-8 bg-background hover:border-primary transition-all duration-300 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{caseStudy.client}</p>
                  <p className="text-sm mb-6 flex-grow">{caseStudy.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-foreground">
                    {caseStudy.metrics.map((metric, midx) => (
                      <div key={midx}>
                        <div className="text-2xl font-black text-primary">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section id="diferenciais" className="py-24 md:py-32 bg-foreground text-background clip-diagonal-top relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-5_1770834589000_na1fn_c3RyYXRlZ2ljLWNvbnN1bHRpbmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L244Y0RCV2NtVzRUMVFjTmY4WEEwbnYtaW1nLTVfMTc3MDgzNDU4OTAwMF9uYTFmbl9jM1J5WVhSbFoybGpMV052Ym5OMWJIUnBibWMucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pz3N7d9LBoPpP96S9ju43X7WGs5t39w0qKlBbGodRIIbGAIYz7F-HVZvwpNS8AB4tPGJrtph9e7GLT4Yk8YKjTCGcrK2YYjaAbpacv1N5t6n4EE0kgsWoWZMifUMsmfWxP3FyACxF8ks37u--KgEXCoUhh1W~JufUaxQIHK43zHfcEWFuz6V7OvDBFg0zZrNhMUjpTH2kqg3kQzsXQgNthvWff5mzus1E55FUlqIuE7mcurMQjru938FtKd4FvBScV4LrOtFILvuyexSpRe04BWbAl~OU-V6BORCoKj4nr6JN7QOLk~BZuXzIlRrYQSVZKV0amS13mBfxKByDK~jVA__" 
            alt="Strategic" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="mb-16">
              <p className="text-sm font-medium tracking-[0.3em] text-accent mb-4 uppercase">
                Diferenciais
              </p>
              <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
                Por que escolher<br />a SAPIENTE.AI
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: Target,
                title: 'Expertise Técnica de Ponta',
                desc: 'Equipe especializada com experiência em projetos de IA de grande escala, utilizando as tecnologias mais avançadas do mercado.',
              },
              {
                icon: TrendingUp,
                title: 'Foco em Resultados Mensuráveis',
                desc: 'Todas as nossas soluções são desenvolvidas com métricas claras de sucesso e ROI comprovado.',
              },
              {
                icon: Shield,
                title: 'Soluções Escaláveis e Seguras',
                desc: 'Arquiteturas robustas que crescem com o seu negócio, mantendo os mais altos padrões de segurança.',
              },
              {
                icon: Users,
                title: 'Suporte Dedicado',
                desc: 'Acompanhamento contínuo e suporte especializado para garantir o sucesso da implementação.',
              },
            ].map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <AnimatedSection key={idx}>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-accent flex items-center justify-center">
                        <Icon className="h-8 w-8 text-accent-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{diff.title}</h3>
                      <p className="text-background/80 leading-relaxed">
                        {diff.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-24 md:py-32 bg-background clip-diagonal-top relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-3_1770834577000_na1fn_YWJzdHJhY3QtZGF0YS1mbG93.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L244Y0RCV2NtVzRUMVFjTmY4WEEwbnYtaW1nLTNfMTc3MDgzNDU3NzAwMF9uYTFmbl9ZV0p6ZEhKaFkzUXRaR0YwWVMxbWJHOTMucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=eL15Qn22ScG4XAbBqvDZ8f7LhpiD9ZlO860bQTuBSPLpPHL51fBEsFu4F2lQHM6W9BerRQEbCZ4k7nJpSdjIFnfoz3xqeIIAVpni2sGHkT6VAMFcRtH9DyqnCo~hAMih7BFW071UOPwiy3L-KRRE-e1j7DXgVTycBB2vr9RSf6skFFyov0FTC0myAhQ~o-pwv~QtIW8JVHUAyVQlNHsctyIKdxrX5zt9d0wz3b1Z4zXTHe1U7JkHXOgWsbLp2frN-k1Ei7Yp2qcutLlYNoGwRo6uR2sri9kk2F7MKeAmW0Pc6dG0ciW0JUY3kWoyc25wagt9SSseQYiAq1oHqEYV8w__" 
            alt="Data Flow" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              Pronto para transformar<br />seu negócio com <span className="text-primary">IA</span>?
            </h2>
            <p className="text-xl mb-12 text-muted-foreground">
              Fale com nossos especialistas e descubra como a inteligência artificial pode revolucionar seus processos.
            </p>
            <Button 
              onClick={() => setIsContactOpen(true)}
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-foreground text-lg px-12 py-6 h-auto"
            >
              Falar com Especialista
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white border-t-4 border-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/MhgEHrbSKkdNFKRr.png" 
                alt="SAPIENTE.AI" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm text-white/70">
              © 2026 SAPIENTE.AI • Inteligência Artificial Aplicada
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
