import { cn } from "@/lib/utils";

type SectionBackgroundProps = {
  image?: string;
  children: React.ReactNode;
  className?: string;

  /**
   * Controla intensidade do overlay
   * - soft: leve (CTAs)
   * - medium: padrão (maioria das secções)
   * - strong: fundos muito visuais (hero / imagens fortes)
   */
  overlay?: "soft" | "medium" | "strong";

  /**
   * Blur do background
   */
  blur?: "none" | "sm" | "md" | "lg";
};

const overlayMap = {
  soft: "bg-black/10",
  medium: "bg-black/25",
  strong: "bg-black/40",
};

const blurMap = {
  none: "",
  sm: "backdrop-blur-[2px]",
  md: "backdrop-blur-[4px]",
  lg: "backdrop-blur-[8px]",
};

export function SectionBackground({
  image,
  children,
  className,
  overlay = "medium",
  blur = "sm",
}: SectionBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* BACKGROUND IMAGE */}
      {image && (
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* OVERLAY + BLUR */}
      {image && (
        <div
          className={cn(
            "absolute inset-0",
            overlayMap[overlay],
            blurMap[blur]
          )}
        />
      )}

      {/* CONTENT */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}