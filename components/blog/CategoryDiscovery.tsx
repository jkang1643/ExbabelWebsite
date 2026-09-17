"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/blog";

// Category SVG Icons for GitHub-style precision
function CategoryIcon({ slug }: { slug: string }) {
  switch (slug) {
    case "church-translation":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case "live-translation":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "ai-translation":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "church-technology":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      );
    case "guides":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "case-studies":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      );
  }
}

export default function CategoryDiscovery() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className="w-full py-16 sm:py-20 border-t border-slate-100 bg-slate-50/40">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                TOPICAL DIRECTORY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Browse by Subject Area
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-md font-normal leading-relaxed">
            Index of real-time translation architectures, church audio routing, and acoustic benchmarks.
          </p>
        </div>

        {/* GitHub-Style Quick Topic Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 pb-6 border-b border-slate-200/60">
          <span className="text-xs font-mono font-semibold text-slate-400 mr-1 hidden sm:inline">
            TOPICS:
          </span>
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-white text-slate-600 border border-slate-200/90 hover:border-primary/50 hover:text-primary hover:bg-blue-50/30 transition-colors shadow-xs"
            >
              <span className="text-slate-400 font-mono text-[10px]">#</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>

        {/* GitHub-Inspired Clean Minimalist Directory List (2 columns on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {BLOG_CATEGORIES.map((cat) => {
            const isHovered = hoveredSlug === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                onMouseEnter={() => setHoveredSlug(cat.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="group relative flex items-start gap-4 p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/80 hover:border-primary/40 hover:bg-white hover:shadow-[0_2px_12px_rgba(57,77,254,0.06)] transition-all duration-200"
              >
                {/* Clean Geometric Icon */}
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-100/80 text-slate-700 group-hover:bg-blue-50 group-hover:text-primary flex items-center justify-center transition-colors">
                  <CategoryIcon slug={cat.slug} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                      {cat.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Right Arrow indicator */}
                <div className="flex-shrink-0 self-center text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
