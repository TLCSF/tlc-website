import type { Metadata } from "next";
import Link from "next/link";
import { register } from "./actions";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create a secure member account for The Living Church membership flow."
};

export default async function RegisterPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="bg-linen py-14 sm:py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
          Create Your Account
        </h1>
        <p className="mt-4 leading-7 text-ink/75">
          Start membership registration. Waiver completion and staff approval
          are required before member-only pages unlock.
        </p>
        <form action={register} className="mt-8 grid gap-4 rounded-lg bg-paper p-6">
          {params.error ? (
            <p className="rounded-md bg-clay/15 p-3 text-sm text-ink" role="alert">
              {params.error}
            </p>
          ) : null}
          <div className="grid gap-2">
            <label htmlFor="firstName" className="font-medium">First name</label>
            <input id="firstName" name="firstName" autoComplete="given-name" className="min-h-12 rounded-md border border-ink/20 px-3" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="lastName" className="font-medium">Last name</label>
            <input id="lastName" name="lastName" autoComplete="family-name" className="min-h-12 rounded-md border border-ink/20 px-3" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className="min-h-12 rounded-md border border-ink/20 px-3" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="font-medium">Password</label>
            <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="min-h-12 rounded-md border border-ink/20 px-3" />
          </div>
          <button className="min-h-12 rounded-md bg-ink px-5 py-3 font-semibold text-paper hover:bg-moss">
            Register
          </button>
          <p className="text-sm text-ink/70">
            Already registered? <Link href="/login" className="font-semibold text-river">Log in</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
