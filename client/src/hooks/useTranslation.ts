import { translations } from '@/lib/translations';
import { useLocation } from "wouter";

export function useTranslation() {
  const [location] = useLocation();

<<<<<<< HEAD
  const lang = location.split("/")[1] || "pt";
=======
  // Extract language from URL (e.g., /en/about -> en, /pt/about -> pt)
  const urlLang = location.split("/")[1];
  
  // Map URL language to translation keys
  const lang = urlLang === "en" ? "en" : "pt-PT";
>>>>>>> 370dbba90159c1c26f44e5daafbebf311c416472

  const t = (key: string) => {
    return key
      .split('.')
      .reduce((obj, i) => obj?.[i], translations[lang]) ?? key;
  };

  return { t, lang: urlLang || "pt" };
}
