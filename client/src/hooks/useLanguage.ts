import { useTranslation } from "@/hooks/useTranslation";

export function useLanguage() {
  const { lang, switchLanguage, getLanguagePath } = useTranslation();

  return {
    lang,
    switchLanguage,
    getLanguagePath,
  };
}
