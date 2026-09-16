import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map((post) => ({
    url: `https://exbabel.com${post.canonicalUrl}`,
    lastModified: new Date(post.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: "https://exbabel.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://exbabel.com/live", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://exbabel.com/impact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://exbabel.com/guides", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://exbabel.com/guides/listener", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://exbabel.com/guides/broadcasting", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://exbabel.com/demo", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://exbabel.com/how-it-works", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://exbabel.com/lab-test", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://exbabel.com/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...blogPosts,
    { url: "https://exbabel.com/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://exbabel.com/terms", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
