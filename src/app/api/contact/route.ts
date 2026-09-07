import { NextResponse } from "next/server";
import { Resend } from "resend";
import { randomUUID } from "node:crypto";

const RECIPIENT = process.env.CONTACT_EMAIL?.trim() || "lhadji@hotmail.com";
const SEND_ENABLED = process.env.CONTACT_DISABLE_SEND !== "true";

type ContactBody = {
  name?: string;
  company?: string;
  email?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailText(input: {
  name: string;
  company: string;
  email: string;
  message: string;
}) {
  return [
    "New Oravi Lux enquiry",
    "",
    `Name: ${input.name}`,
    `Company: ${input.company}`,
    `Email: ${input.email}`,
    "",
    "Message:",
    input.message,
  ].join("\n");
}

function buildEmailHtml(input: {
  name: string;
  company: string;
  email: string;
  message: string;
}) {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #170f00; line-height: 1.5;">
      <h2 style="margin: 0 0 16px; font-weight: 500;">New Oravi Lux enquiry</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Company:</strong> ${escapeHtml(input.company)}</p>
      <p style="margin: 0 0 16px;"><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(input.message)}</p>
    </div>
  `.trim();
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !company || !email || !message) {
    return NextResponse.json(
      { error: "Please complete all fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (name.length > 120 || company.length > 160 || message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  if (!SEND_ENABLED) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Oravi Lux <onboarding@resend.dev>";

  const { data, error } = await resend.emails.send(
    {
      from,
      to: [RECIPIENT],
      replyTo: email,
      subject: `Oravi Lux enquiry — ${name}`,
      text: buildEmailText({ name, company, email, message }),
      html: buildEmailHtml({ name, company, email, message }),
    },
    {
      idempotencyKey: `contact-form/${randomUUID()}`,
    },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true, id: data?.id });
}
