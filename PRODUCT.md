# Product

<!-- impeccable:product-schema 1 -->

> Written from the owner's redesign brief (2026-09-26). The owner asked for no check-in round, so every fact below comes from that brief or the repository; nothing here was confirmed in a separate interview.

## Platform

web

## Users

Engineering managers, QA leads, and potential freelance clients evaluating Ose Oziegbe for a role or a project. They arrive from a CV, LinkedIn, or a referral, usually on a laptop during work hours, and skim for evidence: what Ose has built, what Ose has tested, and whether the work looks careful. They are reading for credibility and craft, not spectacle.

## Product Purpose

A single-page portfolio that lets an evaluator judge Ose as a QA engineer (the default persona) with a frontend development background, or as a frontend developer with a tester's instincts. Success: a visitor leaves knowing which kind of work Ose does, has looked at at least one real project, and knows how to get in touch.

## Positioning

One person who both builds interfaces and breaks them. The persona toggle is the mechanism: the same person, the same site, re-read through the builder's lens or the checker's lens. A generic QA portfolio cannot show frontend craft, and a generic frontend portfolio cannot show verification discipline; this one has to show both, and the site itself is evidence of the frontend claim (the Frontend bio says Ose uses GSAP for animation work).

## Operating Context

- Evaluators compare this against CVs, GitHub repositories, and other candidates' portfolios.
- QA projects link to GitHub repositories and READMEs, not to live sites.
- Frontend projects link to live deployments and GitHub repositories.
- Contact happens by email, LinkedIn, GitHub, or the site's contact form (Resend-backed API route with a honeypot and rate limit).

## Capabilities and Constraints

- Next.js 16 (App Router, React Compiler), React 19, TypeScript, Tailwind CSS v4.
- Persona toggle (QA / Frontend) swaps hero headline, hero bio, skills, projects, About copy; persisted in localStorage, QA by default.
- Light and dark themes, persisted in localStorage, applied before first paint.
- All copy lives in `lib/portfolio.ts`; screenshots in `assets/projects/`.
- Must stay responsive, performant, keyboard accessible, and respect `prefers-reduced-motion` with a genuinely reduced path.

## Brand Commitments

- Name: Ose Oziegbe ("Ose"). Based in Lagos, working remote.
- Voice: plain, first person, understated, specific ("which sounds vague, but it usually makes a difference in the end"). No hype.
- Footer line: "Testing smarter because I've built it before".
- Pull quote: "I write code, then I try to break it. Both jobs make the other one better."
- The owner asked for heavy, purposeful motion built with GSAP as a core part of the site.

## Evidence on Hand

- Portrait: `assets/portrait.jpeg`.
- QA projects (`lib/portfolio.ts`): Swag Labs Automation Suite (Selenium, POM, Allure), Restful-Booker k6 (full booking lifecycle, 25 concurrent users peak, six API quirks found including a DELETE that returns 201), Fintech Fund Transfer API (18-case catalogue, 8 scenarios, 21 assertions, approval workflow above £5,000). Screenshots in `assets/projects/qa/`.
- Frontend projects: Pennywise, Binge, HR Sphere (WIP), IP Address Tracker. Screenshots in `assets/projects/frontend/`.
- Absent, never to be fabricated: testimonials, employer names, client logos, metrics beyond those in the project blurbs, availability dates, response-time guarantees beyond the existing copy.

## Product Principles

1. Evidence over adjectives: show the real numbers, findings, and screenshots the projects already contain.
2. Two lenses, one person: every section must read correctly in both personas; switching is a real change of framing, not a costume swap.
3. The site is a work sample: its build quality, motion, and accessibility are themselves part of the frontend claim.
4. Understated confidence: match the owner's plain voice; no hype copy.

## Accessibility & Inclusion

WCAG 2.1 AA contrast, full keyboard operation with visible focus, and a reduced-motion path that removes spatial movement rather than just shortening it.
