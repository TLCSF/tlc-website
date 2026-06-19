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
      title: "New explorers",
      body:
        "People who are curious about sacred mushroom traditions and want a supportive place to learn, ask questions and move at their own pace."
    },
    {
      title: "Experienced practitioners",
      body:
        "People with prior experience who value preparation, reflection and thoughtful discussion around their ongoing practice."
    },
    {
      title: "Integration-minded members",
      body:
        "People looking for language, perspective and community support as they make sense of meaningful experiences and personal growth."
    }
  ];

  const communityValues = [
    {
      title: "Curiosity",
      body:
        "Questions are welcomed. TLC encourages thoughtful exploration rather than certainty or dogma."
    },
    {
      title: "Responsibility",
      body:
        "Education, preparation and personal accountability help create a safer and more meaningful experience for everyone."
    },
    {
      title: "Connection",
      body:
        "Growth often happens in relationship with others. Community creates opportunities to learn, reflect and evolve together."
    }
  ];

  return (
    <main>
      <Hero
        eyebrow="Community"
        title="A community of curious minds."
        body="TLC brings together adults who want a grounded place to explore big questions, learn alongside others and engage with sacred mushroom traditions in a thoughtful way. Whether you're brand new or years into your journey, community begins with conversation."
        primaryHref="/events"
        primaryLabel="Explore Gatherings & Events"
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
          body="Community at TLC isn't built around hype, status or transactions. It grows through conversation, shared learning and the relationships that form when people approach personal growth with openness and curiosity."
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
      <Section eyebrow="Community values" title="What brings people together." tone="linen">
        <div className="grid gap-4 md:grid-cols-3">
          {communityValues.map((item) => (
            <article key={item.title} className="rounded-lg border border-ink/10 bg-paper p-6">
              <h2 className="font-ui text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Why community matters" title="Growth happens in relationship.">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr]">
          <p className="max-w-3xl text-lg leading-8 text-ink/75">
            Many people arrive looking for information. What they often
            discover is the value of learning alongside others. Community
            provides context, perspective and support that can be difficult to
            find alone. TLC exists to create a place where those conversations
            can continue long after the first question is asked.
          </p>
          <a
            href="/events"
            className="inline-flex min-h-12 items-center justify-center self-start rounded-md bg-gold px-6 py-3 font-ui text-sm font-semibold text-black transition hover:bg-gold/85"
          >
            Explore Gatherings & Events
          </a>
        </div>
      </Section>
    </main>
  );
}
