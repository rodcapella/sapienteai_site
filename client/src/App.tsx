import { Route, Redirect, useLocation } from "wouter";
import { useEffect, Suspense, lazy } from "react";
import { PageTransition } from "@/components/PageTransition";

// pages (lazy)
const Home = lazy(() => import("@/pages/Home"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Blog = lazy(() => import("@/pages/Blog"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));

export default function App() {
  const [location, setLocation] = useLocation();

  // 🌍 DETECÇÃO + REDIRECIONAMENTO
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");

    if (savedLang) {
      if (!location.startsWith(`/${savedLang}`)) {
        setLocation(location.replace(/^\/(pt|en)?/, `/${savedLang}`));
      }
      return;
    }

    const browserLang = navigator.language.startsWith("en") ? "en" : "pt";

    if (!location.startsWith("/pt") && !location.startsWith("/en")) {
      setLocation(`/${browserLang}`);
    }
  }, []);

  // 💾 PERSISTÊNCIA
  useEffect(() => {
    const currentLang = location.startsWith("/en") ? "en" : "pt";
    localStorage.setItem("lang", currentLang);
  }, [location]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white/40">
          Carregando...
        </div>
      }
    >
      {/* fallback raiz */}
      <Route path="/">
        <Redirect to="/pt" />
      </Route>

      {/* 🔥 SÓ O CONTEÚDO ANIMA */}
      <PageTransition>

        <Route path="/:lang">
          {(params) => <Home lang={params.lang} />}
        </Route>

        <Route path="/:lang/faq">
          {(params) => <FAQ lang={params.lang} />}
        </Route>

        <Route path="/:lang/blog">
          {(params) => <Blog lang={params.lang} />}
        </Route>

        <Route path="/:lang/blog/:slug">
          {(params) => (
            <ArticleDetail lang={`${params.lang}-${params.slug}`} />
          )}
        </Route>

      </PageTransition>
    </Suspense>
  );
}