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
  const offerings = [
    {
      title: "A prepared environment",
      body:
        "TLC offers a physical church setting in San Francisco with a front desk, gathering areas, educational materials, and rooms arranged for calm, attentive group experiences."
    },
    {
      title: "A guided membership path",
      body:
        "Prospective members move through account creation, registration, and waiver completion before member-only resources are opened."
    },
    {
      title: "Education before access",
      body:
        "Public articles, dosage context, preparation guidance, and integration material help adults understand the language and responsibilities of sacramental participation."
    }
  ];

  const values = [
    {
      title: "Care",
      body: "We design the member path to be clear, paced, and respectful of the seriousness of the work."
    },
    {
      title: "Context",
      body: "We place sacred mushroom traditions inside an educational and spiritual frame rather than a retail-first experience."
    },
    {
      title: "Community",
      body: "We make room for adults who want a grounded place to ask questions, attend gatherings, and stay connected."
    },
    {
      title: "Integration",
      body: "We emphasize preparation, conversation, and meaning-making before and after important experiences."
    }
  ];

  return (
    <main>
      <Hero
        eyebrow="About"
        title="A spiritual home for education, care, and sacred practice."
        body="The Living Church is a San Francisco-based entheogenic church created for adults who want a thoughtful, community-centered way to approach sacred mushroom traditions."
        imageSrc="/images/tlc/front-desk.jpg"
        imageAlt="The Living Church front desk and welcome area"
        imageMode="cover"
      />
      <Section eyebrow="Mission" title="Our mission">
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          TLC exists to create a trusted church environment where education,
          preparation, and community care come before access. We help adults
          understand the responsibilities, language, and spiritual context of
          sacramental work so participation can happen with greater clarity and
          respect.
        </p>
      </Section>
      <Section eyebrow="What TLC does" title="A church model with a clear pathway." tone="linen">
        <div className="grid gap-4 md:grid-cols-3">
          {offerings.map((item) => (
            <article key={item.title} className="rounded-lg border border-ink/10 bg-paper p-6">
              <h2 className="font-ui text-2xl font-semibold">{item.title}</h2>
              <p className="mt-4 leading-7 text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <ImageFeature
          src="/images/tlc/exterior.jpg"
          alt="Exterior entrance of The Living Church in San Francisco"
          eyebrow="Purpose-built"
          title="A visible, welcoming home for community life."
          body="TLC's environment is quiet, warm, and intentional, supporting the trust and care that meaningful community work requires."
        />
      </Section>
      <Section eyebrow="Values" title="What guides us">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-lg border border-ink/10 bg-paper p-6"
            >
              <h2 className="font-ui text-2xl font-semibold">{value.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{value.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
