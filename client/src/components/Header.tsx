import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

import ContactModal from "@/components/ContactModal";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { NavLink } from "@/components/ui/navigation/NavLink";
import { useTranslation } from "@/hooks/useTranslation";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { t } = useTranslation();
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
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
    "h-[64px] w-auto object-contain transition-all duration-500 md:h-[72px] lg:h-[80px]";

  const navLinks = [
    { href: `/${lang}`, label: t("nav.home") },
    { href: `/${lang}/about`, label: t("nav.about") },
    { href: `/${lang}/services`, label: t("nav.services") },
    { href: `/${lang}/faq`, label: t("nav.faq") },
    { href: lang === "pt" ? `/${lang}/quiz-ia` : `/${lang}/quiz-ai`, label: lang === "pt" ? "Quiz IA" : "AI Quiz" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500",
          "border-[var(--brand-purple)]/20 bg-[var(--brand-offwhite)]/94 text-[var(--brand-night)] backdrop-blur-xl dark:border-[var(--brand-primary)]/30 dark:bg-[#001547]/92 dark:text-[var(--brand-primary)]",
          scrolled
            ? "bg-[var(--brand-offwhite)]/98 shadow-[0_18px_40px_rgba(8,18,40,0.10)] backdrop-blur-2xl dark:bg-[#001547]/96 dark:shadow-[0_18px_60px_rgba(0,21,71,0.42)]"
            : "dark:bg-[#001547]/92",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-cyan)]/75 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6">
          <nav className={cn("grid grid-cols-[auto_1fr_auto] items-center transition-all duration-500", scrolled ? "h-16 md:h-18" : "h-18 md:h-20")}>
            <div className="flex h-full w-[180px] shrink-0 items-center gap-2 overflow-hidden xl:w-[210px]">
              <img
                src="/media/logos/Logo_Sapiente_fundo_claro.png"
                alt="Sapiente.AI"
                className={cn(logoClassName, "dark:hidden")}
              />

              <img
                src="/media/logos/Logo_Sapiente_fundo_escuro.png"
                alt="Sapiente.AI"
                className={cn(logoClassName, "hidden dark:block")}
              />
            </div>

            <div className="hidden min-w-0 items-center justify-center lg:flex">
              <div className="grid w-full max-w-[620px] grid-cols-5 items-center gap-2 xl:max-w-[680px] xl:gap-3">
                {navLinks.map((link) => (
                  <div key={link.href} className="flex min-w-0 justify-center text-center">
                    <NavLink href={link.href}>{link.label}</NavLink>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden w-[380px] shrink-0 items-center justify-end gap-4 lg:flex xl:w-[420px]">
              <div className="h-6 w-px shrink-0 bg-[var(--brand-primary)]/24" />
              <div className="shrink-0 scale-100">
                <LanguageSelector />
              </div>
              <div className="shrink-0 scale-100">
                <ThemeToggle />
              </div>
              <PremiumButton onClick={handleContactClick} className="min-w-[148px] whitespace-nowrap px-5 py-2 text-sm" variant="secondary">
                {contactLabel}
              </PremiumButton>
            </div>

            <div className="col-start-3 flex items-center justify-end gap-3 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-2xl border border-[var(--brand-primary)] bg-transparent p-2.5 text-[var(--brand-primary)] transition-all duration-300 hover:border-[var(--brand-cyan-bright)] hover:bg-[rgba(10,180,255,0.12)] hover:text-[var(--brand-cyan-bright)] dark:bg-[#081120]"
                aria-label="Toggle menu"
                type="button"
              >
                {isMobileMenuOpen ? <Icons.X className="h-6 w-6" /> : <Icons.Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[color-mix(in_srgb,var(--section-ice)_94%,transparent)] p-6 pt-28 text-[var(--brand-night)] backdrop-blur-2xl dark:bg-[#050d24]/98 dark:text-[var(--brand-offwhite)] lg:hidden">
              <div className="mb-8 flex items-center justify-between border-b border-[var(--brand-purple)]/20 pb-6 dark:border-white/10">
                <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-night)]/45 dark:text-[var(--brand-offwhite)]/40">{t("nav.language") || "Language"}</span>
                <LanguageSelector />
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} variant="mobile" href={link.href} onClick={handleNavClick}>
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <PremiumButton onClick={handleContactClick} className="w-full py-6 text-base" variant="primary">
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
