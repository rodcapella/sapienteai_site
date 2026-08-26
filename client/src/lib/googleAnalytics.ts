const GA_MEASUREMENT_ID = "G-QE1MDRYVJ6";
const GA_SCRIPT_ID = "sapiente-google-analytics";

type ConsentState = "granted" | "denied";
type GtagCommand = "config" | "consent" | "event" | "js" | "set";

type StoredPreferences = {
  analytics?: boolean;
  marketing?: boolean;
};

let analyticsGranted = false;
let analyticsConfigured = false;
let analyticsLoading = false;
let lastTrackedPage = "";

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || (function gtag() {
    // Google Tag expects the native Arguments object, matching its official
    // bootstrap snippet. A regular nested array is not processed reliably.
    window.dataLayer?.push(arguments);
  } as Window["gtag"]);
}

function gtag(command: GtagCommand, target: string | Date, parameters?: Record<string, unknown>) {
  ensureDataLayer();
  window.gtag?.(command, target, parameters);
}

function removeAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name) => name === "_ga" || name?.startsWith("_ga_"));
  const domains = ["", "; domain=.sapienteai.com", "; domain=www.sapienteai.com"];

  for (const name of cookieNames) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
    }
  }
}

function sendCurrentPageView() {
  if (!analyticsGranted || !analyticsConfigured) return;

  const pageKey = `${window.location.pathname}${window.location.search}`;
  if (pageKey === lastTrackedPage) return;
  lastTrackedPage = pageKey;

  gtag("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

function configureGoogleAnalytics() {
  if (analyticsConfigured) return;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    cookie_domain: "auto",
    cookie_flags: "SameSite=Lax;Secure",
  });
  analyticsConfigured = true;
  analyticsLoading = false;
  sendCurrentPageView();
}

function loadGoogleAnalytics() {
  if (analyticsConfigured || analyticsLoading) return;

  const existing = document.getElementById(GA_SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    analyticsLoading = true;
    if (existing.dataset.loaded === "true") configureGoogleAnalytics();
    else existing.addEventListener("load", configureGoogleAnalytics, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.addEventListener("load", () => {
    script.dataset.loaded = "true";
    configureGoogleAnalytics();
  }, { once: true });
  script.addEventListener("error", () => {
    analyticsLoading = false;
    script.remove();
  }, { once: true });
  analyticsLoading = true;
  document.head.appendChild(script);
}

export function initializeGoogleConsentMode() {
  ensureDataLayer();
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
}

export function applyGoogleConsent(preferences: StoredPreferences) {
  const analytics: ConsentState = preferences.analytics ? "granted" : "denied";
  const marketing: ConsentState = preferences.marketing ? "granted" : "denied";
  analyticsGranted = analytics === "granted";

  gtag("consent", "update", {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  });

  if (analyticsGranted) loadGoogleAnalytics();
  else {
    lastTrackedPage = "";
    removeAnalyticsCookies();
  }
}

export function restoreStoredGoogleConsent() {
  try {
    const stored = localStorage.getItem("cookiePreferences");
    if (!stored) return;
    applyGoogleConsent(JSON.parse(stored) as StoredPreferences);
  } catch {
    applyGoogleConsent({ analytics: false, marketing: false });
  }
}

export function trackGooglePageView() {
  sendCurrentPageView();
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, target: string | Date, parameters?: Record<string, unknown>) => void;
  }
}
