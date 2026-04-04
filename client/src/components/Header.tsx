import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useEffect } from 'react';
import ContactModal from '@/components/ContactModal';
import { Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from "wouter";
import { NavLink } from '@/components/ui/navigation/NavLink';
import { PremiumButton } from '@/components/ui/button/PremiumButton';

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    { name: 'Trust', href: `/${lang}/trust` },
    { name: 'Privacy', href: `/${lang}/privacy` },
    { name: 'Terms', href: `/${lang}/terms` },
    { name: 'LGPD', href: `/${lang}/lgpd` },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500 border-b",
          scrolled
            ? "bg-black/95 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-black border-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              scrolled ? "h-16 md:h-20" : "h-20 md:h-28"
            )}
          >

            {/* LOGO */}
            <Link
              href={`/${lang}`}
              className="flex items-center gap-2 hover:opacity-80 transition-all duration-500 flex-shrink-0 group"
            >
              <img
                src="/media/logos/sapiente-ai-footer.png"
                alt="SAPIENTE.AI"
                className="h-10 md:h-14 object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-10">
              <NavLink href={`/${lang}`} className="text-sm font-black uppercase tracking-widest">
                {t('nav.home')}
              </NavLink>

              <NavLink href={`/${lang}/about`} className="text-sm font-black uppercase tracking-widest">
                {t('nav.about')}
              </NavLink>

              <NavLink href={`/${lang}/team`} className="text-sm font-black uppercase tracking-widest">
                {t('nav.team')}
              </NavLink>

              {/* LEGAL DROPDOWN */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsLegalOpen(true)}
                onMouseLeave={() => setIsLegalOpen(false)}
              >
                <button className={cn(
                  "flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-all duration-300",
                  isLegalOpen ? "text-primary" : "text-white/70 hover:text-white"
                )}>
                  Legal
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-500", isLegalOpen && "rotate-180")} />
                </button>

                {/* DROPDOWN MENU */}
                <div className={cn(
                  "absolute top-full -left-4 w-48 pt-4 transition-all duration-500 origin-top-left",
                  isLegalOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                )}>
                  <div className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl">
                    {legalLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <NavLink href={`/${lang}/faq`} className="text-sm font-black uppercase tracking-widest">
                {t('nav.faq')}
              </NavLink>

              <div className="h-6 w-px bg-white/10"></div>

              <LanguageSelector />

              <PremiumButton 
                onClick={handleContactClick}
                className="scale-90"
              >
                {t('nav.fale')}
              </PremiumButton>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 hover:bg-white/10 transition-all duration-300 rounded-2xl"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8 text-white" />
              ) : (
                <Menu className="h-8 w-8 text-white" />
              )}
            </button>
          </nav>

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 top-[inherit] bg-black z-40 flex flex-col p-8 pt-12 space-y-8 animate-in fade-in slide-in-from-top-10 duration-500 overflow-y-auto">
              <div className="flex items-center justify-between pb-8 border-b border-white/10">
                <span className="text-white/40 text-xs font-black uppercase tracking-widest">Idioma</span>
                <LanguageSelector />
              </div>

              <div className="flex flex-col space-y-6">
                <NavLink
                  variant="mobile"
                  href={`/${lang}`}
                  onClick={handleNavClick}
                >
                  {t('nav.home')}
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/about`}
                  onClick={handleNavClick}
                >
                  {t('nav.about')}
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/team`}
                  onClick={handleNavClick}
                >
                  {t('nav.team')}
                </NavLink>

                <div className="py-4 space-y-4 border-y border-white/5">
                  <span className="text-white/30 text-xs font-black uppercase tracking-widest">Legal</span>
                  <div className="grid grid-cols-2 gap-4">
                    {legalLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        href={link.href}
                        onClick={handleNavClick}
                        className="text-lg font-bold text-white/60 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/faq`}
                  onClick={handleNavClick}
                >
                  {t('nav.faq')}
                </NavLink>
              </div>

              <div className="pt-8 mt-auto">
                <PremiumButton
                  onClick={handleContactClick}
                  className="w-full py-8 text-xl"
                >
                  {t('nav.fale')}
                </PremiumButton>
              </div>
            </div>
          )}
        </div>
      </header>

      {!onContactClick && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </>
  );
}
