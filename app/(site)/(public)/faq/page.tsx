import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { faqs } from "@/lib/content";
import { getPublishedFaqs } from "@/lib/cms";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about The Living Church membership, education, community, and sacramental framework."
};

export default async function FaqPage() {
  const cmsFaqs = await getPublishedFaqs();
  const items = cmsFaqs?.length ? cmsFaqs : faqs;

  return (
    <main>
      <Hero
        eyebrow="FAQ"
        title="Questions are welcome."
        body="Find grounded answers about membership, education, community, and the role of sacraments within The Living Church."
      />
      <Section title="Frequently asked questions">
        <div className="grid gap-4">
          {items.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-ink/10 bg-paper p-5">
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
