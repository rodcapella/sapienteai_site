import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'purple' | 'secondary' | 'outline' | 'black';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
}

export function PremiumButton({ 
  children, 
  onClick, 
  className, 
  variant = 'purple',
  size = 'md',
  type = 'button'
}: PremiumButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.15);
    y.set(dy * 0.15);

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
    primary: "bg-primary text-white shadow-[0_0_20px_oklch(0.75_0.15_240_/_20%)]",
    purple: "bg-accent-purple text-white shadow-[0_0_25px_oklch(0.65_0.25_300_/_30%)] hover:shadow-[0_0_50px_oklch(0.65_0.25_300_/_50%)]",
    secondary: "bg-white/80 backdrop-blur-xl text-foreground border border-foreground/10 shadow-xl hover:bg-white",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
    black: "bg-black text-white hover:bg-black/90 shadow-2xl"
  };

  const sizeClasses = {
    sm: "px-6 py-3 text-xs",
    md: "px-10 py-5 text-base",
    lg: "px-14 py-7 text-lg"
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn(`
        relative rounded-full
        font-black uppercase tracking-[0.2em]
        overflow-hidden
        transition-all duration-500
        hover:scale-[1.05]
        active:scale-95
        group
      `, variantClasses[variant], sizeClasses[size], className)}
    >
      {/* MAGNETIC GLOW EFFECT */}
      <span
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        "
        style={{
          background: `
            radial-gradient(
              150px circle at var(--x) var(--y),
              rgba(255,255,255,0.4),
              transparent 70%
            )
          `
        }}
      />

      {/* SHINE ANIMATION */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
    </motion.button>
  );
}
