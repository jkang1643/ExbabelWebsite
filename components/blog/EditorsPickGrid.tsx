"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";

interface EditorsPickGridProps {
  posts?: BlogPost[];
}

export default function EditorsPickGrid({ posts }: EditorsPickGridProps) {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12 flex items-center justify-between">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Editor&apos;s Pick
          </h2>
          <span className="text-xs font-mono text-slate-400 font-semibold tracking-wider uppercase">
            Curated Editorials
          </span>
        </div>

        {/* 3 Curated Cards with 5x Enhanced Motion & Floating Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Pick 1: Best Real-Time Translation Apps 2026 (Deep Indigo / Violet) */}
          <motion.article
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="group flex flex-col"
          >
            <Link
              href="/blog/best-real-time-translation-apps"
              className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[1.62/1] bg-gradient-to-tr from-[#1E1B4B] via-[#312E81] to-[#4338CA] p-6 flex flex-col justify-between shadow-md group-hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 md:backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase">
                  Buyer&apos;s Guide
                </span>
                <span className="text-indigo-200 text-xs font-mono font-semibold">2026 Benchmark</span>
              </div>

              {/* 3D Floating Pill with Continuous Float */}
              <motion.div
                animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="self-center my-auto bg-white/95 md:backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/60"
              >
                <span className="text-base text-indigo-600">✦</span>
                <span className="text-xs font-bold text-slate-900">One-to-Many Audio &amp; Captions</span>
              </motion.div>

              <div className="flex items-center justify-between text-indigo-200 text-xs font-medium">
                <span>Multi-App Comparison</span>
                <span className="font-bold text-white group-hover:translate-x-2 transition-transform">Compare 2026 Apps →</span>
              </div>
            </Link>

            <div className="pt-4 flex flex-col">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                Live Translation
              </span>
              <Link href="/blog/best-real-time-translation-apps" className="group-hover:text-primary transition-colors">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  Best real-time translation apps for live events: 2026 buyer&apos;s comparison
                </h3>
              </Link>
            </div>
          </motion.article>

          {/* Pick 2: Church Translation Apps vs Browser Links (Sanctuary Emerald) */}
          <motion.article
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="group flex flex-col"
          >
            <Link
              href="/blog/church-translation-apps"
              className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[1.62/1] bg-gradient-to-tr from-[#064E3B] via-[#065F46] to-[#047857] p-6 flex flex-col justify-between shadow-md group-hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[11px] font-semibold tracking-wider uppercase">
                  Usability Report
                </span>
                <span className="text-emerald-100 text-xs font-mono font-semibold">11 min</span>
              </div>

              {/* Center Floating UI Badge with Pulse */}
              <motion.div
                animate={{ y: [-6, 6, -6], rotate: [1, -1, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="self-center my-auto bg-white/95 md:backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/60"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-900">Zero App Download · QR Link</span>
              </motion.div>

              <div className="flex items-center justify-between text-emerald-100 text-xs font-medium">
                <span>iPhone Autoplay Fix</span>
                <span className="font-bold text-white group-hover:translate-x-2 transition-transform">Read Field Guide →</span>
              </div>
            </Link>

            <div className="pt-4 flex flex-col">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                Church Translation
              </span>
              <Link href="/blog/church-translation-apps" className="group-hover:text-primary transition-colors">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  Church translation apps vs. browser links: why your translation doesn&apos;t need an app
                </h3>
              </Link>
            </div>
          </motion.article>

          {/* Pick 3: Church Interpreter vs AI Translation (Warm Terracotta / Amber) */}
          <motion.article
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="group flex flex-col"
          >
            <Link
              href="/blog/church-interpreter-vs-ai-translation"
              className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[1.62/1] bg-gradient-to-tr from-[#7C2D12] via-[#C2410C] to-[#EA580C] p-6 flex flex-col justify-between shadow-md group-hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 md:backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase">
                  Pastoral Analysis
                </span>
                <span className="text-orange-100 text-xs font-mono font-semibold">10 min</span>
              </div>

              {/* Center Floating Indicator */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="self-center my-auto bg-slate-950 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/20"
              >
                <span className="text-amber-400 font-bold">✦</span>
                <span className="text-xs font-semibold">Human Nuance · AI Scale</span>
              </motion.div>

              <div className="flex items-center justify-between text-orange-100 text-xs font-medium">
                <span>Volunteer vs Automation</span>
                <span className="font-bold text-white group-hover:translate-x-2 transition-transform">Explore Hybrid Model →</span>
              </div>
            </Link>

            <div className="pt-4 flex flex-col">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                Pastoral &amp; AV Strategy
              </span>
              <Link href="/blog/church-interpreter-vs-ai-translation" className="group-hover:text-primary transition-colors">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  Church interpreter vs. AI translation: when to keep volunteers and when to automate
                </h3>
              </Link>
            </div>
          </motion.article>

        </div>

      </div>
    </section>
  );
}
