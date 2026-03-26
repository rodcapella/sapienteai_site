/**
 * AI News Page - Latest AI News and Releases
 * Placeholder for headless CMS integration
 * Features: Categories, Tags, Authors, Highlights, Pagination, Filters, Newsletter, Structured Data
 */

import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, User, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { setSEOHead } from '@/components/SEOHead';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  type: 'ai-releases' | 'news';
}

export default function News() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSEOHead({
      title: 'Notícias de IA - SAPIENTE.AI | Últimas Novidades em Inteligência Artificial',
      description: 'Acompanhe as últimas notícias, releases e tendências em inteligência artificial e machine learning.',
      keywords: 'notícias IA, inteligência artificial, machine learning, releases, tendências tecnológicas',
      url: 'https://sapiente-ai.manus.space/noticias',
      type: 'website'
    });
  }, []);

  // Placeholder articles - será substituído por CMS headless
  const articles: NewsArticle[] = [
    {
      id: '1',
      title: 'OpenAI Anuncia GPT-5: Avanços em Raciocínio e Criatividade',
      excerpt: 'A OpenAI revelou os primeiros detalhes sobre o GPT-5, com melhorias significativas em capacidades de raciocínio...',
      content: 'Conteúdo completo do artigo...',
      author: 'SAPIENTE.AI',
      date: '2026-02-25',
      category: 'Releases',
      tags: ['GPT-5', 'OpenAI', 'LLM'],
      image: 'https://via.placeholder.com/600x400',
      featured: true,
      type: 'ai-releases'
    },
    {
      id: '2',
      title: 'Google DeepMind Apresenta Novo Algoritmo de Otimização',
      excerpt: 'Pesquisadores do Google DeepMind desenvolvem algoritmo revolucionário para otimização de redes neurais...',
      content: 'Conteúdo completo do artigo...',
      author: 'SAPIENTE.AI',
      date: '2026-02-24',
      category: 'Pesquisa',
      tags: ['DeepMind', 'Otimização', 'Redes Neurais'],
      image: 'https://via.placeholder.com/600x400',
      featured: true,
      type: 'ai-releases'
    },
    {
      id: '3',
      title: 'Tendências de IA para 2026: O Que Esperar',
      excerpt: 'Análise das principais tendências em inteligência artificial que devem dominar o mercado em 2026...',
      content: 'Conteúdo completo do artigo...',
      author: 'SAPIENTE.AI',
      date: '2026-02-23',
      category: 'Análise',
      tags: ['Tendências', '2026', 'Mercado'],
      image: 'https://via.placeholder.com/600x400',
      featured: false,
      type: 'news'
    }
  ];

  const categories = ['all', 'Releases', 'Pesquisa', 'Análise', 'Tutorial'];
  const types = [
    { value: 'all', label: 'Todos' },
    { value: 'ai-releases', label: 'AI Releases' },
    { value: 'news', label: 'Notícias' }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesType = selectedType === 'all' || article.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 min-h-screen">
      <Header />

      {/* HERO SECTION */}
      <section className="pt-20 md:pt-32 pb-16 md:pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center">
            <p className="text-cyan-400 font-semibold mb-4 text-sm md:text-base uppercase tracking-wider">
              Notícias
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Últimas Notícias de IA
            </h1>
            <p className="text-xl text-slate-300">
              Acompanhe as tendências, releases e inovações em inteligência artificial
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="py-8 px-4 border-b border-blue-800/50">
        <div className="container mx-auto max-w-6xl">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Pesquisar notícias..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-blue-800/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Categoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 bg-slate-900/50 border border-blue-800/50 rounded-2xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="all">Todas</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Tipo</label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 bg-slate-900/50 border border-blue-800/50 rounded-2xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
              >
                {types.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-32 md:py-40 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          {paginatedArticles.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-800/50 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {article.featured && (
                        <div className="absolute top-4 right-4 bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Destaque
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 mb-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(article.date).toLocaleDateString('pt-PT')}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {article.author}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 text-xs bg-blue-900/50 text-cyan-300 px-2 py-1 rounded">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm">
                        Ler Mais →
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-slate-900/50 border border-blue-800/50 rounded-2xl text-white disabled:opacity-50 hover:border-cyan-400/50 transition-colors"
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-2xl font-semibold transition-colors ${
                        currentPage === page
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-900/50 border border-blue-800/50 text-white hover:border-cyan-400/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-slate-900/50 border border-blue-800/50 rounded-2xl text-white disabled:opacity-50 hover:border-cyan-400/50 transition-colors"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">Nenhum artigo encontrado. Tente outra busca ou filtro.</p>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-32 md:py-40 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('blog.newsletter')}
          </h2>
          <p className="text-lg text-slate-300 mb-12">
            {t('blog.newsletterDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-1 px-4 py-3 bg-slate-900/50 border border-blue-800/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 font-semibold rounded-2xl transition-colors duration-300">
              {t('newsletter.subscribe')}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
