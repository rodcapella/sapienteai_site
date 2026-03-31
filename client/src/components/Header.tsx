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
          `
          sticky top-0 z-50
          transition-all duration-300
          border-b
          `,
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-gray-200 shadow-soft"
            : "bg-white/60 backdrop-blur-md border-transparent"
        )}
      >
        <div className="container">
          <nav
            className={cn(
              "flex items-center justify-between px-4 transition-all duration-300",
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
                className="h-12 md:h-14 object-contain"
              />
            </Link>

            {/* DESKTOP */}
            <div className="hidden md:flex items-center gap-8">
              <ThemeToggle />
              <NavLink
                href={`/${lang}`}
                className="text-sm text-gray-900 font-medium"
              >
                {t('nav.home')}
              </NavLink>

              <NavLink
                href={`/${lang}/about`}
                className="text-sm text-gray-900 font-medium"
              >
                {t('nav.about')}
              </NavLink>

              <NavLink
                href={`/${lang}/team`}
                className="text-sm text-gray-900 font-medium"
              >
                {t('nav.team')}
              </NavLink>

              <NavLink
                href={`/${lang}/trust`}
                className="text-sm text-gray-900 font-medium"
              >
                Trust
              </NavLink>

              <NavLink
                href={`/${lang}/faq`}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t('nav.faq')}
              </NavLink>

              <div className="h-6 w-px bg-gray-200"></div>

              <LanguageSelector />

              <Button
                onClick={handleContactClick}
                className="
                bg-primary text-white
                px-5 py-2.5
                rounded-lg
                shadow-soft
                hover:shadow-medium
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
              className="md:hidden p-2 hover:bg-gray-100 transition-colors rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </nav>

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 backdrop-blur-xl">
              <div className="flex flex-col gap-4 p-4">

                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                   <span className="text-gray-700 text-sm">Tema</span>
                      <ThemeToggle />
                   <span className="text-gray-700 text-sm">Idioma</span>
                  <LanguageSelector />
                </div>

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

                <NavLink
                  variant="mobile"
                  href={`/${lang}/trust`}
                  onClick={handleNavClick}
                >
                  Trust
                </NavLink>

                <NavLink
                  variant="mobile"
                  href={`/${lang}/faq`}
                  onClick={handleNavClick}
                >
                  {t('nav.faq')}
                </NavLink>

                <Button
                  onClick={handleContactClick}
                  className="
                  bg-primary text-white
                  px-5 py-2.5
                  rounded-lg
                  shadow-soft
                  hover:shadow-medium
                  hover:-translate-y-[1px]
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