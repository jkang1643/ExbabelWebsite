"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";


/* ═══════════════════════════════════════════════
 * TAB DATA
 * ═══════════════════════════════════════════════ */
interface Tab {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  metric?: string;
  metricLabel: string;
  accentColor: string;
  story: string;
  benefits?: string[];
}

const TABS: Tab[] = [
  {
    id: "seamless",
    label: "Seamless Worship",
    shortLabel: "Seamless",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    metric: "<500ms",
    metricLabel: "No delays, no awkward pauses",
    accentColor: "#7C3AED",
    story: "Your congregation hears the sermon naturally — no awkward pauses, no delay. Just seamless understanding, as if the pastor spoke every language.",
  },
  {
    id: "unite",
    label: "Unite Your Church",
    shortLabel: "Unite",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    metricLabel: "One service, every language",
    accentColor: "#2563EB",
    story: "When language is no longer a barrier, your church becomes a true reflection of its community — diverse, united, and welcoming to all.",
    benefits: [
      "Welcome multilingual visitors with confidence",
      "Keep families worshipping together in the same service",
      "Increase accessibility through live translated audio and captions",
    ],
  },
  {
    id: "growth",
    label: "Grow Your Reach",
    shortLabel: "Grow",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    metricLabel: "Ministry without borders",
    accentColor: "#059669",
    story: "From a single campus to a worldwide congregation — ExBabel lets you serve anyone, anywhere, without multiplying services or staff.",
    benefits: [
      "Serve international communities without additional staff",
      "Expand your online ministry to a global audience",
      "Reach more people without adding more services",
    ],
  },
  {
    id: "simple",
    label: "Simplify",
    shortLabel: "Easy",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    metricLabel: "Operations simplified",
    accentColor: "#DB2777",
    story: "No more scrambling for interpreters on Sunday morning. ExBabel handles every language automatically, so your team can focus on ministry.",
    benefits: [
      "Eliminate interpreter scheduling and coordination",
      "Reduce operational complexity and costs",
    ],
  },
];

/* ═══════════════════════════════════════════════
 * DETERMINISTIC PRNG (SSR-safe)
 * ═══════════════════════════════════════════════ */
