/**
 * Cloudflare Turnstile Widget Component
 * Provides CAPTCHA protection for forms
 */

import { useEffect, useRef } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark';
}

export default function TurnstileWidget({ 
  onVerify, 
  onError, 
  onExpire,
  theme = 'light' 
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Load Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.turnstile && containerRef.current) {
        // Render Turnstile widget
        const widgetId = window.turnstile.render(containerRef.current, {
          sitekey: '0x4AAAAAAAKhKxc7Hs7SdKmG', // Public site key for testing
          theme: theme,
          callback: (token: string) => {
            onVerify(token);
          },
          'error-callback': () => {
            onError?.();
          },
          'expired-callback': () => {
            onExpire?.();
          },
        });
        widgetIdRef.current = widgetId;
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
      }
      document.head.removeChild(script);
    };
  }, [onVerify, onError, onExpire, theme]);

  return <div ref={containerRef} className="flex justify-center my-4" />;
}

// Extend window type for Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: any) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}
