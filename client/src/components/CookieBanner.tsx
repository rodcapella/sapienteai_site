import { useEffect, useState } from "react";
import { Link } from "wouter";

import { useTranslation } from "@/hooks/useTranslation";


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
    message:
      "Usamos cookies essenciais e, com a sua autorização, métricas para melhorar a experiência no site.",
    acceptAll: "Aceitar",
    rejectOptional: "Recusar",
    customize: "Preferências",
    savePreferences: "Guardar preferências",
    preferencesTitle: "Preferências de cookies",
    close: "Fechar",
    alwaysOn: "Sempre ativo",
    links: {
      privacy: "Privacidade",
      cookies: "Cookies",
      terms: "Termos",
    },
    preferences: {
      essential: {
        label: "Essenciais",
        description:
          "Necessários para o funcionamento do site. Não podem ser desativados.",
      },
      analytics: {
        label: "Analytics",
        description:
          "Ajudam-nos a compreender como os visitantes utilizam o site de forma agregada.",
      },
      marketing: {
        label: "Marketing",
        description:
          "Podem ser usados para personalização, comunicação e campanhas futuras.",
      },
    },
  },
  en: {
    title: "Privacy and cookies",
    message:
      "We use essential cookies and, with your permission, analytics to improve the website experience.",
    acceptAll: "Accept",
    rejectOptional: "Reject",
    customize: "Preferences",
    savePreferences: "Save preferences",
    preferencesTitle: "Cookie preferences",
    close: "Close",
    alwaysOn: "Always on",
    links: {
      privacy: "Privacy",
      cookies: "Cookies",
      terms: "Terms",
    },
    preferences: {
      essential: {
        label: "Essential",
        description:
          "Required for the website to function. They cannot be disabled.",
      },
      analytics: {
        label: "Analytics",
        description:
          "Help us understand how visitors use the site in aggregate.",
      },
      marketing: {
        label: "Marketing",
        description:
          "May be used for personalization, communication, and future campaigns.",
      },
    },
  },
} as const;

function getStoredConsent(): ConsentValue | null {
  try {
    const consent = localStorage.getItem(STORAGE_KEY);
    return consent === "accepted" ||
      consent === "rejected" ||
      consent === "custom"
      ? consent
      : null;
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
    // ignore
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
        "relative inline-flex h-6 w-11 shrink-0 rounded-full border transition duration-300",
        disabled
          ? "cursor-not-allowed border-[var(--brand-cyan-bright)]/50 bg-white dark:bg-[var(--brand-night)]"
          : "cursor-pointer",
        checked
          ? "border-[var(--brand-cyan-bright)] bg-white dark:bg-[var(--brand-cyan-bright)]/35"
          : "border-[var(--brand-cyan-bright)]/50 bg-white dark:bg-[var(--brand-night)]",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none absolute top-0.5 h-5 w-5 rounded-full transition duration-300",
          checked
            ? "left-[calc(100%-1.375rem)] bg-[var(--brand-cyan-bright)]"
            : "left-0.5 bg-[var(--brand-night)]/35 dark:bg-[var(--brand-offwhite)]/70",
        ].join(" ")}
      />
    </button>
  );
}

