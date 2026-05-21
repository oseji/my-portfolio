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

    return Response.json({ ok: true });
}
