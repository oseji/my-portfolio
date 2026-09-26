"use client";

// components/ProjectCard.tsx
// Two presentations, because the work is two different kinds of evidence.
// QA work is a case sheet: findings and figures lead, the screenshot is an
// exhibit. Frontend work is a plate: the interface itself leads.

import { useRef, type PointerEvent } from "react";
import type { Project, Readout as ReadoutT } from "@/lib/portfolio";
import { formatStat, gsap, prefersReduced, scanPass, useGSAP } from "@/lib/motion";
import { EXHIBIT_CAPTIONS, ProjectMock } from "./ProjectMock";
import { Words } from "./Words";
import { ArrowUpRight, Tick } from "./Icons";

type TraceProps = {
    trace: string | null;
    onTrace: (name: string) => void;
};

export const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Link labels say where the link actually goes. QA "live" links are
// repositories, and their "GitHub" links are READMEs.
function linkLabel(url: string, fallback: string) {
    if (/readme/i.test(url)) return "README";
    if (/github\.com/i.test(url)) return fallback === "Live site" ? "Repository" : "Source";
    return fallback;
}

function Links({ project }: { project: Project }) {
    const links = [
        { href: project.liveLink, label: linkLabel(project.liveLink, "Live site") },
        { href: project.githubLink, label: linkLabel(project.githubLink, "Source") },
    ];
    return (
        <div className="links">
            {links.map((l) => (
                <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label={`${project.title}: ${l.label} (opens in a new tab)`}
                >
                    {l.label}
                    <ArrowUpRight size={12} />
                </a>
            ))}
        </div>
    );
}

