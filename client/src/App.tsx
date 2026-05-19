import { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, useLocation } from "wouter";

import MainLayout from "@/components/layout/MainLayout";
import { PageTransition } from "@/components/PageTransition";
import { ThemeTransition } from "@/components/ThemeTransition";
import { useTheme } from "@/hooks/useTheme";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Team = lazy(() => import("@/pages/Team"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Trust = lazy(() => import("@/pages/Trust"));
const RGPD = lazy(() => import("@/pages/RGPD"));
const GenerativeAIPolicy = lazy(() => import("@/pages/GenerativeAIPolicy"));
const Blog = lazy(() => import("@/pages/Blog"));
const Contact = lazy(() => import("@/pages/Contact"));
const QuizAI = lazy(() => import("@/pages/QuizAI"));
const Newsletter = lazy(() => import("@/pages/Newsletter"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));

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
        <div className="flex min-h-screen items-center justify-center bg-[#0B0F1A]">
          <div className="animate-pulse text-sm tracking-wide text-white/40">Loading experience...</div>
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
      <Route path="/blog/:slug">{(params) => <Redirect to={`/pt/blog/${params.slug}`} />}</Route>

      <MainLayout>
        <PageTransition>
          <Route path="/:lang">{(params) => <Home lang={params.lang} />}</Route>
          <Route path="/:lang/about">{(params) => <About lang={params.lang} />}</Route>
          <Route path="/:lang/team">{(params) => <Team lang={params.lang} />}</Route>
          <Route path="/:lang/faq">{(params) => <FAQ lang={params.lang} />}</Route>
          <Route path="/:lang/terms">{(params) => <Terms lang={params.lang} />}</Route>
          <Route path="/:lang/privacy">{(params) => <Privacy lang={params.lang} />}</Route>
          <Route path="/:lang/trust">{(params) => <Trust lang={params.lang} />}</Route>

          <Route path="/:lang/rgpd">{(params) => <RGPD lang={params.lang} />}</Route>
          <Route path="/:lang/RGPD">{(params) => <Redirect to={`/${params.lang}/rgpd`} />}</Route>

          <Route path="/:lang/generative-ai-policy">{(params) => <GenerativeAIPolicy lang={params.lang} />}</Route>
          <Route path="/:lang/blog">{(params) => <Blog lang={params.lang} />}</Route>
          <Route path="/:lang/contact">{(params) => <Contact lang={params.lang} />}</Route>
          <Route path="/:lang/newsletter">{(params) => <Newsletter lang={params.lang} />}</Route>

          <Route path="/pt/quiz-ia"><QuizAI lang="pt" /></Route>
          <Route path="/pt/quiz-ai"><Redirect to="/pt/quiz-ia" /></Route>
          <Route path="/en/quiz-ai"><QuizAI lang="en" /></Route>
          <Route path="/en/quiz-ia"><Redirect to="/en/quiz-ai" /></Route>

          <Route path="/:lang/blog/:slug">
            {(params) => <ArticleDetail lang={params.lang} slug={params.slug} />}
          </Route>
        </PageTransition>
      </MainLayout>
    </Suspense>
  );
}
