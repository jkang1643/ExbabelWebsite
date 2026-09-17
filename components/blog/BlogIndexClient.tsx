"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import EditorialCollageThumbnail from "./EditorialCollageThumbnail";
import BlogCategoryFilter from "./BlogCategoryFilter";

interface BlogIndexClientProps {
  posts: BlogPost[];
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Calculate unique categories and counts
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => cats.add(p.category));
    return ["All", ...Array.from(cats)];
  }, [posts]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [posts, activeCategory]);

  // Featured post (always primary article when "All" is active, or first filtered)
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="mobile-fade-up w-full">
      {/* Editorial Masthead Bar */}
      <section className="mobile-fade-up pt-28 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-slate-50/60 to-white">
        <div className="mobile-fade-up max-w-6xl mx-auto">
          {/* Top metadata ticker */}
          <div className="mobile-fade-up flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/60 text-xs font-mono">
            <div className="mobile-fade-up flex items-center gap-3">
              <span className="mobile-fade-up inline-flex items-center px-2 py-0.5 rounded bg-slate-900 text-white font-bold tracking-wider text-[10px] uppercase">
                EXBABEL EDITORIAL
              </span>
              <span className="mobile-fade-up text-slate-400">|</span>
              <span className="mobile-fade-up text-slate-600 font-medium">RESEARCH & GUIDES</span>
            </div>
            <div className="mobile-fade-up flex items-center gap-2 text-slate-500">
              <span className="mobile-fade-up w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="mobile-fade-up font-semibold text-slate-700">1.013s Caption</span>
              <span className="mobile-fade-up text-slate-300">·</span>
              <span className="mobile-fade-up font-semibold text-slate-700">2.027s Speech</span>
              <span className="mobile-fade-up text-slate-300">·</span>
              <span className="mobile-fade-up text-slate-600">180+ Languages</span>
            </div>
          </div>

          {/* Main Title & Editorial Statement */}
          <div className="mobile-fade-up pt-8 pb-6">
            <h1
              className="mobile-fade-up text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-none mb-4"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Publications & Insights
            </h1>
            <p className="mobile-fade-up text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Engineering breakthroughs, production guides, and in-depth analysis on real-time speech-to-speech AI translation for churches and live events.
            </p>
          </div>

          {/* Category Filter Bar */}
          <div className="mobile-fade-up pt-4">
            <BlogCategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              counts={categoryCounts}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mobile-fade-up py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {featuredPost && (
          <div className="mobile-fade-up mb-16">
            {/* Section Badge */}
            <div className="mobile-fade-up flex items-center gap-2 mb-6">
              <span className="mobile-fade-up text-[11px] font-mono font-bold uppercase tracking-widest text-primary">
                01 / {activeCategory === "All" ? "FEATURED PUBLICATION" : `${activeCategory.toUpperCase()}`}
              </span>
              <div className="mobile-fade-up flex-1 h-px bg-slate-200" />
            </div>

            {/* Featured Article Magazine Spread */}
            <article className="mobile-fade-up group bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mobile-fade-up grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Visual Thumbnail (Archetype 1 / Editorial Tech Collage) */}
                <div className="mobile-fade-up lg:col-span-7 p-3 sm:p-4 bg-slate-900/5">
                  <EditorialCollageThumbnail post={featuredPost} variant="hero" />
                </div>

                {/* Editorial Content */}
                <div className="mobile-fade-up lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="mobile-fade-up flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                      <span className="mobile-fade-up text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="mobile-fade-up text-xs text-slate-400">·</span>
                      <span className="mobile-fade-up text-xs font-mono font-medium text-slate-500">
                        {featuredPost.readTime}
                      </span>
                      <span className="mobile-fade-up text-xs text-slate-400">·</span>
                      <time
                        dateTime={featuredPost.datePublished}
                        className="mobile-fade-up text-xs text-slate-500 font-medium"
                      >
                        {new Date(featuredPost.datePublished).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    <h2 className="mobile-fade-up text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="mobile-fade-up text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-4 mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mobile-fade-up pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="mobile-fade-up flex items-center gap-3">
                      <div className="mobile-fade-up w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center font-mono">
                        EX
                      </div>
                      <div>
                        <div className="mobile-fade-up text-xs font-bold text-slate-900">{featuredPost.author}</div>
                        <div className="mobile-fade-up text-[10px] text-slate-500 font-mono">Verified Analysis</div>
                      </div>
                    </div>

                    <span className="mobile-fade-up inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                      Read publication
                      <svg className="mobile-fade-up w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        )}

        {/* Secondary Editorial Grid */}
        {remainingPosts.length > 0 && (
          <div className="mobile-fade-up mb-20">
            <div className="mobile-fade-up flex items-center gap-2 mb-8">
              <span className="mobile-fade-up text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                02 / ARTICLES & GUIDES
              </span>
              <div className="mobile-fade-up flex-1 h-px bg-slate-200" />
            </div>

            <div className="mobile-fade-up grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingPosts.map((post) => (
                <article
                  key={post.slug}
                  className="mobile-fade-up group bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <Link href={`/blog/${post.slug}`} className="mobile-fade-up flex-1 flex flex-col">
                    {/* Thumbnail */}
                    <div className="mobile-fade-up p-3 sm:p-4 bg-slate-900/5">
                      <EditorialCollageThumbnail post={post} variant="card" />
                    </div>

                    {/* Content */}
                    <div className="mobile-fade-up p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="mobile-fade-up flex items-center gap-2 mb-3">
                          <span className="mobile-fade-up text-xs font-bold text-primary bg-primary/10 px-3 py-0.5 rounded-full">
                            {post.category}
                          </span>
                          <span className="mobile-fade-up text-slate-300">·</span>
                          <span className="mobile-fade-up text-xs font-mono text-slate-500">{post.readTime}</span>
                        </div>

                        <h3 className="mobile-fade-up text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug mb-3">
                          {post.title}
                        </h3>

                        <p className="mobile-fade-up text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mobile-fade-up pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="mobile-fade-up text-slate-500 font-medium">By {post.author}</span>
                        <span className="mobile-fade-up font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Read article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty state if filtered results are 0 */}
        {filteredPosts.length === 0 && (
          <div className="mobile-fade-up text-center py-24 bg-slate-50 rounded-3xl border border-slate-200/60 mb-16">
            <p className="mobile-fade-up text-slate-500 font-medium mb-2">No publications found in this category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mobile-fade-up text-xs font-bold text-primary hover:underline"
            >
              Reset to all publications
            </button>
          </div>
        )}

        {/* Engineering Field Notes Section (Swiss Architectural Tech Layout) */}
        <section className="mobile-fade-up mb-20 bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-slate-800 shadow-2xl">
          {/* Subtle background grid pattern */}
          <div
            className="mobile-fade-up absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="mobile-fade-up relative z-10">
            <div className="mobile-fade-up flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="mobile-fade-up text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1">
                  CORE INFRASTRUCTURE
                </span>
                <h3 className="mobile-fade-up text-2xl sm:text-3xl font-black tracking-tight">
                  Production Streaming Benchmarks
                </h3>
              </div>
              <div className="mobile-fade-up text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                Audited Latency & Performance Specs
              </div>
            </div>

            <div className="mobile-fade-up grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="mobile-fade-up p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="mobile-fade-up text-3xl sm:text-4xl font-black font-mono text-sky-400 mb-2">
                  1.013s
                </div>
                <h4 className="mobile-fade-up text-sm font-bold text-white mb-2">Real-Time Caption Latency</h4>
                <p className="mobile-fade-up text-xs text-slate-400 leading-relaxed">
                  Sub-second live transcription streamed over WebSockets directly to listener mobile browsers.
                </p>
              </div>

              <div className="mobile-fade-up p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="mobile-fade-up text-3xl sm:text-4xl font-black font-mono text-purple-400 mb-2">
                  2.027s
                </div>
                <h4 className="mobile-fade-up text-sm font-bold text-white mb-2">Speech-to-Speech Latency</h4>
                <p className="mobile-fade-up text-xs text-slate-400 leading-relaxed">
                  End-to-end voice translation preserving speaker pacing and cadence across 180+ languages.
                </p>
              </div>

              <div className="mobile-fade-up p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="mobile-fade-up text-3xl sm:text-4xl font-black font-mono text-emerald-400 mb-2">
                  Zero
                </div>
                <h4 className="mobile-fade-up text-sm font-bold text-white mb-2">Permanent Audio Retention</h4>
                <p className="mobile-fade-up text-xs text-slate-400 leading-relaxed">
                  Audio streams are processed in real time and never stored permanently unless explicitly enabled.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Publication Dispatch / Consultation CTA Card */}
        <section className="mobile-fade-up rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
          <div className="mobile-fade-up max-w-2xl mx-auto">
            <span className="mobile-fade-up inline-block text-xs font-mono font-bold tracking-widest text-primary uppercase mb-3">
              Deploy Exbabel Live
            </span>
            <h3 className="mobile-fade-up text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              Bring Real-Time Translation to Your Next Service or Conference
            </h3>
            <p className="mobile-fade-up text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
              No expensive translation booths or proprietary receivers. Attendees simply scan a QR code and listen on their own phones in 180+ languages.
            </p>
            <div className="mobile-fade-up flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://app.exbabel.com/translate/checkout?plan=starter"
                className="mobile-fade-up px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all duration-200 hover:scale-105"
              >
                Start 30-Day Free Trial
              </a>
              <Link
                href="/demo"
                className="mobile-fade-up px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 transition-all duration-200"
              >
                Schedule an AV Consultation
              </Link>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
