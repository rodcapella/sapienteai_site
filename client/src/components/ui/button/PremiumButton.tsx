import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'purple' | 'secondary' | 'outline';
}

export function PremiumButton({ children, onClick, className, variant = 'purple' }: PremiumButtonProps) {
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

    if (ref.current) {
      ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
      ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const variantClasses = {
    primary: "bg-primary text-primary-foreground shadow-[0_0_20px_oklch(0.75_0.15_240_/_20%)]",
    purple: "bg-neon-purple text-white shadow-[0_0_25px_oklch(0.65_0.25_300_/_30%)] hover:shadow-[0_0_40px_oklch(0.65_0.25_300_/_50%)]",
    secondary: "bg-white text-foreground border border-foreground/5 shadow-sm hover:bg-foreground/5",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn(`
        relative px-10 py-5 rounded-full
        font-black uppercase tracking-widest text-base
        overflow-hidden
        transition-all duration-500
        hover:scale-[1.05]
        active:scale-95
        group
      `, variantClasses[variant], className)}
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
