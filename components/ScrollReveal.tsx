"use client";

// Mounts once in page.tsx. Observes every .ed-reveal element in the DOM
// (including ones added by React re-renders via MutationObserver) and adds
// .is-visible when they enter the viewport.

import { useEffect } from "react";

export function ScrollReveal() {
    useEffect(() => {
        const observe = (el: Element) => {
            // Skip elements already revealed
            if (el.classList.contains("is-visible")) return;

            const io = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        io.disconnect();
                    }
                },
                { threshold: 0.08 },
            );
            io.observe(el);
        };

        // Observe elements already in the DOM
        document.querySelectorAll(".ed-reveal").forEach(observe);

        // Pick up new .ed-reveal nodes added by persona/state switches
        const mo = new MutationObserver((mutations) => {
            mutations.forEach(({ addedNodes }) => {
                addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;
                    if (node.classList.contains("ed-reveal")) observe(node);
                    node.querySelectorAll(".ed-reveal").forEach(observe);
                });
            });
        });
        mo.observe(document.body, { childList: true, subtree: true });

        return () => mo.disconnect();
    }, []);

    return null;
}
