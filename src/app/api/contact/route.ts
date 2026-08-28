import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = process.env.CONTACT_EMAIL?.trim() ?? "";
const SEND_ENABLED =
  process.env.CONTACT_DISABLE_SEND !== "true" && RECIPIENT.length > 0;

type ContactBody = {
  name?: string;
  company?: string;
  email?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

async function sendWithResend(input: {
  name: string;
  company: string;
  email: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const resend = new Resend(apiKey);
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Oravi Lux <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: [RECIPIENT],
    replyTo: input.email,
    subject: `Oravi Lux enquiry — ${input.name}`,
    text: buildEmailText(input),
  });

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

async function sendWithFormSubmit(input: {
  name: string;
  company: string;
  email: string;
  message: string;
  origin: string;
}) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: input.origin,
        Referer: `${input.origin}/en/contact`,
      },
      body: JSON.stringify({
        name: input.name,
        company: input.company,
        email: input.email,
        message: input.message,
        _subject: `Oravi Lux enquiry — ${input.name}`,
        _replyto: input.email,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  const result = (await response.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;

  const success =
    result?.success === true ||
    result?.success === "true" ||
    String(result?.message ?? "")
      .toLowerCase()
      .includes("submitted");

  if (success) return { ok: true as const };

  const message = result?.message ?? "Unable to send your enquiry right now.";
  const needsActivation = message.toLowerCase().includes("activation");

  return {
    ok: false as const,
    needsActivation,
    message: needsActivation
      ? "Activation required: check the inbox (and spam) for FormSubmit’s Activate Form email, click the link, then submit again."
      : message,
  };
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

  // Delivery paused — accept the form without sending to any inbox.
  if (!SEND_ENABLED) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const origin = new URL(request.url).origin;

  try {
    if (process.env.RESEND_API_KEY) {
      await sendWithResend({ name, company, email, message });
      return NextResponse.json({ ok: true, delivered: true });
    }

    const result = await sendWithFormSubmit({
      name,
      company,
      email,
      message,
      origin,
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          error: result.message,
          needsActivation: result.needsActivation,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    const detail =
      error instanceof Error
        ? error.message
        : "Unable to send your enquiry right now. Please try again.";
    return NextResponse.json({ error: detail }, { status: 502 });
  }
}
