import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { setSEOHead } from "@/components/SEOHead";
import { Icons } from "@/lib/icons";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type CookieNavSection = {
  id: string;
  navLabel: { pt: string; en: string };
  icon: keyof typeof Icons;
};

type CookieTableRow = {
  type: string;
  purpose: string;
  required: boolean;
};

type BrowserGuide = {
  name: string;
  steps: string;
};

type SectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  table?: CookieTableRow[];
  browsers?: BrowserGuide[];
  bullets?: string[];
  contact?: { company: string; email: string };
  resetLabel?: string;
};

// ─── Config das secções de navegação ─────────────────────────────────────────

const COOKIE_SECTIONS: CookieNavSection[] = [
  { id: "what",    navLabel: { pt: "O que são",     en: "What are cookies" }, icon: "Info"        },
  { id: "use",     navLabel: { pt: "Que cookies",   en: "Cookies we use"   }, icon: "List"        },
  { id: "manage",  navLabel: { pt: "Como gerir",    en: "How to manage"    }, icon: "Settings"    },
  { id: "consent", navLabel: { pt: "Consentimento", en: "Consent"          }, icon: "ShieldCheck" },
  { id: "third",   navLabel: { pt: "Terceiros",     en: "Third parties"    }, icon: "Share2"      },
  { id: "updates", navLabel: { pt: "Atualizações",  en: "Updates"          }, icon: "RefreshCw"   },
  { id: "contact", navLabel: { pt: "Contacto",      en: "Contact"          }, icon: "Mail"        },
];

// ─── Conteúdo de cada secção ──────────────────────────────────────────────────

