import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  label: string;
}

interface TOCProps {
  items: TOCItem[];
  activeId?: string;
}

export function TOC({ items, activeId }: TOCProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "block py-2 px-3 text-sm transition-colors border-l-2",
            activeId === item.id
              ? "text-white border-white font-medium bg-white/5"
              : "text-white/40 border-transparent hover:text-white/60 hover:bg-white/5"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
