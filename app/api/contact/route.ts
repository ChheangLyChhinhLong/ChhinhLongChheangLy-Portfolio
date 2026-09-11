import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/telegram/services/contact-notification";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
};

const limits = {
  name: 80,
  email: 160,
  subject: 140,
  message: 4000,
};

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const rawName = typeof payload.name === "string" ? payload.name.trim() : "";
  const rawEmail = typeof payload.email === "string" ? payload.email.trim() : "";
  const rawSubject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const rawMessage = typeof payload.message === "string" ? payload.message.trim() : "";
  const name = clean(rawName, limits.name);
  const email = clean(rawEmail, limits.email);
  const subject = clean(rawSubject, limits.subject);
  const message = clean(rawMessage, limits.message);

  if (!name || !subject || !message || rawName.length > limits.name || rawEmail.length > limits.email || rawSubject.length > limits.subject || rawMessage.length > limits.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a name, valid email, subject, and message." },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  try {
    await sendContactNotification({
      name,
      email,
      subject,
      message,
      timestamp: new Date(),
      ip: forwardedFor,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Your message could not be delivered. Please email instead." },
      { status: 500 },
    );
  }
}