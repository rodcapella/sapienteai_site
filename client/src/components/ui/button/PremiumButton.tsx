import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function PremiumButton({ children, onClick }: any) {
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

    x.set(dx * 0.2);
    y.set(dy * 0.2);

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
      className="
        relative px-6 py-3 rounded-xl
        bg-cyan-400 text-black font-medium
        overflow-hidden
        transition-all duration-300
        hover:scale-[1.03]
        hover:shadow-[0_10px_40px_rgba(0,255,255,0.25)]
        group
      "
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
              rgba(255,255,255,0.3),
              transparent 60%
            )
          `
        }}
      />

      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
}