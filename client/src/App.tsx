import { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, useLocation } from "wouter";

import CookieBanner from "@/components/CookieBanner";
import CookieFloatingButton from "@/components/CookieFloatingButton";
import MainLayout from "@/components/layout/MainLayout";
import { PageTransition } from "@/components/PageTransition";
import { ThemeTransition } from "@/components/ThemeTransition";
import { useTheme } from "@/hooks/useTheme";

// Tipagem padrão para os componentes que recebem o idioma via rota
type PageWithLangProps = { lang: string };

const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const About = lazy(() => import("@/pages/About").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const Services = lazy(() => import("@/pages/Services").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const FAQ = lazy(() => import("@/pages/FAQ").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const Terms = lazy(() => import("@/pages/Terms").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const Privacy = lazy(() => import("@/pages/Privacy").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const CookiesPage = lazy(() => import("@/pages/CookiesPage"));
const Trust = lazy(() => import("@/pages/Trust").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const GenerativeAIPolicy = lazy(() => import("@/pages/GenerativeAIPolicy").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const Blog = lazy(() => import("@/pages/Blog").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const QuizAI = lazy(() => import("@/pages/QuizAI").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const Sitemap = lazy(() => import("@/pages/Sitemap").then(m => ({ default: m.default as React.ComponentType<PageWithLangProps> })));
const VisibilityValidator = lazy(() => import("@/pages/VisibilityValidator"));

export default function App() {
  const [location, setLocation] = useLocation();
  const { isTransitioning } = useTheme();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
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

  useEffect(() => {
    const currentLang = location.startsWith("/en") ? "en" : "pt";
    localStorage.setItem("lang", currentLang);
  }, [location]);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--brand-night)]">
          <div className="animate-pulse text-sm tracking-wide text-[var(--brand-offwhite)]/40">Loading experience...</div>
        </div>
      }
    >
      <ThemeTransition trigger={isTransitioning} />

      <Route path="/">
        <Redirect to="/pt" />
      </Route>
      <Route path="/blog">
        <Redirect to="/pt/blog" />
      </Route>

      <MainLayout>
        <PageTransition>
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
          <Route path="/:lang/sitemap">{(params) => <Sitemap lang={params.lang} />}</Route>
          <Route path="/:lang/seo-geo-aeo-validator"><VisibilityValidator /></Route>

          <Route path="/pt/quiz-ia"><QuizAI lang="pt" /></Route>
          <Route path="/pt/quiz-ai"><Redirect to="/pt/quiz-ia" /></Route>
          <Route path="/en/quiz-ai"><QuizAI lang="en" /></Route>
          <Route path="/en/quiz-ia"><Redirect to="/en/quiz-ai" /></Route>
        </PageTransition>
      </MainLayout>
      <CookieFloatingButton />
      <CookieBanner />
    </Suspense>
  );
}
