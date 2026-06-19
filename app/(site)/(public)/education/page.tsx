import type { Metadata } from "next";
import { FeatureCard } from "@/components/cards";
import { Hero } from "@/components/hero";
import { ImageFeature } from "@/components/image-feature";
import { Section } from "@/components/section";
import { educationArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Education Hub",
  description:
    "Explore TLC educational resources on dosage, set and setting, integration, sacred mushroom traditions, and entheogenic churches."
};

export default function EducationPage() {
  const educationPath = [
    {
      title: "Understand the basics",
      body:
        "Start with plain-language context on dosage ranges, set and setting, integration, traditions, and what an entheogenic church is."
    },
    {
      title: "Prepare for conversations",
      body:
        "The articles give members shared vocabulary for orientation, events, and personal preparation."
    },
    {
      title: "Return after experience",
      body:
        "Integration resources help members notice what needs attention afterward and bring better questions back to the community."
    }
  ];

  const principles = [
    "Educational, not prescriptive",
    "Respectful of tradition and context",
    "Designed for adults 21+",
    "Supportive of a clear membership pathway"
  ];

  return (
    <main>
      <Hero
        eyebrow="Education Hub"
        title="A practical starting point for informed participation."
        body="The Education Hub helps adults understand TLC's language, expectations, and sacramental context before they move deeper into membership."
        imageSrc="/images/tlc/dosage-candles.jpg"
        imageAlt="Candles and educational materials inside The Living Church chapel"
        imageMode="cover"
      />
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/chapel-pew.jpg"
          alt="Chapel seating inside The Living Church"
          eyebrow="Grounded learning"
          title="Education comes before participation."
          body="TLC's resources are meant to slow the process down. Members are encouraged to read, ask questions, complete required steps, and understand the setting before engaging more deeply."
        />
      </Section>
      <Section eyebrow="How education supports members" title="A path from curiosity to readiness.">
        <div className="grid gap-4 md:grid-cols-3">
          {educationPath.map((item) => (
            <article key={item.title} className="rounded-lg border border-ink/10 bg-paper p-6">
              <h2 className="font-ui text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Featured topics" title="Learn before you leap.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {educationArticles.map((article) => (
            <FeatureCard
              key={article.slug}
              title={article.title}
              body={article.excerpt}
              href={`/education/${article.slug}`}
            />
          ))}
        </div>
      </Section>
      <Section eyebrow="Positioning" title="What these resources are, and are not." tone="linen">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-lg leading-8 text-ink/75">
            TLC education is not medical advice, legal advice, or a promise of
            a particular experience. It is a shared foundation for adults who
            want to approach membership with more care, context, and humility.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle}
                className="rounded-lg border border-ink/10 bg-paper p-4 font-semibold"
              >
                {principle}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