function seeded(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ═══════════════════════════════════════════════
 * WAVEFORM VISUALIZATION
 * ═══════════════════════════════════════════════ */
function WaveformBars({
  barCount = 32,
  color = "#7C3AED",
  active = true,
  height = 48,
  className = "",
}: {
  barCount?: number;
  color?: string;
  active?: boolean;
  height?: number;
  className?: string;
}) {
  const bars = useMemo(() => {
    const pattern: number[] = [];
    let i = 0;
    let s = 0;
    while (i < barCount) {
      const wordLen = 3 + Math.floor(seeded(s++) * 5);
      const peak = 0.4 + seeded(s++) * 0.6;
      for (let j = 0; j < wordLen && i < barCount; j++, i++) {
        const envelope = Math.sin((j / wordLen) * Math.PI);
        pattern.push(0.12 + envelope * peak * (0.6 + seeded(s++) * 0.4));
      }
      const pause = 1 + Math.floor(seeded(s++) * 2);
      for (let j = 0; j < pause && i < barCount; j++, i++) {
        pattern.push(0.04 + seeded(s++) * 0.08);
      }
    }
    return pattern.slice(0, barCount);
  }, [barCount]);

  return (
    <div className={`flex items-end gap-[2px] ${className}`} style={{ height }}>
      {bars.map((h, i) => (
        <div
          key={i}
          className="rounded-full flex-1 min-w-[2px]"
          style={{
            height: `${h * 100}%`,
            backgroundColor: color,
            opacity: active ? 0.85 : 0.2,
            transformOrigin: "bottom",
            animation: active
              ? `wcWaveBar ${0.5 + (i % 7) * 0.12}s ease-in-out ${i * 0.025}s infinite alternate`
              : "none",
            transition: "opacity 0.5s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
 * FLOATING PARTICLES (aurora-tinted)
 * ═══════════════════════════════════════════════ */
function FloatingParticles() {
  const colors = ["#EAD6FF", "#D6F5FF", "#FFD6E5", "#FFF7D1"];
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${5 + ((i * 6.8) % 90)}%`,
        size: 3 + (i % 4) * 1.5,
        duration: 16 + (i % 6) * 4,
        delay: (i * 1.4) % 12,
        opacity: 0.25 + (i % 3) * 0.1,
        color: colors[i % colors.length],
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            backgroundColor: p.color,
            animation: `wcFloatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
 * TAB 1: SUB-SECOND — Live Translation Flow
 * ═══════════════════════════════════════════════ */
function SubSecondViz({ accentColor }: { accentColor: string }) {
  return (
    <div className="w-full">
      {/* ─── Original English Input ─── */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm">
            🎤
          </div>
          <span className="text-slate-700 text-sm font-semibold tracking-wide">
            Original · English
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
            </span>
            <span className="text-red-500/70 text-[10px] font-bold tracking-wider uppercase">
              Live
            </span>
          </div>
        </div>
        <div className="text-slate-400 text-sm italic mb-3 pl-11 font-light">
          &ldquo;The Lord is my shepherd, I shall not want. He makes me lie down in green
          pastures...&rdquo;
        </div>
        <div className="pl-11">
          <WaveformBars barCount={56} color={accentColor} active height={56} />
        </div>
      </div>

      {/* ─── Delay Indicator ─── */}
      <div className="flex items-center gap-3 my-7 pl-11">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div
          className="px-5 py-2 rounded-full text-sm font-bold tracking-wider flex items-center gap-2 shadow-sm"
          style={{
            backgroundColor: `${accentColor}12`,
            color: accentColor,
            animation: "wcDelayPulse 2.5s ease-in-out infinite",
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          0.4s delay
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      {/* ─── Translated Outputs ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-11">
        {[
          { flag: "🇪🇸", lang: "Español", color: "#D97706" },
          { flag: "🇰🇷", lang: "한국어", color: "#DB2777" },
          { flag: "🇫🇷", lang: "Français", color: "#2563EB" },
          { flag: "🇧🇷", lang: "Português", color: "#059669" },
        ].map((item, i) => (
          <motion.div
            key={item.lang}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl bg-white/70 border border-slate-200/60 p-4 hover:shadow-md hover:border-slate-300/60 transition-all duration-300"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-lg">{item.flag}</span>
              <span className="text-slate-600 text-xs font-bold tracking-wide">{item.lang}</span>
              <span className="ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
              </span>
            </div>
            <WaveformBars barCount={28} color={item.color} active height={28} />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-5 pl-11">
        <span className="text-slate-400 text-xs font-semibold tracking-wider">
          + 246 more languages available
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
 * BENEFITS VISUALIZATION (Tabs 2–4)
 * ═══════════════════════════════════════════════ */
function BenefitsViz({
  benefits,
  accentColor,
  tabLabel,
}: {
  benefits: string[];
  accentColor: string;
  tabLabel: string;
}) {
  return (
    <div className="w-full">
      {/* ─── Tab Title ─── */}
      <div className="mb-6">
        <h3
          className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          {tabLabel}
        </h3>
        <div className="h-1 w-12 rounded-full" style={{ backgroundColor: accentColor }} />
      </div>

      {/* ─── Benefits List ─── */}
      <div className="space-y-3">
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-start gap-4 p-5 rounded-xl bg-white/50 border border-slate-200/50 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300"
          >
            {/* Check icon */}
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: `${accentColor}12` }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={accentColor} strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Benefit text */}
            <span className="text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              {benefit}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
 * MAIN COMPONENT
 * ═══════════════════════════════════════════════ */
export default function WhyChurchesChoose() {
  const [activeTab, setActiveTab] = useState(0);
  const prefersReduced = useReducedMotion();
  const currentTab = TABS[activeTab];

  return (
    <section
        id="why-churches-choose"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        {/* ─── Aurora Background ─── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-section-soft opacity-60" />
          <div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[220px] transition-all duration-[1500ms]"
            style={{ backgroundColor: `${currentTab.accentColor}10` }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px] transition-all duration-[1500ms]"
            style={{ backgroundColor: `${currentTab.accentColor}08` }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[200px]"
            style={{ background: "radial-gradient(ellipse, rgba(234,214,255,0.15), rgba(214,245,255,0.1), transparent)" }}
          />
        </div>

        {!prefersReduced && <FloatingParticles />}

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
          {/* ═══ HEADER ═══ */}
          <motion.div
            className="text-center mb-14 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold tracking-[0.18em] uppercase mb-7">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              The ExBabel Advantage
            </div>

            {/* Headline */}
            <h2
              className="text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.08] mb-5 text-base-content"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Why Churches Choose{" "}
              <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ExBabel
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base-content/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
              Real-time translation that transforms how your church serves,
              grows, and connects across every language.
            </p>
          </motion.div>

          {/* ═══ TAB NAVIGATION ═══ */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="inline-flex bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-1.5 gap-1 shadow-sm">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    i === activeTab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {i === activeTab && (
                    <motion.div
                      layoutId="wcTabPill"
                      className="absolute inset-0 rounded-xl bg-white shadow-md border border-slate-200/80"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span style={{ color: i === activeTab ? tab.accentColor : undefined }}>
                      {tab.icon}
                    </span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ═══ VISUALIZATION CONTAINER ═══ */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Glass card */}
            <div className="absolute inset-0 rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/60 shadow-xl shadow-slate-200/30 pointer-events-none z-0" />

            {/* Top accent glow line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] z-20 rounded-t-3xl"
              style={{
                background: `linear-gradient(90deg, transparent 10%, ${currentTab.accentColor}50 50%, transparent 90%)`,
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Container body */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-14">
              {/* ─── Metric Badge (only for latency tab) ─── */}
              {currentTab.metric && (
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    key={`metric-${activeTab}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-5xl md:text-6xl font-extrabold tracking-tight"
                    style={{ color: currentTab.accentColor, fontFamily: "var(--font-sora), sans-serif" }}
                  >
                    {currentTab.metric}
                  </motion.div>
                  <div>
                    <div className="text-slate-700 text-sm font-bold">{currentTab.metricLabel}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: currentTab.accentColor }}
                      />
                      <span className="text-slate-400 text-[10px] font-bold tracking-[0.12em] uppercase">
                        Best in class
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Tab Visualization ─── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeTab === 0 && <SubSecondViz accentColor={currentTab.accentColor} />}
                  {activeTab !== 0 && currentTab.benefits && (
                    <BenefitsViz
                      benefits={currentTab.benefits}
                      accentColor={currentTab.accentColor}
                      tabLabel={currentTab.label}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ─── Emotional Story ─── */}
              <div className="mt-10 pt-8 border-t border-slate-200/60">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`story-${activeTab}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-slate-400 text-base md:text-lg italic max-w-2xl leading-relaxed"
                    style={{ fontFamily: "var(--font-sora), sans-serif" }}
                  >
                    &ldquo;{currentTab.story}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ═══ BOTTOM LABELS ROW ═══ */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-14 mt-10 md:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`text-center transition-all duration-400 group ${
                  i === activeTab ? "opacity-100 scale-100" : "opacity-40 scale-95 hover:opacity-60"
                }`}
              >
                <div
                  className="text-sm md:text-base font-bold transition-colors duration-500"
                  style={{ color: i === activeTab ? tab.accentColor : "#94A3B8", fontFamily: "var(--font-sora), sans-serif" }}
                >
                  {tab.label}
                </div>
                <div className="text-slate-400 text-[10px] md:text-xs font-medium mt-1 tracking-wide">
                  {tab.metricLabel}
                </div>
                {i === activeTab && (
                  <motion.div
                    layoutId="wcBottomIndicator"
                    className="h-0.5 rounded-full mt-2 mx-auto w-8"
                    style={{ backgroundColor: tab.accentColor }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>
  );
}
