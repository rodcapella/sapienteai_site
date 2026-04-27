import { cn } from "@/lib/utils";

type TechBackdropProps = {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
};

const intensityMap = {
  soft: "opacity-75",
  medium: "opacity-95",
  strong: "opacity-100",
};

export function TechBackdrop({ className, intensity = "medium" }: TechBackdropProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", intensityMap[intensity], className)}
      aria-hidden="true"
    >
      <div className="absolute -left-28 top-[-18%] h-80 w-80 rounded-full bg-[#0A8AFF]/35 blur-[130px]" />
      <div className="absolute -right-24 bottom-[-20%] h-96 w-96 rounded-full bg-[#00D1FF]/28 blur-[150px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,240,255,0.2),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,209,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(123,129,255,0.14)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.2]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_44px,rgba(123,129,255,0.08)_45px,transparent_46px)] opacity-60" />
    </div>
  );
}

export function TechParticleField({ className }: { className?: string }) {
  const particles = [
    { left: "8%", top: "20%", delay: "0s", size: "h-1.5 w-1.5" },
    { left: "18%", top: "68%", delay: "1.6s", size: "h-2 w-2" },
    { left: "32%", top: "34%", delay: "2.4s", size: "h-1.5 w-1.5" },
    { left: "50%", top: "16%", delay: "0.7s", size: "h-2.5 w-2.5" },
    { left: "66%", top: "74%", delay: "1.2s", size: "h-1.5 w-1.5" },
    { left: "80%", top: "30%", delay: "2.8s", size: "h-2 w-2" },
    { left: "90%", top: "60%", delay: "1.9s", size: "h-1.5 w-1.5" },
  ];

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className={cn(
            "absolute rounded-full bg-[#00D1FF]/80 shadow-[0_0_22px_rgba(0,209,255,0.95)] animate-tech-float",
            particle.size,
          )}
          style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
        />
      ))}
    </div>
  );
}
