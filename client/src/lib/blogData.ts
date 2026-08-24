export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  image: string;
  tags: string[];
  slugEn?: string;
  titleEn?: string;
  excerptEn?: string;
  contentEn?: string;
  categoryEn?: string;
  tagsEn?: string[];
  imageEn?: string;
  published?: boolean;
  seoTitle?: string;
  seoTitleEn?: string;
  seoDescription?: string;
  seoDescriptionEn?: string;
  keywords?: string;
  keywordsEn?: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: '1',
    published: true,
    slug: 'ia-deve-devolver-tempo-as-pessoas',
    title: 'IA não deve substituir pessoas. Deve devolver tempo às pessoas.',
    excerpt: 'O verdadeiro potencial da Inteligência Artificial não está em substituir profissionais, mas em libertá-los de tarefas repetitivas para que possam aplicar experiência, criatividade e capacidade de decisão.',
    seoTitle: 'IA e produtividade: devolver tempo às pessoas',
    seoDescription: 'Descubra como a IA e a automação libertam profissionais de tarefas repetitivas, aumentam a produtividade e preservam o julgamento humano.',
    keywords: 'inteligência artificial nas empresas, IA e produtividade, automação de tarefas repetitivas, IA centrada nas pessoas, human in the loop, adoção de IA em Portugal, automação para PME, Sapiente.AI',
    author: 'Rodrigo Póvoa',
    date: '2026-08-24',
    readTime: 6,
    category: 'Inteligência Artificial',
    image: '/media/blog/wide_professional_marketing_tech_banner_style_scen_pt.webp',
    imageEn: '/media/blog/wide_professional_marketing_tech_banner_style_scen_en.webp',
    tags: ['Inteligência Artificial', 'Automação', 'Produtividade', 'PME', 'Human in the Loop'],
    content: `# IA não deve substituir pessoas. Deve devolver tempo às pessoas.

A Inteligência Artificial está a mudar rapidamente a forma como trabalhamos. Ferramentas que antes apenas armazenavam ou processavam informação hoje conseguem interpretar documentos, analisar dados, pesquisar, identificar padrões, produzir conteúdo e executar tarefas que consomem diariamente horas de trabalho.

Mas talvez a discussão sobre IA esteja demasiado concentrada numa pergunta: **quantos empregos poderá substituir?**

Existe outra questão que consideramos mais importante: **quanto tempo podemos devolver às pessoas?**

## O problema não são as pessoas. São as tarefas.

Em praticamente todas as empresas existem profissionais qualificados que passam parte do dia a preparar relatórios, organizar documentos, procurar informação, atualizar sistemas, cruzar dados ou responder repetidamente às mesmas questões.

São tarefas necessárias, mas muitas delas não exigem constantemente aquilo que torna essas pessoas realmente valiosas para uma organização: experiência, criatividade, contexto e capacidade de decisão.

É precisamente aí que a IA pode fazer diferença. Não necessariamente substituindo o profissional, mas assumindo partes repetitivas do seu trabalho para que o seu tempo seja utilizado onde realmente acrescenta valor.

## Portugal ainda tem muito espaço para avançar

Apesar de toda a atenção em torno da Inteligência Artificial, a sua utilização pelas empresas ainda está numa fase relativamente inicial, sobretudo em Portugal.

[GRÁFICO — Adoção de IA nas empresas: Portugal × União Europeia]

*Fonte: Eurostat, 2025. Empresas com 10 ou mais pessoas ao serviço.*

A diferença mostra que existe um espaço significativo para as empresas portuguesas transformarem IA em vantagem competitiva. Para as PME, em particular, tecnologias que anteriormente exigiam grandes equipas, infraestrutura e investimento estão hoje muito mais acessíveis.

Mas adotar IA não deveria significar simplesmente automatizar tudo o que for possível.

## A IA executa. O humano continua no controlo.

Uma IA pode analisar milhares de registos, preparar um relatório, identificar uma anomalia ou sugerir uma resposta. O profissional deixa de gastar horas a produzir esse trabalho e passa a concentrar-se em compreender o resultado, verificar exceções e decidir o que fazer a seguir.

É este equilíbrio que defendemos:

**IA → Executa, analisa e propõe → Humano → Valida, contextualiza e decide**

A tecnologia torna-se assim um multiplicador da capacidade humana, e não simplesmente um substituto.

## Mais produtividade não deveria significar mais trabalho

Imagine recuperar algumas horas todas as semanas porque relatórios são preparados automaticamente, documentos são classificados antes de chegarem à equipa ou dados provenientes de diferentes sistemas são cruzados sem intervenção manual.

Essas horas podem ser utilizadas para compreender melhor um cliente, resolver um problema, desenvolver uma ideia, analisar o negócio ou tomar uma decisão que realmente necessita de experiência humana.

É aqui que vemos o verdadeiro potencial da Inteligência Artificial: **não fazer as pessoas trabalharem mais, mas permitir que utilizem melhor o seu tempo.**

## A nossa visão

Na **Sapiente.AI**, acreditamos numa tecnologia que automatiza o repetitivo sem retirar o humano dos momentos em que julgamento e responsabilidade são essenciais.

Queremos ajudar empresas a identificar onde a IA, os dados e a automação podem libertar capacidade humana e transformar processos que hoje consomem tempo em sistemas que ajudam pessoas a tomar melhores decisões.

**Automatizar o repetitivo. Preservar o julgamento. Ampliar a capacidade humana.**

Porque talvez o maior benefício da Inteligência Artificial não seja ensinar máquinas a trabalhar como pessoas, mas permitir que as pessoas **deixem de trabalhar como máquinas**.`,
    slugEn: 'ai-should-give-time-back-to-people',
    titleEn: 'AI Should Not Replace People. It Should Give Time Back to Them.',
    excerptEn: 'The real value of artificial intelligence is not replacing skilled professionals. It is removing repetitive work so people can focus on judgment, creativity, customer relationships and better decisions.',
    seoTitleEn: 'AI and Productivity: Giving Time Back to People',
    seoDescriptionEn: 'Learn how AI and automation free professionals from repetitive tasks, improve productivity, and preserve human judgment in business decisions.',
    keywordsEn: 'artificial intelligence in business, AI productivity, repetitive task automation, human-centered AI, human in the loop, AI adoption in Portugal, small business automation, Sapiente.AI',
    categoryEn: 'Artificial Intelligence',
    tagsEn: ['Artificial Intelligence', 'Automation', 'Productivity', 'Small Businesses', 'Human in the Loop'],
    contentEn: `# AI Should Not Replace People. It Should Give Time Back to Them.

Artificial intelligence is rapidly changing how work gets done. Tools that once simply stored or processed information can now interpret documents, analyze data, conduct research, identify patterns, create content and complete tasks that consume hours of valuable time every day.

Yet much of the conversation around AI remains focused on one question: **how many jobs could it replace?**

We believe there is a more useful question for business leaders: **how much time can AI give back to people?**

## People are not the problem. Repetitive tasks are.

In almost every organization, skilled professionals spend part of their day preparing reports, organizing documents, searching for information, updating systems, reconciling data or repeatedly answering the same questions.

These tasks are necessary, but many of them do not consistently require the qualities that make people truly valuable to a business: experience, creativity, context and sound judgment.

This is where AI can make a meaningful difference. Not by replacing the professional, but by taking on repetitive parts of the workload so their time can be invested where it creates greater value.

## Portugal has significant room to move forward

Despite the attention surrounding artificial intelligence, business adoption is still at a relatively early stage, particularly in Portugal.

[CHART — AI adoption among businesses: Portugal × European Union]

*Source: Eurostat, 2025. Enterprises with 10 or more people employed.*

This gap represents a clear opportunity for Portuguese businesses to turn AI into a competitive advantage. For small and midsize businesses in particular, technologies that once demanded large teams, complex infrastructure and substantial investment are now far more accessible.

However, adopting AI should not mean automating everything simply because it can be automated.

## AI executes. People remain in control.

AI can analyze thousands of records, prepare a report, flag an anomaly or recommend a response. Instead of spending hours producing that work, the professional can focus on interpreting the result, reviewing exceptions and deciding what should happen next.

This is the balance we advocate:

**AI → Executes, analyzes and recommends → People → Validate, contextualize and decide**

Technology becomes a multiplier of human capability, not merely a substitute for it.

## Greater productivity should not mean more work

Imagine recovering several hours every week because reports are prepared automatically, documents are classified before reaching the team, or information from different systems is reconciled without manual intervention.

Those hours can be used to understand a customer more deeply, solve a difficult problem, develop an idea, analyze the business or make a decision that genuinely requires human experience.

This is where we see the real potential of artificial intelligence: **not making people work more, but enabling them to use their time more effectively.**

## Our perspective

At **Sapiente.AI**, we believe in technology that automates repetitive work without removing people from the moments where judgment and accountability are essential.

We help businesses identify where AI, data and automation can release human capacity and turn time-consuming processes into systems that support better decisions.

**Automate the repetitive. Preserve judgment. Expand human capability.**

Perhaps the greatest benefit of artificial intelligence is not teaching machines to work like people, but allowing people to **stop working like machines**.`
  },
  {
    id: '2',
    published: false,
    slug: 'practical-machine-learning-real-applications',
    title: 'Practical Machine Learning: Real Applications that Generate ROI',
    excerpt: 'Explore concrete use cases of machine learning that companies are implementing to increase revenue, reduce costs and improve customer experience.',
    author: 'Sapiente.AI',
    date: '2026-02-10',
    readTime: 10,
    category: 'Machine Learning',
    image: '/media/banners/PT/home_resultados_gera_ia.webp',
    tags: ['Machine Learning', 'Dados', 'Algoritmos', 'ROI'],
    content: `# Practical Machine Learning: Real Applications that Generate ROI

Machine Learning has evolved from an academic topic to an essential business tool. Companies that master ML are reaping extraordinary results. Let's explore practical applications that generate measurable returns.

## What is Machine Learning?

Machine Learning is a branch of AI that enables systems to learn from data without being explicitly programmed. Algorithms identify patterns, make predictions and continuously improve with new data.

## ML Applications that Generate Results

### 1. Demand Forecasting
**Problem**: Excess or shortage of inventory results in losses.

**ML Solution**: Algorithms analyze sales history, seasonality, market trends and external factors to predict future demand with precision.

**Result**: 25-30% reduction in inventory costs, 15% increase in product availability.

### 2. Fraud Detection
**Problem**: Fraud costs billions to companies annually.

**ML Solution**: Models trained on legitimate transaction patterns identify anomalies in real time.

**Result**: 80% reduction in fraud, revenue protection, increased customer trust.

### 3. Customer Segmentation
**Problem**: Generic approach doesn't work for different customer types.

**ML Solution**: Clustering identifies groups of customers with similar behaviors.

**Result**: 3x more effective campaigns, 40% increase in retention rate.

### 4. Churn Prediction
**Problem**: Losing customers is more expensive than retaining them.

**ML Solution**: Models identify customers at risk of leaving before they leave.

**Result**: Proactive intervention reduces churn by 35%, increases lifetime value.

### 5. Product Recommendation
**Problem**: Huge catalogs confuse customers.

**ML Solution**: Recommendation systems suggest products based on behavior and preferences.

**Result**: 25-35% increase in cross-sell, improved customer experience.

## The ML Lifecycle

1. **Data Collection**: Gather relevant and quality data
2. **Preparation**: Cleaning, normalization and transformation
3. **Exploration**: Exploratory analysis to understand patterns
4. **Modeling**: Selection and training of algorithms
5. **Validation**: Testing on unseen data
6. **Deployment**: Put model into production
7. **Monitoring**: Track continuous performance

## Practical Challenges

### Insufficient Data
Many companies don't have enough historical data. Solution: Start small, collect data, iterate.

### Data Quality
Bad data produces bad models. Investing in data governance is crucial.

### Interpretability
Customers want to know why they receive a recommendation. Explainable models are increasingly important.

### Maintenance
Models degrade over time. Regular retraining is necessary.

## Success Metrics

- **Accuracy**: Percentage of correct predictions
- **ROI**: Return on investment in ML
- **Implementation Time**: How long to see results
- **Scalability**: Ability to grow with the business

## Conclusion

Machine Learning is not a single project—it's a continuous journey of learning and improvement. Companies that start today will have a competitive advantage tomorrow.

**Want to implement ML in your company? We help identify opportunities and execute projects successfully.**`
  },
  {
    id: '3',
    published: false,
    slug: 'ai-trends-2026-what-to-expect',
    title: 'AI Trends for 2026: What to Expect from the Market',
    excerpt: 'Analysis of the key artificial intelligence trends shaping the market in 2026, from generative AI to regulation and new opportunities.',
    author: 'Sapiente.AI',
    date: '2026-02-05',
    readTime: 9,
    category: 'Trends',
    image: '/media/banners/PT/home_marketing_digital_ia.webp',
    tags: ['Tendências', 'IA Generativa', 'Mercado', 'Futuro'],
    content: `# Tendências de IA para 2026: O Que Esperar do Mercado

O mercado de Inteligência Artificial está em transformação acelerada. Enquanto 2024-2025 foram marcados pela explosão de IA generativa, 2026 promete consolidação, especialização e regulamentação. Vamos explorar as tendências que definirão o ano.

## 1. IA Generativa Especializada

**O que era**: Modelos genéricos que fazem de tudo um pouco.

**O que será**: IA treinada especificamente para indústrias e casos de uso.

**Impacto**: Empresas desenvolverão modelos proprietários otimizados para seus domínios. Precisão e eficiência aumentarão drasticamente.

**Oportunidade**: Consultores de IA que entendem indústrias específicas serão altamente valorizados.

## 2. IA Explicável (XAI)

**O que era**: Caixas pretas que ninguém entende.

**O que será**: Modelos que explicam suas decisões.

**Por quê**: Reguladores, clientes e empresas exigem transparência. Conformidade com RGPD e GDPR requer explicabilidade.

**Impacto**: Modelos mais simples e interpretáveis ganharão espaço sobre megamodelos complexos em aplicações críticas.

## 3. Edge AI e IA Descentralizada

**O que é**: Processamento de IA diretamente no dispositivo, não na nuvem.

**Benefícios**:
- Latência reduzida
- Privacidade aumentada
- Menor custo de infraestrutura
- Funcionamento offline

**Aplicações**: Smartphones, IoT, dispositivos médicos, veículos autônomos.

**Tendência**: Crescimento de 300% em deployments de Edge AI até 2026.

## 4. IA Responsável e Ética

**Foco em**:
- Redução de viés em modelos
- Impacto social e ambiental
- Governança de dados
- Privacidade por design

**Regulamentações**: EU AI Act, RGPD, GDPR moldam o desenvolvimento.

**Mercado**: Empresas que adotam IA responsável ganham confiança e evitam multas regulatórias.

## 5. Automação Inteligente em Escala

**Evolução**: RPA (Robotic Process Automation) + IA = Automação Inteligente.

**Impacto**: 
- 50% das tarefas administrativas serão automatizadas
- Redução de 30-40% em custos operacionais
- Reposicionamento de força de trabalho para tarefas estratégicas

**Setores**: Financeiro, RH, Customer Service, Logística.

## 6. IA para Sustentabilidade

**Aplicações**:
- Otimização de consumo de energia
- Previsão de demanda para reduzir desperdício
- Monitoramento ambiental
- Eficiência em supply chain

**Tendência**: ESG (Environmental, Social, Governance) impulsiona investimentos em IA sustentável.

## 7. Consolidação de Mercado

**O que acontece**: Muitas startups de IA desaparecerão.

**Razão**: Modelo de negócio insustentável, falta de diferenciação, custos de infraestrutura.

**Vencedores**: Empresas com casos de uso específicos, integração profunda com clientes, e modelo de negócio claro.

## 8. Talento e Educação

**Desafio**: Escassez crítica de engenheiros de IA.

**Resposta**: 
- Bootcamps de IA proliferam
- Universidades expandem programas
- Empresas investem em treinamento interno
- Salários continuam altos

**Oportunidade**: Profissionais que combinam IA com conhecimento de domínio (saúde, finanças, manufatura) serão super valorizados.

## 9. Regulamentação Intensifica

**Marcos**:
- EU AI Act entra em vigor
- RGPD Brasil aplicada rigorosamente
- Novos regulamentos em outros países
- Compliance se torna competência essencial

**Impacto**: Empresas sem conformidade enfrentam multas pesadas e perda de reputação.

## 10. IA Multimodal Dominante

**O que é**: IA que entende texto, imagem, áudio e vídeo simultaneamente.

**Aplicações**:
- Análise de documentos complexos
- Diagnóstico médico integrado
- Customer service omnichannel
- Criação de conteúdo sofisticado

**Tendência**: Modelos multimodais se tornam padrão em 2026.

## Oportunidades para Empresas

1. **Diagnóstico de Prontidão**: Avaliar onde IA pode gerar maior impacto
2. **Pilotos Rápidos**: Começar com projetos pequenos, de baixo risco
3. **Construir Expertise Interna**: Treinar equipes em IA e dados
4. **Parcerias Estratégicas**: Trabalhar com consultores especializados
5. **Conformidade Proativa**: Implementar IA responsável desde o início

## Conclusão

2026 será o ano em que IA deixa de ser experimental e se torna operacional. Empresas que se prepararem agora estarão posicionadas para liderar. O tempo de esperar acabou—é hora de agir.

**Quer preparar sua empresa para as tendências de IA de 2026? Converse com nossos especialistas sobre uma estratégia customizada.**`
  }
];

