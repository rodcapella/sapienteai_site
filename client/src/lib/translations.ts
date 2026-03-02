export type Language = 'pt-PT' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  'pt-PT': {
    // Navigation
    'nav.home': 'Início',
    'nav.portfolio': 'Portfólio',
    'nav.faq': 'FAQ',
    'nav.noticias': 'Notícias IA',
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

    // Values Section
    'values.label': 'NOSSOS VALORES',
    'values.title': 'O Que Nos Define:',
    'values.innovation': 'Inovação',
    'values.innovation.desc': 'Buscamos constantemente novas formas de aplicar inteligência artificial para resolver problemas complexos e gerar valor para nossos clientes.',
    'values.excellence': 'Excelência',
    'values.excellence.desc': 'Comprometemos com os mais altos padrões de qualidade em cada projeto, garantindo soluções robustas e eficientes.',
    'values.partnership': 'Parceria',
    'values.partnership.desc': 'Trabalhamos lado a lado com nossos clientes, entendendo seus desafios e construindo soluções personalizadas juntos.',
    'values.results': 'Resultados',
    'values.results.desc': 'Focamos em métricas mensuráveis e ROI comprovado, garantindo que cada investimento em IA gere retorno real.',

    // Mission & Vision Section
    'mission.label': 'MISSÃO',
    'mission.title': 'Nossa Missão',
    'mission.desc': 'Transformar empresas através da inteligência artificial, tornando a tecnologia acessível, prática e impactante para negócios de todos os tamanhos.',
    'vision.label': 'VISÃO',
    'vision.title': 'Nossa Visão',
    'vision.desc': 'Ser a referência em soluções de IA aplicada na Península Ibérica, reconhecida pela inovação, qualidade e impacto transformador nos negócios de nossos clientes.',

    // Portfolio Section
    'portfolio.label': 'PORTFÓLIO',
    'portfolio.title': 'Nossos Produtos:',
    'portfolio.description': 'Conheça as soluções que desenvolvemos para simplificar e otimizar processos.',
    'portfolio.more': 'Ver Detalhes',

    // CTA Section
    'cta.title': 'Pronto para Implementar IA na Sua Empresa?',
    'cta.description': 'Agende uma reunião com nossos especialistas e descubra como IA pode gerar resultados reais no seu negócio.',
    'cta.button': 'Solicitar Diagnóstico',

    // FAQ Section
    'faq.label': 'PERGUNTAS FREQUENTES',
    'faq.title': 'Dúvidas Comuns:',
    'faq.q1': 'Quanto tempo leva para implementar uma solução de IA?',
    'faq.a1': 'Depende da complexidade. Projetos simples: 4-8 semanas. Projetos complexos: 3-6 meses. A SAPIENTE.AI trabalha em sprints ágeis, entregando valor incremental. Você vê resultados desde as primeiras semanas, com otimizações contínuas.',
    'faq.q2': 'A IA da SAPIENTE.AI é segura e em conformidade com LGPD/GDPR?',
    'faq.a2': 'Sim. Implementamos os mais altos padrões de segurança: criptografia de dados, validação robusta, monitoramento contínuo, versionamento de modelos e testes de adversarialidade. Garantimos conformidade total com LGPD, GDPR e outras regulamentações.',
    'faq.q3': 'Como medir o ROI de um projeto de IA?',
    'faq.a3': 'Medimos através de: redução de custos operacionais, aumento de receita, melhoria em eficiência de tempo, satisfação do cliente, e precisão de decisões. Estabelecemos KPIs claros no início e acompanhamos continuamente. A maioria dos clientes vê ROI positivo em 6-12 meses.',

    // Footer
    'footer.description': 'Transformação digital com inteligência artificial aplicada',
    'footer.navigation': 'Navegação',
    'footer.products': 'Produtos',
    'footer.product': 'Produto',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.home': 'Início',
    'footer.portfolio': 'Portfólio',
    'footer.faq': 'FAQ',
    'footer.noticias': 'Notícias IA',
    'footer.privacy': 'Privacidade',
    'footer.privacidade': 'Política de Privacidade',
    'footer.terms': 'Termos',
    'footer.termos': 'Termos de Serviço',
    'footer.lgpd': 'LGPD',
    'footer.contact': 'Contato',
    'footer.email': 'sapiente.ai.oficial@gmail.com',
    'footer.newsletter': 'Newsletter',
    'footer.copyright': '© 2026 SAPIENTE.AI • Todos os direitos reservados',
    'footer.simuladorIR': 'Simulador IR',
    'footer.cupaomania': 'CupãoMania',
    'footer.scanmyname': 'ScanMyName',

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

    // Social Media
    'social.instagram': 'Instagram',
    'social.tiktok': 'TikTok',
    'social.twitter': 'X (Twitter)',
    'social.linkedin': 'LinkedIn',
  },

  'en': {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.faq': 'FAQ',
    'nav.noticias': 'AI News',
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

    // Values Section
    'values.label': 'OUR VALUES',
    'values.title': 'What Defines Us:',
    'values.innovation': 'Innovation',
    'values.innovation.desc': 'We constantly seek new ways to apply artificial intelligence to solve complex problems and generate value for our clients.',
    'values.excellence': 'Excellence',
    'values.excellence.desc': 'We are committed to the highest quality standards in every project, ensuring robust and efficient solutions.',
    'values.partnership': 'Partnership',
    'values.partnership.desc': 'We work side by side with our clients, understanding their challenges and building customized solutions together.',
    'values.results': 'Results',
    'values.results.desc': 'We focus on measurable metrics and proven ROI, ensuring that every AI investment generates real returns.',

    // Mission & Vision Section
    'mission.label': 'MISSION',
    'mission.title': 'Our Mission',
    'mission.desc': 'Transform companies through artificial intelligence, making technology accessible, practical and impactful for businesses of all sizes.',
    'vision.label': 'VISION',
    'vision.title': 'Our Vision',
    'vision.desc': 'To be the reference in applied AI solutions in the Iberian Peninsula, recognized for innovation, quality and transformative impact on our clients\' businesses.',

    // Portfolio Section
    'portfolio.label': 'PORTFOLIO',
    'portfolio.title': 'Our Products:',
    'portfolio.description': 'Discover the solutions we develop to simplify and optimize processes.',
    'portfolio.more': 'View Details',

    // CTA Section
    'cta.title': 'Ready to Implement AI in Your Company?',
    'cta.description': 'Schedule a meeting with our specialists and discover how AI can generate real results in your business.',
    'cta.button': 'Request Diagnosis',

    // FAQ Section
    'faq.label': 'FREQUENTLY ASKED QUESTIONS',
    'faq.title': 'Common Questions:',
    'faq.q1': 'How long does it take to implement an AI solution?',
    'faq.a1': 'It depends on complexity. Simple projects: 4-8 weeks. Complex projects: 3-6 months. SAPIENTE.AI works in agile sprints, delivering incremental value. You see results from the first weeks, with continuous optimizations.',
    'faq.q2': 'Is SAPIENTE.AI\'s AI safe and compliant with LGPD/GDPR?',
    'faq.a2': 'Yes. We implement the highest security standards: data encryption, robust validation, continuous monitoring, model versioning and adversarial testing. We guarantee full compliance with LGPD, GDPR and other regulations.',
    'faq.q3': 'How to measure the ROI of an AI project?',
    'faq.a3': 'We measure through: reduction of operational costs, increase in revenue, improvement in time efficiency, customer satisfaction, and decision accuracy. We establish clear KPIs at the beginning and monitor continuously. Most clients see positive ROI in 6-12 months.',

    // Footer
    'footer.description': 'Digital transformation with applied artificial intelligence',
    'footer.navigation': 'Navigation',
    'footer.products': 'Products',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.home': 'Home',
    'footer.portfolio': 'Portfolio',
    'footer.faq': 'FAQ',
    'footer.noticias': 'AI News',
    'footer.privacy': 'Privacy',
    'footer.privacidade': 'Privacy Policy',
    'footer.terms': 'Terms',
    'footer.termos': 'Terms of Service',
    'footer.lgpd': 'LGPD',
    'footer.contact': 'Contact',
    'footer.email': 'sapiente.ai.oficial@gmail.com',
    'footer.newsletter': 'Newsletter',
    'footer.copyright': '© 2026 SAPIENTE.AI • All rights reserved',
    'footer.simuladorIR': 'IR Simulator',
    'footer.cupaomania': 'CupãoMania',
    'footer.scanmyname': 'ScanMyName',

    // Blog Page
    'blog.title': 'SAPIENTE.AI Blog — Applied Artificial Intelligence for Business',
    'blog.subtitle': 'Specialized content about AI, machine learning, automation and technological trends for companies and professionals who want to evolve with data and technology.',
    'blog.search': 'Search articles...',
    'blog.all': 'All',
    'blog.readMore': 'Read Article',
    'blog.category': 'Category',
    'blog.date': 'Date',
    'blog.author': 'SAPIENTE.AI',
    'blog.knowledge': 'Knowledge • Strategy • Innovation',
    'blog.newsletter': 'Receive AI Insights',
    'blog.newsletterDesc': 'Subscribe to the SAPIENTE.AI newsletter and receive exclusive content about artificial intelligence, machine learning and technological trends straight to your inbox.',
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
    'newsletter.label': 'Email for Newsletter',
    'newsletter.placeholder': 'your@email.com',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.subscribing': 'Subscribing...',
    'newsletter.invalidEmail': 'Invalid email',
    'newsletter.subject': 'New Newsletter Subscription - SAPIENTE.AI',
    'newsletter.success': 'Subscription confirmed! Thank you for joining us.',
    'newsletter.error': 'Error subscribing. Please try again.',
    'newsletter.description': 'Receive insights about AI, technological trends and updates from SAPIENTE.AI. No spam, just valuable content.',

    // Social Media
    'social.instagram': 'Instagram',
    'social.tiktok': 'TikTok',
    'social.twitter': 'X (Twitter)',
    'social.linkedin': 'LinkedIn',
  },
};

export function getTranslation(language: Language, key: string): string {
  return translations[language]?.[key] || key;
}
