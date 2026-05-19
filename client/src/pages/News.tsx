import { useState, useEffect } from 'react';
import { Icons } from "@/lib/icons";

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { useTranslation } from '@/hooks/useTranslation';
import { setSEOHead } from '@/components/SEOHead';

const Search = Icons.Search; 
const Calendar = Icons.Calendar; 
const User = Icons.User; 
const Tag = Icons.Tag; 

export default function News() {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setSEOHead({
      title: 'Notícias de IA - Sapiente.AI',
      description: 'Últimas novidades em inteligência artificial.',
      keywords: 'IA, notícias, machine learning',
      url: 'https://sapienteai.com/noticias',
      type: 'website'
    });
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
      image: 'https://via.placeholder.com/600x400',
      featured: true
    }
  ];

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="
      min-h-screen
      bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)]
      text-[var(--brand-offwhite)]
      relative
      overflow-hidden
    ">

      {/* BG */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--brand-cyan)]/10 blur-3xl rounded-full"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      <Header />

      {/* HERO */}
      <Section>
        <SectionHeader>
          <SectionTitle
            label="News"
            title="AI Updates & Releases"
          />
        </SectionHeader>

        <div className="max-w-2xl mx-auto text-[var(--brand-offwhite)]/60 text-center">
          <p>
            Acompanhe as tendências e lançamentos mais relevantes em IA.
          </p>

          {/* SEARCH */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-[var(--brand-offwhite)]/45" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="
                w-full pl-10 pr-4 py-3
                rounded-xl
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-[var(--brand-offwhite)]/45
                focus:border-[var(--brand-cyan)]
                outline-none
              "
            />
          </div>
        </div>
      </Section>

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
                <h3 className="mb-2 font-heading text-lg font-black transition group-hover:text-[var(--brand-cyan)]">
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
                      className="text-xs bg-white/5 px-2 py-1 rounded text-[var(--brand-cyan)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <span className="text-[var(--brand-cyan)] text-sm font-black">
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
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                placeholder="Email"
              />
              <button className="bg-[var(--brand-cyan)] text-[var(--brand-night)] px-4 rounded-xl">
                Inscrever
              </button>
            </div>

          </SectionCard>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
