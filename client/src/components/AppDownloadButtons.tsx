/**
 * App Download Buttons Component
 * Display official download buttons for PlayStore and AppStore
 */

import { Download } from 'lucide-react';

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
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* Google Play Store Button */}
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors border border-gray-800 hover:border-gray-700"
        aria-label={`Download ${appName} on Google Play Store`}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.609 1.814L13.792 12 3.609 22.186A1.5 1.5 0 0 1 1.5 20.836V3.164a1.5 1.5 0 0 1 2.109-1.35zm16.227 9.386L7.841 2.574 3.609 1.814l11.227 9.186 4.609-3.8zm0 1.2l-4.609 3.8-11.227 9.186 4.232-.76 12.604-12.226z"/>
        </svg>
        <div className="text-left">
          <div className="text-xs text-gray-400">Disponível em</div>
          <div className="text-sm font-semibold">Google Play</div>
        </div>
      </a>

      {/* Apple App Store Button */}
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors border border-gray-800 hover:border-gray-700"
        aria-label={`Download ${appName} on Apple App Store`}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.3-3.14-2.53C4.25 17 2.94 12.46 4.7 9.12c.9-1.56 2.64-2.55 4.48-2.58 1.3-.02 2.54.75 3.38.75.79 0 2.26-1 3.81-.95 1.63.07 3.13.66 3.92 1.73 1.1 1.23.57 3.05.27 4.08-.6 1.44-1.41 2.74-2.63 3.29-.12.05-.25.1-.37.14.1.75.75 2.57 2.37 3.74.12.09.25.17.37.25-.13.03-.27.05-.4.08z"/>
          <path d="M12.45 5.38c.34-.44.56-1.04.5-1.64-.48.02-.96.3-1.3.75-.3.42-.56 1.12-.5 1.82.53-.04 1.06-.34 1.3-.93z"/>
        </svg>
        <div className="text-left">
          <div className="text-xs text-gray-400">Disponível em</div>
          <div className="text-sm font-semibold">App Store</div>
        </div>
      </a>
    </div>
  );
}
