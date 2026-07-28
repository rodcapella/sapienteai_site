/**
 * Cloudflare Turnstile Widget Component
 * Provides CAPTCHA protection for forms.
 */

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "@/hooks/useTranslation";
import {
  loadTurnstileScript,
  TURNSTILE_LOAD_RETRIES,
  TURNSTILE_RETRY_DELAY_MS,
  waitForTurnstileRetry,
} from "@/lib/turnstileLoader";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  showLoadError?: boolean;
  theme?: "light" | "dark";
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

export default function TurnstileWidget({ onVerify, onError, onExpire, showLoadError = true, theme = "light" }: TurnstileWidgetProps) {
  const { lang: rawLang } = useTranslation();
  const lang = rawLang === "en" ? "en" : "pt";
  const messages = lang === "pt"
    ? {
        notConfigured: "A verificação de segurança não está configurada neste ambiente.",
        domainError: "Não foi possível carregar a verificação de segurança. Se este for um ambiente de testes, confirme se o domínio está autorizado no Cloudflare Turnstile.",
        loadError: "Não foi possível carregar a verificação de segurança. Verifique os bloqueadores de scripts ou tente novamente.",
        loading: "A carregar a verificação de segurança...",
      }
    : {
        notConfigured: "Security verification is not configured for this environment.",
        domainError: "Security verification could not be loaded. If this is a test environment, confirm that the domain is allowed in Cloudflare Turnstile.",
        loadError: "Security verification could not be loaded. Check script blockers or try again.",
        loading: "Loading security verification...",
      };
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
        setErrorMessage(messages.notConfigured);
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
            appearance: "interaction-only",
            execution: "render",
            action: "contact_form",
            language: lang === "pt" ? "pt-PT" : "en",
            callback: (token: string) => callbacksRef.current.onVerify(token),
            "error-callback": () => {
              setFailedToLoad(true);
              setIsLoading(false);
              setErrorMessage(messages.domainError);
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
            await waitForTurnstileRetry(TURNSTILE_RETRY_DELAY_MS);
            continue;
          }

          setFailedToLoad(true);
          setIsLoading(false);
          setErrorMessage(messages.loadError);
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
  }, [lang, theme]);

  return (
    <div className="my-2 flex flex-col items-center justify-center gap-2">
      <div ref={containerRef} className={failedToLoad ? "hidden" : ""} />
      {isLoading && !failedToLoad && (
        <p className="text-center text-xs font-medium text-[var(--brand-offwhite)]/[0.68]">
          {messages.loading}
        </p>
      )}
      {failedToLoad && showLoadError && (
        <p className="rounded-xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-center text-xs text-red-100">
          {errorMessage || messages.loadError}
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
