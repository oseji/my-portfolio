// lib/site.ts
// Canonical site URL, shared by metadata, sitemap, and robots.
// Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. on Vercel)
// so OG tags and the sitemap point at the real domain.

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
