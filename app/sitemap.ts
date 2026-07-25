import type { MetadataRoute } from "next";
import { mockProjects, mockStudents } from "@/lib/data/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/showcase`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/students`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const showcaseRoutes: MetadataRoute.Sitemap = mockProjects.map((project) => ({
    url: `${baseUrl}/showcase/${project.id}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const studentRoutes: MetadataRoute.Sitemap = mockStudents.map((student) => ({
    url: `${baseUrl}/students/${student.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...showcaseRoutes, ...studentRoutes];
}
