import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { faqCategories, faqs } from "@/lib/content";
import { getPublishedFaqs } from "@/lib/cms";

function categoryId(category: string) {
  return `faq-${category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about The Living Church membership, education, community, and sacramental framework."
};

export default async function FaqPage() {
  const cmsFaqs = await getPublishedFaqs();
  const cmsItems = cmsFaqs ?? [];
  const hasCompleteCmsLibrary = faqCategories.every((category) =>
    cmsItems.some((faq) => faq.category === category)
  );
  const items = hasCompleteCmsLibrary ? cmsItems : faqs;
  const uncategorizedItems = items.filter(
    (faq) => !faq.category || !faqCategories.includes(faq.category)
  );

  return (
    <main>
      <Hero
        eyebrow="FAQ"
        title="Questions are welcome."
        body="Find grounded answers about membership, education, community, and the role of sacraments within The Living Church."
        imageSide="left"
        imageSize="compact"
      />
      <Section
        eyebrow="FAQ library"
        title="Frequently asked questions"
        tone="linen"
      >
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          Start here for practical answers about membership, sacramental
          access, dosage, preparation, community and visiting The Living
          Church.
        </p>
        <nav
          aria-label="FAQ categories"
          className="mt-8 flex flex-wrap gap-2"
        >
          {faqCategories.map((category) => (
            <a
              key={category}
              href={`#${categoryId(category)}`}
              className="rounded-full border border-ink/15 bg-paper px-4 py-2 font-ui text-sm font-semibold text-ink transition hover:border-gold hover:text-gold"
            >
              {category}
            </a>
          ))}
        </nav>
        <div className="mt-12 grid gap-10">
          {faqCategories.map((category) => {
            const categoryItems = items.filter(
              (faq) => faq.category === category
            );
            if (!categoryItems.length) return null;
            const headingId = categoryId(category);

            return (
              <section key={category} aria-labelledby={headingId}>
                <h2
                  id={headingId}
                  className="font-ui text-2xl font-semibold text-ink"
                >
                  {category}
                </h2>
                <div className="mt-4 grid gap-4">
                  {categoryItems.map((faq) => (
                    <details
                      key={faq.question}
                      className="rounded-lg border border-ink/10 bg-paper p-5"
                    >
                      <summary className="cursor-pointer font-ui font-semibold">
                        {faq.question}
                      </summary>
                      <p className="mt-3 leading-7 text-ink/70">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
          {uncategorizedItems.length ? (
            <section aria-labelledby="faq-other">
              <h2
                id="faq-other"
                className="font-ui text-2xl font-semibold text-ink"
              >
                Other Questions
              </h2>
              <div className="mt-4 grid gap-4">
                {uncategorizedItems.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-lg border border-ink/10 bg-paper p-5"
                  >
                    <summary className="cursor-pointer font-ui font-semibold">
                      {faq.question}
                    </summary>
                    <p className="mt-3 leading-7 text-ink/70">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </Section>
      <Section eyebrow="Still have questions?" title="We’re here to help.">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr]">
          <p className="max-w-3xl text-lg leading-8 text-ink/75">
            If you&apos;re unsure where to begin, reach out to TLC or start
            with membership. Membership is free and gives adults 21+ access to
            the next steps.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/membership"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-6 py-3 font-ui text-sm font-semibold text-black transition hover:bg-gold/85"
            >
              Become a Member
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-gold px-6 py-3 font-ui text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer }
          }))
        }}
      />
    </main>
  );
}
