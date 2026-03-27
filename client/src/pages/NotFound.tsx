import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-[radial-gradient(circle_at_top,_#0b1220,_#020617)]
        text-white
        relative
        overflow-hidden
      "
    >
      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>

      {/* 🧊 CONTAINER */}
      <div
        className="
          max-w-lg w-full mx-4
          backdrop-blur-xl
          bg-white/[0.03]
          border border-white/10
          rounded-2xl
          p-10
          text-center

          transition-all duration-300
          hover:scale-[1.01]
          hover:border-cyan-400/30
          hover:shadow-[0_0_80px_rgba(0,255,255,0.08)]
        "
      >
        {/* ICON + GLOW */}
        <div className="flex justify-center mb-8 relative">
          <div className="absolute w-28 h-28 bg-cyan-400/20 blur-3xl rounded-full"></div>
          <AlertCircle className="relative h-16 w-16 text-cyan-400" />
        </div>

        {/* 404 */}
        <h1
          className="
            text-6xl font-black mb-2
            bg-gradient-to-r from-white to-cyan-400
            bg-clip-text text-transparent
          "
        >
          404
        </h1>

        <h2 className="text-xl font-semibold text-white/80 mb-4">
          Página não encontrada
        </h2>

        {/* COPY (IDENTIDADE) */}
        <p className="text-white/50 mb-10 leading-relaxed">
          Essa página não existe neste sistema.
          <br />
          Mas eu sei exatamente para onde te levar.
        </p>

        {/* CTA */}
        <Button
          onClick={() => setLocation("/")}
          className="
            group
            relative
            bg-cyan-400 text-black
            hover:bg-cyan-300
            px-6 py-3
            rounded-xl
            overflow-hidden
          "
        >
          <span className="relative z-10 flex items-center">
            <Home className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition" />
            Voltar para Home
          </span>

          {/* glow interno */}
          <span
            className="
              absolute inset-0
              opacity-0 group-hover:opacity-100
              bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_0%,_transparent_70%)]
              transition
            "
          />
        </Button>
      </div>
    </div>
  );
}