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
          bg-[linear-gradient(145deg,rgba(234,246,255,0.82),rgba(208,235,255,0.56))]
          border-[rgba(10,132,255,0.26)]
          shadow-[0_20px_52px_rgba(8,18,40,0.13)]
          hover:-translate-y-2
          hover:border-[var(--brand-purple)]/45
          hover:bg-[linear-gradient(145deg,rgba(234,246,255,0.9),rgba(31,36,117,0.1))]
          hover:shadow-[0_0_0_1px_rgba(90,67,200,0.24),0_22px_56px_rgba(1,32,80,0.16)]
        `,

        highlight: `
          bg-[linear-gradient(138deg,rgba(0,21,71,0.96),rgba(7,26,88,0.9),rgba(63,47,159,0.42))]
          border-[var(--brand-cyan)]/34
          shadow-[0_22px_58px_rgba(5,8,22,0.32)]
          hover:-translate-y-2
          hover:border-[var(--brand-cyan)]/72
          hover:shadow-[0_0_0_1px_rgba(90,67,200,0.34),0_22px_56px_rgba(1,32,80,0.28)]
        `,

        subtle: `
          bg-[linear-gradient(145deg,rgba(234,246,255,0.58),rgba(123,97,255,0.08))]
          border-[rgba(0,209,255,0.24)]
          hover:border-[var(--brand-purple)]/45
          hover:shadow-[0_18px_46px_rgba(123,97,255,0.14)]
        `,

        solid: `
          bg-[#050816]
          border-white/15
          text-white
          hover:border-[var(--brand-cyan)]/55
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
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(90,67,200,0.22),rgba(1,32,80,0.08)_48%,transparent_70%)] blur-[95px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ left: position.x - 140, top: position.y - 140 }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [background:var(--brand-gradient-border)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}
