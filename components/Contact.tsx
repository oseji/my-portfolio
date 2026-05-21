"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { portfolio } from "@/lib/portfolio";

type Props = { accent: string };

export function Contact({ accent }: Props) {
    const [submitted, setSubmitted] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setPending(true);

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
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

    return (
        <section
            id="contact"
            className="px-4 py-16 text-white sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-32"
            style={{ background: accent }}
        >
            <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-10 sm:gap-12 md:gap-14 lg:grid-cols-2 lg:gap-20">
                <div>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[.08em] opacity-80">
                        03 / Let's talk
                    </span>
                    <h2
                        className="m-0 mt-3 mb-4 font-serif font-normal leading-[.98] tracking-[-0.02em] sm:mt-4 sm:mb-6"
                        style={{ fontSize: "clamp(32px, 8vw, 80px)" }}
                    >
                        Got a project?{" "}
                        <em className="italic opacity-85">
                            Let's create something amazing
                        </em>
                        .
                    </h2>
                    <p className="m-0 mb-8 max-w-[40ch] font-sans text-[15px] leading-[1.5] opacity-90 sm:mb-10 sm:text-base md:text-[17px] lg:text-[18px]">
                        Open for exciting freelance & full-time opportunities.
                        Reply within 24h, usually faster.
                    </p>

                    <div className="flex flex-col gap-4 border-t border-white/20 pt-5 sm:pt-6">
                        {[
                            {
                                label: "Email",
                                value: portfolio.social.email,
                                href: `mailto:${portfolio.social.email}`,
                            },
                            {
                                label: "Github",
                                value: "@oseji",
                                href: portfolio.social.github,
                            },
                            {
                                label: "Linkedin",
                                value: "Ose Oziegbe",
                                href: portfolio.social.linkedin,
                            },
                        ].map((row) => (
                            <div
                                key={row.label}
                                className="grid grid-cols-[80px_1fr] gap-4 font-mono text-xs font-medium leading-snug sm:grid-cols-[100px_1fr] sm:gap-6 sm:text-[13px]"
                            >
                                <span className="text-[10px] uppercase tracking-[.04em] opacity-65 sm:text-[11px]">
                                    {row.label}
                                </span>
                                <a
                                    href={row.href}
                                    className="break-all hover:underline"
                                    data-hover
                                >
                                    {row.value}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-[20px] sm:gap-[18px] sm:p-6 md:p-8"
                >
                    {submitted ? (
                        <div className="flex flex-col items-center gap-2 p-8 text-center">
                            <div
                                className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl"
                                style={{ color: accent }}
                            >
                                ✓
                            </div>
                            <h3 className="m-0 font-serif text-3xl font-normal">
                                Message received.
                            </h3>
                            <p className="m-0 opacity-85">Talk soon.</p>
                        </div>
                    ) : (
                        <>
                            <Field label="Your name">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Genevieve Anyanwu"
                                    required
                                    className="ed-input"
                                />
                            </Field>
                            <Field label="Email">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@email.com"
                                    required
                                    className="ed-input"
                                />
                            </Field>
                            <Field label="About the project">
                                <textarea
                                    rows={3}
                                    name="message"
                                    placeholder="A few lines on what you're building, timeline, budget..."
                                    required
                                    className="ed-input resize-y"
                                />
                            </Field>
                            {error && (
                                <p className="text-center font-sans text-sm opacity-90">
                                    {error}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={pending}
                                className="mt-1.5 inline-flex cursor-none items-center justify-center gap-2.5 rounded-full bg-white p-4 font-sans text-sm font-medium transition-transform duration-200 ease-out hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{ color: accent }}
                                data-hover
                            >
                                {pending ? "Sending…" : "Send message"}
                                {!pending && (
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M3 11L11 3M11 3H5M11 3V9"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                )}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </section>
    );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="flex flex-col gap-2 font-mono text-xs font-medium uppercase tracking-[.04em] opacity-85">
            <span>{label}</span>
            {children}
        </label>
    );
}
