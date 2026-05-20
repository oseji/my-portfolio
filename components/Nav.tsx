"use client";

import type { Persona } from "@/lib/portfolio";
import { PersonaToggle } from "./PersonaToggle";
import { portfolio, Portfolio } from "@/lib/portfolio";

type Props = {
    persona: Persona;
    setPersona: (p: Persona) => void;
    accent: string;
};

export function Nav({ persona, setPersona, accent }: Props) {
    return (
        <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-[color-mix(in_srgb,var(--ed-bg)_80%,transparent)] px-4 py-3 backdrop-blur-[20px] sm:gap-4 sm:px-6 sm:py-4 md:gap-6 md:px-8 md:py-5 lg:px-12 lg:py-[22px]">
            <div className="order-1 flex flex-1 items-center gap-3 sm:gap-4 md:flex-none md:gap-6">
                <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs font-medium tracking-[.02em] sm:text-sm">
                    <span
                        className="inline-block h-2 w-2 flex-none rounded-full"
                        style={{ background: accent }}
                    />
                    Ose Oziegbe
                </span>
                <span className="hidden whitespace-nowrap border-l border-line pl-6 font-mono text-[10px] font-medium uppercase leading-snug tracking-[.08em] text-muted lg:inline-block">
                    Portfolio · {new Date().getFullYear()}
                </span>
            </div>

            <nav className="order-3 -mx-4 flex w-full gap-5 overflow-x-auto px-4 pt-3 font-sans text-xs font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 sm:text-[13px] md:order-2 md:mx-0 md:w-auto md:gap-7 md:overflow-visible md:px-0 md:pt-0">
                <a
                    href="#work"
                    className="ed-nav-link whitespace-nowrap"
                    data-hover
                >
                    Work
                </a>
                <a
                    href="#about"
                    className="ed-nav-link whitespace-nowrap"
                    data-hover
                >
                    About
                </a>
                <a
                    href="#contact"
                    className="ed-nav-link whitespace-nowrap"
                    data-hover
                >
                    Contact
                </a>
                <a
                    href={portfolio.social.resume}
                    className="ed-nav-link whitespace-nowrap"
                    data-hover
                    target="_blank"
                >
                    Résumé ↗
                </a>
            </nav>

            <div className="order-2 md:order-3">
                <PersonaToggle
                    value={persona}
                    onChange={setPersona}
                    accent={accent}
                />
            </div>
        </header>
    );
}
