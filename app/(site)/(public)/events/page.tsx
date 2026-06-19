import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ImageFeature } from "@/components/image-feature";
import { Section } from "@/components/section";
import { sampleEvents } from "@/lib/content";
import { getPublishedEvents } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore upcoming education, community, and integration events at The Living Church."
};

export default async function EventsPage() {
  const cmsEvents = await getPublishedEvents();
  const events = cmsEvents?.length ? cmsEvents : sampleEvents;
  const eventTypes = [
    {
      title: "Introductory gatherings",
      body:
        "Low-pressure opportunities for prospective members to understand TLC's tone, expectations, and community standards."
    },
    {
      title: "Education sessions",
      body:
        "Topic-focused events may address preparation, dosage context, set and setting, traditions, or integration language."
    },
    {
      title: "Member conversations",
      body:
        "Active members may be invited into smaller conversations that support connection, care, and ongoing community life."
    }
  ];

  return (
    <main>
      <Hero
        eyebrow="Events"
        title="Gather, learn, and connect."
        body="Events give people a way to encounter TLC in real life: meet the space, hear the language, and understand the next step before moving further into membership."
        imageSrc="/images/tlc/event-space-02.jpg"
        imageAlt="The Living Church event space prepared for a group gathering"
        imageMode="cover"
      />
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/event-space-01.jpg"
          alt="A warmly lit event area inside The Living Church"
          eyebrow="In-person rhythm"
          title="Events support education and community connection."
          body="The calendar is intentionally simple. Upcoming events and gatherings will be posted here as they are announced, so visitors can quickly see what is coming up without sorting through a noisy event feed."
        />
      </Section>
      <Section eyebrow="What to expect" title="Events are part of the membership pathway.">
        <div className="grid gap-4 md:grid-cols-3">
          {eventTypes.map((item) => (
            <article key={item.title} className="rounded-lg border border-ink/10 bg-paper p-6">
              <h2 className="font-ui text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="Upcoming events">
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
    </main>
  );
}
