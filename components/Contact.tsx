"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { portfolio } from "@/lib/portfolio";
import { gsap, prefersReduced, useGSAP } from "@/lib/motion";
import { SectionHead } from "./SectionHead";
import { ArrowUpRight } from "./Icons";

export function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const stampRef = useRef<HTMLDivElement>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setPending(true);

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
            // Honeypot — humans never see or fill this field
            company: (form.elements.namedItem("company") as HTMLInputElement).value,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const { error: msg } = await res.json();
                throw new Error(msg ?? "Something went wrong. Try emailing me directly.");
            }

            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send. Try emailing me directly.");
        } finally {
            setPending(false);
        }
    };

    // The receipt is stamped onto the sheet.
    useGSAP(
        () => {
            const s = stampRef.current;
            if (!submitted || !s || prefersReduced()) return;
            gsap.fromTo(
                s,
                { scale: 1.7, rotate: -14, opacity: 0 },
                { scale: 1, rotate: -6, opacity: 1, duration: 0.42, ease: "settle" },
            );
        },
        { dependencies: [submitted] },
    );

    // Focusing a field wakes its label: re-lettered for QA, lifted for Frontend.
    const onFocusField = (e: React.FocusEvent<HTMLFormElement>) => {
        if (prefersReduced()) return;
        const label = (e.target as Element)
            .closest(".cell")
            ?.querySelector<HTMLElement>(".cell__label");
        if (!label || gsap.isTweening(label)) return;
        if (document.documentElement.dataset.persona === "frontend") {
            gsap.fromTo(label, { y: 5, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.55, ease: "curve" });
        } else {
            gsap.to(label, {
                duration: 0.4,
                scrambleText: { text: label.textContent ?? "", chars: "upperCase", speed: 0.9 },
            });
        }
    };

    const rows = [
        { label: "Email", value: portfolio.social.email, href: `mailto:${portfolio.social.email}` },
        { label: "GitHub", value: "@oseji", href: portfolio.social.github },
        { label: "LinkedIn", value: "Ose Oziegbe", href: portfolio.social.linkedin },
    ];

    return (
        <section id="contact" className="shell sec" aria-labelledby="contact-title">
            <SectionHead
                id="contact-title"
                swapKey="contact"
                title={["Got a project?", { em: "Let's create something amazing" }, "."]}
                sub="Open for exciting freelance & full-time opportunities. Reply within 24h, usually faster."
            />

            <div className="grid12">
                <dl className="contact__rows" data-reveal="list">
                    {rows.map((row) => (
                        <div key={row.label}>
                            <dt className="t-label">{row.label}</dt>
                            <dd>
                                <a
                                    href={row.href}
                                    className="link"
                                    {...(row.href.startsWith("http")
                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                        : {})}
                                >
                                    {row.value}
                                    <ArrowUpRight size={12} />
                                </a>
                            </dd>
                        </div>
                    ))}
                </dl>

                <form
                    onSubmit={onSubmit}
                    onFocus={onFocusField}
                    className="sheet"
                    data-reveal="cells"
                    aria-label="Contact form"
                    noValidate={false}
                >
                    {submitted ? (
                        <div className="sheet__done" role="status">
                            <div ref={stampRef} className="stamp">
                                <span className="stamp__big">Received</span>
                                <span className="t-label">Checked · {new Date().getFullYear()}</span>
                            </div>
                            <p className="t-h3" style={{ fontSize: "1.75rem" }}>
                                Message received.
                            </p>
                            <p className="t-muted" style={{ margin: 0 }}>
                                Talk soon.
                            </p>
                        </div>
                    ) : (
                        <>
                            <Field label="Your name">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Genevieve Anyanwu"
                                    autoComplete="name"
                                    required
                                    className="input"
                                />
                            </Field>
                            <Field label="Email">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@email.com"
                                    autoComplete="email"
                                    required
                                    className="input"
                                />
                            </Field>
                            <Field label="About the project" wide>
                                <textarea
                                    rows={4}
                                    name="message"
                                    placeholder="A few lines on what you're building, timeline, budget..."
                                    required
                                    className="input"
                                />
                            </Field>
                            <div className="sheet__foot">
                                <p
                                    className={error ? "sheet__error" : "sheet__note t-label"}
                                    role={error ? "alert" : undefined}
                                    style={{ margin: 0 }}
                                >
                                    {error ?? "All fields required"}
                                </p>
                                <button type="submit" disabled={pending} className="btn">
                                    {pending ? "Sending…" : "Send message"}
                                    {!pending && <ArrowUpRight />}
                                    {pending && <span className="btn__plot" aria-hidden="true" />}
                                </button>
                            </div>
                            {/* Honeypot: hidden from humans, bots fill it and get silently dropped */}
                            <input
                                type="text"
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="hp"
                            />
                        </>
                    )}
                </form>
            </div>
        </section>
    );
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: ReactNode }) {
    return (
        <label className={`cell${wide ? " cell--wide" : ""}`}>
            <span className="cell__label t-label">{label}</span>
            {children}
        </label>
    );
}
