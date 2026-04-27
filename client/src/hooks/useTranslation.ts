import { translations } from "@/lib/translations";
import { useLocation } from "wouter";

export function useTranslation() {
  const [location] = useLocation();

  // Extract language from URL (e.g., /en/about -> en, /pt/about -> pt)
  const urlLang = location.split("/")[1];

  // Map URL language to translation keys
  const lang = urlLang === "en" ? "en" : "pt-PT";

  const t = (key: string) => {
    const dictionary = translations[lang] ?? {};

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

  return { t, lang: urlLang || "pt" };
}
