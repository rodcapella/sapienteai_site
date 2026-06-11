import { useTranslation } from "@/hooks/useTranslation";
import { Cookie } from "@/lib/icons";

const EVENT_NAME = "sapiente:open-cookie-preferences";

export default function CookieFloatingButton() {
  const { lang } = useTranslation();
  const label = lang === "en" ? "Open cookie preferences" : "Abrir preferências de cookies";
  const tooltip = lang === "en" ? "Consent preferences" : "Preferências de consentimento";

  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  };

  return (
    <div className="fixed bottom-4 left-4 z-[70] sm:bottom-5 sm:left-5">
      <button
        type="button"
        aria-label={label}
        aria-describedby="cookie-preferences-tooltip"
        onClick={openCookiePreferences}
        className="group grid h-10 w-10 place-items-center rounded-full border border-[var(--brand-cyan-bright)] bg-[color-mix(in_srgb,var(--brand-cyan-bright)_22%,var(--brand-offwhite))] text-[var(--brand-night)] shadow-[0_14px_34px_color-mix(in_srgb,var(--brand-night) 18%,transparent)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-cyan-bright)] hover:shadow-[0_18px_42px_color-mix(in_srgb,var(--brand-cyan-bright) 28%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cyan-bright)]/70 dark:bg-[var(--brand-night)] dark:text-[var(--brand-offwhite)] sm:h-12 sm:w-12"
      >
        <Cookie className="h-5 w-5 sm:h-6 sm:w-6" />
        <span
          id="cookie-preferences-tooltip"
          role="tooltip"
          className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 max-w-[220px] -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-lg border border-[var(--brand-cyan-bright)]/30 bg-[color-mix(in_srgb,var(--brand-night)_92%,transparent)] px-3 py-1.5 font-[var(--font-body)] text-[11px] font-black tracking-[0.02em] text-[var(--brand-offwhite)] opacity-0 shadow-[0_12px_28px_color-mix(in_srgb,var(--brand-night)_24%,transparent)] backdrop-blur-md transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:text-xs"
        >
          {tooltip}
        </span>
      </button>
    </div>
  );
}
