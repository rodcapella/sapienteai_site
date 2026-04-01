import { Route, Redirect, useLocation } from "wouter";
import { useEffect, Suspense, lazy } from "react";
import { PageTransition } from "@/components/PageTransition";
import MainLayout from "@/components/layout/MainLayout";
import { ThemeTransition } from "@/components/ThemeTransition";
import { useTheme } from "@/hooks/useTheme";

// pages (lazy)
const Home = lazy(() => import("@/pages/Home"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Blog = lazy(() => import("@/pages/Blog"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));

<ThemeTransition trigger={isTransitioning} />

export default function App() {
  const [location, setLocation] = useLocation();

  const { isTransitioning } = useTheme();

  // 🌍 DETECÇÃO DE IDIOMA (mais previsível)
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    const currentLang = location.split("/")[1];

    // 🔁 Se já existe idioma salvo, força consistência
    if (savedLang && currentLang !== savedLang) {
      setLocation(`/${savedLang}`);
      return;
    }

    // 🌐 Primeira visita
    if (!savedLang && !["pt", "en"].includes(currentLang)) {
      const browserLang = navigator.language.startsWith("en") ? "en" : "pt";
      setLocation(`/${browserLang}`);
    }
  }, []);

  // 💾 Persistência
  useEffect(() => {
    const currentLang = location.startsWith("/en") ? "en" : "pt";
    localStorage.setItem("lang", currentLang);
  }, [location]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A]">
          <div className="animate-pulse text-white/40 text-sm tracking-wide">
            Loading experience...
          </div>
        </div>
      }
          >
      {/* Root redirect */}
      <Route path="/">
        <Redirect to="/pt" />
      </Route>

      <MainLayout>
        <PageTransition>
          
          <Route path="/:lang">
            {(params) => <Home lang={params.lang} />}
          </Route>

          <Route path="/:lang/about">
            {(params) => <About  lang={params.lang} />}
          </Route>

          <Route path="/:lang/team">
            {(params) => <Team  lang={params.lang} />}
          </Route>

          <Route path="/:lang/faq">
            {(params) => <FAQ lang={params.lang} />}
          </Route>

          <Route path="/:lang/blog">
            {(params) => <Blog lang={params.lang} />}
          </Route>

          <Route path="/:lang/blog/:slug">
            {(params) => (
              <ArticleDetail 
                lang={params.lang} 
                slug={params.slug} 
              />
            )}
          </Route>

        </PageTransition>
      </MainLayout>
    </Suspense>
  );
}