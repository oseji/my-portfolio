import type { ReactNode } from "react";

type Props = {
    index: string;
    eyebrow: string;
    title: ReactNode;
    sub?: ReactNode;
    accent: string;
};

export function SectionHead({ index, eyebrow, title, sub, accent }: Props) {
    return (
        <header className="mb-10 grid grid-cols-1 items-end gap-5 sm:mb-14 sm:gap-8 md:mb-16 md:grid-cols-[1fr_2fr] md:gap-10 lg:mb-20 lg:gap-12">
            <div className="flex flex-col gap-2">
                <span
                    className="font-mono text-sm font-medium tracking-[.04em]"
                    style={{ color: accent }}
                >
                    {index}
                </span>
                <span className="font-mono text-[11px] font-medium uppercase leading-snug tracking-[.08em] text-muted">
                    {eyebrow}
                </span>
            </div>

            <div>
                <h2
                    className="m-0 font-serif font-normal leading-none tracking-[-0.02em]"
                    style={{ fontSize: "clamp(32px, 7vw, 72px)" }}
                >
                    {title}
                </h2>
                {sub && (
                    <p className="mt-3 max-w-[60ch] font-sans text-[15px] leading-[1.5] text-muted sm:mt-4 sm:text-base">
                        {sub}
                    </p>
                )}
            </div>
        </header>
    );
}
