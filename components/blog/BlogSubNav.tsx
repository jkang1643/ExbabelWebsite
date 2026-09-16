"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BLOG_CATEGORIES } from "@/lib/blog";

export default function BlogSubNav() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-16 sm:top-20 z-40 transition-all">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-6">
        
        {/* Left: Publication Branding */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link
            href="/blog"
            className="flex items-center gap-2 group font-bold text-lg sm:text-xl text-slate-900 tracking-tight hover:text-blue-600 transition-colors"
          >
            <span>Exbabel Insights</span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Publication
            </span>
          </Link>
        </div>

        {/* Center: Topic Categories (scrollable on tablet/mobile) */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2 overflow-x-auto py-1 scrollbar-none"
          aria-label="Publication Topics"
        >
          <Link
            href="/blog"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
              pathname === "/blog" || pathname === "/blog/"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            All Topics
          </Link>

          {BLOG_CATEGORIES.map((cat) => {
            const href = `/blog/category/${cat.slug}`;
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-slate-900 text-white font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Quick CTA & Search Button */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 sm:w-56 text-xs px-3 py-1.5 rounded-full border border-slate-300 focus:outline-none focus:border-slate-900"
                  autoFocus
                  onBlur={() => !searchQuery && setIsSearchOpen(false)}
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs"
                  aria-label="Close search"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Search articles"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}
          </div>

          <a
            href="https://app.exbabel.com/live/checkout"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            Start Free
          </a>
        </div>

      </div>
    </div>
  );
}
