import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ImageFeature } from "@/components/image-feature";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Community",
  description:
    "The Living Church community is centered on connection, learning, intentional practice, and shared experience."
};

export default function CommunityPage() {
  return (
    <main>
      <Hero
        eyebrow="Community"
        title="A community of curious minds."
        body="Growth happens in connection with others. TLC creates space for adults to learn, reflect, gather, and participate in community life."
        primaryHref="/events"
        primaryLabel="See Events"
        imageSrc="/images/tlc/event-space-03.jpg"
        imageAlt="The Living Church community gathering space"
        imageMode="cover"
      />
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/event-space-02.jpg"
          alt="Tables and seating arranged for a community gathering at The Living Church"
          eyebrow="Shared experience"
          title="A space for belonging, learning, and thoughtful practice."
          body="Community offerings are shaped around trust, education, reflection, and the relationships that help people integrate what they learn."
        />
      </Section>
      <Section title="Belonging, learning, and practice">
        <div className="grid gap-4 md:grid-cols-3">
          {["Gatherings", "Church Services", "Integration Conversations"].map(
            (item) => (
              <div key={item} className="rounded-lg border border-ink/10 bg-paper p-6">
                <h2 className="font-serif text-2xl">{item}</h2>
                <p className="mt-3 leading-7 text-ink/70">
                  Community offerings are designed to support trust,
                  education, reflection, and participation.
                </p>
              </div>
            )
          )}
        </div>
      </Section>
    </main>
  );
}
