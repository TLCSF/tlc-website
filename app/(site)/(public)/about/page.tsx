import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ImageFeature } from "@/components/image-feature";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About The Living Church",
  description:
    "Learn about The Living Church mission, values, and community-centered approach to education and sacred mushroom traditions."
};

export default function AboutPage() {
  return (
    <main>
      <Hero
        eyebrow="About"
        title="A community built around learning and exploration."
        body="The Living Church exists to support individuals seeking connection, understanding, and personal growth through education, community, and sacred mushroom traditions."
        imageSrc="/images/tlc/front-desk.jpg"
        imageAlt="The Living Church front desk and welcome area"
        imageMode="cover"
      />
      <Section eyebrow="Mission" title="Our mission">
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          To cultivate a welcoming spiritual community where individuals can
          explore consciousness, personal growth, and sacred mushroom traditions
          through education, intentional practice, and shared experience.
        </p>
      </Section>
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/exterior.jpg"
          alt="Exterior entrance of The Living Church in San Francisco"
          eyebrow="Purpose-built"
          title="A visible, welcoming home for community life."
          body="TLC's environment is quiet, warm, and intentional, supporting the trust and care that meaningful community work requires."
        />
      </Section>
      <Section eyebrow="Values" title="What guides us">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {["Community", "Education", "Intention", "Integration", "Exploration"].map(
            (value) => (
              <div
                key={value}
                className="rounded-lg border border-ink/10 bg-paper p-5 text-center font-semibold"
              >
                {value}
              </div>
            )
          )}
        </div>
      </Section>
    </main>
  );
}
