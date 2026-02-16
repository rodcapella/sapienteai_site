export type Language = 'pt-PT' | 'pt-BR' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  'pt-PT': {
    // Navigation
    'nav.servicos': 'Serviços',
    'nav.processo': 'Processo',
    'nav.portfolio': 'Portfólio',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.fale': 'Fale com Especialista',

    // Hero Section
    'hero.subtitle': 'Inteligência Artificial Aplicada // 2026',
    'hero.title': 'Inteligência Artificial para Empresas',
    'hero.description': 'Soluções de IA Aplicada • Transformação Digital • Resultados Mensuráveis',
    'hero.tagline': 'Tecnologia de ponta para empresas que querem crescer com dados, automação inteligente e decisões baseadas em IA.',
    'hero.cta1': 'Solicitar Diagnóstico',
    'hero.cta2': 'Agendar Reunião',

    // Services Section
    'services.label': 'O QUE FAZEMOS',
    'services.title': 'Serviços de IA Aplicada:',
    'services.description': 'Oferecemos soluções especializadas em machine learning, automação inteligente e análise de dados para empresas que querem evoluir com tecnologia.',
    'services.ml': 'Machine Learning Avançado',
    'services.ml.desc': 'Modelos preditivos e algoritmos avançados para análise de dados, previsão de demanda e otimização de processos.',
    'services.automation': 'Automação Inteligente',
    'services.automation.desc': 'Automação de processos repetitivos com IA, reduzindo custos operacionais em até 40% e aumentando produtividade.',
    'services.consulting': 'Consultoria Estratégica',
    'services.consulting.desc': 'Análise de oportunidades de IA na sua empresa, roadmap de implementação e acompanhamento de resultados.',
    'services.more': 'Saiba Mais',

    // Process Section
    'process.label': 'COMO FUNCIONA',
    'process.title': 'Processo em 4 Etapas:',
    'process.description': 'Metodologia comprovada para implementar IA com sucesso na sua empresa.',
    'process.step1': 'Diagnóstico',
    'process.step1.desc': 'Análise profunda das oportunidades e desafios da sua empresa.',
    'process.step2': 'Estratégia',
    'process.step2.desc': 'Definição de roadmap e priorização de projetos de IA.',
    'process.step3': 'Implementação',
    'process.step3.desc': 'Desenvolvimento e integração de soluções de IA.',
    'process.step4': 'Otimização',
    'process.step4.desc': 'Monitoramento contínuo e melhoria de resultados.',

    // Portfolio Section
    'portfolio.label': 'RESULTADOS REAIS',
    'portfolio.title': 'Portfólio de Sucesso:',
    'portfolio.description': 'Confira os resultados que alcançamos para empresas em diversos setores.',
    'portfolio.more': 'Ver Mais Casos de Sucesso',

    // CTA Section
    'cta.title': 'Pronto para Implementar IA na Sua Empresa?',
    'cta.description': 'Agende uma reunião com nossos especialistas e descubra como IA pode gerar resultados reais no seu negócio.',
    'cta.button': 'Solicitar Diagnóstico',

    // Footer
    'footer.description': 'Transformação digital com inteligência artificial aplicada',
    'footer.product': 'Produto',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.home': 'Início',
    'footer.servicos': 'Serviços',
    'footer.portfolio': 'Portfólio',
    'footer.blog': 'Blog',
    'footer.privacy': 'Privacidade',
    'footer.privacidade': 'Privacidade',
    'footer.terms': 'Termos',
    'footer.termos': 'Termos de Serviço',
    'footer.lgpd': 'LGPD',
    'footer.contact': 'Contato',
    'footer.email': 'sapiente.ai.oficial@gmail.com',
    'footer.copyright': '© 2026 SAPIENTE.AI • Todos os direitos reservados',

    // Blog Page
    'blog.title': 'Blog SAPIENTE.AI — Inteligência Artificial Aplicada aos Negócios',
    'blog.subtitle': 'Conteúdos especializados sobre IA, machine learning, automação e tendências tecnológicas para empresas e profissionais que querem evoluir com dados e tecnologia.',
    'blog.search': 'Pesquisar artigos...',
    'blog.all': 'Todos',
    'blog.readMore': 'Ler Artigo',
    'blog.category': 'Categoria',
    'blog.date': 'Data',
    'blog.author': 'SAPIENTE.AI',
    'blog.knowledge': 'Conhecimento • Estratégia • Inovação',
    'blog.newsletter': 'Receba Insights sobre IA',
    'blog.newsletterDesc': 'Inscreva-se na newsletter da SAPIENTE.AI e receba conteúdos exclusivos sobre inteligência artificial, machine learning e tendências tecnológicas direto na sua caixa de entrada.',
    'blog.noArticles': 'Nenhum artigo encontrado. Tente outra busca ou categoria.',

    // Article Detail
    'article.relatedArticles': 'Artigos Relacionados',
    'article.comments': 'Comentários',
    'article.leaveComment': 'Deixe um Comentário',
    'article.name': 'Nome',
    'article.email': 'Email',
    'article.comment': 'Comentário',
    'article.submit': 'Enviar Comentário',
    'article.share': 'Compartilhar Artigo',

    // Legal Pages
    'legal.lgpd': 'Lei Geral de Proteção de Dados',
    'legal.terms': 'Termos de Serviço',
    'legal.privacy': 'Política de Privacidade',
    'legal.lastUpdated': 'Última atualização:',
    'legal.introduction': 'Introdução',
    'legal.content': 'Conteúdo',
    'legal.lgpd.title': 'Lei Geral de Proteção de Dados (LGPD)',
    'legal.lgpd.intro': 'A SAPIENTE.AI está em total conformidade com a Lei Geral de Proteção de Dados (LGPD) e regulamentações internacionais de proteção de dados.',
    'legal.terms.title': 'Termos de Serviço',
    'legal.terms.intro': 'Estes termos regem o uso dos serviços da SAPIENTE.AI. Ao acessar nosso site, você concorda com estes termos.',
    'legal.privacy.title': 'Política de Privacidade',
    'legal.privacy.intro': 'A SAPIENTE.AI respeita sua privacidade e está comprometida em proteger seus dados pessoais.',

    // Newsletter
    'newsletter.label': 'Email para Newsletter',
    'newsletter.placeholder': 'seu@email.com',
    'newsletter.subscribe': 'Inscrever',
    'newsletter.subscribing': 'Inscrevendo...',
    'newsletter.invalidEmail': 'Email inválido',
    'newsletter.subject': 'Nova Inscrição na Newsletter - SAPIENTE.AI',
    'newsletter.success': 'Inscrição confirmada! Obrigado por se juntar a nós.',
    'newsletter.error': 'Erro ao inscrever. Tente novamente.',
    'newsletter.description': 'Receba insights sobre IA, tendências tecnológicas e atualizações da SAPIENTE.AI. Sem spam, apenas conteúdo de valor.',
  },

  'pt-BR': {
    // Navigation
    'nav.servicos': 'Serviços',
    'nav.processo': 'Processo',
    'nav.portfolio': 'Portfólio',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.fale': 'Fale com Especialista',

    // Hero Section
    'hero.subtitle': 'Inteligência Artificial Aplicada // 2026',
    'hero.title': 'Inteligência Artificial para Empresas',
    'hero.description': 'Soluções de IA Aplicada • Transformação Digital • Resultados Mensuráveis',
    'hero.tagline': 'Tecnologia de ponta para empresas que querem crescer com dados, automação inteligente e decisões baseadas em IA.',
    'hero.cta1': 'Solicitar Diagnóstico',
    'hero.cta2': 'Agendar Reunião',

    // Services Section
    'services.label': 'O QUE FAZEMOS',
    'services.title': 'Serviços de IA Aplicada:',
    'services.description': 'Oferecemos soluções especializadas em machine learning, automação inteligente e análise de dados para empresas que querem evoluir com tecnologia.',
    'services.ml': 'Machine Learning Avançado',
    'services.ml.desc': 'Modelos preditivos e algoritmos avançados para análise de dados, previsão de demanda e otimização de processos.',
    'services.automation': 'Automação Inteligente',
    'services.automation.desc': 'Automação de processos repetitivos com IA, reduzindo custos operacionais em até 40% e aumentando produtividade.',
    'services.consulting': 'Consultoria Estratégica',
    'services.consulting.desc': 'Análise de oportunidades de IA na sua empresa, roadmap de implementação e acompanhamento de resultados.',
    'services.more': 'Saiba Mais',

    // Process Section
    'process.label': 'COMO FUNCIONA',
    'process.title': 'Processo em 4 Etapas:',
    'process.description': 'Metodologia comprovada para implementar IA com sucesso na sua empresa.',
    'process.step1': 'Diagnóstico',
    'process.step1.desc': 'Análise profunda das oportunidades e desafios da sua empresa.',
    'process.step2': 'Estratégia',
    'process.step2.desc': 'Definição de roadmap e priorização de projetos de IA.',
    'process.step3': 'Implementação',
    'process.step3.desc': 'Desenvolvimento e integração de soluções de IA.',
    'process.step4': 'Otimização',
    'process.step4.desc': 'Monitoramento contínuo e melhoria de resultados.',

    // Portfolio Section
    'portfolio.label': 'RESULTADOS REAIS',
    'portfolio.title': 'Portfólio de Sucesso:',
    'portfolio.description': 'Confira os resultados que alcançamos para empresas em diversos setores.',
    'portfolio.more': 'Ver Mais Casos de Sucesso',

    // CTA Section
    'cta.title': 'Pronto para Implementar IA na Sua Empresa?',
    'cta.description': 'Agende uma reunião com nossos especialistas e descubra como IA pode gerar resultados reais no seu negócio.',
    'cta.button': 'Solicitar Diagnóstico',

    // Footer
    'footer.description': 'Transformação digital com inteligência artificial aplicada',
    'footer.product': 'Produto',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.home': 'Início',
    'footer.servicos': 'Serviços',
    'footer.portfolio': 'Portfólio',
    'footer.blog': 'Blog',
    'footer.privacy': 'Privacidade',
    'footer.privacidade': 'Privacidade',
    'footer.terms': 'Termos',
    'footer.termos': 'Termos de Serviço',
    'footer.lgpd': 'LGPD',
    'footer.contact': 'Contato',
    'footer.email': 'sapiente.ai.oficial@gmail.com',
    'footer.copyright': '© 2026 SAPIENTE.AI • Todos os direitos reservados',

    // Blog Page
    'blog.title': 'Blog SAPIENTE.AI — Inteligência Artificial Aplicada aos Negócios',
    'blog.subtitle': 'Conteúdos especializados sobre IA, machine learning, automação e tendências tecnológicas para empresas e profissionais que querem evoluir com dados e tecnologia.',
    'blog.search': 'Pesquisar artigos...',
    'blog.all': 'Todos',
    'blog.readMore': 'Ler Artigo',
    'blog.category': 'Categoria',
    'blog.date': 'Data',
    'blog.author': 'SAPIENTE.AI',
    'blog.knowledge': 'Conhecimento • Estratégia • Inovação',
    'blog.newsletter': 'Receba Insights sobre IA',
    'blog.newsletterDesc': 'Inscreva-se na newsletter da SAPIENTE.AI e receba conteúdos exclusivos sobre inteligência artificial, machine learning e tendências tecnológicas direto na sua caixa de entrada.',
    'blog.noArticles': 'Nenhum artigo encontrado. Tente outra busca ou categoria.',

    // Article Detail
    'article.relatedArticles': 'Artigos Relacionados',
    'article.comments': 'Comentários',
    'article.leaveComment': 'Deixe um Comentário',
    'article.name': 'Nome',
    'article.email': 'Email',
    'article.comment': 'Comentário',
    'article.submit': 'Enviar Comentário',
    'article.share': 'Compartilhar Artigo',

    // Legal Pages
    'legal.lgpd': 'Lei Geral de Proteção de Dados',
    'legal.terms': 'Termos de Serviço',
    'legal.privacy': 'Política de Privacidade',
    'legal.lastUpdated': 'Última atualização:',
    'legal.introduction': 'Introdução',
    'legal.content': 'Conteúdo',
    'legal.lgpd.title': 'Lei Geral de Proteção de Dados (LGPD)',
    'legal.lgpd.intro': 'A SAPIENTE.AI está em total conformidade com a Lei Geral de Proteção de Dados (LGPD) e regulamentações internacionais de proteção de dados.',
    'legal.terms.title': 'Termos de Serviço',
    'legal.terms.intro': 'Estes termos regem o uso dos serviços da SAPIENTE.AI. Ao acessar nosso site, você concorda com estes termos.',
    'legal.privacy.title': 'Política de Privacidade',
    'legal.privacy.intro': 'A SAPIENTE.AI respeita sua privacidade e está comprometida em proteger seus dados pessoais.',

    // Newsletter
    'newsletter.label': 'Email para Newsletter',
    'newsletter.placeholder': 'seu@email.com',
    'newsletter.subscribe': 'Inscrever',
    'newsletter.subscribing': 'Inscrevendo...',
    'newsletter.invalidEmail': 'Email inválido',
    'newsletter.subject': 'Nova Inscrição na Newsletter - SAPIENTE.AI',
    'newsletter.success': 'Inscrição confirmada! Obrigado por se juntar a nós.',
    'newsletter.error': 'Erro ao inscrever. Tente novamente.',
    'newsletter.description': 'Receba insights sobre IA, tendências tecnológicas e atualizações da SAPIENTE.AI. Sem spam, apenas conteúdo de valor.',
  },

  'en': {
    // Navigation
    'nav.servicos': 'Services',
    'nav.processo': 'Process',
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.fale': 'Contact Expert',

    // Hero Section
    'hero.subtitle': 'Applied Artificial Intelligence // 2026',
    'hero.title': 'Artificial Intelligence for Businesses',
    'hero.description': 'Applied AI Solutions • Digital Transformation • Measurable Results',
    'hero.tagline': 'Cutting-edge technology for companies that want to grow with data, intelligent automation and AI-driven decisions.',
    'hero.cta1': 'Request Diagnosis',
    'hero.cta2': 'Schedule Meeting',

    // Services Section
    'services.label': 'WHAT WE DO',
    'services.title': 'Applied AI Services:',
    'services.description': 'We offer specialized solutions in machine learning, intelligent automation and data analysis for companies that want to evolve with technology.',
    'services.ml': 'Advanced Machine Learning',
    'services.ml.desc': 'Predictive models and advanced algorithms for data analysis, demand forecasting and process optimization.',
    'services.automation': 'Intelligent Automation',
    'services.automation.desc': 'Automation of repetitive processes with AI, reducing operational costs by up to 40% and increasing productivity.',
    'services.consulting': 'Strategic Consulting',
    'services.consulting.desc': 'Analysis of AI opportunities in your company, implementation roadmap and results monitoring.',
    'services.more': 'Learn More',

    // Process Section
    'process.label': 'HOW IT WORKS',
    'process.title': 'Process in 4 Steps:',
    'process.description': 'Proven methodology to successfully implement AI in your company.',
    'process.step1': 'Diagnosis',
    'process.step1.desc': 'In-depth analysis of opportunities and challenges in your company.',
    'process.step2': 'Strategy',
    'process.step2.desc': 'Definition of roadmap and prioritization of AI projects.',
    'process.step3': 'Implementation',
    'process.step3.desc': 'Development and integration of AI solutions.',
    'process.step4': 'Optimization',
    'process.step4.desc': 'Continuous monitoring and improvement of results.',

    // Portfolio Section
    'portfolio.label': 'REAL RESULTS',
    'portfolio.title': 'Success Portfolio:',
    'portfolio.description': 'Check out the results we have achieved for companies in various sectors.',
    'portfolio.more': 'View More Success Cases',

    // CTA Section
    'cta.title': 'Ready to Implement AI in Your Company?',
    'cta.description': 'Schedule a meeting with our specialists and discover how AI can generate real results in your business.',
    'cta.button': 'Request Diagnosis',

    // Footer
    'footer.description': 'Digital transformation with applied artificial intelligence',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.home': 'Home',
    'footer.servicos': 'Services',
    'footer.portfolio': 'Portfolio',
    'footer.blog': 'Blog',
    'footer.privacy': 'Privacy',
    'footer.privacidade': 'Privacy',
    'footer.terms': 'Terms',
    'footer.termos': 'Terms of Service',
    'footer.lgpd': 'GDPR',
    'footer.contact': 'Contact',
    'footer.email': 'sapiente.ai.oficial@gmail.com',
    'footer.copyright': '© 2026 SAPIENTE.AI • All rights reserved',

    // Blog Page
    'blog.title': 'SAPIENTE.AI Blog — Applied Artificial Intelligence for Business',
    'blog.subtitle': 'Specialized content on AI, machine learning, automation and technology trends for companies and professionals who want to evolve with data and technology.',
    'blog.search': 'Search articles...',
    'blog.all': 'All',
    'blog.readMore': 'Read Article',
    'blog.category': 'Category',
    'blog.date': 'Date',
    'blog.author': 'SAPIENTE.AI',
    'blog.knowledge': 'Knowledge • Strategy • Innovation',
    'blog.newsletter': 'Receive AI Insights',
    'blog.newsletterDesc': 'Subscribe to SAPIENTE.AI newsletter and receive exclusive content about artificial intelligence, machine learning and technology trends directly in your inbox.',
    'blog.noArticles': 'No articles found. Try another search or category.',

    // Article Detail
    'article.relatedArticles': 'Related Articles',
    'article.comments': 'Comments',
    'article.leaveComment': 'Leave a Comment',
    'article.name': 'Name',
    'article.email': 'Email',
    'article.comment': 'Comment',
    'article.submit': 'Submit Comment',
    'article.share': 'Share Article',

    // Legal Pages
    'legal.lgpd': 'General Data Protection Law',
    'legal.terms': 'Terms of Service',
    'legal.privacy': 'Privacy Policy',
    'legal.lastUpdated': 'Last updated:',
    'legal.introduction': 'Introduction',
    'legal.content': 'Content',
    'legal.lgpd.title': 'General Data Protection Law (LGPD)',
    'legal.lgpd.intro': 'SAPIENTE.AI is in full compliance with the General Data Protection Law (LGPD) and international data protection regulations.',
    'legal.terms.title': 'Terms of Service',
    'legal.terms.intro': 'These terms govern the use of SAPIENTE.AI services. By accessing our website, you agree to these terms.',
    'legal.privacy.title': 'Privacy Policy',
    'legal.privacy.intro': 'SAPIENTE.AI respects your privacy and is committed to protecting your personal data.',

    // Newsletter
    'newsletter.label': 'Newsletter Email',
    'newsletter.placeholder': 'your@email.com',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.subscribing': 'Subscribing...',
    'newsletter.invalidEmail': 'Invalid email',
    'newsletter.subject': 'New Newsletter Subscription - SAPIENTE.AI',
    'newsletter.success': 'Subscription confirmed! Thank you for joining us.',
    'newsletter.error': 'Error subscribing. Please try again.',
    'newsletter.description': 'Receive insights about AI, technology trends and updates from SAPIENTE.AI. No spam, just valuable content.',
  },
};

export function t(key: string, language: Language): string {
  return translations[language][key] || key;
}
