import type { Metadata } from "next";
import Link from "next/link";
import { requestPasswordReset } from "./actions";

export const metadata: Metadata = {
  title: "Set Up Your Password",
  description: "Set up or reset your The Living Church member password."
};

export default async function ForgotPasswordPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="bg-linen py-14 sm:py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
          Set Up Your Password
        </h1>
        <p className="mt-4 leading-7 text-ink/75">
          Existing members can use the email address already connected to their
          TLC membership. We will email you a secure link to create a new
          password. You do not need to sign the waiver again.
        </p>
        <form action={requestPasswordReset} className="mt-8 grid gap-4 rounded-lg bg-paper p-6">
          {params.sent === "1" ? (
            <div className="rounded-md bg-moss/10 p-4 text-sm leading-6" role="status">
              Check your email for a secure password setup link. If you do not
              see it, check your spam folder and confirm that you entered the
              email used for your TLC membership.
            </div>
          ) : null}
          {params.error ? (
            <p className="rounded-md bg-clay/15 p-3 text-sm text-ink" role="alert">
              {params.error}
            </p>
          ) : null}
          <div className="grid gap-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className="min-h-12 rounded-md border border-ink/20 px-3" />
          </div>
          <button className="min-h-12 rounded-md bg-ink px-5 py-3 font-semibold text-paper hover:bg-moss">
            Email Me a Password Setup Link
          </button>
          <Link href="/login" className="text-sm font-semibold text-river">
            Back to member login
          </Link>
        </form>
      </div>
    </main>
  );
}
