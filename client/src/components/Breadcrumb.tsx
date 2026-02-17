import { useLocation } from 'wouter';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const [location] = useLocation();
  const { t } = useTranslation();

  const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
    '/': [],
    '/blog': [
      { label: t('nav.blog'), href: '/blog' }
    ],
    '/privacidade': [
      { label: t('footer.privacidade'), href: '/privacidade' }
    ],
    '/termos': [
      { label: t('footer.termos'), href: '/termos' }
    ],
    '/lgpd': [
      { label: t('footer.lgpd'), href: '/lgpd' }
    ],
  };

  const items = breadcrumbMap[location] || [];

  if (items.length === 0) return null;

  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-3 md:py-4">
      <div className="container px-4">
        <div className="flex items-center gap-2 text-sm">
          <a href="/" className="text-slate-600 hover:text-cyan-600 transition-colors">
            {t('footer.home')}
          </a>
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-slate-400" />
              {index === items.length - 1 ? (
                <span className="text-slate-900 font-medium">{item.label}</span>
              ) : (
                <a href={item.href} className="text-slate-600 hover:text-cyan-600 transition-colors">
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
