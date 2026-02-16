import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import ContactModal from '@/components/ContactModal';

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { t } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      setIsContactOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-gray-700">
        <div className="container">
          <nav className="flex items-center justify-between h-20 px-4">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/JsygqIGdbHNWJuIo.png" 
                alt="SAPIENTE.AI" 
                className="h-16 object-contain"
              />
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/#servicos" className="text-sm font-medium text-white hover:text-cyan-300 transition-colors">{t('nav.servicos')}</a>
              <a href="/#processo" className="text-sm font-medium text-white hover:text-cyan-300 transition-colors">{t('nav.processo')}</a>
              <a href="/#portfolio" className="text-sm font-medium text-white hover:text-cyan-300 transition-colors">{t('nav.portfolio')}</a>
              <a href="/blog" className="text-sm font-medium text-white hover:text-cyan-300 transition-colors">{t('nav.blog')}</a>
              <a href="/#faq" className="text-sm font-medium text-white hover:text-cyan-300 transition-colors">{t('nav.faq')}</a>
              <LanguageSelector />
              <Button 
                onClick={handleContactClick}
                className="bg-primary text-white hover:bg-primary/90 border-2 border-primary font-bold"
              >
                {t('nav.fale')}
              </Button>
            </div>
          </nav>
        </div>
      </header>
      {!onContactClick && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </>
  );
}
