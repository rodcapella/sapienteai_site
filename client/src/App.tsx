import { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, useLocation } from "wouter";

import MainLayout from "@/components/layout/MainLayout";
import { PageTransition } from "@/components/PageTransition";
import { ThemeTransition } from "@/components/ThemeTransition";
import { useTheme } from "@/hooks/useTheme";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Trust = lazy(() => import("@/pages/Trust"));
const GenerativeAIPolicy = lazy(() => import("@/pages/GenerativeAIPolicy"));
const Blog = lazy(() => import("@/pages/Blog"));
const QuizAI = lazy(() => import("@/pages/QuizAI"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));
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
    </Suspense>
  );
}
