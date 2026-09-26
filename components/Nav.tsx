"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Persona } from "@/lib/portfolio";
import { ScrollTrigger, gsap, prefersReduced, useGSAP } from "@/lib/motion";
import { PersonaToggle } from "./PersonaToggle";
// Only used by the Résumé nav link, commented out below.
// import { portfolio } from "@/lib/portfolio";

type Props = {
    persona: Persona;
    setPersona: (p: Persona) => void;
    isDark: boolean;
    toggleDark: (e?: { currentTarget: EventTarget | null }) => void;
};

const LINKS = [
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
];

export function Nav({ persona, setPersona, isDark, toggleDark }: Props) {
    const [current, setCurrent] = useState<string | null>(null);
    const strip = useRef<HTMLElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const marker = useRef<HTMLSpanElement>(null);
    const iconBtn = useRef<HTMLButtonElement>(null);
    const userToggled = useRef(false);

    // Scroll-spy: the section under the strip is marked current.
    useGSAP(() => {
        const triggers = LINKS.map(({ id }) =>
            ScrollTrigger.create({
                trigger: `#${id}`,
                start: "top 40%",
                end: "bottom 40%",
                onToggle: (self) => {
                    if (self.isActive) setCurrent(id);
                    else setCurrent((c) => (c === id ? null : c));
                },
            }),
        );
        return () => triggers.forEach((t) => t.kill());
    });

    // The strip's bottom rule doubles as a plot of how far down the sheet
    // you are: ticked forward in steps for QA, drawn continuously for Frontend.
    useGSAP(
        () => {
            const fill = strip.current?.querySelector(".strip__progress span");
            if (!fill) return;
            const qa = persona === "qa";
            gsap.fromTo(
                fill,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: qa && !prefersReduced() ? "steps(60)" : "none",
                    scrollTrigger: {
                        start: 0,
                        end: "max",
                        scrub: qa || prefersReduced() ? true : 0.8,
                    },
                },
            );
        },
        { scope: strip, dependencies: [persona], revertOnUpdate: true },
    );

    // One marker slides between section links as the page scrolls.
    useLayoutEffect(() => {
        const m = marker.current;
        const nav = navRef.current;
        if (!m || !nav) return;
        const link = current
            ? nav.querySelector<HTMLElement>(`a[href="#${current}"]`)
            : null;
        const reduced = prefersReduced();
        if (!link) {
            gsap.to(m, { opacity: 0, duration: reduced ? 0 : 0.2 });
            return;
        }
        const to = { x: link.offsetLeft, width: link.offsetWidth, opacity: 1 };
        const shown = Number(gsap.getProperty(m, "opacity")) > 0;
        if (reduced || !shown) {
            gsap.set(m, to);
            return;
        }
        gsap.to(
            m,
            persona === "qa"
                ? { ...to, duration: 0.35, ease: "plot" }
                : { ...to, duration: 0.8, ease: "elastic.out(1, 0.7)" },
        );
    }, [current, persona]);

    // The theme icon arrives turning, when the visitor flips it.
    const prevDark = useRef(isDark);
    useGSAP(
        () => {
            if (prevDark.current === isDark) return;
            prevDark.current = isDark;
            if (!userToggled.current || prefersReduced()) return;
            userToggled.current = false;
            const svg = iconBtn.current?.querySelector("svg");
            if (!svg) return;
            gsap.fromTo(
                svg,
                { rotate: isDark ? -120 : 70, scale: 0.4 },
                { rotate: 0, scale: 1, duration: 0.7, ease: "curve" },
            );
            if (isDark)
                gsap.fromTo(
                    svg.querySelectorAll("path"),
                    { drawSVG: "50% 50%" },
                    { drawSVG: "0% 100%", duration: 0.5, ease: "plot", delay: 0.15 },
                );
        },
        { dependencies: [isDark] },
    );

    return (
        <header ref={strip} className="strip">
            <div className="shell strip__row">
                <a href="#top" className="wordmark">
                    Ose Oziegbe
                </a>

                <nav ref={navRef} className="strip__nav" aria-label="Sections">
                    {LINKS.map((l) => (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            className="navlink"
                            aria-current={current === l.id ? "true" : undefined}
                        >
                            {l.label}
                        </a>
                    ))}
                    {/* <a
                        href={portfolio.social.resume}
                        className="navlink"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Résumé ↗
                    </a> */}
                    <span ref={marker} className="strip__marker" aria-hidden="true" />
                </nav>

                <div className="strip__controls">
                    <button
                        ref={iconBtn}
                        type="button"
                        onClick={(e) => {
                            userToggled.current = true;
                            toggleDark(e);
                        }}
                        className="icon-btn"
                        aria-label={
                            isDark
                                ? "Switch to light theme"
                                : "Switch to dark theme"
                        }
                        aria-pressed={isDark}
                    >
                        {isDark ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <PersonaToggle value={persona} onChange={setPersona} />
                </div>
            </div>
            <div className="strip__progress" aria-hidden="true">
                <span />
            </div>
        </header>
    );
}

function SunIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="square"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="4.25" />
            <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
        </svg>
    );
}
