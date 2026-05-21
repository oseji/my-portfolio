// components/Projects.tsx
import { portfolio, type Persona } from "@/lib/portfolio";
import { SectionHead } from "./SectionHead";
import { ProjectCard } from "./ProjectCard";

type Props = {
    persona: Persona;
    accent: string;
};

export function Projects({ persona, accent }: Props) {
    const projects =
        persona === "frontend"
            ? portfolio.projects.frontend
            : portfolio.projects.qa;

    return (
        <section
            id="work"
            className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-32"
        >
            <SectionHead
                className="ed-reveal"
                index="01 / Selected work"
                eyebrow={
                    persona === "frontend"
                        ? "Frontend builds"
                        : "Quality assurance suites"
                }
                title={
                    persona === "frontend"
                        ? "Interfaces, shipped."
                        : "Tests, automated."
                }
                sub={
                    persona === "frontend"
                        ? "Dynamic web applications built with React, Next.js, TypeScript, and TailwindCSS."
                        : "Automated regression suites powered by modern testing frameworks."
                }
                accent={accent}
            />

            <div className="ed-reveal flex flex-col [&>article:last-child]:border-b [&>article:last-child]:border-line">
                {projects.map((p, i) => (
                    <ProjectCard
                        key={p.id}
                        project={p}
                        index={i}
                        accent={accent}
                    />
                ))}
            </div>
        </section>
    );
}
