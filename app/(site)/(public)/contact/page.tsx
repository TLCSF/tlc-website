import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/site";

const serviceAreas = [
  "San Francisco, CA",
  "Oakland, CA",
  "Hayward, CA",
  "Concord, CA",
  "Vallejo, CA",
  "Berkeley, CA",
  "Richmond, CA",
  "San Mateo, CA",
  "Daly City, CA",
  "San Leandro, CA",
  "Sausalito, CA",
  "Mill Valley, CA",
  "Novato, CA",
  "San Rafael, CA",
  "Santa Rosa, CA",
  "Petaluma, CA",
  "Rohnert Park, CA",
  "Larkspur, CA",
  "Healdsburg, CA",
  "Napa, CA"
];

export const metadata: Metadata = {
  title: {
    absolute: "Contact The Living Church | San Francisco Entheogenic Church"
  },
  description:
    "Contact The Living Church in San Francisco. Learn about membership, events, education and service areas across the Bay Area."
};

export default function ContactPage() {
  return (
    <main>
      <Hero
        eyebrow="Contact"
        title="Contact The Living Church"
        body="Have a question about membership, events, educational resources, visiting TLC or accessing member resources? Send us a message and we’ll help point you in the right direction."
        imageSrc="/images/tlc/exterior.jpg"
        imageAlt="The Living Church entrance on Post Street in San Francisco"
        imageMode="cover"
      />
      <Section eyebrow="Get in touch" title="We are here to help.">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <InfoCard title="Location">
              <p>1081 Post St.</p>
              <p>San Francisco, CA 94109</p>
            </InfoCard>
            <InfoCard title="Hours">
              <p>Monday &ndash; Sunday</p>
              <p>12:00 PM &ndash; 8:00 PM</p>
            </InfoCard>
            <InfoCard title="Good reasons to reach out">
              <p>
                Membership questions, waiver support, account access, upcoming
                gatherings, educational resources and planning a first visit.
              </p>
            </InfoCard>
          </div>
          <ContactForm />
        </div>
      </Section>
      <Section eyebrow="Find us" title="1081 Post Street, San Francisco" tone="linen">
        <p className="mb-8 max-w-3xl text-lg leading-8 text-ink/75">
          Find us in San Francisco at 1081 Post Street. If you’re planning your
          first visit, feel free to reach out with questions before you arrive.
        </p>
        <div className="overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-sm">
          <iframe
            title="Map to The Living Church at 1081 Post St, San Francisco"
            src="https://www.google.com/maps?q=1081%20Post%20St%2C%20San%20Francisco%2C%20CA%2094109&output=embed"
            className="h-[360px] w-full grayscale sm:h-[460px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
      <Section
        eyebrow="Bay Area"
        title="Serving the Bay Area"
        tone="paper"
      >
        <div id="service-areas" className="scroll-mt-28">
          <p className="max-w-3xl text-lg leading-8 text-ink/75">
            The Living Church is rooted in San Francisco and welcomes adults
            21+ from across the Bay Area.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((area) => (
              <div
                key={area}
                className="rounded-lg border border-ink/10 bg-linen px-4 py-3 font-ui text-sm font-semibold text-ink"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: siteConfig.name,
          url: `${siteConfig.url}/contact`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "1081 Post St.",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94109",
            addressCountry: "US"
          },
          openingHours: "Mo-Su 12:00-20:00"
        }}
      />
    </main>
  );
}

function InfoCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-ink/10 bg-linen p-6">
      <h2 className="font-ui text-sm font-semibold uppercase tracking-[0.16em] text-gold">
        {title}
      </h2>
      <div className="mt-4 leading-7 text-ink/75">{children}</div>
    </section>
  );
}
