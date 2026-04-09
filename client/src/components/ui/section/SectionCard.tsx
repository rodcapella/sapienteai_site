import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { motion } from "framer-motion";

const sectionCardVariants = cva(
  `
  group relative overflow-hidden
  backdrop-blur-3xl
  border rounded-[3rem]
  p-10 md:p-14

  transition-all duration-1000 ease-[0.16, 1, 0.3, 1]
  transform-gpu
  `,
  {
    variants: {
      variant: {
        default: `
          bg-white/70
          border-foreground/5
          shadow-[0_10px_40px_rgba(0,0,0,0.03)]

          hover:-translate-y-4
          hover:shadow-[0_60px_120px_rgba(0,0,0,0.1)]
          hover:border-primary/20
          hover:bg-white/90
        `,

        highlight: `
          bg-modern-gradient
          border-primary/20
          shadow-[0_20px_60px_rgba(34,211,238,0.1)]

          hover:-translate-y-5
          hover:shadow-[0_70px_140px_rgba(34,211,238,0.25)]
          hover:border-primary/40
        `,

        subtle: `
          bg-white/40
          border-foreground/5
          hover:bg-white/60
        `,

        solid: `
          bg-black
          border-white/10
          text-white
          hover:border-primary/40
          hover:-translate-y-2
        `
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type Props = React.ComponentProps<"div"> &
  VariantProps<typeof sectionCardVariants> & {
    delay?: number;
  };

export function SectionCard({ className, variant, children, delay = 0, ...props }: Props) {
  const { position, onMouseMove } = useMouseGlow();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 1, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      onMouseMove={onMouseMove}
      className={cn(sectionCardVariants({ variant }), className)}
      {...props}
    >
      {/* ✨ CYBER GLOW (Neon Blue/Purple Mix) */}
      <div
        className="
        pointer-events-none absolute
        w-[400px] h-[400px]
        rounded-full
        bg-gradient-to-br from-primary/20 to-accent-purple/20
        blur-[120px]

        opacity-0 group-hover:opacity-100
        transition-opacity duration-1000
        "
        style={{
          left: position.x - 200,
          top: position.y - 200,
        }}
      />

      {/* ✨ CYBER BORDER ACCENT */}
      <div className="
        pointer-events-none absolute inset-0
        rounded-[3rem]
        p-px
        bg-gradient-to-br from-primary/30 via-transparent to-accent-purple/30
        opacity-0 group-hover:opacity-100
        transition-opacity duration-1000
      " />

      {/* ✨ PREMIUM GLASS SHINE */}
      <div className="
        pointer-events-none absolute inset-0
        rounded-[3rem]
        bg-gradient-to-br from-white/20 to-transparent
        opacity-0 group-hover:opacity-100
        transition duration-1000
      " />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
}
