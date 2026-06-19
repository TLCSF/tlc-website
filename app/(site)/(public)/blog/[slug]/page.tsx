import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BlogPostCard,
  CmsBlogBody,
  FallbackBlogBody,
  formatPostDate
} from "@/components/blog";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { type CmsBlogPost, getPublishedBlogPost, getPublishedBlogPosts } from "@/lib/cms";
import { blogPosts, type BlogPost } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

type NormalizedPost = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  body?: PortableTextBlock[];
  fallback?: BlogPost;
  seoTitle?: string;
  seoDescription?: string;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function normalizeCmsPost(post: CmsBlogPost): NormalizedPost {
  return {
    title: post.title,
    slug: post.slug,
    date: post.publishedAt || new Date().toISOString(),
    category: post.category || "Education",
    excerpt: post.excerpt || "",
    imageSrc: post.imageUrl || "/images/tlc/chapel-pew.jpg",
    imageAlt: post.imageAlt || post.title,
    body: post.body,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription
  };
}

function normalizeFallbackPost(post: BlogPost): NormalizedPost {
  return {
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
    imageSrc: post.imageSrc,
    imageAlt: post.imageAlt,
    fallback: post
  };
}

async function getPost(slug: string) {
  const cmsPost = await getPublishedBlogPost(slug);
  if (cmsPost) return normalizeCmsPost(cmsPost);

  const fallbackPost = blogPosts.find((post) => post.slug === slug);
  return fallbackPost ? normalizeFallbackPost(fallbackPost) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [{ url: post.imageSrc }]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const cmsPosts = await getPublishedBlogPosts();
  const relatedSource = cmsPosts?.length
    ? cmsPosts.map(normalizeCmsPost)
    : blogPosts.map(normalizeFallbackPost);
  const related = relatedSource
    .filter(
      (item) =>
        item.slug !== post.slug &&
        (item.category === post.category || relatedSource.length <= 3)
    )
    .slice(0, 3);

  return (
    <main>
      <article>
        <section className="bg-linen py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <p className="font-ui text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                {post.category} · {formatPostDate(post.date)}
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.98] text-ink sm:text-7xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">
                {post.excerpt}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-paper shadow-soft">
              <Image
                src={post.imageSrc}
                alt={post.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </section>
        <Section>
          <div className="mx-auto max-w-3xl">
            {post.body?.length ? (
              <CmsBlogBody value={post.body} />
            ) : post.fallback ? (
              <FallbackBlogBody post={post.fallback} />
            ) : null}
          </div>
        </Section>
      </article>
      <Section eyebrow="Continue the path" title="Where to go next" tone="linen">
        <div className="grid gap-4 md:grid-cols-3">
          <CtaCard
            title="Education Hub"
            body="Read foundational guidance on dosage, set and setting, integration, and sacred mushroom traditions."
            href="/education"
          />
          <CtaCard
            title="Membership"
            body="Learn how account creation and waiver completion open the member pathway."
            href="/membership"
          />
          <CtaCard
            title="Events"
            body="See upcoming learning circles, gatherings, and community opportunities."
            href="/events"
          />
        </div>
      </Section>
      {related.length ? (
        <Section eyebrow="Related posts" title="Keep reading">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogPostCard
                key={item.slug}
                title={item.title}
                excerpt={item.excerpt}
                category={item.category}
                date={item.date}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                href={`/blog/${item.slug}`}
              />
            ))}
          </div>
        </Section>
      ) : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          image: post.imageSrc,
          mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`
        }}
      />
    </main>
  );
}

function CtaCard({
  title,
  body,
  href
}: {
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-ink/10 bg-paper p-6 transition hover:border-gold/50"
    >
      <h2 className="font-ui text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 leading-7 text-ink/70">{body}</p>
    </Link>
  );
}
