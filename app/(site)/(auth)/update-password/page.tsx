import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updatePassword } from "./actions";

export const metadata: Metadata = {
  title: "Create a New Password",
  description: "Create a new password for your The Living Church member account."
};

export default async function UpdatePasswordPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/forgot-password");

  return (
    <main className="bg-linen py-14 sm:py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
          Create a New Password
        </h1>
        <p className="mt-4 leading-7 text-ink/75">
          Choose a secure password with at least eight characters. You will use
          this password for future member logins.
        </p>
        <form action={updatePassword} className="mt-8 grid gap-4 rounded-lg bg-paper p-6">
          {params.error ? (
            <p className="rounded-md bg-clay/15 p-3 text-sm text-ink" role="alert">
              {params.error}
            </p>
          ) : null}
          <div className="grid gap-2">
            <label htmlFor="password" className="font-medium">New password</label>
            <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="min-h-12 rounded-md border border-ink/20 px-3" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="confirmation" className="font-medium">Confirm new password</label>
            <input id="confirmation" name="confirmation" type="password" required minLength={8} autoComplete="new-password" className="min-h-12 rounded-md border border-ink/20 px-3" />
          </div>
          <button className="min-h-12 rounded-md bg-ink px-5 py-3 font-semibold text-paper hover:bg-moss">
            Save New Password
          </button>
        </form>
      </div>
    </main>
  );
}
