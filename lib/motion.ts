"use client";

// lib/motion.ts
// One motion language with two grammars, named after drafting tools.
//
// Straightedge (QA): axis-aligned wipes, plotted rules, stepped counters,
// ticks that draw and stop. Even, deliberate travel that lands exactly.
//
// French curve (Frontend): curved reveals, rise with blur resolving,
// long fluid deceleration, strokes that sweep.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import type { Persona } from "./portfolio";

if (typeof window !== "undefined") {
    gsap.registerPlugin(
        ScrollTrigger,
        CustomEase,
        DrawSVGPlugin,
        ScrambleTextPlugin,
        useGSAP,
    );
    CustomEase.create("plot", "0.7,0,0.3,1");
    CustomEase.create("settle", "0.2,0.9,0.1,1");
    CustomEase.create("curve", "0.16,1,0.3,1");
}

export { gsap, ScrollTrigger, useGSAP };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED = "(prefers-reduced-motion: reduce)";

export function prefersReduced() {
    return (
        typeof window !== "undefined" && window.matchMedia(REDUCED).matches
    );
}

export function formatStat(n: number, prefix = "") {
    return prefix + Math.round(n).toLocaleString("en-GB");
}

const q = <T extends Element = HTMLElement>(el: Element, sel: string) =>
    Array.from(el.querySelectorAll<T & Element>(sel)) as T[];

type Builder = (el: HTMLElement, p: Persona) => gsap.core.Timeline;

// ─── Reveal builders ──────────────────────────────────────────
// Each returns a paused timeline whose from-state is applied immediately,
// so content below the fold is ready to be plotted when it arrives.

const words: Builder = (el, p) => {
    const tl = gsap.timeline({ paused: true });
    const inner = q(el, ".wi");
    const marks = q(el, ".em .hl");
    const curves = q<SVGPathElement>(el, ".em .ul path");
    if (p === "qa") {
        tl.fromTo(
            inner,
            { clipPath: "inset(-10% 100% -10% 0)" },
            {
                clipPath: "inset(-10% 0% -10% 0)",
                duration: 0.46,
                ease: "plot",
                stagger: 0.055,
            },
        );
        if (marks.length)
            tl.fromTo(
                marks,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 0.4,
                    ease: "plot",
                    stagger: 0.08,
                },
                "-=0.1",
            );
    } else {
        tl.fromTo(
            inner,
            { yPercent: 118, rotate: 4, filter: "blur(6px)" },
            {
                yPercent: 0,
                rotate: 0,
                filter: "blur(0px)",
                duration: 1.05,
                ease: "curve",
                stagger: 0.055,
                clearProps: "filter",
            },
        );
        if (curves.length)
            tl.fromTo(
                curves,
                { drawSVG: "0%" },
                { drawSVG: "100%", duration: 0.9, ease: "curve" },
                "-=0.55",
            );
    }
    return tl;
};

const rule: Builder = (el, p) =>
    gsap.timeline({ paused: true }).fromTo(
        el,
        { scaleX: 0 },
        p === "qa"
            ? { scaleX: 1, duration: 0.9, ease: "plot" }
            : { scaleX: 1, duration: 1.4, ease: "curve" },
    );

const fade: Builder = (el, p) =>
    gsap.timeline({ paused: true }).fromTo(
        el,
        p === "qa"
            ? { clipPath: "inset(0 0 100% 0)" }
            : { opacity: 0, y: 26 },
        p === "qa"
            ? {
                  clipPath: "inset(0 0 0% 0)",
                  duration: 0.75,
                  ease: "plot",
                  clearProps: "clipPath",
              }
            : { opacity: 1, y: 0, duration: 1, ease: "curve" },
    );

const list: Builder = (el, p) => {
    const items = Array.from(el.children) as HTMLElement[];
    return gsap.timeline({ paused: true }).fromTo(
        items,
        p === "qa"
            ? { clipPath: "inset(0 100% 0 0)" }
            : { opacity: 0, x: -18 },
        p === "qa"
            ? {
                  clipPath: "inset(0 0% 0 0)",
                  duration: 0.42,
                  ease: "plot",
                  stagger: 0.07,
                  clearProps: "clipPath",
              }
            : {
                  opacity: 1,
                  x: 0,
                  duration: 0.9,
                  ease: "curve",
                  stagger: 0.07,
              },
    );
};

// QA evidence: the screenshot feeds out of the plotter under a scan line.
const exhibit: Builder = (el) => {
    const frame = el.querySelector(".exhibit__frame");
    const scan = el.querySelector(".exhibit__scan");
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
        frame,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "plot" },
    );
    if (scan) tl.add(scanPass(scan, 1), 0);
    return tl;
};

