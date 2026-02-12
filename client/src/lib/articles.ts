/**
 * Articles Data Service
 * This service manages blog articles and is designed to be easily integrated with a backend CMS
 * 
 * For CMS Integration:
 * 1. Replace this static data with API calls to your backend
 * 2. Implement endpoints like:
 *    - GET /api/articles - List all articles
 *    - GET /api/articles/:id - Get single article
 *    - POST /api/articles - Create article (admin)
 *    - PUT /api/articles/:id - Update article (admin)
 *    - DELETE /api/articles/:id - Delete article (admin)
 * 3. Add caching and pagination for performance
 */

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  slug?: string;
  tags?: string[];
  featured?: boolean;
}

// Static data - replace with API calls for production
export const articlesData: Article[] = [
  {
    id: '1',
    title: 'IA Generativa: O Futuro da Automação Empresarial',
    excerpt: 'Descubra como modelos de linguagem grandes estão revolucionando a forma como as empresas automatizam processos e tomam decisões inteligentes.',
    content: `A inteligência artificial generativa representa um ponto de inflexão na transformação digital. Com modelos treinados em bilhões de parâmetros, essas tecnologias conseguem compreender contexto, gerar texto coerente e executar tarefas complexas com precisão impressionante.

As aplicações práticas vão desde automação de atendimento ao cliente até análise de dados em tempo real. Empresas que adotam IA generativa relatam redução de custos operacionais de até 40% e aumento significativo na produtividade.

A SAPIENTE.AI oferece soluções customizadas de IA generativa que se integram perfeitamente aos seus processos existentes, garantindo ROI mensurável e implementação segura.`,
    category: 'IA Generativa',
    author: 'Dr. Carlos Silva',
    date: '2026-02-10',
    readTime: 8,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-1_1770834578000_na1fn_aGVyby1haS1uZXVyYWwtbmV0d29yaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    slug: 'ia-generativa-futuro-automacao',
    tags: ['IA Generativa', 'Automação', 'Transformação Digital'],
    featured: true,
  },
  {
    id: '2',
    title: 'Machine Learning para Previsão de Demanda',
    excerpt: 'Como algoritmos de ML podem otimizar seu estoque e aumentar a eficiência operacional em até 40% com previsões precisas.',
    content: `A previsão de demanda é um dos desafios mais críticos para empresas de varejo e manufatura. Modelos de machine learning treinados com dados históricos conseguem identificar padrões sazonais, tendências de mercado e comportamento do consumidor com precisão muito superior aos métodos tradicionais.

Isso resulta em redução de custos de armazenamento, menos produtos obsoletos e melhor atendimento ao cliente. Nossos clientes reportam economia média de 35% em custos de inventário após implementação de nossas soluções de ML.

A SAPIENTE.AI utiliza as técnicas mais avançadas de machine learning para criar modelos preditivos que se adaptam continuamente aos seus dados.`,
    category: 'Machine Learning',
    author: 'Eng. Maria Santos',
    date: '2026-02-08',
    readTime: 6,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-4_1770834586000_na1fn_cHJvY2Vzcy1hdXRvbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    slug: 'machine-learning-previsao-demanda',
    tags: ['Machine Learning', 'Previsão', 'Otimização'],
  },
  {
    id: '3',
    title: 'Segurança em Sistemas de IA: Boas Práticas',
    excerpt: 'Estratégias essenciais para proteger seus modelos de IA contra ataques adversariais e garantir conformidade com LGPD e GDPR.',
    content: `A segurança é fundamental quando se trabalha com IA. Modelos podem ser alvo de ataques adversariais, manipulação de dados de treinamento e exploração de vulnerabilidades.

Implementar boas práticas como validação robusta de dados, monitoramento contínuo, versionamento de modelos e testes de adversarialidade é essencial para manter a integridade e confiabilidade dos sistemas.

A SAPIENTE.AI implementa os mais altos padrões de segurança em todos os seus projetos, garantindo conformidade com LGPD, GDPR e outras regulamentações.`,
    category: 'Segurança',
    author: 'Esp. João Oliveira',
    date: '2026-02-06',
    readTime: 7,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-3_1770834577000_na1fn_YWJzdHJhY3QtZGF0YS1mbG93.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    slug: 'seguranca-sistemas-ia',
    tags: ['Segurança', 'IA', 'Conformidade'],
  },
  {
    id: '4',
    title: 'Tendências de IA em 2026: O Que Esperar',
    excerpt: 'Análise das principais tendências que moldarão o mercado de inteligência artificial, desde IA multimodal até regulamentações emergentes.',
    content: `O mercado de IA continua evoluindo rapidamente. Em 2026, esperamos ver maior adoção de IA multimodal, avanços em explicabilidade de modelos (XAI), integração de IA em edge computing, e crescimento de modelos especializados para domínios específicos.

Além disso, questões regulatórias e éticas ganham cada vez mais importância, com governos estabelecendo frameworks para uso responsável de IA.

A SAPIENTE.AI acompanha de perto essas tendências e oferece soluções que estão sempre à frente da curva tecnológica.`,
    category: 'Tendências',
    author: 'Analista Tech. Ana Costa',
    date: '2026-02-04',
    readTime: 9,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-5_1770834589000_na1fn_c3RyYXRlZ2ljLWNvbnN1bHRpbmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    slug: 'tendencias-ia-2026',
    tags: ['Tendências', 'Tecnologia', 'Futuro'],
    featured: true,
  },
  {
    id: '5',
    title: 'Deep Learning para Visão Computacional',
    excerpt: 'Aplicações práticas de redes neurais convolucionais em detecção de objetos, análise de imagens e inspeção de qualidade.',
    content: `A visão computacional com deep learning transformou indústrias inteiras. Desde detecção de anomalias em manufatura até diagnóstico médico assistido por IA, as redes neurais convolucionais conseguem processar imagens com precisão comparável ou superior à visão humana.

Tecnologias como YOLO, ResNet e Vision Transformers abrem novas possibilidades para automação inteligente. Aplicações práticas incluem inspeção de qualidade, segurança, análise médica e muito mais.

A SAPIENTE.AI desenvolve soluções customizadas de visão computacional que se adaptam aos seus casos de uso específicos.`,
    category: 'Deep Learning',
    author: 'Dr. Pedro Ferreira',
    date: '2026-02-02',
    readTime: 8,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-1_1770834578000_na1fn_aGVyby1haS1uZXVyYWwtbmV0d29yaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    slug: 'deep-learning-visao-computacional',
    tags: ['Deep Learning', 'Visão Computacional', 'CNN'],
  },
  {
    id: '6',
    title: 'ROI de Projetos de IA: Como Medir o Sucesso',
    excerpt: 'Métricas e KPIs essenciais para avaliar o retorno sobre investimento em soluções de inteligência artificial e tecnologia.',
    content: `Medir o ROI de projetos de IA pode ser complexo, mas é essencial para justificar investimentos. Além de métricas técnicas como acurácia e precisão, é importante considerar impacto nos negócios: redução de custos operacionais, aumento de receita, melhoria na satisfação do cliente e eficiência de tempo.

Uma abordagem holística que combine métricas técnicas com KPIs de negócio fornece uma visão completa do sucesso do projeto.

A SAPIENTE.AI trabalha com você para definir métricas significativas e acompanhar o progresso continuamente.`,
    category: 'Negócios',
    author: 'Consultor de Negócios Rafael Lima',
    date: '2026-01-31',
    readTime: 7,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-4_1770834586000_na1fn_cHJvY2Vzcy1hdXRvbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
    slug: 'roi-projetos-ia',
    tags: ['ROI', 'Negócios', 'Métricas'],
  },
];

