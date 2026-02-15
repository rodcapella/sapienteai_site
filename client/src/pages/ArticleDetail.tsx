/**
 * Article Detail Page
 * Individual blog article with comments and related articles
 */

import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag, Share2, MessageCircle } from 'lucide-react';
import NewsletterForm from '@/components/NewsletterForm';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { updateMetaTags, articleSchema, generateStructuredData } from '@/lib/seo';
import { getBlogArticleBySlug, getAllBlogArticles } from '@/lib/blogData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const blogPosts = getAllBlogArticles();

// Legacy interface for backward compatibility
interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
}

const legacyBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'IA Generativa: O Futuro da Automação Empresarial',
    excerpt: 'Descubra como modelos de linguagem grandes estão revolucionando a forma como as empresas automatizam processos e tomam decisões.',
    content: `A inteligência artificial generativa representa um ponto de inflexão na transformação digital. Com modelos treinados em bilhões de parâmetros, essas tecnologias conseguem compreender contexto, gerar texto coerente e executar tarefas complexas com precisão impressionante.

As aplicações práticas vão desde automação de atendimento ao cliente até análise de dados em tempo real. Empresas que adotam IA generativa relatam redução de custos operacionais de até 40% e aumento significativo na produtividade.

A SAPIENTE.AI oferece soluções customizadas de IA generativa que se integram perfeitamente aos seus processos existentes, garantindo ROI mensurável e implementação segura.`,
    author: 'Dr. Carlos Silva',
    date: '2026-02-10',
    category: 'IA Generativa',
    readTime: 8,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-1_1770834578000_na1fn_aGVyby1haS1uZXVyYWwtbmV0d29yaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '2',
    title: 'Machine Learning para Previsão de Demanda',
    excerpt: 'Como algoritmos de ML podem otimizar seu estoque e aumentar a eficiência operacional em até 40%.',
    content: `A previsão de demanda é um dos desafios mais críticos para empresas de varejo e manufatura. Modelos de machine learning treinados com dados históricos conseguem identificar padrões sazonais, tendências de mercado e comportamento do consumidor com precisão muito superior aos métodos tradicionais.

Isso resulta em redução de custos de armazenamento, menos produtos obsoletos e melhor atendimento ao cliente. Nossos clientes reportam economia média de 35% em custos de inventário após implementação de nossas soluções de ML.

A SAPIENTE.AI utiliza as técnicas mais avançadas de machine learning para criar modelos preditivos que se adaptam continuamente aos seus dados.`,
    author: 'Eng. Maria Santos',
    date: '2026-02-08',
    category: 'Machine Learning',
    readTime: 6,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-4_1770834586000_na1fn_cHJvY2Vzcy1hdXRvbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '3',
    title: 'Segurança em Sistemas de IA: Boas Práticas',
    excerpt: 'Estratégias essenciais para proteger seus modelos de IA contra ataques adversariais e vazamento de dados.',
    content: `A segurança é fundamental quando se trabalha com IA. Modelos podem ser alvo de ataques adversariais, manipulação de dados de treinamento e exploração de vulnerabilidades.

Implementar boas práticas como validação robusta de dados, monitoramento contínuo, versionamento de modelos e testes de adversarialidade é essencial para manter a integridade e confiabilidade dos sistemas.

A SAPIENTE.AI implementa os mais altos padrões de segurança em todos os seus projetos, garantindo conformidade com LGPD, GDPR e outras regulamentações.`,
    author: 'Esp. João Oliveira',
    date: '2026-02-06',
    category: 'Segurança',
    readTime: 7,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-3_1770834577000_na1fn_YWJzdHJhY3QtZGF0YS1mbG93.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '4',
    title: 'Tendências de IA em 2026: O Que Esperar',
    excerpt: 'Análise das principais tendências que moldarão o mercado de inteligência artificial nos próximos meses.',
    content: `O mercado de IA continua evoluindo rapidamente. Em 2026, esperamos ver maior adoção de IA multimodal, avanços em explicabilidade de modelos (XAI), integração de IA em edge computing, e crescimento de modelos especializados para domínios específicos.

Além disso, questões regulatórias e éticas ganham cada vez mais importância, com governos estabelecendo frameworks para uso responsável de IA.

A SAPIENTE.AI acompanha de perto essas tendências e oferece soluções que estão sempre à frente da curva tecnológica.`,
    author: 'Analista Tech. Ana Costa',
    date: '2026-02-04',
    category: 'Tendências',
    readTime: 9,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-5_1770834589000_na1fn_c3RyYXRlZ2ljLWNvbnN1bHRpbmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '5',
    title: 'Deep Learning para Visão Computacional',
    excerpt: 'Aplicações práticas de redes neurais convolucionais em detecção de objetos e análise de imagens.',
    content: `A visão computacional com deep learning transformou indústrias inteiras. Desde detecção de anomalias em manufatura até diagnóstico médico assistido por IA, as redes neurais convolucionais conseguem processar imagens com precisão comparável ou superior à visão humana.

Tecnologias como YOLO, ResNet e Vision Transformers abrem novas possibilidades para automação inteligente. Aplicações práticas incluem inspeção de qualidade, segurança, análise médica e muito mais.

A SAPIENTE.AI desenvolve soluções customizadas de visão computacional que se adaptam aos seus casos de uso específicos.`,
    author: 'Dr. Pedro Ferreira',
    date: '2026-02-02',
    category: 'Deep Learning',
    readTime: 8,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-1_1770834578000_na1fn_aGVyby1haS1uZXVyYWwtbmV0d29yaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
  {
    id: '6',
    title: 'ROI de Projetos de IA: Como Medir o Sucesso',
    excerpt: 'Métricas e KPIs essenciais para avaliar o retorno sobre investimento em soluções de inteligência artificial.',
    content: `Medir o ROI de projetos de IA pode ser complexo, mas é essencial para justificar investimentos. Além de métricas técnicas como acurácia e precisão, é importante considerar impacto nos negócios: redução de custos operacionais, aumento de receita, melhoria na satisfação do cliente e eficiência de tempo.

Uma abordagem holística que combine métricas técnicas com KPIs de negócio fornece uma visão completa do sucesso do projeto.

A SAPIENTE.AI trabalha com você para definir métricas significativas e acompanhar o progresso continuamente.`,
    author: 'Consultor de Negócios Rafael Lima',
    date: '2026-01-31',
    category: 'Negócios',
    readTime: 7,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-4_1770834586000_na1fn_cHJvY2Vzcy1hdXRvbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
];

