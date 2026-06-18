import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId: projectId || "tlcplaceholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published"
});

export async function sanityFetch<T>({
  query,
  params = {}
}: {
  query: string;
  params?: Record<string, string | number | boolean>;
}): Promise<T | null> {
  if (!projectId) return null;
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 }
    });
  } catch (error) {
    console.warn(
      "Sanity fetch failed; rendering fallback content.",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
