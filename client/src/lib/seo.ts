/**
 * SEO Utilities
 * Handles meta tags, structured data, and SEO optimization
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'blog';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  locale?: string;
}

/**
 * Update document meta tags for SEO
 */
export function updateMetaTags(config: SEOConfig) {
  // Title
  document.title = config.title;
  updateMetaTag('og:title', config.title);
  updateMetaTag('twitter:title', config.title);

  // Description
  updateMetaTag('description', config.description);
  updateMetaTag('og:description', config.description);
  updateMetaTag('twitter:description', config.description);

  // Keywords
  if (config.keywords && config.keywords.length > 0) {
    updateMetaTag('keywords', config.keywords.join(', '));
  }

  // Image
  if (config.image) {
    updateMetaTag('og:image', config.image);
    updateMetaTag('twitter:image', config.image);
    updateMetaTag('image', config.image);
  }

  // URL
  if (config.url) {
    updateMetaTag('og:url', config.url);
    updateMetaTag('canonical', config.url);
  }

  // Type
  if (config.type) {
    updateMetaTag('og:type', config.type);
  }

  // Article-specific tags
  if (config.type === 'article') {
    if (config.author) {
      updateMetaTag('article:author', config.author);
    }
    if (config.publishedDate) {
      updateMetaTag('article:published_time', config.publishedDate);
    }
    if (config.modifiedDate) {
      updateMetaTag('article:modified_time', config.modifiedDate);
    }
  }

  // Locale
  if (config.locale) {
    updateMetaTag('og:locale', config.locale);
  }

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:site', '@SapienteAI');

  // Additional SEO tags
  updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  updateMetaTag('googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
}

/**
 * Update or create a meta tag
 */
function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('article:')) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Generate JSON-LD structured data for Schema.org
 */
export function generateStructuredData(type: 'Organization' | 'Article' | 'BreadcrumbList', data: any) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Organization Schema
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'SAPIENTE.AI',
  'alternateName': 'Sapiente IA',
  'url': 'https://sapiente-ai.manus.space',
  'logo': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/UCZcamqTyYghcjGW.png',
  'description': 'Soluções de inteligência artificial aplicada para transformação digital de empresas',
  'sameAs': [
    'https://twitter.com/SapienteAI',
    'https://linkedin.com/company/sapiente-ai',
  ],
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'Customer Service',
    'email': 'sapiente.ai.oficial@gmail.com',
  },
  'areaServed': ['BR', 'PT'],
  'knowsAbout': [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Data Science',
  ],
};

/**
 * Article Schema
 */
export function articleSchema(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'description': article.excerpt,
    'image': article.image,
    'author': {
      '@type': 'Person',
      'name': article.author,
    },
    'datePublished': article.date,
    'dateModified': article.date,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://sapiente-ai.manus.space/blog/${article.id}`,
    },
    'keywords': article.category,
    'articleBody': article.content,
  };
}

/**
 * Breadcrumb Schema
 */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };
}

/**
 * Local Business Schema (for GEO optimization)
 */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'SAPIENTE.AI',
  'description': 'Soluções de inteligência artificial aplicada',
  'url': 'https://sapiente-ai.manus.space',
  'logo': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/UCZcamqTyYghcjGW.png',
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'BR',
    'addressRegion': 'São Paulo',
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'Customer Service',
    'email': 'sapiente.ai.oficial@gmail.com',
    'availableLanguage': ['pt-BR', 'pt-PT', 'en'],
  },
  'areaServed': [
    {
      '@type': 'Country',
      'name': 'Brazil',
    },
    {
      '@type': 'Country',
      'name': 'Portugal',
    },
  ],
};
