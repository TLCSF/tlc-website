import type { Metadata } from "next";
import { MemberShell } from "@/components/member-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Member Community",
  description: "Member-only community updates and participation opportunities."
};

export default function MemberCommunityPage() {
  return (
    <MemberShell title="Member Community">
      <div className="rounded-lg bg-paper p-6">
        <h2 className="font-serif text-2xl">Community Life</h2>
        <p className="mt-3 leading-7 text-ink/70">
          Member-only announcements, circles, services, and participation
          details can be published here through Sanity.
        </p>
      </div>
    </MemberShell>
  );
}
