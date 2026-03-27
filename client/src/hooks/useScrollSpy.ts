import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
    (entries) => {
        const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
        setActive(visible[0].target.id);
        } else {
        // 🔥 fallback aqui
        const passed = entries
            .filter((entry) => entry.boundingClientRect.top < 0)
            .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);

        if (passed.length > 0) {
            setActive(passed[0].target.id);
        }
        }
    },
    {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0.1,
    }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}