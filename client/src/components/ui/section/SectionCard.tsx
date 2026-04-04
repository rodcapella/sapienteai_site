// SectionCard.tsx

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const sectionCardVariants = cva(
  `
  group relative overflow-hidden
  backdrop-blur-2xl
  border rounded-[2.5rem]
  p-10 md:p-12

  transition-all duration-700 ease-out
  transform-gpu
  `,
  {
    variants: {
      variant: {
        default: `
          bg-white/80
          border-foreground/5
          shadow-[0_10px_40px_rgba(0,0,0,0.03)]

          hover:-translate-y-3
          hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)]
          hover:border-primary/20
        `,

        highlight: `
          bg-modern-gradient
          border-primary/20
          shadow-[0_20px_60px_rgba(34,211,238,0.1)]

          hover:-translate-y-4
          hover:shadow-[0_50px_120px_rgba(34,211,238,0.25)]
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
  VariantProps<typeof sectionCardVariants>;

export function SectionCard({ className, variant, children, ...props }: Props) {
  const { position, onMouseMove } = useMouseGlow();

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(sectionCardVariants({ variant }), className)}
      {...props}
    >
      {/* ✨ cursor glow (neon blue/purple mix) */}
      <div
        className="
        pointer-events-none absolute
        w-80 h-80
        rounded-full
        bg-primary/10
        blur-[100px]

        opacity-0 group-hover:opacity-100
        transition-opacity duration-700
        "
        style={{
          left: position.x - 160,
          top: position.y - 160,
        }}
      />

      {/* ✨ light overlay (efeito vidro premium) */}
      <div className="
        pointer-events-none absolute inset-0
        rounded-[2.5rem]
        bg-gradient-to-br from-white/10 to-transparent
        opacity-0 group-hover:opacity-100
        transition duration-700
      " />

      {/* conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
