import { useEffect } from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, Share2 } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';

import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { updateMetaTags, articleSchema, generateStructuredData } from '@/lib/seo';
import { getBlogArticleBySlug, getAllBlogArticles } from '@/lib/blogData';

export default function ArticleDetail() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug as string;
  const article = getBlogArticleBySlug(slug);

  useEffect(() => {
    if (article) {
      updateMetaTags({
        title: article.title,
        description: article.excerpt,
        keywords: [article.category, 'IA', 'inteligência artificial'],
        image: article.image,
        url: `https://sapienteai.com/blog/${article.id}`,
        type: 'article',
        author: article.author,
        publishedDate: article.date,
      });

      generateStructuredData('Article', articleSchema(article));
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Artigo não encontrado</h1>
          <a href="/blog" className="text-cyan-400 hover:underline">
            Voltar ao blog
          </a>
        </div>
      </div>
    );
  }

  const relatedArticles = getAllBlogArticles()
    .filter(post => post.category === article.category && post.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="
      min-h-screen 
      bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)]
      text-white
      relative
      overflow-hidden
    ">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      <Header />

      {/* HERO IMAGE */}
      <div className="pt-28">
        <div className="w-full h-80 md:h-[420px] overflow-hidden">
          <img 
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>

      {/* HEADER */}
      <Section>
        <div className="max-w-3xl mx-auto">

          <div className="flex items-center gap-2 mb-4 text-cyan-400 text-sm uppercase tracking-wider">
            <Tag className="h-4 w-4" />
            {article.category}
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {article.author}
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(article.date).toLocaleDateString('pt-PT')}
            </div>

            <span>{article.readTime} min leitura</span>
          </div>
        </div>
      </Section>

      {/* CONTENT */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-6 text-slate-300 leading-relaxed">
          {article.content.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* SHARE */}
        <div className="max-w-3xl mx-auto mt-12 pt-6 border-t border-white/10 flex gap-4 items-center">
          <span className="text-sm text-slate-400">Compartilhar:</span>

          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>

          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Twitter
          </Button>
        </div>
      </Section>

      {/* NEWSLETTER */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <SectionCard variant="highlight">
            <h3 className="text-xl font-semibold mb-4">
              Receba artigos como este
            </h3>

            <NewsletterForm variant="compact" />
          </SectionCard>
        </div>
      </Section>

      {/* RELATED */}
      {relatedArticles.length > 0 && (
        <Section>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold mb-8">
              Artigos Relacionados
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map(post => (
                <a key={post.id} href={`/blog/${post.slug}`}>
                  <SectionCard className="group cursor-pointer">

                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-[1.02] transition"
                    />

                    <h4 className="font-semibold mb-2 group-hover:text-cyan-400 transition">
                      {post.title}
                    </h4>

                    <p className="text-sm text-slate-400">
                      {post.excerpt}
                    </p>

                  </SectionCard>
                </a>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Footer />
    </div>
  );
}