/**
 * Blog Page - SAPIENTE.AI
 * SEO-Optimized Blog with Consistent Visual Design
 * Color Palette: #FFFFFF, #0A1026, #1E3A8A, #00CFFF
 * Typography: Space Grotesk (headlines), IBM Plex Sans (body)
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Tag, Calendar, User } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import NewsletterForm from '@/components/NewsletterForm';

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

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
}

const articles: BlogArticle[] = [
  {
    id: '1',
    title: 'IA Generativa: O Futuro da Automação Empresarial',
    excerpt: 'Descubra como modelos de linguagem grandes estão revolucionando a forma como as empresas automatizam processos e tomam decisões inteligentes.',
    category: 'IA Generativa',
    author: 'Dr. Carlos Silva',
    date: '2026-02-10',
    readTime: 8,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-1_1770834578000_na1fn_aGVyby1haS1uZXVyYWwtbmV0d29yaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '2',
    title: 'Machine Learning para Previsão de Demanda',
    excerpt: 'Como algoritmos de ML podem otimizar seu estoque e aumentar a eficiência operacional em até 40% com previsões precisas.',
    category: 'Machine Learning',
    author: 'Eng. Maria Santos',
    date: '2026-02-08',
    readTime: 6,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-4_1770834586000_na1fn_cHJvY2Vzcy1hdXRvbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '3',
    title: 'Segurança em Sistemas de IA: Boas Práticas',
    excerpt: 'Estratégias essenciais para proteger seus modelos de IA contra ataques adversariais e garantir conformidade com LGPD e GDPR.',
    category: 'Segurança',
    author: 'Esp. João Oliveira',
    date: '2026-02-06',
    readTime: 7,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-3_1770834577000_na1fn_YWJzdHJhY3QtZGF0YS1mbG93.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '4',
    title: 'Tendências de IA em 2026: O Que Esperar',
    excerpt: 'Análise das principais tendências que moldarão o mercado de inteligência artificial, desde IA multimodal até regulamentações emergentes.',
    category: 'Tendências',
    author: 'Analista Tech. Ana Costa',
    date: '2026-02-04',
    readTime: 9,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-5_1770834589000_na1fn_c3RyYXRlZ2ljLWNvbnN1bHRpbmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '5',
    title: 'Deep Learning para Visão Computacional',
    excerpt: 'Aplicações práticas de redes neurais convolucionais em detecção de objetos, análise de imagens e inspeção de qualidade.',
    category: 'Deep Learning',
    author: 'Dr. Pedro Ferreira',
    date: '2026-02-02',
    readTime: 8,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-1_1770834578000_na1fn_aGVyby1haS1uZXVyYWwtbmV0d29yaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '6',
    title: 'ROI de Projetos de IA: Como Medir o Sucesso',
    excerpt: 'Métricas e KPIs essenciais para avaliar o retorno sobre investimento em soluções de inteligência artificial e tecnologia.',
    category: 'Negócios',
    author: 'Consultor de Negócios Rafael Lima',
    date: '2026-01-31',
    readTime: 7,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-4_1770834586000_na1fn_cHJvY2Vzcy1hdXRvbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
];

const categories = ['Todos', 'IA Generativa', 'Machine Learning', 'Deep Learning', 'Segurança', 'Tendências', 'Negócios'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-foreground">
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
              Conhecimento • Estratégia • Inovação
            </p>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.1] mb-6 text-foreground">
              Blog <span className="text-primary">SAPIENTE.AI</span> — Inteligência Artificial Aplicada aos Negócios
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8">
              Conteúdos em IA, machine learning e tecnologia para profissionais e líderes.
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
                  placeholder="Buscar artigos..."
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
                  {category}
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
                    href={`/blog/${article.id}`}
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
                          <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <span className="mt-3">{article.readTime} min</span>
                      </div>

                      {/* Read More Button */}
                      <Button
                        className="w-full bg-primary text-white hover:bg-primary/90 border-2 border-primary font-medium group/btn"
                      >
                        Ler Artigo
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
                Nenhum artigo encontrado. Tente outra busca ou categoria.
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
              Receba Insights sobre IA
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Inscreva-se na newsletter da SAPIENTE.AI e receba conteúdos exclusivos sobre inteligência artificial, machine learning e tendências tecnológicas direto na sua caixa de entrada.
            </p>
            <NewsletterForm />
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
