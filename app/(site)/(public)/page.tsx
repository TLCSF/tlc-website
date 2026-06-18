import type { Metadata } from "next";
import Image from "next/image";
import { FeatureCard } from "@/components/cards";
import { HomeHero } from "@/components/home-hero";
import { ImageFeature } from "@/components/image-feature";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { educationArticles, faqs, seo } from "@/lib/content";
import { siteConfig } from "@/lib/site";

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
          The Living Church exists to create a welcoming space for education,
          community, and personal exploration. Through church services,
          educational resources, events, and membership, we help individuals
          engage with sacred mushroom traditions in a thoughtful and intentional
          way.
        </p>
      </Section>
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/chapel-pew.jpg"
          alt="Pews inside The Living Church chapel beneath framed artwork"
          eyebrow="A real place to gather"
          title="A grounded spiritual home in San Francisco."
          body="The space is designed for learning, reflection, and community connection rather than a retail-first experience."
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
              A community of curious minds.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
              Growth happens in relationship with others. TLC creates room for
              adults to learn, reflect, and participate in community life
              together.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-linen shadow-soft">
            <Image
              src="/images/tlc/event-space-01.jpg"
              alt="The Living Church gathering space prepared for community events"
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
            Membership provides access to church services, educational
            resources, community events, and sacramental participation within
            the framework of The Living Church.
          </p>
          <a
            href="/join"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-5 py-3 font-semibold text-ink transition hover:bg-paper"
          >
            Start Membership
          </a>
        </div>
      </Section>
      <Section eyebrow="Questions" title="Common questions">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.slice(0, 4).map((faq) => (
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
