"use client";

// components/Magnetic.tsx
// The primary action leans toward the pointer. For QA it moves in 4px
// detents, like a part clicking into a jig; for Frontend it glides.

import { useRef, type ReactNode } from "react";
import { gsap, prefersReduced, useGSAP } from "@/lib/motion";

export function Magnetic({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (
                !el ||
                prefersReduced() ||
                !window.matchMedia("(hover: hover) and (pointer: fine)").matches
            )
                return;

            const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "curve" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "curve" });
            const isQA = () =>
                document.documentElement.dataset.persona !== "frontend";

            const move = (e: PointerEvent) => {
                const r = el.getBoundingClientRect();
                const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
                const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
                if (isQA()) {
                    gsap.killTweensOf(el);
                    gsap.set(el, {
                        x: Math.round(dx / 4) * 4,
                        y: Math.round(dy / 4) * 4,
                    });
                } else {
                    xTo(dx);
                    yTo(dy);
                }
            };
            const leave = () => {
                gsap.killTweensOf(el);
                gsap.to(
                    el,
                    isQA()
                        ? { x: 0, y: 0, duration: 0.18, ease: "settle" }
                        : {
                              x: 0,
                              y: 0,
                              duration: 0.9,
                              ease: "elastic.out(1, 0.45)",
                          },
                );
            };

            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            return () => {
                el.removeEventListener("pointermove", move);
                el.removeEventListener("pointerleave", leave);
            };
        },
        { scope: ref },
    );

    return (
        <span ref={ref} className="magnet">
            {children}
        </span>
    );
}
