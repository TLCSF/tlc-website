import Link from "next/link";
import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { getCurrentProfile, isActiveMember } from "@/lib/supabase/server";

export async function MemberShell({
  title,
  children,
  allowPending = false,
  inactiveRedirect = "/account"
}: {
  title: string;
  children: React.ReactNode;
  allowPending?: boolean;
  inactiveRedirect?: string;
}) {
  const profile = await getCurrentProfile();

  if (!profile && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    redirect("/login");
  }

  const active = isActiveMember(profile);
  if (!allowPending && process.env.NEXT_PUBLIC_SUPABASE_URL && !active) {
    redirect(inactiveRedirect);
  }

  return (
    <main className="bg-linen py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Member area
            </p>
            <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">
              {title}
            </h1>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Member navigation">
            {siteConfig.memberNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm font-medium hover:bg-linen"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {children}
      </div>
    </main>
  );
}
