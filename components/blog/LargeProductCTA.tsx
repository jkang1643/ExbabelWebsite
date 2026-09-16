"use client";

import React from "react";
import Link from "next/link";

export default function LargeProductCTA() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Giant Billboard Scale Container with Exbabel Primary Blue to Green Gradient */}
        <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-gradient-to-br from-[#394dfe] via-[#00c2ff] to-[#05df72] px-8 py-16 sm:px-16 sm:py-24 lg:py-28 text-center text-white border border-white/20 shadow-2xl">
          
          {/* Luminous Ambient Highlights */}
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-white/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Pill Eyebrow */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wide uppercase mb-6 border border-white/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live Translation Platform
            </span>

            {/* Headline */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
              One service. Every language.
            </h2>

            {/* Description */}
            <p className="text-white text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]">
              Deliver real-time speech-to-speech AI audio and captions to every member&apos;s phone. No app downloads. No hardware rentals.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="https://app.exbabel.com/live/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-slate-950 text-white font-bold text-sm hover:bg-slate-900 hover:scale-[1.02] transition-all shadow-xl inline-flex items-center justify-center gap-2"
              >
                Start Translating Your Service →
              </a>
              <Link
                href="/demo"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition-all border border-white/40 backdrop-blur-md"
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
