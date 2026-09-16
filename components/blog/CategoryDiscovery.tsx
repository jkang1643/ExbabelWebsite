"use client";

import React from "react";
import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/blog";

export default function CategoryDiscovery() {
  return (
    <section className="w-full py-14 sm:py-18 lg:py-20 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-2 block">
              TOPICAL EXPLORATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Browse by Subject Area
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-md font-normal">
            Specialized publication sections covering real-time interpretation, AV routing, and AI church leadership.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className="group p-6 sm:p-8 rounded-[24px] bg-slate-50 hover:bg-slate-900 border border-slate-200/70 hover:border-slate-900 transition-all duration-300 flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 group-hover:text-slate-300 transition-colors leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 text-xs font-semibold text-slate-900 group-hover:text-sky-400 transition-colors">
                <span>View Articles</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
