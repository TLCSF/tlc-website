import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Join The Living Church",
  description:
    "Begin the membership journey with The Living Church through account creation, registration, Smartwaiver, and staff approval."
};

export default function JoinPage() {
  return (
    <main>
      <Hero
        eyebrow="Join"
        title="Learn, understand, join, participate."
        body="Membership begins with a secure account, profile completion, Smartwaiver, and approval. The process is designed to be clear, grounded, and respectful."
        primaryHref="/register"
        primaryLabel="Create Account"
      />
      <Section title="Before you register">
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          The Living Church is for adults 21 and older. Membership and
          member-only access depend on authentication, waiver completion,
          approval, and active member status.
        </p>
      </Section>
    </main>
  );
}
