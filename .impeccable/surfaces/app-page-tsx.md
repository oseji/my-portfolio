---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["components/Hero.tsx"]
---

## Scope

Single-page portfolio (`app/page.tsx` and `components/*`). Visitor mode: Experience, with a Persuade close (contact). Audience: engineering managers, QA leads, prospective clients skimming for evidence on a laptop during the working day.

## Direction contract

THESIS: One person who draws the thing and checks the thing. The page is an engineering drawing sheet whose title block literally reads "Drawn by: Ose / Checked by: Ose"; the persona toggle switches between the drafter's layer and the checker's layer. It refuses the cream + italic serif + mono label + orange accent portfolio, and its predictable opposite, the dark terminal with a neon accent.

OWN-WORLD: Whiteprint in light (cool drafting-film paper #EEF2F4, Prussian ink #0F2340, cobalt drawing line #2748D8) and cyanotype blueprint in dark (drenched Prussian ground, white linework). QA layer adds the checker's conventions: highlighter yellow fields and red-pencil defect marks. Frontend layer is the drawing itself: vivid cobalt fields and French-curve linework. Type: Archivo on its width axis (wide heavy display, condensed caps for title-block lettering, normal-width body); Martian Mono only for measured values, HTTP, and counts. Square corners, 1px rules, title-block cells; no pills, no cards, no glass.

STORY: A visitor sees which lens they are in, reads a claim, sees proof (real numbers, findings, screenshots), flips the lens and watches the same person re-plotted, then contacts through a form that is itself a title block.

FIRST VIEWPORT: 1440x900. Title strip header (wordmark + role, nav, theme, persona switch). Hero drawing field under a live pixel ruler: status line in condensed caps, then the persona headline full-bleed at ~7.6vw wide-heavy, key word marked by the persona's tool (highlighter sweep / cobalt ink + French-curve underline). Below: bio + primary "Start a project" and secondary "See selected work" left; a sheet index of the persona's projects right. Primary action sits at ~y620.

FORM: Engineering drawing sheet with title block, grounded candidate 1 of 7 (brief-pinned: the owner asked the designer to pick the strongest; roll ran degraded). Seed key f9cfa259. Signature interaction: Inspect, hovering headline words draws live dimension lines with their measured width, echoed on the ruler. Motion grammar: Straightedge for QA (axis-aligned wipes, plotted rules, stepped counters, snapping magnets, stroke-drawn ticks) and French curve for Frontend (curved reveals, rise with blur resolving, smooth magnets, clip-path blooms). Theme toggle is a print-exposure scan down the page; persona toggle exits the visible content in the old grammar and re-plots it in the new one.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
