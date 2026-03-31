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
    <div className="
      min-h-screen 
      bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)]
      text-white
      relative
      overflow-hidden
      flex flex-col
    ">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      <Header />

      {/* HERO */}
      <Section id="home">
        <SectionHeader>
          <SectionTitle
            label={t('blog.knowledge')}
            title={t('blog.title')}
          />
        </SectionHeader>

        <div className="max-w-2xl text-slate-400">
          <p className="mb-6">{t('blog.subtitle')}</p>

          {/* SEARCH */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('blog.search')}
              className="
                w-full pl-10 pr-4 py-3
                rounded-xl
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-slate-500
                focus:outline-none
                focus:border-cyan-400
              "
            />
          </div>
        </div>
      </Section>

      {/* FILTER */}
      <Section>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm transition-all
                ${selectedCategory === category
                  ? 'bg-cyan-400 text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'}
              `}
            >
              {category === 'Todos' ? t('blog.all') : category}
            </button>
          ))}
        </div>
      </Section>

      {/* ARTICLES */}
      <Section>
        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredArticles.map(article => (
              <a key={article.id} href={`/blog/${article.slug}`}>
                <SectionCard className="group cursor-pointer">

                  {/* IMAGE */}
                  <div className="h-48 mb-4 overflow-hidden rounded-xl">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  {/* CATEGORY */}
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs uppercase">
                    <Tag className="h-3 w-3" />
                    {article.category}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition">
                    {article.title}
                  </h3>

                  {/* EXCERPT */}
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* META */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author}
                    </div>

                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString('pt-PT')}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button variant="outline" className="w-full">
                    {t('blog.readMore')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                  </Button>

                </SectionCard>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400">
            {t('blog.noArticles')}
          </div>
        )}
      </Section>

      {/* NEWSLETTER */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <SectionCard variant="highlight">
            <h2 className="text-2xl font-semibold mb-4">
              {t('blog.newsletter')}
            </h2>

            <p className="text-slate-400 mb-6">
              {t('blog.newsletterDesc')}
            </p>

            <NewsletterForm />
          </SectionCard>
        </div>
      </Section>

      <Footer />
    </div>
  );
}