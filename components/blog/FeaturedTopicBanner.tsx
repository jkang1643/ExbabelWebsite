"use client";

import React from "react";
import Link from "next/link";

export default function FeaturedTopicBanner() {
  return (
    <section className="w-full py-8 sm:py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Large 50/50 Split Container with pale brand background & 36px rounded corners */}
        <div className="rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#E8F8B6] border border-[#d9ec9c] flex flex-col lg:flex-row items-stretch min-h-[440px]">
          
          {/* Left: Art-Directed Fluid Glass / 3D Waveform Illustration */}
          <div className="lg:w-1/2 relative bg-gradient-to-tr from-[#99E3D8] via-[#B5F1D3] to-[#C9F8B5] p-8 sm:p-12 flex items-center justify-center overflow-hidden min-h-[320px] lg:min-h-auto">
            {/* Ambient Refraction Elements */}
            <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white/40 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-cyan-200/50 blur-3xl" />
            
            {/* Dynamic Glass Wave Visual */}
            <div className="relative z-10 w-full max-w-md aspect-[1.3/1] rounded-[28px] bg-white/30 backdrop-blur-md border border-white/60 p-6 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-slate-800 text-xs font-semibold">
                  <span className="text-sm">✦</span>
                  <span>Audio & Caption Engine</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700">1.013s</span>
              </div>

              {/* Stylized waveforms */}
              <div className="space-y-2 py-4">
                <div className="h-3 w-3/4 rounded-full bg-slate-900/20" />
                <div className="h-3 w-full rounded-full bg-slate-900/30" />
                <div className="h-3 w-5/6 rounded-full bg-slate-900/25" />
                <div className="h-3 w-2/3 rounded-full bg-slate-900/15" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-800 font-medium">
                <span>180+ Languages</span>
                <span className="text-emerald-700 font-bold">● Active Stream</span>
              </div>
            </div>
          </div>

          {/* Right: Generously Padded Content */}
          <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-700 uppercase mb-4">
              CHURCH TRANSLATION HUB
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-950 tracking-tight leading-[1.12] mb-5">
              Everything you need to know about AI translation for churches
            </h2>

            <p className="text-slate-800 text-base sm:text-lg mb-8 leading-relaxed max-w-lg font-normal">
              Explore our complete knowledge hub covering sermon audio streams, member phone access, AV mixer routing, livestream integration, and multilingual worship.
            </p>

            <div>
              <Link
                href="/blog/category/church-translation"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
              >
                Explore Church Translation
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
