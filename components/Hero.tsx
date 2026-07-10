"use client";

import { useEffect, useRef } from "react";
import { portfolio, type Persona } from "@/lib/portfolio";

type Props = { persona: Persona; accent: string };

export function Hero({ persona, accent }: Props) {
    const h1Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!h1Ref.current) return;
        h1Ref.current.classList.remove("is-in");
        const t = setTimeout(() => h1Ref.current?.classList.add("is-in"), 80);
        return () => clearTimeout(t);
    }, [persona]);

    const { role, headline, heroBio } = portfolio.taglines[persona];
    const chips = portfolio.skills[persona];
    const year = new Date().getFullYear();

    return (
        <section className="relative overflow-hidden px-4 pt-8 pb-6 sm:px-6 sm:pt-12 sm:pb-8 md:px-8 md:pt-16 lg:px-12 lg:pt-20 lg:pb-10">
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-soft/60 px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[.05em] text-muted sm:mb-8 sm:px-[14px] sm:py-[10px] sm:text-[11px] sm:tracking-[.06em] md:mb-10">
                    <span
                        className="ed-hero-tag-dot"
                        style={{ background: accent }}
                    />
                    <span>
                        {role} · Available for select projects · {year}
                    </span>
                </div>

                <h1
                    ref={h1Ref}
                    className="ed-h1 m-0 font-serif leading-[.96] tracking-[-0.025em]"
                    style={{ fontSize: "clamp(40px, 12vw, 200px)" }}
                >
                    {headline.map((w, i) =>
                        typeof w === "string" ? (
                            <span key={i} className="ed-h1-word">
                                {w}{" "}
                            </span>
                        ) : (
                            <span
                                key={i}
                                className="ed-h1-word ed-h1-em"
                                style={{ color: accent }}
                            >
                                {w.em}
                            </span>
                        ),
                    )}
                </h1>

                <div className="mt-8 flex flex-col items-stretch gap-6 sm:mt-10 md:mt-12 md:flex-wrap md:items-end md:justify-between lg:mt-14 lg:flex-row">
                    <p className="max-w-[55ch] font-sans text-[15px] leading-[1.5] text-muted sm:text-base md:text-[17px] lg:text-[18px]">
                        {heroBio}
                    </p>

                    <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                        <a
                            href="#contact"
                            className="ed-btn inline-flex cursor-none items-center justify-center gap-[10px] rounded-full px-5 py-3.5 font-sans text-sm font-medium text-white transition-[transform,box-shadow] duration-200 ease-out sm:px-6 sm:py-4"
                            style={{ background: accent }}
                            data-hover
                        >
                            Start a project
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <path
                                    d="M3 11L11 3M11 3H5M11 3V9"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </a>
                        <a
                            href="#work"
                            className="ed-btn ed-btn-ghost inline-flex cursor-none items-center justify-center gap-[10px] rounded-full border border-ink px-5 py-3.5 font-sans text-sm font-medium text-ink transition-[transform,background-color,color] duration-200 ease-out sm:px-6 sm:py-4"
                            data-hover
                        >
                            See selected work
                        </a>
                    </div>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="mt-12 overflow-hidden border-y border-line py-4 sm:mt-16 sm:py-5 md:mt-20 md:py-6"
            >
                <div className="ed-marquee-track flex gap-7 sm:gap-9 md:gap-12">
                    {[...chips, ...chips, ...chips].map((c, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-4 whitespace-nowrap font-serif italic sm:gap-5 md:gap-6"
                            style={{
                                fontSize: "clamp(32px, 8vw, 80px)",
                                lineHeight: 1,
                            }}
                        >
                            {c.name}
                            <span
                                className="inline-block h-3 w-3 rounded-full sm:h-4 sm:w-4"
                                style={{ background: accent }}
                            />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
