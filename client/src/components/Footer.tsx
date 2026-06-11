import { useState, type SVGProps } from "react";
import { Link } from "wouter";

import NewsletterModal from "@/components/NewsletterModal";
import { preloadTurnstile } from "@/components/TurnstileWidget";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowUp, ChevronDown, Facebook, Instagram, Linkedin, Mail, MapPin, Music2, Phone } from "@/lib/icons";
import { getNavLinks, getLegalLinks } from "@/lib/navConfig";
import { cn } from "@/lib/utils";

const footerTitleClass =
  "font-serif text-[12px] font-bold uppercase tracking-[0.16em] bg-[linear-gradient(90deg,var(--brand-cyan-bright),var(--brand-blue-deep))] bg-clip-text text-transparent";

const footerColumnClass =
  "relative xl:pl-5 xl:before:absolute xl:before:left-0 xl:before:top-0 xl:before:h-full xl:before:w-px xl:before:bg-[linear-gradient(180deg,transparent,var(--brand-darkest)_12%,var(--brand-blue-deep)_50%,var(--brand-darkest)_88%,transparent)]";

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

// ─── Mobile Accordion ─────────────────────────────────────────────────────────

function MobileAccordion({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--brand-primary)]/15">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-center justify-between py-3"
        aria-expanded={open}
      >
        <span className={footerTitleClass}>{title}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-[var(--brand-cyan)] transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const { t, lang } = useTranslation();
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) =>
    setOpenAccordion((prev) => (prev === id ? null : id));

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { name: "LinkedIn",  icon: Linkedin,   url: "https://www.linkedin.com/company/sapiente-ai/" },
    { name: "Instagram", icon: Instagram,  url: "https://www.instagram.com/sapienteai/" },
    { name: "Facebook",  icon: Facebook,   url: "https://facebook.com/sapienteai" },
    { name: "TikTok",    icon: Music2,     url: "https://www.tiktok.com/@sapienteai" },
    { name: "X",         icon: XIcon,            url: "https://x.com/SapienteAI" },
    { name: "Pinterest", icon: PinterestIcon,    url: "https://www.pinterest.com/sapienteai" },
  ];

  const navLinks = getNavLinks(lang, t);
  const legalLinks = getLegalLinks(lang, t);

  const contactItems = [
    { icon: Mail,   text: "contato@sapienteai.com", href: "mailto:contato@sapienteai.com" },
    { icon: Phone,  text: "+351 910 567 575", href: "https://wa.me/351910567575?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Sapiente.AI" },
    { icon: MapPin, text: "Aveiro, Portugal" },
  ];

  const linkListClass = "space-y-2";
  const linkClass =
    "font-serif text-[13px] text-[var(--brand-offwhite)] transition-colors duration-200 hover:text-[var(--brand-cyan)]";

  const socialIcon = (social: (typeof socialLinks)[number]) => {
    const Icon = social.icon;
    return (
      <a
        key={social.name}
        href={social.url}
        className="group inline-flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-[var(--brand-primary)]/35 bg-[var(--brand-deep)]/70 text-[var(--brand-cyan)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-cyan)]/55 hover:bg-[var(--brand-primary)]/70 hover:text-[var(--brand-offwhite)] hover:shadow-[0_12px_24px_color-mix(in_srgb,var(--brand-primary)_24%,transparent)] sm:h-8 sm:w-8"
        aria-label={social.name}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Icon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
      </a>
    );
  };

  const newsletterBlock = (
    <div>
      <p className="mb-2 font-serif text-[13px] leading-relaxed text-[var(--brand-offwhite)]">
        {t("footer.newsletterDescription")}
      </p>
      <PremiumButton
        onClick={() => setIsNewsletterOpen(true)}
        onMouseEnter={preloadTurnstile}
        className="w-full !rounded-2xl !bg-[var(--brand-cyan)] !py-2 !text-xs !text-[var(--brand-night)] hover:!bg-[var(--brand-primary)] hover:!text-[var(--brand-offwhite)] sm:!min-h-[42px] sm:!px-4 sm:!py-0 sm:!text-[11px] sm:!tracking-[0.14em] sm:!whitespace-nowrap [&>span]:!text-[var(--brand-night)] sm:[&>span]:!text-[11px] hover:[&>span]:!text-[var(--brand-offwhite)]"
        variant="secondary"
      >
        {lang === "pt" ? "Assinar Newsletter" : "Subscribe Newsletter"}
      </PremiumButton>
    </div>
  );

  return (
    <footer className="relative overflow-hidden border-t border-[var(--brand-primary)]/30 font-serif text-[var(--brand-offwhite)]">
      <div className="pointer-events-none absolute inset-0">
        <img src="/media/bg/bg_footer.webp" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 pb-10 pt-6 md:px-6 md:pb-0 md:pt-8">

        {/* ── MOBILE LAYOUT (< sm) ─────────────────────────────────────── */}
        <div className="flex flex-col gap-0 sm:hidden">

          {/* Logo + descrição */}
          <div className="mb-4">
            <img
              src="/media/logos/Logo_Sapiente_fundo_escuro.webp"
              alt="Sapiente.AI"
              className="mb-2 h-10 w-auto object-contain"
            />
            <p className="font-serif text-[13px] leading-relaxed text-[var(--brand-offwhite)]">
              {t("footer.description")}
            </p>
          </div>

          {/* Divider */}
          <div className="mb-1 h-px bg-[var(--brand-primary)]/20" />

          {/* Navegação — acordeão */}
          <MobileAccordion
            id="nav"
            title={t("footer.navigation")}
            open={openAccordion === "nav"}
            onToggle={toggleAccordion}
          >
            <ul className={linkListClass}>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          {/* Legal — acordeão */}
          <MobileAccordion
            id="legal"
            title={t("footer.legal")}
            open={openAccordion === "legal"}
            onToggle={toggleAccordion}
          >
            <ul className={linkListClass}>
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          {/* Contacto — acordeão */}
          <MobileAccordion
            id="contact"
            title={t("footer.contact")}
            open={openAccordion === "contact"}
            onToggle={toggleAccordion}
          >
            <ul className="space-y-2">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-center gap-2.5 font-serif text-[13px] text-[var(--brand-offwhite)] transition hover:text-[var(--brand-cyan)]">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--brand-primary)]/30 bg-[var(--brand-deep)]/75 text-[var(--brand-cyan)]">
                      <Icon className="h-3 w-3" />
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
          </MobileAccordion>

          {/* Divider */}
          <div className="my-4 h-px bg-[var(--brand-primary)]/20" />

          {/* Newsletter */}
          <div className="mb-4">
            <p className={cn(footerTitleClass, "mb-3")}>{t("footer.newsletter")}</p>
            {newsletterBlock}
          </div>

          {/* Divider */}
          <div className="mb-4 h-px bg-[var(--brand-primary)]/20" />

          {/* Siga-nos */}
          <div className="mb-4">
            <p className="mb-3 font-serif text-[11px] font-black uppercase tracking-[0.16em] text-[var(--brand-offwhite)]">
              {lang === "pt" ? "Siga-nos" : "Follow us"}
            </p>
            <div className="flex items-center justify-center gap-2.5">
              {socialLinks.map(socialIcon)}
            </div>
          </div>

          {/* Divider */}
          <div className="mb-3 h-px bg-[var(--brand-primary)]/20" />

          {/* Copyright */}
          <p className="text-center font-[var(--font-body)] text-[12px] font-medium tracking-normal text-[white]/70">
            {t("footer.copyright")} •{" "}
            <Link href={`/${lang}/sitemap`} className="font-medium text-[white]/70 transition-colors hover:text-[var(--brand-cyan)]">
              {t("footer.sitemap")}
            </Link>
          </p>
        </div>

        {/* ── DESKTOP LAYOUT (sm+) ─────────────────────────────────────── */}
        <div className="hidden sm:block">
          <div className="mb-3 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr_1.3fr]">

            {/* Logo + Description */}
            <div className="col-span-1 xl:col-span-1">
              <div className="mb-2 inline-block">
                <img src="/media/logos/Logo_Sapiente_fundo_escuro.webp" alt="Sapiente.AI" className="h-12 w-auto object-contain md:h-14" />
              </div>
              <p className="max-w-sm font-serif text-[13px] leading-relaxed text-[var(--brand-offwhite)]">
                {t("footer.description")}
              </p>
            </div>

            {/* Navegação */}
            <div className={footerColumnClass}>
              <p className={footerTitleClass}>{t("footer.navigation")}</p>
              <ul className="mt-2 space-y-1.5">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className={footerColumnClass}>
              <p className={footerTitleClass}>{t("footer.legal")}</p>
              <ul className="mt-2 space-y-1.5">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div className={footerColumnClass}>
              <p className={footerTitleClass}>{t("footer.contact")}</p>
              <ul className="mt-2 space-y-1.5">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <span className="group flex items-center gap-2.5 font-serif text-[13px] leading-relaxed text-[var(--brand-offwhite)] transition hover:text-[var(--brand-cyan)]">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[var(--brand-primary)]/30 bg-[var(--brand-deep)]/75 text-[var(--brand-cyan)]">
                        <Icon className="h-3 w-3" />
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
              <div className="mt-2">
                {newsletterBlock}
              </div>
              <div className="mt-5">
                <p className="mb-2 font-serif text-[11px] font-black uppercase tracking-[0.16em] text-[var(--brand-offwhite)]">
                  {lang === "pt" ? "Siga-nos" : "Follow us"}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {socialLinks.map(socialIcon)}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-center border-t border-[var(--brand-primary)]/15 pt-3 pb-3">
            <p className="text-center font-[var(--font-body)] text-[12px] font-medium tracking-normal text-[white]/70">
              {t("footer.copyright")} |{" "}
              <Link href={`/${lang}/sitemap`} className="font-medium text-[white]/70 transition-colors duration-200 hover:text-[var(--brand-cyan)]">
                {t("footer.sitemap")}
              </Link>{" "}
              |
            </p>
          </div>
        </div>

      </div>

      {/* Botão de volta ao topo */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute bottom-4 right-4 z-20 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--brand-primary)]/35 bg-[var(--brand-deep)]/85 text-[var(--brand-cyan)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-cyan)]/55 hover:bg-[var(--brand-primary)]/70 hover:text-[var(--brand-offwhite)] hover:shadow-[0_12px_24px_color-mix(in_srgb,var(--brand-primary)_24%,transparent)]"
      >
        <ArrowUp className="h-2.5 w-2.5" />
      </button>

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </footer>
  );
}
