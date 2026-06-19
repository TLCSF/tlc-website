import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { dosageLevels, educationArticles, seo } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const dosageSpectrumWidths = ["16%", "28%", "44%", "62%", "80%", "100%"];

const experienceFactors = [
  {
    title: "Individual sensitivity",
    body:
      "People may respond differently even when the same range is discussed. Past experience, body awareness, emotional state, and personal history can all matter."
  },
  {
    title: "Mushroom potency",
    body:
      "Natural materials can vary. A number on a scale does not tell the whole story of strength, freshness, variety, or how a person may respond."
  },
  {
    title: "Mindset and intention",
    body:
      "The inner posture someone brings into an experience can shape what comes forward. Intention offers a point of orientation without trying to control the outcome."
  },
  {
    title: "Environment and support",
    body:
      "Lighting, sound, privacy, trusted people, and a grounded setting can influence whether an experience feels spacious, safe, or overwhelming."
  },
  {
    title: "Preparation and timing",
    body:
      "Rest, schedule, emotional readiness, and the absence of unnecessary pressure can all support a more thoughtful approach."
  },
  {
    title: "Integration afterward",
    body:
      "Meaning often continues to unfold after the experience itself. Reflection, conversation, and gentle practice can help insights become more grounded."
  }
];

export function generateStaticParams() {
  return educationArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = educationArticles.find((item) => item.slug === slug);
  if (!article) return {};
  if (slug === "dosage-guide") {
    return {
      title: { absolute: seo.dosage.title },
      description: seo.dosage.description
    };
  }
  return { title: article.title, description: article.excerpt };
}

