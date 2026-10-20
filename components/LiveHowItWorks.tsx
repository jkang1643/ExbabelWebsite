'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.12 }
};

const DEMO_LANGUAGES = [
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    voiceName: 'Sofia (AI Warm Natural)',
    translation: 'Bienvenidos a todos a nuestro servicio hoy. Estamos muy bendecidos de reunirnos juntos.',
  },
  {
    code: 'ko',
    name: '한국어',
    flag: '🇰🇷',
    voiceName: 'Min-ho (AI Clear Tone)',
    translation: '오늘 예배에 오신 모든 분들을 환영합니다. 함께 모이게 되어 큰 축복입니다.',
  },
  {
    code: 'pt',
    name: 'Português',
    flag: '🇵🇹',
    voiceName: 'Lucas (AI Natural Resonance)',
    translation: 'Bem-vindos a todos ao nosso culto de hoje. Somos muito abençoados por estarmos juntos.',
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    voiceName: 'Thomas (AI Melodic Voice)',
    translation: 'Bienvenue à tous à notre culte d\'aujourd\'hui. Nous sommes très bénis d\'être rassemblés.',
  },
];

export default function LiveHowItWorks() {
  const [selectedLang, setSelectedLang] = useState(DEMO_LANGUAGES[0]);

  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#EAD6FF]/30 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D6F5FF]/30 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
              Real-Time Pipeline
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight"
            style={{ fontFamily: 'var(--font-sora), sans-serif' }}
          >
            How Exbabel Live Video Translation Works
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-600 leading-relaxed font-medium"
          >
            One live service seamlessly delivered simultaneously to every attendee in their native language — with sub-second AI speech and synchronized captions.
          </motion.p>
        </motion.div>

        {/* 3 Core Architecture Steps */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch relative"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* STEP 1: Pastor Speaks */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col h-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-[0_20px_50px_rgba(234,214,255,0.18)] hover:shadow-[0_25px_60px_rgba(234,214,255,0.3)] transition-all duration-300 relative group"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between mb-6">
              <span
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-sky-500/25"
                style={{ fontFamily: 'var(--font-sora), sans-serif' }}
              >
                1
              </span>
              <span className="text-xs font-bold font-mono tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                AUDIO INGEST
              </span>
            </div>

            <h3
              className="text-2xl font-extrabold text-[#0B1220] mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              1. Pastor Speaks
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-6 font-normal">
              Your pastor delivers the sermon naturally in their preferred language (English, Spanish, Korean, Portuguese, etc).
            </p>

            {/* Visual Demo Box 1: Pulpit Audio Ingest */}
            <div className="mt-auto bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-slate-300">Live Stage Audio</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                  ACTIVE
                </span>
              </div>

              {/* Animated Waveform */}
              <div className="flex items-center gap-1 h-9 px-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
                {[35, 75, 45, 95, 60, 100, 50, 80, 40, 90, 65, 40, 85, 30].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-sky-500 to-emerald-400 rounded-full"
                    animate={{ height: [`${h * 0.35}%`, `${h}%`, `${h * 0.5}%`] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: (i % 5) * 0.12 }}
                  />
                ))}
              </div>

              {/* Sample Sermon Quote */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
                <span className="text-slate-500 block text-[10px] font-sans font-bold uppercase tracking-wider mb-1">Speaker Microphone:</span>
                &ldquo;Welcome everyone to our service today. We are so blessed to gather together.&rdquo;
              </div>

              {/* Supported Languages Pills */}
              <div className="pt-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Native Preaching Languages:</div>
                <div className="flex flex-wrap gap-1.5">
                  {['English', 'Spanish', 'Korean', 'Portuguese'].map((lang) => (
                    <span
                      key={lang}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700/60"
                    >
                      🎤 {lang}
                    </span>
                  ))}
                  <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-800/60 text-slate-400">
                    +200 more
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* STEP 2: Exbabel Translates in Real Time */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col h-full bg-white rounded-3xl p-8 border border-primary/20 shadow-[0_20px_50px_rgba(168,85,247,0.18)] hover:shadow-[0_25px_60px_rgba(168,85,247,0.28)] transition-all duration-300 relative group"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between mb-6">
              <span
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-primary text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-purple-500/25"
                style={{ fontFamily: 'var(--font-sora), sans-serif' }}
              >
                2
              </span>
              <span className="text-xs font-bold font-mono tracking-wider px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                SUB-SECOND AI
              </span>
            </div>

            <h3
              className="text-2xl font-extrabold text-[#0B1220] mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              2. Exbabel Translates in Real Time
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-4 font-normal">
              Our speech-to-speech AI translation engine processes live audio with sub-second latency generating:
            </p>

            {/* Generated Feature Checklist */}
            <ul className="text-slate-700 text-sm space-y-2.5 font-medium mb-6">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span><strong>Live translated speech</strong> (sub-second audio stream)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span><strong>Natural AI voiceovers</strong> (warm & human-like cadence)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span><strong>Real-time captions</strong> (perfectly synchronized subtitles)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span><strong>Multi-language streams</strong> (parallel live processing)</span>
              </li>
            </ul>

            {/* Visual Demo Box 2: Neural Translation Core */}
            <div className="mt-auto bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Parallel AI Engine
                </span>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/50">
                  ⚡ 380ms Latency
                </span>
              </div>

              {/* Parallel Processing Channels */}
              <div className="space-y-2">
                {[
                  { lang: 'Spanish', voice: 'Sofia Voiceover', latency: '0.38s', flag: '🇪🇸' },
                  { lang: 'Korean', voice: 'Min-ho Voiceover', latency: '0.41s', flag: '🇰🇷' },
                  { lang: 'Portuguese', voice: 'Lucas Voiceover', latency: '0.39s', flag: '🇵🇹' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-slate-950/80 rounded-xl border border-slate-800/70 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.flag}</span>
                      <span className="font-semibold text-slate-200">{item.lang}</span>
                      <span className="text-[10px] text-slate-400 hidden sm:inline font-mono">({item.voice})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{item.latency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* STEP 3: Viewers Listen in Their Language */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col h-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-[0_20px_50px_rgba(52,211,153,0.18)] hover:shadow-[0_25px_60px_rgba(52,211,153,0.28)] transition-all duration-300 relative group"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between mb-6">
              <span
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-emerald-500/25"
                style={{ fontFamily: 'var(--font-sora), sans-serif' }}
              >
                3
              </span>
              <span className="text-xs font-bold font-mono tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                AUDIENCE STREAM
              </span>
            </div>

            <h3
              className="text-2xl font-extrabold text-[#0B1220] mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              3. Viewers Listen in Their Language
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-6 font-normal">
              Each attendee selects their preferred language. Everyone watches the same video stream while hearing translated audio and viewing synchronized captions.
            </p>

            {/* Visual Demo Box 3: Interactive Multilingual Player Simulator */}
            <div className="mt-auto bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Listener Live Feed
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                  SYNCED
                </span>
              </div>

              {/* Language Selector Tabs */}
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Select Attendee Language:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {DEMO_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                        selectedLang.code === lang.code
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                          : 'bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span className="truncate">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Audio & Subtitle Output */}
              <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    {selectedLang.voiceName}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">Zero-Delay Audio</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedLang.code}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-mono text-emerald-300 leading-relaxed bg-black/40 p-2.5 rounded-lg border border-emerald-500/20"
                  >
                    &ldquo;{selectedLang.translation}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Zero-Friction Feature Tags */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                <span>📱 Scan QR or tap link</span>
                <span>⚡ No app download needed</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
