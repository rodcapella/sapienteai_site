import { translations } from '@/lib/translations';
import { useLanguage } from '@/hooks/useLanguage';
import { useLocation } from "wouter";

export function useTranslation() {
  const [location] = useLocation();

  const lang = location.startsWith("/en") ? "en" : "pt";

  const t = (key: string) => {
    return translations[lang]?.[key] ?? key;
  };

  return { t, lang };
}