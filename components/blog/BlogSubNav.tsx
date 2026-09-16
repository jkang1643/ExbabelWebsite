"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BLOG_CATEGORIES } from "@/lib/blog";

export default function BlogSubNav() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedTab, setClickedTab] = useState<string | null>(null);

  const isAllActive = pathname === "/blog" || pathname === "/blog/";

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-16 sm:top-20 z-40 transition-all shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-14 sm:h-15 flex items-center justify-between gap-4">
        
        {/* Left: Publication Branding */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/blog"
            className="flex items-center gap-2 group font-bold text-base sm:text-lg text-slate-900 tracking-tight hover:text-primary transition-colors"
          >
            <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
              Exbabel Insights
            </motion.span>
            <span className="hidden sm:inline-block text-[9px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
              Publication
            </span>
          </Link>
        </div>

        {/* Center: Topic Categories - NO horizontal scrollbar visible, compact responsive tabs */}
        <nav
          className="hidden md:flex items-center gap-1 xl:gap-1.5 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 relative flex-1 justify-center max-w-3xl"
          aria-label="Publication Topics"
        >
          {/* "All Topics" Tab */}
          <Link
            href="/blog"
            onClick={() => setClickedTab("all")}
            className="relative text-[11px] xl:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap z-10 block flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 600, damping: 20 }}
              className={`relative px-2.5 xl:px-3 py-1 rounded-full ${
                isAllActive ? "text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isAllActive && (
                <motion.span
                  layoutId="activeSubNavPill"
                  className="absolute inset-0 rounded-full bg-slate-950 shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span>All Articles</span>
            </motion.div>
          </Link>

          {/* Category Tabs */}
          {BLOG_CATEGORIES.map((cat) => {
            const href = `/blog/category/${cat.slug}`;
            const isActive = pathname.startsWith(href);

            return (
              <Link
                key={cat.slug}
                href={href}
                onClick={() => setClickedTab(cat.slug)}
                className="relative text-[11px] xl:text-xs tracking-wide transition-colors whitespace-nowrap z-10 block flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 600, damping: 20 }}
                  className={`relative px-2.5 xl:px-3 py-1 rounded-full font-medium ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSubNavPill"
                      className="absolute inset-0 rounded-full bg-slate-950 shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span>{cat.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Right: Quick CTA & Search Button */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="relative">
            {isSearchOpen ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 sm:w-44 text-xs px-3 py-1 rounded-full border border-slate-300 focus:outline-none focus:border-slate-900 shadow-inner"
                  autoFocus
                  onBlur={() => !searchQuery && setIsSearchOpen(false)}
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs p-1"
                  aria-label="Close search"
                >
                  ✕
                </button>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.88 }}
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
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
              </motion.button>
            )}
          </div>

          <motion.a
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            href="https://app.exbabel.com/live/checkout"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Start Free
          </motion.a>
        </div>

      </div>
    </div>
  );
}
