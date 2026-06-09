import { useCallback, useEffect } from "react";
import { translations } from "@/lib/translations";
import { useLocation } from "wouter";

type AppLanguage = "pt" | "en";
type TranslationLanguage = keyof typeof translations;

type SwitchLanguageOptions = {
  preserveScroll?: boolean;
  preload?: (path: string) => void;
};

function getLanguageFromPath(path: string): AppLanguage {
  return path.split("/")[1] === "en" ? "en" : "pt";
}

function getTranslationLanguage(lang: AppLanguage): TranslationLanguage {
  return lang === "en" ? "en" : "pt-PT";
}

function buildLocalizedPath(path: string, lang: AppLanguage) {
  if (/^\/(pt|en)(?=\/|$)/.test(path)) {
    return path.replace(/^\/(pt|en)(?=\/|$)/, `/${lang}`);
  }

  if (!path || path === "/") return `/${lang}`;
  return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
}

export function useTranslation() {
  const [location, setLocation] = useLocation();

  const lang = getLanguageFromPath(location);
  const translationLang = getTranslationLanguage(lang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key: string) => {
    const dictionary = translations[translationLang] ?? {};

    // Prefer flat key lookup (e.g. "nav.home")
    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
      return dictionary[key as keyof typeof dictionary] || key;
    }

    // Backward compatibility for nested dictionaries, if reintroduced later
    const nested = key
      .split(".")
      .reduce<any>((obj, i) => (obj && typeof obj === "object" ? obj[i] : undefined), dictionary as any);

    return typeof nested === "string" ? nested : key;
  };

  const getLanguagePath = useCallback(
    (targetLang: AppLanguage = lang === "pt" ? "en" : "pt") => buildLocalizedPath(location, targetLang),
    [lang, location],
  );

  const switchLanguage = useCallback(
    (targetLang?: AppLanguage, options: SwitchLanguageOptions = {}) => {
      const nextLang = targetLang ?? (lang === "pt" ? "en" : "pt");
      const nextPath = buildLocalizedPath(location, nextLang);
      const scrollY = window.scrollY;

      options.preload?.(nextPath);
      setLocation(nextPath);

      if (options.preserveScroll) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
          });
        });
      }
    },
    [lang, location, setLocation],
  );

  return { t, lang, translationLang, switchLanguage, getLanguagePath };
}
