import type { MetadataRoute } from "next";
import { blogPosts, educationArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    "",
    "/about",
    "/membership",
    "/education",
    "/community",
    "/blog",
    "/events",
    "/faq",
    "/contact",
    "/join",
    "/register",
    "/login"
  ];

  return [
    ...publicRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...educationArticles.map((article) => ({
      url: `${siteConfig.url}/education/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: article.slug === "dosage-guide" ? 0.95 : 0.75
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
