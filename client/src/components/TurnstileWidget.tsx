/**
 * Cloudflare Turnstile Widget Component
 * Provides CAPTCHA protection for forms.
 */

import { useEffect, useRef, useState } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  showLoadError?: boolean;
  theme?: "light" | "dark";
}

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const TURNSTILE_LOAD_RETRIES = 2;
const TURNSTILE_RETRY_DELAY_MS = 900;
const TURNSTILE_SCRIPT_TIMEOUT_MS = 5000;

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.failed === "true") {
        existingScript.remove();
      } else if (existingScript.dataset.loaded === "true") {
        existingScript.remove();
      } else {
        const timeoutId = window.setTimeout(() => reject(new Error("turnstile_script_timeout")), TURNSTILE_SCRIPT_TIMEOUT_MS);

        existingScript.addEventListener("load", () => {
          window.clearTimeout(timeoutId);
          resolve();
        }, { once: true });
        existingScript.addEventListener("error", () => {
          window.clearTimeout(timeoutId);
          existingScript.dataset.failed = "true";
          reject(new Error("turnstile_script_failed"));
        }, { once: true });
        return;
      }
    }

    const script = document.createElement("script");
    const timeoutId = window.setTimeout(() => {
      script.dataset.failed = "true";
      script.remove();
      reject(new Error("turnstile_script_timeout"));
    }, TURNSTILE_SCRIPT_TIMEOUT_MS);

    script.id = TURNSTILE_SCRIPT_ID;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.clearTimeout(timeoutId);
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => {
      window.clearTimeout(timeoutId);
      script.dataset.failed = "true";
      script.remove();
      reject(new Error("turnstile_script_failed"));
    };

    document.head.appendChild(script);
  });
}

/**
 * Call this on hover of any button that opens a modal containing TurnstileWidget.
 * The Cloudflare script is fetched once and cached — subsequent renders are instant.
 */
export function preloadTurnstile(): void {
  loadTurnstileScript().catch(() => { /* ignore preload errors silently */ });
}

export default function TurnstileWidget({ onVerify, onError, onExpire, showLoadError = true, theme = "light" }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({ onVerify, onError, onExpire });
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  callbacksRef.current = { onVerify, onError, onExpire };

  useEffect(() => {
    let cancelled = false;

    const renderWidget = async () => {
      setFailedToLoad(false);
      setIsLoading(true);
      setErrorMessage("");

      if (!TURNSTILE_SITE_KEY) {
        setFailedToLoad(true);
        setIsLoading(false);
        setErrorMessage("A verificação de segurança não está configurada para este ambiente.");
        callbacksRef.current.onError?.();
        return;
      }

      for (let attempt = 0; attempt <= TURNSTILE_LOAD_RETRIES; attempt += 1) {
        try {
          await loadTurnstileScript();

          if (cancelled || !window.turnstile || !containerRef.current || widgetIdRef.current) return;

          const widgetId = window.turnstile.render(containerRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            theme,
            appearance: "always",
            execution: "render",
            callback: (token: string) => callbacksRef.current.onVerify(token),
            "error-callback": () => {
              setFailedToLoad(true);
              setIsLoading(false);
              setErrorMessage(
                "Não foi possível carregar a verificação de segurança. Se estiver em ambiente de teste, confirme se o domínio está autorizado no Cloudflare Turnstile.",
              );
              callbacksRef.current.onError?.();
            },
            "expired-callback": () => callbacksRef.current.onExpire?.(),
          });

          widgetIdRef.current = widgetId;
          setIsLoading(false);
          return;
        } catch {
          if (cancelled) return;
          if (attempt < TURNSTILE_LOAD_RETRIES) {
            await wait(TURNSTILE_RETRY_DELAY_MS);
            continue;
          }

          setFailedToLoad(true);
          setIsLoading(false);
          setErrorMessage("Não foi possível carregar a verificação de segurança. Verifique bloqueadores de scripts ou tente novamente.");
          callbacksRef.current.onError?.();
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
    <div className="my-4 flex min-h-[74px] flex-col items-center justify-center gap-2 rounded-xl border border-[rgba(0,209,255,0.26)] bg-[rgba(5,8,27,0.36)] px-3 py-3">
      <div ref={containerRef} className={failedToLoad ? "hidden" : ""} />
      {isLoading && !failedToLoad && (
        <p className="text-center text-xs font-medium text-[rgba(234,246,255,0.68)]">
          A carregar verificação de segurança...
        </p>
      )}
      {failedToLoad && showLoadError && (
        <p className="rounded-xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-center text-xs text-red-100">
          {errorMessage || "Não foi possível carregar a verificação de segurança. Verifique bloqueadores de scripts ou tente novamente."}
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
