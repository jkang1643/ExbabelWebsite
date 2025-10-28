"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function InterfacePreview() {
  const [mode, setMode] = useState<"captions" | "audio">("captions");

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            One Message. Every Language.
          </h2>
          <p className="text-xl text-neutral max-w-2xl mx-auto mb-8">
            Exbabel translates your content into 150+ languages as it&apos;s happening, so everyone can follow along
          </p>
          
          {/* Mode Toggle */}
          <div className="tabs tabs-boxed inline-flex bg-base-200 p-1">
            <button 
              className={`tab ${mode === "captions" ? "tab-active bg-primary text-white" : ""}`}
              onClick={() => setMode("captions")}
            >
              👀 Read Captions
            </button>
            <button 
              className={`tab ${mode === "audio" ? "tab-active bg-primary text-white" : ""}`}
              onClick={() => setMode("audio")}
            >
              🎧 Listen with Headphones
            </button>
          </div>
        </motion.div>

        {/* Interface Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Browser Window Mockup */}
          <div className="mockup-browser border border-primary/20 bg-base-100 shadow-2xl">
            <div className="mockup-browser-toolbar">
              <div className="input border border-base-300">https://exbabel.com/live/session</div>
            </div>
            <div className="bg-gradient-to-br from-base-200 to-base-100 px-8 py-12">
              {/* Language Selector */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-neutral mb-2">Select Your Language</h3>
                  <select className="select select-primary w-full max-w-xs">
                    <option>🇺🇸 English</option>
                    <option>🇪🇸 Español</option>
                    <option>🇫🇷 Français</option>
                    <option>🇨🇳 中文</option>
                    <option>🇸🇦 العربية</option>
                    <option>🇯🇵 日本語</option>
                  </select>
                </div>
                
                {mode === "audio" && (
                  <div className="flex items-center gap-4">
                    <div className="badge badge-success gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Live Audio
                    </div>
                    <input type="range" min="0" max="100" defaultValue="75" className="range range-primary range-sm w-32" />
                  </div>
                )}
              </div>

              {/* Content Display */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  {mode === "captions" ? (
                    <>
                      {/* Live Captions */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="badge badge-error gap-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          LIVE
                        </div>
                        <span className="text-sm text-neutral">Real-time captions</span>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          { time: "00:24", text: "Welcome everyone to today's session. We're excited to share some important updates with you.", lang: "English", delay: 0 },
                          { time: "00:28", text: "Bienvenidos a todos a la sesión de hoy. Estamos emocionados de compartir algunas actualizaciones importantes con ustedes.", lang: "Español", delay: 0.2 },
                          { time: "00:32", text: "Bienvenue à tous à la session d'aujourd'hui. Nous sommes ravis de partager des mises à jour importantes avec vous.", lang: "Français", delay: 0.4 },
                        ].map((caption, i) => (
                          <motion.div
                            key={i}
                            className="flex gap-4 p-4 bg-base-200/50 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: caption.delay }}
                            viewport={{ once: true }}
                          >
                            <div className="text-xs text-neutral font-mono">{caption.time}</div>
                            <div className="flex-1">
                              <div className="text-xs text-accent font-semibold mb-1">{caption.lang}</div>
                              <div className="text-sm text-neutral leading-relaxed">{caption.text}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Audio Mode */}
                      <div className="flex flex-col items-center justify-center py-12">
                        <motion.div
                          className="relative"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a2 2 0 002.828 0l6.364-6.364a2 2 0 000-2.828l-6.364-6.364a2 2 0 00-2.828 0l-6.364 6.364a2 2 0 000 2.828z" />
                            </svg>
                          </div>
                          
                          {/* Sound waves */}
                          {[1, 2, 3].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute inset-0 border-4 border-primary/30 rounded-full"
                              animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                            />
                          ))}
                        </motion.div>
                        
                        <div className="mt-8 text-center">
                          <p className="text-2xl font-semibold text-primary mb-2">
                            Streaming Audio Translation
                          </p>
                          <p className="text-neutral">
                            Put on your headphones and hear the translation in real-time
                          </p>
                        </div>

                        {/* Audio visualizer bars */}
                        <div className="flex gap-1 mt-8">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-primary rounded-full"
                              animate={{ height: [10, Math.random() * 40 + 20, 10] }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.05,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="flex justify-center gap-4 mt-8">
                <button className="btn btn-circle btn-outline btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button className="btn btn-circle btn-outline btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button className="btn btn-circle btn-outline btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Floating feature badges */}
          <motion.div
            className="absolute -right-4 top-20 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="badge badge-lg badge-primary text-white shadow-lg p-4">
              ⚡ Real-time • 0.3s delay
            </div>
          </motion.div>

          <motion.div
            className="absolute -left-4 bottom-20 hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="badge badge-lg badge-accent text-white shadow-lg p-4">
              🔒 Secure & Private
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

