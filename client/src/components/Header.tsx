import { useEffect, useState } from "react";
import { Link } from "wouter";

import ContactModal from "@/components/ContactModal";
import { preloadTurnstile } from "@/components/TurnstileWidget";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { NavLink } from "@/components/ui/navigation/NavLink";
import { useTranslation } from "@/hooks/useTranslation";
import { Menu, X } from "@/lib/icons";
import { getNavLinks } from "@/lib/navConfig";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { t, lang } = useTranslation();
  const contactLabel = lang === "en" ? "Contact" : "Contacto";

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                className={cn(logoClassName, "dark:hidden")}
              />

              <img
                src="/media/logos/Logo_Sapiente_fundo_escuro.webp"
                alt="Sapiente.AI"
                className={cn(logoClassName, "hidden dark:block")}
              />
            </div>

            <div className="hidden min-w-0 items-center justify-center lg:flex">
              <div className="grid w-full max-w-[620px] grid-cols-5 items-center gap-2 xl:max-w-[680px] xl:gap-3">
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
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-2xl border border-[var(--brand-primary)] bg-transparent p-2.5 text-[var(--brand-primary)] transition-all duration-300 hover:border-[var(--brand-cyan-bright)] hover:bg-[var(--brand-cyan-mid)]/[0.12] hover:text-[var(--brand-cyan-bright)] dark:bg-[var(--brand-near-dark2)]"
                aria-label="Toggle menu"
                type="button"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[color-mix(in_srgb,var(--section-ice)_96%,transparent)] px-5 pt-5 pb-6 text-[var(--brand-night)] backdrop-blur-2xl dark:bg-[var(--brand-near-dark)]/98 dark:text-[var(--brand-offwhite)] lg:hidden">

              {/* Barra topo: fechar + seletor de idioma */}
              <div className="mb-5 flex items-center justify-between border-b border-[var(--brand-purple)]/20 pb-4 dark:border-white/10">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--brand-night)]/40 dark:text-[var(--brand-offwhite)]/40">{t("nav.language") || "Language"}</span>
                <div className="flex items-center gap-3">
                  <LanguageSelector />
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--brand-primary)]/40 text-[var(--brand-primary)] transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
                    aria-label="Fechar menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col divide-y divide-[var(--brand-primary)]/10">
                {navLinks.map((link) => (
                  <NavLink key={link.href} variant="mobile" href={link.href} onClick={handleNavClick} onMouseEnter={link.preload}>
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <PremiumButton onClick={handleContactClick} onMouseEnter={preloadTurnstile} className="w-full" variant="primary">
                  {contactLabel}
                </PremiumButton>
              </div>
            </div>
          )}
        </div>
      </header>

      {!onContactClick && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </>
  );
}
