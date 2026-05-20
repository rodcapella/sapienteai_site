import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "wouter";

import ContactModal from "@/components/ContactModal";
import { setSEOHead } from "@/components/SEOHead";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { TechBackdrop, TechParticleField } from "@/components/ui/tech/TechBackground";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

type Member = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  story?: string;
  stack: string[];
  image: string;
  link: string;
};

type Highlight = {
  value: string;
  title: string;
  text: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function TeamCard({ member }: { member: Member }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 10 });
  const springY = useSpring(y, { stiffness: 120, damping: 10 });

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.08);
    y.set(dy * 0.08);

    ref.current.style.setProperty("--x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={member.link}
      target={member.link === "#" ? undefined : "_blank"}
      rel={member.link === "#" ? undefined : "noopener noreferrer"}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="group relative w-full"
    >
      <span
        className="absolute inset-0 rounded-[1.75rem] opacity-0 transition group-hover:opacity-100"
        style={{
          background: "radial-gradient(300px circle at var(--x) var(--y), rgba(34,211,238,0.15), transparent 40%)",
        }}
      />

      <div className="team-member-card flex h-full flex-col p-7 text-left transition-all duration-300 group-hover:-translate-y-2 md:p-9">
        <div className="relative z-10 mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="team-avatar-frame">
            {member.image ? (
              <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
            ) : (
              <div className="relative z-10 text-4xl font-black">
                {getInitials(member.name)}
              </div>
            )}
          </div>

          <div className="min-w-0 pt-1">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-primary/70">
              {member.role}
            </p>
            <h3 className="mb-4 text-3xl font-black leading-none text-foreground md:text-4xl">{member.name}</h3>
            <p className="inline-flex rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-foreground/55">
              {member.focus}
            </p>
          </div>
        </div>

        <div className="team-member-description relative z-10 mb-7 p-6">
          <p className="text-2xl font-black leading-tight text-foreground">{member.bio}</p>
        </div>

        {member.story && <p className="relative z-10 mb-8 text-lg font-medium leading-relaxed text-foreground/70">{member.story}</p>}

        <div className="team-stack-panel relative z-10 mt-auto">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-primary/70">Stack & foco</p>
          <div className="flex flex-wrap gap-3">
            {member.stack.map((tech) => (
              <span key={tech} className="team-stack-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {member.link !== "#" && (
          <span className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--brand-cyan)]/80 transition-colors group-hover:text-white">
            Website
            <Icons.ExternalLink className="h-4 w-4" />
          </span>
        )}
      </div>
    </motion.a>
  );
}

export default function Team() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";
  const content = getContent("team", lang);
  const members: Member[] = content.members;
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setSEOHead({
      title: `${content.hero.title} - Sapiente.AI`,
      description: content.hero.subtitle,
      url: `https://sapienteai.com/${lang}/team`,
      type: "website",
    });
  }, [lang, content]);

  return (
    <div className="flex flex-col">
      <Section className="relative flex min-h-[68vh] items-center justify-center overflow-hidden bg-modern-gradient tech-grid scanlines pt-28 pb-20 md:min-h-[78vh] md:pt-36 md:pb-28">
        <div className="absolute inset-0">
          <img src="/media/banners/hero-banner.webp" alt="Sapiente.AI team" className="h-full w-full object-cover opacity-[0.24]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,27,0.97),rgba(26,31,46,0.88),rgba(10,138,255,0.48))]" />
        </div>
        <TechBackdrop intensity="strong" />
        <TechParticleField className="opacity-70" />

        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,240,255,0.24),transparent_52%)]" animate={{ opacity: [0.15, 0.42, 0.15] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <div className="glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.32em] text-[var(--brand-cyan)] sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-cyan-bright)] shadow-[0_0_20px_rgba(0,240,255,0.95)]" />
              Sapiente.AI Team
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-10 font-heading text-4xl font-extrabold leading-[0.95] text-[var(--brand-offwhite)] drop-shadow-[0_0_35px_rgba(0,240,255,0.25)] sm:text-6xl md:text-7xl lg:text-8xl">
              {content.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-[var(--brand-offwhite)]/85 sm:text-xl md:text-2xl">
              {content.hero.subtitle}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="team-section-shell team-intro-section bg-ice py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <Reveal>
              <div className="team-intro-panel h-full p-7 md:p-10">
                <div className="relative z-10">
                  <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">
                    {content.intro.eyebrow}
                  </p>
                  <h2 className="mb-8 text-4xl font-black leading-none text-foreground md:text-6xl">
                    {content.intro.title}
                  </h2>
                  <p className="text-lg font-medium leading-relaxed text-foreground/65 md:text-2xl">
                    {content.intro.text}
                  </p>
                  <div className="mt-10 grid grid-cols-3 gap-3 border-t border-primary/10 pt-8">
                    <div>
                      <p className="text-3xl font-black text-primary">AI</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-foreground/45">Systems</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-primary">SEO</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-foreground/45">Growth</p>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-primary">BI</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-foreground/45">Data</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5">
              {content.intro.highlights.map((item: Highlight, index: number) => (
                <Reveal key={item.value} delay={index * 100}>
                  <div className="team-highlight-card grid gap-5 p-6 transition duration-500 hover:-translate-y-1 hover:border-[var(--brand-cyan)]/40 hover:shadow-[0_24px_64px_rgba(0,209,255,0.16)] md:grid-cols-[80px_1fr] md:p-8">
                    <div className="text-4xl font-black leading-none text-primary/35">
                      {item.value}
                    </div>
                    <div>
                      <h3 className="mb-3 text-2xl font-black text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-base font-medium leading-relaxed text-foreground/60">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="team-section-shell bg-blue-tint py-24 md:py-40">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="relative z-10 mx-auto mb-16 max-w-4xl text-center">
              <p className="mx-auto mb-7 inline-flex rounded-full border border-primary/20 bg-white/60 px-5 py-2 text-sm font-black uppercase tracking-[0.24em] text-primary shadow-[0_18px_40px_rgba(10,17,40,0.08)] backdrop-blur-xl">
                {content.presentation.eyebrow}
              </p>
              <h2 className="team-founders-title mb-8 text-4xl font-black leading-none md:text-7xl">
                {content.presentation.title}
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-foreground/70 md:text-2xl">
                {content.presentation.text}
              </p>
            </div>
          </Reveal>

          <div className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            {members.map((member) => (
              <Reveal key={member.name}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="team-cta-panel py-24 text-center md:py-36">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="relative z-10 mx-auto max-w-4xl">
              <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-[var(--brand-cyan)]">
                Sapiente.AI
              </p>
              <h2 className="mb-8 text-4xl font-black leading-none text-[var(--brand-offwhite)] md:text-7xl">
                {lang === "en" ? "Strategy, AI, and execution working as one." : "Estratégia, IA e execução a trabalhar como uma só."}
              </h2>
              <PremiumButton variant="secondary" onClick={() => setIsContactOpen(true)}>
                {lang === "en" ? "Talk to the team" : "Falar com a equipa"}
              </PremiumButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
