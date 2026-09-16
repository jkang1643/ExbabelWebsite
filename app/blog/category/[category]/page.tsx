import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import BlogSubNav from "@/components/blog/BlogSubNav";
import CategoryDiscovery from "@/components/blog/CategoryDiscovery";
import LargeProductCTA from "@/components/blog/LargeProductCTA";
import {
  BLOG_CATEGORIES,
  getCategoryBySlug,
  getPostsByCategory,
  getAllPosts,
} from "@/lib/blog";

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <footer className="py-12" aria-hidden />,
});
const CookiesPopup = dynamic(() => import("@/components/CookiesPopup"), {
  loading: () => null,
});

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found | Exbabel Insights",
    };
  }

  const title = `${category.name} Articles & Guides — Exbabel Insights`;
  const description = category.description;

  return {
    title,
    description,
    alternates: { canonical: `/blog/category/${category.slug}` },
    openGraph: {
      title,
      description,
      url: `https://exbabel.com/blog/category/${category.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(category.slug);
  const allPosts = getAllPosts();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Blog", url: "https://exbabel.com/blog" },
          {
            name: category.name,
            url: `https://exbabel.com/blog/category/${category.slug}`,
          },
        ]}
      />

      <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
        <Navbar />

        {/* Secondary Publication Sub-Nav */}
        <div className="pt-20 sm:pt-24">
          <BlogSubNav />
        </div>

        {/* Category Masthead Header */}
        <section className="py-12 sm:py-16 lg:py-20 border-b border-slate-100">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-4 block">
              TOPIC ARCHIVE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              {category.name}
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl font-normal max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                {posts.map((post) => (
                  <article key={post.slug} className="group flex flex-col">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[1.62/1] bg-slate-100 block"
                    >
                      <img
                        src={post.featuredImage}
                        alt={post.featuredImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </Link>

                    <div className="pt-4 flex flex-col">
                      <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                        <span>{post.category}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="group-hover:text-blue-600 transition-colors"
                      >
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-sm text-slate-600 line-clamp-2 mt-2 font-normal leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] bg-slate-50 border border-slate-200/60 p-10 sm:p-14 text-center max-w-2xl mx-auto">
                <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-3 block">
                  EDITORIAL UPDATE
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  New guides in {category.name} are coming soon
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Our AV engineering team and ministry researchers are preparing dedicated handbooks for this topic. In the meantime, explore our core publications.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Browse All Articles →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Category Exploration */}
        <CategoryDiscovery />

        {/* Large Product CTA */}
        <LargeProductCTA />

        <Footer />
        <CookiesPopup />
      </main>
    </>
  );
}
