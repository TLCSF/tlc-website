import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your The Living Church member account."
};

function safeNextPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/account";
  }

  if (value === "/login" || value.startsWith("/login?")) return "/account";
  if (value === "/register" || value.startsWith("/register?")) return "/account";

  return value;
}

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{
    next?: string;
    error?: string;
    code?: string;
    login?: string;
  }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next);

  return (
    <main className="bg-linen py-14 sm:py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
          Member Login
        </h1>
        <p className="mt-4 leading-7 text-ink/75">
          Access account status, member resources, and member-only community
          areas after your membership is active.
        </p>
        <form
          action="/auth/login"
          method="post"
          className="mt-8 grid gap-4 rounded-lg bg-paper p-6"
        >
          <input type="hidden" name="next" value={nextPath} />
          <div className="grid gap-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className="min-h-12 rounded-md border border-ink/20 px-3" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="font-medium">Password</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className="min-h-12 rounded-md border border-ink/20 px-3" />
          </div>
          {params.error ? (
            <div
              className="rounded-md bg-clay/15 p-3 text-sm text-ink"
              role="alert"
            >
              <p>{params.error}</p>
              {params.code ? (
                <p className="mt-2 text-xs text-ink/65">
                  Reference code: {params.code}
                </p>
              ) : null}
            </div>
          ) : null}
          {!params.error && params.login === "success" ? (
            <div
              className="rounded-md bg-clay/15 p-3 text-sm text-ink"
              role="alert"
            >
              <p>
                Login was accepted, but this browser did not send a session
                cookie to the account page.
              </p>
              <p className="mt-2 text-xs text-ink/65">
                Reference code: login_cookie_missing
              </p>
            </div>
          ) : null}
          <button className="min-h-12 rounded-md bg-ink px-5 py-3 font-semibold text-paper hover:bg-moss">
            Log in
          </button>
          <p className="text-sm text-ink/70">
            New here? <Link href="/register" className="font-semibold text-river">Create an account</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
