import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ContactModal from '@/components/ContactModal';
import { Icons } from "@/lib/icons";

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { InternalHero } from "@/components/ui/hero/InternalHero";

interface ClusterArticle {
  title: string;
  slug: string;
  description: string;
  keywords: string[];
}

const ArrowRight = Icons.ArrowRight;
const CheckCircle = Icons.CheckCircle;
const TrendingUp = Icons.TrendingUp;
const Zap = Icons.Zap;
const Shield = Icons.Shield;
const Users = Icons.Users;

const clusterArticles: ClusterArticle[] = [
  {
    title: 'IA Generativa: O Futuro da Automação Empresarial',
    slug: 'ia-generativa-futuro-automacao',
    description: 'Como modelos de linguagem grandes estão revolucionando a forma como as empresas automatizam processos.',
    keywords: ['IA generativa', 'automação', 'transformação digital']
  },
  {
    title: 'Machine Learning para previsão de procura',
    slug: 'machine-learning-previsao-demanda',
    description: 'Algoritmos de ML para otimizar inventário e aumentar eficiência operacional em até 40%.',
    keywords: ['machine learning', 'previsão', 'otimização']
  },
  {
    title: 'Segurança em Sistemas de IA: Boas Práticas',
    slug: 'seguranca-sistemas-ia',
    description: 'Estratégias essenciais para proteger seus modelos de IA contra ataques e garantir conformidade.',
    keywords: ['segurança IA', 'RGPD', 'conformidade']
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
    description: 'Aplicações práticas de redes neurais em análise de imagens.',
    keywords: ['deep learning', 'visão computacional', 'CNN']
  },
  {
    title: 'ROI de Projetos de IA: Como Medir o Sucesso',
    slug: 'roi-projetos-ia',
    description: 'Métricas essenciais para avaliar retorno em IA.',
    keywords: ['ROI', 'negócios', 'métricas']
  }
];

export default function AIPillar() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="standard-section-bg min-h-screen text-[var(--brand-offwhite)] relative overflow-hidden">

      <InternalHero
        label="IA para Empresas"
        title="Inteligência Artificial para Empresas"
        subtitle="Tudo o que precisa de saber sobre IA aplicada a negócios."
        compact
      >
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => setIsContactOpen(true)}>
              Solicitar Diagnóstico <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button variant="outline">
              Fale com um especialista
            </Button>
          </div>
      </InternalHero>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* DEFINIÇÃO */}
      <Section id="definition">
        <div className="max-w-3xl space-y-6 text-[var(--brand-offwhite)]/60 leading-relaxed">
          <h2 className="font-heading text-3xl font-black text-[var(--brand-offwhite)] md:text-4xl">
            O que é Inteligência Artificial para Empresas?
          </h2>

          <p>
            <strong className="text-[var(--brand-offwhite)]">IA aplicada a negócios</strong> usa dados e algoritmos para decisões mais rápidas e precisas.
          </p>

          <p>
            Diferente da automação tradicional, a IA aprende e evolui continuamente.
          </p>

          <p>
            O foco é gerar <strong className="text-[var(--brand-offwhite)]">ROI real</strong> e crescimento sustentável.
          </p>
        </div>
      </Section>

      {/* BENEFÍCIOS */}
      <Section id="benefits">
        <SectionHeader>
          <SectionTitle title="Benefícios da IA para Negócios" />
        </SectionHeader>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: TrendingUp,
              title: 'Aumento de receitas',
              description: 'Aumento de vendas com personalização inteligente.'
            },
            {
              icon: Zap,
              title: 'Redução de Custos',
              description: 'Automação reduz custos operacionais.'
            },
            {
              icon: Users,
              title: 'Experiência do Cliente',
              description: 'Atendimento inteligente e personalizado.'
            },
            {
              icon: Shield,
              title: 'Decisões Inteligentes',
              description: 'Insights baseados em dados.'
            }
          ].map((b, i) => {
            const Icon = b.icon;

            return (
              <SectionCard key={i}>
                <Icon className="h-10 w-10 text-[var(--brand-cyan)] mb-4" />
                <h3 className="mb-2 font-heading text-xl font-black">{b.title}</h3>
                <p className="text-[var(--brand-offwhite)]/60">{b.description}</p>
              </SectionCard>
            );
          })}
        </div>
      </Section>

      {/* APLICAÇÕES */}
      <Section id="applications">
        <SectionHeader>
          <SectionTitle title="Aplicações por Setor" />
        </SectionHeader>

        <div className="space-y-6 max-w-5xl mx-auto">
          {[
            { sector: 'Varejo', apps: ['Previsão', 'Inventário'] },
            { sector: 'Finanças', apps: ['Fraude', 'Risco'] },
            { sector: 'Saúde', apps: ['Diagnóstico', 'Análise'] }
          ].map((item, i) => (
            <SectionCard key={i} variant="subtle">
              <h3 className="mb-4 font-heading text-xl font-black">{item.sector}</h3>

              <ul className="grid md:grid-cols-2 gap-3">
                {item.apps.map((app, idx) => (
                  <li key={idx} className="flex gap-2 items-center text-[var(--brand-offwhite)]/60">
                    <CheckCircle className="h-4 w-4 text-[var(--brand-cyan)]" />
                    {app}
                  </li>
                ))}
              </ul>
            </SectionCard>
          ))}
        </div>
      </Section>

      {/* CLUSTER */}
      <Section id="articles">
        <SectionHeader>
          <SectionTitle title="Conteúdo Relacionado" />
        </SectionHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {clusterArticles.map((article, i) => (
            <SectionCard key={i} className="group cursor-pointer">
              <h3 className="mb-3 font-heading text-lg font-black transition group-hover:text-[var(--brand-cyan)]">
                {article.title}
              </h3>

              <p className="text-[var(--brand-offwhite)]/60 mb-4">
                {article.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {article.keywords.map((k, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]">
                    {k}
                  </span>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta" className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="mb-6 font-heading text-4xl font-black">
            Pronto para implementar IA?
          </h2>

          <p className="text-[var(--brand-offwhite)]/60 mb-10">
            Descubra como gerar resultados reais.
          </p>

          <Button onClick={() => setIsContactOpen(true)}>
            Solicitar Diagnóstico
          </Button>
        </div>
      </Section>
    </div>
  );
}
