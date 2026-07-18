import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Global Impact",
  description: "See how Exbabel is breaking language barriers across the globe with real-time AI translation supporting 180+ languages, 90+ AI voices, and 190+ countries.",
  alternates: { canonical: "/impact" },
  openGraph: {
    title: "Exbabel Global Impact — 180+ Languages, 190+ Countries",
    description: "See how Exbabel is breaking language barriers worldwide. Real-time AI translation for churches, conferences, and enterprises across 190+ countries.",
    url: "https://exbabel.com/impact",
    images: [{ url: "/photos/exbabel_live_translation_concept_1780070697205.webp", width: 1200, height: 630, alt: "Exbabel Global Impact" }],
  },
  twitter: { card: "summary_large_image", title: "Exbabel Global Impact — 180+ Languages, 190+ Countries", description: "Breaking language barriers worldwide with real-time AI translation across 190+ countries.", images: ["/photos/exbabel_live_translation_concept_1780070697205.webp"] },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return (<><BreadcrumbSchema items={[{ name: "Global Impact", url: "https://exbabel.com/impact" }]} />{children}</>);
}
