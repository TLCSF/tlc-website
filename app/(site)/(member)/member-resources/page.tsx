import type { Metadata } from "next";
import { MemberShell } from "@/components/member-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Member Resources",
  description: "Member-only educational and participation resources."
};

export default function MemberResourcesPage() {
  return (
    <MemberShell title="Member Resources">
      <div className="rounded-lg bg-paper p-6">
        <h2 className="font-serif text-2xl">Preparation and Integration</h2>
        <p className="mt-3 leading-7 text-ink/70">
          Member resources, preparation notes, integration materials, and
          community guidance will be shared here for active members.
        </p>
      </div>
    </MemberShell>
  );
}
