import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { motion } from "framer-motion";

const sectionCardVariants = cva(
  `
  group relative overflow-hidden
  rounded-[2rem] border
  p-8 md:p-10
  backdrop-blur-2xl
  transition-all duration-700 ease-[0.16,1,0.3,1]
  transform-gpu
  `,
  {
    variants: {
      variant: {
        default: `
          bg-[var(--glass-bg)]
          border-[var(--tech-border)]
          shadow-[var(--shadow-soft)]
          hover:-translate-y-2
          hover:border-primary/45
          hover:shadow-[var(--shadow-neon-blue)]
        `,

        highlight: `
          bg-[linear-gradient(140deg,rgba(0,102,255,0.16),rgba(168,85,247,0.16))]
          border-primary/30
          shadow-[var(--shadow-soft)]
          hover:-translate-y-2
          hover:border-accent-purple/60
          hover:shadow-[var(--shadow-neon-purple)]
        `,

        subtle: `
          bg-[var(--glass-bg-soft)]
          border-[var(--tech-border)]
          hover:border-primary/35
        `,

        solid: `
          bg-[#050A16]
          border-white/15
          text-white
          hover:border-primary/40
          hover:-translate-y-1
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type Props = React.ComponentProps<"div"> &
  VariantProps<typeof sectionCardVariants> & {
    delay?: number;
  };

export function SectionCard({ className, variant, children, delay = 0, ...props }: Props) {
  const { position, onMouseMove } = useMouseGlow();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={onMouseMove}
      className={cn(sectionCardVariants({ variant }), className)}
      {...props}
    >
      <div
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-gradient-to-br from-primary/25 to-accent-purple/20 blur-[95px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ left: position.x - 140, top: position.y - 140 }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [background:linear-gradient(130deg,rgba(0,212,255,0.35),transparent_50%,rgba(192,132,252,0.35))_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}
