import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { preloadPage } from "@/hooks/usePreload";

export function LanguageSelector() {
  const { lang, switchLanguage, getLanguagePath } = useTranslation();
  const ref = useRef<HTMLButtonElement>(null);

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

    ref.current?.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current?.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const flagSrc = lang === "pt" ? "/media/flags/pt-PT.webp" : "/media/flags/en.webp";

  return (
    <motion.button
      ref={ref}
      onClick={() => switchLanguage(undefined, { preserveScroll: true, preload: preloadPage })}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => preloadPage(getLanguagePath())}
      style={{
        x: springX,
        y: springY,
      }}
      className="relative flex items-center gap-3 overflow-hidden rounded-full border border-[var(--brand-primary)] !bg-transparent px-5 py-2.5 backdrop-blur-xl transition-all duration-300 hover:border-[var(--brand-cyan-bright)] hover:shadow-[var(--shadow-neon-blue)] dark:!bg-transparent group"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `
            radial-gradient(
              120px circle at var(--x) var(--y),
              color-mix(in srgb,var(--brand-cyan) 20%,transparent),
              transparent 40%
            )
          `,
        }}
      />

      <div className="relative z-10 h-4 w-6 flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
        <img src={flagSrc} alt={lang === "pt" ? "Portugues" : "English"} className="h-full w-full object-cover" />
      </div>

      <span className="relative z-10 text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-primary)] transition-colors duration-300 group-hover:text-[var(--brand-cyan-bright)]">
        {lang}
      </span>

      <motion.div layoutId="lang-indicator" className="absolute inset-0 -z-10 rounded-full bg-transparent blur-md dark:bg-transparent" />
    </motion.button>
  );
}
