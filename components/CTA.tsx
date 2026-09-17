"use client";

import { appRoutes } from "@/lib/config";
import Link from "next/link";
import NetworkAuroraBackground from "./NetworkAuroraBackground";

export default function CTA() {
  return (
    <section className="mobile-fade-up py-32 relative overflow-hidden bg-[#FAFBFF] text-base-ink">
      <NetworkAuroraBackground />

      <div className="mobile-fade-up max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 text-center space-y-10">
        
        {/* Status Symbol Badge */}
        <div className="mobile-fade-up inline-flex flex-wrap items-center justify-center gap-3">
          <span className="mobile-fade-up text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm tracking-wide uppercase">
            Production Ready
          </span>
          <span className="mobile-fade-up text-xs font-semibold px-3.5 py-1.5 rounded-full bg-blue-50 text-[#394dfe] border border-[#394dfe]/30 shadow-sm tracking-wide">
            10.2× Latency Advantage
          </span>
        </div>

        {/* Headline */}
        <h2
          className="mobile-fade-up text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-base-ink"
          style={{ fontFamily: 'var(--font-sora), sans-serif' }}
        >
          The Future of Multilingual <br /> Communication Starts Here
        </h2>

        {/* Sub-headline */}
        <p
          className="mobile-fade-up text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
          style={{ fontFamily: 'var(--font-sora), sans-serif' }}
        >
          Experience continuous speech translation with industry-leading latency — independently verified under IEEE 829 and ISO 25010 standards.
        </p>

        {/* CTA Buttons */}
        <div className="mobile-fade-up flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/demo"
            className="mobile-fade-up px-10 py-4 bg-[#394dfe] hover:bg-[#394dfe]/90 text-white text-lg font-extrabold rounded-full shadow-lg shadow-[#394dfe]/30 transition-all hover:scale-[1.02] active:scale-95"
            style={{ fontFamily: 'var(--font-sora), sans-serif' }}
          >
            Schedule a Consultation
          </Link>
          <Link
            href="/lab-test"
            className="mobile-fade-up px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-base-ink text-lg font-bold rounded-full transition-all hover:scale-[1.02]"
            style={{ fontFamily: 'var(--font-sora), sans-serif' }}
          >
            Read the Technical Report
          </Link>
        </div>

        {/* Status Verification Checklist */}
        <div className="mobile-fade-up flex flex-wrap justify-center gap-8 pt-4 text-sm font-bold text-slate-600">
          {[
            "0.4s processing time",
            "IEEE 829 & ISO 25010 verified",
            "Zero data retention"
          ].map((text, i) => (
            <div key={i} className="mobile-fade-up flex items-center gap-2 text-xs text-slate-700">
              <span className="mobile-fade-up w-1.5 h-1.5 rounded-full bg-[#394dfe]" />
              {text}
            </div>
          ))}
        </div>

        {/* Status Metrics Box */}
        <div className="mobile-fade-up w-full max-w-4xl mx-auto pt-6">
          <div className="mobile-fade-up grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-6 rounded-3xl bg-white/80 md:backdrop-blur-md border border-slate-200 shadow-xl shadow-2xl relative overflow-hidden">
            <div className="mobile-fade-up relative z-10 space-y-1">
              <div className="mobile-fade-up text-4xl md:text-5xl font-black text-slate-800 font-mono">1.013s</div>
              <div className="mobile-fade-up text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Time to First Caption</div>
            </div>

            <div className="mobile-fade-up relative z-10 space-y-1 md:border-x border-slate-200">
              <div className="mobile-fade-up text-4xl md:text-5xl font-black text-[#394dfe] font-mono">2.027s</div>
              <div className="mobile-fade-up text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Time to First Speech</div>
            </div>

            <div className="mobile-fade-up relative z-10 space-y-1">
              <div className="mobile-fade-up text-4xl md:text-5xl font-black text-emerald-400 font-mono">10.2×</div>
              <div className="mobile-fade-up text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Continuous Speed Advantage</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
