/**
 * Pillar Page: Inteligência Artificial para Empresas
 * SEO Strategy: Cluster content hub for keyword rankings
 * Main Keywords: IA para empresas, inteligência artificial empresarial, IA aplicada a negócios
 * Internal Linking: Links to blog articles for cluster content strategy
 */

import { ArrowRight, CheckCircle, TrendingUp, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import ContactModal from '@/components/ContactModal';

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

interface ClusterArticle {
  title: string;
  slug: string;
  description: string;
  keywords: string[];
}

const clusterArticles: ClusterArticle[] = [
  {
    title: 'IA Generativa: O Futuro da Automação Empresarial',
    slug: 'ia-generativa-futuro-automacao',
    description: 'Como modelos de linguagem grandes estão revolucionando a forma como as empresas automatizam processos.',
    keywords: ['IA generativa', 'automação', 'transformação digital']
  },
  {
    title: 'Machine Learning para Previsão de Demanda',
    slug: 'machine-learning-previsao-demanda',
    description: 'Algoritmos de ML para otimizar inventário e aumentar eficiência operacional em até 40%.',
    keywords: ['machine learning', 'previsão', 'otimização']
  },
  {
    title: 'Segurança em Sistemas de IA: Boas Práticas',
    slug: 'seguranca-sistemas-ia',
    description: 'Estratégias essenciais para proteger seus modelos de IA contra ataques e garantir conformidade.',
    keywords: ['segurança IA', 'LGPD', 'conformidade']
  },
  {
    title: 'Tendências de IA em 2026: O Que Esperar',
    slug: 'tendencias-ia-2026',
    description: 'Análise das principais tendências que moldarão o mercado de inteligência artificial.',
    keywords: ['tendências IA', 'tecnologia', 'futuro']
  },
  {
    title: 'Deep Learning para Visão Computacional',
    slug: 'deep-learning-visao-computacional',
    description: 'Aplicações práticas de redes neurais convolucionais em detecção de objetos e análise de imagens.',
    keywords: ['deep learning', 'visão computacional', 'CNN']
  },
  {
    title: 'ROI de Projetos de IA: Como Medir o Sucesso',
    slug: 'roi-projetos-ia',
    description: 'Métricas e KPIs essenciais para avaliar o retorno sobre investimento em soluções de IA.',
    keywords: ['ROI', 'negócios', 'métricas']
  }
];

export default function AIPillar() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-foreground shadow-lg">
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            <a href="/" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
              SAPIENTE.AI
            </a>
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              ← Voltar
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-white via-primary/5 to-white border-b-4 border-foreground">
        <div className="container">
          <AnimatedSection className="max-w-4xl">
            <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">GUIA COMPLETO</p>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] mb-8 text-foreground">
              Inteligência Artificial para <span className="text-primary">Empresas</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Tudo o que você precisa saber sobre IA aplicada a negócios, machine learning empresarial e transformação digital com tecnologia inteligente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="bg-primary text-white hover:bg-primary/90 border-2 border-primary text-lg px-8 py-6 h-auto font-bold"
              >
                Solicitar Diagnóstico <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => setIsContactOpen(true)}
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground/5 text-lg px-8 py-6 h-auto font-bold"
              >
                Fale com Especialista
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Definition Section - GEO/AEO Optimization */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 to-primary/5 border-b-4 border-foreground">
        <div className="container">
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8">
              O que é Inteligência Artificial para Empresas?
            </h2>
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                <strong className="text-foreground">Inteligência Artificial aplicada a negócios</strong> é o uso estratégico de algoritmos, modelos preditivos e sistemas de automação inteligente para otimizar processos, analisar grandes volumes de dados e tomar decisões mais precisas e rápidas.
              </p>
              <p>
                Diferente da automação tradicional, que executa tarefas pré-programadas, a IA aprende com os dados e se adapta continuamente, melhorando seus resultados sem necessidade de reprogramação constante.
              </p>
              <p>
                A SAPIENTE.AI especializa-se em implementar soluções de IA que geram <strong>ROI mensurável</strong>, transformação digital real e crescimento sustentável para empresas de todos os tamanhos.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="space-y-24">
            {/* Section 1: Benefits */}
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-12">
                Benefícios da IA para Negócios
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: TrendingUp,
                    title: 'Aumento de Receita',
                    description: 'Personalização inteligente, previsão de oportunidades e otimização de preços aumentam vendas em média 25-40%.'
                  },
                  {
                    icon: Zap,
                    title: 'Redução de Custos',
                    description: 'Automação de processos repetitivos reduz custos operacionais em até 40% e libera equipes para tarefas estratégicas.'
                  },
                  {
                    icon: Users,
                    title: 'Melhor Experiência do Cliente',
                    description: 'Atendimento 24/7 com chatbots inteligentes, recomendações personalizadas e suporte proativo.'
                  },
                  {
                    icon: Shield,
                    title: 'Decisões Baseadas em Dados',
                    description: 'Análise preditiva e insights em tempo real para decisões mais precisas e estratégicas.'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="p-8 border-2 border-primary/30 hover:border-primary transition-all bg-gradient-to-br from-white to-primary/5">
                    <benefit.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">{benefit.title}</h3>
                    <p className="text-foreground/70">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Section 2: Applications */}
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-12">
                Aplicações de IA em Diferentes Setores
              </h2>
              <div className="space-y-6">
                {[
                  {
                    sector: 'Varejo',
                    applications: ['Previsão de demanda', 'Otimização de inventário', 'Personalização de ofertas', 'Análise de comportamento']
                  },
                  {
                    sector: 'Finanças',
                    applications: ['Análise de risco', 'Detecção de fraude', 'Previsão de mercado', 'Automação de compliance']
                  },
                  {
                    sector: 'Manufatura',
                    applications: ['Manutenção preditiva', 'Controle de qualidade', 'Otimização de produção', 'Visão computacional']
                  },
                  {
                    sector: 'Saúde',
                    applications: ['Diagnóstico assistido', 'Análise de imagens', 'Previsão de epidemias', 'Personalização de tratamentos']
                  }
                ].map((item, index) => (
                  <div key={index} className="p-8 border-2 border-foreground hover:border-primary transition-all bg-gradient-to-r from-white to-primary/5">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{item.sector}</h3>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {item.applications.map((app, appIndex) => (
                        <li key={appIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <span className="text-foreground/80">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Section 3: Implementation */}
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-12">
                Como Implementar IA na Sua Empresa
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: '1. Diagnóstico',
                    description: 'Análise profunda de oportunidades, desafios e maturidade tecnológica da sua empresa.'
                  },
                  {
                    step: '2. Estratégia',
                    description: 'Definição de roadmap, priorização de projetos e alinhamento com objetivos de negócio.'
                  },
                  {
                    step: '3. Preparação de Dados',
                    description: 'Coleta, limpeza e estruturação de dados para treinar modelos de IA eficazes.'
                  },
                  {
                    step: '4. Desenvolvimento',
                    description: 'Criação de modelos, testes e validação com dados reais da sua empresa.'
                  },
                  {
                    step: '5. Implementação',
                    description: 'Integração com sistemas existentes, treinamento de equipes e deployment em produção.'
                  },
                  {
                    step: '6. Otimização Contínua',
                    description: 'Monitoramento de performance, ajustes e melhoria contínua dos modelos.'
                  }
                ].map((item, index) => (
                  <div key={index} className="p-8 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-white">
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.step}</h3>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Cluster Content Section */}
      <section className="py-24 md:py-32 bg-white border-t-4 border-b-4 border-foreground">
        <div className="container">
          <AnimatedSection className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Conteúdo Relacionado
            </h2>
            <p className="text-lg text-foreground/70">
              Explore artigos e guias detalhados sobre tópicos específicos de IA para empresas.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clusterArticles.map((article, index) => (
              <AnimatedSection key={index} className={index >= 3 ? 'delay-100' : ''}>
                <a href={`/blog/${article.slug}`} className="group block h-full p-8 border-2 border-foreground hover:border-primary transition-all bg-gradient-to-br from-white to-primary/5 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-foreground/70 mb-6">{article.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((keyword, keyIndex) => (
                      <span key={keyIndex} className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary to-primary/80">
        <div className="container">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Pronto para Implementar IA na Sua Empresa?
            </h2>
            <p className="text-lg text-white/90 mb-12">
              Agende uma reunião com nossos especialistas e descubra como IA pode gerar resultados reais no seu negócio.
            </p>
            <Button 
              onClick={() => setIsContactOpen(true)}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 border-2 border-white text-lg px-8 py-6 h-auto font-bold"
            >
              Solicitar Diagnóstico <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white border-t-4 border-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">SAPIENTE.AI</h3>
              <p className="text-sm text-white/70">
                Inteligência Artificial Aplicada aos Negócios
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/blog" className="hover:text-white transition-colors">Blog</a>
              <a href="/" className="hover:text-white transition-colors">Contato</a>
            </div>
            <p className="text-sm text-white/70">
              © 2026 SAPIENTE.AI • Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
