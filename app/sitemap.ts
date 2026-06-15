import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const now = new Date();

  const staticPages = [
    "",
    "/services",
    "/areas",
    "/gallery",
    "/pricing",
    "/articles",
    "/contact",
    "/accessibility",
    "/terms",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const serviceHubs = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityHubs = cities.map((c) => ({
    url: `${base}/areas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const grid = services.flatMap((s) =>
    cities.map((c) => ({
      url: `${base}/services/${s.slug}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const articles = getAllArticles().map((a) => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...serviceHubs, ...cityHubs, ...grid, ...articles];
}
