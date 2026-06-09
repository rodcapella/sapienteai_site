import { useEffect, useRef, useState } from "react";

export function useFixedAfterScroll<T extends HTMLElement>(topOffset = 64) {
  const ref = useRef<T>(null);
  const thresholdRef = useRef(0);
  const [isFixed, setIsFixed] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      setHeight(rect.height);

      if (!isFixed) {
        thresholdRef.current = rect.top + window.scrollY - topOffset;
      }
    };

    const update = () => {
      setIsFixed(window.scrollY >= thresholdRef.current);
    };

    measure();
    update();

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", update);
    };
  }, [isFixed, topOffset]);

  return { ref, isFixed, height };
}
