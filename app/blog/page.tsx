import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { getAllPosts } from "@/lib/blog";

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="py-12" aria-hidden />,
});
const CookiesPopup = dynamic(() => import("@/components/CookiesPopup"), {
  loading: () => null,
});

export const metadata: Metadata = {
  title: "Blog — AI Translation Insights & Guides",
  description:
    "Expert insights on AI-powered translation for churches, conferences, and live events. Practical guides, industry analysis, and product updates from the Exbabel team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — AI Translation Insights & Guides | Exbabel",
    description:
      "Expert insights on AI-powered translation for churches, conferences, and live events.",
    url: "https://exbabel.com/blog",
    type: "website",
    images: [
      {
        url: "https://exbabel.com/photos/blog/church-translation-hero.jpg",
        width: 1200,
        height: 675,
        alt: "Exbabel Blog — AI Translation Insights & Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exbabel Blog",
    description:
      "Expert insights on AI-powered translation for churches, conferences, and live events.",
    images: ["https://exbabel.com/photos/blog/church-translation-hero.jpg"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Blog", url: "https://exbabel.com/blog" }]}
      />

      <main className="min-h-screen bg-white">
        <Navbar />
        <BlogIndexClient posts={posts} />
        <Footer />
        <CookiesPopup />
      </main>
    </>
  );
}
