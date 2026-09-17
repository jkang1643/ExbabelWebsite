"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";

interface EditorsPickGridProps {
  posts: BlogPost[];
}

export default function EditorsPickGrid({ posts }: EditorsPickGridProps) {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Editor&apos;s Pick
          </h2>
        </div>

        {/* 3 Curated Cards with 5x Enhanced Motion & Floating Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Pick 1: Purple 3D Speech Engine */}
          <motion.article
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="group flex flex-col"
          >
            <Link
              href="/blog/on-demand-interpretation-services"
              className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[1.62/1] bg-gradient-to-tr from-[#2E1065] via-[#581C87] to-[#7E22CE] p-6 flex flex-col justify-between shadow-md group-hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 md:backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase">
                  Analysis
                </span>
                <span className="text-purple-200 text-xs font-mono">0.98s</span>
              </div>

              {/* 3D Floating Pill with Continuous Float */}
              <motion.div
                animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="self-center my-auto bg-white/95 md:backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/60"
              >
                <span className="text-base text-purple-600">✦</span>
                <span className="text-xs font-bold text-slate-900">AI Speech Engine</span>
              </motion.div>

              <div className="flex items-center justify-between text-purple-200 text-xs font-medium">
                <span>180+ Languages</span>
                <span className="font-bold text-white group-hover:translate-x-2 transition-transform">$200/hr Human vs AI →</span>
              </div>
            </Link>

            <div className="pt-4 flex flex-col">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                AI Translation
              </span>
              <Link href="/blog/on-demand-interpretation-services" className="group-hover:text-primary transition-colors">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  On-demand interpretation vs. $200/hr human interpreters: the 2026 economic breakdown
                </h3>
              </Link>
            </div>
          </motion.article>

          {/* Pick 2: Church Sanctuary Architecture */}
          <motion.article
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="group flex flex-col"
          >
            <Link
              href="/blog/church-translation-system"
              className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[1.62/1] bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 p-6 flex flex-col justify-between shadow-md group-hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold tracking-wider uppercase">
                  Field Report
                </span>
                <span className="text-slate-300 text-xs font-mono">14 min</span>
              </div>

              {/* Center Floating UI Badge */}
              <motion.div
                animate={{ y: [-6, 6, -6], rotate: [1, -1, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="self-center my-auto bg-white/95 md:backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/60"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-900">18 Listeners · Spanish</span>
              </motion.div>

              <div className="flex items-center justify-between text-slate-300 text-xs font-medium">
                <span>Zero Receiver Hardware</span>
                <span className="font-bold text-white group-hover:translate-x-2 transition-transform">Read Story →</span>
              </div>
            </Link>

            <div className="pt-4 flex flex-col">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                Church Translation
              </span>
              <Link href="/blog/church-translation-system" className="group-hover:text-primary transition-colors">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  How modern churches broadcast bilingual services with zero equipment rentals
                </h3>
              </Link>
            </div>
          </motion.article>

          {/* Pick 3: Warm Terracotta Benchmark */}
          <motion.article
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="group flex flex-col"
          >
            <Link
              href="/lab-test"
              className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[1.62/1] bg-gradient-to-tr from-[#EA580C] via-[#F97316] to-[#FB923C] p-6 flex flex-col justify-between shadow-md group-hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 md:backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase">
                  Benchmark
                </span>
                <span className="text-orange-100 text-xs font-mono">IEEE 829</span>
              </div>

              {/* Center Floating Indicator */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="self-center my-auto bg-slate-950 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/20"
              >
                <span className="text-orange-400 font-bold">1.013s</span>
                <span className="text-xs font-semibold">Latency Certified</span>
              </motion.div>

              <div className="flex items-center justify-between text-orange-100 text-xs font-medium">
                <span>BLEU & ChrF++ Scores</span>
                <span className="font-bold text-white group-hover:translate-x-2 transition-transform">View Lab Tests →</span>
              </div>
            </Link>

            <div className="pt-4 flex flex-col">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                Engineering
              </span>
              <Link href="/lab-test" className="group-hover:text-primary transition-colors">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  The latency milestone: sub-second sermon captions and real-time audio playback
                </h3>
              </Link>
            </div>
          </motion.article>

        </div>

      </div>
    </section>
  );
}
