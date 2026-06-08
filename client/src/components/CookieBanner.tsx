import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

import { Icons } from "@/lib/icons";

type ConsentValue = "accepted" | "rejected" | "custom";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "cookieConsent";
const PREFS_KEY = "cookiePreferences";
const VERSION_KEY = "cookieBannerVersion";
const CURRENT_VERSION = "v1";
const OPEN_PREFERENCES_EVENT = "sapiente:open-cookie-preferences";
const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

const copy = {
  pt: {
    title: "Privacidade e cookies",
    message: "Usamos cookies essenciais e, com a sua autorização, métricas para melhorar a experiência no site.",
    acceptAll: "Aceitar",
    rejectOptional: "Recusar",
    customize: "Preferências",
    savePreferences: "Guardar preferências",
    preferencesTitle: "Preferências de cookies",
    close: "Fechar",
    alwaysOn: "Sempre ativo",
    links: {
      privacy: "Privacidade",
      terms: "Termos",
    },
    preferences: {
      essential: {
        label: "Essenciais",
        description: "Necessários para o funcionamento do site. Não podem ser desativados.",
      },
      analytics: {
        label: "Analytics",
        description: "Ajudam-nos a compreender como os visitantes utilizam o site de forma agregada.",
      },
      marketing: {
        label: "Marketing",
        description: "Podem ser usados para personalização, comunicação e campanhas futuras.",
      },
    },
  },
  en: {
    title: "Privacy and cookies",
    message: "We use essential cookies and, with your permission, analytics to improve the website experience.",
    acceptAll: "Accept",
    rejectOptional: "Reject",
    customize: "Preferences",
    savePreferences: "Save preferences",
    preferencesTitle: "Cookie preferences",
    close: "Close",
    alwaysOn: "Always on",
    links: {
      privacy: "Privacy",
      terms: "Terms",
    },
    preferences: {
      essential: {
        label: "Essential",
        description: "Required for the website to function. They cannot be disabled.",
      },
      analytics: {
        label: "Analytics",
        description: "Help us understand how visitors use the site in aggregate.",
      },
      marketing: {
        label: "Marketing",
        description: "May be used for personalization, communication, and future campaigns.",
      },
    },
  },
} as const;

function getStoredConsent(): ConsentValue | null {
  try {
    const consent = localStorage.getItem(STORAGE_KEY);
    return consent === "accepted" || consent === "rejected" || consent === "custom" ? consent : null;
  } catch {
    return null;
  }
}

function getStoredPreferences(): CookiePreferences | null {
  try {
    const value = localStorage.getItem(PREFS_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value) as Partial<CookiePreferences>;
    if (typeof parsed !== "object" || parsed === null) return null;

    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

function getStoredBannerVersion() {
  try {
    return localStorage.getItem(VERSION_KEY);
  } catch {
    return null;
  }
}

function saveConsent(value: ConsentValue, preferences: CookiePreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
    localStorage.setItem(PREFS_KEY, JSON.stringify(preferences));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  } catch {
    // localStorage may be unavailable in strict privacy contexts.
  }
}

function ToggleSwitch({
  checked,
  disabled = false,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 rounded-full border transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]/60",
        disabled ? "cursor-not-allowed border-[#00D1FF]/40 bg-[#00D1FF]/30" : "cursor-pointer",
        checked
          ? "border-[#00D1FF] bg-[#00D1FF]/60 dark:bg-[#00D1FF]/35"
          : "border-[#00D1FF]/50 bg-transparent",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none absolute top-0.5 h-5 w-5 rounded-full transition duration-300",
          checked ? "left-[calc(100%-1.375rem)] bg-[var(--brand-night)] dark:bg-[#00D1FF]" : "left-0.5 bg-[#94A3B8]",
        ].join(" ")}
      />
    </button>
  );
}

