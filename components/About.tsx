"use client";

import { useRef } from "react";
import Image from "next/image";
import { portfolio, type Persona, type Skill } from "@/lib/portfolio";
import { fracture, prefersReduced } from "@/lib/motion";
import { SectionHead } from "./SectionHead";
import profilePicture from "@/assets/portrait.jpeg";

type Props = { persona: Persona };

const GROUP_LABELS: Record<Persona, Record<string, string>> = {
    frontend: { core: "Core stack", state: "State & data", ui: "UI & motion" },
    qa: { automation: "Automation", api: "API & Backend", methods: "Methods" },
};

export function About({ persona }: Props) {
    const { bio } = portfolio.taglines[persona];
    const skills = portfolio.skills[persona];
    const brk = useRef<HTMLSpanElement>(null);

    const sentences = bio.split(". ").filter(Boolean);
    const half = Math.ceil(sentences.length / 2);
    const close = (t: string) => (t && !/[.!?]$/.test(t) ? t + "." : t);
    const col1 = close(sentences.slice(0, half).join(". "));
    const col2 = close(sentences.slice(half).join(". "));

    const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
        (acc[s.group] = acc[s.group] || []).push(s);
        return acc;
    }, {});

    // Hovering "break it" breaks it again.
    const rebreak = () => {
        const el = brk.current;
        if (!el || prefersReduced()) return;
        const a = el.querySelector(".brk__a");
        const b = el.querySelector(".brk__b");
        if (a && b) fracture(a, b, persona);
    };

    return (
        <section id="about" className="shell sec" aria-labelledby="about-title">
            <SectionHead
                id="about-title"
                swapKey={persona}
                title={
                    persona === "frontend"
                        ? ["A frontend developer with a", { em: "tester's eye." }]
                        : ["A QA engineer with a", { em: "frontend developer's" }, "DNA."]
                }
                sub={
                    persona === "frontend"
                        ? "I care as much about how an interface feels as how it works. Clean code, tested instincts, and I don't ship things I wouldn't want to use myself."
                        : "Having built UIs before means I know where most bugs tend to come from. I automate what I can, but I make sure I understand what's actually failing before I write a single test."
                }
            />

            <div className="about grid12">
                <figure className="about__photo" data-reveal="photo">
                    <div className="photo__frame">
                        <Image
                            src={profilePicture}
                            alt="Ose Oziegbe"
                            fill
                            sizes="(max-width: 767px) 90vw, (max-width: 1023px) 40vw, 30vw"
                            placeholder="blur"
                        />
                    </div>
                    <figcaption className="t-label">
                        <span>Ose Oziegbe</span>
                        <span>Lagos · Remote</span>
                    </figcaption>
                </figure>

                <div className="about__main">
                    <blockquote className="quote" data-reveal="quote">
                        <span className="w"><span className="wi">&ldquo;I write code,</span></span>{" "}
                        <span className="w"><span className="wi">then I try to</span></span>{" "}
                        <span
                            ref={brk}
                            className="brk"
                            onPointerEnter={(e) => e.pointerType === "mouse" && rebreak()}
                        >
                            <span className="w">
                                <span className="wi brk__wi">
                                    <span className="brk__a">break it.</span>
                                    <span className="brk__b" aria-hidden="true">
                                        break it.
                                    </span>
                                </span>
                            </span>
                        </span>{" "}
                        <span className="second">
                            <span className="w"><span className="wi">Both jobs make the</span></span>{" "}
                            <span className="w"><span className="wi">other one better.&rdquo;</span></span>
                        </span>
                    </blockquote>

                    <div className="about__bio" data-reveal="fade" data-swap key={`b-${persona}`}>
                        <p>{col1}</p>
                        <p>{col2}</p>
                    </div>

                    <div className="parts" data-swap key={`p-${persona}`}>
                        <p className="parts__cap t-label">Tools I work with</p>
                        <dl data-reveal="list">
                            {Object.keys(grouped).map((g) => (
                                <div key={g} className="parts__row">
                                    <dt className="t-label">{GROUP_LABELS[persona][g] ?? g}</dt>
                                    <dd>
                                        <ul>
                                            {grouped[g].map((s) => (
                                                <li key={s.name} className="part">
                                                    <span className="part__hl">{s.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
