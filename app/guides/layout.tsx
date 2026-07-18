import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Guides",
  description: "Step-by-step setup guides for Exbabel. Learn how to join sessions as a listener, configure church broadcasting, manage audio settings, and get started in minutes.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Exbabel Setup Guides — Get Started in Minutes",
    description: "Step-by-step guides for listeners and broadcasters. Learn how to set up real-time translation for your church or event.",
    url: "https://exbabel.com/guides",
    images: [{ url: "/photos/exbabel_live_translation_concept_1780070697205.webp", width: 1200, height: 630, alt: "Exbabel Setup Guides" }],
  },
  twitter: { card: "summary_large_image", title: "Exbabel Setup Guides — Get Started in Minutes", description: "Step-by-step guides for listeners and broadcasters to set up real-time translation.", images: ["/photos/exbabel_live_translation_concept_1780070697205.webp"] },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (<><BreadcrumbSchema items={[{ name: "Guides", url: "https://exbabel.com/guides" }]} />{children}</>);
}
