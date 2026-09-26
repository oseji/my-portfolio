---
name: Ose Oziegbe Portfolio
description: Drawn & Checked. An engineering drawing sheet for a QA engineer who also builds interfaces.
colors:
  paper: "#eef2f4"
  paper-2: "#e2e8ed"
  paper-3: "#f7f9fa"
  ink: "#0f2340"
  ink-2: "#475a74"
  cobalt: "#2748d8"
  red-pencil: "#c22f28"
  highlighter: "#ffdc3a"
  blueprint-paper: "#113a6b"
  blueprint-paper-2: "#0d3160"
  blueprint-ink: "#eef4fc"
  blueprint-ink-2: "#b3c6e2"
  blueprint-cobalt: "#9cbbff"
  blueprint-red: "#ff9a8c"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 0.9rem + 6.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.2rem + 3.6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  h3:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.1rem + 2.2vw, 3.25rem)"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.09em"
  data:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  none: "0px"
  hair: "1px"
  control: "2px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  gap: "clamp(16px, 2vw, 32px)"
  section: "clamp(88px, 11vw, 168px)"
  strip: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "54px"
  button-primary-hover-qa:
    backgroundColor: "{colors.highlighter}"
    textColor: "{colors.ink}"
  button-primary-hover-frontend:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper-3}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "54px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.hair}"
    padding: "0 10px"
    height: "30px"
  input-cell:
    backgroundColor: "{colors.paper-3}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px 14px"
---

# Design System: Ose Oziegbe Portfolio

## Overview

**Drawn & Checked.** The site is an engineering drawing sheet for one person who both draws the thing and checks the thing. The footer's title block says it literally: *Drawn by Ose Oziegbe, Checked by Ose Oziegbe*. The persona switch picks whose hand you are looking at. The QA lens adds the checker's layer on top of the drawing (highlighter fields, red-pencil marks, stepped verification). The Frontend lens is the drawing itself (cobalt ink, French-curve strokes, fluid motion).

Light mode is a **whiteprint**: cool drafting-film paper and Prussian ink. Dark mode is a **cyanotype blueprint**: a drenched Prussian ground with white linework. Both are real reprographic processes, so the theme switch is a change of print, not an inversion.

It refuses the cream-plus-italic-serif-plus-orange portfolio and its predictable opposite, the near-black terminal with a neon accent.

## Colors

### Primary
- **Prussian Ink** (`#0f2340` / blueprint `#eef4fc`): all type and rules. Text is ink, never gray on paper.
- **Cobalt Line** (`#2748d8` / blueprint `#9cbbff`): the drafter's ink. Frontend accent fields, emphasis text, and strokes.

### Secondary
- **Checker's Highlighter** (`#ffdc3a`): QA accent. Only ever a field *behind* ink text, never text or a thin line (it fails contrast on paper).
- **Red Pencil** (`#c22f28` / blueprint `#ff9a8c`): QA strokes: redlines, ticks, findings, the progress plot. Text-safe at 5:1.

### Neutral
- **Drafting Film** (`#eef2f4`), **Sunk Cell** (`#e2e8ed`), **Form Cell** (`#f7f9fa`), **Ink 2** (`#475a74`) for secondary text (6.2:1).

### Named Rules
- **The Lens Rule.** `--accent` is a field, `--accent-line` is a stroke or text. QA: yellow field + red line. Frontend: cobalt for both. Components read the lens from `html[data-persona]`, never from props.
- **The Highlighter Rule.** Yellow sits behind ink. Text on yellow is always `--on-yellow` navy, in both themes.

## Typography

One family on its width axis. **Archivo** wide and heavy (wdth 110–120, weight 750–800) for display; normal width for body; condensed caps (wdth 72, 600, tracked 0.09em) for title-block lettering. **Martian Mono** only for measured values: ruler numbers, redline readouts, HTTP verbs and status codes, tabular counts.

### Hierarchy
- Display 6rem max, h2 4.5rem max, h3 3.25rem max, quote 2.6rem, body 17px/1.55, label 12px caps.
- Headings are balanced, tracking never below -0.03em.

## Layout

12-column grid inside a 1440px shell with a fluid gutter. Every section opens on a 2px ink rule that plots in from the left. Sections are separated by generous space (`--sec`), with the Work section pulled up so its rule shows at the fold. Below 1024px columns stack; below 768px the header wraps its nav to a second row and the lens switch shortens to "QA / Frontend".

## Elevation & Depth

Flat. Depth comes from 1px rules and cell borders, as on a drawing sheet. The one shadow is the floating project peek (`0 18px 40px -18px`), which really does float above the page.

## Shapes

Square. Controls use a 2px radius, tags 1px, cells and frames 0. No pills anywhere. Arrows and icons share one 1.6–1.75 stroke with square caps.

## Components

### Buttons
Primary is an ink block; the persona's field wipes in on hover (a straight left-to-right wipe for QA, a circle blooming from the pointer for Frontend). The arrow leaves and comes back round. Secondary is a 1px ink outline with the same fill.

### Tags
Stack items are 1px-bordered buttons that **trace** a tool across the projects: pressing one marks every project using it and dims the rest, with a live count.

### Case sheet (QA work)
Title and a Type/Year meta table, the blurb, a **readout** restated from the blurb (flows covered, booking lifecycle, or figures), tags, then honest links (Repository / README). The screenshot is an **exhibit** with a caption. Hovering a readout re-runs it.

### Plate (Frontend work)
Screenshot-led, alternating sides, text column sticky. The image blooms open, drifts inside its frame on scroll, and leans with scroll velocity on desktop.

### Inputs / Fields
The contact form is a title block: labelled cells in a bordered grid. Focus fills the cell, draws the persona's line along its foot, and wakes the label.

### Navigation
A title strip: wordmark, section links with one sliding marker, theme switch, and the lens switch. Its bottom rule is a reading-progress plot.

### Inspect (signature)
Hovering a headline word draws a live redline with its measured width, echoed on the pixel ruler; the ruler also tracks the pointer (snapping to 10px ticks for QA).

## Do's and Don'ts

### Do:
- Do give every animation a grammar: straightedge (QA) or French curve (Frontend).
- Do keep content visible by default; the motion layer only hides what it is about to plot.
- Do give reduced motion a real alternative: no travel, short fades for state changes.
- Do show evidence from the real project data, restated, never embellished.

### Don't:
- Don't use pills, glass, gradients on text, or decorative circles.
- Don't put text on yellow in any color but navy, or use yellow for thin lines.
- Don't use the mono face for labels or decoration.
- Don't add a stat that isn't in a project's own blurb.
