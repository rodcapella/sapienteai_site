import { Suspense, lazy, useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Redirect, Route, useLocation } from "wouter";

import MainLayout from "@/components/layout/MainLayout";
import { trackGooglePageView } from "@/lib/googleAnalytics";

// ─── Lazy page imports ────────────────────────────────────────────────────────
// Suspense boundary lives in MainLayout so Header/Footer stay visible on load.

type PageWithLangProps = { lang: string };
const w = <T,>(p: Promise<{ default: T }>) =>
  p.then((m) => ({ default: m.default as React.ComponentType<PageWithLangProps> }));

const Home               = lazy(() => w(import("@/pages/Home")));
const About              = lazy(() => w(import("@/pages/About")));
const Services           = lazy(() => w(import("@/pages/Services")));
const Projects           = lazy(() => w(import("@/pages/Projects")));
const FAQ                = lazy(() => w(import("@/pages/FAQ")));
const Terms              = lazy(() => w(import("@/pages/Terms")));
const Privacy            = lazy(() => w(import("@/pages/Privacy")));
const CookiesPage        = lazy(() => import("@/pages/CookiesPage"));
const Trust              = lazy(() => w(import("@/pages/Trust")));
const GenerativeAIPolicy = lazy(() => w(import("@/pages/GenerativeAIPolicy")));
const Blog               = lazy(() => w(import("@/pages/Blog")));
const BlogArticle        = lazy(() => import("@/pages/BlogArticle"));
const News               = lazy(() => w(import("@/pages/News")));
const QuizAI             = lazy(() => import("@/pages/QuizAI"));
const Sitemap            = lazy(() => w(import("@/pages/Sitemap")));
const VisibilityValidator= lazy(() => import("@/pages/VisibilityValidator"));
const NewsletterUnsubscribe = lazy(() => import("@/pages/NewsletterUnsubscribe"));
const NotFound           = lazy(() => import("@/pages/NotFound"));
const CookieBanner       = lazy(() => import("@/components/CookieBanner"));
const CookieFloatingButton = lazy(() => import("@/components/CookieFloatingButton"));
const WhatsAppFloatingButton = lazy(() => import("@/components/WhatsAppFloatingButton"));
const VercelTelemetry = lazy(() => import("@/components/VercelTelemetry"));

function useDeferredMount(delayMs: number, idleTimeoutMs = 2000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let delayId: number | undefined;
    let idleId: number | undefined;

    const schedule = () => {
      delayId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(() => setReady(true), { timeout: idleTimeoutMs });
          return;
        }

        setReady(true);
      }, delayMs);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (delayId !== undefined) window.clearTimeout(delayId);
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
    };
  }, [delayMs, idleTimeoutMs]);

  return ready;
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [location, setLocation] = useLocation();
  const shouldRenderCookieUi = useDeferredMount(1200);
  const shouldRenderTelemetry = useDeferredMount(1800);
  const shouldRenderWhatsApp = useDeferredMount(3000);

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
    trackGooglePageView();
  }, [location]);

  return (
    <>
      <SpeedInsights route={location} />

      <Route path="/"><Redirect to="/pt" /></Route>
      <Route path="/blog"><Redirect to="/pt/blog" /></Route>

      <MainLayout>
        <Route path="/:lang">{(params) => <Home lang={params.lang} />}</Route>
        <Route path="/:lang/about">{(params) => <About lang={params.lang} />}</Route>
        <Route path="/:lang/services">{(params) => <Services lang={params.lang} />}</Route>
        <Route path="/:lang/projects">{(params) => <Projects lang={params.lang} />}</Route>
        <Route path="/:lang/faq">{(params) => <FAQ lang={params.lang} />}</Route>
        <Route path="/:lang/terms">{(params) => <Terms lang={params.lang} />}</Route>
        <Route path="/:lang/privacy">{(params) => <Privacy lang={params.lang} />}</Route>
        <Route path="/pt/cookies"><CookiesPage /></Route>
        <Route path="/en/cookies"><CookiesPage /></Route>
        <Route path="/:lang/trust">{(params) => <Trust lang={params.lang} />}</Route>
        <Route path="/:lang/generative-ai-policy">{(params) => <GenerativeAIPolicy lang={params.lang} />}</Route>
        <Route path="/:lang/blog">{(params) => <Blog lang={params.lang} />}</Route>
        <Route path="/:lang/blog/:slug">{(params) => <BlogArticle lang={params.lang} slug={params.slug} />}</Route>
        <Route path="/:lang/news">{(params) => <News lang={params.lang} />}</Route>
        <Route path="/:lang/sitemap">{(params) => <Sitemap lang={params.lang} />}</Route>
        <Route path="/:lang/seo-geo-aeo-validator"><VisibilityValidator /></Route>
        <Route path="/:lang/newsletter/unsubscribe"><NewsletterUnsubscribe /></Route>
        <Route path="/pt/quiz-ia"><QuizAI /></Route>
        <Route path="/pt/quiz-ai"><Redirect to="/pt/quiz-ia" /></Route>
        <Route path="/en/quiz-ai"><QuizAI /></Route>
        <Route path="/en/quiz-ia"><Redirect to="/en/quiz-ai" /></Route>
        <Route path="/:lang/404"><NotFound /></Route>
      </MainLayout>

      {shouldRenderCookieUi && (
        <Suspense fallback={null}>
          <CookieFloatingButton />
          <CookieBanner />
        </Suspense>
      )}

      {shouldRenderWhatsApp && (
        <Suspense fallback={null}>
          <WhatsAppFloatingButton />
        </Suspense>
      )}

      {shouldRenderTelemetry && (
        <Suspense fallback={null}>
          <VercelTelemetry />
        </Suspense>
      )}
    </>
  );
}
