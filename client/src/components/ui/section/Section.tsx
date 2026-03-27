// Section.tsx

import { cn } from "@/lib/utils";

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("py-28 md:py-36 px-4", className)}
      {...props}
    />
  );
}
