import { useState, useEffect } from 'react';
import { Calendar, Search, User } from "@/lib/icons";

import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { useSEOHead } from '@/hooks/useSEOHead';





export default function News() {
  const [searchQuery, setSearchQuery] = useState('');

  useSEOHead({
    title: 'Notícias de IA - Sapiente.AI',
    description: 'Últimas novidades em inteligência artificial.',
    keywords: 'IA, notícias, machine learning',
    url: 'https://sapienteai.com/pt/news',
    type: 'website',
    noindex: true,
  }, []);

  const articles = [
    {
      id: '1',
      title: 'OpenAI anuncia GPT-5',
      excerpt: 'Melhorias em raciocínio e criatividade...',
      author: 'Sapiente.AI',
      date: '2026-02-25',
      category: 'Releases',
      tags: ['GPT-5', 'OpenAI'],
      image: '/media/banners/PT/home_o_que_nos_diferencia.webp',
      featured: true
    }
  ];

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="standard-section-bg text-[var(--brand-offwhite)] relative overflow-hidden">

      <InternalHero label="News" title="AI Updates & Releases" subtitle="Acompanhe as tendências e lançamentos mais relevantes em IA." compact>
          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-[var(--brand-offwhite)]/45" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="
                w-full pl-10 pr-4 py-3
                rounded-xl
                bg-[var(--brand-offwhite)]/5
                border border-[var(--brand-offwhite)]/10
                text-[var(--brand-offwhite)]
                placeholder:text-[var(--brand-offwhite)]/45
                focus:border-[var(--brand-cyan-bright)]
                outline-none
              "
            />
          </div>
      </InternalHero>

      {/* GRID */}
      <Section>
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {filtered.map(article => (
              <SectionCard key={article.id} className="group cursor-pointer">

                {/* IMAGE */}
                <div className="h-48 mb-4 overflow-hidden rounded-xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                {/* META */}
                <div className="flex items-center gap-4 text-xs text-[var(--brand-offwhite)]/45 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString('pt-PT')}
                  </span>

                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {article.author}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="mb-2 font-heading text-lg font-black transition group-hover:text-[var(--brand-cyan-bright)]">
                  {article.title}
                </h3>

                {/* EXCERPT */}
                <p className="text-sm text-[var(--brand-offwhite)]/60 mb-4">
                  {article.excerpt}
                </p>

                {/* TAGS */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-[var(--brand-offwhite)]/5 px-2 py-1 rounded text-[var(--brand-cyan-bright)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <span className="text-[var(--brand-cyan-bright)] text-sm font-black">
                  Ler mais →
                </span>

              </SectionCard>
            ))}

          </div>
        ) : (
          <div className="text-center text-[var(--brand-offwhite)]/60">
            Nenhum artigo encontrado.
          </div>
        )}
      </Section>

      {/* NEWSLETTER */}
      <Section>
        <div className="max-w-xl mx-auto text-center">
          <SectionCard variant="highlight">

            <h2 className="mb-4 font-heading text-2xl font-black">
              Receba atualizações
            </h2>

            <p className="text-[var(--brand-offwhite)]/60 mb-6">
              Conteúdo direto sobre IA, sem ruído.
            </p>

            <div className="flex gap-3">
              <input
                className="flex-1 px-4 py-2 rounded-xl bg-[var(--brand-offwhite)]/5 border border-[var(--brand-offwhite)]/10"
                placeholder="Email"
              />
              <button className="rounded-xl bg-[var(--brand-primary)] px-4 text-[var(--brand-offwhite)] hover:bg-[var(--brand-primary)]">
                Inscrever
              </button>
            </div>

          </SectionCard>
        </div>
      </Section>

    </div>
  );
}