export default function ArticleDetail() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug as string;
  const article = getBlogArticleBySlug(slug);

  useEffect(() => {
    if (article) {
      updateMetaTags({
        title: article.title,
        description: article.excerpt,
        keywords: [article.category, 'IA', 'inteligência artificial', 'machine learning'],
        image: article.image,
        url: `https://sapiente-ai.manus.space/blog/${article.id}`,
        type: 'article',
        author: article.author,
        publishedDate: article.date,
      });

      generateStructuredData('Article', articleSchema(article));
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
          <a href="/blog" className="text-primary hover:underline">
            Voltar ao blog
          </a>
        </div>
      </div>
    );
  }

  const allArticles = getAllBlogArticles();
  const relatedArticles = allArticles
    .filter(post => post.category === article?.category && post.slug !== article?.slug)
    .slice(0, 3);



  return (
    <div className="min-h-screen">
      <Header />

      {/* Article Content */}
      <article className="pt-32 pb-24">
        {/* Featured Image */}
        <div className="w-full h-96 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container">
          {/* Article Header */}
          <AnimatedSection className="max-w-3xl mx-auto py-12">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wide">
                {article.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-[0.9] mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-6 border-b-2 border-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <span>{article.readTime} min de leitura</span>
            </div>
          </AnimatedSection>

          {/* Article Body */}
          <AnimatedSection className="max-w-3xl mx-auto py-12">
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed mb-6 text-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 my-12 pt-6 border-t-2 border-foreground">
              <span className="text-sm font-medium">Compartilhar:</span>
              <Button variant="outline" className="border-2 border-foreground">
                <Share2 className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" className="border-2 border-foreground">
                <Share2 className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
          </AnimatedSection>

          {/* Newsletter CTA */}
          <AnimatedSection className="max-w-3xl mx-auto py-12 bg-muted p-8 border-2 border-foreground">
            <h3 className="text-2xl font-bold mb-4">Receba artigos como este</h3>
            <NewsletterForm variant="compact" />
          </AnimatedSection>



          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <AnimatedSection className="max-w-3xl mx-auto py-12">
              <h3 className="text-3xl font-bold mb-8">Artigos Relacionados</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map(post => (
                  <a
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="border-2 border-foreground p-6 hover:border-primary transition-all duration-300 group"
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-40 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  </a>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 bg-black text-white border-t-4 border-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/MhgEHrbSKkdNFKRr.png" 
                alt="SAPIENTE.AI" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm text-white/70">
              © 2026 SAPIENTE.AI • Inteligência Artificial Aplicada
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
