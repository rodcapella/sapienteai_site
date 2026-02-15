import { Linkedin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/file_00000000619871f595024506779e1909.png" 
              alt="SAPIENTE.AI" 
              className="h-12 object-contain mb-4"
            />
            <p className="text-sm text-white/70">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-white/70 hover:text-white transition-colors">{t('footer.home')}</a></li>
              <li><a href="/#servicos" className="text-white/70 hover:text-white transition-colors">{t('footer.servicos')}</a></li>
              <li><a href="/#portfolio" className="text-white/70 hover:text-white transition-colors">{t('footer.portfolio')}</a></li>
              <li><a href="/blog" className="text-white/70 hover:text-white transition-colors">{t('footer.blog')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacidade" className="text-white/70 hover:text-white transition-colors">{t('footer.privacidade')}</a></li>
              <li><a href="/termos" className="text-white/70 hover:text-white transition-colors">{t('footer.termos')}</a></li>
              <li><a href="/lgpd" className="text-white/70 hover:text-white transition-colors">{t('footer.lgpd')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">{t('footer.contact')}</h3>
            <p className="text-sm text-white/70 mb-4">
              {t('footer.email')}
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-white/70">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/company/sapiente-ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
