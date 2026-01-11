"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function InterfacePreview() {
  const [mode, setMode] = useState<"captions" | "audio">("captions");

  return (
    <section className="section-pad bg-white relative overflow-hidden">
      {/* Localized Aurora Background for this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[800px] pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EAD6FF] rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D6F5FF] rounded-full mix-blend-multiply filter blur-[100px] animate-pulse animation-delay-2000" />
      </div>

      <div className="layout-spine relative z-10">
        <motion.div
          className="text-editorial mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-info via-primary to-accent bg-clip-text text-transparent tracking-tight">
            One message. Every language.
          </h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto mb-8">
            Exbabel translates your content into 150+ languages as it&apos;s happening, so everyone can follow along.
          </p>

          {/* Pill Toggle */}
          <div className="inline-flex bg-gray-100 p-1.5 rounded-full">
            <button
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === "captions" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setMode("captions")}
            >
              Read Captions
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === "audio" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setMode("audio")}
            >
              Listen Audio
            </button>
          </div>
        </motion.div>

        {/* Interface Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full max-w-[1000px] mx-auto"
        >
          {/* Main Container - Clean Product Frame */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-blue-900/10 overflow-hidden">

            {/* Minimal Header */}
            <div className="h-12 border-b border-gray-100 bg-gray-50/50 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 min-h-[500px] flex flex-col">
              {/* Language Selector */}
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
                <div>
                  <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-2">Target Language</h3>
                  <div className="flex items-center gap-2 text-xl font-bold text-base-content">
                    <span className="text-2xl">🇪🇸</span> Español (Spanish)
                    <svg className="w-5 h-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {mode === "audio" && (
                  <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live Audio
                  </div>
                )}
              </div>

              {/* Content Display */}
              <div className="flex-1">
                {mode === "captions" ? (
                  <div className="space-y-6">
                    {[
                      { time: "00:24", text: "Welcome everyone to today&apos;s session.", textEs: "Bienvenidos a todos a la sesión de hoy.", active: false },
                      { time: "00:28", text: "We&apos;re excited to share some important updates.", textEs: "Estamos emocionados de compartir actualizaciones importantes.", active: true },
                    ].map((caption, i) => (
                      <div key={i} className={`group flex gap-6 p-4 rounded-xl transition-all ${caption.active ? 'bg-blue-50/50 border border-blue-100' : 'opacity-60'}`}>
                        <div className="w-16 text-xs font-mono text-base-content/50 pt-1">{caption.time}</div>
                        <div className="flex-1 space-y-2">
                          <div className="text-sm text-base-content/70">{caption.text}</div>
                          <div className="text-lg font-medium text-base-content">{caption.textEs}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                      <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping" />
                      <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 relative z-10">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a2 2 0 002.828 0l6.364-6.364a2 2 0 000-2.828l-6.364-6.364a2 2 0 00-2.828 0l-6.364 6.364a2 2 0 000 2.828z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-base-content">Streaming Audio Translation</p>
                    <p className="text-base-content/60 mb-8">Listening in Español</p>

                    {/* Audio visualizer */}
                    <div className="flex gap-1 h-8 items-center">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-primary/80 rounded-full"
                          animate={{ height: [12, Math.random() * 24 + 10, 12] }}
                          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

