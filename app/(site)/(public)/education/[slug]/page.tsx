import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { dosageLevels, educationArticles, seo } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

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
              Experiences vary based on many factors, including individual
              sensitivity, preparation, mindset, environment, and mushroom
              potency. This guide is educational in nature and should not be
              interpreted as medical advice.
            </p>
          </Section>
          <Section eyebrow="Dosage spectrum" title="Commonly discussed ranges" tone="linen">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          <Section eyebrow="Preparation" title="Preparation matters.">
            <p className="max-w-3xl text-lg leading-8 text-ink/75">
              Dosage is only one part of the experience. Mindset, environment,
              intention, and integration all play an important role in shaping
              meaningful outcomes.
            </p>
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
