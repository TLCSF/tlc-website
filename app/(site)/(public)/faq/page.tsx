import type { Metadata } from "next";
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
        <div className="grid gap-10">
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
