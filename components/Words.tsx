// components/Words.tsx
// Renders a heading as masked words so the motion layer can plot them in.
// Plain strings render normally; { em } segments carry the persona's mark
// (the checker's highlighter, or the drafter's cobalt ink and curve).

import { Fragment, type ReactNode } from "react";
import type { HeadlineWord } from "@/lib/portfolio";

type Token = { text: string; em: boolean; join: boolean; last: boolean };

const PUNCT = /^[.,!?;:]+$/;

function tokenize(segs: HeadlineWord[] | string): Token[] {
    const list = typeof segs === "string" ? [segs] : segs;
    const out: Token[] = [];
    list.forEach((seg) => {
        const em = typeof seg !== "string";
        const words = (em ? seg.em : seg).split(/\s+/).filter(Boolean);
        words.forEach((text, i) =>
            out.push({
                text,
                em,
                join: em && i < words.length - 1,
                last: em && i === words.length - 1,
            }),
        );
    });
    return out;
}

type Props = {
    segs: HeadlineWord[] | string;
    // Single-word emphasis gets the drafter's curve underneath it.
    curve?: boolean;
    wordClass?: string;
};

export function Words({ segs, curve = false, wordClass = "" }: Props) {
    const tokens = tokenize(segs);
    const emCount = tokens.filter((t) => t.em).length;

    return tokens.map((t, i) => {
        const space = i > 0 && !PUNCT.test(t.text) ? " " : "";
        let node: ReactNode = (
            <span className={`w ${wordClass}`}>
                <span className="wi">{t.text}</span>
            </span>
        );
        if (t.em) {
            node = (
                <span className={`em${t.join ? " em--join" : ""}`}>
                    <span className="hl" aria-hidden="true" />
                    {node}
                    {curve && emCount === 1 && (
                        <svg
                            className="ul"
                            viewBox="0 0 100 12"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <path d="M1 8 C 22 2, 38 11, 56 6 S 86 1, 99 5" />
                        </svg>
                    )}
                </span>
            );
        }
        return (
            <Fragment key={i}>
                {space}
                {node}
            </Fragment>
        );
    });
}
