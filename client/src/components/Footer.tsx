import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocation, Link } from "wouter";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { NavLink } from "@/components/ui/navigation/NavLink";
import { Instagram, Linkedin, Music2, Twitter } from "lucide-react";

interface FooterProps {
  onContactClick?: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const { t } = useTranslation();
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus("loading");

    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }, 1000);
  };

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "TikTok", icon: Music2, url: "#" },
    { name: "X", icon: Twitter, url: "#" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[#00D4FF]/25 bg-[#000000] text-white tech-grid scanlines">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(30,58,138,0.45),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,212,255,0.25),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />

      <div className="container relative z-10 mx-auto px-6 py-18 md:py-24">
        <div className="mb-20 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href={`/${lang}`} className="group mb-8 inline-block">
              <img
                src="/logo-black-bg.png"
                alt="SAPIENTE.AI"
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <p className="max-w-sm text-lg leading-relaxed text-white/65">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-[#22D3EE]">{t("footer.navigation")}</h4>
            <ul className="space-y-5">
              <li>
                <NavLink href={`/${lang}`} variant="footer">
                  {t("nav.home")}
                </NavLink>
              </li>
              <li>
                <NavLink href={`/${lang}/about`} variant="footer">
                  {t("nav.about")}
                </NavLink>
              </li>
              <li>
                <NavLink href={`/${lang}/team`} variant="footer">
                  {t("nav.team")}
                </NavLink>
              </li>
              <li>
                <NavLink href={`/${lang}/faq`} variant="footer">
                  {t("nav.faq")}
                </NavLink>
              </li>
              <li>
                <NavLink href={`/${lang}/contact`} variant="footer">
                  {t("nav.contact") || "Contact"}
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-[#22D3EE]">{t("footer.legal")}</h4>
            <ul className="space-y-5">
              <li>
                <NavLink href={`/${lang}/terms`} variant="footer">
                  {t("footer.terms")}
                </NavLink>
              </li>
              <li>
                <NavLink href={`/${lang}/privacy`} variant="footer">
                  {t("footer.privacy")}
                </NavLink>
              </li>
              <li>
                <NavLink href={`/${lang}/trust`} variant="footer">
                  {t("legal.trust") || "Trust"}
                </NavLink>
              </li>
              <li>
                <NavLink href={`/${lang}/lgpd`} variant="footer">
                  {t("footer.lgpd")}
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-[#22D3EE]">{t("footer.newsletter")}</h4>

            <form onSubmit={handleSubscribe} className="space-y-4 rounded-3xl border border-[#00D4FF]/25 bg-[#040b1f]/65 p-4 backdrop-blur-3xl">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#3B82F6]/35 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/60"
              />

              <PremiumButton type="submit" className="w-full rounded-2xl py-4 text-sm tracking-[0.16em]" variant="secondary">
                {subscribeStatus === "loading" ? t("newsletter.subscribing") : t("newsletter.subscribe")}
              </PremiumButton>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-[#00D4FF]/20 pt-10 md:flex-row">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D4FF]/30 bg-[#08112a]/70 text-[#7DD3FC] transition-all duration-300 hover:-translate-y-1 hover:border-[#00D4FF] hover:bg-[#00D4FF]/20 hover:text-white hover:shadow-[0_0_38px_rgba(0,212,255,0.45)]"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          <p className="text-center text-xs font-black uppercase tracking-[0.32em] text-[#7DD3FC]/65 md:text-right">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
