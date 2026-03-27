import { translations } from '@/lib/translations';

export function useTranslation() {
  const language = 'pt-PT';

  const t = (key: string): string => {
    return translations[language]?.[key] ?? key;
  };

  return { t, language };
}