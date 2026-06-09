import { useTranslation } from "@/hooks/useTranslation";
import { Cookie } from "@/lib/icons";

const EVENT_NAME = "sapiente:open-cookie-preferences";

export default function CookieFloatingButton() {
  const { lang } = useTranslation();
  const label = lang === "en" ? "Open cookie preferences" : "Abrir preferências de cookies";

  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={openCookiePreferences}
      className="fixed bottom-4 left-4 z-[70] grid h-10 w-10 place-items-center rounded-full border border-[#00D1FF] bg-[color-mix(in_srgb,#00D1FF_22%,var(--brand-offwhite))] text-[var(--brand-night)] shadow-[0_14px_34px_rgba(0,21,71,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#00D1FF] hover:shadow-[0_18px_42px_rgba(0,209,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]/70 dark:bg-[var(--brand-night)] dark:text-[var(--brand-offwhite)] sm:bottom-5 sm:left-5 sm:h-12 sm:w-12"
    >
      <Cookie className="h-5 w-5 sm:h-6 sm:w-6" />
    </button>
  );
}
