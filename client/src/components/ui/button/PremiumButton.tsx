import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function PremiumButton({ children, onClick, className }: any) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.1);
    y.set(dy * 0.1);

    ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn(`
        relative px-8 py-4 rounded-full
        bg-primary text-primary-foreground font-bold text-lg
        overflow-hidden
        transition-all duration-300
        hover:scale-[1.05]
        hover:shadow-[0_0_30px_rgba(150,220,255,0.4)]
        group
      `, className)}
    >
      {/* glow */}
      <span
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100 transition
        "
        style={{
          background: `
            radial-gradient(
              120px circle at var(--x) var(--y),
              rgba(255,255,255,0.4),
              transparent 70%
            )
          `
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
