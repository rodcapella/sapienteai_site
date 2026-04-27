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
          "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.20), rgba(10,17,40,0.18) 45%, transparent 75%)",
      }}
    />
  );
}
