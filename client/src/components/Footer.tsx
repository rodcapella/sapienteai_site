/**
 * Footer Component - Premium Black Design with Neon Logo
 * Black background with modern layout, new logo, and full i18n support
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocation, Link } from "wouter";

interface FooterProps {
  onContactClick?: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { t } = useTranslation();
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }, 1000);
  };

  return (
<footer className="bg-black text-white border-t border-white/10">

  <div className="container mx-auto px-6 py-20">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">

      {/* LOGO + DESCRIÇÃO */}
      <div className="col-span-2 md:col-span-1">
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/JsygqIGdbHNWJuIo.png"
          alt="SAPIENTE.AI"
          className="h-12 mb-6 invert"
        />

        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
          {t('footer.description')}
        </p>
      </div>

      {/* NAV */}
      <div>
        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">
          {t('footer.navigation')}
        </h4>

        <ul className="space-y-4 text-sm">
          <li><Link href={`/${lang}`} className="text-white/60 hover:text-primary transition-colors">Home</Link></li>
          <li><Link href={`/${lang}/about`} className="text-white/60 hover:text-primary transition-colors">{t('nav.about')}</Link></li>
          <li><Link href={`/${lang}/faq`} className="text-white/60 hover:text-primary transition-colors">FAQ</Link></li>
          <li><Link href={`/${lang}/blog`} className="text-white/60 hover:text-primary transition-colors">Blog</Link></li>
        </ul>
      </div>

      {/* LEGAL */}
      <div>
        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">
          Legal
        </h4>

        <ul className="space-y-4 text-sm">
          <li><Link href={`/${lang}/terms`} className="text-white/60 hover:text-primary transition-colors">Terms</Link></li>
          <li><Link href={`/${lang}/privacy`} className="text-white/60 hover:text-primary transition-colors">Privacy</Link></li>
          <li><Link href={`/${lang}/trust`} className="text-white/60 hover:text-primary transition-colors">Trust</Link></li>
          <li><Link href={`/${lang}/lgpd`} className="text-white/60 hover:text-primary transition-colors">LGPD</Link></li>
        </ul>
      </div>

      {/* NEWSLETTER */}
      <div>
        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">
          {t('footer.newsletter')}
        </h4>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">

          <input
            type="email"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              px-4 py-3 
              bg-white/5
              border border-white/10 
              rounded-lg 
              text-sm
              text-white
              placeholder:text-white/30
              focus:outline-none focus:ring-2 focus:ring-primary/40
              transition-all
            "
          />

          <Button
            type="submit"
            className="bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            {subscribeStatus === 'loading'
              ? t('newsletter.subscribing')
              : t('newsletter.subscribe')}
          </Button>

        </form>
      </div>

    </div>

    {/* SOCIAL + COPYRIGHT */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">

      <div className="flex gap-6 text-white/40 text-sm">
        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
        <a href="#" className="hover:text-primary transition-colors">TikTok</a>
        <a href="#" className="hover:text-primary transition-colors">X</a>
        <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
      </div>

      <p className="text-sm text-white/40 font-medium">
        {t('footer.copyright')}
      </p>

    </div>

  </div>
</footer>
  );
}
