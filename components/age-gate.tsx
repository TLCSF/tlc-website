"use client";

import { useEffect, useState } from "react";

const key = "tlc-age-verified";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(window.localStorage.getItem(key) !== "true");
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center bg-ink/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="w-full max-w-lg rounded-lg bg-paper p-6 shadow-soft sm:p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cedar">
          21+ community
        </p>
        <h2
          id="age-gate-title"
          className="font-serif text-3xl leading-tight text-ink"
        >
          Please confirm your age to enter.
        </h2>
        <p className="mt-4 leading-7 text-ink/75">
          The Living Church website is intended for adults 21 and older.
          Educational content is not medical, legal, or clinical advice.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            className="min-h-12 rounded-md bg-ink px-5 py-3 font-semibold text-paper transition hover:bg-moss"
            onClick={() => {
              window.localStorage.setItem(key, "true");
              setOpen(false);
            }}
          >
            I am 21 or older
          </button>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-moss px-5 py-3 font-semibold text-ink transition hover:bg-linen"
            href="https://www.google.com"
          >
            Leave site
          </a>
        </div>
      </div>
    </div>
  );
}
