import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://palitheravada.mcu.ac.th";
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/monastic-life", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/alms-patron", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/mukhopatha", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/graduate-curriculum", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/graduate-progress", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/complaints-tracking", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/file-viewer", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/planning-budget", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/library", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/research-qa", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/classrooms", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/vehicle-booking", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/meeting-rooms", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/academic-services", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/hr", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/finance-procurement", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/e-approval", priority: 0.75, changeFrequency: "daily" as const },
    { path: "/mcu-bridge", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/visitor-analytics", priority: 0.7, changeFrequency: "daily" as const },
    { path: "/chat-board", priority: 0.7, changeFrequency: "hourly" as const },
    { path: "/attendance-tracking", priority: 0.7, changeFrequency: "daily" as const },
    { path: "/users", priority: 0.6, changeFrequency: "weekly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
