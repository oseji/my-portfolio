"use client";

import { useEffect, useRef, useState } from "react";
import { portfolio, type Persona } from "@/lib/portfolio";
import { gsap, prefersReduced, useGSAP } from "@/lib/motion";
import { Words } from "./Words";
import { Magnetic } from "./Magnetic";
import { ProjectMock } from "./ProjectMock";
import { ArrowDown, ArrowUpRight } from "./Icons";

type Props = { persona: Persona };

export function Hero({ persona }: Props) {
    const root = useRef<HTMLElement>(null);
    const field = useRef<HTMLDivElement>(null);
    const dim = useRef<HTMLDivElement>(null);
    const span = useRef<HTMLDivElement>(null);
    const cursor = useRef<HTMLDivElement>(null);
    const peek = useRef<HTMLDivElement>(null);
    const played = useRef(false);

    const { role, headline, heroBio } = portfolio.taglines[persona];
    const projects = portfolio.projects[persona];
    const year = new Date().getFullYear();

    // ─── Inspect: live redlines over the headline ─────────────
    const inspect = useRef<{
        show: (w: Element, auto?: boolean) => void;
        hide: () => void;
    } | null>(null);

    useGSAP(
        () => {
            const f = field.current;
            const d = dim.current;
            const s = span.current;
            if (!f || !d || !s) return;
            const line = d.querySelector(".dim__line");
            const val = d.querySelector<HTMLElement>(".dim__val");
            let current: Element | null = null;

            const show = (w: Element) => {
                if (w === current) return;
                current = w;
                const fr = f.getBoundingClientRect();
                const r = w.getBoundingClientRect();
                const x = r.left - fr.left;
                const width = r.width;
                const label = `${Math.round(width)} px`;
                const qa = document.documentElement.dataset.persona !== "frontend";
                const reduced = prefersReduced();

                gsap.killTweensOf([d, s, line, val]);
                gsap.set(d, { x, y: r.top - fr.top - 30, width });
                if (reduced) {
                    gsap.set(d, { opacity: 1 });
                    gsap.set(s, { x, width, opacity: 1 });
                    if (val) val.textContent = label;
                    return;
                }
                if (qa) {
                    gsap.set(d, { opacity: 1 });
                    gsap.fromTo(
                        line,
                        { scaleX: 0 },
                        { scaleX: 1, duration: 0.26, ease: "plot" },
                    );
                    gsap.to(val, {
                        duration: 0.4,
                        scrambleText: { text: label, chars: "0123456789", speed: 1 },
                    });
                    gsap.to(s, { x, width, opacity: 1, duration: 0.26, ease: "plot" });
                } else {
                    if (val) val.textContent = label;
                    gsap.fromTo(d, { opacity: 0, y: "-=6" }, { opacity: 1, y: "+=6", duration: 0.5, ease: "curve" });
                    gsap.fromTo(
                        line,
                        { scaleX: 0.3 },
                        { scaleX: 1, duration: 0.7, ease: "curve" },
                    );
                    gsap.to(s, { x, width, opacity: 1, duration: 0.7, ease: "curve" });
                }
            };
            const hide = () => {
                current = null;
                gsap.killTweensOf([d, s, line, val]);
                gsap.to([d, s], { opacity: 0, duration: 0.2, ease: "none" });
            };
            inspect.current = { show, hide };
        },
        { scope: root },
    );

    // ─── Ruler cursor and project peek ────────────────────────
    const track = useRef<{
        move: (e: React.PointerEvent) => void;
        leave: () => void;
        peekShow: (id: string, e: React.PointerEvent) => void;
        peekMove: (e: React.PointerEvent) => void;
        peekHide: () => void;
    } | null>(null);

    useGSAP(
        () => {
            const f = field.current;
            const c = cursor.current;
            const root_ = root.current;
            if (!f || !c || !root_) return;
            const label = c.querySelector<HTMLElement>(".ruler__cursor-val");
            const qa = persona === "qa";
            const reduced = prefersReduced();
            const cx = gsap.quickTo(c, "x", { duration: 0.5, ease: "curve" });

            const pk = peek.current;
            const px = pk && gsap.quickTo(pk, "x", { duration: 0.6, ease: "curve" });
            const py = pk && gsap.quickTo(pk, "y", { duration: 0.6, ease: "curve" });
            const pr = pk && gsap.quickTo(pk, "rotation", { duration: 0.8, ease: "curve" });
            let lastX = 0;
            let shownId: string | null = null;

            const index = root_.querySelector(".sheet-index");
            const place = (e: React.PointerEvent, snap: boolean) => {
                if (!pk) return;
                const r = root_.getBoundingClientRect();
                // Sit left of the pointer, but never over the index itself.
                const limit = index
                    ? index.getBoundingClientRect().left - r.left - pk.offsetWidth - 24
                    : Infinity;
                let x = Math.min(e.clientX - r.left - pk.offsetWidth - 28, limit);
                let y = e.clientY - r.top - pk.offsetHeight / 2;
                if (snap) {
                    x = Math.round(x / 8) * 8;
                    y = Math.round(y / 8) * 8;
                }
                return { x, y };
            };

            track.current = {
                move: (e) => {
                    const fr = f.getBoundingClientRect();
                    let x = gsap.utils.clamp(0, fr.width, e.clientX - fr.left);
                    // The checker's cursor snaps to the ruler's ticks.
                    if (qa) x = Math.round(x / 10) * 10;
                    if (label) label.textContent = String(Math.round(x));
                    if (qa || reduced) gsap.set(c, { x });
                    else cx(x);
                    gsap.to(c, { opacity: 1, duration: 0.15, overwrite: "auto" });
                },
                leave: () => {
                    gsap.to(c, { opacity: 0, duration: 0.25 });
                },
                peekShow: (id, e) => {
                    if (!pk || reduced) return;
                    const imgs = pk.querySelectorAll<HTMLElement>(".peek__img");
                    imgs.forEach((im) =>
                        gsap.set(im, { autoAlpha: im.dataset.id === id ? 1 : 0 }),
                    );
                    const at = place(e, qa);
                    if (!shownId) {
                        gsap.set(pk, { ...at, rotation: 0 });
                        if (qa)
                            gsap.fromTo(
                                pk,
                                { autoAlpha: 1, clipPath: "inset(0 0 100% 0)" },
                                { clipPath: "inset(0 0 0% 0)", duration: 0.3, ease: "plot" },
                            );
                        else
                            gsap.fromTo(
                                pk,
                                { autoAlpha: 0, scale: 0.8 },
                                { autoAlpha: 1, scale: 1, duration: 0.5, ease: "curve" },
                            );
                    } else if (qa) {
                        // Swap the exhibit under a scan, like changing sheets.
                        gsap.fromTo(
                            pk,
                            { clipPath: "inset(0 100% 0 0)" },
                            { clipPath: "inset(0 0% 0 0)", duration: 0.22, ease: "plot" },
                        );
                    }
                    shownId = id;
                    lastX = e.clientX;
                },
                peekMove: (e) => {
                    if (!pk || !shownId || reduced) return;
                    const at = place(e, qa);
                    if (!at) return;
                    if (qa) {
                        gsap.set(pk, at);
                    } else {
                        px?.(at.x);
                        py?.(at.y);
                        pr?.(gsap.utils.clamp(-9, 9, (e.clientX - lastX) * 0.6));
                        lastX = e.clientX;
                    }
                },
                peekHide: () => {
                    if (!pk) return;
                    shownId = null;
                    gsap.to(pk, { autoAlpha: 0, duration: 0.2, ease: "none" });
                },
            };
        },
        { scope: root, dependencies: [persona], revertOnUpdate: true },
    );

    // ─── Leaving the hero ─────────────────────────────────────
    // QA: the headline recedes as one rigid plate. Frontend: its words
    // drift apart at different rates, like layers.
    useGSAP(
        () => {
            const el = root.current;
            if (!el || prefersReduced()) return;
            const $ = gsap.utils.selector(el);
            const st = { trigger: el, start: "top top", end: "bottom top" };
            if (persona === "qa") {
                gsap.to($(".headline"), {
                    y: 110,
                    opacity: 0.25,
                    ease: "none",
                    scrollTrigger: { ...st, scrub: true },
                });
            } else {
                $(".headline .wi").forEach((w, i) =>
                    gsap.to(w, {
                        y: 50 + i * 22,
                        skewY: i % 2 ? 3 : -3,
                        ease: "none",
                        scrollTrigger: { ...st, scrub: 1.2 },
                    }),
                );
                gsap.to($(".headline"), {
                    opacity: 0.3,
                    ease: "none",
                    scrollTrigger: { ...st, scrub: 1.2 },
                });
            }
        },
        { scope: root, dependencies: [persona], revertOnUpdate: true },
    );

    // Once the visitor starts measuring, the load-time demo stops steering.
    const touched = useRef(false);

    const onOver = (e: React.PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        touched.current = true;
        const w = (e.target as Element).closest(".headline .wi");
        if (w) inspect.current?.show(w);
    };

    // ─── The plot: entrance, and re-plot on persona change ─────
    useGSAP(
        () => {
            const el = root.current;
            if (!el) return;
            const ready = () =>
                document.documentElement.classList.add("motion-ready");
            if (prefersReduced()) {
                ready();
                return;
            }
            const first = !played.current;
            let cancelled = false;
            inspect.current?.hide();
            const $ = gsap.utils.selector(el);
            const qa = persona === "qa";
            const tl = gsap.timeline({ paused: true });

            gsap.set($("[data-hero]"), { visibility: "visible" });

            if (qa) {
                if (first)
                    tl.fromTo(
                        $(".ruler"),
                        { clipPath: "inset(0 100% 0 0)" },
                        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "plot" },
                        0,
                    );
                tl.fromTo(
                    $(".status"),
                    { clipPath: "inset(0 100% 0 0)" },
                    { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "plot" },
                    0.1,
                );
                $(".status > span").forEach((sp, i) =>
                    tl.to(
                        sp,
                        {
                            duration: 0.7,
                            scrambleText: {
                                text: sp.textContent ?? "",
                                chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                                speed: 0.7,
                            },
                        },
                        0.1 + i * 0.08,
                    ),
                );
                tl.fromTo(
                    $(".headline .wi"),
                    { clipPath: "inset(-10% 100% -10% 0)" },
                    {
                        clipPath: "inset(-10% 0% -10% 0)",
                        duration: 0.5,
                        ease: "plot",
                        stagger: 0.075,
                    },
                    0.25,
                )
                    .fromTo(
                        $(".headline .hl"),
                        { scaleX: 0 },
                        { scaleX: 1, duration: 0.45, ease: "plot" },
                        ">-0.05",
                    )
                    .fromTo(
                        $(".hero__bio"),
                        { clipPath: "inset(0 0 100% 0)" },
                        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "plot" },
                        "<",
                    )
                    .fromTo(
                        $(".hero__ctas > *"),
                        { clipPath: "inset(0 100% 0 0)" },
                        {
                            clipPath: "inset(0 0% 0 0)",
                            duration: 0.45,
                            ease: "plot",
                            stagger: 0.1,
                            clearProps: "clipPath",
                        },
                        "<0.2",
                    )
                    .fromTo(
                        $(".sheet-index ul"),
                        { clipPath: "inset(0 100% 0 0)" },
                        { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "plot", clearProps: "clipPath" },
                        "<",
                    )
                    .fromTo(
                        $(".sheet-index li"),
                        { clipPath: "inset(0 100% 0 0)" },
                        {
                            clipPath: "inset(0 0% 0 0)",
                            duration: 0.4,
                            ease: "plot",
                            stagger: 0.07,
                            clearProps: "clipPath",
                        },
                        "<0.1",
                    );
            } else {
                if (first)
                    tl.fromTo(
                        $(".ruler"),
                        { opacity: 0, y: -10 },
                        { opacity: 1, y: 0, duration: 1.2, ease: "curve" },
                        0,
                    );
                tl.fromTo(
                    $(".status > span"),
                    { opacity: 0, y: 14 },
                    { opacity: 1, y: 0, duration: 1, ease: "curve", stagger: 0.07 },
                    0.05,
                )
                    .fromTo(
                        $(".headline .wi"),
                        { yPercent: 118, rotate: 5, filter: "blur(8px)" },
                        {
                            yPercent: 0,
                            rotate: 0,
                            filter: "blur(0px)",
                            duration: 1.2,
                            ease: "curve",
                            stagger: 0.065,
                            clearProps: "filter",
                        },
                        0.15,
                    )
                    .fromTo(
                        $(".headline .ul path"),
                        { drawSVG: "0%" },
                        { drawSVG: "100%", duration: 1.1, ease: "curve" },
                        ">-0.7",
                    )
                    .fromTo(
                        $(".hero__bio"),
                        { opacity: 0, y: 24 },
                        { opacity: 1, y: 0, duration: 1.1, ease: "curve" },
                        "<-0.2",
                    )
                    .fromTo(
                        $(".hero__ctas > *"),
                        { opacity: 0, y: 14, scale: 0.94 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 1,
                            ease: "curve",
                            stagger: 0.09,
                            clearProps: "scale",
                        },
                        "<0.1",
                    )
                    .fromTo(
                        $(".sheet-index li, .sheet-index__label"),
                        { opacity: 0, x: -20 },
                        { opacity: 1, x: 0, duration: 1, ease: "curve", stagger: 0.07 },
                        "<",
                    );
            }

            // On first load, the redline tool demonstrates itself once on
            // the marked word, so the interaction is discoverable.
            if (first) {
                const mark =
                    el.querySelector(".headline .em .wi") ??
                    el.querySelector(".headline .wi");
                tl.call(() => !touched.current && mark && inspect.current?.show(mark, true), [], "-=0.2")
                    .call(() => !touched.current && inspect.current?.hide(), [], "+=1.8");
            } else {
                tl.timeScale(1.25);
            }

            ready();
            const play = () => {
                if (cancelled) return;
                played.current = true;
                tl.play();
            };
            if (first) {
                const fonts = document.fonts?.ready ?? Promise.resolve();
                Promise.race([fonts, new Promise((r) => setTimeout(r, 900))]).then(play);
            } else {
                play();
            }
            return () => {
                cancelled = true;
            };
        },
        { scope: root, dependencies: [persona], revertOnUpdate: true },
    );

    return (
        <section id="top" ref={root} className="hero shell" aria-labelledby="hero-title">
            <div
                ref={field}
                className="field"
                onPointerOver={onOver}
                onPointerMove={(e) => e.pointerType === "mouse" && track.current?.move(e)}
                onPointerLeave={() => {
                    inspect.current?.hide();
                    track.current?.leave();
                }}
            >
                <Ruler />
                <div ref={span} className="ruler__span" aria-hidden="true" />
                <div ref={cursor} className="ruler__cursor" aria-hidden="true">
                    <span className="ruler__cursor-val" />
                </div>

                <p className="status t-label" data-hero data-swap key={`s-${persona}`}>
                    <span>{role}</span>
                    <span>Available for select projects</span>
                    <span>{year}</span>
                    <span>Lagos · Remote</span>
                </p>

                <h1
                    id="hero-title"
                    className="headline t-display"
                    data-hero
                    data-swap
                    key={`h-${persona}`}
                >
                    <Words segs={headline} curve />
                </h1>

                <div ref={dim} className="dim" aria-hidden="true">
                    <span className="dim__ext dim__ext--l" />
                    <span className="dim__ext dim__ext--r" />
                    <span className="dim__line" />
                    <span className="dim__val" />
                </div>
            </div>

            <div className="hero__foot grid12" data-hero key={`f-${persona}`}>
                <div className="hero__lede">
                    <p className="hero__bio" data-swap>
                        {heroBio}
                    </p>
                    <div className="hero__ctas">
                        <Magnetic>
                            <a href="#contact" className="btn">
                                Start a project
                                <ArrowUpRight />
                            </a>
                        </Magnetic>
                        <a href="#work" className="btn btn--line">
                            See selected work
                            <ArrowDown className="arrow arrow--down" />
                        </a>
                    </div>
                </div>

                <nav className="sheet-index" aria-label="Selected work" data-swap>
                    <p className="sheet-index__label t-label">Selected work</p>
                    <ul onPointerLeave={() => track.current?.peekHide()}>
                        {projects.map((p) => (
                            <li key={p.id}>
                                <a
                                    href={`#project-${p.id}`}
                                    onPointerEnter={(e) =>
                                        e.pointerType === "mouse" && track.current?.peekShow(p.id, e)
                                    }
                                    onPointerMove={(e) =>
                                        e.pointerType === "mouse" && track.current?.peekMove(e)
                                    }
                                >
                                    <span className="sheet-index__title">{p.title}</span>
                                    <span className="sheet-index__meta t-label t-muted">
                                        {p.tag.split(" · ")[0]} · {p.year}
                                    </span>
                                    <ArrowDown size={12} className="arrow arrow--down" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div ref={peek} className="peek" aria-hidden="true">
                    {projects.map((p) => (
                        <div key={p.id} className="peek__img" data-id={p.id}>
                            <ProjectMock project={p} fill sizes="340px" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// A live pixel ruler along the top of the drawing field. The redline tool
// marks the measured span on it.
function Ruler() {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) =>
            setWidth(Math.round(entry.contentRect.width)),
        );
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const ticks = [];
    for (let x = 0; x <= width; x += 10) {
        const major = x % 100 === 0;
        const mid = x % 50 === 0;
        const h = major ? 14 : mid ? 9 : 5;
        ticks.push(
            <line key={x} x1={x + 0.5} x2={x + 0.5} y1={28 - h} y2={28} />,
        );
        if (major && x < width - 30)
            ticks.push(
                <text key={`t${x}`} x={x + 4} y={11}>
                    {x}
                </text>,
            );
    }

    return (
        <div ref={ref} className="ruler" data-hero aria-hidden="true">
            {width > 0 && (
                <svg viewBox={`0 0 ${width} 28`} preserveAspectRatio="none">
                    {ticks}
                </svg>
            )}
        </div>
    );
}
