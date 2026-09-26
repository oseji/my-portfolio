"use client";

// components/PersonaToggle.tsx
// The lens switch. The block under the active option moves in the grammar
// of the persona it's heading to: a straight, even slide that lands exactly
// for QA; a stretch-and-settle along a curve for Frontend.

import { useLayoutEffect, useRef } from "react";
import type { Persona } from "@/lib/portfolio";
import { gsap, prefersReduced } from "@/lib/motion";

type Props = {
    value: Persona;
    onChange: (p: Persona) => void;
};

const OPTIONS: { id: Persona; long: string; short: string }[] = [
    { id: "qa", long: "QA Engineer", short: "QA" },
    { id: "frontend", long: "Frontend Developer", short: "Frontend" },
];

export function PersonaToggle({ value, onChange }: Props) {
    const blockRef = useRef<HTMLSpanElement>(null);
    const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const placed = useRef(false);

    useLayoutEffect(() => {
        const block = blockRef.current;
        const btn = btnRefs.current[value];
        if (!block || !btn) return;

        const place = (animate: boolean) => {
            const to = { x: btn.offsetLeft, width: btn.offsetWidth };
            if (!animate || prefersReduced()) {
                gsap.set(block, to);
                return;
            }
            const from = gsap.getProperty(block, "x") as number;
            gsap.killTweensOf(block);
            if (value === "qa") {
                gsap.to(block, { ...to, duration: 0.34, ease: "plot" });
            } else {
                // Stretch toward the target, then let the trailing edge catch up.
                const reach = Math.max(
                    from + (gsap.getProperty(block, "width") as number),
                    to.x + to.width,
                );
                gsap.timeline()
                    .to(block, {
                        width: reach - Math.min(from, to.x),
                        x: Math.min(from, to.x),
                        duration: 0.28,
                        ease: "power2.in",
                    })
                    .to(block, { ...to, duration: 0.7, ease: "curve" });
            }
        };

        place(placed.current);
        placed.current = true;

        const onResize = () => place(false);
        window.addEventListener("resize", onResize);
        document.fonts?.ready.then(() => place(false));
        return () => window.removeEventListener("resize", onResize);
    }, [value]);

    return (
        <div className="lens" role="group" aria-label="View my work as">
            <span ref={blockRef} className="lens__block" aria-hidden="true" />
            {OPTIONS.map((o) => (
                <button
                    key={o.id}
                    ref={(el) => {
                        btnRefs.current[o.id] = el;
                    }}
                    type="button"
                    className="lens__opt"
                    aria-pressed={value === o.id}
                    onClick={() => value !== o.id && onChange(o.id)}
                >
                    <span className="lens__long">{o.long}</span>
                    <span className="lens__short">{o.short}</span>
                </button>
            ))}
        </div>
    );
}
