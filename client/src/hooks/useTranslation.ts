import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string): string => {
    try {
      // Direct lookup: translations[language] is a flat Record<string, string>
      const result = translations[language]?.[key] ?? translations['pt-PT']?.[key] ?? key;
      return result;
    } catch (error) {
      console.error('Translation error for key:', key, error);
      return key;
    }
  };

  return { t, language };
}
