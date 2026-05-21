import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "oseoziegbe0@gmail.com";

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

    // Auto-reply to the sender
    await resend.emails.send({
        from: "Ose Oziegbe <onboarding@resend.dev>",
        to: email,
        subject: "Got your message — talk soon",
        text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you within 24 hours.\n\nOse\noseoziegbe0@gmail.com`,
    });

    return Response.json({ ok: true });
}
