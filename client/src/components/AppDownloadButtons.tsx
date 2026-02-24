/**
 * App Download Buttons Component
 * Display official download buttons for PlayStore and AppStore with language support
 * Uses official badge images from Google Play and Apple App Store
 */

import { useLanguage, type Language } from '@/contexts/LanguageContext';

interface AppDownloadButtonsProps {
  appName: string;
  playStoreUrl: string;
  appStoreUrl: string;
  className?: string;
}

export default function AppDownloadButtons({
  appName,
  playStoreUrl,
  appStoreUrl,
  className = ''
}: AppDownloadButtonsProps) {
  const { language } = useLanguage();

  // Map language to badge image language code
  const getBadgeLanguage = (lang: Language): 'pt' | 'en' => {
    switch (lang) {
      case 'pt-PT':
      case 'pt-BR':
        return 'pt';
      case 'en':
      default:
        return 'en';
    }
  };

  const badgeLanguage = getBadgeLanguage(language);

  return (
    <div className={`flex flex-col sm:flex-row gap-6 items-center justify-center ${className}`}>
      {/* Google Play Store Badge */}
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:opacity-80 transition-opacity"
        aria-label={`Download ${appName} on Google Play Store`}
      >
        <img
          src={`/badges/google-play-${badgeLanguage}.png`}
          alt={`Get it on Google Play - ${badgeLanguage === 'pt' ? 'Português' : 'English'}`}
          className="h-auto w-auto max-h-[120px]"
          loading="lazy"
        />
      </a>

      {/* Apple App Store Badge */}
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:opacity-80 transition-opacity"
        aria-label={`Download ${appName} on Apple App Store`}
      >
        <img
          src={`/badges/app-store-${badgeLanguage}.png`}
          alt={`Download on the App Store - ${badgeLanguage === 'pt' ? 'Português' : 'English'}`}
          className="h-auto w-auto max-h-[120px]"
          loading="lazy"
        />
      </a>
    </div>
  );
}
