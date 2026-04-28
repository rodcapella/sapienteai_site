/**
 * Footer Component - Premium Black Design with Official Icons
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

  const socialLinks = [
    { name: 'LinkedIn', icon: '/media/logos/linkedin.png', url: '#' },
    { name: 'Instagram', icon: '/media/logos/instagram.png', url: '#' },
    { name: 'TikTok', icon: '/media/logos/tiktok.png', url: '#' },
    { name: 'X', icon: '/media/logos/x.png', url: '#' },
  ];

  return (
<footer className="bg-black text-white border-t border-white/10">

  <div className="container mx-auto px-6 py-16 md:py-24">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

      {/* LOGO + DESCRIÇÃO */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-1">
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/JsygqIGdbHNWJuIo.png"
          alt="SAPIENTE.AI"
          className="h-12 mb-8 invert"
        />

        <p className="text-white/60 text-lg leading-relaxed max-w-sm">
          {t('footer.description')}
        </p>
      </div>

      {/* NAV */}
      <div>
        <h4 className="text-sm font-black mb-8 text-white uppercase tracking-[0.2em]">
          {t('footer.navigation')}
        </h4>

        <ul className="space-y-4 text-lg">
          <li><Link href={`/${lang}`} className="text-white/60 hover:text-primary transition-colors">Home</Link></li>
          <li><Link href={`/${lang}/about`} className="text-white/60 hover:text-primary transition-colors">{t('nav.about')}</Link></li>
          <li><Link href={`/${lang}/faq`} className="text-white/60 hover:text-primary transition-colors">FAQ</Link></li>
          <li><Link href={`/${lang}/blog`} className="text-white/60 hover:text-primary transition-colors">Blog</Link></li>
        </ul>
      </div>

      {/* LEGAL */}
      <div>
        <h4 className="text-sm font-black mb-8 text-white uppercase tracking-[0.2em]">
          Legal
        </h4>

        <ul className="space-y-4 text-lg">
          <li><Link href={`/${lang}/terms`} className="text-white/60 hover:text-primary transition-colors">Terms</Link></li>
          <li><Link href={`/${lang}/privacy`} className="text-white/60 hover:text-primary transition-colors">Privacy</Link></li>
          <li><Link href={`/${lang}/trust`} className="text-white/60 hover:text-primary transition-colors">Trust</Link></li>
          <li><Link href={`/${lang}/RGPD`} className="text-white/60 hover:text-primary transition-colors">RGPD</Link></li>
        </ul>
      </div>

      {/* NEWSLETTER */}
      <div>
        <h4 className="text-sm font-black mb-8 text-white uppercase tracking-[0.2em]">
          {t('footer.newsletter')}
        </h4>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              px-5 py-4
              bg-white/5
              border border-white/10 
              rounded-xl
              text-lg
              text-white
              placeholder:text-white/30
              focus:outline-none focus:ring-2 focus:ring-primary/40
              transition-all
            "
          />

          <Button
            type="submit"
            className="bg-primary text-primary-foreground py-6 rounded-xl font-bold text-lg hover:opacity-90 transition-all"
          >
            {subscribeStatus === 'loading'
              ? t('newsletter.subscribing')
              : t('newsletter.subscribe')}
          </Button>

        </form>
      </div>

    </div>

    {/* SOCIAL + COPYRIGHT */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-t border-white/10 pt-12">

      <div className="flex gap-8">
        {socialLinks.map((social) => (
          <a 
            key={social.name} 
            href={social.url} 
            className="group transition-transform hover:-translate-y-1"
            aria-label={social.name}
          >
            <img 
              src={social.icon} 
              alt={social.name} 
              className="h-6 w-6 object-contain opacity-50 group-hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>

      <p className="text-sm text-white/40 font-bold uppercase tracking-widest">
        {t('footer.copyright')}
      </p>

    </div>

  </div>
</footer>
  );
}
