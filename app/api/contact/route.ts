import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "oseoziegbe0@gmail.com";

// Once you verify a sending domain in Resend (Settings → Domains),
// set RESEND_FROM=noreply@yourdomain.com in .env.local to enable auto-replies.
// Until then, auto-replies are skipped (Resend blocks sending to external
// addresses when using the shared onboarding@resend.dev sender).
const FROM_DOMAIN = process.env.RESEND_FROM;

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
    }

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
                from: `Ose Oziegbe <${FROM_DOMAIN}>`,
                to: email,
                subject: "Got your message, talk soon",
                text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you within 24 hours.\n\nOse\noseoziegbe0@gmail.com`,
            });
        } catch {
            // Auto-reply failure is non-critical — main submission already succeeded
        }
    }

    return Response.json({ ok: true });
}
