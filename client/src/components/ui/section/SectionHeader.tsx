// SectionHeader.tsx

import { cn } from "@/lib/utils";

export function SectionHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-4xl mx-auto text-center mb-16",
        className
      )}
      {...props}
    />
  );
}