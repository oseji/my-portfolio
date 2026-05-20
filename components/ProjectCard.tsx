"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Project } from "@/lib/portfolio";
import { ProjectMock } from "./ProjectMock";

type Props = { project: Project; index: number; accent: string };

export function ProjectCard({ project, index, accent }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
    const [isCoarse, setIsCoarse] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(hover: none), (max-width: 768px)");
        setIsCoarse(mq.matches);
        const onChange = () => setIsCoarse(mq.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const onMove = (e: MouseEvent<HTMLElement>) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setMouse({
            x: (e.clientX - r.left) / r.width,
            y: (e.clientY - r.top) / r.height,
        });
    };

    return (
        <article
            ref={ref}
            className={`ed-proj grid grid-cols-1 items-center gap-5 border-t border-line py-8 sm:gap-7 sm:py-10 md:grid-cols-[64px_1fr_1fr] md:gap-7 md:py-10 lg:grid-cols-[80px_1fr_1fr] lg:gap-10 lg:py-12 ${
                hovered ? "is-hover" : ""
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
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
                            className="rounded-full bg-[rgba(20,17,13,0.06)] px-2 py-1 font-mono text-[10px] font-medium tracking-[.04em] sm:px-2.5 sm:py-1.5 sm:text-[11px]"
                        >
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            <div className="order-1 relative md:order-none">
                <div
                    className="ed-proj-vis relative overflow-hidden rounded-xl sm:rounded-2xl"
                    style={{
                        aspectRatio: "5 / 3.2",
                        background: `linear-gradient(135deg, ${project.accent}30, ${accent}20)`,
                        transform: isCoarse
                            ? "none"
                            : `perspective(900px) rotateX(${(0.5 - mouse.y) * 6}deg) rotateY(${(mouse.x - 0.5) * 8}deg)`,
                    }}
                >
                    <ProjectMock project={project} />
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div
                            className="ed-proj-overlay absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[.04em] text-ink sm:right-4 sm:bottom-4 sm:px-3.5 sm:py-2.5 sm:text-xs"
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
