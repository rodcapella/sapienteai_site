import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

export default function NotFound() {
  const [location, setLocation] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("notFound", lang);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)] text-[var(--brand-offwhite)] relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--brand-cyan)]/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-lg w-full mx-4 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-10 text-center">
        <div className="flex justify-center mb-8 relative">
          <div className="absolute w-28 h-28 bg-[var(--brand-cyan)]/20 blur-3xl rounded-full"></div>
          <Icons.AlertCircle className="relative h-16 w-16 text-[var(--brand-cyan)]" />
        </div>

        <h1 className="mb-2 bg-gradient-to-r from-[var(--brand-offwhite)] to-[var(--brand-cyan)] bg-clip-text font-heading text-6xl font-black text-transparent">
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
          className="group relative rounded-xl bg-[var(--brand-cyan)] px-6 py-3 text-[var(--brand-night)] hover:bg-[var(--brand-cyan-bright)]"
        >
          <span className="flex items-center">
            <Icons.Home className="w-4 h-4 mr-2" />
            {content.button}
          </span>
        </Button>
      </div>
    </div>
  );
}
