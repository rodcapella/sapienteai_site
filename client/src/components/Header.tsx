import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useEffect } from 'react';
import ContactModal from '@/components/ContactModal';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from "wouter";
import { NavLink } from '@/components/ui/navigation/NavLink';
import { ThemeToggle } from "@/components/ThemeToggle";

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
            ? "bg-black/90 backdrop-blur-xl border-white/10 shadow-lg"
            : "bg-black border-transparent"
        )}
      >
        <div className="container">
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              scrolled ? "h-14" : "h-16 md:h-20"
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
                className="h-10 md:h-12 object-contain invert"
              />
            </Link>

            {/* DESKTOP */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink
                href={`/${lang}`}
                className="text-sm text-white/70 hover:text-white font-medium transition-colors"
              >
                {t('nav.home')}
              </NavLink>

              <NavLink
                href={`/${lang}/about`}
                className="text-sm text-white/70 hover:text-white font-medium transition-colors"
              >
                {t('nav.about')}
              </NavLink>

              <NavLink
                href={`/${lang}/team`}
                className="text-sm text-white/70 hover:text-white font-medium transition-colors"
              >
                {t('nav.team')}
              </NavLink>

              <NavLink
                href={`/${lang}/trust`}
                className="text-sm text-white/70 hover:text-white font-medium transition-colors"
              >
                Trust
              </NavLink>

              <NavLink
                href={`/${lang}/faq`}
                className="text-sm text-white/70 hover:text-white font-medium transition-colors"
              >
                {t('nav.faq')}
              </NavLink>

              <div className="h-6 w-px bg-white/10"></div>

              <LanguageSelector />

              <Button
                onClick={handleContactClick}
                className="
                bg-primary text-primary-foreground
                px-5 py-2.5
                rounded-full
                font-semibold
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
              className="md:hidden p-2 hover:bg-white/10 transition-colors rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </nav>

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-black border-t border-white/10 backdrop-blur-xl">
              <div className="flex flex-col gap-4 p-6">

                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                   <span className="text-white/70 text-sm">Idioma</span>
                  <LanguageSelector />
                </div>

                <NavLink
                  variant="mobile"
                  href={`/${lang}`}
                  onClick={handleNavClick}
                  className="text-white/70 hover:text-white"
                >
                  {t('nav.home')}
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/about`}
                  onClick={handleNavClick}
                  className="text-white/70 hover:text-white"
                >
                  {t('nav.about')}
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/team`}
                  onClick={handleNavClick}
                  className="text-white/70 hover:text-white"
                >
                  {t('nav.team')}
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/trust`}
                  onClick={handleNavClick}
                  className="text-white/70 hover:text-white"
                >
                  Trust
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/faq`}
                  onClick={handleNavClick}
                  className="text-white/70 hover:text-white"
                >
                  {t('nav.faq')}
                </NavLink>

                <Button
                  onClick={handleContactClick}
                  className="
                  bg-primary text-primary-foreground
                  px-5 py-2.5
                  rounded-full
                  font-semibold
                  hover:opacity-90
                  transition-all
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
