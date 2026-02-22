import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import ContactModal from '@/components/ContactModal';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { t } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container">
          <nav className="flex items-center justify-between h-16 md:h-20 px-4">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/JsygqIGdbHNWJuIo.png" 
                alt="SAPIENTE.AI" 
                className="h-12 md:h-16 object-contain"
              />
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/#servicos" className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.servicos')}</a>
              <a href="/#processo" className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.processo')}</a>
              <a href="/#portfolio" className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.portfolio')}</a>
              <a href="/blog" className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.blog')}</a>
              <a href="/#faq" className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.faq')}</a>
              <LanguageSelector />
              <Button 
                onClick={handleContactClick}
                className="bg-primary text-white hover:bg-primary/90 border-2 border-primary font-bold"
              >
                {t('nav.fale')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-700" />
              ) : (
                <Menu className="h-6 w-6 text-slate-700" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="flex flex-col gap-4 p-4">
                {/* Breadcrumb with Language Selector */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-200">
                  <span className="text-xs text-slate-500">Idioma / Language</span>
                  <LanguageSelector />
                </div>
                
                <a href="/#servicos" onClick={handleNavClick} className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.servicos')}</a>
                <a href="/#processo" onClick={handleNavClick} className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.processo')}</a>
                <a href="/#portfolio" onClick={handleNavClick} className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.portfolio')}</a>
                <a href="/blog" onClick={handleNavClick} className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.blog')}</a>
                <a href="/#faq" onClick={handleNavClick} className="text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors">{t('nav.faq')}</a>
                <div className="border-t border-gray-200 pt-4">
                </div>
                <Button 
                  onClick={handleContactClick}
                  className="bg-primary text-white hover:bg-primary/90 border-2 border-primary font-bold w-full"
                >
                  {t('nav.fale')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      {!onContactClick && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </>
  );
}
