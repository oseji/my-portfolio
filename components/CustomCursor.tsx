"use client";

// components/CustomCursor.tsx
// Large soft blob lags behind a small dot. Grows on interactive hover.

import { useEffect, useRef } from "react";

type Props = { accent: string };

export function CustomCursor({ accent }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = -100, ty = -100, x = -100, y = -100;
    let dx = -100, dy = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      dx = e.clientX; dy = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest?.("a, button, [data-hover], input, textarea, select, label");
      const el = ref.current;
      if (!el) return;
      el.classList.toggle("big", !!interactive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0)`;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ref} className="ed-cursor" style={{ borderColor: accent }} />
      <div ref={dotRef} className="ed-cursor-dot" style={{ background: accent }} />
    </>
  );
}
