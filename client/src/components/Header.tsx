import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useEffect } from 'react';
import ContactModal from '@/components/ContactModal';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// 🔥 novo
import { NavLink } from '@/components/ui/navigation/NavLink';

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { t } = useTranslation();
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

  const activeSection = useScrollSpy([
  "home",
  "values",
  "services",
  "cta"
]);

  return (
    <>
      <header
        className={cn(
          `
          sticky top-0 z-50
          transition-all duration-300

          opacity-0 translate-y-[-10px]
          animate-[headerEnter_0.6s_ease-out_forwards]
          `,
          scrolled
            ? `
              backdrop-blur-xl
              bg-black/40
              border-b border-white/10
              shadow-[0_10px_40px_rgba(0,0,0,0.5)]
            `
            : `bg-transparent`
        )}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 md:h-20 px-4">

            {/* LOGO */}
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/JsygqIGdbHNWJuIo.png" 
                alt="SAPIENTE.AI" 
                className="h-12 md:h-16 object-contain"
              />
            </a>
            
            {/* DESKTOP */}
            <div className="hidden md:flex items-center gap-6">

              <NavLink href="/" isActive>
                {t('nav.home')}
              </NavLink>

              <NavLink href="/portfolio">
                {t('nav.portfolio')}
              </NavLink>

              <NavLink href="/faq">
                {t('nav.faq')}
              </NavLink>

              <NavLink href="/noticias">
                {t('nav.noticias')}
              </NavLink>

              <div className="h-6 w-px bg-white/10"></div>

              <LanguageSelector />

              <Button onClick={handleContactClick}>
                {t('nav.fale')}
              </Button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/5 transition-colors rounded-lg"
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
            <div className="
              md:hidden
              border-t border-white/10
              backdrop-blur-xl
              bg-black/80
            ">
              <div className="flex flex-col gap-4 p-4">

                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs text-white/50">Idioma</span>
                  <LanguageSelector />
                </div>
                
                <NavLink variant="mobile" href="/" onClick={handleNavClick}>
                  {t('nav.home')}
                </NavLink>

                <NavLink variant="mobile" href="/portfolio" onClick={handleNavClick}>
                  {t('nav.portfolio')}
                </NavLink>

                <NavLink variant="mobile" href="/faq" onClick={handleNavClick}>
                  {t('nav.faq')}
                </NavLink>

                <NavLink variant="mobile" href="/noticias" onClick={handleNavClick}>
                  {t('nav.noticias')}
                </NavLink>

                <Button onClick={handleContactClick} className="w-full">
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