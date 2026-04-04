import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { preloadPage } from "@/hooks/usePreload";
import { useLocation } from "wouter";
import { useRef } from "react";

export function LanguageSelector() {
  const { lang } = useLanguage();
  const [location, setLocation] = useLocation();

  const ref = useRef<HTMLButtonElement>(null);

  // 🎯 magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.15);
    y.set(dy * 0.15);

    // 🌌 glow position
    if (ref.current) {
      ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
      ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSwitch = () => {
    const scrollY = window.scrollY;

    const newLang = lang === "pt" ? "en" : "pt";
    const newPath = location.replace(/^\/(pt|en)/, `/${newLang}`);

    preloadPage(newPath);
    setLocation(newPath);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    });
  };

  const flagSrc = lang === "pt" ? "/media/flags/pt-PT.png" : "/media/flags/en.png";

  return (
    <motion.button
      ref={ref}
      onClick={handleSwitch}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        const newLang = lang === "pt" ? "en" : "pt";
        const newPath = location.replace(/^\/(pt|en)/, `/${newLang}`);
        preloadPage(newPath);
      }}
      style={{
        x: springX,
        y: springY,
      }}
      className="
        relative flex items-center gap-3
        px-5 py-2.5 rounded-full
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        transition-all duration-300
        hover:border-primary/40
        hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]
        group
        overflow-hidden
      "
    >
      {/* 🌌 GLOW DINÂMICO */}
      <span
        className="
          pointer-events-none absolute inset-0
          opacity-0 group-hover:opacity-100
          transition duration-300
        "
        style={{
          background: `
            radial-gradient(
              120px circle at var(--x) var(--y),
              rgba(34,211,238,0.2),
              transparent 40%
            )
          `,
        }}
      />

      {/* 🌍 FLAG */}
      <div className="w-6 h-4 overflow-hidden rounded-sm relative z-10 flex-shrink-0 shadow-sm">
        <img 
          src={flagSrc} 
          alt={lang === "pt" ? "Português" : "English"} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXT */}
      <span className="text-xs font-black tracking-[0.2em] text-white/80 uppercase relative z-10">
        {lang}
      </span>

      {/* ✨ ACTIVE GLOW */}
      <motion.div
        layoutId="lang-indicator"
        className="
          absolute inset-0 rounded-full
          bg-primary/10
          blur-md
          -z-10
        "
      />
    </motion.button>
  );
}
