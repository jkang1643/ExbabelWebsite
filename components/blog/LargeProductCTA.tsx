"use client";

import React from "react";
import Link from "next/link";

export default function LargeProductCTA() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Giant Billboard Scale Container */}
        <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#0A1020] px-8 py-16 sm:px-16 sm:py-24 lg:py-28 text-center text-white border border-slate-800 shadow-2xl">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-medium tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Live Translation Platform
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6 text-white">
              One service. Every language.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-10">
              Deliver real-time speech-to-speech AI audio and captions to every member&apos;s phone. No app downloads. No hardware rentals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="https://app.exbabel.com/live/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all shadow-lg"
              >
                Start Translating Your Service →
              </a>
              <Link
                href="/demo"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-semibold text-sm hover:bg-white/15 transition-all border border-white/10"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
