import { sanityFetch } from "@/sanity/lib/client";

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
  description?: string;
  available?: boolean;
  imageUrl?: string;
  imageAlt?: string;
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
      '*[_type == "menuProduct" && published == true && memberOnly == true] | order(sortOrder asc) {title, category, description, available, "imageUrl": image.asset->url, "imageAlt": image.alt}'
  });
}
