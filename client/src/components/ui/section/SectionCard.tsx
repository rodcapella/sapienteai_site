import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { motion } from "framer-motion";

const sectionCardVariants = cva(
  `
  group relative overflow-hidden
  rounded-[2rem] border
  p-8 md:p-10
  backdrop-blur-3xl
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
          hover:border-[#00D4FF]/70
          hover:shadow-[0_0_0_1px_rgba(0,212,255,0.45),0_0_48px_rgba(0,212,255,0.42)]
        `,

        highlight: `
          bg-[linear-gradient(138deg,rgba(10,17,40,0.72),rgba(30,58,138,0.54),rgba(0,212,255,0.34))]
          border-[#3B82F6]/35
          shadow-[var(--shadow-soft)]
          hover:-translate-y-2
          hover:border-[#00D4FF]/72
          hover:shadow-[0_0_0_1px_rgba(34,211,238,0.45),0_0_56px_rgba(34,211,238,0.38)]
        `,

        subtle: `
          bg-[var(--glass-bg-soft)]
          border-[var(--tech-border)]
          hover:border-[#3B82F6]/45
        `,

        solid: `
          bg-[#050A16]
          border-white/15
          text-white
          hover:border-[#00D4FF]/55
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
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-gradient-to-br from-[#00D4FF]/35 to-[#3B82F6]/20 blur-[95px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ left: position.x - 140, top: position.y - 140 }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [background:linear-gradient(130deg,rgba(0,212,255,0.55),transparent_50%,rgba(59,130,246,0.62))_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}
