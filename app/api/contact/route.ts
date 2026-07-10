import { Resend } from "resend";
import { NextRequest } from "next/server";
import { portfolio } from "@/lib/portfolio";

const TO = portfolio.social.email;

// Once you verify a sending domain in Resend (Settings → Domains),
// set RESEND_FROM=noreply@yourdomain.com in .env.local to enable auto-replies.
// Until then, auto-replies are skipped (Resend blocks sending to external
// addresses when using the shared onboarding@resend.dev sender).
const FROM_DOMAIN = process.env.RESEND_FROM;

const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate limit. In-memory, so it resets per serverless instance —
// good enough to blunt casual abuse without adding infrastructure.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = hits.get(ip);
    if (!entry || now - entry.windowStart > WINDOW_MS) {
        hits.set(ip, { count: 1, windowStart: now });
        return false;
    }
    entry.count += 1;
    return entry.count > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, email, message, company } = (body ?? {}) as Record<
        string,
        unknown
    >;

    // Honeypot filled → almost certainly a bot. Pretend it worked.
    if (typeof company === "string" && company.trim() !== "") {
        return Response.json({ ok: true });
    }

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !email.trim() ||
        !message.trim()
    ) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    if (
        name.length > MAX_NAME ||
        email.length > MAX_EMAIL ||
        message.length > MAX_MESSAGE
    ) {
        return Response.json({ error: "Message too long" }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
        return Response.json(
            { error: "Please enter a valid email address" },
            { status: 400 },
        );
    }

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) {
        return Response.json(
            { error: "Too many messages, please try again later" },
            { status: 429 },
        );
    }

    if (!process.env.RESEND_API_KEY) {
        return Response.json(
            { error: "Email service is not configured" },
            { status: 500 },
        );
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: TO,
        replyTo: email,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    // Auto-reply — only runs once RESEND_FROM is set to a verified domain address
    if (FROM_DOMAIN) {
        try {
            await resend.emails.send({
                from: `${portfolio.name} <${FROM_DOMAIN}>`,
                to: email,
                subject: "Got your message, talk soon",
                text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you within 24 hours.\n\n${portfolio.short}\n${TO}`,
            });
        } catch {
            // Auto-reply failure is non-critical — main submission already succeeded
        }
    }

    return Response.json({ ok: true });
}
