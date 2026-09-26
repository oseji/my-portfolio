# Ose Oziegbe — Portfolio

Personal portfolio for my two hats: **QA engineer** and **frontend developer**. A persona toggle in the nav switches the entire site — headline, bio, skills, and project list — between the two, and the choice persists across visits.

## Stack

- [Next.js](https://nextjs.org) (App Router, React Compiler) + TypeScript
- Tailwind CSS v4
- [GSAP](https://gsap.com) (ScrollTrigger, CustomEase, DrawSVG, ScrambleText) via `@gsap/react`
- [Resend](https://resend.com) for the contact form

## Highlights

- **Persona switching** — all copy and projects live in [`lib/portfolio.ts`](lib/portfolio.ts) as a single typed object; components render whichever persona is active. Switching plays the outgoing content out and re-plots the new content in.
- **Two motion grammars** — [`lib/motion.ts`](lib/motion.ts) holds one reveal system with two voices: *straightedge* for QA (axis-aligned wipes, stepped counters, ticks that draw and stop) and *French curve* for Frontend (curved reveals, blur resolving, fluid easing).
- **Inspect** — hover a word in the hero headline to measure it; the redline and the ruler use live layout values.
- **Dark mode** without a flash of light theme (inline script applies the saved or system theme before first paint); the switch is a View Transition.
- **Reduced motion** — with `prefers-reduced-motion`, nothing is hidden or travels; state changes become short fades.
- **Contact form** backed by a rate-limited, honeypot-protected API route.
- **SEO** — Open Graph/Twitter cards with a generated OG image, sitemap, robots, and JSON-LD.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

### Environment

Create `.env.local`:

```bash
RESEND_API_KEY=...            # required for the contact form
RESEND_FROM=...               # optional: verified-domain sender, enables auto-replies
NEXT_PUBLIC_SITE_URL=...      # canonical URL used in metadata/sitemap (set in production)
```

## Editing content

Everything user-facing — name, taglines, skills, projects, socials — is in [`lib/portfolio.ts`](lib/portfolio.ts). Project screenshots live in `assets/projects/` and are mapped to project ids in [`components/ProjectMock.tsx`](components/ProjectMock.tsx). QA projects can carry an optional `readout` (coverage list, lifecycle, or figures) restated from their blurb.