const SECTION_CONTENT: Record<string, { pt: SectionContent; en: SectionContent }> = {
  what: {
    pt: {
      eyebrow: "Cookies",
      title: "O que são cookies?",
      description:
        "Os cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um website. Permitem que o site recorde as suas preferências e ações ao longo do tempo, melhorando a sua experiência de navegação e ajudando-nos a compreender como o nosso site é utilizado.",
    },
    en: {
      eyebrow: "Cookies",
      title: "What are cookies?",
      description:
        "Cookies are small text files stored on your device when you visit a website. They allow the site to remember your preferences and actions over time, improving your browsing experience and helping us understand how our site is used.",
    },
  },

  use: {
    pt: {
      eyebrow: "Transparência",
      title: "Que cookies utilizamos?",
      description: "Utilizamos as seguintes categorias de cookies no nosso website:",
      table: [
        { type: "Essenciais", purpose: "Necessários para o funcionamento correto do website (navegação, segurança, gestão de sessão).", required: true },
        { type: "Analytics",  purpose: "Ajudam-nos a compreender como os visitantes interagem com o site através de estatísticas anónimas.", required: false },
        { type: "Marketing",  purpose: "Utilizados para exibir publicidade relevante e campanhas de remarketing.", required: false },
      ],
    },
    en: {
      eyebrow: "Transparency",
      title: "What cookies do we use?",
      description: "We use the following categories of cookies on our website:",
      table: [
        { type: "Essential", purpose: "Required for the website to function correctly (navigation, security, session management).", required: true },
        { type: "Analytics", purpose: "Help us understand how visitors interact with the site through anonymous usage statistics.", required: false },
        { type: "Marketing", purpose: "Used to deliver relevant advertising and remarketing campaigns.", required: false },
      ],
    },
  },

  manage: {
    pt: {
      eyebrow: "Controlo",
      title: "Como gerir cookies",
      description:
        "Pode controlar e eliminar cookies através das definições do seu browser a qualquer momento. Abaixo encontram-se as instruções para os browsers mais comuns:",
      browsers: [
        { name: "Google Chrome",   steps: "Aceda a Definições → Privacidade e segurança → Cookies e outros dados de sites." },
        { name: "Microsoft Edge",  steps: "Aceda a Definições → Permissões de sites e cookies → Gerir e eliminar cookies." },
        { name: "Mozilla Firefox", steps: "Aceda a Definições → Privacidade e Segurança → Cookies e dados de sites → Gerir Dados." },
        { name: "Safari",          steps: "Aceda a Preferências → Privacidade → Gerir Dados de Websites para remover cookies." },
      ],
    },
    en: {
      eyebrow: "Control",
      title: "How to manage cookies",
      description:
        "You can control and delete cookies through your browser settings at any time. Below are instructions for the most common browsers:",
      browsers: [
        { name: "Google Chrome",   steps: "Open Settings → Privacy and Security → Cookies and other site data." },
        { name: "Microsoft Edge",  steps: "Open Settings → Cookies and site permissions → Manage and delete cookies." },
        { name: "Mozilla Firefox", steps: "Open Settings → Privacy & Security → Cookies and Site Data → Manage Data." },
        { name: "Safari",          steps: "Open Preferences → Privacy → Manage Website Data to remove cookies." },
      ],
    },
  },

  consent: {
    pt: {
      eyebrow: "RGPD",
      title: "O seu consentimento",
      description:
        "Na primeira visita ao nosso website, será apresentado um banner a solicitar as suas preferências de cookies. Pode aceitar todos os cookies, rejeitar os opcionais ou personalizar as suas escolhas.",
      bullets: [
        "Aceitar todos os cookies (inclui analytics e marketing).",
        "Rejeitar opcionais — apenas os cookies essenciais ficam ativos.",
        "Personalizar — escolha categoria a categoria o que permite.",
        "Alterar as suas preferências a qualquer momento através do rodapé.",
      ],
      resetLabel: "Rever preferências de cookies",
    },
    en: {
      eyebrow: "GDPR",
      title: "Your consent",
      description:
        "When you first visit our website, a banner will ask for your cookie preferences. You may accept all cookies, reject optional ones, or customise your choices.",
      bullets: [
        "Accept all cookies (includes analytics and marketing).",
        "Reject optional — only essential cookies remain active.",
        "Customise — choose category by category what you allow.",
        "Change your preferences at any time via the footer link.",
      ],
      resetLabel: "Review cookie preferences",
    },
  },

  third: {
    pt: {
      eyebrow: "Parceiros",
      title: "Cookies de terceiros",
      description:
        "Alguns cookies podem ser definidos por serviços de terceiros que utilizamos, como plataformas de analytics ou publicidade. Todos os parceiros com quem trabalhamos cumprem o RGPD e os seus dados permanecem dentro da União Europeia.",
      bullets: [
        "Plataformas de analytics (ex.: Google Analytics).",
        "Ferramentas de email marketing e automação.",
        "Plataformas de publicidade e remarketing.",
        "Todos os fornecedores são certificados RGPD.",
      ],
    },
    en: {
      eyebrow: "Partners",
      title: "Third-party cookies",
      description:
        "Some cookies may be set by third-party services we use, such as analytics or advertising platforms. All partners we work with are GDPR compliant and your data remains within the European Union.",
      bullets: [
        "Analytics platforms (e.g. Google Analytics).",
        "Email marketing and automation tools.",
        "Advertising and remarketing platforms.",
        "All providers are GDPR certified.",
      ],
    },
  },

  updates: {
    pt: {
      eyebrow: "Revisões",
      title: "Atualizações desta política",
      description:
        "Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nas nossas práticas ou por motivos legais. A data no topo desta página indica a revisão mais recente.",
      bullets: [
        "Alterações relevantes serão comunicadas por email (se subscreveu a newsletter).",
        "A data de última atualização é sempre visível no topo da página.",
        "O histórico de versões está disponível mediante pedido.",
      ],
    },
    en: {
      eyebrow: "Revisions",
      title: "Updates to this policy",
      description:
        "We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. The date at the top of this page indicates the most recent revision.",
      bullets: [
        "Significant changes will be communicated by email (if you subscribed to the newsletter).",
        "The last updated date is always visible at the top of the page.",
        "Version history is available upon request.",
      ],
    },
  },

  contact: {
    pt: {
      eyebrow: "Suporte",
      title: "Contacto",
      description:
        "Se tiver alguma questão sobre a nossa utilização de cookies ou esta política, contacte-nos. Responderemos o mais brevemente possível.",
      contact: { company: "Sapiente.AI", email: "contato@sapienteai.com" },
      bullets: [
        "Envie um email com o assunto 'Cookies'.",
        "Resposta garantida em até 5 dias úteis.",
        "Pode também exercer os seus direitos RGPD pelo mesmo canal.",
      ],
    },
    en: {
      eyebrow: "Support",
      title: "Contact",
      description:
        "If you have any questions about our use of cookies or this policy, please get in touch. We will respond as soon as possible.",
      contact: { company: "Sapiente.AI", email: "contato@sapienteai.com" },
      bullets: [
        "Send an email with the subject 'Cookies'.",
        "Response guaranteed within 5 business days.",
        "You can also exercise your GDPR rights through the same channel.",
      ],
    },
  },
};

// ─── Hero + CTA content ───────────────────────────────────────────────────────

const HERO_CONTENT = {
  pt: {
    label: "Política de Cookies",
    title: "Transparência total sobre",
    highlight: "como usamos cookies.",
    subtitle: "Informação clara e objetiva sobre os cookies utilizados neste website, como os gerir e os seus direitos ao abrigo do RGPD.",
  },
  en: {
    label: "Cookie Policy",
    title: "Full transparency about",
    highlight: "how we use cookies.",
    subtitle: "Clear and objective information about the cookies used on this website, how to manage them, and your rights under the GDPR.",
  },
};

