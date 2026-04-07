export type Language = 'pt-PT' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  'pt-PT': {
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.team': 'Equipa',
    'nav.portfolio': 'Portfólio',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contacto',
    'nav.fale': 'Fale com Especialista',

    // Footer
    'footer.description': 'Transformação digital com inteligência artificial aplicada',
    'footer.navigation': 'Navegação',
    'footer.legal': 'Legal',
    'footer.terms': 'Termos',
    'footer.privacy': 'Privacidade',
    'footer.lgpd': 'LGPD',
    'footer.newsletter': 'Newsletter',
    'footer.copyright': '© 2026 SAPIENTE.AI • Todos os direitos reservados',
    
    // Newsletter
    'newsletter.placeholder': 'seu@email.com',
    'newsletter.subscribe': 'Subscrever',
    'newsletter.subscribing': 'A subscrever...',
    'newsletter.success': 'Inscrição confirmada!',
    'newsletter.error': 'Erro ao subscrever.',

    // Contact Page
    'contact.title': 'Entre em Contacto',
    'contact.subtitle': 'Estamos prontos para impulsionar o seu negócio com IA.',
    'contact.form.name': 'Nome Completo',
    'contact.form.email': 'E-mail Profissional',
    'contact.form.message': 'Como podemos ajudar?',
    'contact.button': 'Enviar Mensagem',
    'contact.sending': 'A enviar...',
    'contact.success': 'Mensagem enviada com sucesso!',
    'contact.error': 'Erro ao enviar mensagem.'
  },

  'en': {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.team': 'Team',
    'nav.portfolio': 'Portfolio',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.fale': 'Contact Expert',

    // Footer
    'footer.description': 'Digital transformation with applied artificial intelligence',
    'footer.navigation': 'Navigation',
    'footer.legal': 'Legal',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.lgpd': 'LGPD',
    'footer.newsletter': 'Newsletter',
    'footer.copyright': '© 2026 SAPIENTE.AI • All rights reserved',

    // Newsletter
    'newsletter.placeholder': 'your@email.com',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.subscribing': 'Subscribing...',
    'newsletter.success': 'Subscription confirmed!',
    'newsletter.error': 'Error subscribing.',

    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We are ready to boost your business with AI.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Professional Email',
    'contact.form.message': 'How can we help?',
    'contact.button': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message.'
  }
};
