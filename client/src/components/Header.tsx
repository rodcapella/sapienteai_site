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

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

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
    { name: t("legal.rgpd") || "RGPD", href: `/${lang}/rgpd` },
    { name: t("legal.generative-ai-policy") || "Generative AI Policy", href: `/${lang}/generative-ai-policy` },
  ];

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500", "border-slate-200 text-slate-900 dark:border-cyan-500/20 dark:text-white", scrolled ? "bg-white/96 backdrop-blur-2xl shadow-[0_18px_40px_rgba(10,17,40,0.14)] dark:bg-[#050B16]/96 dark:shadow-[0_18px_60px_rgba(0,0,0,0.65)]" : "bg-white/92 backdrop-blur-xl dark:bg-[#050B16]/92")}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-cyan)]/75 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6">
          <nav className={cn("flex items-center justify-between transition-all duration-500", scrolled ? "h-20 md:h-24" : "h-24 md:h-28")}>
            <Link href={`/${lang}`} className="flex items-center gap-2 transition-all duration-500 hover:opacity-90">
              <img src="/media/logos/logo_sapiente_transparente.png" alt="SAPIENTE.AI" className="h-[67px] w-auto object-contain md:h-[77px] lg:h-[84px]" />
            </Link>
            <div className="hidden items-center gap-8 lg:flex xl:gap-10">
              <NavLink href={`/${lang}`}>{t("nav.home")}</NavLink>
              <NavLink href={`/${lang}/about`}>{t("nav.about")}</NavLink>
              <NavLink href={`/${lang}/team`}>{t("nav.team")}</NavLink>
              <NavLink href={`/${lang}/faq`}>{t("nav.faq")}</NavLink>
              <NavLink href={lang === "pt" ? `/${lang}/quiz-ia` : `/${lang}/quiz-ai`}>{lang === "pt" ? "Quiz IA" : "AI Quiz"}</NavLink>
              <div className="relative" onMouseEnter={() => setIsLegalOpen(true)} onMouseLeave={() => setIsLegalOpen(false)}>
                <button type="button" className={cn("flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-all duration-300", isLegalOpen ? "text-[var(--brand-cyan)]" : "text-slate-700 hover:text-slate-900 dark:text-white/90 dark:hover:text-[var(--brand-cyan)]")}>{t("nav.legal") || "Legal"}<Icons.ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isLegalOpen && "rotate-180")} /></button>
                <div className={cn("absolute top-full -left-4 w-60 origin-top-left pt-4 transition-all duration-300", isLegalOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0")}>
                  <div className="rounded-2xl border border-slate-200 bg-white/96 p-2 text-slate-900 shadow-[0_20px_50px_rgba(10,17,40,0.2)] backdrop-blur-2xl dark:border-cyan-500/20 dark:bg-[#071126]/98 dark:text-white dark:shadow-[0_20px_60px_rgba(0,0,0,0.75)]">
                    {legalLinks.map((link) => <Link key={link.name} href={link.href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-[var(--brand-primary)]/10 hover:text-slate-900 dark:!text-white dark:hover:!text-[var(--brand-cyan)] dark:hover:bg-cyan-400/10"><Icons.ShieldCheck className="h-4 w-4 text-[var(--brand-cyan)]" /><span className="dark:!text-inherit">{link.name}</span></Link>)}
                  </div>
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />
              <LanguageSelector />
              <ThemeToggle />
              <PremiumButton onClick={handleContactClick} className="scale-90" variant="secondary">{t("nav.fale")}</PremiumButton>
            </div>
            <div className="flex items-center gap-3 lg:hidden">
              <ThemeToggle />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-800 transition-all duration-300 hover:border-[var(--brand-cyan)] hover:text-[var(--brand-cyan)] dark:border-cyan-500/20 dark:bg-[#081120] dark:text-white" aria-label="Toggle menu" type="button">{isMobileMenuOpen ? <Icons.X className="h-6 w-6" /> : <Icons.Menu className="h-6 w-6" />}</button>
            </div>
          </nav>
          {isMobileMenuOpen && <div className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#050d24]/98 p-6 pt-28 text-white backdrop-blur-2xl lg:hidden"><div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6"><span className="text-xs font-black uppercase tracking-widest text-white/40">{t("nav.language") || "Language"}</span><LanguageSelector /></div><div className="flex flex-col space-y-6"><NavLink variant="mobile" href={`/${lang}`} onClick={handleNavClick}>{t("nav.home")}</NavLink><NavLink variant="mobile" href={`/${lang}/about`} onClick={handleNavClick}>{t("nav.about")}</NavLink><NavLink variant="mobile" href={`/${lang}/team`} onClick={handleNavClick}>{t("nav.team")}</NavLink><NavLink variant="mobile" href={`/${lang}/faq`} onClick={handleNavClick}>{t("nav.faq")}</NavLink><NavLink variant="mobile" href={lang === "pt" ? `/${lang}/quiz-ia` : `/${lang}/quiz-ai`} onClick={handleNavClick}>{lang === "pt" ? "Quiz IA" : "AI Quiz"}</NavLink><div className="space-y-4 border-y border-white/10 py-4"><span className="text-xs font-black uppercase tracking-widest text-white/30">{t("nav.legal") || "Legal"}</span><div className="grid grid-cols-2 gap-4">{legalLinks.map((link) => <Link key={link.name} href={link.href} onClick={handleNavClick} className="text-lg font-bold text-white/90 transition-colors hover:text-[var(--brand-cyan)]">{link.name}</Link>)}</div></div></div><div className="mt-auto pt-8"><PremiumButton onClick={handleContactClick} className="w-full py-6 text-base" variant="primary">{t("nav.fale")}</PremiumButton></div></div>}
        </div>
      </header>
      {!onContactClick && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </>
  );
}
