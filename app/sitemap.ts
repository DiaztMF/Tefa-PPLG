import type { MetadataRoute } from "next";
import { getNews, getProjects, getStudents } from "@/lib/db/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const [projects, students, articles] = await Promise.all([
    getProjects(),
    getStudents(),
    getNews(),
  ]);

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
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const showcaseRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/showcase/${project.id}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const studentRoutes: MetadataRoute.Sitemap = students.map((student) => ({
    url: `${baseUrl}/students/${student.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.createdAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...showcaseRoutes, ...studentRoutes, ...newsRoutes];
}
