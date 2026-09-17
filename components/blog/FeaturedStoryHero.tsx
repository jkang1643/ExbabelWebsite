"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";

interface FeaturedStoryHeroProps {
  post: BlogPost;
}

export default function FeaturedStoryHero({ post }: FeaturedStoryHeroProps) {
  return (
    <section className="mobile-fade-up w-full pt-10 sm:pt-14 lg:pt-16 pb-16 lg:pb-24">
      <div className="mobile-fade-up max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="mobile-fade-up grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: 38-40% Editorial Content */}
          <div className="mobile-fade-up lg:col-span-5 flex flex-col justify-center">
            <span className="mobile-fade-up text-xs font-mono font-semibold tracking-widest text-slate-400 uppercase mb-4 sm:mb-6 block">
              MAIN FEATURED POST
            </span>

            <Link href={`/blog/${post.slug}`} className="mobile-fade-up group">
              <h1 className="mobile-fade-up text-3xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 tracking-tight leading-[1.08] mb-6 group-hover:text-primary transition-colors">
                {post.title}
              </h1>
            </Link>

            <p className="mobile-fade-up text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-normal">
              {post.excerpt}
            </p>

            <div className="mobile-fade-up flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="mobile-fade-up inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-md"
                >
                  Read More →
                </Link>
              </motion.div>
              <span className="mobile-fade-up text-xs text-slate-400 font-mono">
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Right: 60-62% Large Rounded Editorial Image Container with 5x Dynamic Motion */}
          <div className="mobile-fade-up lg:col-span-7">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="mobile-fade-up relative"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="mobile-fade-up group block relative rounded-[28px] sm:rounded-[36px] overflow-hidden aspect-[1.45/1] sm:aspect-[1.52/1] bg-gradient-to-br from-sky-100 via-indigo-50 to-slate-100 border border-slate-200/60 shadow-lg group-hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Background Editorial Graphic Image with 5x Zoom Effect */}
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  className="mobile-fade-up w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Floating UI Pill Badge with Continuous Floating Animation */}
                <motion.div
                  animate={{ y: [-8, 6, -8], rotate: [-1, 1, -1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="mobile-fade-up absolute top-6 right-6 bg-white/95 md:backdrop-blur-md px-4 py-2.5 rounded-full border border-black/10 shadow-xl flex items-center gap-2.5 z-10"
                >
                  <span className="mobile-fade-up relative flex h-2.5 w-2.5">
                    <span className="mobile-fade-up animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="mobile-fade-up relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="mobile-fade-up text-xs font-bold text-slate-900 tracking-tight">
                    {post.editorialPill.statusText || "Live Translation"}
                  </span>
                </motion.div>

                {/* Bottom Overlay with dynamic reveal */}
                <div className="mobile-fade-up absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mobile-fade-up font-medium tracking-wide">Click to read full article</span>
                  <span className="mobile-fade-up font-bold text-sky-300">Exbabel Editorial →</span>
                </div>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
