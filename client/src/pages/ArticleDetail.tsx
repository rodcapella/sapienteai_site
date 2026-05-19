import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, Share2 } from 'lucide-react';

import NewsletterForm from '@/components/NewsletterForm';

import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { updateMetaTags, articleSchema, generateStructuredData } from '@/lib/seo';
import { getBlogArticleBySlug, getAllBlogArticles } from '@/lib/blogData';

interface ArticleDetailProps {
  lang?: string;
  slug?: string;
}

export default function ArticleDetail({ lang = 'pt', slug = '' }: ArticleDetailProps) {
  const article = getBlogArticleBySlug(slug);
  const blogPath = `/${lang}/blog`;
  const isPT = lang !== 'en';
  const text = {
    notFound: isPT ? 'Artigo não encontrado' : 'Article not found',
    backToBlog: isPT ? 'Voltar ao blog' : 'Back to blog',
    readTime: isPT ? 'min de leitura' : 'min read',
    share: isPT ? 'Partilhar:' : 'Share:',
    newsletter: isPT ? 'Receba artigos como este' : 'Get articles like this',
    related: isPT ? 'Artigos relacionados' : 'Related articles',
  };

  useEffect(() => {
    if (article) {
      updateMetaTags({
        title: article.title,
        description: article.excerpt,
        keywords: [article.category, 'IA', 'inteligência artificial'],
        image: article.image,
        url: `https://sapienteai.com/${lang}/blog/${article.slug}`,
        type: 'article',
        author: article.author,
        publishedDate: article.date,
      });

      generateStructuredData('Article', articleSchema(article));
    }
  }, [article, lang]);

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[var(--brand-offwhite)]">
        <div className="text-center">
          <h1 className="mb-4 font-heading text-3xl font-black">{text.notFound}</h1>
          <Link href={blogPath} className="text-[var(--brand-cyan)] hover:underline">
            {text.backToBlog}
          </Link>
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
      text-[var(--brand-offwhite)]
      relative
      overflow-hidden
    ">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--brand-cyan)]/10 blur-3xl rounded-full"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>
      {/* HERO IMAGE */}
      <div>
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

          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--brand-cyan)]">
            <Tag className="h-4 w-4" />
            {article.category}
          </div>

          <h1 className="mb-6 font-heading text-4xl font-black leading-tight md:text-6xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 border-b border-white/10 pb-6 text-sm text-[var(--brand-offwhite)]/55">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {article.author}
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(article.date).toLocaleDateString(isPT ? 'pt-PT' : 'en-US')}
            </div>

            <span>{article.readTime} {text.readTime}</span>
          </div>
        </div>
      </Section>

      {/* CONTENT */}
      <Section>
        <div className="mx-auto max-w-3xl space-y-6 leading-relaxed text-[var(--brand-offwhite)]/72">
          {article.content.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* SHARE */}
        <div className="max-w-3xl mx-auto mt-12 pt-6 border-t border-white/10 flex gap-4 items-center">
          <span className="text-sm text-[var(--brand-offwhite)]/55">{text.share}</span>

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
            <h3 className="mb-4 font-heading text-xl font-black">
              {text.newsletter}
            </h3>

            <NewsletterForm variant="compact" />
          </SectionCard>
        </div>
      </Section>

      {/* RELATED */}
      {relatedArticles.length > 0 && (
        <Section>
          <div className="max-w-5xl mx-auto">
            <h3 className="mb-8 font-heading text-2xl font-black">
              {text.related}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map(post => (
                <Link key={post.id} href={`${blogPath}/${post.slug}`}>
                  <SectionCard className="group cursor-pointer">

                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-[1.02] transition"
                    />

                    <h4 className="mb-2 font-heading font-black transition group-hover:text-[var(--brand-cyan)]">
                      {post.title}
                    </h4>

                    <p className="text-sm text-[var(--brand-offwhite)]/55">
                      {post.excerpt}
                    </p>

                  </SectionCard>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