const CTA_CONTENT = {
  pt: {
    title: "Tem dúvidas sobre",
    highlight: "privacidade ou cookies?",
    description: "A nossa equipa está disponível para esclarecer qualquer questão sobre o tratamento dos seus dados ou preferências de cookies.",
    button: "Falar com a equipa",
  },
  en: {
    title: "Questions about",
    highlight: "privacy or cookies?",
    description: "Our team is available to clarify any questions about your data handling or cookie preferences.",
    button: "Talk to the team",
  },
};

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────

function CookiesSidebar({
  active,
  onSelect,
  lang,
}: {
  active: string;
  onSelect: (id: string) => void;
  lang: string;
}) {
  return (
    <nav className="sticky top-24 flex flex-col gap-1 self-start">
      {COOKIE_SECTIONS.map((s) => {
        const Icon = Icons[s.icon] as React.ElementType;
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={[
              "group flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-black transition-all duration-200",
              isActive
                ? "bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)] shadow-[inset_0_0_0_1px_rgba(85,212,242,0.25)]"
                : "text-[var(--brand-offwhite)]/50 hover:bg-[var(--brand-night)]/60 hover:text-[var(--brand-offwhite)]",
            ].join(" ")}
          >
            {Icon && (
              <Icon
                className={[
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive
                    ? "text-[var(--brand-cyan)]"
                    : "text-[var(--brand-offwhite)]/30 group-hover:text-[var(--brand-offwhite)]/60",
                ].join(" ")}
              />
            )}
            <span className="tracking-tight">{s.navLabel[lang as "pt" | "en"]}</span>
            {isActive && (
              <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

// ─── Reset consent button ─────────────────────────────────────────────────────

function ResetConsentButton({ label }: { label: string }) {
  function handleReset() {
    try {
      localStorage.removeItem("cookieConsent");
      localStorage.removeItem("cookiePreferences");
      window.location.reload();
    } catch {
      // silently fail
    }
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--brand-cyan)]/30 bg-[var(--brand-cyan)]/8 px-5 py-2.5 text-[13px] font-black uppercase tracking-wider text-[var(--brand-cyan)] transition-all duration-200 hover:bg-[var(--brand-cyan)]/15 hover:shadow-[0_0_16px_color-mix(in_srgb,var(--brand-cyan-bright)_20%,transparent)]"
    >
      <Icons.RefreshCw className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

// ─── Section detail ───────────────────────────────────────────────────────────

function CookieDetail({ id, lang }: { id: string; lang: string }) {
  const data = SECTION_CONTENT[id]?.[lang as "pt" | "en"] ?? SECTION_CONTENT[id]?.pt;
  if (!data) return null;

  return (
    <div className="animate-fadeIn">
      <Reveal>
        <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[var(--brand-cyan)]">
          {data.eyebrow}
        </p>
        <h2 className="mb-6 text-3xl font-black leading-tight text-[var(--brand-offwhite)] md:text-5xl">
          {data.title}
        </h2>
        <p className="mb-10 max-w-2xl text-base font-medium leading-relaxed text-[var(--brand-offwhite)]/60 md:text-lg">
          {data.description}
        </p>
      </Reveal>

      {/* Cookie table */}
      {data.table && (
        <Reveal delay={80}>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--brand-purple)]/20">
            <div className="grid grid-cols-[1fr_2fr_auto] gap-4 bg-[var(--brand-night)]/70 px-5 py-3">
              {[
                lang === "en" ? "Type" : "Tipo",
                lang === "en" ? "Purpose" : "Finalidade",
                lang === "en" ? "Required" : "Obrigatório",
              ].map((h) => (
                <span key={h} className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-cyan)]">
                  {h}
                </span>
              ))}
            </div>
            {data.table.map((row, i) => (
              <div
                key={row.type}
                className={[
                  "grid grid-cols-[1fr_2fr_auto] items-start gap-4 px-5 py-4",
                  i % 2 === 0 ? "bg-[var(--brand-night)]/50" : "bg-[var(--brand-primary)]/10",
                ].join(" ")}
              >
                <span className="text-sm font-bold text-[var(--brand-offwhite)]">{row.type}</span>
                <span className="text-sm font-medium leading-relaxed text-[var(--brand-offwhite)]/65">{row.purpose}</span>
                <span className="flex items-center justify-center">
                  {row.required ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--brand-cyan)]/30 bg-[var(--brand-cyan)]/10 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-[var(--brand-cyan)]">
                      <Icons.Check className="h-3 w-3" />
                      {lang === "en" ? "Yes" : "Sim"}
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full border border-[var(--brand-offwhite)]/15 bg-[var(--brand-offwhite)]/5 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-[var(--brand-offwhite)]/35">
                      {lang === "en" ? "No" : "Não"}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* Browser guides */}
      {data.browsers && (
        <Reveal delay={80}>
          <div className="mb-10 grid gap-3 sm:grid-cols-2">
            {data.browsers.map((browser) => (
              <div
                key={browser.name}
                className="flex items-start gap-3 rounded-xl border border-[var(--brand-purple)]/20 bg-[var(--brand-night)]/50 px-5 py-4 shadow-[0_8px_24px_rgba(1,32,80,0.12)]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-cyan)]/15 text-[var(--brand-cyan)]">
                  <Icons.Globe className="h-3 w-3" />
                </span>
                <div>
                  <p className="mb-1 text-sm font-bold text-[var(--brand-offwhite)]">{browser.name}</p>
                  <p className="text-sm font-medium leading-relaxed text-[var(--brand-offwhite)]/60">{browser.steps}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* Bullets */}
      {data.bullets && (
        <Reveal delay={100}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-[var(--brand-purple)]/20 bg-[var(--brand-night)]/50 px-5 py-4 text-sm font-semibold text-[var(--brand-offwhite)]/75 shadow-[0_8px_24px_rgba(1,32,80,0.12)]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-cyan)]/15 text-[var(--brand-cyan)]">
                  <Icons.Check className="h-3 w-3" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {/* Contact block */}
      {data.contact && (
        <Reveal delay={80}>
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[var(--brand-purple)]/20 bg-[var(--brand-night)]/50 px-6 py-5 shadow-[0_8px_24px_rgba(1,32,80,0.12)]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--brand-primary)]/35 bg-[var(--brand-primary)]/20 text-[var(--brand-cyan)]">
              <Icons.Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-black text-[var(--brand-offwhite)]">{data.contact.company}</p>
              <a
                href={`mailto:${data.contact.email}`}
                className="text-sm font-medium text-[var(--brand-cyan)] underline-offset-2 hover:underline"
              >
                {data.contact.email}
              </a>
            </div>
          </div>
        </Reveal>
      )}

      {/* Reset consent — only on consent section */}
      {data.resetLabel && (
        <Reveal delay={120}>
          <ResetConsentButton label={data.resetLabel} />
        </Reveal>
      )}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function CookiesPage(_props: { lang?: string }) {
  const [location] = useLocation();
  const lang = location.split("/")[1] === "en" ? "en" : "pt";
  const hero = HERO_CONTENT[lang as "pt" | "en"];
  const cta  = CTA_CONTENT[lang as "pt" | "en"];

  const [activeSection, setActiveSection] = useState(COOKIE_SECTIONS[0].id);

  useEffect(() => {
    setSEOHead({
      title: `${hero.label} — Sapiente.AI`,
      description: hero.subtitle,
      url: `https://sapienteai.com/${lang}/cookies`,
      type: "website",
    });
  }, [hero, lang]);

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <InternalHero
        label={hero.label}
        title={hero.title}
        highlight={hero.highlight}
        subtitle={hero.subtitle}
        image="/media/bg/bg_legal.png"
        imageAlt="Sapiente.AI Cookie Policy"
        compact
      />

      {/* ── Docs Layout ── */}
      <Section className="bg-blue-tint py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16 xl:grid-cols-[260px_1fr]">

              {/* Sidebar — desktop */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="mb-3 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-offwhite)]/25">
                    {lang === "en" ? "Sections" : "Secções"}
                  </p>
                  <CookiesSidebar active={activeSection} onSelect={setActiveSection} lang={lang} />
                </div>
              </aside>

              {/* Nav mobile — horizontal scroll */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
                {COOKIE_SECTIONS.map((s) => {
                  const Icon = Icons[s.icon] as React.ElementType;
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSection(s.id)}
                      className={[
                        "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-black transition-all",
                        isActive
                          ? "bg-[var(--brand-cyan)]/15 text-[var(--brand-cyan)] shadow-[inset_0_0_0_1px_rgba(85,212,242,0.3)]"
                          : "border border-[var(--brand-purple)]/20 text-[var(--brand-offwhite)]/50",
                      ].join(" ")}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                      {s.navLabel[lang as "pt" | "en"]}
                    </button>
                  );
                })}
              </div>

              {/* Conteúdo variável */}
              <main className="min-h-[520px]">
                <div className="relative lg:pl-10 lg:before:absolute lg:before:left-0 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-gradient-to-b lg:before:from-[var(--brand-cyan)]/20 lg:before:via-[var(--brand-purple)]/15 lg:before:to-transparent">
                  <CookieDetail key={activeSection} id={activeSection} lang={lang} />
                </div>
              </main>

            </div>
          </div>
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <FinalCTA
        title={cta.title}
        title_highlight={cta.highlight}
        description={cta.description}
        button={cta.button}
        align="left"
      />

    </div>
  );
}