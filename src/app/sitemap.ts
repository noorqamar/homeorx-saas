import { MetadataRoute } from "next";
import { TREATMENTS } from "@/data/treatments";
import { BLOG_POSTS } from "@/data/blog-posts";

const BASE_URL = "https://drnoorulqamarhomeopathy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/womens-health",
    "/treatments",
    "/disease-kits",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cancellation-refund",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const treatmentRoutes = TREATMENTS.map((treatment) => ({
    url: `${BASE_URL}/treatments/${treatment.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: treatment.featured ? 0.9 : 0.7,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...treatmentRoutes, ...blogRoutes];
}
