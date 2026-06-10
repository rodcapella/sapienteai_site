import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEOHead } from "@/hooks/useSEOHead";
import { getContent } from "@/lib/content";
import { AlertCircle, Home } from "@/lib/icons";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { lang } = useTranslation();
  const content = getContent("notFound", lang);

  useSEOHead({
    title: lang === "en" ? "404 – Page not found · Sapiente.AI" : "404 – Página não encontrada · Sapiente.AI",
    description: lang === "en" ? "This page does not exist." : "Esta página não existe.",
    noindex: true,
  }, [lang]);

  return (
    <div className="standard-section-bg min-h-screen flex items-center justify-center text-[var(--brand-offwhite)] relative overflow-hidden">
      <div className="max-w-lg w-full mx-4 backdrop-blur-xl bg-[var(--brand-offwhite)]/[0.03] border border-[var(--brand-offwhite)]/10 rounded-2xl p-10 text-center">
        <div className="flex justify-center mb-8 relative">
          <div className="absolute w-28 h-28 bg-[var(--brand-cyan-bright)]/20 blur-3xl rounded-full"></div>
          <AlertCircle className="relative h-16 w-16 text-[var(--brand-cyan-bright)]" />
        </div>

        <h1 className="mb-2 bg-gradient-to-r from-[var(--brand-offwhite)] to-[var(--brand-cyan-bright)] bg-clip-text font-heading text-6xl font-black text-transparent">
          404
        </h1>

        <h2 className="mb-4 font-heading text-xl font-black text-[var(--brand-offwhite)]/80">
          {content.title}
        </h2>

        <p className="mb-10 whitespace-pre-line leading-relaxed text-[var(--brand-offwhite)]/50">
          {content.subtitle}
        </p>

        <Button
          onClick={() => setLocation(`/${lang}`)}
          className="group relative rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-[var(--brand-offwhite)] hover:bg-[var(--brand-primary)]"
        >
          <span className="flex items-center">
            <Home className="w-4 h-4 mr-2" />
            {content.button}
          </span>
        </Button>
      </div>
    </div>
  );
}