export default function CookieBanner() {
  const [location] = useLocation();
  const lang = location.startsWith("/en") ? "en" : "pt";
  const text = copy[lang];
  const privacyHref = `/${lang}/privacy`;
  const termsHref = `/${lang}/terms`;

  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    let timer: number | undefined;

    const openPreferences = () => {
      const storedPreferences = getStoredPreferences();

      if (storedPreferences) {
        setPreferences(storedPreferences);
      }

      setShowBanner(true);
      setShowPreferences(true);
      setIsVisible(false);

      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setIsVisible(true), 25);
    };

    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const consent = getStoredConsent();
    const storedPreferences = getStoredPreferences();
    const storedVersion = getStoredBannerVersion();

    if (storedPreferences) {
      setPreferences(storedPreferences);
    }

    if (!consent || storedVersion !== CURRENT_VERSION) {
      setShowBanner(true);
      const timer = window.setTimeout(() => setIsVisible(true), 250);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    window.setTimeout(() => setShowBanner(false), 300);
  };

  const handleAcceptAll = () => {
    const acceptedPreferences = { essential: true, analytics: true, marketing: true };
    setPreferences(acceptedPreferences);
    saveConsent("accepted", acceptedPreferences);
    dismiss();
  };

  const handleRejectOptional = () => {
    const rejectedPreferences = { essential: true, analytics: false, marketing: false };
    setPreferences(rejectedPreferences);
    saveConsent("rejected", rejectedPreferences);
    dismiss();
  };

  const handleSaveCustom = () => {
    saveConsent("custom", preferences);
    dismiss();
  };

  const preferenceRows = [
    { key: "essential" as const, locked: true, ...text.preferences.essential },
    { key: "analytics" as const, locked: false, ...text.preferences.analytics },
    { key: "marketing" as const, locked: false, ...text.preferences.marketing },
  ];
  const secondaryButtonClass =
    "min-h-8 rounded-full border border-[#00D1FF] bg-transparent px-3 font-[var(--font-body)] text-[11px] font-black uppercase tracking-[0.12em] text-[var(--brand-night)] transition hover:bg-[rgba(0,209,255,0.12)] dark:text-[var(--brand-offwhite)] dark:hover:bg-[rgba(0,209,255,0.16)] sm:min-h-10 sm:px-4 sm:text-xs lg:min-h-12 lg:px-5";
  const primaryButtonClass =
    "min-h-8 rounded-full border border-[var(--brand-primary)] bg-[var(--brand-primary)] px-3 font-[var(--font-body)] text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:shadow-[0_0_24px_rgba(10,180,255,0.34)] sm:min-h-10 sm:px-4 sm:text-xs lg:min-h-12 lg:px-5";

  if (!showBanner) return null;

  return (
    <>
      {showPreferences && (
        <div
          className="fixed inset-0 z-[78] bg-[var(--brand-night)]/45 backdrop-blur-sm"
          onClick={() => setShowPreferences(false)}
        />
      )}

      <aside
        role="dialog"
        aria-label={lang === "en" ? "Cookie consent" : "Consentimento de cookies"}
        aria-modal={showPreferences}
        className={[
          "fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-5xl rounded-2xl border border-[#00D1FF] bg-[color-mix(in_srgb,#00D1FF_22%,var(--brand-offwhite))] p-4 text-[var(--brand-night)] shadow-[0_24px_70px_rgba(0,21,71,0.16)] backdrop-blur-2xl transition duration-300 dark:bg-[var(--brand-night)] dark:text-[var(--brand-offwhite)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.34)] md:bottom-6 md:p-5",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        ].join(" ")}
      >
        {!showPreferences && (
          <div className="md:flex md:items-center md:gap-5">
            <div className="mb-4 flex min-w-0 flex-1 items-start gap-3 md:mb-0">
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--brand-primary)] text-white">
                <Icons.ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-[var(--font-heading)] text-xl font-black leading-tight text-[var(--brand-night)] dark:text-[var(--brand-offwhite)]">
                  {text.title}
                </h2>
                <p className="mt-1 font-[var(--font-body)] text-sm font-medium leading-relaxed text-slate-700 dark:text-[#94A3B8]">
                  {text.message}{" "}
                  <Link href={privacyHref} className="font-black text-[var(--brand-primary)] underline-offset-2 hover:underline">
                    {text.links.privacy}
                  </Link>
                  {" · "}
                  <Link href={termsHref} className="font-black text-[var(--brand-primary)] underline-offset-2 hover:underline">
                    {text.links.terms}
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className={secondaryButtonClass}
              >
                {text.customize}
              </button>
              <button
                type="button"
                onClick={handleRejectOptional}
                className={secondaryButtonClass}
              >
                {text.rejectOptional}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className={primaryButtonClass}
              >
                {text.acceptAll}
              </button>
            </div>
          </div>
        )}

        {showPreferences && (
          <div>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--brand-primary)] text-white">
                  <Icons.Settings className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-[var(--font-heading)] text-xl font-black leading-tight text-[var(--brand-night)] dark:text-[var(--brand-offwhite)]">
                    {text.preferencesTitle}
                  </h2>
                  <p className="mt-1 font-[var(--font-body)] text-sm font-medium text-slate-700 dark:text-[#94A3B8]">
                    {text.message}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                aria-label={text.close}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#00D1FF] bg-transparent text-[var(--brand-night)] transition hover:bg-[rgba(0,209,255,0.12)] dark:text-[var(--brand-offwhite)] sm:h-10 sm:w-10 lg:h-12 lg:w-12"
              >
                <Icons.X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-5 grid gap-3">
              {preferenceRows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-[#00D1FF]/60 bg-[rgba(255,255,255,0.42)] px-4 py-3 dark:bg-[rgba(255,255,255,0.04)]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-[var(--font-detail)] text-sm font-black uppercase tracking-[0.12em] text-[var(--brand-night)] dark:text-[var(--brand-offwhite)]">
                        {row.label}
                      </span>
                      {row.locked && (
                        <span className="rounded-full border border-[#00D1FF] bg-[#00D1FF]/25 px-2 py-0.5 font-[var(--font-detail)] text-[10px] font-black uppercase tracking-[0.12em] text-[var(--brand-night)] dark:text-[var(--brand-offwhite)]">
                          {text.alwaysOn}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-[var(--font-body)] text-sm leading-relaxed text-slate-700 dark:text-[#94A3B8]">
                      {row.description}
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={preferences[row.key]}
                    disabled={row.locked}
                    onChange={(checked) => setPreferences((current) => ({ ...current, [row.key]: checked }))}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={handleRejectOptional}
                className={secondaryButtonClass}
              >
                {text.rejectOptional}
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className={primaryButtonClass}
              >
                {text.savePreferences}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
