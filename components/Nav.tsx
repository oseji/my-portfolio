"use client";

import { useState } from "react";
import type { Persona } from "@/lib/portfolio";
import { ScrollTrigger, useGSAP } from "@/lib/motion";
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

    return (
        <header className="strip">
            <div className="shell strip__row">
                <a href="#top" className="wordmark">
                    Ose Oziegbe
                </a>

                <nav className="strip__nav" aria-label="Sections">
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
                </nav>

                <div className="strip__controls">
                    <button
                        type="button"
                        onClick={toggleDark}
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