// A scan line crosses an exhibit top to bottom (also replayed on hover).
export function scanPass(scan: Element, duration = 0.9) {
    return gsap
        .timeline()
        .fromTo(
            scan,
            { yPercent: 0, opacity: 1 },
            { yPercent: 100, duration, ease: "plot" },
        )
        .to(scan, { opacity: 0, duration: 0.2, ease: "none" });
}

// Frontend work: the plate blooms open along a curve.
const plate: Builder = (el) => {
    const frame = el.querySelector(".plate__frame");
    const img = el.querySelector(".plate__img");
    return gsap
        .timeline({ paused: true })
        .fromTo(
            frame,
            { clipPath: "inset(12% 8% 12% 8% round 28px)" },
            {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                duration: 1.4,
                ease: "curve",
                clearProps: "clipPath",
            },
        )
        .fromTo(
            img,
            { scale: 1.18 },
            { scale: 1, duration: 1.6, ease: "curve" },
            0,
        );
};

const coverage: Builder = (el, p) => {
    const rows = q(el, "li");
    const ticks = q<SVGPathElement>(el, ".tick");
    const labels = q(el, ".cov__t");
    const tl = gsap.timeline({ paused: true });
    tl.set(labels, { opacity: 0.4 }).set(ticks, { drawSVG: "0%" });
    rows.forEach((_, i) => {
        const at = p === "qa" ? i * 0.22 : i * 0.1;
        tl.to(
            ticks[i],
            {
                drawSVG: "100%",
                duration: p === "qa" ? 0.2 : 0.7,
                ease: p === "qa" ? "none" : "curve",
            },
            at,
        ).to(
            labels[i],
            {
                opacity: 1,
                duration: p === "qa" ? 0.01 : 0.5,
                ease: "none",
            },
            at + (p === "qa" ? 0.2 : 0.1),
        );
    });
    return tl;
};

const flow: Builder = (el, p) => {
    const line = el.querySelector(".flow__line");
    const nodes = q(el, ".flow__node");
    const labels = q(el, ".flow li > span:last-child");
    const tl = gsap.timeline({ paused: true });
    tl.set(line, { scaleX: 0 }).set(labels, { opacity: 0 });
    if (p === "qa") {
        // Walk the lifecycle one step at a time, like the suite does.
        nodes.forEach((node, i) => {
            if (i > 0)
                tl.to(line, {
                    scaleX: i / (nodes.length - 1),
                    duration: 0.26,
                    ease: "plot",
                });
            tl.fromTo(
                node,
                { scale: 0 },
                { scale: 1, duration: 0.12, ease: "settle" },
            ).to(labels[i], { opacity: 1, duration: 0.01 }, "<");
        });
    } else {
        tl.to(line, { scaleX: 1, duration: 1.3, ease: "curve" })
            .fromTo(
                nodes,
                { scale: 0 },
                {
                    scale: 1,
                    duration: 0.8,
                    ease: "curve",
                    stagger: 0.12,
                },
                0.05,
            )
            .to(
                labels,
                { opacity: 1, duration: 0.6, stagger: 0.12, ease: "none" },
                0.15,
            );
    }
    return tl;
};

const figures: Builder = (el, p) => {
    const nums = q(el, "[data-count]");
    const tl = gsap.timeline({ paused: true });
    nums.forEach((n, i) => {
        const to = Number(n.dataset.count);
        const prefix = n.dataset.prefix ?? "";
        const state = { v: 0 };
        n.textContent = formatStat(0, prefix);
        tl.to(
            state,
            {
                v: to,
                duration: p === "qa" ? 0.9 : 1.6,
                // The checker counts in visible increments; the drafter glides.
                ease: p === "qa" ? `steps(${Math.min(to, 20)})` : "curve",
                onUpdate: () => {
                    n.textContent = formatStat(state.v, prefix);
                },
            },
            i * (p === "qa" ? 0.12 : 0.08),
        );
    });
    return tl;
};

const finding: Builder = (el, p) =>
    p === "qa"
        ? gsap
              .timeline({ paused: true })
              .fromTo(
                  el,
                  { clipPath: "inset(0 100% 0 0)" },
                  {
                      clipPath: "inset(0 0% 0 0)",
                      duration: 0.5,
                      ease: "plot",
                      clearProps: "clipPath",
                  },
              )
              .fromTo(
                  el,
                  { scale: 1.06 },
                  { scale: 1, duration: 0.3, ease: "settle" },
                  ">-0.05",
              )
        : gsap
              .timeline({ paused: true })
              .fromTo(
                  el,
                  { opacity: 0, y: 16 },
                  { opacity: 1, y: 0, duration: 0.9, ease: "curve" },
              );

