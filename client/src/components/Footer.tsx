/**
 * Footer Component - Premium Black Design with Neon Logo
 * Black background with modern layout, new logo, and full i18n support
 */

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

interface FooterProps {
  onContactClick?: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { t } = useTranslation();

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

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const event = new CustomEvent('openContactModal');
      window.dispatchEvent(event);
    }
  };

  return (
<footer className="bg-white text-gray-900 border-t border-gray-200">

  <div className="container mx-auto px-4 py-20">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">

      {/* LOGO + DESCRIÇÃO */}
      <div className="col-span-2 md:col-span-1">
        <img
          src="/media/logos/sapiente-ai-footer.png"
          alt="SAPIENTE.AI"
          className="h-14 mb-6"
        />

        <p className="text-gray-600 text-sm leading-relaxed">
          {t('footer.description')}
        </p>
      </div>

      {/* NAV */}
      <div>
        <h4 className="text-sm font-semibold mb-5 text-gray-900">
          {t('footer.navigation')}
        </h4>

        <ul className="space-y-3 text-sm">
          <li><a href="/" className="text-gray-600 hover:text-gray-900 transition">Home</a></li>
          <li><a href="/portfolio" className="text-gray-600 hover:text-gray-900 transition">Portfolio</a></li>
          <li><a href="/faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a></li>
          <li><a href="/noticias" className="text-gray-600 hover:text-gray-900 transition">Blog</a></li>
        </ul>
      </div>

      {/* PRODUTOS */}
      <div>
        <h4 className="text-sm font-semibold mb-5 text-gray-900">
          {t('footer.products')}
        </h4>

        <ul className="space-y-3 text-sm">
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Simulador IR</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Cupaomania</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">ScanMyName</a></li>
        </ul>
      </div>

      {/* NEWSLETTER */}
      <div>
        <h4 className="text-sm font-semibold mb-5 text-gray-900">
          {t('footer.newsletter')}
        </h4>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">

          <input
            type="email"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              px-4 py-2 
              border border-gray-300 
              rounded-lg 
              text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/20
            "
          />

          <Button
            type="submit"
            className="bg-primary text-white rounded-lg"
          >
            {subscribeStatus === 'loading'
              ? t('newsletter.subscribing')
              : t('newsletter.subscribe')}
          </Button>

        </form>
      </div>

    </div>

    {/* SOCIAL + COPYRIGHT */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-6">

      <div className="flex gap-5 text-gray-500">
        <a href="#" className="hover:text-gray-900 transition">Instagram</a>
        <a href="#" className="hover:text-gray-900 transition">TikTok</a>
        <a href="#" className="hover:text-gray-900 transition">X</a>
        <a href="#" className="hover:text-gray-900 transition">LinkedIn</a>
      </div>

      <p className="text-sm text-gray-500">
        {t('footer.copyright')}
      </p>

    </div>

  </div>
</footer>
  );
}
