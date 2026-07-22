"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HowItWorksSetup() {
  const [activeTab, setActiveTab] = useState<"mic" | "board" | "obs" | "zoom">("mic");

  const sources = {
    mic: {
      title: "Direct Microphone or USB Audio",
      desc: "Connect any laptop or smartphone with a microphone. Perfect for tour guides, small church groups, or breakout rooms.",
      badge: "Zero Setup • Instant Plug & Play",
      diagram: (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>INPUT: Built-in / USB Microphone</span>
            <span className="text-emerald-400 font-bold">● ACTIVE</span>
          </div>
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 font-mono text-sm text-slate-200">
            [Mic Line-In] &rarr; Exbabel Web App &rarr; Real-Time AI Stream
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Automatic noise suppression &amp; acoustic echo cancellation enabled</span>
          </div>
        </div>
      ),
    },
    board: {
      title: "Soundboard / XLR Line-In",
      desc: "Patch your main sanctuary or stage mixing console directly into Exbabel using USB audio interfaces or line-in aux outputs.",
      badge: "Professional AV Console Ingest",
      diagram: (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>INPUT: Behringer / Yamaha / Allen &amp; Heath Aux Out</span>
            <span className="text-emerald-400 font-bold">● ACTIVE</span>
          </div>
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 font-mono text-sm text-slate-200">
            [XLR Aux Feed] &rarr; Audio Interface &rarr; Exbabel Engine
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Supports stereo and multi-track audio input formats</span>
          </div>
        </div>
      ),
    },
    obs: {
      title: "OBS Studio / RTMP & SRT Stream",
      desc: "Send your video livestream via RTMP, SRT, or OBS Virtual Camera into Exbabel for synchronized live captions and audio dubbing.",
      badge: "Broadcast Livestream Integration",
      diagram: (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>INPUT: rtmp://live.exbabel.com/stream/key</span>
            <span className="text-emerald-400 font-bold">● ACTIVE</span>
          </div>
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 font-mono text-sm text-slate-200">
            [OBS Encoder] &rarr; RTMP Stream &rarr; Exbabel Video &amp; Captions Engine
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Generates WebVTT / CEA-608 closed caption overlays for OBS</span>
          </div>
        </div>
      ),
    },
    zoom: {
      title: "Zoom & Video Conference Ingest",
      desc: "Connect your virtual webinars, Zoom meetings, or Microsoft Teams broadcasts directly into Exbabel's AI translation pipeline.",
      badge: "Webinar & Virtual Event Integration",
      diagram: (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>INPUT: Zoom / Teams Audio Feed</span>
            <span className="text-emerald-400 font-bold">● ACTIVE</span>
          </div>
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 font-mono text-sm text-slate-200">
            [Virtual Meeting] &rarr; Exbabel Bot &rarr; Multi-Language Audio Channels
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Sends translated audio directly back to Zoom interpretation rooms</span>
          </div>
        </div>
      ),
    },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="layout-spine max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase text-primary tracking-widest block mb-2">Phase 1 — Ingest &amp; Configuration</span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Connect Any Audio or Video Source
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            Exbabel works with your existing hardware and software setup in under 60 seconds — no proprietary hardware required.
          </p>
        </div>

        {/* Source Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {(["mic", "board", "obs", "zoom"] as const).map((tabKey) => {
            const labels = {
              mic: "Microphone",
              board: "Soundboard / XLR",
              obs: "OBS / RTMP",
              zoom: "Zoom / Meetings",
            };
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                {labels[tabKey]}
              </button>
            );
          })}
        </div>

        {/* Tab Content Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  {sources[activeTab].badge}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  {sources[activeTab].title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-base font-medium">
                  {sources[activeTab].desc}
                </p>
              </div>
              <div className="lg:col-span-6">
                {sources[activeTab].diagram}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Glossary & AI Persona Feature Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-bold mb-4 text-lg">
              📚
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              Custom Jargon &amp; Glossaries
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
              Pre-load biblical terms, speaker names, organization acronyms, and product terminology so the AI translates every specific phrase with 100% precision.
            </p>
            <div className="bg-slate-800/80 rounded-xl p-3 text-xs font-mono text-slate-300 border border-slate-700 flex flex-wrap gap-2">
              <span className="bg-primary/20 text-blue-300 px-2 py-1 rounded">Sermon &rarr; Predicación</span>
              <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Exbabel &rarr; Exbabel</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">Fellowship &rarr; Comunión</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mb-4 text-lg">
              🎙️
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              AI Voice Persona Selection
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
              Choose from over 90+ natural, warm AI voice personas (male, female, expressive, calm) that match your speaker&apos;s tone and style across languages.
            </p>
            <div className="bg-slate-800/80 rounded-xl p-3 text-xs font-mono text-slate-300 border border-slate-700 flex justify-between items-center">
              <span>Selected Voice: &quot;Mateo (Spanish Warm Expressive)&quot;</span>
              <span className="text-emerald-400 font-bold">Selected ✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
