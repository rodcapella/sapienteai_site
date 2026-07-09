/**
 * SEO Head Component
 * Dynamically sets meta tags for each page
 */

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
}

const SITE_ORIGIN = "https://www.sapienteai.com";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/media/og/og-image.jpg`;
const DEFAULT_KEYWORDS =
  "inteligência artificial, IA aplicada, automação, websites de conversão, marketing digital, transformação digital, chatbots, dados e analytics";

function formatPageTitle(title: string) {
  const cleanTitle = title
    .replace(/^Sapiente\.AI\s*[-|–—:]\s*/i, "")
    .replace(/\s*[-|–—:]\s*Sapiente\.AI$/i, "")
    .trim();

  if (!cleanTitle || cleanTitle.toLowerCase() === "sapiente.ai") return "Sapiente.AI";

  return `Sapiente.AI - ${cleanTitle}`;
}

function normalizeCanonicalUrl(url: string) {
  return url.replace(/^https:\/\/sapienteai\.com/i, SITE_ORIGIN);
}

function getLocalizedHref(url: string, lang: "pt" | "en") {
  const normalizedUrl = normalizeCanonicalUrl(url);

  if (/\/(pt|en)(?=\/|$)/.test(normalizedUrl)) {
    return normalizedUrl.replace(/\/(pt|en)(?=\/|$)/, `/${lang}`);
  }

  return `${SITE_ORIGIN}/${lang}`;
}

export function setSEOHead({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  url = SITE_ORIGIN,
  type = "website",
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
}: SEOHeadProps) {
  const formattedTitle = formatPageTitle(title);
  const canonicalUrl = normalizeCanonicalUrl(url);
  const isEnglish = /\/en(?=\/|$)/.test(canonicalUrl);

  document.title = formattedTitle;
  document.documentElement.lang = isEnglish ? "en" : "pt-PT";

  const updateMetaTag = (name: string, content: string, property = false) => {
    let tag = document.querySelector(
      property ? `meta[property="${name}"]` : `meta[name="${name}"]`
    ) as HTMLMetaElement | null;

    if (!tag) {
      tag = document.createElement("meta");
      if (property) {
        tag.setAttribute("property", name);
      } else {
        tag.setAttribute("name", name);
      }
      document.head.appendChild(tag);
    }

    tag.content = content;
  };

  updateMetaTag("title", formattedTitle);
  updateMetaTag("description", description);
  updateMetaTag("keywords", keywords);
  updateMetaTag(
    "robots",
    noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  );

  updateMetaTag("og:title", formattedTitle, true);
  updateMetaTag("og:description", description, true);
  updateMetaTag("og:image", image, true);
  updateMetaTag("og:image:width", "1200", true);
  updateMetaTag("og:image:height", "630", true);
  updateMetaTag("og:image:alt", "Sapiente.AI", true);
  updateMetaTag("og:url", canonicalUrl, true);
  updateMetaTag("og:type", type, true);
  updateMetaTag("og:site_name", "Sapiente.AI", true);
  updateMetaTag("og:locale", isEnglish ? "en_US" : "pt_PT", true);
  updateMetaTag("og:locale:alternate", isEnglish ? "pt_PT" : "en_US", true);

  updateMetaTag("twitter:title", formattedTitle);
  updateMetaTag("twitter:description", description);
  updateMetaTag("twitter:image", image);
  updateMetaTag("twitter:image:alt", "Sapiente.AI");
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:url", canonicalUrl);
  updateMetaTag("twitter:site", "@SapienteAI");
  updateMetaTag("twitter:creator", "@SapienteAI");

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  [
    { lang: "pt", href: getLocalizedHref(canonicalUrl, "pt") },
    { lang: "en", href: getLocalizedHref(canonicalUrl, "en") },
    { lang: "x-default", href: `${SITE_ORIGIN}/` },
  ].forEach(({ lang, href }) => {
    const alternate = document.createElement("link");
    alternate.rel = "alternate";
    alternate.hreflang = lang;
    alternate.href = href;
    document.head.appendChild(alternate);
  });
}

export default function SEOHead({
  title,
  description,
  image,
  url,
  type,
  keywords,
  noindex,
}: SEOHeadProps) {
  setSEOHead({ title, description, image, url, type, keywords, noindex });
  return null;
}
