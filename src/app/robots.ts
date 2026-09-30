import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      {
        // AI crawlers — индексация в AI-поисковиках
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "OAI-SearchBot"],
        allow: "/",
      },
    ],
    sitemap: "https://safesync.dev/sitemap.xml",
  };
}
