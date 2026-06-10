import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { motion } from "framer-motion";

const sectionCardVariants = cva(
  `
  group relative overflow-hidden
  rounded-[2rem] border
  p-5 sm:p-8 md:p-10
  backdrop-blur-3xl
  transition-all duration-700 ease-[0.16,1,0.3,1]
  transform-gpu
  `,
  {
    variants: {
      variant: {
        default: `
          bg-[linear-gradient(145deg,color-mix(in srgb,white 88%,transparent),color-mix(in srgb,var(--section-blue-tint) 68%,transparent))]
          border-[var(--brand-purple)]/[0.28]
          shadow-[0_20px_52px_color-mix(in_srgb,var(--brand-darkest) 13%,transparent)]
          hover:-translate-y-2
          hover:border-[var(--brand-purple)]/55
          hover:bg-[linear-gradient(145deg,color-mix(in srgb,white 94%,transparent),color-mix(in srgb,var(--brand-purple) 12%,transparent))]
          hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-purple) 24%,transparent),0_22px_56px_color-mix(in_srgb,var(--brand-purple) 16%,transparent)]
        `,

        highlight: `
          bg-[linear-gradient(138deg,color-mix(in srgb,var(--brand-night) 96%,transparent),color-mix(in srgb,var(--brand-night) 90%,transparent),color-mix(in srgb,var(--brand-primary) 34%,transparent))]
          border-[var(--brand-cyan)]/34
          shadow-[0_22px_58px_color-mix(in_srgb,var(--brand-darkest) 32%,transparent)]
          hover:-translate-y-2
          hover:border-[var(--brand-cyan)]/72
          hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-primary) 34%,transparent),0_22px_56px_color-mix(in_srgb,var(--brand-cyan-bright) 24%,transparent)]
        `,

        subtle: `
          bg-[linear-gradient(145deg,color-mix(in srgb,white 62%,transparent),color-mix(in srgb,var(--brand-purple) 10%,transparent))]
          border-[var(--brand-purple)]/[0.24]
          hover:border-[var(--brand-purple)]/55
          hover:shadow-[0_18px_46px_color-mix(in_srgb,var(--brand-purple) 18%,transparent)]
        `,

        solid: `
          bg-[var(--brand-darkest)]
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
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in srgb,var(--brand-primary) 24%,transparent),color-mix(in srgb,var(--brand-cyan-bright) 8%,transparent)_48%,transparent_70%)] blur-[95px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ left: position.x - 140, top: position.y - 140 }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [background:var(--brand-gradient-border)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}
