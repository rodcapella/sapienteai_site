import { useEffect, useRef } from "react";

import { preloadTurnstile } from "@/lib/turnstileLoader";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { NavLink } from "@/components/ui/navigation/NavLink";
import { useTranslation } from "@/hooks/useTranslation";
import { X } from "@/lib/icons";
import { getNavLinks } from "@/lib/navConfig";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export default function MobileNavigation({
  isOpen,
  onClose,
  onContactClick,
}: MobileNavigationProps) {
  const { t, lang } = useTranslation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navLinks = getNavLinks(lang, t);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const overlay = document.getElementById("mobile-nav");
      if (!overlay) return;
      const focusable = Array.from(overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      className={cn(
        "fixed inset-x-0 top-0 z-[60] flex h-dvh flex-col bg-white dark:bg-[var(--brand-near-dark)] lg:hidden",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
      )}
      style={{
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateY(0)",
      }}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--brand-primary)]/15 px-5">
        <img src="/media/logos/Logo_Sapiente_fundo_claro-210.webp" alt="Sapiente.AI" width="210" height="72" className="h-9 w-auto object-contain dark:hidden" />
        <img src="/media/logos/Logo_Sapiente_fundo_escuro-210.webp" alt="Sapiente.AI" width="210" height="72" className="hidden h-9 w-auto object-contain dark:block" />
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button ref={closeButtonRef} type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--brand-primary)]/30 text-[var(--brand-primary)] transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10" aria-label="Fechar menu">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
        {navLinks.map((link, index) => (
          <div key={link.href} className="transition-all duration-300" style={{ transitionDelay: isOpen ? `${index * 40}ms` : "0ms" }}>
            <NavLink variant="mobile" href={link.href} onClick={onClose} onMouseEnter={link.preload}>{link.label}</NavLink>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-[var(--brand-primary)]/15 px-5 pb-8 pt-5">
        <PremiumButton onClick={onContactClick} onMouseEnter={preloadTurnstile} className="w-full" variant="primary">
          {lang === "en" ? "Contact" : "Contacto"}
        </PremiumButton>
        <p className="mt-3 text-center text-[11px] font-medium text-[var(--brand-night)]/40">sapienteai.com</p>
      </div>
    </div>
  );
}
