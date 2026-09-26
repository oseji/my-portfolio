"use client";

// components/Projects.tsx
import { useState } from "react";
import { portfolio, type Persona } from "@/lib/portfolio";
import { SectionHead } from "./SectionHead";
import { FEPlate, QACase, normalize } from "./ProjectCard";

type Props = { persona: Persona };

export function Projects({ persona }: Props) {
    const projects = portfolio.projects[persona];
    const qa = persona === "qa";

    // Trace a tool across the projects. Stored with its persona so a
    // switch clears it without an effect.
    const [traced, setTraced] = useState<{ p: Persona; key: string; name: string } | null>(null);
    const trace = traced?.p === persona ? traced.key : null;

    const onTrace = (name: string) => {
        const key = normalize(name);
        setTraced((t) => (t?.p === persona && t.key === key ? null : { p: persona, key, name }));
    };

    const matches = trace
        ? projects.filter((p) => p.stack.some((s) => normalize(s) === trace)).length
        : 0;

    return (
        <section
            id="work"
            className="shell sec"
            aria-labelledby="work-title"
            onKeyDown={(e) => e.key === "Escape" && setTraced(null)}
        >
            <SectionHead
                id="work-title"
                swapKey={persona}
                title={qa ? "Tests, automated." : "Interfaces, shipped."}
                sub={
                    qa
                        ? "Automation I've written from scratch, covering UI flows, API calls, and the stuff in between."
                        : "Frontend builds across fintech, media, SaaS, and utilities."
                }
            />

            <p className="trace-note t-label" aria-live="polite">
                {trace && traced
                    ? `${traced.name}: in ${matches} of ${projects.length} projects. Select it again or press Esc to clear.`
                    : "Select any tool to trace it across the projects."}
            </p>

            <div className={`work${trace ? " is-tracing" : ""}`} data-swap key={persona}>
                {projects.map((p, i) => {
                    const match = !!trace && p.stack.some((s) => normalize(s) === trace);
                    const Card = qa ? QACase : FEPlate;
                    return (
                        <Card
                            key={p.id}
                            project={p}
                            index={i}
                            match={match}
                            trace={trace}
                            onTrace={onTrace}
                        />
                    );
                })}
            </div>
        </section>
    );
}
