import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

export default function NotFound() {
  const [location, setLocation] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("notFound", lang);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)] text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-lg w-full mx-4 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-10 text-center">
        <div className="flex justify-center mb-8 relative">
          <div className="absolute w-28 h-28 bg-cyan-400/20 blur-3xl rounded-full"></div>
          <Icons.AlertCircle className="relative h-16 w-16 text-cyan-400" />
        </div>

        <h1 className="text-6xl font-black mb-2 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-xl font-semibold text-white/80 mb-4">
          {content.title}
        </h2>

        <p className="text-white/50 mb-10 leading-relaxed whitespace-pre-line">
          {content.subtitle}
        </p>

        <Button
          onClick={() => setLocation(`/${lang}`)}
          className="group relative bg-cyan-400 text-black hover:bg-cyan-300 px-6 py-3 rounded-xl"
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
