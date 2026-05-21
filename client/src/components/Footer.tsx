import { type SVGProps } from "react";
import { Link, useLocation } from "wouter";

import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { NavLink } from "@/components/ui/navigation/NavLink";
import { useTranslation } from "@/hooks/useTranslation";
import { Icons } from "@/lib/icons";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.901 2H22l-6.77 7.74L23 22h-6.142l-4.81-6.71L6.176 22H3.075l7.245-8.28L1 2h6.297l4.347 6.063L18.901 2Zm-1.077 18h1.715L6.365 3.894H4.526L17.824 20Z" />
    </svg>
  );
}

function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 3 5.78 3 10.74c0 2.31 1.3 5.19 3.38 6.1.32.14.49.08.56-.23.06-.23.34-1.37.47-1.9.04-.17.02-.31-.12-.47-.68-.82-1.23-2.32-1.23-3.72 0-3.47 2.63-6.83 7.11-6.83 3.87 0 6.58 2.64 6.58 6.41 0 4.26-2.15 7.21-4.95 7.21-1.55 0-2.71-1.28-2.34-2.85.45-1.87 1.31-3.89 1.31-5.24 0-1.21-.65-2.22-1.99-2.22-1.58 0-2.85 1.63-2.85 3.82 0 1.39.47 2.34.47 2.34s-1.56 6.61-1.85 7.84c-.32 1.35-.2 3.25-.06 4.49.04.36.51.49.7.18.66-1.08 1.75-2.97 2.1-4.29.13-.5.67-2.56.67-2.56.35.66 1.37 1.22 2.45 1.22 3.22 0 5.55-2.96 5.55-6.64C21 6.17 17.79 2 12.04 2Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const quizHref = lang === "pt" ? `/${lang}/quiz-ia` : `/${lang}/quiz-ai`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { name: "LinkedIn", icon: Icons.Linkedin, url: "https://www.linkedin.com/company/sapiente-ai/" },
    { name: "Instagram", icon: Icons.Instagram, url: "https://www.instagram.com/sapienteai/" },
    { name: "Facebook", icon: Icons.Facebook, url: "https://facebook.com/sapienteai" },
    { name: "TikTok", icon: Icons.Music2, url: "https://www.tiktok.com/@sapienteai" },
    { name: "X", icon: XIcon, url: "https://x.com/SapienteAI" },
    { name: "Pinterest", icon: PinterestIcon, url: "https://www.pinterest.com/sapienteai" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--brand-cyan)]/25 bg-[#050816] text-[var(--brand-offwhite)] tech-grid scanlines">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(10,132,255,0.34),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,209,255,0.22),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />

      <div className="container relative z-10 mx-auto px-6 py-18 md:py-24">
        <div className="mb-20 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href={`/${lang}`} className="group mb-8 inline-block">
              <img src="/media/logos/logo_sapiente_transparente.png" alt="Sapiente.AI" className="h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105 md:h-[120px]" />
            </Link>

            <p className="max-w-sm text-lg leading-relaxed text-white/65">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="mb-8 font-heading text-xs font-black uppercase tracking-[0.3em] text-[var(--brand-cyan)]">{t("footer.navigation")}</h4>
            <ul className="space-y-5">
              <li><NavLink href={`/${lang}`} variant="footer">{t("nav.home")}</NavLink></li>
              <li><NavLink href={`/${lang}/about`} variant="footer">{t("nav.about")}</NavLink></li>
              <li><NavLink href={`/${lang}/team`} variant="footer">{t("nav.team")}</NavLink></li>
              <li><NavLink href={`/${lang}/faq`} variant="footer">{t("nav.faq")}</NavLink></li>
              <li><NavLink href={quizHref} variant="footer">{lang === "pt" ? "Quiz IA" : "AI Quiz"}</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-8 font-heading text-xs font-black uppercase tracking-[0.3em] text-[var(--brand-cyan)]">{t("footer.legal")}</h4>
            <ul className="space-y-5">
              <li><NavLink href={`/${lang}/terms`} variant="footer">{t("footer.terms")|| "Terms of Service"}</NavLink></li>
              <li><NavLink href={`/${lang}/privacy`} variant="footer">{t("footer.privacy")}</NavLink></li>
              <li><NavLink href={`/${lang}/trust`} variant="footer">{t("footer.trust") || "Trust"}</NavLink></li>
              <li><NavLink href={`/${lang}/rgpd`} variant="footer">{t("footer.rgpd")}</NavLink></li>
              <li><NavLink href={`/${lang}/generative-ai-policy`} variant="footer">{t("footer.generative-ai-policy")}</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-8 font-heading text-xs font-black uppercase tracking-[0.3em] text-[var(--brand-cyan)]">
              {t("footer.newsletter")}
            </h4>

            <Link href={`/${lang}/newsletter`} target="_blank" rel="noopener noreferrer" className="block">
              <PremiumButton className="w-full rounded-2xl py-4" variant="secondary">
                {lang === "pt" ? "Abrir Newsletter" : "Open Newsletter"}
              </PremiumButton>
            </Link>
          </div>
        </div>

        <div className="grid items-center gap-8 border-t border-[var(--brand-cyan)]/20 pt-10 md:grid-cols-[348px_1fr_auto]">
          <div className="flex w-[348px] max-w-full flex-col items-center gap-4 justify-self-center md:justify-self-start">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[var(--brand-cyan)]/80">
              {lang === "pt" ? "Siga-nos" : "Follow us"}
            </p>

            <div className="flex w-full items-center justify-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--brand-cyan)]/30 bg-[#08112a]/70 text-[var(--brand-cyan)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-cyan)] hover:bg-[var(--brand-cyan)]/20 hover:text-white hover:shadow-[0_0_38px_rgba(0,209,255,0.45)]"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <Link
            href={`/${lang}/sitemap`}
            className="justify-self-center text-center text-xs font-black uppercase tracking-[0.32em] text-[var(--brand-cyan)]/80 transition hover:text-white"
          >
            {t("footer.sitemap")}
          </Link>

          <p className="text-center text-xs font-black uppercase tracking-[0.32em] text-[var(--brand-cyan)]/65 md:text-right">{t("footer.copyright")}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute bottom-8 right-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/35 bg-[#08112a]/85 text-[var(--brand-cyan)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-cyan)] hover:bg-[var(--brand-cyan)]/15 hover:text-white hover:shadow-[0_0_38px_rgba(0,209,255,0.45)]"
      >
        <Icons.ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