/**
 * Get all articles
 * For CMS: Replace with: return fetch('/api/articles').then(r => r.json())
 */
export async function getAllArticles(): Promise<Article[]> {
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => resolve(articlesData), 100);
  });
}

/**
 * Get article by ID
 * For CMS: Replace with: return fetch(`/api/articles/${id}`).then(r => r.json())
 */
export async function getArticleById(id: string): Promise<Article | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(articlesData.find(article => article.id === id) || null);
    }, 100);
  });
}

/**
 * Get article by slug
 * For CMS: Replace with: return fetch(`/api/articles/slug/${slug}`).then(r => r.json())
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(articlesData.find(article => article.slug === slug) || null);
    }, 100);
  });
}

/**
 * Get featured articles
 * For CMS: Replace with: return fetch('/api/articles?featured=true').then(r => r.json())
 */
export async function getFeaturedArticles(): Promise<Article[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(articlesData.filter(article => article.featured).slice(0, 3));
    }, 100);
  });
}

/**
 * Get articles by category
 * For CMS: Replace with: return fetch(`/api/articles?category=${category}`).then(r => r.json())
 */
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(articlesData.filter(article => article.category === category));
    }, 100);
  });
}

/**
 * Search articles
 * For CMS: Replace with: return fetch(`/api/articles/search?q=${query}`).then(r => r.json())
 */
export async function searchArticles(query: string): Promise<Article[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      resolve(
        articlesData.filter(
          article =>
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.content.toLowerCase().includes(lowerQuery) ||
            article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
        )
      );
    }, 100);
  });
}

/**
 * Get related articles
 * For CMS: Replace with: return fetch(`/api/articles/${id}/related`).then(r => r.json())
 */
export async function getRelatedArticles(id: string, limit: number = 3): Promise<Article[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const article = articlesData.find(a => a.id === id);
      if (!article) {
        resolve([]);
        return;
      }

      const related = articlesData
        .filter(a => a.id !== id && a.category === article.category)
        .slice(0, limit);

      resolve(related);
    }, 100);
  });
}

/**
 * Get article categories
 * For CMS: Replace with: return fetch('/api/articles/categories').then(r => r.json())
 */
export async function getArticleCategories(): Promise<string[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const categories = Array.from(new Set(articlesData.map(a => a.category)));
      resolve(categories);
    }, 100);
  });
}
