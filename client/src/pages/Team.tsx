import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "wouter";

import ContactModal from "@/components/ContactModal";
import { setSEOHead } from "@/components/SEOHead";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { getContent } from "@/lib/content";
import { Icons } from "@/lib/icons";

type Member = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  story?: string;
  stack: string[];
  badges?: string[];
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

        <div className="relative z-10 mb-7 rounded-3xl border border-primary/10 bg-white/55 p-5">
          <p className="text-xl font-black leading-snug text-foreground">{member.bio}</p>
        </div>

        {member.story && <p className="relative z-10 mb-8 text-base font-medium leading-relaxed text-foreground/60">{member.story}</p>}

        {member.badges && (
          <div className="relative z-10 mb-8 flex flex-wrap gap-2">
            {member.badges.map((badge) => (
              <span key={badge} className="team-chip">
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="relative z-10 mt-auto flex flex-wrap gap-3 border-t border-primary/10 pt-8">
          {member.stack.map((tech) => (
            <span key={tech} className="team-stack-chip">
              {tech}
            </span>
          ))}
        </div>

        {member.link !== "#" && (
          <span className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary">
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
      <div className="page-hero-banner relative flex h-[400px] w-full items-center justify-center overflow-hidden md:h-[600px]">
        <div className="container max-w-5xl px-6 text-center">
          <Reveal delay={100}>
            <h1 className="mb-10 text-4xl font-black leading-[0.9] tracking-tighter text-[var(--brand-offwhite)] md:text-8xl">
              {content.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl font-black uppercase tracking-[0.2em] text-[var(--brand-offwhite)]/75 drop-shadow-md md:text-3xl">
              {content.hero.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      <Section className="team-section-shell bg-ice py-24 md:py-40">
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
              <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">
                {content.presentation.eyebrow}
              </p>
              <h2 className="mb-8 text-4xl font-black leading-none text-foreground md:text-7xl">
                {content.presentation.title}
              </h2>
              <p className="text-lg font-medium leading-relaxed text-foreground/60 md:text-2xl">
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
