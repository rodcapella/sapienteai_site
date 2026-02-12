/**
 * Blog Page - Articles about AI and Technology
 * Educational content for SEO and thought leadership
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'IA Generativa: O Futuro da Automação Empresarial',
    excerpt: 'Descubra como modelos de linguagem grandes estão revolucionando a forma como as empresas automatizam processos e tomam decisões.',
    content: 'A inteligência artificial generativa representa um ponto de inflexão na transformação digital. Com modelos treinados em bilhões de parâmetros, essas tecnologias conseguem compreender contexto, gerar texto coerente e executar tarefas complexas com precisão impressionante. As aplicações práticas vão desde automação de atendimento ao cliente até análise de dados em tempo real.',
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
    content: 'A previsão de demanda é um dos desafios mais críticos para empresas de varejo e manufatura. Modelos de machine learning treinados com dados históricos conseguem identificar padrões sazonais, tendências de mercado e comportamento do consumidor com precisão muito superior aos métodos tradicionais. Isso resulta em redução de custos de armazenamento, menos produtos obsoletos e melhor atendimento ao cliente.',
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
    content: 'A segurança é fundamental quando se trabalha com IA. Modelos podem ser alvo de ataques adversariais, manipulação de dados de treinamento e exploração de vulnerabilidades. Implementar boas práticas como validação robusta de dados, monitoramento contínuo, versionamento de modelos e testes de adversarialidade é essencial para manter a integridade e confiabilidade dos sistemas.',
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
    content: 'O mercado de IA continua evoluindo rapidamente. Em 2026, esperamos ver maior adoção de IA multimodal, avanços em explicabilidade de modelos (XAI), integração de IA em edge computing, e crescimento de modelos especializados para domínios específicos. Além disso, questões regulatórias e éticas ganham cada vez mais importância, com governos estabelecendo frameworks para uso responsável de IA.',
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
    content: 'A visão computacional com deep learning transformou indústrias inteiras. Desde detecção de anomalias em manufatura até diagnóstico médico assistido por IA, as redes neurais convolucionais conseguem processar imagens com precisão comparável ou superior à visão humana. Tecnologias como YOLO, ResNet e Vision Transformers abrem novas possibilidades para automação inteligente.',
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
    content: 'Medir o ROI de projetos de IA pode ser complexo, mas é essencial para justificar investimentos. Além de métricas técnicas como acurácia e precisão, é importante considerar impacto nos negócios: redução de custos operacionais, aumento de receita, melhoria na satisfação do cliente e eficiência de tempo. Uma abordagem holística que combine métricas técnicas com KPIs de negócio fornece uma visão completa do sucesso do projeto.',
    author: 'Consultor de Negócios Rafael Lima',
    date: '2026-01-31',
    category: 'Negócios',
    readTime: 7,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-4_1770834586000_na1fn_cHJvY2Vzcy1hdXRvbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground">
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-3">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/UCZcamqTyYghcjGW.png" 
                alt="SAPIENTE.AI" 
                className="h-14 w-auto"
              />
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/#servicos" className="text-sm font-medium hover:text-primary transition-colors">Serviços</a>
              <a href="/#portfolio" className="text-sm font-medium hover:text-primary transition-colors">Portfólio</a>
              <a href="/blog" className="text-sm font-medium text-primary">Blog</a>
              <a href="/#diferenciais" className="text-sm font-medium hover:text-primary transition-colors">Contato</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-1_1770834578000_na1fn_aGVyby1haS1uZXVyYWwtbmV0d29yaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80" 
            alt="AI" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.3em] text-muted-foreground mb-6 uppercase">
              Conhecimento e Insights
            </p>
            <h1 className="text-6xl md:text-7xl font-black leading-[0.9] mb-8">
              Blog <span className="text-primary">SAPIENTE.AI</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Artigos educativos sobre inteligência artificial, machine learning e tendências tecnológicas
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b-4 border-foreground">
        <div className="container">
          <AnimatedSection>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? 'default' : 'outline'}
                className={`border-2 ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-foreground'
                }`}
              >
                Todos os Artigos
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`border-2 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-foreground'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <AnimatedSection key={post.id}>
                <article className="border-2 border-foreground overflow-hidden hover:border-primary transition-all duration-300 h-full flex flex-col group">
                  {/* Image */}
                  <div className="h-48 overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Category Tag */}
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 pb-6 border-t-2 border-foreground pt-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <span className="ml-auto">{post.readTime} min</span>
                    </div>

                    {/* Read More Button */}
                    <Button className="w-full bg-foreground text-background hover:bg-foreground/90 border-2 border-foreground">
                      Ler Artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <AnimatedSection className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Nenhum artigo encontrado nesta categoria.
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background border-t-4 border-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/MhgEHrbSKkdNFKRr.png" 
                alt="SAPIENTE.AI" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-sm text-background/70">
              © 2026 SAPIENTE.AI • Inteligência Artificial Aplicada
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
