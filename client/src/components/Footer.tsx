/**
 * Footer Component - Premium Black Design with Official Icons
 */

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocation, Link } from "wouter";
import { PremiumButton } from '@/components/ui/button/PremiumButton';
import { NavLink } from '@/components/ui/navigation/NavLink';

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
    { name: 'TikTok', icon: 'https://sl.bing.net/i3gg7xzqIVM', url: '#' },
    { name: 'X', icon: '/media/logos/x.png', url: '#' },
  ];

  return (
<footer className="bg-black text-white border-t border-white/10 relative overflow-hidden">
  {/* DECORATIVE GLOW */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>

  <div className="container mx-auto px-6 py-20 md:py-32">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20 mb-24">

      {/* LOGO + DESCRIÇÃO */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-1">
        <Link href={`/${lang}`} className="inline-block mb-10 group">
          <img
            src="/media/logos/sapiente-ai-footer.png"
            alt="SAPIENTE.AI"
            className="h-12 md:h-16 object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <p className="text-white/50 text-xl leading-relaxed max-w-sm font-medium">
          {t('footer.description')}
        </p>
      </div>

      {/* NAV */}
      <div>
        <h4 className="text-xs font-black mb-10 text-white uppercase tracking-[0.3em]">
          {t('footer.navigation')}
        </h4>

        <ul className="space-y-6">
          <li><NavLink href={`/${lang}`} variant="footer">{t('nav.home')}</NavLink></li>
          <li><NavLink href={`/${lang}/about`} variant="footer">{t('nav.about')}</NavLink></li>
          <li><NavLink href={`/${lang}/team`} variant="footer">{t('nav.team')}</NavLink></li>
          <li><NavLink href={`/${lang}/faq`} variant="footer">{t('nav.faq')}</NavLink></li>
          <li><NavLink href={`/${lang}/contact`} variant="footer">{t('nav.contact') || 'Contact'}</NavLink></li>
        </ul>
      </div>

      {/* LEGAL */}
      <div>
        <h4 className="text-xs font-black mb-10 text-white uppercase tracking-[0.3em]">
          {t('footer.legal')}
        </h4>

        <ul className="space-y-6">
          <li><NavLink href={`/${lang}/terms`} variant="footer">{t('footer.terms')}</NavLink></li>
          <li><NavLink href={`/${lang}/privacy`} variant="footer">{t('footer.privacy')}</NavLink></li>
          <li><NavLink href={`/${lang}/trust`} variant="footer">Trust</NavLink></li>
          <li><NavLink href={`/${lang}/lgpd`} variant="footer">{t('footer.lgpd')}</NavLink></li>
        </ul>
      </div>

      {/* NEWSLETTER */}
      <div>
        <h4 className="text-xs font-black mb-10 text-white uppercase tracking-[0.3em]">
          {t('footer.newsletter')}
        </h4>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-6">

          <input
            type="email"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              px-6 py-5
              bg-white/5
              border border-white/10 
              rounded-2xl
              text-lg
              text-white
              placeholder:text-white/20
              focus:outline-none focus:ring-2 focus:ring-primary/40
              transition-all duration-500
            "
          />

          <PremiumButton
            onClick={() => {}} // Form handles submit
            type="submit"
            className="py-6 rounded-2xl text-lg w-full"
          >
            {subscribeStatus === 'loading'
              ? t('newsletter.subscribing')
              : t('newsletter.subscribe')}
          </PremiumButton>

        </form>
      </div>

    </div>

    {/* SOCIAL + COPYRIGHT */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/10 pt-16">

      <div className="flex gap-10">
        {socialLinks.map((social) => (
          <a 
            key={social.name} 
            href={social.url} 
            className="group transition-all duration-500 hover:-translate-y-2"
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src={social.icon} 
              alt={social.name} 
              className="h-7 w-7 object-contain opacity-40 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
            />
          </a>
        ))}
      </div>

      <p className="text-xs text-white/30 font-black uppercase tracking-[0.4em] text-center md:text-right">
        {t('footer.copyright')}
      </p>

    </div>

  </div>
</footer>
  );
}
