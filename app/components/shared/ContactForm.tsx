"use client";

import { FormEvent, useState } from "react";
import { BiCheckCircle, BiLoaderAlt, BiSend } from "react-icons/bi";

const initialForm = { name: "", email: "", subject: "", message: "", website: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const update = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setForm(initialForm);
      setStatus("success");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="glass-strong rounded-[30px] p-5 sm:p-7" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">Name<input required maxLength={80} value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" /></label>
        <label className="field-label">Email<input required type="email" maxLength={160} value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" /></label>
      </div>
      <label className="field-label mt-5">Subject<input required maxLength={140} value={form.subject} onChange={(event) => update("subject", event.target.value)} placeholder="A project, collaboration, or hello" /></label>
      <label className="field-label mt-5">Message<textarea required maxLength={4000} rows={6} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Tell me a little about what you are building..." /></label>
      <input tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" value={form.website} onChange={(event) => update("website", event.target.value)} name="website" />
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "loading"} className="ios-button-primary disabled:cursor-wait disabled:opacity-70">
          {status === "loading" ? <BiLoaderAlt className="animate-spin text-lg" /> : <BiSend className="text-lg" />}
          {status === "loading" ? "Sending..." : "Send message"}
        </button>
        {status === "success" && <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400" role="status"><BiCheckCircle className="text-lg" /> Message sent. I&apos;ll be in touch soon.</p>}
        {status === "error" && <p className="text-sm text-rose-600 dark:text-rose-400" role="alert">{error}</p>}
      </div>
    </form>
  );
}