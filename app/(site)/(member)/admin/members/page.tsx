import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MemberShell } from "@/components/member-shell";
import { createSupabaseServerClient, getCurrentProfile, isStaff } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Member Admin",
  description: "Staff member lookup for status and waiver review."
};

export default async function MemberAdminPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const profile = await getCurrentProfile();
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !isStaff(profile)) {
    redirect("/account");
  }

  const params = await searchParams;
  const q = params.q || "";
  let members: Array<Record<string, string | null>> = [];

  if (q && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("profiles")
      .select("email, first_name, last_name, role, approval, waiver")
      .or(`email.ilike.%${q}%,first_name.ilike.%${q}%,last_name.ilike.%${q}%`)
      .limit(25);
    members = data || [];
  }

  return (
    <MemberShell title="Member Search" allowPending>
      <form className="flex flex-col gap-3 rounded-lg bg-paper p-5 sm:flex-row" action="/admin/members">
        <label className="sr-only" htmlFor="q">Search members</label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="Search by name or email"
          className="min-h-12 flex-1 rounded-md border border-ink/20 px-3"
        />
        <button className="min-h-12 rounded-md bg-ink px-5 py-3 font-semibold text-paper hover:bg-moss">
          Search
        </button>
      </form>
      <div className="mt-6 overflow-x-auto rounded-lg bg-paper">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-linen">
            <tr>
              {["Name", "Email", "Role", "Approval", "Waiver"].map((head) => (
                <th key={head} className="px-4 py-3 font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.email || ""} className="border-t border-ink/10">
                <td className="px-4 py-3">{member.first_name} {member.last_name}</td>
                <td className="px-4 py-3">{member.email}</td>
                <td className="px-4 py-3">{member.role}</td>
                <td className="px-4 py-3">{member.approval}</td>
                <td className="px-4 py-3">{member.waiver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MemberShell>
  );
}
