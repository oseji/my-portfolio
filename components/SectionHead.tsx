import type { ReactNode } from "react";
import type { HeadlineWord } from "@/lib/portfolio";
import { Words } from "./Words";

type Props = {
    id: string;
    title: HeadlineWord[] | string;
    sub?: ReactNode;
    swapKey?: string;
};

export function SectionHead({ id, title, sub, swapKey }: Props) {
    return (
        <header className="sec-head grid12">
            <span className="sec-head__rule" data-reveal="rule" aria-hidden="true" />
            <h2 id={id} className="t-h2" data-reveal="words" data-swap key={`t-${swapKey}`}>
                <Words segs={title} />
            </h2>
            {sub && (
                <p className="sec-head__sub" data-reveal="fade" data-swap key={`s-${swapKey}`}>
                    {sub}
                </p>
            )}
        </header>
    );
}
