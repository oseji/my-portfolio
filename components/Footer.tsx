import { portfolio } from "@/lib/portfolio";

type Props = { accent: string };

export function Footer({ accent }: Props) {
    return (
        <footer className="border-t border-line px-4 py-6 sm:px-6 sm:py-7 md:px-8 lg:px-12 lg:py-8">
            <div className="mx-auto flex max-w-[1600px] flex-col flex-wrap items-center justify-between gap-5 sm:flex-row sm:gap-8 md:gap-10">
                <div className="font-serif text-2xl font-normal sm:text-3xl">
                    Ose<span style={{ color: accent }}>.</span>
                </div>
                <div className="flex flex-col gap-1 text-center font-mono text-[10px] font-medium uppercase leading-snug tracking-[.04em] text-muted sm:text-[11px]">
                    <span>© {new Date().getFullYear()} Ose Oziegbe</span>
                    <span>{portfolio.footer}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 font-mono text-[11px] font-medium sm:gap-6 sm:text-xs">
                    <a href={portfolio.social.github} data-hover>
                        GitHub ↗
                    </a>
                    <a href={portfolio.social.linkedin} data-hover>
                        LinkedIn ↗
                    </a>
                    <a href={`mailto:${portfolio.social.email}`} data-hover>
                        Email ↗
                    </a>
                </div>
            </div>
        </footer>
    );
}
