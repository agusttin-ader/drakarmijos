import type { MetadataRoute } from "next";
import { isSiteComingSoon } from "@/lib/site-config";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (isSiteComingSoon) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: new URL(siteUrl).host,
  };
}
