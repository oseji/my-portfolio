import { portfolio, type Persona } from "@/lib/portfolio";
import { ArrowUpRight } from "./Icons";

type Props = { persona: Persona };

// The drawing's title block. Both signatures are true; the active lens
// marks whose hand you're looking at.
export function Footer({ persona }: Props) {
    return (
        <footer className="shell">
            <div className="titleblock" data-reveal="titleblock">
                <div className="tb tb--name">
                    <span className="tb__k t-label">Title</span>
                    <span className="tb__v">{portfolio.name}</span>
                </div>
                <div className={`tb${persona === "frontend" ? " tb--lens" : ""}`}>
                    <span className="tb__k t-label">Drawn by</span>
                    <span className="tb__v">{portfolio.name}</span>
                </div>
                <div className={`tb${persona === "qa" ? " tb--lens" : ""}`}>
                    <span className="tb__k t-label">Checked by</span>
                    <span className="tb__v">{portfolio.name}</span>
                </div>
                <div className="tb">
                    <span className="tb__k t-label">Based</span>
                    <span className="tb__v">Lagos · Remote</span>
                </div>
                <div className="tb">
                    <span className="tb__k t-label">Note</span>
                    <span className="tb__v">{portfolio.footer}</span>
                </div>
                <div className="tb">
                    <span className="tb__k t-label">Issued</span>
                    <span className="tb__v">
                        © {new Date().getFullYear()} {portfolio.name}
                    </span>
                </div>
                <div className="tb tb--links">
                    <a className="link" href={portfolio.social.github} target="_blank" rel="noopener noreferrer">
                        GitHub <ArrowUpRight size={12} />
                    </a>
                    <a className="link" href={portfolio.social.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn <ArrowUpRight size={12} />
                    </a>
                    <a className="link" href={`mailto:${portfolio.social.email}`}>
                        Email <ArrowUpRight size={12} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
