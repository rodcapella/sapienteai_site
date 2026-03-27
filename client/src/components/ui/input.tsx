import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group">
      <input
        className={cn(
          `
          w-full
          bg-white/[0.03]
          border border-white/[0.08]
          rounded-xl

          px-4 py-3
          text-sm text-white

          outline-none
          transition-all duration-300

          placeholder:text-slate-500

          focus:border-cyan-400/40
          focus:bg-white/[0.05]

          `,
          className
        )}
        {...props}
      />

      {/* glow focus */}
      <div className="
        pointer-events-none absolute inset-0
        rounded-xl
        opacity-0 group-focus-within:opacity-100
        transition duration-300
        shadow-[0_0_30px_rgba(0,255,255,0.15)]
      " />
    </div>
  );
}