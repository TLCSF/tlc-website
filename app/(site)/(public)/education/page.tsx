import type { Metadata } from "next";
import { FeatureCard } from "@/components/cards";
import { Hero } from "@/components/hero";
import { ImageFeature } from "@/components/image-feature";
import { Section } from "@/components/section";
import { educationArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Education Hub",
  description:
    "Explore TLC educational resources on dosage, set and setting, integration, sacred mushroom traditions, and entheogenic churches."
};

export default function EducationPage() {
  return (
    <main>
      <Hero
        eyebrow="Education Hub"
        title="A resource for learning and exploration."
        body="Whether you're new to sacred mushrooms or looking to deepen your understanding, the Education Hub provides resources designed to support informed and intentional participation."
        imageSrc="/images/tlc/dosage-candles.jpg"
        imageAlt="Candles and educational materials inside The Living Church chapel"
        imageMode="cover"
      />
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/chapel-pew.jpg"
          alt="Chapel seating inside The Living Church"
          eyebrow="Grounded learning"
          title="Education comes before participation."
          body="The education pathway is designed to help adults slow down, ask better questions, and prepare with care before engaging more deeply."
        />
      </Section>
      <Section eyebrow="Featured topics" title="Learn before you leap.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {educationArticles.map((article) => (
            <FeatureCard
              key={article.slug}
              title={article.title}
              body={article.excerpt}
              href={`/education/${article.slug}`}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
