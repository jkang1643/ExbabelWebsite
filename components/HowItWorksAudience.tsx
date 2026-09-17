"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HowItWorksAudience() {
  const [selectedLang, setSelectedLang] = useState("Spanish");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="layout-spine max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase text-primary tracking-widest block mb-2">Phase 3 — Audience Experience</span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Zero-Download Listener Web App
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            Listeners scan a QR code or tap a link on their smartphone or tablet. They pick their language and listen live or read captions immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column — Features List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
                📱
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  Works on Any Smartphone &amp; Browser
                </h4>
                <p className="text-sm text-slate-600 font-medium">
                  Compatible with Safari, Chrome, Firefox, iOS, Android, and tablets. No App Store or Google Play downloads needed.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg shrink-0">
                🎧
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  Audio Stream &amp; Live Subtitles
                </h4>
                <p className="text-sm text-slate-600 font-medium">
                  Attendees can plug in headphones to listen to natural AI voices, read real-time synchronized captions, or both.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  Instant Language Switching
                </h4>
                <p className="text-sm text-slate-600 font-medium">
                  Switch target languages mid-session with a single tap without missing a beat of the live audio feed.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — Interactive Listener Smartphone App Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm">
              {/* Phone Outer Frame */}
              <div className="bg-slate-950 p-4 rounded-[40px] shadow-2xl border-4 border-slate-800">
                {/* Dynamic Notch */}
                <div className="w-28 h-4 bg-slate-900 rounded-full mx-auto mb-3" />

                {/* Smartphone Screen Content */}
                <div
                  className={`rounded-[28px] p-5 min-h-[440px] flex flex-col justify-between transition-colors ${
                    isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
                  }`}
                >
                  {/* App Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-primary">Exbabel Live</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsDarkMode(!isDarkMode)}
                          className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded-md font-medium"
                        >
                          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
                        </button>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                    </div>

                    {/* Language Dropdown Selector */}
                    <div className="mb-4">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">My Language</label>
                      <select
                        value={selectedLang}
                        onChange={(e) => setSelectedLang(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border text-sm font-bold ${
                          isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-100 border-slate-200 text-slate-800"
                        }`}
                      >
                        <option value="Spanish">🇪🇸 Spanish (Español)</option>
                        <option value="Korean">🇰🇷 Korean (한국어)</option>
                        <option value="French">🇫🇷 French (Français)</option>
                        <option value="Chinese">🇨🇳 Chinese (中文)</option>
                        <option value="Portuguese">🇵🇹 Portuguese (Português)</option>
                      </select>
                    </div>

                    {/* Live Captions Output */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Captions</span>
                        <div className="flex gap-1 text-[10px]">
                          {(["sm", "md", "lg"] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() => setFontSize(s)}
                              className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                                fontSize === s ? "bg-primary text-white" : "text-slate-400"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-xl border min-h-[120px] font-mono leading-relaxed transition-all ${
                          isDarkMode ? "bg-slate-950 border-slate-800 text-emerald-400" : "bg-slate-50 border-slate-200 text-slate-800"
                        } ${
                          fontSize === "sm" ? "text-xs" : fontSize === "md" ? "text-sm" : "text-base"
                        }`}
                      >
                        {selectedLang === "Spanish" && "Bienvenidos a todos a nuestro servicio de hoy. Estamos muy felices de tenerlos aquí con nosotros."}
                        {selectedLang === "Korean" && "오늘 예배에 오신 모든 분들을 환영합니다. 함께하게 되어 정말 기쁩니다."}
                        {selectedLang === "French" && "Bienvenue à tous à notre service aujourd'hui. Nous sommes ravis de vous avoir parmi nous."}
                        {selectedLang === "Chinese" && "欢迎大家来到我们今天的聚会。非常高兴大家能与我们在一起。"}
                        {selectedLang === "Portuguese" && "Bem-vindos a todos ao nosso serviço de hoje. Estamos muito felizes em tê-los conosco."}
                      </div>
                    </div>
                  </div>

                  {/* Audio Controls */}
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                        ▶
                      </div>
                      <div>
                        <div className="text-xs font-bold text-primary">Live Audio Stream</div>
                        <div className="text-[10px] text-slate-400">Headphones Connected</div>
                      </div>
                    </div>
                    <motion.div
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
