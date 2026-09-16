"use client";

import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface FeaturedStoryHeroProps {
  post: BlogPost;
}

export default function FeaturedStoryHero({ post }: FeaturedStoryHeroProps) {
  return (
    <section className="w-full pt-10 sm:pt-14 lg:pt-16 pb-16 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: 38-40% Editorial Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-mono font-semibold tracking-widest text-slate-400 uppercase mb-4 sm:mb-6 block">
              MAIN FEATURED POST
            </span>

            <Link href={`/blog/${post.slug}`} className="group">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 tracking-tight leading-[1.08] mb-6 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h1>
            </Link>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-normal">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
              >
                Read More
              </Link>
              <span className="text-xs text-slate-400 font-mono">
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Right: 60-62% Large Rounded Editorial Image Container */}
          <div className="lg:col-span-7">
            <Link
              href={`/blog/${post.slug}`}
              className="group block relative rounded-[28px] sm:rounded-[36px] overflow-hidden aspect-[1.45/1] sm:aspect-[1.52/1] bg-gradient-to-br from-sky-100 via-indigo-50 to-slate-100 border border-slate-200/60 shadow-sm"
            >
              {/* Background Editorial Graphic Image */}
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt}
                className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
              />

              {/* Floating UI Pill Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-800 tracking-tight">
                  {post.editorialPill.statusText || "Live Translation"}
                </span>
              </div>

              {/* Bottom Subtle Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-medium">Click to read full article</span>
                <span className="font-semibold">Exbabel Editorial →</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
