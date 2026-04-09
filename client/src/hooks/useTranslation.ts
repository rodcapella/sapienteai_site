import { translations } from '@/lib/translations';
import { useLocation } from "wouter";

export function useTranslation() {
  const [location] = useLocation();

  // Extract language from URL (e.g., /en/about -> en, /pt/about -> pt)
  const urlLang = location.split("/")[1];
  
  // Map URL language to translation keys
  const lang = urlLang === "en" ? "en" : "pt-PT";

  const t = (key: string) => {
    return key
      .split('.')
      .reduce((obj: any, i) => obj?.[i], translations[lang]) ?? key;
  };

  return { t, lang: urlLang || "pt" };
}
