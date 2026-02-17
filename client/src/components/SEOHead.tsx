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

export function setSEOHead({
  title,
  description,
  image = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/FYRwdgClQVohvsom.png',
  url = 'https://sapiente-ai.manus.space',
  type = 'website',
  keywords = 'inteligência artificial, machine learning, IA generativa, automação, transformação digital'
}: SEOHeadProps) {
  // Update document title
  document.title = title;

  // Update or create meta tags
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

  // Basic meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);

  // Open Graph tags
  updateMetaTag('og:title', title, true);
  updateMetaTag('og:description', description, true);
  updateMetaTag('og:image', image, true);
  updateMetaTag('og:url', url, true);
  updateMetaTag('og:type', type, true);

  // Twitter tags
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image);
  updateMetaTag('twitter:card', 'summary_large_image');

  // Canonical URL
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
