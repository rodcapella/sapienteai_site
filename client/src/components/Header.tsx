import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "wouter";

import { preloadTurnstile } from "@/components/TurnstileWidget";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { NavLink } from "@/components/ui/navigation/NavLink";
import { useTranslation } from "@/hooks/useTranslation";
import { Menu, X } from "@/lib/icons";
import { getNavLinks } from "@/lib/navConfig";
import { cn } from "@/lib/utils";

const ContactModal = lazy(() => import("@/components/ContactModal"));

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { t, lang } = useTranslation();
  const contactLabel = lang === "en" ? "Contact" : "Contacto";

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [lang]);

  // Focus management: move focus into overlay when open, return when closed
  useEffect(() => {
    if (isMobileMenuOpen) {
      closeBtnRef.current?.focus();
    } else {
      menuBtnRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  // Trap focus within overlay + close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const overlay = document.getElementById("mobile-nav");
      if (!overlay) return;

      const focusable = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleContactClick = () => {
    if (onContactClick) onContactClick();
    else setIsContactOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const logoClassName =
    "h-[52px] w-auto object-contain transition-all duration-500 md:h-[58px] lg:h-[62px]";

  const navLinks = getNavLinks(lang, t);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500",
          "border-[var(--brand-purple)]/20 bg-[var(--brand-offwhite)]/94 text-[var(--brand-night)] backdrop-blur-xl dark:border-[var(--brand-primary)]/30 dark:bg-[var(--brand-night)]/92 dark:text-[var(--brand-primary)]",
          scrolled
            ? "bg-[var(--brand-offwhite)]/98 shadow-[0_18px_40px_color-mix(in_srgb,var(--brand-darkest) 10%,transparent)] backdrop-blur-2xl dark:bg-[var(--brand-night)]/96 dark:shadow-[0_18px_60px_color-mix(in_srgb,var(--brand-night) 42%,transparent)]"
            : "dark:bg-[var(--brand-night)]/92",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-cyan)]/75 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6">
          <nav className={cn("grid grid-cols-[auto_1fr_auto] items-center transition-all duration-500", scrolled ? "h-14 md:h-16" : "h-16 md:h-[68px]")}>
            <div className="flex h-full w-[180px] shrink-0 items-center gap-2 overflow-hidden xl:w-[210px]">
              <img
                src="/media/logos/Logo_Sapiente_fundo_claro.webp"
                alt="Sapiente.AI"
                width="210"
                height="52"
                className={cn(logoClassName, "dark:hidden")}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />

              <img
                src="/media/logos/Logo_Sapiente_fundo_escuro.webp"
                alt="Sapiente.AI"
                width="210"
                height="52"
                className={cn(logoClassName, "hidden dark:block")}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="hidden min-w-0 items-center justify-center lg:flex">
              <div className="grid w-full max-w-[700px] grid-cols-6 items-center gap-1 xl:max-w-[760px] xl:gap-2">
                {navLinks.map((link) => (
                  <div key={link.href} className="flex min-w-0 justify-center text-center">
                    <NavLink href={link.href} onMouseEnter={link.preload}>{link.label}</NavLink>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden w-[380px] shrink-0 items-center justify-end gap-4 lg:flex xl:w-[420px]">
              <div className="h-6 w-px shrink-0 bg-[var(--brand-primary)]/24" />
              <div className="shrink-0 scale-100">
                <LanguageSelector />
              </div>
              {/* ThemeToggle temporariamente desativado: primeira versão será lançada apenas com tema claro. */}
              <PremiumButton onClick={handleContactClick} onMouseEnter={preloadTurnstile} className="min-w-[148px] whitespace-nowrap px-5 py-2 text-sm" variant="primary">
                {contactLabel}
              </PremiumButton>
            </div>

            <div className="col-start-3 flex items-center justify-end gap-3 lg:hidden">
              {/* ThemeToggle temporariamente desativado: primeira versão será lançada apenas com tema claro. */}
              <button
                ref={menuBtnRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-2xl border-2 border-[var(--brand-primary)]/70 bg-[var(--brand-primary)]/[0.05] p-3 text-[var(--brand-primary)] shadow-[0_10px_24px_color-mix(in_srgb,var(--brand-primary)_10%,transparent)] transition-all duration-300 hover:border-[var(--brand-cyan-bright)] hover:bg-[var(--brand-cyan-mid)]/[0.14] hover:text-[var(--brand-cyan-bright)] dark:bg-[var(--brand-near-dark2)] dark:border-[var(--brand-cyan-bright)]/55"
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
                type="button"
              >
                {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </nav>

          {/* Mobile overlay — sempre presente, animado por translate+opacity */}
          <div
            id="mobile-nav"
            role={isMobileMenuOpen ? "dialog" : undefined}
            aria-modal={isMobileMenuOpen ? "true" : undefined}
            aria-hidden={!isMobileMenuOpen}
            aria-label="Menu de navegação"
            className={cn(
              "fixed inset-x-0 top-0 z-[60] flex h-dvh flex-col bg-white dark:bg-[var(--brand-near-dark)] lg:hidden",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            )}
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              pointerEvents: isMobileMenuOpen ? "auto" : "none",
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-12px)",
            }}
          >
            {/* Topo: logo + idioma + fechar */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--brand-primary)]/15 px-5">
              <img
                src="/media/logos/Logo_Sapiente_fundo_claro.webp"
                alt="Sapiente.AI"
                className="h-9 w-auto object-contain dark:hidden"
              />
              <img
                src="/media/logos/Logo_Sapiente_fundo_escuro.webp"
                alt="Sapiente.AI"
                className="hidden h-9 w-auto object-contain dark:block"
              />
              <div className="flex items-center gap-3">
                <LanguageSelector />
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--brand-primary)]/30 text-[var(--brand-primary)] transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Links de navegação */}
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
              {navLinks.map((link, i) => (
                <div
                  key={link.href}
                  className="transition-all duration-300"
                  style={{ transitionDelay: isMobileMenuOpen ? `${i * 40}ms` : "0ms" }}
                >
                  <NavLink variant="mobile" href={link.href} onClick={handleNavClick} onMouseEnter={link.preload}>
                    {link.label}
                  </NavLink>
                </div>
              ))}
            </nav>

            {/* Rodapé: CTA */}
            <div className="shrink-0 border-t border-[var(--brand-primary)]/15 px-5 pb-8 pt-5">
              <PremiumButton onClick={handleContactClick} onMouseEnter={preloadTurnstile} className="w-full" variant="primary">
                {contactLabel}
              </PremiumButton>
              <p className="mt-3 text-center text-[11px] font-medium text-[var(--brand-night)]/40 dark:text-[var(--brand-offwhite)]/30">
                sapienteai.com
              </p>
            </div>
          </div>
        </div>
      </header>

      <Suspense fallback={null}>{!onContactClick && isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}</Suspense>
    </>
  );
}



