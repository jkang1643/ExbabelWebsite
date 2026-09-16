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
  const primaryPost = posts[0];
  const secondaryPosts = posts.slice(1);

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

        {/* Secondary Publication Sub-Nav - tight spacing to navbar */}
        <div className="pt-16 sm:pt-20">
          <BlogSubNav />
        </div>

        {/* Integrated Category Content Section - Fits in Viewport */}
        <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 border-b border-slate-100">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
            
            {/* Compact Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  TOPIC ARCHIVE · {posts.length} {posts.length === 1 ? "ARTICLE" : "ARTICLES"}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                  {category.name}
                </h1>
                <p className="text-slate-500 text-sm sm:text-base font-normal max-w-xl leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>

            {/* Articles Presentation */}
            {primaryPost ? (
              <div className="space-y-10">
                {/* Primary Article - Horizontal Split Hero Card that fits on screen */}
                <article className="group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-50/70 border border-slate-200/80 p-5 sm:p-7 lg:p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    
                    {/* Left: Article Image (5-6 cols) */}
                    <Link
                      href={`/blog/${primaryPost.slug}`}
                      className="lg:col-span-6 relative rounded-[20px] sm:rounded-[24px] overflow-hidden aspect-[1.5/1] bg-slate-200 block shadow-sm"
                    >
                      <img
                        src={primaryPost.featuredImage}
                        alt={primaryPost.featuredImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {/* Floating UI Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-[11px] font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{primaryPost.editorialPill.statusText || "Featured Guide"}</span>
                      </div>
                    </Link>

                    {/* Right: Article Details (6-7 cols) */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        <span className="text-primary font-bold">{primaryPost.category}</span>
                        <span>·</span>
                        <span>{primaryPost.readTime}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-400">{primaryPost.datePublished}</span>
                      </div>

                      <Link href={`/blog/${primaryPost.slug}`}>
                        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 group-hover:text-primary transition-colors leading-[1.18] mb-3">
                          {primaryPost.title}
                        </h2>
                      </Link>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 font-normal">
                        {primaryPost.excerpt}
                      </p>

                      <div className="flex items-center gap-4">
                        <Link
                          href={`/blog/${primaryPost.slug}`}
                          className="inline-flex items-center px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
                        >
                          Read Full Guide →
                        </Link>
                      </div>
                    </div>

                  </div>
                </article>

                {/* Additional Articles Grid if more than 1 exist */}
                {secondaryPosts.length > 0 && (
                  <div className="pt-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">
                      More in {category.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {secondaryPosts.map((post) => (
                        <article key={post.slug} className="group flex flex-col">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="relative rounded-[22px] overflow-hidden aspect-[1.62/1] bg-slate-100 block shadow-sm group-hover:shadow-md transition-shadow"
                          >
                            <img
                              src={post.featuredImage}
                              alt={post.featuredImageAlt}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                          <div className="pt-3">
                            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                              {post.readTime}
                            </span>
                            <Link href={`/blog/${post.slug}`}>
                              <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mt-1 line-clamp-2">
                                {post.title}
                              </h4>
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Editorial Note if category has no articles yet */
              <div className="rounded-[24px] bg-slate-50 border border-slate-200/70 p-8 sm:p-12 text-center max-w-xl mx-auto my-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                  EDITORIAL NOTICE
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  New guides in {category.name} are in production
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                  Our AV engineering team and ministry researchers are compiling handbooks for this subject. In the meantime, explore our core publications.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Browse All Publications →
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
