/**
 * Single source of truth for navigation links.
 * Used by Header, Footer and any other component that needs the nav structure.
 */

export type NavItem = {
  href: string;
  label: string;
  preload?: () => void;
};

export function getNavLinks(lang: string, t: (key: string) => string): NavItem[] {
  const quizHref = lang === "en" ? `/${lang}/quiz-ai` : `/${lang}/quiz-ia`;
  const quizLabel = lang === "en" ? "AI Quiz" : "Quiz IA";

  return [
    { href: `/${lang}`,          label: t("nav.home") },
    { href: `/${lang}/about`,    label: t("nav.about"),    preload: () => import("@/pages/About") },
    { href: `/${lang}/services`, label: t("nav.services"), preload: () => import("@/pages/Services") },
    { href: `/${lang}/faq`,      label: t("nav.faq"),      preload: () => import("@/pages/FAQ") },
    { href: quizHref,            label: quizLabel,         preload: () => import("@/pages/QuizAI") },
  ];
}

export function getLegalLinks(lang: string, t: (key: string) => string): NavItem[] {
  return [
    { href: `/${lang}/terms`,                label: t("footer.terms") },
    { href: `/${lang}/privacy`,              label: t("footer.privacy") },
    { href: `/${lang}/trust`,                label: t("footer.trust") },
    { href: `/${lang}/generative-ai-policy`, label: t("footer.generative-ai-policy") },
    { href: `/${lang}/cookies`,              label: t("footer.cookies") },
  ];
}
