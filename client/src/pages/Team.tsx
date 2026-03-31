import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section } from "@/components/ui/section/Section";
import { useRef, useEffect } from "react";
import { useLocation } from "wouter";

import { setSEOHead } from "@/components/SEOHead";

import { getContent } from "@/lib/content";

const content = getContent("team", lang);

// 🔥 (futuro: mover para content/)
const team = [
  {
    name: "Rodrigo Póvoa",
    role: "Founder & Tech Lead",
    bio: "Building intelligent systems focused on clarity, speed, and decision-making.",
    stack: ["AI", "Automation", "Product Strategy"],
    image: "/media/photos/tati.jpg",
    link: "https://www.rpovoadata.tech",
  },
  {
    name: "Tatiane Gomes",
    role: "Marketing",
    bio: "Turning complex ideas into scalable and efficient systems.",
    stack: ["React", "Node", "AI Systems"],
    image: "/media/photos/member.jpg",
    link: "#",
  },
];

type Member = typeof team[number];

// 💎 TOOLTIP
function getTechDescription(tech: string) {
  const map: Record<string, string> = {
    AI: "Artificial Intelligence systems",
    Automation: "Process automation & workflows",
    "Product Strategy": "Product vision & execution",
    React: "Frontend framework",
    Node: "Backend runtime",
    "AI Systems": "Machine learning & decision engines",
  };

  return map[tech] || tech;
}

// 💎 CARD
function TeamCard({ member }: { member: Member }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ref.current?.style.setProperty("--x", `${x}px`);
    ref.current?.style.setProperty("--y", `${y}px`);
  };

  return (
    <a
      href={member.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full md:w-[420px]"
    >
      {/* GLOW */}
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className="relative rounded-2xl p-[1px] overflow-hidden"
        style={{
          background: `
            radial-gradient(
              300px circle at var(--x) var(--y),
              rgba(99,102,241,0.25),
              transparent 40%
            )
          `,
        }}
      >
        <div className="
          bg-white dark:bg-card
          border border-gray-200 dark:border-white/10
          rounded-2xl
          p-8
          text-center
          transition-all
          group-hover:-translate-y-1
          group-hover:shadow-medium
        ">

          {/* IMAGE */}
          <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* NAME */}
          <h3 className="text-xl font-semibold mb-1">
            {member.name}
          </h3>

          {/* ROLE */}
          <p className="text-sm text-primary mb-4">
            {member.role}
          </p>

          {/* BIO */}
          <p className="text-sm text-muted-foreground mb-6">
            {member.bio}
          </p>

          {/* STACK */}
          <div className="flex flex-wrap justify-center gap-2">
            {member.stack.map((tech, idx) => (
              <div key={idx} className="relative group/tooltip">

                <span className="
                  text-xs px-3 py-1
                  rounded-full
                  bg-gray-100 dark:bg-white/5
                  text-gray-600 dark:text-white/70
                ">
                  {tech}
                </span>

                <div className="
                  absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  px-3 py-1.5 text-xs
                  rounded-md bg-black text-white
                  opacity-0 scale-95
                  group-hover/tooltip:opacity-100
                  group-hover/tooltip:scale-100
                  transition-all
                ">
                  {getTechDescription(tech)}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </a>
  );
}

export default function Team() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  useEffect(() => {
    setSEOHead({
      title: lang === "en" ? "Team - SAPIENTE.AI" : "Equipa - SAPIENTE.AI",
      description: "Current team of SAPIENTE.AI.",
      url: `https://sapienteai.com/${lang}/team`,
      type: "website"
    });
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Header />

      {/* HERO */}
      <Section className="pt-32 pb-20 text-center">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            {lang === "en"
              ? "The people behind Sapiente"
              : "A equipa por trás da Sapiente"}
          </h1>

          <p className="text-lg text-muted-foreground">
            {lang === "en"
              ? "Small team. High standards. Built with intention."
              : "Equipa pequena. Padrões elevados. Construído com intenção."}
          </p>

        </div>
      </Section>

      {/* TEAM */}
      <Section>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </Section>

      <Footer />

    </div>
  );
}