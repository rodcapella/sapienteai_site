import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from "@/lib/icons";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';

import { Section } from "@/components/ui/section/Section";
import { SectionHeader } from "@/components/ui/section/SectionHeader";
import { SectionTitle } from "@/components/ui/section/SectionTitle";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { PremiumButton } from "@/components/ui/button/PremiumButton";

import { useTranslation } from '@/hooks/useTranslation';
import { getAllBlogArticles } from '@/lib/blogData';
import { setSEOHead } from '@/components/SEOHead';

const Search = Icons.Search;
const Tag = Icons.Tag;
const ArrowRight = Icons.ArrowRight;
const Calendar = Icons.Calendar;
const User = Icons.User;

const articles = getAllBlogArticles();
const categories = ['Todos', ...Array.from(new Set(articles.map(a => a.category)))];

export default function Blog() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSEOHead({
      title: 'Blog - SAPIENTE.AI',
      description: 'Insights sobre IA e tecnologia aplicada a negócios.',
      keywords: 'IA, machine learning, automação',
      url: 'https://sapienteai.com/blog',
      type: 'website'
    });
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO BANNER */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img 
          src="/media/banners/hero-banner.webp" 
          alt="Sapiente AI Blog Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6">
          <div className="container max-w-4xl text-center">
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
              {t('blog.title')}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mt-6 drop-shadow-md max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>

            {/* SEARCH */}
            <div className="relative mt-10 max-w-xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blog.search')}
                className="
                  w-full pl-14 pr-6 py-4
                  rounded-full
                  bg-white/10 backdrop-blur-md
                  border border-white/20
                  text-white
                  placeholder:text-white/50
                  focus:outline-none
                  focus:ring-2 focus:ring-primary/50
                  transition-all
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* FILTER - Ice White */}
      <Section className="bg-ice py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-bold transition-all
                  ${selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-white text-foreground/60 border border-foreground/5 hover:bg-foreground/5'}
                `}
              >
                {category === 'Todos' ? t('blog.all') : category}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ARTICLES - Blue Tint */}
      <Section className="bg-blue-tint py-20 md:py-32 flex-grow">
        <div className="container mx-auto px-6">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
              {filteredArticles.map(article => (
                <a key={article.id} href={`/blog/${article.slug}`} className="group h-full">
                  <SectionCard className="bg-white border-foreground/5 shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col p-8">

                    {/* IMAGE */}
                    <div className="h-56 -mx-8 -mt-8 mb-8 overflow-hidden rounded-t-2xl">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* CATEGORY */}
                    <div className="flex items-center gap-2 mb-4 text-primary text-xs font-bold uppercase tracking-widest">
                      <Tag className="h-3 w-3" />
                      {article.category}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* EXCERPT */}
                    <p className="text-foreground/70 mb-8 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* META */}
                    <div className="mt-auto pt-6 border-t border-foreground/5 flex items-center justify-between text-sm text-foreground/40">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.date).toLocaleDateString('pt-PT')}
                      </div>
                    </div>

                  </SectionCard>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-foreground/40 font-bold italic">{t('blog.noArticles')}</p>
            </div>
          )}
        </div>
      </Section>

      {/* NEWSLETTER - Ice White */}
      <Section className="bg-ice py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <SectionCard className="bg-white p-10 md:p-16 shadow-xl border-primary/10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                {t('blog.newsletter')}
              </h2>

              <p className="text-xl text-foreground/60 mb-10 leading-relaxed">
                {t('blog.newsletterDesc')}
              </p>

              <NewsletterForm />
            </SectionCard>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