function localizeArticle(article: BlogArticle, lang: string): BlogArticle {
  if (lang !== 'en' || !article.titleEn) return article;

  return {
    ...article,
    slug: article.slugEn || article.slug,
    title: article.titleEn,
    excerpt: article.excerptEn || article.excerpt,
    content: article.contentEn || article.content,
    category: article.categoryEn || article.category,
    tags: article.tagsEn || article.tags,
    image: article.imageEn || article.image,
    seoTitle: article.seoTitleEn || article.seoTitle,
    seoDescription: article.seoDescriptionEn || article.seoDescription,
    keywords: article.keywordsEn || article.keywords,
  };
}

export function getBlogArticleBySlug(slug: string, lang = 'pt'): BlogArticle | undefined {
  const article = blogArticles.find((item) => item.published !== false && (item.slug === slug || item.slugEn === slug));
  return article ? localizeArticle(article, lang) : undefined;
}

export function getBlogArticleAlternateSlugs(slug: string) {
  const article = blogArticles.find((item) => item.published !== false && (item.slug === slug || item.slugEn === slug));
  return article ? { pt: article.slug, en: article.slugEn || article.slug } : undefined;
}

export function getAllBlogArticles(lang = 'pt'): BlogArticle[] {
  return [...blogArticles]
    .filter((article) => article.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((article) => localizeArticle(article, lang));
}
