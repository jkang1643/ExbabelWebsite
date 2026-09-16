"use client";

import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface TopArticlesGridProps {
  posts: BlogPost[];
}

export default function TopArticlesGrid({ posts }: TopArticlesGridProps) {
  // Up to 6 articles in 3-column format
  const displayPosts = posts.slice(0, 6);

  return (
    <section className="w-full py-14 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Top Articles
          </h2>
        </div>

        {/* 3-Column Visual Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {displayPosts.map((post) => (
            <article key={post.slug} className="group flex flex-col">
              
              {/* Large Rounded Image Container - No outer card border or shadow */}
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

              {/* Metadata & Title Below Image */}
              <div className="pt-4 flex flex-col">
                <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                  {post.category}
                </span>

                <Link href={`/blog/${post.slug}`} className="group-hover:text-blue-600 transition-colors">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
