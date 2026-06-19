import { sanityFetch } from "@/sanity/lib/client";
import type { PortableTextBlock } from "@portabletext/react";

export type CmsEvent = {
  title: string;
  date?: string;
  description?: string;
  registrationLink?: string;
  membersOnly?: boolean;
};

export type CmsFaq = {
  question: string;
  answer: string;
  category?: string;
};

export type CmsMenuProduct = {
  title: string;
  category?: string;
  displayCategory?: string;
  price?: string;
  description?: string;
  servingDetails?: string;
  variants?: string[];
  available?: boolean;
  imageUrl?: string;
  imageAlt?: string;
};

export type CmsBlogPost = {
  title: string;
  slug: string;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
  featured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

export async function getPublishedEvents() {
  return sanityFetch<CmsEvent[]>({
    query:
      '*[_type == "event" && published == true] | order(date asc) {title, date, description, registrationLink, membersOnly}'
  });
}

export async function getPublishedFaqs() {
  return sanityFetch<CmsFaq[]>({
    query:
      '*[_type == "faq" && published == true] | order(sortOrder asc) {question, answer, category}'
  });
}

export async function getMemberMenuProducts() {
  return sanityFetch<CmsMenuProduct[]>({
    query:
      '*[_type == "menuProduct" && published == true && memberOnly == true] | order(sortOrder asc) {title, category, displayCategory, price, description, servingDetails, variants, available, "imageUrl": image.asset->url, "imageAlt": image.alt}'
  });
}

export async function getPublishedBlogPosts() {
  return sanityFetch<CmsBlogPost[]>({
    query:
      '*[_type == "blogPost" && published == true] | order(publishedAt desc) {title, "slug": slug.current, category, publishedAt, excerpt, featured, "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt, seoTitle, seoDescription}'
  });
}

export async function getPublishedBlogPost(slug: string) {
  return sanityFetch<CmsBlogPost | null>({
    query:
      '*[_type == "blogPost" && published == true && slug.current == $slug][0] {title, "slug": slug.current, category, publishedAt, excerpt, featured, "imageUrl": featuredImage.asset->url, "imageAlt": featuredImage.alt, body, seoTitle, seoDescription}',
    params: { slug }
  });
}
