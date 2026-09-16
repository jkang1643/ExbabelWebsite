import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import BlogSubNav from "@/components/blog/BlogSubNav";
import FeaturedStoryHero from "@/components/blog/FeaturedStoryHero";
import TopArticlesGrid from "@/components/blog/TopArticlesGrid";
import FeaturedTopicBanner from "@/components/blog/FeaturedTopicBanner";
import EditorsPickGrid from "@/components/blog/EditorsPickGrid";
import CategoryDiscovery from "@/components/blog/CategoryDiscovery";
import LargeProductCTA from "@/components/blog/LargeProductCTA";
import LatestArticlesFeed from "@/components/blog/LatestArticlesFeed";
import {
  getAllPosts,
  getFeaturedPost,
  getTopArticles,
  getEditorsPicks,
} from "@/lib/blog";

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="py-12" aria-hidden />,
});
const CookiesPopup = dynamic(() => import("@/components/CookiesPopup"), {
  loading: () => null,
});

export const metadata: Metadata = {
  title: "Exbabel Insights — AI Translation, Church AV & Live Audio Publication",
  description:
    "The official publication from Exbabel. In-depth engineering guides, church translation systems, sub-second latency benchmarks, and on-demand interpretation analysis.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Exbabel Insights — AI Translation & Live Services Publication",
    description:
      "Expert editorial guides on AI translation for churches, conferences, and live worship broadcasts.",
    url: "https://exbabel.com/blog",
    type: "website",
    images: [
      {
        url: "https://exbabel.com/photos/blog/church-translation-hero.jpg",
        width: 1200,
        height: 675,
        alt: "Exbabel Insights — AI Translation Publication",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exbabel Insights — AI Translation Publication",
    description:
      "Expert editorial guides on AI translation for churches, conferences, and live worship broadcasts.",
    images: ["https://exbabel.com/photos/blog/church-translation-hero.jpg"],
  },
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const topArticles = getTopArticles();
  const editorsPicks = getEditorsPicks();

  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Blog", url: "https://exbabel.com/blog" }]}
      />

      <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
        {/* Global Navigation */}
        <Navbar />

        {/* Secondary Publication Navigation */}
        <div className="pt-20 sm:pt-24">
          <BlogSubNav />
        </div>

        {/* 01. Featured Story Hero (40/60 Editorial Layout) */}
        <FeaturedStoryHero post={featuredPost} />

        {/* 02. Top Articles (3-Column Visual Editorial Grid) */}
        <TopArticlesGrid posts={topArticles} />

        {/* 03. Featured Topic Hub (50/50 Split Pillar Banner) */}
        <FeaturedTopicBanner />

        {/* 04. Editor's Pick (3-Column Experimental Art Direction) */}
        <EditorsPickGrid posts={editorsPicks} />

        {/* 05. Category Discovery (Subject Area Navigation) */}
        <CategoryDiscovery />

        {/* 06. Monumental Product Billboard CTA */}
        <LargeProductCTA />

        {/* 07. Chronological Latest Articles Feed */}
        <LatestArticlesFeed posts={allPosts} />

        {/* Global Footer & Cookie Consent */}
        <Footer />
        <CookiesPopup />
      </main>
    </>
  );
}
