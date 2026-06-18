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

  return (
    <main>
      <Hero
        eyebrow="Events"
        title="Gather, learn, and connect."
        body="Events are part of the community pathway for learning, reflection, and participation. Staff can publish and feature events from Sanity Studio."
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
          body="The events calendar gives staff a simple way to publish gatherings while keeping the public experience calm, clear, and easy to scan."
        />
      </Section>
      <Section title="Upcoming events">
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.title} className="rounded-lg border border-ink/10 bg-paper p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cedar">
                {event.date || "Date to be announced"}
              </p>
              <h2 className="mt-3 font-serif text-2xl">{event.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{event.description}</p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
