import { useState, type SVGProps } from "react";
import { Link, useLocation } from "wouter";

import NewsletterModal from "@/components/NewsletterModal";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { useTranslation } from "@/hooks/useTranslation";
import { Icons } from "@/lib/icons";

const footerTitleClass = "mb-5 font-serif text-[14px] font-bold uppercase tracking-[0.24em] bg-[linear-gradient(90deg,#00F0FF,#0047AB)] bg-clip-text text-transparent";
const footerColumnClass = "relative xl:pl-5 xl:before:absolute xl:before:left-0 xl:before:top-0 xl:before:h-full xl:before:w-px xl:before:bg-[linear-gradient(180deg,rgba(5,8,22,0),#050816_12%,#004aad_50%,#050816_88%,rgba(5,8,22,0))]";

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
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { name: "LinkedIn", icon: Icons.Linkedin, url: "https://www.linkedin.com/company/sapiente-ai/" },
    { name: "Instagram", icon: Icons.Instagram, url: "https://www.instagram.com/sapienteai/" },
    { name: "Facebook", icon: Icons.Facebook, url: "https://facebook.com/sapienteai" },
    { name: "TikTok", icon: Icons.Music2, url: "https://www.tiktok.com/@sapienteai" },
    { name: "X", icon: XIcon, url: "https://x.com/SapienteAI" },
    { name: "Pinterest", icon: PinterestIcon, url: "https://www.pinterest.com/sapienteai" },
  ];

  const contactItems = [
    { icon: Icons.Mail, text: "contato@sapienteai.com", href: "mailto:contato@sapienteai.com" },
    { icon: Icons.Phone, text: "+351 910 567 575", href: "https://wa.me/351910567575?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Sapiente.AI" },
    { icon: Icons.MapPin, text: "São João da  Madeira, Aveiro, Portugal" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--brand-primary)]/30 font-serif text-[var(--brand-offwhite)]">
      <div className="pointer-events-none absolute inset-0">
        <img src="/media/bg/bg_footer.png" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-3 md:py-4">
        <div className="mb-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {/* Logo + Description */}
          <div className="col-span-1 sm:col-span-2 xl:col-span-1">
            <div className="mb-1 inline-block">
              <img src="/media/logos/Logo_Sapiente_fundo_escuro.png" alt="Sapiente.AI" className="h-20 w-auto object-contain md:h-24" />
            </div>
            <p className="max-w-sm font-serif text-[16px] leading-relaxed text-[var(--brand-offwhite)]">
              {t("footer.description")}
            </p>
          </div>

          {/* Navegação */}
          <div className={footerColumnClass}>
            <p className={footerTitleClass}>{t("footer.navigation")}</p>
            <ul className="mt-3 space-y-2.5">
              {[
                { href: `/${lang}`, label: t("nav.home") },
                { href: `/${lang}/about`, label: t("nav.about") },
                { href: `/${lang}/services`, label: t("nav.services") },
                { href: `/${lang}/faq`, label: t("nav.faq") },
                { href: quizHref, label: lang === "pt" ? "Quiz IA" : "AI Quiz" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-serif text-[14px] text-[var(--brand-offwhite)] transition-colors duration-200 hover:text-[var(--brand-cyan-bright)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className={footerColumnClass}>
            <p className={footerTitleClass}>{t("footer.legal")}</p>
            <ul className="mt-3 space-y-2.5">
              {[
                { href: `/${lang}/terms`, label: t("footer.terms") || "Terms of Service" },
                { href: `/${lang}/privacy`, label: t("footer.privacy") },
                { href: `/${lang}/trust`, label: t("footer.trust") || "Trust" },
                { href: `/${lang}/generative-ai-policy`, label: t("footer.generative-ai-policy") },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-serif text-[14px] text-[var(--brand-offwhite)] transition-colors duration-200 hover:text-[var(--brand-cyan-bright)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className={footerColumnClass}>
            <p className={footerTitleClass}>{t("footer.contact")}</p>
            <ul className="mt-3 space-y-2.5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="group flex items-center gap-2.5 font-serif text-[14px] leading-relaxed text-[var(--brand-offwhite)] transition hover:text-[var(--brand-cyan-bright)]">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--brand-primary)]/30 bg-[var(--brand-deep)]/75 text-[var(--brand-cyan)]">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {item.text}
                  </span>
                );
                return (
                  <li key={item.text}>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("https://wa.me") ? "_blank" : undefined} rel={item.href.startsWith("https://wa.me") ? "noopener noreferrer" : undefined}>
                        {content}
                      </a>
                    ) : content}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter + Siga-nos */}
          <div className={footerColumnClass}>
            <p className={footerTitleClass}>{t("footer.newsletter")}</p>
            <p className="mb-3 mt-3 max-w-[320px] ml-auto font-serif text-[14px] leading-relaxed text-[var(--brand-offwhite)]">
                {t("footer.newsletterDescription")}
            </p>
            <PremiumButton
              onClick={() => setIsNewsletterOpen(true)}
              className="w-full rounded-2xl !bg-[var(--brand-cyan-bright)] !py-1.5 !text-xs !text-[var(--brand-night)] hover:!bg-[var(--brand-primary)] hover:!text-[var(--brand-offwhite)] [&>span]:!text-[var(--brand-night)] hover:[&>span]:!text-[var(--brand-offwhite)]"
              variant="secondary"
            >
              {lang === "pt" ? "Assinar Newsletter" : "Subscribe Newsletter"}
            </PremiumButton>

            {/* Siga-nos — moved here from bottom section */}
            <div className="mt-4">
              <p className="mb-2 font-serif text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-offwhite)]">
                {lang === "pt" ? "Siga-nos" : "Follow us"}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--brand-primary)]/35 bg-[var(--brand-deep)]/70 text-[var(--brand-cyan)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-cyan-bright)]/55 hover:bg-[var(--brand-primary)]/70 hover:text-[var(--brand-offwhite)] hover:shadow-[0_12px_24px_color-mix(in_srgb,var(--brand-primary)_24%,transparent)]"
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar — copyright only */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="h-px w-full bg-[linear-gradient(90deg,#050816,#004aad,#050816)]" />
          <p className="text-center font-serif text-[9px] italic font-black uppercase tracking-[0.24em] text-[#FFFFFF]">
            {t("footer.copyright")} | <Link href={`/${lang}/sitemap`} className="text-[#FFFFFF] transition-colors duration-200 hover:text-[var(--brand-cyan-bright)]">{t("footer.sitemap")}</Link> |
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute bottom-4 right-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--brand-primary)]/35 bg-[var(--brand-deep)]/85 text-[var(--brand-cyan)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-cyan-bright)]/55 hover:bg-[var(--brand-primary)]/70 hover:text-[var(--brand-offwhite)] hover:shadow-[0_12px_24px_color-mix(in_srgb,var(--brand-primary)_24%,transparent)]"
      >
        <Icons.ArrowUp className="h-3.5 w-3.5" />
      </button>

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </footer>
  );
}