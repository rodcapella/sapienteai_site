import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

export default function NotFound() {
  const [location, setLocation] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("notFound", lang);

  return (
    <div className="standard-section-bg min-h-screen flex items-center justify-center text-[#EAF6FF] relative overflow-hidden">
      <div className="max-w-lg w-full mx-4 backdrop-blur-xl bg-[#EAF6FF]/[0.03] border border-[#EAF6FF]/10 rounded-2xl p-10 text-center">
        <div className="flex justify-center mb-8 relative">
          <div className="absolute w-28 h-28 bg-[#00D1FF]/20 blur-3xl rounded-full"></div>
          <Icons.AlertCircle className="relative h-16 w-16 text-[#00D1FF]" />
        </div>

        <h1 className="mb-2 bg-gradient-to-r from-[#EAF6FF] to-[#00D1FF] bg-clip-text font-heading text-6xl font-black text-transparent">
          404
        </h1>

        <h2 className="mb-4 font-heading text-xl font-black text-[#EAF6FF]/80">
          {content.title}
        </h2>

        <p className="mb-10 whitespace-pre-line leading-relaxed text-[#EAF6FF]/50">
          {content.subtitle}
        </p>

        <Button
          onClick={() => setLocation(`/${lang}`)}
          className="group relative rounded-xl bg-[#0A84FF] px-6 py-3 text-[#EAF6FF] hover:bg-[#0A84FF]"
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
