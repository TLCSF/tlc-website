import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const firstName = clean(payload.firstName);
  const lastName = clean(payload.lastName);
  const email = clean(payload.email);
  const message = clean(payload.message);
  const company = clean(payload.company);

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please include a little more detail in your message." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to =
    process.env.CONTACT_FORM_TO_EMAIL ||
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    "thelivingchurchsfinfo@gmail.com";
  const from =
    process.env.CONTACT_FORM_FROM_EMAIL ||
    "The Living Church <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Message sending is not configured yet." },
      { status: 503 }
    );
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const subject = `New TLC contact form message from ${fullName}`;
  const text = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    "",
    "Message:",
    message
  ].join("\n");
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject,
      text,
      html
    })
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Message could not be sent. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