export default async function EducationArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = educationArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  const isDosage = slug === "dosage-guide";
  const articleImages: Record<string, { src: string; alt: string }> = {
    "dosage-guide": {
      src: "/images/tlc/dosage-card.jpg",
      alt: "The Living Church educational dosage guide card"
    },
    "set-and-setting": {
      src: "/images/tlc/dosage-candles.jpg",
      alt: "Candles and educational materials arranged inside The Living Church chapel"
    },
    integration: {
      src: "/images/tlc/event-space-03.jpg",
      alt: "The Living Church gathering space used for integration and community"
    },
    "sacred-mushroom-traditions": {
      src: "/images/tlc/chapel-pew.jpg",
      alt: "Chapel pews inside The Living Church"
    },
    "what-is-an-entheogenic-church": {
      src: "/images/tlc/front-desk.jpg",
      alt: "The Living Church front desk and welcome area"
    }
  };
  const articleImage = articleImages[slug] ?? {
    src: "/images/tlc/chapel-wide.jpg",
    alt: "Interior of The Living Church chapel"
  };

  return (
    <main>
      <Hero
        eyebrow="Education"
        title={article.title}
        body={article.body}
        imageSrc={articleImage.src}
        imageAlt={articleImage.alt}
        imageMode="cover"
      />
      {isDosage ? (
        <>
          <Section eyebrow="Important context" title="Educational, not prescriptive">
            <p className="max-w-3xl text-lg leading-8 text-ink/75">
              Dosage is one part of a larger spiritual and educational journey.
              This guide offers commonly discussed ranges as context, not as
              instructions. Intention, preparation, setting, community support,
              and integration all help shape how an experience is understood.
            </p>
          </Section>
          <Section eyebrow="Dosage spectrum" title="Commonly discussed ranges" tone="linen">
            <div className="rounded-lg border border-ink/10 bg-paper p-5 sm:p-8">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-ui text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                    From subtle to immersive
                  </p>
                  <p className="mt-3 max-w-2xl leading-7 text-ink/70">
                    These ranges are shown as a spectrum because experiences do
                    not always fit neatly into categories. They are best read
                    alongside preparation, setting, and integration.
                  </p>
                </div>
                <p className="font-ui text-sm font-semibold text-ink/60">
                  Educational reference only
                </p>
              </div>
              <div className="grid gap-5">
                {dosageLevels.map((level, index) => (
                  <div key={level.name} className="grid gap-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2 className="font-ui text-lg font-semibold">
                        {level.name}
                      </h2>
                      <p className="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-gold">
                        {level.range}
                      </p>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-linen">
                      <div
                        className="h-full rounded-full bg-gold"
                        style={{ width: dosageSpectrumWidths[index] }}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="max-w-3xl leading-7 text-ink/70">
                      {level.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dosageLevels.map((level) => (
                <article
                  key={level.name}
                  className="rounded-lg border border-ink/10 bg-paper p-6"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cedar">
                    {level.range}
                  </p>
                  <h2 className="mt-3 font-serif text-2xl">{level.name}</h2>
                  <p className="mt-3 leading-7 text-ink/70">
                    {level.description}
                  </p>
                </article>
              ))}
            </div>
          </Section>
          <Section eyebrow="Experience varies" title="A range is not the whole story.">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <p className="text-lg leading-8 text-ink/75">
                Individual sensitivity, mushroom potency, mindset, environment,
                and preparation can all shape the experience. A smaller amount
                may feel significant for one person, while another person may
                relate differently to the same range. TLC frames dosage as
                context within a broader practice of intention, discernment, and
                care.
              </p>
              <div className="rounded-lg bg-linen p-6">
                <p className="font-serif text-2xl font-semibold leading-tight">
                  The question is not only “how much?” It is also “why, where,
                  with whom, and how will this be integrated?”
                </p>
              </div>
            </div>
          </Section>
          <Section
            eyebrow="Factors that influence experience"
            title="What surrounds the number matters."
            tone="linen"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {experienceFactors.map((factor) => (
                <article
                  key={factor.title}
                  className="rounded-lg border border-ink/10 bg-paper p-6"
                >
                  <h2 className="font-ui text-xl font-semibold">
                    {factor.title}
                  </h2>
                  <p className="mt-3 leading-7 text-ink/70">{factor.body}</p>
                </article>
              ))}
            </div>
          </Section>
          <Section eyebrow="Preparation matters" title="Begin before the experience begins.">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <p className="max-w-3xl text-lg leading-8 text-ink/75">
                Preparation gives the experience a container. Before focusing
                on range alone, consider intention, timing, physical setting,
                emotional readiness, trusted support, and the responsibilities
                that come with sacred practice.
              </p>
              <Link
                href="/education/set-and-setting"
                className="inline-flex min-h-12 w-fit items-center justify-center rounded-md border border-gold px-6 py-3 font-ui text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
              >
                Explore Set &amp; Setting
              </Link>
            </div>
          </Section>
          <Section eyebrow="Integration matters" title="The meaning continues afterward." tone="linen">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <p className="max-w-3xl text-lg leading-8 text-ink/75">
                Integration is the grounded work of making sense of what
                surfaced. Journaling, rest, conversation, community support, and
                ordinary daily practice can help an experience become part of a
                larger path rather than a single isolated event.
              </p>
              <Link
                href="/education/integration"
                className="inline-flex min-h-12 w-fit items-center justify-center rounded-md border border-gold px-6 py-3 font-ui text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
              >
                Explore Integration
              </Link>
            </div>
          </Section>
          <Section eyebrow="Continue learning" title="Education supports readiness.">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <p className="max-w-3xl text-lg leading-8 text-ink/75">
                TLC encourages adults to approach sacred mushroom traditions
                with humility, patience, and community context. Explore more
                educational resources, or learn how membership creates a
                structured pathway into participation.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/education"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-6 py-3 font-ui text-sm font-semibold text-black transition hover:bg-gold/85"
                >
                  Explore Education
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-gold px-6 py-3 font-ui text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
                >
                  Become a Member
                </Link>
              </div>
            </div>
          </Section>
        </>
      ) : (
        <Section title={article.title}>
          <div className="prose-tlc max-w-3xl">
            <p>{article.body}</p>
            <p>
              TLC approaches this topic through education, intentionality, and
              community support. This material is designed to help adults learn,
              ask better questions, and prepare thoughtfully.
            </p>
          </div>
        </Section>
      )}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          mainEntityOfPage: `${siteConfig.url}/education/${article.slug}`
        }}
      />
    </main>
  );
}
