// SectionCard.tsx

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const sectionCardVariants = cva(
  `
  group relative overflow-hidden
  backdrop-blur-xl
  border rounded-2xl
  p-6 md:p-8

  transition-all duration-300 ease-out
  transform-gpu
  `,
  {
    variants: {
      variant: {
        default: `
          bg-white/[0.03]
          border-white/[0.08]

          hover:-translate-y-1
          hover:scale-[1.02]
          hover:border-cyan-400/30
          hover:shadow-[0_20px_80px_rgba(0,0,0,0.6)]
        `,

        highlight: `
          bg-gradient-to-br from-cyan-500/10 to-blue-600/10
          border-cyan-400/30

          shadow-[0_0_40px_rgba(0,255,255,0.15)]

          hover:-translate-y-1.5
          hover:scale-[1.03]
          hover:shadow-[0_0_100px_rgba(0,255,255,0.25)]
        `,

        subtle: `
          bg-white/[0.02]
          border-white/[0.05]

          hover:bg-white/[0.04]
        `,

        solid: `
          bg-slate-900
          border-white/10

          hover:border-cyan-400/40
          hover:-translate-y-1
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
      {/* ✨ cursor glow (mais suave e elegante) */}
      <div
        className="
        pointer-events-none absolute
        w-52 h-52
        rounded-full
        bg-cyan-400/20
        blur-3xl

        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        "
        style={{
          left: position.x - 100,
          top: position.y - 100,
        }}
      />

      {/* ✨ light overlay (efeito vidro premium) */}
      <div className="
        pointer-events-none absolute inset-0
        rounded-2xl
        bg-gradient-to-b from-white/[0.06] to-transparent
        opacity-0 group-hover:opacity-100
        transition duration-300
      " />

      {/* conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}