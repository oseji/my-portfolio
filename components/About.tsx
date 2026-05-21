import { portfolio, type Persona, type Skill } from "@/lib/portfolio";
import { SectionHead } from "./SectionHead";
import profilePicture from "../public/IMG_5571.jpeg";
import Image from "next/image";

type Props = { persona: Persona; accent: string };

const GROUP_LABELS: Record<Persona, Record<string, string>> = {
    frontend: { core: "Core stack", state: "State & data", ui: "UI & motion" },
    qa: { tools: "Tooling", methods: "Methods" },
};

export function About({ persona, accent }: Props) {
    const bio =
        persona === "frontend"
            ? portfolio.taglines.frontend.bio
            : portfolio.taglines.qa.bio;
    const skills =
        persona === "frontend"
            ? portfolio.skills.frontend
            : portfolio.skills.qa;

    const sentences = bio.split(". ").filter(Boolean);
    const half = Math.ceil(sentences.length / 2);
    const col1 = sentences.slice(0, half).join(". ") + ".";
    const col2 =
        sentences.slice(half).join(". ") + (sentences.length > half ? "." : "");

    const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
        (acc[s.group] = acc[s.group] || []).push(s);
        return acc;
    }, {});

    return (
        <section
            id="about"
            className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-32"
        >
            <SectionHead
                index="02 / About"
                eyebrow="The person behind the work"
                title={
                    persona === "frontend" ? (
                        <>
                            A frontend developer with a{" "}
                            <em className="italic" style={{ color: accent }}>
                                tester's eye.
                            </em>
                        </>
                    ) : (
                        <>
                            A QA engineer with a{" "}
                            <em className="italic" style={{ color: accent }}>
                                frontend developer's
                            </em>{" "}
                            DNA.
                        </>
                    )
                }
                sub={
                    persona === "frontend"
                        ? "Building interfaces with precision and an eye for what breaks. Clean code, tested instincts."
                        : "Testing software with precision and purpose. Automation enthusiast who understands both sides of the code."
                }
                accent={accent}
                className="ed-reveal"
            />

            <div className="ed-reveal grid grid-cols-1 items-start gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
                <div className="max-w-sm lg:max-w-none">
                    <div
                        className="rounded border bg-white/50 px-3.5 pt-3.5 pb-0"
                        style={{ borderColor: accent, borderWidth: "0.5px" }}
                    >
                        <div
                            className="relative overflow-hidden rounded-sm"
                            style={{ aspectRatio: "4 / 5" }}
                        >
                            <Image
                                src={profilePicture}
                                alt="Ose Oziegbe"
                                fill
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 35vw"
                                className="object-cover"
                                placeholder="blur"
                            />
                        </div>
                        <div className="flex justify-between px-1 py-3 font-mono text-[11px] font-medium uppercase leading-none tracking-[.04em] text-muted">
                            <span>Ose Oziegbe</span>
                            <span>Lagos · Remote</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p
                        className="m-0 mb-6 font-serif font-normal leading-[1.18] tracking-[-0.01em] sm:mb-8 md:mb-10"
                        style={{ fontSize: "clamp(22px, 5.5vw, 42px)" }}
                    >
                        "I write code, then I try to break it.{" "}
                        <em className="italic" style={{ color: accent }}>
                            Both jobs make the other one better.
                        </em>
                        "
                    </p>

                    <div className="columns-1 gap-8 sm:gap-10 md:columns-2">
                        <p className="m-0 mb-4 break-inside-avoid font-sans text-[15px] leading-[1.6] text-ink sm:text-base">
                            {col1}
                        </p>
                        <p className="m-0 mb-4 break-inside-avoid font-sans text-[15px] leading-[1.6] text-ink sm:text-base">
                            {col2}
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:mt-10 sm:gap-6 sm:pt-7 md:mt-12 md:gap-7 md:pt-8">
                        {Object.keys(grouped).map((g) => (
                            <div
                                key={g}
                                className="grid grid-cols-1 items-start gap-3 sm:gap-4 md:grid-cols-[140px_1fr] md:gap-6"
                            >
                                <div className="pt-1.5 font-mono text-[11px] font-medium uppercase leading-snug tracking-[.08em] text-muted">
                                    {GROUP_LABELS[persona][g] ?? g}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {grouped[g].map((s) => (
                                        <span
                                            key={s.name}
                                            className="ed-skill rounded-full bg-[rgba(20,17,13,0.06)] px-3 py-1.5 font-mono text-[11px] font-medium sm:px-3.5 sm:py-2 sm:text-xs"
                                        >
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
