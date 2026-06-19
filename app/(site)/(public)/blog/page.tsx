import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPostCard, formatPostDate } from "@/components/blog";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { type CmsBlogPost, getPublishedBlogPosts } from "@/lib/cms";
import { blogCategories, blogPosts, type BlogPost } from "@/lib/content";

type BlogListPost = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read The Living Church blog for grounded education, community context, spiritual practice, preparation, and integration resources."
};

function fromFallbackPost(post: BlogPost): BlogListPost {
  return {
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
    imageSrc: post.imageSrc,
    imageAlt: post.imageAlt
  };
}

function fromCmsPost(post: CmsBlogPost): BlogListPost {
  return {
    title: post.title,
    slug: post.slug,
    date: post.publishedAt || new Date().toISOString(),
    category: post.category || "Education",
    excerpt: post.excerpt || "",
    imageSrc: post.imageUrl || "/images/tlc/chapel-pew.jpg",
    imageAlt: post.imageAlt || post.title,
    featured: post.featured
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const cmsPosts = await getPublishedBlogPosts();
  const posts = cmsPosts?.length
    ? cmsPosts.map(fromCmsPost)
    : blogPosts.map(fromFallbackPost);
  const categories = Array.from(
    new Set([...blogCategories, ...posts.map((post) => post.category)])
  );
  const activeCategory = category && categories.includes(category) ? category : null;
  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;
  const featuredPost =
    posts.find((post) => post.featured) ?? posts.find((post) => post.slug === "how-sound-bath-healing-works") ?? posts[0];
  const gridPosts = filteredPosts.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <main>
      <Hero
        eyebrow="Blog"
        title="Education, community, and practice notes."
        body="The TLC Blog is a resource library for grounded learning, spiritual practice, community context, preparation, and integration."
        imageSrc="/images/tlc/chapel-pew.jpg"
        imageAlt="A quiet chapel space inside The Living Church"
        imageMode="cover"
      />
      <Section eyebrow="Resource library" title="Read before, between, and after gathering.">
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          These posts support the wider TLC pathway: learning the language,
          understanding the setting, preparing with care, and staying connected
          to community. Start here when you want a thoughtful entry point or a
          next question to bring into conversation.
        </p>
      </Section>
      {featuredPost ? (
        <Section eyebrow="Featured post" title="A good place to begin." tone="linen">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="grid overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-sm transition hover:border-gold/50 lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div className="relative min-h-72 bg-linen">
              <Image
                src={featuredPost.imageSrc}
                alt={featuredPost.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="font-ui text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                {featuredPost.category} · {formatPostDate(featuredPost.date)}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                {featuredPost.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
                {featuredPost.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-ui text-sm font-semibold text-river">
                Read featured post <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </Section>
      ) : null}
      <Section eyebrow="Browse" title="Latest posts">
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-2 font-ui text-sm font-semibold ${
              !activeCategory
                ? "border-gold bg-gold text-black"
                : "border-ink/15 bg-paper text-ink hover:border-gold"
            }`}
          >
            All
          </Link>
          {categories.map((item) => (
            <Link
              key={item}
              href={`/blog?category=${encodeURIComponent(item)}`}
              className={`rounded-full border px-4 py-2 font-ui text-sm font-semibold ${
                activeCategory === item
                  ? "border-gold bg-gold text-black"
                  : "border-ink/15 bg-paper text-ink hover:border-gold"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <BlogPostCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              category={post.category}
              date={post.date}
              imageSrc={post.imageSrc}
              imageAlt={post.imageAlt}
              href={`/blog/${post.slug}`}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
