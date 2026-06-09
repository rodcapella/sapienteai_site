/**
 * SEO Head Component
 * Dynamically sets meta tags for each page
 */

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string;
}

function formatPageTitle(title: string) {
  const cleanTitle = title
    .replace(/^Sapiente\.AI\s*[-|–—:]\s*/i, '')
    .replace(/\s*[-|–—:]\s*Sapiente\.AI$/i, '')
    .trim();

  if (!cleanTitle || cleanTitle.toLowerCase() === 'sapiente.ai') return 'Sapiente.AI';

  return `Sapiente.AI - ${cleanTitle}`;
}

export function setSEOHead({
  title,
  description,
  image = '/media/logos/logo_sapiente_transparente.webp',
  url = 'https://sapienteai.com',
  type = 'website',
  keywords = 'inteligência artificial, machine learning, IA generativa, automação, transformação digital'
}: SEOHeadProps) {
  const formattedTitle = formatPageTitle(title);

  document.title = formattedTitle;

  const updateMetaTag = (name: string, content: string, property = false) => {
    let tag = document.querySelector(
      property ? `meta[property="${name}"]` : `meta[name="${name}"]`
    ) as HTMLMetaElement;

    if (!tag) {
      tag = document.createElement('meta');
      if (property) {
        tag.setAttribute('property', name);
      } else {
        tag.setAttribute('name', name);
      }
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);

  updateMetaTag('og:title', formattedTitle, true);
  updateMetaTag('og:description', description, true);
  updateMetaTag('og:image', image, true);
  updateMetaTag('og:url', url, true);
  updateMetaTag('og:type', type, true);

  updateMetaTag('twitter:title', formattedTitle);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image);
  updateMetaTag('twitter:card', 'summary_large_image');

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

export default function SEOHead({ title, description, image, url, type, keywords }: SEOHeadProps) {
  setSEOHead({ title, description, image, url, type, keywords });
  return null;
}
