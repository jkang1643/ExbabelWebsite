"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BeforeDuringAfterGraphic() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="layout-spine max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            End-to-End Multilingual Workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-600 font-medium"
          >
            From pre-event preparation to real-time live execution and post-event intelligence.
          </motion.p>
        </div>

        {/* Chevron Timeline Header Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Chevron 1: BEFORE */}
          <div className="relative bg-emerald-600 text-white font-extrabold text-xl py-3.5 px-6 rounded-2xl md:rounded-r-none flex items-center justify-center shadow-md">
            <span>Before</span>
            {/* Arrow tail for desktop */}
            <div className="hidden md:block absolute -right-4 top-0 bottom-0 w-8 z-10 clip-chevron-right bg-emerald-600 pointer-events-none" />
          </div>

          {/* Chevron 2: DURING */}
          <div className="relative bg-blue-600 text-white font-extrabold text-xl py-3.5 px-6 rounded-2xl md:rounded-none flex items-center justify-center shadow-md">
            <span>During</span>
            <div className="hidden md:block absolute -right-4 top-0 bottom-0 w-8 z-10 clip-chevron-right bg-blue-600 pointer-events-none" />
          </div>

          {/* Chevron 3: AFTER */}
          <div className="relative bg-orange-500 text-white font-extrabold text-xl py-3.5 px-6 rounded-2xl md:rounded-l-none flex items-center justify-center shadow-md">
            <span>After</span>
          </div>
        </div>

        {/* 3 Main Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* CARD 1: BEFORE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-shadow relative"
          >
            <div>
              {/* Circular Photo with Floating Badge */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-100 shadow-md relative">
                  <Image
                    src="/photos/how_it_works_before.png"
                    alt="Personalized Onboarding Specialist"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating UI Badge */}
                <div className="absolute -right-2 top-10 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 w-44">
                  <div className="w-16 h-3 bg-emerald-500 rounded-full mb-2" />
                  <div className="w-28 h-2 bg-slate-200 rounded-full mb-1.5" />
                  <div className="w-20 h-2 bg-slate-200 rounded-full" />
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-slate-100 mb-6" />

              {/* Feature Checklist */}
              <ul className="space-y-4 text-slate-800 font-bold text-base">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Personalized Onboarding</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Custom Glossaries</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Workflow Optimization</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* CARD 2: DURING */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-shadow relative"
          >
            <div>
              {/* Circular Photo with Floating Badge */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-100 shadow-md relative">
                  <Image
                    src="/photos/how_it_works_during.png"
                    alt="Live Speaker on Conference Stage"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating UI Badge */}
                <div className="absolute -right-2 top-8 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 w-44">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-[11px] font-black tracking-wider text-red-600 uppercase">LIVE</span>
                  </div>
                  <div className="w-28 h-2 bg-slate-200 rounded-full mb-3" />
                  <div className="flex gap-1">
                    <span className="text-[10px] font-bold border border-blue-400 text-blue-600 px-1.5 py-0.5 rounded-full">EN</span>
                    <span className="text-[10px] font-bold border border-blue-400 text-blue-600 px-1.5 py-0.5 rounded-full">ES</span>
                    <span className="text-[10px] font-bold border border-blue-400 text-blue-600 px-1.5 py-0.5 rounded-full">FR</span>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-slate-100 mb-6" />

              {/* Feature Checklist */}
              <ul className="space-y-4 text-slate-800 font-bold text-base">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Live Translation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Live Captions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>24/7 &amp; On-Site Support</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* CARD 3: AFTER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-shadow relative"
          >
            <div>
              {/* Circular Photo with Floating Badge */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-100 shadow-md relative">
                  <Image
                    src="/photos/how_it_works_after.png"
                    alt="Post Production Content Editor"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating UI Badge */}
                <div className="absolute -right-2 top-8 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 w-44">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">▶</div>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full" />
                  </div>
                  <div className="w-24 h-2 bg-orange-400 rounded-full mb-1.5" />
                  <div className="w-16 h-2 bg-slate-200 rounded-full" />
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-slate-100 mb-6" />

              {/* Feature Checklist */}
              <ul className="space-y-4 text-slate-800 font-bold text-base">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Transcripts &amp; Summaries</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Subtitles &amp; AI Dubbing</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>Content Management</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Enterprise Compliance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-slate-50 border border-slate-200/80 rounded-2xl py-4 px-6 text-center shadow-sm"
        >
          <p className="text-sm md:text-base font-bold text-slate-700 tracking-wide">
            Enterprise-ready: ISO 27001 | SOC 2 Type II | GDPR, HIPAA, CCPA, VPAT
          </p>
        </motion.div>
      </div>
    </section>
  );
}
