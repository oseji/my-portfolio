"use client";

import { useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import type { Project } from "@/lib/portfolio";
import { ProjectMock } from "./ProjectMock";

type Props = { project: Project; index: number; accent: string };

// Coarse pointers and small screens get no 3D tilt.
const COARSE_QUERY = "(hover: none), (max-width: 768px)";

function subscribeCoarse(onChange: () => void) {
    const mq = window.matchMedia(COARSE_QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
}

function getIsCoarse() {
    return window.matchMedia(COARSE_QUERY).matches;
}

export function ProjectCard({ project, index, accent }: Props) {
    const ref = useRef<HTMLElement>(null);
    const visRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const isCoarse = useSyncExternalStore(
        subscribeCoarse,
        getIsCoarse,
        () => true,
    );

    // Tilt is written straight to the DOM so mouse movement doesn't
    // re-render the card on every pixel.
    const onMove = (e: MouseEvent<HTMLElement>) => {
        if (isCoarse || !ref.current || !visRef.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        visRef.current.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg)`;
    };

    const onLeave = () => {
        setHovered(false);
        if (visRef.current) visRef.current.style.transform = "";
    };

    return (
        <article
            ref={ref}
            className={`ed-proj grid grid-cols-1 items-center gap-5 border-t border-line py-8 sm:gap-7 sm:py-10 md:grid-cols-[64px_1fr_1fr] md:gap-7 md:py-10 lg:grid-cols-[80px_1fr_1fr] lg:gap-10 lg:py-12 ${
                hovered ? "is-hover" : ""
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={onLeave}
            onMouseMove={onMove}
            data-hover
        >
            <div className="order-2 hidden pt-2 font-mono text-xs font-medium text-muted md:order-none md:block">
                {String(index + 1).padStart(2, "0")}
            </div>

            <div className="order-3 flex flex-col gap-3 md:order-none">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[.08em] text-muted sm:text-[11px]">
                    <span className="md:hidden">
                        {String(index + 1).padStart(2, "0")} ·{" "}
                    </span>
                    {project.tag} · {project.year}
                </span>
                <h3
                    className="ed-proj-title m-0 font-serif font-normal leading-none tracking-[-0.02em]"
                    style={{ fontSize: "clamp(28px, 7vw, 60px)" }}
                >
                    {project.title}
                </h3>
                <p className="mt-1 mb-2 max-w-[50ch] font-sans text-sm leading-[1.5] text-muted sm:text-[15px] sm:mb-3">
                    {project.blurb}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                        <span
                            key={s}
                            className="rounded-full bg-chip px-2 py-1 font-mono text-[10px] font-medium tracking-[.04em] sm:px-2.5 sm:py-1.5 sm:text-[11px]"
                        >
                            {s}
                        </span>
                    ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-2.5">
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover
                        className="ed-btn inline-flex cursor-none items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[.06em] text-white transition-[transform,box-shadow] duration-200 ease-out sm:text-[11px]"
                        style={{ background: accent }}
                    >
                        Live site
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M3 11L11 3M11 3H5M11 3V9"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </svg>
                    </a>
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover
                        aria-label={`${project.title} GitHub repository`}
                        className="ed-btn ed-btn-ghost inline-flex cursor-none items-center gap-2 rounded-full border border-ink px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[.06em] text-ink transition-[transform,background-color,color] duration-200 ease-out sm:text-[11px]"
                    >
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>

            <div className="order-1 relative md:order-none">
                <div
                    ref={visRef}
                    className="ed-proj-vis relative overflow-hidden rounded-xl sm:rounded-2xl"
                    style={{
                        aspectRatio: "16 / 9",
                        background: `linear-gradient(135deg, ${project.accent}30, ${accent}20)`,
                    }}
                >
                    <ProjectMock project={project} />
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title}`}
                    >
                        <div
                            className="ed-proj-overlay absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[.04em] text-[#14110d] sm:right-4 sm:bottom-4 sm:px-3.5 sm:py-2.5 sm:text-xs"
                            style={{ borderColor: accent }}
                        >
                            <span>View project</span>
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
                        </div>
                    </a>
                </div>
            </div>
        </article>
    );
}
