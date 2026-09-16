"use client";

import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface LatestArticlesFeedProps {
  posts: BlogPost[];
}

export default function LatestArticlesFeed({ posts }: LatestArticlesFeedProps) {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Latest Articles
          </h2>
        </div>

        {/* Chronological Clean Feed */}
        <div className="divide-y divide-slate-100">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
            >
              <div className="flex items-center gap-6">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative w-24 sm:w-32 aspect-[1.4/1] rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0"
                >
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700 uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-1 mt-1 font-normal max-w-xl">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 flex-shrink-0 self-end sm:self-center">
                <span>{post.datePublished}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 font-sans font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
