"use client";

import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";
import HowItWorksGraphic from "@/components/HowItWorksGraphic";

/* ────────────────────────────────────────────────
 *  Reusable animation presets
 * ──────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ────────────────────────────────────────────────
 *  Step data
 * ──────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    title: "Start your session.",
    description:
      "Create an event in seconds from your Exbabel dashboard. Name it, pick your source language, and you're ready to go — no downloads, no plugins.",
  },
  {
    number: "02",
    title: "Configure your languages.",
    description:
      "Select the languages your audience needs. Exbabel's AI handles the rest — no interpreters to hire, no booths to set up. 180+ languages available instantly.",
  },
  {
    number: "03",
    title: "Share with your audience.",
    description:
      "Share a link or QR code with your audience. They join on any device — phone, tablet, or laptop — and pick their language. That's it.",
  },
  {
    number: "04",
    title: "Speak and translate.",
    description:
      "You speak naturally. Exbabel's AI translates your speech in real-time into every configured language — audio, captions, or both. Listeners hear in their language instantly.",
  },
];

/* ────────────────────────────────────────────────
 *  Step Illustration Mockups (CSS-only)
 * ──────────────────────────────────────────────── */

/** Step 1 — mini dashboard card with "Create Session" button */
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-primary">Exbabel</span>
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">PRO</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200" />
            <span className="text-xs text-slate-500">My Name</span>
          </div>
        </div>

        {/* Dialog overlay */}
        <div className="relative p-8 flex items-center justify-center min-h-[200px] bg-slate-100/50">
          {/* Underlying dashboard hint */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-40">
            <div className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">
              Create your first session
            </div>
          </div>

          {/* Modal */}
          <motion.div
            className="relative z-10 bg-white rounded-xl shadow-2xl p-6 w-64 border border-slate-100"
            {...fadeUp(0.2)}
          >
            <h4 className="text-sm font-bold text-slate-800 text-center mb-4">New session</h4>
            <div className="space-y-3">
              <div className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600">
                Sunday Service
              </div>
              <div className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-400 flex items-center justify-between">
                <span>English (US)</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <button className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-md">
                Create Session
              </button>
              <p className="text-xs text-primary text-center cursor-pointer">Cancel</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Step 2 — animated language picker with chips */
function LanguagePickerMockup() {
  const languages = [
    { code: "ES", name: "Spanish", color: "bg-pink-100 text-pink-600" },
    { code: "KO", name: "Korean", color: "bg-blue-100 text-blue-600" },
    { code: "ZH", name: "Chinese", color: "bg-amber-100 text-amber-600" },
    { code: "FR", name: "French", color: "bg-indigo-100 text-indigo-600" },
    { code: "AR", name: "Arabic", color: "bg-emerald-100 text-emerald-600" },
    { code: "PT", name: "Portuguese", color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <h4 className="text-sm font-bold text-slate-800">Target Languages</h4>
          <span className="ml-auto text-xs text-primary font-bold">180+ available</span>
        </div>

        {/* Selected languages */}
        <div className="flex flex-wrap gap-2 mb-4">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.code}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${lang.color} ring-1 ring-current/10`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i, ease: "easeOut" }}
            >
              <span>{lang.code}</span>
              <span className="opacity-70">{lang.name}</span>
              <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </motion.div>
          ))}
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Search languages…
        </div>

        {/* AI badge */}
        <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-lg border border-primary/10">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="text-xs text-slate-600 font-medium">AI translates all selected languages automatically</span>
        </div>
      </div>
    </div>
  );
}

/** Step 3 — QR code + share link mockup */
function ShareMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-6">
        <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share with your audience
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* QR Code */}
          <div className="flex flex-col items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
            {/* CSS QR pattern */}
            <div className="w-24 h-24 bg-white rounded-lg p-2 shadow-sm border border-slate-100">
              <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-[1px]">
                {Array.from({ length: 49 }).map((_, i) => {
                  const row = Math.floor(i / 7);
                  const col = i % 7;
                  // Create QR-like corner patterns
                  const isCornerArea =
                    (row < 3 && col < 3) ||
                    (row < 3 && col > 3) ||
                    (row > 3 && col < 3);
                  const isCenter = row === 3 && col === 3;
                  const isFilled = isCornerArea || isCenter || (i * 13) % 5 < 3;
                  return (
                    <div
                      key={i}
                      className={`rounded-[1px] ${isFilled ? "bg-slate-800" : "bg-transparent"}`}
                    />
                  );
                })}
              </div>
            </div>
            <span className="text-xs font-bold text-slate-600">Scan to join</span>
          </div>

          {/* Link + Code */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Share link</label>
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <span className="text-slate-600 truncate flex-1">exbabel.com/join/a8f3k</span>
                <button className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded-md shrink-0">Copy</button>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Session code</label>
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <span className="text-slate-800 font-mono tracking-[0.2em] font-bold flex-1">A 8 F 3 K 9</span>
                <button className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded-md shrink-0">Copy</button>
              </div>
            </div>

            {/* Device icons */}
            <div className="flex items-center gap-1.5 text-slate-400 mt-1">
              {/* Phone */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              {/* Tablet */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              {/* Laptop */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="text-[10px] font-medium ml-1">Works on any device</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
 *  Main Section Component
 * ──────────────────────────────────────────────── */
export default function HowItWorks() {
  const stepIllustrations = [
    <DashboardMockup key="dash" />,
    <LanguagePickerMockup key="lang" />,
    <ShareMockup key="share" />,
    null, // Step 4 uses HowItWorksGraphic inline
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* ── Aurora Background Blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 hidden lg:block"
          style={{ background: "radial-gradient(circle, rgba(234,214,255,0.4) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full blur-[100px] opacity-15 hidden lg:block"
          style={{ background: "radial-gradient(circle, rgba(214,245,255,0.35) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 hidden lg:block"
          style={{ background: "radial-gradient(circle, rgba(255,214,229,0.3) 0%, transparent 70%)" }}
        />
      </div>

      <div className="layout-spine relative z-10 section-gap">
        {/* ━━━━━━━━━━━━━━━ HEADER ━━━━━━━━━━━━━━━ */}
        <motion.div className="text-center max-w-3xl mx-auto" {...fadeUp()}>
          <h2
            className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            How it works.
          </h2>
          <p
            className="text-lg md:text-xl text-base-muted leading-relaxed max-w-[680px] mx-auto mb-8 font-medium"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Learn how you turn any smartphone or computer into a flexible,
            real-time AI translation system — no extra hardware needed.
          </p>
          <a
            href="#demo-video"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-slate-200 hover:border-primary/40 text-base-ink font-bold text-sm transition-all hover:shadow-md group"
          >
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg className="w-4 h-4 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Watch video tour
          </a>
        </motion.div>

        {/* ━━━━━━━━━━━━━━━ FEATURE HIGHLIGHT CARDS ━━━━━━━━━━━━━━━ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          {/* Card 1 — No extra hardware */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm border border-[#5a5d80]/15 rounded-2xl p-8 hover:shadow-lg hover:border-[#5a5d80]/30 transition-all"
            {...fadeUp(0.1)}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-base-ink">
                No extra hardware required
              </h3>
            </div>
            <p className="text-sm text-base-muted leading-relaxed ml-9">
              All you need is a solid internet connection and a web browser or
              our app. Works on iPhone, Android, Chrome, Safari, and more.
            </p>
            {/* Platform icons */}
            <div className="flex items-center gap-3 ml-9 mt-4 text-slate-400">
              {/* Apple */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              {/* Android */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 2.393l1.59-2.748a.469.469 0 00-.169-.638.462.462 0 00-.635.171L16.7 1.946C15.267 1.262 13.68.912 12.001.912c-1.68 0-3.267.35-4.7 1.034L5.692-.822a.462.462 0 00-.635-.171.469.469 0 00-.169.638l1.59 2.748C2.834 4.612.389 8.27.389 12.468h23.222c0-4.198-2.445-7.856-6.088-10.075zM7.5 9.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm9 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM.389 13.543v7.229c0 1.231.999 2.229 2.229 2.229h1.236v3.268a1.731 1.731 0 103.462 0V23h5.368v3.268a1.731 1.731 0 103.462 0V23h1.236c1.23 0 2.229-.998 2.229-2.229v-7.228H.389z"/></svg>
              <div className="w-px h-4 bg-slate-200" />
              {/* Chrome */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L10.67 16h6.67A7.962 7.962 0 0112 20zm6.31-6H13.5l-3.5-6.06A7.973 7.973 0 0120 12c0 .69-.09 1.36-.26 2h-1.43z"/></svg>
              {/* Safari */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5S3.5 16.687 3.5 12 7.313 3.5 12 3.5zM9.5 7l-3 10 10-3-7-7zm1.414 1.414L15.5 13l-5.586 1.414L11.328 9z"/></svg>
            </div>
          </motion.div>

          {/* Card 2 — AI-powered */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm border border-[#5a5d80]/15 rounded-2xl p-8 hover:shadow-lg hover:border-[#5a5d80]/30 transition-all"
            {...fadeUp(0.2)}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-base-ink">
                AI-powered, fully automatic
              </h3>
            </div>
            <p className="text-sm text-base-muted leading-relaxed ml-9">
              No interpreters to hire or manage. Exbabel&apos;s AI translates
              speech in real-time into 180+ languages — audio, captions, or
              both.
            </p>
            <div className="ml-9 mt-4">
              <a
                href="/impact"
                className="text-sm font-bold text-primary hover:underline decoration-2 underline-offset-4 transition-colors"
              >
                See supported languages →
              </a>
            </div>
          </motion.div>
        </div>

        {/* ━━━━━━━━━━━━━━━ NUMBERED STEPS ━━━━━━━━━━━━━━━ */}
        <div className="w-full max-w-5xl mx-auto space-y-24 md:space-y-32 mt-8">
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 0;

            return (
              <div key={step.number} className="relative">
                {/* Connecting line (between steps) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 -translate-x-px top-full h-24 md:h-32 w-px bg-gradient-to-b from-primary/20 to-transparent" />
                )}

                <div
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-10 md:gap-16`}
                >
                  {/* Text Column */}
                  <motion.div
                    className="flex-1 text-center md:text-left"
                    {...fadeUp(0.1)}
                  >
                    {/* Step number */}
                    <span className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent leading-none mb-4 block">
                      {step.number}
                    </span>

                    <h3
                      className="text-2xl md:text-3xl font-black text-base-ink tracking-tight mb-4"
                      style={{ fontFamily: "var(--font-sora), sans-serif" }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="text-base text-base-muted leading-relaxed max-w-lg"
                      style={{ fontFamily: "var(--font-sora), sans-serif" }}
                    >
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Illustration Column */}
                  <motion.div className="flex-1 w-full" {...fadeUp(0.25)}>
                    {i < 3 ? (
                      stepIllustrations[i]
                    ) : (
                      /* Step 4: reuse the existing animated graphic */
                      <div className="flex items-center justify-center">
                        <HowItWorksGraphic />
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ━━━━━━━━━━━━━━━ CTA ━━━━━━━━━━━━━━━ */}
        <motion.div
          className="text-center mt-8 w-full max-w-3xl mx-auto"
          {...fadeUp(0.1)}
        >
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-14 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <h3
                className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                Get started.
              </h3>
              <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto mb-8 font-medium">
                Transform any device into a real-time AI translation
                system today. Try it free for 30 days.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={appRoutes.pricingStarter}
                  className="px-8 py-3.5 bg-white text-primary font-bold rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-sm"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  Start Your Free Trial
                </a>
                <a
                  href="/demo"
                  className="px-8 py-3.5 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all text-sm"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  Or, contact us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
