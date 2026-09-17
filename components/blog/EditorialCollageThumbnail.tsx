"use client";

import React from "react";
import type { BlogPost } from "@/lib/blog";

interface EditorialCollageThumbnailProps {
  post: BlogPost;
  variant?: "hero" | "card" | "compact";
  className?: string;
}

export default function EditorialCollageThumbnail({
  post,
  variant = "card",
  className = "",
}: EditorialCollageThumbnailProps) {
  const { archetype, colorTheme, editorialPill, featuredImage, featuredImageAlt, title } = post;
  const isHero = variant === "hero";
  const isCompact = variant === "compact";

  // Height and aspect ratio based on variant
  const containerHeight = isHero
    ? "h-80 sm:h-96 md:h-[420px] lg:h-[460px]"
    : isCompact
    ? "h-48 sm:h-52"
    : "h-64 sm:h-72 md:h-80";

  return (
    <div
      className={`relative w-full ${containerHeight} overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${colorTheme.bgGradient} p-4 sm:p-6 flex items-center justify-center select-none group/thumbnail ${className}`}
      style={{
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      {/* Background Graphic Geometry (Depth Level 1) */}
      <div className="mobile-fade-up absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle geometric rounded glow cards */}
        <div
          className="mobile-fade-up absolute -top-16 -right-16 w-64 sm:w-80 h-64 sm:h-80 rounded-full opacity-30 blur-3xl transition-transform duration-700 group-hover/thumbnail:scale-110"
          style={{ backgroundColor: colorTheme.accent }}
        />
        <div className="mobile-fade-up absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl" />
        
        {/* Swiss Architectural Grid Lines (Subtle) */}
        <div
          className="mobile-fade-up absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Oversized background typography watermark (Editorial Motif) */}
        <div className="mobile-fade-up absolute -right-6 top-8 font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-white/[0.03] select-none pointer-events-none">
          {post.category.toUpperCase()}
        </div>
      </div>

      {/* Midground Layer (Depth Level 2): Art-Directed Image / Composition */}
      <div className="mobile-fade-up relative z-10 w-full h-full flex items-center justify-center">
        {archetype === "editorial-ui-collage" && (
          <div className="mobile-fade-up relative w-full h-full flex items-center justify-between">
            {/* Left/Center: Cropped Art Image with crisp framing */}
            <div className="mobile-fade-up relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover/thumbnail:scale-[1.02] transition-transform duration-500">
              <img
                src={featuredImage}
                alt={featuredImageAlt}
                className="mobile-fade-up w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.03]"
                loading="lazy"
              />
              <div className="mobile-fade-up absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>

            {/* Floating Editorial Glass Card 1: Language Switcher (Top Right / Seam Breaker) */}
            <div
              className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-20 md:backdrop-blur-xl bg-slate-950/75 border border-white/20 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xl transition-all duration-300 group-hover/thumbnail:-translate-y-1 ${
                isCompact ? "scale-90 origin-top-right" : ""
              }`}
              style={{
                boxShadow: "0 12px 30px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <div className="mobile-fade-up flex items-center gap-2 sm:gap-3">
                <div className="mobile-fade-up flex items-center gap-1.5">
                  <span className="mobile-fade-up w-5 h-5 rounded-md bg-white/10 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                    {editorialPill.sourceLang || "ES"}
                  </span>
                  <span className="mobile-fade-up text-white/90 text-xs font-semibold tracking-tight">
                    {editorialPill.sourceLangName || "Español"}
                  </span>
                </div>
                <svg
                  className="mobile-fade-up w-3 h-3 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="mobile-fade-up flex items-center gap-1.5">
                  <span className="mobile-fade-up w-5 h-5 rounded-md bg-sky-500/20 text-sky-300 font-mono text-[10px] font-bold flex items-center justify-center border border-sky-400/30">
                    {editorialPill.targetLang || "EN"}
                  </span>
                  <span className="mobile-fade-up text-white text-xs font-semibold tracking-tight">
                    {editorialPill.targetLangName || "English"}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Editorial Glass Card 2: Live Listener Pill (Bottom Left / Seam Breaker) */}
            <div
              className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20 md:backdrop-blur-xl bg-slate-950/80 border border-white/20 rounded-full px-3.5 py-1.5 shadow-2xl flex items-center gap-2.5 transition-all duration-300 group-hover/thumbnail:translate-x-1 ${
                isCompact ? "scale-85 origin-bottom-left" : ""
              }`}
            >
              <span className="mobile-fade-up relative flex h-2 w-2">
                <span className="mobile-fade-up animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="mobile-fade-up relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="mobile-fade-up text-[11px] font-bold tracking-wide uppercase text-emerald-400">
                {editorialPill.statusText || "Translation Live"}
              </span>
              {editorialPill.metricText && (
                <>
                  <span className="mobile-fade-up text-white/20 text-xs">|</span>
                  <span className="mobile-fade-up text-white/80 text-[11px] font-medium">
                    {editorialPill.metricText}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {archetype === "split-product" && (
          <div className="mobile-fade-up relative w-full h-full flex items-center justify-between">
            {/* Split Media Canvas */}
            <div className="mobile-fade-up relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover/thumbnail:scale-[1.02] transition-transform duration-500">
              <img
                src={featuredImage}
                alt={featuredImageAlt}
                className="mobile-fade-up w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.05]"
                loading="lazy"
              />
              <div className="mobile-fade-up absolute inset-0 bg-gradient-to-tr from-purple-950/70 via-black/30 to-transparent" />
            </div>

            {/* Center Bridging Glass Pill (Pipeline / Engine Indicator) */}
            <div
              className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-auto z-20 md:backdrop-blur-xl bg-slate-950/85 border border-purple-400/30 rounded-2xl px-4 py-2.5 shadow-2xl transition-all duration-300 group-hover/thumbnail:-translate-y-1 ${
                isCompact ? "scale-90 origin-bottom-left" : ""
              }`}
              style={{
                boxShadow: "0 12px 30px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <div className="mobile-fade-up flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                <div className="mobile-fade-up flex items-center gap-1.5">
                  <span className="mobile-fade-up relative flex h-2 w-2">
                    <span className="mobile-fade-up animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                    <span className="mobile-fade-up relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                  </span>
                  <span className="mobile-fade-up text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                    {editorialPill.statusText || "Speech-to-Speech"}
                  </span>
                </div>
                <span className="mobile-fade-up text-white/25 hidden sm:inline">|</span>
                <div className="mobile-fade-up flex items-center gap-1 text-[11px] font-mono text-white/90">
                  <span>Audio</span>
                  <span className="mobile-fade-up text-purple-400">→</span>
                  <span>STT</span>
                  <span className="mobile-fade-up text-purple-400">→</span>
                  <span>Translate</span>
                  <span className="mobile-fade-up text-purple-400">→</span>
                  <span className="mobile-fade-up text-purple-300 font-bold">TTS</span>
                </div>
              </div>
            </div>

            {/* Top Metric Pill */}
            <div className="mobile-fade-up absolute top-3 sm:top-4 right-3 sm:right-4 z-20 md:backdrop-blur-md bg-white/10 border border-white/25 rounded-full px-3 py-1 shadow-lg text-[11px] font-semibold text-white/95">
              {editorialPill.metricText || "180+ Languages · 0.98s Latency"}
            </div>
          </div>
        )}

        {archetype === "typography-3d" && (
          <div className="mobile-fade-up relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col justify-between">
            <div className="mobile-fade-up relative z-10">
              <span className="mobile-fade-up text-xs font-mono font-bold text-yellow-400 tracking-widest uppercase">
                EXBABEL CORE
              </span>
              <h4 className="mobile-fade-up text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
                SPEECH · VOICE · LIVE
              </h4>
            </div>
            <div className="mobile-fade-up relative z-10 flex gap-2">
              <span className="mobile-fade-up px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white font-mono">
                ES → EN
              </span>
              <span className="mobile-fade-up px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white font-mono">
                FR → EN
              </span>
            </div>
          </div>
        )}

        {archetype === "brand-board" && (
          <div className="mobile-fade-up relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col justify-between">
            <div className="mobile-fade-up w-full h-24 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
              <span className="mobile-fade-up font-mono text-xs text-slate-300">Architecture Diagram</span>
            </div>
            <div className="mobile-fade-up flex gap-2">
              <span className="mobile-fade-up w-4 h-4 rounded-full bg-blue-500" />
              <span className="mobile-fade-up w-4 h-4 rounded-full bg-purple-500" />
              <span className="mobile-fade-up w-4 h-4 rounded-full bg-emerald-500" />
            </div>
          </div>
        )}

        {archetype === "website-mockup" && (
          <div className="mobile-fade-up relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 p-4 bg-slate-950 flex flex-col">
            <div className="mobile-fade-up flex items-center gap-1.5 pb-3 border-b border-white/10">
              <div className="mobile-fade-up w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="mobile-fade-up w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="mobile-fade-up w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="mobile-fade-up ml-2 font-mono text-[10px] text-white/40">app.exbabel.com/live</span>
            </div>
            <div className="mobile-fade-up flex-1 flex items-center justify-center">
              <span className="mobile-fade-up text-white/60 text-xs font-medium">Exbabel Live Stream Canvas</span>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Editorial Corner Notch (Swiss Graphic Detail) */}
      <div className="mobile-fade-up absolute top-2 left-2 z-20 pointer-events-none opacity-40">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M0 0H8V2H2V8H0V0Z" fill="white" />
        </svg>
      </div>
      <div className="mobile-fade-up absolute bottom-2 right-2 z-20 pointer-events-none opacity-40">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M8 8H0V6H6V0H8V8Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}
