"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";

interface TopArticlesGridProps {
  posts: BlogPost[];
}

export default function TopArticlesGrid({ posts }: TopArticlesGridProps) {
  const displayPosts = posts.slice(0, 6);

  return (
    <section className="mobile-fade-up w-full py-14 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className="mobile-fade-up max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Heading */}
        <div className="mobile-fade-up mb-10 sm:mb-12 flex items-center justify-between">
          <h2 className="mobile-fade-up text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Top Articles
          </h2>
          <span className="mobile-fade-up text-xs font-mono text-slate-400 font-semibold tracking-wider uppercase">
            Curated Insights
          </span>
        </div>

        {/* 3-Column Visual Editorial Grid with 5x Lift Animation */}
        <div className="mobile-fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {displayPosts.map((post) => (
            <motion.article
              key={post.slug}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="mobile-fade-up group flex flex-col"
            >
              {/* Rounded Image Container */}
              <Link
                href={`/blog/${post.slug}`}
                className="mobile-fade-up relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[1.62/1] bg-slate-100 block shadow-sm group-hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  className="mobile-fade-up w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="mobile-fade-up absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </Link>

              {/* Metadata & Title Below Image */}
              <div className="mobile-fade-up pt-4 flex flex-col">
                <span className="mobile-fade-up text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                  {post.category}
                </span>

                <Link href={`/blog/${post.slug}`} className="mobile-fade-up group-hover:text-primary transition-colors">
                  <h3 className="mobile-fade-up text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <div className="mobile-fade-up flex items-center gap-2 mt-3 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  <span>Read Article</span>
                  <span>→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