// The portrait develops like a print.
const photo: Builder = (el, p) => {
    const frame = el.querySelector(".photo__frame");
    const img = el.querySelector("img");
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
        frame,
        p === "qa"
            ? { clipPath: "inset(0 0 100% 0)" }
            : { clipPath: "inset(10% 10% 10% 10% round 40px)" },
        p === "qa"
            ? { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "plot" }
            : {
                  clipPath: "inset(0% 0% 0% 0% round 0px)",
                  duration: 1.4,
                  ease: "curve",
              },
    ).fromTo(
        img,
        { filter: "grayscale(1) contrast(1.5) brightness(1.2)" },
        {
            filter: "grayscale(0) contrast(1) brightness(1)",
            duration: 1.6,
            ease: "power1.out",
            clearProps: "filter",
        },
        0.2,
    );
    return tl;
};

const quote: Builder = (el, p) => {
    const tl = words(el, p);
    const b = el.querySelector(".brk__b");
    const a = el.querySelector(".brk__a");
    if (b && a) tl.add(fracture(a, b, p), "-=0.2");
    return tl;
};

// "…then I try to break it." The word breaks, then holds.
export function fracture(a: Element, b: Element, p: Persona) {
    const tl = gsap.timeline();
    if (p === "qa") {
        tl.set(b, { opacity: 1, x: 0 })
            .set(a, { clipPath: "inset(0 0 48% 0)" })
            .to(b, { x: 7, duration: 0.06, ease: "none" })
            .to(a, { x: -3, duration: 0.06, ease: "none" }, "<")
            .to([a, b], { x: 0, duration: 0.18, ease: "settle", delay: 0.28 })
            .set(b, { opacity: 0 })
            .set(a, { clearProps: "clipPath,transform" });
    } else {
        tl.set(b, { opacity: 1, x: 0 })
            .set(a, { clipPath: "inset(0 0 48% 0)" })
            .to(b, { x: 8, skewX: -8, duration: 0.35, ease: "curve" })
            .to(
                a,
                { x: -3, skewX: 4, duration: 0.35, ease: "curve" },
                "<",
            )
            .to([a, b], {
                x: 0,
                skewX: 0,
                duration: 0.9,
                ease: "elastic.out(1, 0.5)",
            })
            .set(b, { opacity: 0 })
            .set(a, { clearProps: "clipPath,transform" });
    }
    return tl;
}

// The form sheet is plotted cell by cell.
const cells: Builder = (el, p) => {
    const kids = q(el, ".cell, .sheet__foot");
    const labels = q(el, ".cell__label");
    const tl = gsap.timeline({ paused: true });
    if (p === "qa") {
        tl.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)" },
            {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.9,
                ease: "plot",
                clearProps: "clipPath",
            },
        );
        labels.forEach((l, i) =>
            tl.to(
                l,
                {
                    duration: 0.5,
                    scrambleText: {
                        text: l.textContent ?? "",
                        chars: "upperCase",
                        speed: 0.6,
                    },
                },
                0.35 + i * 0.08,
            ),
        );
    } else {
        tl.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0 round 24px)" },
            {
                clipPath: "inset(0 0 0% 0 round 0px)",
                duration: 1.2,
                ease: "curve",
                clearProps: "clipPath",
            },
        ).fromTo(
            kids,
            { opacity: 0, y: 14 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "curve",
                stagger: 0.06,
            },
            0.2,
        );
    }
    return tl;
};

const titleblock: Builder = (el, p) => {
    const vals = q(el, ".tb");
    return gsap.timeline({ paused: true }).fromTo(
        vals,
        p === "qa" ? { clipPath: "inset(0 100% 0 0)" } : { opacity: 0, y: 12 },
        p === "qa"
            ? {
                  clipPath: "inset(0 0% 0 0)",
                  duration: 0.4,
                  ease: "plot",
                  stagger: 0.06,
                  clearProps: "clipPath",
              }
            : {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "curve",
                  stagger: 0.06,
              },
    );
};

const BUILDERS: Record<string, Builder> = {
    words,
    rule,
    fade,
    list,
    exhibit,
    plate,
    coverage,
    flow,
    figures,
    finding,
    photo,
    quote,
    cells,
    titleblock,
};

// ─── Reveal system ────────────────────────────────────────────
// Every [data-reveal] element gets a timeline that plays once as it enters.
// Elements already on screen when this runs (first load, or right after a
// persona switch) are plotted top to bottom as one pass.

