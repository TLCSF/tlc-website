import type { MetadataRoute } from "next";
import { educationArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    "",
    "/about",
    "/membership",
    "/education",
    "/community",
    "/events",
    "/faq",
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
    }))
  ];
}
