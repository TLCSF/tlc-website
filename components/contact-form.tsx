"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || "")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Message could not be sent.");
      }

      form.reset();
      setState("success");
      setMessage("Thank you. Your message has been sent to The Living Church.");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-ink/10 bg-paper p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First Name" name="firstName" autoComplete="given-name" />
        <Field label="Last Name" name="lastName" autoComplete="family-name" />
      </div>
      <div className="mt-5">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
        />
      </div>
      <div className="mt-5">
        <label className="font-ui block text-sm font-semibold text-ink">
          Message
          <textarea
            name="message"
            required
            minLength={10}
            rows={7}
            className="mt-2 block w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-base text-ink shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
          />
        </label>
      </div>
      <label className="sr-only" aria-hidden="true">
        Company
        <input
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="font-ui mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-gold bg-gold px-5 py-3 text-sm font-semibold text-black transition hover:bg-ink hover:text-creme disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {state === "submitting" ? "Sending..." : "Submit"}
      </button>
      {message ? (
        <p
          className={`mt-4 rounded-md border px-4 py-3 text-sm ${
            state === "success"
              ? "border-gold/30 bg-linen text-ink"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="font-ui block text-sm font-semibold text-ink">
      {label}
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="mt-2 block w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-base text-ink shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
      />
    </label>
  );
}