export function setupReveals(root: HTMLElement, persona: Persona) {
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
    const born = performance.now();

    els.forEach((el) => {
        const build = BUILDERS[el.dataset.reveal ?? ""];
        if (!build) return;
        const tl = build(el, persona);
        ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () => {
                let delay = 0;
                if (performance.now() - born < 120) {
                    const top = el.getBoundingClientRect().top;
                    delay = gsap.utils.clamp(
                        0,
                        0.6,
                        (top / window.innerHeight) * 0.5,
                    );
                }
                gsap.delayedCall(delay, () => {
                    tl.play();
                });
            },
        });
    });

    // Frontend plates lean with scroll velocity and settle back, like a
    // flexible curve under a hand. QA exhibits stay rigid on purpose.
    if (persona === "frontend") {
        const frames = gsap.utils.toArray<HTMLElement>(".plate__frame", root);
        // Desktop pointers only: touch momentum scrolling doesn't need it.
        if (frames.length && window.matchMedia("(pointer: fine)").matches) {
            const setSkew = gsap.quickSetter(frames, "skewY", "deg");
            const lean = gsap.utils.clamp(-3.5, 3.5);
            const proxy = { skew: 0 };
            ScrollTrigger.create({
                onUpdate: (self) => {
                    const s = lean(self.getVelocity() / -450);
                    if (Math.abs(s) > Math.abs(proxy.skew)) {
                        proxy.skew = s;
                        gsap.to(proxy, {
                            skew: 0,
                            duration: 0.9,
                            ease: "power3",
                            overwrite: true,
                            onUpdate: () => setSkew(proxy.skew),
                        });
                    }
                },
            });
        }
    }
}

// ─── Persona exit ─────────────────────────────────────────────
// Before the content changes, what's on screen leaves in the outgoing
// persona's grammar. The incoming one then re-plots it. Resolves with the
// elements it touched so the caller can clear them in the same task as the
// state commit (no painted frame in between).

export function visibleSwaps() {
    const vh = window.innerHeight;
    return gsap.utils
        .toArray<HTMLElement>("[data-swap]")
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.bottom > 0 && r.top < vh && r.height > 0)
        .sort((a, b) => a.r.top - b.r.top)
        .map(({ el }) => el);
}

export function exitVisible(persona: Persona): Promise<HTMLElement[]> {
    const els = visibleSwaps();

    return new Promise((resolve) => {
        if (!els.length) return resolve(els);
        const tl = gsap.timeline({ onComplete: () => resolve(els) });
        if (persona === "qa") {
            tl.to(els, {
                clipPath: "inset(0 0 0 100%)",
                duration: 0.3,
                ease: "plot",
                stagger: 0.035,
            });
        } else {
            tl.to(els, {
                opacity: 0,
                y: -14,
                filter: "blur(6px)",
                duration: 0.32,
                ease: "power2.in",
                stagger: 0.03,
            });
        }
    });
}

// ─── Replay ───────────────────────────────────────────────────
// Hovering a readout re-runs it, the way you'd re-run a suite.

export function replay(el: HTMLElement) {
    if (el.dataset.replaying) return;
    const build = BUILDERS[el.dataset.reveal ?? ""];
    if (!build) return;
    const p: Persona =
        document.documentElement.dataset.persona === "frontend" ? "frontend" : "qa";
    el.dataset.replaying = "1";
    build(el, p)
        .eventCallback("onComplete", () => {
            delete el.dataset.replaying;
        })
        .play(0);
}

// ─── Lens sweep ───────────────────────────────────────────────
// A single pass across the viewport that carries a persona switch, in the
// incoming persona's grammar: a redline scanning across for QA, a soft
// cobalt wash for Frontend. Runs from the switch's side of the screen.

export function sweep(el: HTMLElement, to: Persona) {
    const vw = window.innerWidth;
    const tl = gsap.timeline();
    if (to === "qa") {
        const line = el.querySelector<HTMLElement>(".sweep__line");
        if (!line) return tl;
        tl.set(line, { autoAlpha: 1, x: vw })
            .to(line, { x: -140, duration: 0.75, ease: "plot" })
            .set(line, { autoAlpha: 0 });
    } else {
        const wash = el.querySelector<HTMLElement>(".sweep__wash");
        if (!wash) return tl;
        tl.set(wash, { autoAlpha: 1, x: vw })
            .to(wash, { x: -wash.offsetWidth, duration: 1.1, ease: "power2.inOut" })
            .set(wash, { autoAlpha: 0 });
    }
    return tl;
}