function Tags({ project, trace, onTrace }: { project: Project } & TraceProps) {
    return (
        <ul className="tags" aria-label={`${project.title} stack`}>
            {project.stack.map((s) => {
                const on = trace === normalize(s);
                return (
                    <li key={s}>
                        <button
                            type="button"
                            className="tag"
                            aria-pressed={on}
                            onClick={() => onTrace(s)}
                        >
                            {s}
                            <span className="tag__tick" aria-hidden="true">
                                <Tick />
                            </span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

// Readouts restate what the blurb already says, in the form a reviewer
// would scan for: what was covered, how the suite walks, what it counted.
function Readout({ r }: { r: ReadoutT }) {
    if (r.kind === "coverage") {
        return (
            <div className="readout">
                <span className="readout__label t-label">Flows covered</span>
                <ul className="cov" data-reveal="coverage">
                    {r.items.map((item) => (
                        <li key={item}>
                            <svg viewBox="0 0 18 18" aria-hidden="true">
                                <rect className="box" x="0.625" y="0.625" width="16.75" height="16.75" />
                                <path className="tick" d="M4.5 9.5 7.5 12.5 13.5 5" />
                            </svg>
                            <span className="cov__t">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    const figs = (
        <dl className="figs" data-reveal="figures">
            {r.stats.map((s) => (
                <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>
                        <span data-count={s.value} data-prefix={s.prefix ?? ""}>
                            {formatStat(s.value, s.prefix)}
                        </span>
                    </dd>
                </div>
            ))}
        </dl>
    );

    if (r.kind === "figures") {
        return (
            <div className="readout">
                <span className="readout__label t-label">Scope</span>
                {figs}
            </div>
        );
    }

    return (
        <div className="readout">
            <span className="readout__label t-label">Booking lifecycle</span>
            <div className="flow-wrap" data-reveal="flow">
                <span className="flow__line" aria-hidden="true" />
                <ol className="flow">
                    {r.steps.map((s) => (
                        <li key={s}>
                            <span className="flow__node" aria-hidden="true" />
                            <span>{s}</span>
                        </li>
                    ))}
                </ol>
            </div>
            {figs}
            <p className="finding" data-reveal="finding">
                <span className="finding__tab t-label">Finding</span>
                <span>
                    {r.finding.split(/(\b[A-Z]{3,}\b|\b\d{3}\b)/).map((part, i) =>
                        /^([A-Z]{3,}|\d{3})$/.test(part) ? (
                            <code key={i}>{part}</code>
                        ) : (
                            part
                        ),
                    )}
                </span>
            </p>
        </div>
    );
}

type CardProps = { project: Project; index: number; match: boolean } & TraceProps;

export function QACase({ project, match, trace, onTrace }: CardProps) {
    const onEnter = (e: PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "mouse" || prefersReduced()) return;
        const scan = e.currentTarget.querySelector(".exhibit__scan");
        if (scan && !gsap.isTweening(scan)) scanPass(scan, 0.8);
    };

    return (
        <article
            id={`project-${project.id}`}
            className={`case grid12 work-item${match ? " is-match" : ""}`}
            aria-labelledby={`t-${project.id}`}
        >
            <span className="rule" data-reveal="rule" aria-hidden="true" />
            <h3 id={`t-${project.id}`} className="case__title t-h3 work-dim" data-reveal="words">
                <Words segs={project.title} />
            </h3>
            <dl className="case__meta t-label work-dim" data-reveal="fade">
                <div>
                    <dt>Type</dt>
                    <dd>{project.tag}</dd>
                </div>
                <div>
                    <dt>Year</dt>
                    <dd>{project.year}</dd>
                </div>
            </dl>

            <div className="case__text">
                <p className="case__blurb work-dim" data-reveal="fade">
                    {project.blurb}
                </p>
                <div className="work-dim">{project.readout && <Readout r={project.readout} />}</div>
                <Tags project={project} trace={trace} onTrace={onTrace} />
                <Links project={project} />
            </div>

            <figure className="case__exhibit work-dim" data-reveal="exhibit" onPointerEnter={onEnter}>
                <div className="exhibit__frame">
                    <ProjectMock project={project} />
                    <span className="exhibit__scan" aria-hidden="true" />
                </div>
                <figcaption className="exhibit__cap t-label">
                    <span>Exhibit · {EXHIBIT_CAPTIONS[project.id] ?? "Screenshot"}</span>
                </figcaption>
            </figure>
        </article>
    );
}

export function FEPlate({ project, index, match, trace, onTrace }: CardProps) {
    const media = useRef<HTMLAnchorElement>(null);
    const follow = useRef<{ move: (e: PointerEvent) => void; enter: () => void; leave: () => void } | null>(null);

    useGSAP(
        () => {
            const el = media.current;
            const tip = el?.querySelector(".plate__tip");
            if (!el || !tip) return;
            const xTo = gsap.quickTo(tip, "x", { duration: 0.55, ease: "curve" });
            const yTo = gsap.quickTo(tip, "y", { duration: 0.55, ease: "curve" });
            follow.current = {
                move: (e) => {
                    const r = el.getBoundingClientRect();
                    xTo(e.clientX - r.left + 16);
                    yTo(e.clientY - r.top + 16);
                },
                enter: () => {
                    if (prefersReduced()) return;
                    gsap.to(tip, { opacity: 1, scale: 1, duration: 0.4, ease: "curve" });
                },
                leave: () => {
                    gsap.to(tip, { opacity: 0, scale: 0.85, duration: 0.25, ease: "power2.in" });
                },
            };
            gsap.set(tip, { scale: 0.85, transformOrigin: "0 0" });
        },
        { scope: media },
    );

    return (
        <article
            id={`project-${project.id}`}
            className={`plate grid12 work-item${index % 2 ? " plate--flip" : ""}${match ? " is-match" : ""}`}
            aria-labelledby={`t-${project.id}`}
        >
            <span className="rule" data-reveal="rule" aria-hidden="true" />
            <a
                ref={media}
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="plate__media work-dim"
                aria-label={`${project.title}: live site (opens in a new tab)`}
                data-reveal="plate"
                onPointerMove={(e) => e.pointerType === "mouse" && follow.current?.move(e)}
                onPointerEnter={(e) => e.pointerType === "mouse" && follow.current?.enter()}
                onPointerLeave={() => follow.current?.leave()}
            >
                <div className="plate__frame">
                    <div className="plate__img">
                        <ProjectMock project={project} fill />
                    </div>
                </div>
                <span className="plate__tip" aria-hidden="true">
                    Visit live site <ArrowUpRight size={12} />
                </span>
            </a>
            <div className="plate__text">
                <h3 id={`t-${project.id}`} className="plate__title t-h3 work-dim" data-reveal="words">
                    <Words segs={project.title} />
                </h3>
                <p className="plate__meta t-label work-dim" data-reveal="fade">
                    {project.tag} · {project.year}
                </p>
                <p className="plate__blurb work-dim" data-reveal="fade">
                    {project.blurb}
                </p>
                <Tags project={project} trace={trace} onTrace={onTrace} />
                <Links project={project} />
            </div>
        </article>
    );
}
