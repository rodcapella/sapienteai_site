import { Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/jJJEfEeNxsFPFazg.png" 
              alt="SAPIENTE.AI" 
              className="h-16 object-contain mb-4"
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
              <a href="https://www.instagram.com/sapiente.ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-cyan-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/sapiente.ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-cyan-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@sapiente.ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-cyan-400 transition-colors" aria-label="TikTok">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.34 0 .67.05.98.15V9.48a5.64 5.64 0 0 0-.98-.08 5.64 5.64 0 0 0 0 11.28 5.64 5.64 0 0 0 5.64-5.64V8.42a7.43 7.43 0 0 0 4.41 1.39v-3.12z"/></svg>
              </a>
              <a href="https://www.twitter.com/sapiente_ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-cyan-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/sapiente-ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
