import { useEffect, useState } from "react";

export function ThemeTransition({ trigger }: { trigger: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);

      const timeout = setTimeout(() => {
        setVisible(false);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  return (
    <div
      className={`
        pointer-events-none
        fixed inset-0 z-[9999]
        transition-opacity duration-300
        ${
          visible
            ? "opacity-100 bg-white dark:bg-black"
            : "opacity-0"
        }
      `}
    />
  );
}