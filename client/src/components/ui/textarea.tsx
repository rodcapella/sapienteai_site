import { useDialogComposition } from "@/components/ui/dialog";
import { useComposition } from "@/hooks/useComposition";
import { cn } from "@/lib/utils";
import * as React from "react";

function Textarea({
  className,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  ...props
}: React.ComponentProps<"textarea">) {
  const dialogComposition = useDialogComposition();

  const {
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown,
  } = useComposition<HTMLTextAreaElement>({
    onKeyDown: (e) => {
      const isComposing =
        (e.nativeEvent as any).isComposing ||
        dialogComposition.justEndedComposing();

      // mantém suporte a Shift+Enter
      if (e.key === "Enter" && !e.shiftKey && isComposing) {
        return;
      }

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
    <textarea
      data-slot="textarea"
      className={cn(
        // layout
        "w-full min-h-24 px-3 py-2 rounded-md resize-none outline-none transition-all",

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

export { Textarea };