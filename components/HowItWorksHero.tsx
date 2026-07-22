"use client";

import { motion } from "framer-motion";

export default function HowItWorksHero() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="layout-spine max-w-5xl mx-auto px-4 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-Time Speech-to-Speech Architecture</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          How Exbabel Translates Live Events in Real Time
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium mb-12"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          From speaker microphone to listener headphones in under 500ms. Explore how our neural AI engine ingests, translates, and streams multi-language audio and live captions.
        </motion.p>

        {/* Live Architecture Interactive Flow Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Step 1: Input */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 text-left relative group hover:border-primary/50 transition-colors">
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider block mb-1">Step 1 — Ingest</span>
              <h4 className="text-base font-bold text-white mb-1">Speaker Speech</h4>
              <p className="text-xs text-slate-300">Mic, Soundboard, OBS, or Zoom</p>
            </div>

            {/* Step 2: AI Engine */}
            <div className="bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-2xl p-5 border border-primary/50 text-left relative group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase text-primary tracking-wider">Step 2 — Neural AI</span>
                <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">&lt;500ms</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">Speech-to-Speech Engine</h4>
              <p className="text-xs text-slate-200">ASR → AI Translation → Voice Synthesis</p>
            </div>

            {/* Step 3: Audience Output */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 text-left relative group hover:border-purple-400/50 transition-colors">
              <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider block mb-1">Step 3 — Output</span>
              <h4 className="text-base font-bold text-white mb-1">Multilingual Audience</h4>
              <p className="text-xs text-slate-300">180+ Languages to Phone &amp; Screens</p>
            </div>
          </div>

          {/* Audio Wave Visualizer */}
          <div className="mt-6 flex items-center justify-center gap-1.5 h-6">
            {[40, 70, 30, 90, 50, 100, 60, 80, 40, 90, 60, 30, 70, 100, 50].map((h, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-primary to-purple-400 rounded-full"
                animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.5}%`] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
