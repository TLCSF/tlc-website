import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { ImageFeature } from "@/components/image-feature";
import { Section } from "@/components/section";
import { sampleEvents } from "@/lib/content";
import { getPublishedEvents } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Gatherings & Events",
  description:
    "Explore educational talks, sound baths, community gatherings, integration conversations, and special events at The Living Church."
};

export default async function EventsPage() {
  const cmsEvents = await getPublishedEvents();
  const events = cmsEvents?.length ? cmsEvents : sampleEvents;
  const gatheringTypes = [
    {
      title: "Introductory gatherings",
      body:
        "A welcoming place to ask questions, meet community members, and learn how TLC approaches education, membership, and spiritual practice."
    },
    {
      title: "Education sessions",
      body:
        "Guided conversations focused on preparation, dosage context, set and setting, sacred traditions, and responsible participation."
    },
    {
      title: "Member conversations",
      body:
        "Smaller gatherings that support connection, reflection, integration, and ongoing participation in community life."
    }
  ];

  return (
    <main>
      <Hero
        eyebrow="Gatherings & Events"
        title="Gather, learn, and connect."
        body="Events are where learning becomes conversation. Whether you're new to TLC or already part of the community, gatherings offer space to ask questions, meet others, and explore sacred mushroom traditions in a thoughtful setting."
        imageSrc="/images/tlc/event-space-02.jpg"
        imageAlt="The Living Church event space prepared for a group gathering"
        imageMode="cover"
      />
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/events-learning-relationship.jpg"
          alt="A group gathered outdoors in conversation"
          eyebrow="In-person rhythm"
          title="Learning happens in relationship."
          body="TLC gatherings create opportunities to learn alongside others. Some events focus on education and preparation. Others create space for conversation, reflection, and community connection."
          imagePosition="top"
        />
      </Section>
      <Section id="programs" eyebrow="What to expect" title="Different gatherings serve different purposes.">
        <div className="grid gap-4 md:grid-cols-3">
          {gatheringTypes.map((item) => (
            <article key={item.title} className="rounded-lg border border-ink/10 bg-paper p-6">
              <h2 className="font-ui text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section id="calendar" eyebrow="Calendar" title="Upcoming events" tone="linen">
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.title} className="rounded-lg border border-ink/10 bg-paper p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                {event.date || "Date to be announced"}
              </p>
              <h2 className="font-ui mt-3 text-2xl font-semibold">{event.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{event.description}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Before you attend" title="RSVP and participation details.">
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          Each listing will note whether a gathering is open to visitors,
          intended for members, or requires advance registration. If an RSVP is
          needed, details will be included with the event announcement.
        </p>
      </Section>
      <Section eyebrow="Community life" title="You don't have to figure it out alone." tone="linen">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.6fr]">
          <p className="max-w-3xl text-lg leading-8 text-ink/75">
            TLC events create opportunities to learn from experienced members,
            ask thoughtful questions, and build relationships with people
            exploring similar paths. Participation is always voluntary and
            paced according to individual readiness.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/membership"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-6 py-3 font-ui text-sm font-semibold text-black transition hover:bg-gold/85"
            >
              Become a Member
            </Link>
            <Link
              href="/education"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-gold px-6 py-3 font-ui text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
            >
              Explore Education
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
