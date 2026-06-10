import { useState } from "react";
import type { ElementType } from "react";
import { Link } from "wouter";

import NewsletterModal from "@/components/NewsletterModal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowRight, Home, Mail, ShieldCheck, Sparkles } from "@/lib/icons";
import "@/styles/faq_legal.css";

type SitemapLink = {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
};

type SitemapGroup = {
  label: string;
  title: string;
  icon: ElementType;
  links: SitemapLink[];
};

const copy = {
  pt: {
    label: "Mapa do Site",
    title: "Todas as páginas",
    highlight: "num só lugar.",
    subtitle: "Navegue facilmente por todas as secções do site da Sapiente.AI.",
    sections: {
      main: "Páginas principais",
      mainTitle: "Navegação principal",
      resources: "Recursos e ferramentas",
      resourcesTitle: "Conteúdos úteis",
      legal: "Informação legal",
      legalTitle: "Transparência e confiança",
    },
    links: {
      home: ["Início", "Visão geral das soluções, serviços e proposta de valor."],
      about: ["Sobre Nós", "A nossa visão, método de trabalho e forma de aplicar IA."],
      services: ["Serviços", "Soluções digitais, automação, marketing e IA aplicada ao crescimento."],
      faq: ["FAQ", "Respostas às perguntas mais frequentes sobre os nossos serviços."],
      quiz: ["Quiz IA", "Diagnóstico inicial para identificar oportunidades de automação."],
      newsletter: ["Newsletter", "Conteúdo prático sobre IA, automação e crescimento."],
      terms: ["Termos de Serviço", "Condições de utilização do site e dos nossos serviços."],
      privacy: ["Política de Privacidade", "Como recolhemos, tratamos e protegemos dados pessoais."],
      trust: ["Confiança & Segurança", "Princípios de segurança, ética e responsabilidade."],
      policy: ["Política de IA Generativa", "Como enquadramos o uso responsável de IA generativa."],
    },
  },
  en: {
    label: "Sitemap",
    title: "All pages",
    highlight: "in one place.",
    subtitle: "Easily navigate all sections of the Sapiente.AI website.",
    sections: {
      main: "Main pages",
      mainTitle: "Main navigation",
      resources: "Resources and tools",
      resourcesTitle: "Useful content",
      legal: "Legal information",
      legalTitle: "Transparency and trust",
    },
    links: {
      home: ["Home", "Overview of our solutions, services, and value proposition."],
      about: ["About us", "Our vision, working method, and approach to applied AI."],
      services: ["Services", "Digital solutions, automation, marketing and applied AI for growth."],
      faq: ["FAQ", "Quick answers to the most common questions about our services."],
      quiz: ["AI Quiz", "Initial diagnosis to identify automation opportunities."],
      newsletter: ["Newsletter", "Practical content on AI, automation, and growth."],
      terms: ["Terms of Service", "Terms of use for the website and services."],
      privacy: ["Privacy Policy", "How we collect, process, and protect personal data."],
      trust: ["Trust & Security", "Security, ethics, and accountability principles."],
      policy: ["Generative AI Policy", "How we frame responsible use of generative AI."],
    },
  },
} as const;

function makeLink(lang: string, path = "") {
  return `/${lang}${path}`;
}

