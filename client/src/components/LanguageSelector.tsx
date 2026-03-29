import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { preloadPage } from "@/hooks/usePreload";
import { useLocation } from "wouter";

export function LanguageSelector() {
  const { lang } = useLanguage();
  const [location, setLocation] = useLocation();

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

  return (
    <button
      onClick={handleSwitch}
      onMouseEnter={() => {
        const newLang = lang === "pt" ? "en" : "pt";
        const newPath = location.replace(/^\/(pt|en)/, `/${newLang}`);
        preloadPage(newPath);
      }}
      className="
        relative flex items-center gap-2
        px-3 py-2 rounded-xl
        bg-white/[0.04]
        border border-white/10
        hover:border-cyan-400/40
        transition-all
      "
    >
      <span className="text-lg">
        {lang === "pt" ? "🇵🇹" : "🇺🇸"}
      </span>

      <span className="text-sm text-white/70 uppercase">
        {lang}
      </span>

      <motion.div
        layoutId="lang-indicator"
        className="
          absolute inset-0 rounded-xl
          bg-cyan-400/10
          blur-md
          -z-10
        "
      />
    </button>
  );
}