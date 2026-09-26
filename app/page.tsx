"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import type { Persona } from "@/lib/portfolio";
import {
    ScrollTrigger,
    exitVisible,
    gsap,
    prefersReduced,
    setupReveals,
    useGSAP,
    visibleSwaps,
} from "@/lib/motion";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// Theme + persona live in localStorage / the <html> element (both are set
// before paint by the inline script in layout.tsx). React reads them via
// useSyncExternalStore and re-reads whenever this event fires.
const PREFS_EVENT = "prefs-change";

function subscribe(onChange: () => void) {
    window.addEventListener(PREFS_EVENT, onChange);
    return () => window.removeEventListener(PREFS_EVENT, onChange);
}

function getPersona(): Persona {
    return localStorage.getItem("persona") === "frontend" ? "frontend" : "qa";
}

function getIsDark(): boolean {
    return document.documentElement.classList.contains("dark");
}

type VTDocument = Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export default function Home() {
    const persona = useSyncExternalStore(subscribe, getPersona, () => "qa" as Persona);
    const isDark = useSyncExternalStore(subscribe, getIsDark, () => false);
    const root = useRef<HTMLDivElement>(null);
    const switching = useRef(false);

    // Scroll reveals, rebuilt in the new grammar whenever the persona changes.
    // Whatever is on screen at that moment re-plots as one top-to-bottom pass.
    useGSAP(
        () => {
            const el = root.current;
            if (!el || prefersReduced()) return;
            setupReveals(el, persona);
            ScrollTrigger.refresh();
        },
        { scope: root, dependencies: [persona], revertOnUpdate: true },
    );

    // Keep the persona on <html> in step with what React rendered
    // (covers a stored persona that differs from the server render).
    useEffect(() => {
        document.documentElement.dataset.persona = persona;
    }, [persona]);

    // The Frontend button fill blooms from where the pointer entered.
    useEffect(() => {
        const track = (e: PointerEvent) => {
            const b = (e.target as Element | null)?.closest?.<HTMLElement>(".btn");
            if (!b) return;
            const r = b.getBoundingClientRect();
            b.style.setProperty("--mx", `${e.clientX - r.left}px`);
            b.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        document.addEventListener("pointerover", track, { passive: true });
        document.addEventListener("pointerout", track, { passive: true });
        return () => {
            document.removeEventListener("pointerover", track);
            document.removeEventListener("pointerout", track);
        };
    }, []);

    const handleSetPersona = async (next: Persona) => {
        if (next === persona || switching.current) return;
        switching.current = true;

        const commit = () => {
            document.documentElement.dataset.persona = next;
            localStorage.setItem("persona", next);
            window.dispatchEvent(new Event(PREFS_EVENT));
        };

        try {
            if (prefersReduced()) {
                // Reduced: a short cross-fade of the changing content, no travel.
                const out = visibleSwaps();
                await gsap.to(out, { opacity: 0, duration: 0.15, ease: "none" });
                gsap.set(out, { clearProps: "opacity" });
                flushSync(commit);
                gsap.fromTo(
                    visibleSwaps(),
                    { opacity: 0 },
                    { opacity: 1, duration: 0.25, ease: "none", clearProps: "opacity" },
                );
            } else {
                const touched = await exitVisible(persona);
                // Clear the exit styles and commit in the same task, so no
                // frame is painted between the old content leaving and the
                // new content's from-state being set.
                gsap.set(touched, { clearProps: "clipPath,opacity,transform,filter" });
                flushSync(commit);
            }
        } finally {
            switching.current = false;
        }
    };

    // Theme: the new print feeds down the sheet (QA), or blooms out from
    // the switch along a curve (Frontend). Reduced motion gets a short fade.
    const toggleDark = (e?: { currentTarget: EventTarget | null }) => {
        const next = !getIsDark();
        const apply = () => {
            document.documentElement.classList.toggle("dark", next);
            localStorage.setItem("theme", next ? "dark" : "light");
            flushSync(() => window.dispatchEvent(new Event(PREFS_EVENT)));
        };

        const doc = document as VTDocument;
        if (!doc.startViewTransition) {
            apply();
            return;
        }

        const reduced = prefersReduced();
        const origin = (e?.currentTarget as Element | null)?.getBoundingClientRect();
        const vt = doc.startViewTransition(apply);
        vt.ready.then(() => {
            const pseudoElement = "::view-transition-new(root)";
            if (reduced) {
                document.documentElement.animate(
                    { opacity: [0, 1] },
                    { duration: 180, easing: "linear", pseudoElement },
                );
            } else if (persona === "frontend" && origin) {
                const x = origin.left + origin.width / 2;
                const y = origin.top + origin.height / 2;
                const r = Math.hypot(
                    Math.max(x, window.innerWidth - x),
                    Math.max(y, window.innerHeight - y),
                );
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${r}px at ${x}px ${y}px)`,
                        ],
                    },
                    { duration: 1000, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement },
                );
            } else {
                document.documentElement.animate(
                    { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] },
                    { duration: 820, easing: "cubic-bezier(0.7, 0, 0.3, 1)", pseudoElement },
                );
            }
        });
    };

    return (
        <>
            <a href="#main" className="skip-link">
                Skip to content
            </a>
            <Nav
                persona={persona}
                setPersona={handleSetPersona}
                isDark={isDark}
                toggleDark={toggleDark}
            />
            <div ref={root}>
                <main id="main">
                    <Hero persona={persona} />
                    <Projects persona={persona} />
                    <About persona={persona} />
                    <Contact />
                </main>
                <Footer persona={persona} />
            </div>
        </>
    );
}