export default function CookieBanner() {
  const { lang } = useTranslation();
  const text = copy[lang];

  const privacyHref = `/${lang}/privacy`;
  const cookiesHref = `/${lang}/cookies`;
  const termsHref = `/${lang}/terms`;

  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const consent = getStoredConsent();
    const storedPreferences = getStoredPreferences();
    const storedVersion = getStoredBannerVersion();

    if (storedPreferences) setPreferences(storedPreferences);

    if (!consent || storedVersion !== CURRENT_VERSION) {
      setShowBanner(true);
      const timer = window.setTimeout(() => setIsVisible(true), 250);
      return () => window.clearTimeout(timer);
    }
  }, []);

  // Reabre o banner quando o botão flutuante de cookies é clicado
  useEffect(() => {
    const handleOpenPreferences = () => {
      const stored = getStoredPreferences();
      if (stored) setPreferences(stored);
      setShowPreferences(true);
      setShowBanner(true);
      requestAnimationFrame(() => setIsVisible(true));
    };

    window.addEventListener(OPEN_PREFERENCES_EVENT, handleOpenPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handleOpenPreferences);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    window.setTimeout(() => setShowBanner(false), 300);
  };

  const handleAcceptAll = () => {
    const accepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(accepted);
    saveConsent("accepted", accepted);
    dismiss();
  };

  const handleRejectOptional = () => {
    const rejected = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(rejected);
    saveConsent("rejected", rejected);
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
    "min-h-7 rounded-full border border-[var(--brand-cyan-bright)] bg-transparent px-2.5 font-[var(--font-body)] text-[10px] font-black uppercase tracking-[0.1em] text-[var(--brand-night)] transition hover:bg-[var(--brand-cyan-bright)]/[0.16] dark:text-[var(--brand-offwhite)] sm:min-h-10 sm:px-4 sm:text-xs sm:tracking-[0.12em] lg:min-h-12 lg:px-5";

  const rejectButtonClass =
    "min-h-7 rounded-full border border-[var(--brand-night)]/20 bg-white px-2.5 font-[var(--font-body)] text-[10px] font-black uppercase tracking-[0.1em] text-[var(--brand-night)] transition hover:border-[var(--brand-primary)] hover:bg-[var(--brand-offwhite)] sm:min-h-10 sm:px-4 sm:text-xs sm:tracking-[0.12em] lg:min-h-12 lg:px-5";

  const primaryButtonClass =
    "min-h-7 rounded-full border border-[var(--brand-primary)] bg-[var(--brand-primary)] px-2.5 font-[var(--font-body)] text-[10px] font-black uppercase tracking-[0.1em] text-white transition hover:shadow-[0_0_24px_color-mix(in_srgb,var(--brand-cyan-mid) 34%,transparent)] sm:min-h-10 sm:px-4 sm:text-xs sm:tracking-[0.12em] lg:min-h-12 lg:px-5";

  if (!showBanner) return null;

  return (
    <>
      <aside
        role="dialog"
        className={[
          "fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-5xl rounded-xl border border-[var(--brand-cyan-bright)] bg-[var(--brand-offwhite)] p-2.5 transition duration-300 ease-out sm:inset-x-4 sm:bottom-4 sm:rounded-2xl sm:p-4",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        ].join(" ")}
      >
        {!showPreferences && (
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4">
            <div className="min-w-0 text-[var(--brand-night)]">
              <h2 className="font-[var(--font-heading)] text-sm font-black leading-tight sm:text-base">
                {text.title}
              </h2>
              <p className="mt-1 font-[var(--font-body)] text-xs font-medium leading-snug text-[var(--brand-night)]/70 sm:text-sm">
                {text.message}
              </p>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)] sm:text-[11px]">
                <Link href={privacyHref}>{text.links.privacy}</Link>
                <Link href={cookiesHref}>{text.links.cookies}</Link>
                <Link href={termsHref}>{text.links.terms}</Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-end sm:gap-3">
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
                className={rejectButtonClass}
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
          <div className="grid gap-3 text-[var(--brand-night)]">
            <div>
              <h2 className="font-[var(--font-heading)] text-sm font-black sm:text-base">
                {text.preferencesTitle}
              </h2>
              <div className="mt-3 grid gap-2">
                {preferenceRows.map((row) => (
                  <div key={row.key} className="flex items-center justify-between gap-3 rounded-xl bg-white/75 px-3 py-2">
                    <div>
                      <p className="text-xs font-black">{row.label}</p>
                      <p className="text-[11px] font-medium leading-snug text-[var(--brand-night)]/65">{row.description}</p>
                    </div>
                    {row.locked ? (
                      <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--brand-primary)]">
                        {text.alwaysOn}
                      </span>
                    ) : (
                      <ToggleSwitch
                        checked={preferences[row.key]}
                        onChange={(checked) => setPreferences((prev) => ({ ...prev, [row.key]: checked }))}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleRejectOptional}
              className={rejectButtonClass}
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
