import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";

import { Menu, X } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

const ContactModal = lazy(() => import("@/components/ContactModal"));
const DesktopHeaderNavigation = lazy(() => import("@/components/header/DesktopHeaderNavigation"));
const MobileNavigation = lazy(() => import("@/components/header/MobileNavigation"));

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { lang } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
      if (event.matches) setIsMobileMenuOpen(false);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);
  const handleContactClick = useCallback(() => {
    if (onContactClick) onContactClick();
    else setIsContactOpen(true);
    setIsMobileMenuOpen(false);
  }, [onContactClick]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const logoClassName = "h-[52px] w-auto object-contain transition-all duration-500 md:h-[58px] lg:h-[62px]";

  return (
    <>
      <header className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500",
        "border-[var(--brand-purple)]/20 bg-[var(--brand-offwhite)]/94 text-[var(--brand-night)] backdrop-blur-xl dark:border-[var(--brand-primary)]/30 dark:bg-[var(--brand-night)]/92 dark:text-[var(--brand-primary)]",
        scrolled ? "bg-[var(--brand-offwhite)]/98 shadow-[0_18px_40px_color-mix(in_srgb,var(--brand-darkest) 10%,transparent)] backdrop-blur-2xl" : "",
      )}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-cyan)]/75 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6">
          <nav aria-label={lang === "en" ? "Main navigation" : "Navegação principal"} className={cn("grid grid-cols-[auto_1fr_auto] items-center transition-all duration-500", scrolled ? "h-14 md:h-16" : "h-16 md:h-[68px]")}>
            <div className="flex h-full w-[180px] shrink-0 items-center gap-2 overflow-hidden xl:w-[210px]">
              <img src="/media/logos/Logo_Sapiente_fundo_claro-210.webp" alt="Sapiente.AI" width="210" height="72" className={cn(logoClassName, "dark:hidden")} loading="eager" fetchPriority="high" decoding="async" />
              <img src="/media/logos/Logo_Sapiente_fundo_escuro-210.webp" alt="Sapiente.AI" width="210" height="72" className={cn(logoClassName, "hidden dark:block")} loading="eager" fetchPriority="high" decoding="async" />
            </div>

            {isDesktop && (
              <Suspense fallback={null}>
                <DesktopHeaderNavigation onContactClick={handleContactClick} />
              </Suspense>
            )}

            {!isDesktop && (
              <div className="col-start-3 flex items-center justify-end gap-3 lg:hidden">
                <button ref={menuButtonRef} onClick={toggleMobileMenu} className="rounded-2xl border-2 border-[var(--brand-primary)]/70 bg-[var(--brand-primary)]/[0.05] p-3 text-[var(--brand-primary)] shadow-[0_10px_24px_color-mix(in_srgb,var(--brand-primary)_10%,transparent)] transition-all duration-300" aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMobileMenuOpen} aria-controls="mobile-nav" type="button">
                  {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </button>
              </div>
            )}
          </nav>

          {!isDesktop && isMobileMenuOpen && (
            <Suspense fallback={null}>
              <MobileNavigation isOpen={isMobileMenuOpen} onClose={closeMobileMenu} onContactClick={handleContactClick} />
            </Suspense>
          )}
        </div>
      </header>

      <Suspense fallback={null}>
        {!onContactClick && isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
      </Suspense>
    </>
  );
}
