"use client";

import { useState, useCallback } from "react";

export function Reveal({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>{children}</div>;
}
