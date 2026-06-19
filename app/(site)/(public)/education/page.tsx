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
      title: "Build a foundation",
      body:
        "Learn the language, traditions, dosage considerations, and core ideas that shape the TLC approach."
    },
    {
      title: "Participate thoughtfully",
      body:
        "Develop the shared vocabulary and understanding that support meaningful conversations with guides, staff, and fellow members."
    },
    {
      title: "Integrate what you've learned",
      body:
        "Reflection doesn't end when an experience does. Integration resources help transform insight into lasting growth."
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
        body="Whether you're completely new to sacred mushrooms or simply looking for deeper context, these resources are designed to help you explore thoughtfully, ask better questions, and make informed decisions about your path."
        imageSrc="/images/tlc/dosage-candles.jpg"
        imageAlt="Candles and educational materials inside The Living Church chapel"
        imageMode="cover"
      />
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/dosage-cards-education.jpg"
          alt="Printed dosage guide cards arranged on a wooden table"
          eyebrow="Grounded learning"
          title="Education comes before participation."
          body="At TLC, curiosity is encouraged, but rushing is not. These resources are designed to provide context, encourage reflection, and help members approach sacramental experiences with greater intention and understanding."
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
      <Section eyebrow="Why education matters" title="Context changes everything." tone="linen">
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          Sacred mushrooms have been used for centuries in ceremonial,
          spiritual, and healing traditions around the world. TLC believes that
          knowledge, preparation, and community support can help create a more
          meaningful and responsible relationship with these traditions.
        </p>
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
      <Section eyebrow="Positioning" title="Guidance, not guarantees." tone="linen">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-lg leading-8 text-ink/75">
            Every person&apos;s path is different. These resources are not medical
            advice, legal advice, or promises about any particular outcome.
            They are educational materials intended to help adults approach
            sacred mushroom traditions with greater awareness, context, and
            responsibility.
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
