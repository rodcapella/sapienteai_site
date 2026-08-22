import { preloadTurnstile } from "@/lib/turnstileLoader";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { NavLink } from "@/components/ui/navigation/NavLink";
import { useTranslation } from "@/hooks/useTranslation";
import { getNavLinks } from "@/lib/navConfig";

export default function DesktopHeaderNavigation({
  onContactClick,
}: {
  onContactClick: () => void;
}) {
  const { t, lang } = useTranslation();
  const navLinks = getNavLinks(lang, t);

  return (
    <>
      <div className="hidden min-w-0 items-center justify-center lg:flex">
        <div className="grid w-full max-w-[700px] grid-cols-6 items-center gap-1 xl:max-w-[760px] xl:gap-2">
          {navLinks.map((link) => (
            <div key={link.href} className="flex min-w-0 justify-center text-center">
              <NavLink href={link.href} onMouseEnter={link.preload}>{link.label}</NavLink>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden w-[380px] shrink-0 items-center justify-end gap-4 lg:flex xl:w-[420px]">
        <div className="h-6 w-px shrink-0 bg-[var(--brand-primary)]/24" />
        <div className="shrink-0 scale-100"><LanguageSelector /></div>
        <PremiumButton
          onClick={onContactClick}
          onMouseEnter={preloadTurnstile}
          className="min-w-[148px] whitespace-nowrap !bg-[var(--brand-blue-deep)] px-5 py-2 text-sm hover:!bg-[var(--brand-night)] [&>span]:!text-white"
          variant="primary"
        >
          {lang === "en" ? "Contact" : "Contacto"}
        </PremiumButton>
      </div>
    </>
  );
}
