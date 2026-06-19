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
  const memberTypes = [
    {
      title: "New seekers",
      body:
        "Adults who are curious but want context before making decisions. They often start with public education, FAQs, and introductory events."
    },
    {
      title: "Returning practitioners",
      body:
        "People with prior experience who want a steadier container, clearer expectations, and a community that values preparation."
    },
    {
      title: "Integration-minded members",
      body:
        "Members who want ongoing conversation after significant experiences, including language for meaning, care, and next steps."
    }
  ];

  const communityRhythms = [
    {
      title: "Orientation",
      body:
        "Members learn how the church works and how account registration and waiver completion connect to member access."
    },
    {
      title: "Small gatherings",
      body:
        "Events are intentionally scoped so people can meet one another, hear shared language, and build trust over time."
    },
    {
      title: "Integration support",
      body:
        "Conversations focus on preparation, personal meaning, community care, and responsible use of member-only resources."
    }
  ];

  return (
    <main>
      <Hero
        eyebrow="Community"
        title="A community of curious minds."
        body="TLC brings together adults who want a grounded place to ask better questions, meet thoughtful peers, and approach sacred mushroom traditions with care."
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
          title="A space for belonging without pressure."
          body="Community at TLC is not built around hype or transactions. It is built around conversation, orientation, and the steady relationships that help members feel known."
        />
      </Section>
      <Section eyebrow="Who joins" title="Members come with different levels of experience.">
        <div className="grid gap-4 md:grid-cols-3">
          {memberTypes.map((item) => (
            <article key={item.title} className="rounded-lg border border-ink/10 bg-paper p-6">
              <h2 className="font-ui text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Member experience" title="What community life can include." tone="linen">
        <div className="grid gap-4 md:grid-cols-3">
          {communityRhythms.map((item) => (
            <article key={item.title} className="rounded-lg border border-ink/10 bg-paper p-6">
              <h2 className="font-ui text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
