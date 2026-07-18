import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://exbabel.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://exbabel.com/live", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://exbabel.com/impact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://exbabel.com/guides", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://exbabel.com/guides/listener", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://exbabel.com/guides/broadcasting", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://exbabel.com/demo", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://exbabel.com/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://exbabel.com/terms", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
