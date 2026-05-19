/**
 * Cloudflare Turnstile Widget Component
 * Provides CAPTCHA protection for forms.
 */

import { useEffect, useRef, useState } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: "light" | "dark";
}

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SITE_KEY = "0x4AAAAAAAKhKxc7Hs7SdKmG";

function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("turnstile_script_failed")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile_script_failed"));

    document.head.appendChild(script);
  });
}

export default function TurnstileWidget({ onVerify, onError, onExpire, theme = "light" }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({ onVerify, onError, onExpire });
  const [failedToLoad, setFailedToLoad] = useState(false);

  callbacksRef.current = { onVerify, onError, onExpire };

  useEffect(() => {
    let cancelled = false;

    const renderWidget = async () => {
      try {
        setFailedToLoad(false);
        await loadTurnstileScript();

        if (cancelled || !window.turnstile || !containerRef.current || widgetIdRef.current) return;

        const widgetId = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme,
          callback: (token: string) => callbacksRef.current.onVerify(token),
          "error-callback": () => callbacksRef.current.onError?.(),
          "expired-callback": () => callbacksRef.current.onExpire?.(),
        });

        widgetIdRef.current = widgetId;
      } catch {
        if (!cancelled) {
          setFailedToLoad(true);
        }
      }
    };

    renderWidget();

    return () => {
      cancelled = true;

      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [theme]);

  return (
    <div className="my-4 flex justify-center">
      <div ref={containerRef} />
      {failedToLoad && (
        <p className="rounded-xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-center text-xs text-red-100">
          Não foi possível carregar a verificação de segurança. Verifique bloqueadores de scripts ou tente novamente.
        </p>
      )}
    </div>
  );
}

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
