import { useDialogComposition } from "@/components/ui/dialog";
import { useComposition } from "@/hooks/useComposition";
import { cn } from "@/lib/utils";
import * as React from "react";

function Input({
  className,
  type,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  ...props
}: React.ComponentProps<"input">) {
  const dialogComposition = useDialogComposition();

  const {
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown,
  } = useComposition<HTMLInputElement>({
    onKeyDown: (e) => {
      const isComposing =
        (e.nativeEvent as any).isComposing ||
        dialogComposition.justEndedComposing();

      if (e.key === "Enter" && isComposing) return;

      onKeyDown?.(e);
    },

    onCompositionStart: (e) => {
      dialogComposition.setComposing(true);
      onCompositionStart?.(e);
    },

    onCompositionEnd: (e) => {
      dialogComposition.markCompositionEnd();

      setTimeout(() => {
        dialogComposition.setComposing(false);
      }, 100);

      onCompositionEnd?.(e);
    },
  });

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // base
        "w-full h-9 px-3 py-1 rounded-md text-sm outline-none transition-all",

        // colors (v4 safe)
        "bg-transparent",
        "text-[var(--foreground)]",
        "placeholder:text-[var(--muted-foreground)]",
        "border border-[var(--border)]",

        // focus
        "focus-visible:ring-2 focus-visible:ring-[var(--ring)]",

        // disabled
        "disabled:opacity-50 disabled:cursor-not-allowed",

        className
      )}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export { Input };