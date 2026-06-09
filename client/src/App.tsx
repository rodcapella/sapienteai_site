import { lazy, useEffect } from "react";
import { Redirect, Route, useLocation } from "wouter";

import CookieBanner from "@/components/CookieBanner";
import CookieFloatingButton from "@/components/CookieFloatingButton";
import MainLayout from "@/components/layout/MainLayout";
import { ThemeTransition } from "@/components/ThemeTransition";
import { useTheme } from "@/hooks/useTheme";

// ─── Lazy page imports ────────────────────────────────────────────────────────
// Suspense boundary lives in MainLayout so Header/Footer stay visible on load.

type PageWithLangProps = { lang: string };
const w = <T,>(p: Promise<{ default: T }>) =>
  p.then((m) => ({ default: m.default as React.ComponentType<PageWithLangProps> }));

const Home               = lazy(() => w(import("@/pages/Home")));
const About              = lazy(() => w(import("@/pages/About")));
const Services           = lazy(() => w(import("@/pages/Services")));
const FAQ                = lazy(() => w(import("@/pages/FAQ")));
const Terms              = lazy(() => w(import("@/pages/Terms")));
const Privacy            = lazy(() => w(import("@/pages/Privacy")));
const CookiesPage        = lazy(() => import("@/pages/CookiesPage"));
const Trust              = lazy(() => w(import("@/pages/Trust")));
const GenerativeAIPolicy = lazy(() => w(import("@/pages/GenerativeAIPolicy")));
const Blog               = lazy(() => w(import("@/pages/Blog")));
const News               = lazy(() => w(import("@/pages/News")));
const QuizAI             = lazy(() => import("@/pages/QuizAI"));
const Sitemap            = lazy(() => w(import("@/pages/Sitemap")));
const VisibilityValidator= lazy(() => import("@/pages/VisibilityValidator"));
const NotFound           = lazy(() => import("@/pages/NotFound"));

// ─── Route preloading ─────────────────────────────────────────────────────────
// Idle  → only the 4 core pages (almost always visited).
// Hover → remaining pages loaded on NavLink mouseenter (see navConfig).
// On-demand → legal/quiz/sitemap load only when navigated to.

const coreRoutes = [
  () => import("@/pages/Home"),
  () => import("@/pages/About"),
  () => import("@/pages/Services"),
];

function preloadCoreRoutes() {
  coreRoutes.forEach((load) => load());
}

// Exposed so NavLinks can call these on hover
export const preloadRoute: Record<string, () => void> = {
  about:    () => import("@/pages/About"),
  services: () => import("@/pages/Services"),
  faq:      () => import("@/pages/FAQ"),
  blog:     () => import("@/pages/Blog"),
  quiz:     () => import("@/pages/QuizAI"),
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [location, setLocation] = useLocation();
  const { isTransitioning } = useTheme();

  // Language redirect on first load
  useEffect(() => {
    const savedLang  = localStorage.getItem("lang");
    const currentLang = location.split("/")[1];

    if (currentLang === "blog") {
      setLocation(`/pt${location}`);
      return;
    }

    if (savedLang && currentLang !== savedLang && !["pt", "en"].includes(currentLang)) {
      setLocation(`/${savedLang}`);
      return;
    }

    if (!savedLang && !["pt", "en"].includes(currentLang)) {
      const browserLang = navigator.language.startsWith("en") ? "en" : "pt";
      setLocation(`/${browserLang}`);
    }
  }, []);

  // Persist language preference
  useEffect(() => {
    localStorage.setItem("lang", location.startsWith("/en") ? "en" : "pt");
  }, [location]);

  // Preload core route chunks during browser idle time (mobile-friendly: only 4 pages)
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(preloadCoreRoutes, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const id = window.setTimeout(preloadCoreRoutes, 3000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <ThemeTransition trigger={isTransitioning} />

      <Route path="/"><Redirect to="/pt" /></Route>
      <Route path="/blog"><Redirect to="/pt/blog" /></Route>

      <MainLayout>
        <Route path="/:lang">{(params) => <Home lang={params.lang} />}</Route>
        <Route path="/:lang/about">{(params) => <About lang={params.lang} />}</Route>
        <Route path="/:lang/services">{(params) => <Services lang={params.lang} />}</Route>
        <Route path="/:lang/faq">{(params) => <FAQ lang={params.lang} />}</Route>
        <Route path="/:lang/terms">{(params) => <Terms lang={params.lang} />}</Route>
        <Route path="/:lang/privacy">{(params) => <Privacy lang={params.lang} />}</Route>
        <Route path="/pt/cookies"><CookiesPage /></Route>
        <Route path="/en/cookies"><CookiesPage /></Route>
        <Route path="/:lang/trust">{(params) => <Trust lang={params.lang} />}</Route>
        <Route path="/:lang/generative-ai-policy">{(params) => <GenerativeAIPolicy lang={params.lang} />}</Route>
        <Route path="/:lang/blog">{(params) => <Blog lang={params.lang} />}</Route>
        <Route path="/:lang/news">{(params) => <News lang={params.lang} />}</Route>
        <Route path="/:lang/sitemap">{(params) => <Sitemap lang={params.lang} />}</Route>
        <Route path="/:lang/seo-geo-aeo-validator"><VisibilityValidator /></Route>
        <Route path="/pt/quiz-ia"><QuizAI lang="pt" /></Route>
        <Route path="/pt/quiz-ai"><Redirect to="/pt/quiz-ia" /></Route>
        <Route path="/en/quiz-ai"><QuizAI lang="en" /></Route>
        <Route path="/en/quiz-ia"><Redirect to="/en/quiz-ai" /></Route>
        <Route path="/:lang/404">{(params) => <NotFound lang={params.lang} />}</Route>
      </MainLayout>

      <CookieFloatingButton />
      <CookieBanner />
    </>
  );
}
