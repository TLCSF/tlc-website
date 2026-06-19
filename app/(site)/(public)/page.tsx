import type { Metadata } from "next";
import Image from "next/image";
import { FeatureCard } from "@/components/cards";
import { HomeHero } from "@/components/home-hero";
import { ImageFeature } from "@/components/image-feature";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { educationArticles, seo } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const homeFaqs = [
  {
    question: "How do I become a member?",
    answer:
      "Create an account, complete the membership registration, and sign the digital waiver. Once your waiver is matched to your account, member resources and the sacrament menu become available."
  },
  {
    question: "What are sacramental offerings?",
    answer:
      "Sacramental offerings are available to eligible members of The Living Church and are intended to support spiritual exploration, personal growth, and engagement with sacred mushroom traditions. Educational guidance is available to help members make informed decisions about their participation."
  },
  {
    question: "Is membership free?",
    answer:
      "Yes. Membership in The Living Church is free. Becoming a member provides access to educational resources, community gatherings, and other offerings available through the church."
  },
  {
    question: "How do I access the sacrament menu?",
    answer:
      "The sacrament menu is available to members after account registration and waiver completion. Log in with your member account to view available offerings."
  }
];

export const metadata: Metadata = {
  title: { absolute: seo.home.title },
  description: seo.home.description,
  openGraph: {
    title: seo.home.title,
    description: seo.home.description,
    url: siteConfig.url
  }
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <Section eyebrow="What is TLC?" title="More than membership.">
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          Membership is just the beginning. The Living Church exists to support
          thoughtful engagement with sacred mushroom traditions through
          education, community, guidance, and access to sacramental offerings.
        </p>
      </Section>
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/community-hands.jpg"
          alt="A group of hands resting together on a wooden table"
          eyebrow="A real place to gather"
          title="A grounded spiritual home in San Francisco."
          body="TLC offers a welcoming physical space where members can ask questions, connect with others, access educational resources, and engage with sacramental traditions in a thoughtful and supportive environment."
        />
      </Section>
      <Section eyebrow="Education" title="Learn before you leap." tone="linen">
        <div className="grid gap-4 md:grid-cols-3">
          {educationArticles.slice(0, 3).map((article) => (
            <FeatureCard
              key={article.slug}
              title={article.title}
              body={article.excerpt}
              href={`/education/${article.slug}`}
            />
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Community
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
              The journey is personal. The path doesn&apos;t have to be.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
              Meaningful experiences are often easier to navigate alongside
              others. Through gatherings, conversations, events, and shared
              learning, TLC helps members connect with a broader community
              exploring these traditions together.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-linen shadow-soft">
            <Image
              src="/images/tlc/community-sunset.jpg"
              alt="A small group gathered outdoors at sunset overlooking a lake"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </Section>
      <Section eyebrow="Membership" title="Membership opens the door." tone="ink">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <p className="max-w-3xl text-lg leading-8 text-paper/75">
            Membership is free and provides access to educational resources,
            community gatherings, guidance, and sacramental participation within
            The Living Church.
          </p>
          <a
            href="/join"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-5 py-3 font-semibold text-ink transition hover:bg-paper"
          >
            Join Today
          </a>
        </div>
      </Section>
      <Section eyebrow="Still curious?" title="Common questions.">
        <div className="grid gap-4 md:grid-cols-2">
          {homeFaqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border border-ink/10 bg-paper p-5"
            >
              <summary className="cursor-pointer font-semibold">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-ink/70">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url
        }}
      />
    </main>
  );
}
