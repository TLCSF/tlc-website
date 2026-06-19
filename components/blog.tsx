import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/content";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 leading-8 text-ink/75">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-ui text-2xl font-semibold text-ink">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-gold pl-5 font-serif text-2xl leading-snug text-ink">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 leading-8 text-ink/75">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 leading-8 text-ink/75">
        {children}
      </ol>
    )
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <Link href={href} className="font-semibold text-river underline">
          {children}
        </Link>
      );
    }
  }
};

export function BlogPostCard({
  title,
  excerpt,
  category,
  date,
  imageSrc,
  imageAlt,
  href
}: {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-sm transition hover:border-gold/50"
    >
      <div className="relative aspect-[4/3] bg-linen">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="p-6">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.16em] text-gold">
          {category} · {formatPostDate(date)}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink">
          {title}
        </h2>
        <p className="mt-4 leading-7 text-ink/70">{excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-ui text-sm font-semibold text-river">
          Read post <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function FallbackBlogBody({ post }: { post: BlogPost }) {
  return (
    <div>
      {post.body.map((section) => (
        <section key={section.heading || section.paragraphs[0]} className="mt-10 first:mt-0">
          {section.heading ? (
            <h2 className="font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {section.heading}
            </h2>
          ) : null}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 leading-8 text-ink/75">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export function CmsBlogBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={portableTextComponents} />;
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}
