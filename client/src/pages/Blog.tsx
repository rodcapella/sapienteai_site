/**
 * Blog Page - SAPIENTE.AI
 * SEO-Optimized Blog with Consistent Visual Design
 * Color Palette: #FFFFFF, #0A1026, #1E3A8A, #00CFFF
 * Typography: Space Grotesk (headlines), IBM Plex Sans (body)
 */

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Tag, Calendar, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/hooks/useTranslation';
import NewsletterForm from '@/components/NewsletterForm';
import { getAllBlogArticles } from '@/lib/blogData';
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

const articles = getAllBlogArticles();
const categories = ['Todos', ...Array.from(new Set(articles.map(a => a.category)))];

export default function Blog() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSEOHead({
      title: 'Blog - SAPIENTE.AI | Artigos sobre IA e Transformacao Digital',
      description: 'Artigos e analises sobre Inteligencia Artificial, Machine Learning e tecnologia aplicada a negocios. Insights praticos para empresas que querem evoluir com dados.',
      keywords: 'blog IA, machine learning, inteligencia artificial, transformacao digital, data science, automacao',
      url: 'https://sapiente-ai.manus.space/blog',
      type: 'website'
    });
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Breadcrumb />

      {/* Hero Section with Blog Header Image */}
      <section className="pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/yvHNlcXPPIIYOFFi.png" 
            alt="Blog SAPIENTE.AI - Inteligência Artificial" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <AnimatedSection className="max-w-2xl">
            <p className="text-sm font-medium tracking-[0.3em] text-primary uppercase mb-4">
              {t('blog.knowledge') || 'Conhecimento • Estratégia • Inovação'}
            </p>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.1] mb-6 text-foreground">
              {t('blog.title')}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8">
              {t('blog.subtitle')}
            </p>
            <p className="text-base text-foreground/70">
              Artigos e análises sobre Inteligência Artificial, Machine Learning e tecnologia aplicada a negócios. Insights práticos da SAPIENTE.AI para empresas que querem evoluir com dados e tecnologia.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 border-b-4 border-foreground bg-white">
        <div className="container">
          <AnimatedSection>
            {/* Search Bar */}
            <div className="mb-8 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('blog.search')}
                  className="w-full pl-12 pr-4 py-3 border-2 border-foreground bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 border-2 font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white border-primary'
                      : 'border-foreground text-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {category === 'Todos' ? t('blog.all') : category}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <AnimatedSection key={article.id} className={index >= 3 ? 'delay-100' : ''}>
                  <a
                    href={`/blog/${article.slug}`}
                    className="group block h-full border-2 border-foreground hover:border-primary transition-all duration-300 overflow-hidden"
                  >
                    {/* Article Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Article Content */}
                    <div className="p-6 flex flex-col h-full">
                      {/* Category Tag */}
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="h-3 w-3 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wide">
                          {article.category}
                        </span>
                        {article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 ml-auto">
                            {article.tags.slice(0, 1).map(tag => (
                              <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-foreground/70 mb-4 flex-grow line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/60 mb-4 pb-4 border-t-2 border-foreground/10">
                        <div className="flex items-center gap-1 mt-3">
                          <User className="h-3 w-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-3">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(article.date).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <span className="mt-3">{article.readTime} min</span>
                      </div>

                      {/* Read More Button */}
                      <Button
                        className="w-full bg-primary text-white hover:bg-primary/90 border-2 border-primary font-medium group/btn"
                      >
                        {t('blog.readMore')}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection className="text-center py-12">
              <p className="text-lg text-foreground/70">
                {t('blog.noArticles') || 'Nenhum artigo encontrado. Tente outra busca ou categoria.'}
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-primary/5 border-t-4 border-foreground">
        <div className="container">
          <AnimatedSection className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
              {t('blog.newsletter') || 'Receba Insights sobre IA'}
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              {t('blog.newsletterDesc') || 'Inscreva-se na newsletter da SAPIENTE.AI e receba conteúdos exclusivos sobre inteligência artificial, machine learning e tendências tecnológicas direto na sua caixa de entrada.'}
            </p>
            <NewsletterForm />
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