function SitemapCard({ group }: { group: SitemapGroup }) {
  const Icon = group.icon;

  const itemClass =
    "legal-item group flex items-center justify-between gap-4 px-6 py-4 no-underline transition hover:bg-[color-mix(in_srgb,var(--brand-primary)_5%,transparent)]";

  const renderItem = (link: SitemapLink, ArrowIcon: ElementType) => (
    <>
      <div className="min-w-0">
        <p className="legal-q-text mb-0.5 text-[15px]">{link.title}</p>
        <p className="text-[13px] font-medium leading-relaxed text-[color-mix(in_srgb,var(--brand-night)_55%,transparent)]">
          {link.description}
        </p>
      </div>
      <ArrowIcon className="h-4 w-4 shrink-0 text-[var(--brand-primary)] transition-transform duration-200 group-hover:translate-x-1" />
    </>
  );

  return (
    <div className="legal-document-card !p-0 overflow-hidden">
      {/* Cabeçalho do card */}
      <div className="flex items-center gap-4 border-b border-[color-mix(in_srgb,var(--brand-mid)_40%,transparent)] px-6 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)]">
          <Icon className="h-5 w-5 text-[var(--brand-primary)]" />
        </div>
        <div>
          <p className="legal-sidebar-label !mb-0">{group.label}</p>
          <h2 className="font-[var(--font-heading)] text-[20px] font-black leading-tight text-[var(--brand-night)]">
            {group.title}
          </h2>
        </div>
      </div>

      {/* Lista de links */}
      <ul className="legal-list !rounded-none !border-0">
        {group.links.map((link) => (
          <li key={link.href || link.title}>
            {link.href ? (
              <Link href={link.href} className={itemClass}>
                {renderItem(link, ArrowRight)}
              </Link>
            ) : (
              <a
                href="#newsletter"
                onClick={(e) => { e.preventDefault(); link.onClick?.(); }}
                className={itemClass}
              >
                {renderItem(link, Mail)}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sitemap() {
  const { lang } = useTranslation();
  const content = copy[lang];
  const l = content.links;
  const quizHref = lang === "pt" ? makeLink(lang, "/quiz-ia") : makeLink(lang, "/quiz-ai");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(content.sections.main);

  const groups: SitemapGroup[] = [
    {
      label: content.sections.main,
      title: content.sections.mainTitle,
      icon: Home,
      links: [
        { title: l.home[0], description: l.home[1], href: makeLink(lang) },
        { title: l.about[0], description: l.about[1], href: makeLink(lang, "/about") },
        { title: l.services[0], description: l.services[1], href: makeLink(lang, "/services") },
      ],
    },
    {
      label: content.sections.resources,
      title: content.sections.resourcesTitle,
      icon: Sparkles,
      links: [
        { title: l.faq[0], description: l.faq[1], href: makeLink(lang, "/faq") },
        { title: l.quiz[0], description: l.quiz[1], href: quizHref },
        { title: l.newsletter[0], description: l.newsletter[1], onClick: () => setIsNewsletterOpen(true) },
      ],
    },
    {
      label: content.sections.legal,
      title: content.sections.legalTitle,
      icon: ShieldCheck,
      links: [
        { title: l.terms[0], description: l.terms[1], href: makeLink(lang, "/terms") },
        { title: l.privacy[0], description: l.privacy[1], href: makeLink(lang, "/privacy") },
        { title: l.trust[0], description: l.trust[1], href: makeLink(lang, "/trust") },
        { title: l.policy[0], description: l.policy[1], href: makeLink(lang, "/generative-ai-policy") },
      ],
    },
  ];

  useSEOHead({
    title: `${content.label} — Sapiente.AI`,
    description: content.subtitle,
    url: `https://sapienteai.com/${lang}/sitemap`,
    type: "website",
  }, [content, lang]);

  return (
    <div className="legal-page flex flex-col">
      <InternalHero
        label={content.label}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        compact
      />

      <section className="legal-main">
        <div className="legal-inner">

          {/* Sidebar */}
          <aside className="legal-sidebar">
            <div className="legal-sidebar-label">{content.label}</div>
            <div className="legal-cats">
              {groups.map((group) => {
                const Icon = group.icon;
                const isActive = activeGroup === group.label;
                return (
                  <a
                    key={group.label}
                    href={`#sitemap-${group.label}`}
                    onClick={() => setActiveGroup(group.label)}
                    className={`legal-cat ${isActive ? "active" : ""}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{group.label}</span>
                  </a>
                );
              })}
            </div>
          </aside>

          {/* Cards */}
          <div className="flex flex-col gap-7">
            {groups.map((group, index) => (
              <Reveal key={group.label} delay={index * 80}>
                <div id={`sitemap-${group.label}`}>
                  <SitemapCard group={group} />
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </div>
  );
}
