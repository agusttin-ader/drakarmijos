import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
