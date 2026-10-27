import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/casestudies";
import { posts } from "@/lib/posts";

const SITE = "https://safesync.dev";
const PUBLISHED = new Date("2026-10-27");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/`,
      lastModified: PUBLISHED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudies.map((c) => ({
      url: `${SITE}/work/${c.slug}`,
      lastModified: PUBLISHED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
