import { useState } from "react";

export function useMouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return { position, onMouseMove };
}