import type { Metadata } from "next";
import { StepCard } from "@/components/cards";
import { Hero } from "@/components/hero";
import { ImageFeature } from "@/components/image-feature";
import { Section } from "@/components/section";
import { seo } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: seo.membership.title },
  description: seo.membership.description
};

export default function MembershipPage() {
  return (
    <main>
      <Hero
        eyebrow="Membership"
        title="Membership starts here."
        body="Joining The Living Church is simple. Membership connects you with a community of learning, exploration, and intentional practice while providing access to educational resources, events, and sacramental participation."
        primaryHref="/register"
        primaryLabel="Create Account"
        secondaryHref="/login"
        secondaryLabel="Member Login"
        imageSrc="/images/tlc/front-desk.jpg"
        imageAlt="The Living Church front desk and welcome area"
        imageMode="cover"
      />
      <Section eyebrow="Why membership?" title="Why join?">
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          Membership is more than access. It is an opportunity to participate
          in a community dedicated to learning, growth, and responsible
          engagement with sacred mushroom traditions.
        </p>
      </Section>
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/chapel-pew.jpg"
          alt="The Living Church chapel seating and framed wall art"
          eyebrow="A clear pathway"
          title="Membership connects the public site to a private member experience."
          body="The flow keeps education, registration, waiver completion, and staff approval organized before member-only areas are opened."
          reverse
        />
      </Section>
      <Section eyebrow="How it works" title="A clear path to participation">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StepCard step="Step 1" title="Create an Account" body="Start with a secure Supabase-powered member account." />
          <StepCard step="Step 2" title="Complete Registration" body="Add profile details and continue through the membership flow." />
          <StepCard step="Step 3" title="Complete Waiver" body="Smartwaiver remains the external waiver system for required documents." />
          <StepCard step="Step 4" title="Participate" body="Approved active members can access resources, events, and community areas." />
        </div>
      </Section>
    </main>
  );
}
