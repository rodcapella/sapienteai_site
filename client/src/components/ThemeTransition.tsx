import { useEffect, useState } from "react";

export function ThemeTransition({ trigger }: { trigger: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    setVisible(true);

    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 420);

    return () => window.clearTimeout(timeout);
  }, [trigger]);

  return (
    <div
      className={`
        pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, color-mix(in srgb,var(--brand-cyan-bright) 20%,transparent), color-mix(in srgb,var(--brand-darkest) 18%,transparent) 45%, transparent 75%)",
      }}
    />
  );
}
