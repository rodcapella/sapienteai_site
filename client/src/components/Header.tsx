import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useEffect } from 'react';
import ContactModal from '@/components/ContactModal';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from "wouter";
import { NavLink } from '@/components/ui/navigation/NavLink';

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { t } = useTranslation();
  const [location] = useLocation();

  const lang = location.split("/")[1] || "pt";

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-black/95 backdrop-blur-xl border-white/10 shadow-lg"
            : "bg-black border-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              scrolled ? "h-16" : "h-20 md:h-24"
            )}
          >

            {/* LOGO */}
            <Link
              href={`/${lang}`}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/JsygqIGdbHNWJuIo.png"
                alt="SAPIENTE.AI"
                className="h-10 md:h-14 object-contain invert"
              />
            </Link>

            {/* DESKTOP */}
            <div className="hidden lg:flex items-center gap-10">
              <NavLink
                href={`/${lang}`}
                className="text-sm text-white/70 hover:text-white font-bold uppercase tracking-widest transition-colors"
              >
                {t('nav.home')}
              </NavLink>

              <NavLink
                href={`/${lang}/about`}
                className="text-sm text-white/70 hover:text-white font-bold uppercase tracking-widest transition-colors"
              >
                {t('nav.about')}
              </NavLink>

              <NavLink
                href={`/${lang}/team`}
                className="text-sm text-white/70 hover:text-white font-bold uppercase tracking-widest transition-colors"
              >
                {t('nav.team')}
              </NavLink>

              <NavLink
                href={`/${lang}/trust`}
                className="text-sm text-white/70 hover:text-white font-bold uppercase tracking-widest transition-colors"
              >
                Trust
              </NavLink>

              <NavLink
                href={`/${lang}/faq`}
                className="text-sm text-white/70 hover:text-white font-bold uppercase tracking-widest transition-colors"
              >
                {t('nav.faq')}
              </NavLink>

              <div className="h-6 w-px bg-white/10"></div>

              <LanguageSelector />

              <Button
                onClick={handleContactClick}
                className="
                bg-primary text-primary-foreground
                px-8 py-3
                rounded-full
                font-black
                uppercase
                tracking-tighter
                hover:opacity-90
                hover:-translate-y-[1px]
                transition-all
                "
              >
                {t('nav.fale')}
              </Button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 hover:bg-white/10 transition-colors rounded-xl"
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
            <div className="lg:hidden fixed inset-0 top-[inherit] bg-black z-40 flex flex-col p-8 pt-12 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-center justify-between pb-8 border-b border-white/10">
                <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Idioma</span>
                <LanguageSelector />
              </div>

              <div className="flex flex-col space-y-6">
                <NavLink
                  variant="mobile"
                  href={`/${lang}`}
                  onClick={handleNavClick}
                  className="text-2xl text-white/70 hover:text-white font-bold"
                >
                  {t('nav.home')}
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/about`}
                  onClick={handleNavClick}
                  className="text-2xl text-white/70 hover:text-white font-bold"
                >
                  {t('nav.about')}
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/team`}
                  onClick={handleNavClick}
                  className="text-2xl text-white/70 hover:text-white font-bold"
                >
                  {t('nav.team')}
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/trust`}
                  onClick={handleNavClick}
                  className="text-2xl text-white/70 hover:text-white font-bold"
                >
                  Trust
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/faq`}
                  onClick={handleNavClick}
                  className="text-2xl text-white/70 hover:text-white font-bold"
                >
                  {t('nav.faq')}
                </NavLink>
              </div>

              <div className="pt-8 mt-auto">
                <Button
                  onClick={handleContactClick}
                  className="
                  w-full
                  bg-primary text-primary-foreground
                  py-8
                  rounded-2xl
                  font-black
                  text-xl
                  uppercase
                  tracking-tighter
                  "
                >
                  {t('nav.fale')}
                </Button>
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
