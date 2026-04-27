import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslation } from "@/hooks/useTranslation";
import { useState, useEffect } from "react";
import ContactModal from "@/components/ContactModal";
import { Menu, X, ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { NavLink } from "@/components/ui/navigation/NavLink";
import { PremiumButton } from "@/components/ui/button/PremiumButton";

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { t } = useTranslation();
  const [location] = useLocation();

  const lang = location.split("/")[1] || "pt";

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      setIsContactOpen(true);
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setIsLegalOpen(false);
  };

  const legalLinks = [
    { name: t("legal.trust") || "Trust", href: `/${lang}/trust` },
    { name: t("legal.privacy") || "Privacy", href: `/${lang}/privacy` },
    { name: t("legal.terms") || "Terms", href: `/${lang}/terms` },
    { name: t("legal.lgpd") || "LGPD", href: `/${lang}/lgpd` },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500",
          "border-[var(--tech-border)]",
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_18px_40px_rgba(10,17,40,0.14)] dark:bg-[#0A1128]/92"
            : "bg-white/90 backdrop-blur-xl dark:bg-[#0A1128]/86",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/75 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6">
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              scrolled ? "h-20 md:h-24" : "h-24 md:h-28",
            )}
          >
            <Link href={`/${lang}`} className="flex items-center gap-2 transition-all duration-500 hover:opacity-90">
              <img
                src="/logo-header.png"
                alt="SAPIENTE.AI"
                className="h-14 md:h-16 lg:h-[70px] w-auto object-contain"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              <NavLink href={`/${lang}`}>{t("nav.home")}</NavLink>
              <NavLink href={`/${lang}/about`}>{t("nav.about")}</NavLink>
              <NavLink href={`/${lang}/faq`}>{t("nav.faq")}</NavLink>
              <NavLink href={`/${lang}/contact`}>{t("nav.contact") || "Contact"}</NavLink>

              <div className="relative" onMouseEnter={() => setIsLegalOpen(true)} onMouseLeave={() => setIsLegalOpen(false)}>
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-all duration-300",
                    isLegalOpen ? "text-[#0EA5E9]" : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {t("nav.legal") || "Legal"}
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-500", isLegalOpen && "rotate-180")} />
                </button>

                <div
                  className={cn(
                    "absolute top-full -left-4 w-52 pt-4 origin-top-left transition-all duration-300",
                    isLegalOpen ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95",
                  )}
                >
                  <div className="rounded-2xl border border-[var(--tech-border)] bg-white/95 p-2 backdrop-blur-2xl shadow-[0_20px_50px_rgba(10,17,40,0.2)] dark:bg-[#091634]/95">
                    {legalLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-foreground/70 transition-all hover:bg-[#3B82F6]/10 hover:text-foreground"
                      >
                        <ShieldCheck className="h-4 w-4 text-[#00D4FF]" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-6 w-px bg-[var(--tech-border)]" />

              <LanguageSelector />
              <ThemeToggle />

              <PremiumButton onClick={handleContactClick} className="scale-90" variant="secondary">
                {t("nav.fale")}
              </PremiumButton>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-2xl border border-[var(--tech-border)] bg-[var(--glass-bg)] p-2.5 text-foreground transition-all duration-300 hover:border-[#00D4FF]/60 hover:text-[#00D4FF]"
                aria-label="Toggle menu"
                type="button"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#050d24]/96 p-6 pt-28 text-white backdrop-blur-2xl">
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                <span className="text-xs font-black uppercase tracking-widest text-white/40">{t("nav.language") || "Language"}</span>
                <LanguageSelector />
              </div>

              <div className="flex flex-col space-y-6">
                <NavLink variant="mobile" href={`/${lang}`} onClick={handleNavClick}>
                  {t("nav.home")}
                </NavLink>

                <NavLink variant="mobile" href={`/${lang}/about`} onClick={handleNavClick}>
                  {t("nav.about")}
                </NavLink>

                <NavLink variant="mobile" href={`/${lang}/faq`} onClick={handleNavClick}>
                  {t("nav.faq")}
                </NavLink>

                <NavLink variant="mobile" href={`/${lang}/contact`} onClick={handleNavClick}>
                  {t("nav.contact") || "Contact"}
                </NavLink>

                <div className="space-y-4 border-y border-white/10 py-4">
                  <span className="text-xs font-black uppercase tracking-widest text-white/30">{t("nav.legal") || "Legal"}</span>

                  <div className="grid grid-cols-2 gap-4">
                    {legalLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={handleNavClick}
                        className="text-lg font-bold text-white/70 transition-colors hover:text-[#22D3EE]"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <PremiumButton onClick={handleContactClick} className="w-full py-6 text-base" variant="primary">
                  {t("nav.fale")}
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
