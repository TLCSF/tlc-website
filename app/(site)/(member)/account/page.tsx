import type { Metadata } from "next";
import { MemberShell } from "@/components/member-shell";
import { getCurrentProfile, isActiveMember } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Account",
  description: "View membership and waiver status for your TLC account."
};

export default async function AccountPage() {
  const profile = await getCurrentProfile();
  const active = isActiveMember(profile);

  return (
    <MemberShell title="Account Status" allowPending>
      <section className="grid gap-4 rounded-lg bg-paper p-6 shadow-sm md:grid-cols-2">
        <Status label="Membership role" value={profile?.role || "Not connected"} />
        <Status label="Waiver" value={profile?.waiver || "Not started"} />
      </section>
      {profile ? (
        <section className="mt-4 rounded-lg bg-paper p-5 text-sm text-ink/70">
          <p>
            Signed in as <span className="font-semibold text-ink">{profile.email}</span>
          </p>
          {!active ? (
            <p className="mt-3">
              If you believe your membership should already be active, please
              contact TLC so staff can help confirm your registration, waiver,
              and membership status.
            </p>
          ) : null}
        </section>
      ) : null}
      <section className="mt-6 rounded-lg bg-paper p-6">
        <h2 className="font-serif text-2xl">Next Step</h2>
        <p className="mt-3 leading-7 text-ink/70">
          {active
            ? "Your account is active. Member-only pages are available from the navigation above."
            : "Complete the digital waiver using the same email address as your TLC account. Member access becomes available after your registration and waiver are connected."}
        </p>
        {process.env.NEXT_PUBLIC_SMARTWAIVER_URL ? (
          <a
            href={process.env.NEXT_PUBLIC_SMARTWAIVER_URL}
            className="mt-5 inline-flex min-h-12 items-center rounded-md bg-ink px-5 py-3 font-semibold text-paper hover:bg-moss"
          >
            Continue to Smartwaiver
          </a>
        ) : null}
      </section>
    </MemberShell>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cedar">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}
