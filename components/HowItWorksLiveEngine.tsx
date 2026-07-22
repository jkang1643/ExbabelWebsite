"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HowItWorksLiveEngine() {
  const [selectedLang, setSelectedLang] = useState<"es" | "ko" | "fr" | "zh">("es");

  const translations = {
    es: {
      flag: "🇪🇸",
      name: "Spanish",
      text: "Bienvenidos a todos a nuestro servicio de hoy. Estamos muy felices de tenerlos aquí con nosotros.",
      voice: "Voice: Sofia (Natural Warm AI)",
    },
    ko: {
      flag: "🇰🇷",
      name: "Korean",
      text: "오늘 예배에 오신 모든 분들을 환영합니다. 함께하게 되어 정말 기쁩니다.",
      voice: "Voice: Min-ho (Natural Warm AI)",
    },
    fr: {
      flag: "🇫🇷",
      name: "French",
      text: "Bienvenue à tous à notre service aujourd'hui. Nous sommes ravis de vous avoir parmi nous.",
      voice: "Voice: Thomas (Natural Warm AI)",
    },
    zh: {
      flag: "🇨🇳",
      name: "Chinese (Simplified)",
      text: "欢迎大家来到我们今天的聚会。非常高兴大家能与我们在一起。",
      voice: "Voice: Wei (Natural Warm AI)",
    },
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="layout-spine max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase text-emerald-400 tracking-widest block mb-2">Phase 2 — Real-Time AI Pipeline</span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Sub-500ms Speech-to-Speech Engine
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-medium">
            While the speaker talks naturally, Exbabel executes 3 parallel neural pipelines instantly: ASR transcription, contextual translation, and voice synthesis.
          </p>
        </div>

        {/* Live Interactive Translation Engine Playground */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Side (English Speaker) */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Speaker Speech (English)</span>
                </div>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Source Input</span>
              </div>

              {/* Audio Waveform */}
              <div className="flex items-center gap-1 h-8 mb-4">
                {[30, 80, 50, 90, 40, 100, 70, 40, 80, 60, 30, 90, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-emerald-400 rounded-full"
                    animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.05 }}
                  />
                ))}
              </div>

              <p className="text-sm font-mono text-slate-200 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                &quot;Welcome everyone to our service today. We are so glad to have you with us.&quot;
              </p>
            </div>

            {/* Neural Processing Core (Center Arrow) */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center my-4 lg:my-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/30 mb-2">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">Neural AI</span>
              <span className="text-[10px] text-slate-500 font-mono">0.38s latency</span>
            </div>

            {/* Output Side (Interactive Target Language Selector) */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">AI Translation Output</span>

                {/* Language Picker Tabs */}
                <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  {(["es", "ko", "fr", "zh"] as const).map((code) => (
                    <button
                      key={code}
                      onClick={() => setSelectedLang(code)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        selectedLang === code
                          ? "bg-primary text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Name & Flag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{translations[selectedLang].flag}</span>
                <span className="text-sm font-bold text-white">{translations[selectedLang].name}</span>
                <span className="text-[10px] font-mono text-slate-400 ml-auto">{translations[selectedLang].voice}</span>
              </div>

              {/* Live Output Text */}
              <p className="text-sm font-mono text-emerald-300 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                &quot;{translations[selectedLang].text}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
