"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ═══════════════════════════════════════════════
 * TRANSITION HELPER
 * ═══════════════════════════════════════════════ */
const ease = "cubic-bezier(0.16,1,0.3,1)";
const t = (d: number) => `all 0.5s ${ease} ${d}s`;

/* ═══════════════════════════════════════════════
 * CARD DATA
 * ═══════════════════════════════════════════════ */
interface BenefitCard {
  title: string;
  description: string;
  icon: (active: boolean) => React.ReactNode;
  accentFrom: string;
  accentTo: string;
}

const BENEFITS: BenefitCard[] = [
  /* ═══ 1. AVATAR STACK ═══ */
  {
    title: "Welcome multilingual visitors",
    description: "Every visitor hears the sermon in their language from the moment they arrive.",
    accentFrom: "#818CF8",
    accentTo: "#6366F1",
    icon: (active) => {
      const avatars = [
        { src: "/avatars/avatar-1.png", flag: "🇪🇸", z: 5, x: -6 },
        { src: "/avatars/avatar-2.png", flag: "🇰🇷", z: 4, x: -3 },
        { src: "/avatars/avatar-3.png", flag: "🇳🇬", z: 3, x: 3 },
        { src: "/avatars/avatar-4.png", flag: "🇫🇷", z: 2, x: 6 },
      ];
      return (
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center">
            {avatars.map((a, i) => (
              <div
                key={i}
                className="relative -ml-4 first:ml-0"
                style={{
                  zIndex: a.z,
                  transform: active ? `translateX(${a.x}px) scale(1.08)` : "translateX(0) scale(1)",
                  transition: t(0.05 + i * 0.06),
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.src}
                  alt=""
                  className="w-[68px] h-[68px] rounded-full object-cover border-[3px] border-white shadow-lg shadow-slate-200/80"
                />
                <div
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xs"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "scale(1)" : "scale(0.5)",
                    transition: t(0.2 + i * 0.08),
                  }}
                >
                  {a.flag}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },

  /* ═══ 2. LIVE CAPTION UI ═══ */
  {
    title: "Increase accessibility",
    description: "Live translated audio and captions make every service accessible to all.",
    accentFrom: "#38BDF8",
    accentTo: "#0EA5E9",
    icon: (active) => (
      <div className="text-left space-y-2 h-full flex flex-col justify-center">
        {/* Speaker header */}
        <div className="flex items-center gap-2" style={{ opacity: active ? 1 : 0.6, transition: t(0) }}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-red-400 border-2 border-white shadow-sm" />
          <span className="text-slate-600 text-xs font-semibold">
            Pastor · <span className="text-red-500 font-bold">Live</span>
          </span>
          <span className="relative flex h-2 w-2 ml-0.5">
            <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-40" />
            <span className="relative rounded-full h-2 w-2 bg-red-500" />
          </span>
        </div>
        {/* English caption */}
        <div
          className="bg-slate-100 rounded-2xl rounded-tl-md px-4 py-2.5 text-slate-800 text-xs leading-relaxed border border-slate-200/60"
          style={{ opacity: active ? 1 : 0.5, transform: active ? "translateX(0)" : "translateX(-6px)", transition: t(0.08) }}
        >
          &ldquo;The Lord is my shepherd, I shall not want...&rdquo;
        </div>
        {/* Spanish translation */}
        <div
          className="bg-sky-50 rounded-2xl rounded-tl-md px-4 py-2.5 text-sky-700 text-xs leading-relaxed border border-sky-200/60"
          style={{ opacity: active ? 1 : 0.3, transform: active ? "translateX(0)" : "translateX(-6px)", transition: t(0.18) }}
        >
          &ldquo;El Señor es mi pastor, nada me falta...&rdquo;
        </div>
        {/* Typing indicator */}
        <div className="flex items-center gap-1.5 pl-1" style={{ opacity: active ? 1 : 0.25, transition: t(0.28) }}>
          <div className="flex items-center gap-[3px] bg-slate-100 rounded-full px-3 py-1.5 border border-slate-200">
            {[0, 1, 2].map((d) => (
              <div key={d} className="w-[5px] h-[5px] rounded-full bg-slate-400"
                style={{ animation: active ? `bentoTyping 1.2s ease-in-out ${d * 0.15}s infinite` : "none" }} />
            ))}
          </div>
          <span className="text-slate-400 text-[10px] font-medium">translating...</span>
        </div>
      </div>
    ),
  },

  /* ═══ 3. NETWORK DIAGRAM ═══ */
  {
    title: "Serve international communities",
    description: "Support diverse congregations without additional staff or volunteers.",
    accentFrom: "#34D399",
    accentTo: "#059669",
    icon: (active) => {
      const nodes = [
        { x: 12, y: 12, label: "🇺🇸", r: 10 },
        { x: 68, y: 10, label: "🇰🇷", r: 9 },
        { x: 6, y: 50, label: "🇪🇸", r: 11 },
        { x: 74, y: 48, label: "🇳🇬", r: 9 },
        { x: 18, y: 82, label: "🇧🇷", r: 10 },
        { x: 62, y: 84, label: "🇫🇷", r: 8 },
      ];
      return (
        <svg viewBox="0 0 80 95" className="w-full h-full">
          {nodes.map((n, i) => (
            <line key={`l${i}`} x1="40" y1="48" x2={n.x} y2={n.y}
              stroke="#34D399" strokeWidth="0.8"
              style={{ opacity: active ? 0.4 : 0.12, transition: t(0.05 + i * 0.05) }} />
          ))}
          {/* Center hub */}
          <circle cx="40" cy="48" r="13" fill="#059669" fillOpacity={active ? 0.12 : 0.06} stroke="#34D399" strokeWidth="1.5"
            style={{ transition: t(0) }} />
          <circle cx="40" cy="48" r="18" stroke="#34D399" strokeWidth="0.5" fill="none"
            style={{ opacity: active ? 0.3 : 0.1, transform: active ? "scale(1)" : "scale(0.85)", transformOrigin: "40px 48px", transition: t(0.1) }} />
          <text x="40" y="45" textAnchor="middle" fill="#059669" fontSize="7" fontWeight="700"
            style={{ opacity: active ? 1 : 0.6, transition: t(0.05) }}>Ex</text>
          <text x="40" y="54" textAnchor="middle" fill="#059669" fontSize="5.5" fontWeight="500"
            style={{ opacity: active ? 0.8 : 0.4, transition: t(0.05) }}>Babel</text>
          {/* Satellite nodes */}
          {nodes.map((n, i) => (
            <g key={`n${i}`} style={{ opacity: active ? 1 : 0.45, transform: active ? "scale(1)" : "scale(0.85)", transformOrigin: `${n.x}px ${n.y}px`, transition: t(0.1 + i * 0.05) }}>
              <circle cx={n.x} cy={n.y} r={n.r} fill="white" stroke="#34D399" strokeWidth="1.2" />
              <text x={n.x} y={n.y + 1} textAnchor="middle" fontSize="9" dominantBaseline="middle">{n.label}</text>
            </g>
          ))}
        </svg>
      );
    },
  },

  /* ═══ 4. BAR CHART ═══ */
  {
    title: "Support online ministry growth",
    description: "Expand your livestream audience to viewers in any country, any language.",
    accentFrom: "#F472B6",
    accentTo: "#DB2777",
    icon: (active) => {
      const bars = [55, 40, 65, 35, 50, 72, 42, 55, 80, 38, 50, 62, 70, 45, 78, 55, 65, 90, 52, 45];
      const hi = 17;
      return (
        <div className="w-full h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between mb-2" style={{ opacity: active ? 1 : 0.5, transition: t(0) }}>
            <span className="text-slate-600 text-[11px] font-bold tracking-wide">Viewers by Language</span>
            <div className="flex items-center bg-slate-100 rounded-md text-[9px] font-bold text-slate-400 border border-slate-200">
              {["D", "W", "M", "Y"].map((p) => (
                <span key={p} className={`px-2 py-0.5 rounded-md ${p === "M" ? "bg-sky-100 text-sky-600" : ""}`}>{p}</span>
              ))}
            </div>
          </div>
          {/* Bars */}
          <div className="flex items-end gap-[3px] flex-1 pb-1">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm min-w-0"
                style={{
                  height: active ? `${h}%` : `${h * 0.35}%`,
                  backgroundColor: i === hi ? "#38BDF8" : (Math.abs(i - hi) <= 1) ? "rgba(56,189,248,0.35)" : "rgba(100,116,139,0.15)",
                  transition: `height 0.6s ${ease} ${0.03 + i * 0.015}s`,
                }} />
            ))}
          </div>
          {/* Stats */}
          <div className="flex items-center justify-between mt-1.5" style={{ opacity: active ? 1 : 0.35, transition: t(0.3) }}>
            <span className="text-slate-400 text-[9px]">↑ 34% growth</span>
            <span className="text-sky-600 text-[9px] font-bold">2.4K avg/week</span>
          </div>
        </div>
      );
    },
  },

  /* ═══ 5. CASCADING WORKFLOW ═══ */
  {
    title: "Eliminate interpreter scheduling",
    description: "No more coordinating volunteer interpreters week after week.",
    accentFrom: "#FB923C",
    accentTo: "#EA580C",
    icon: (active) => {
      const steps = [
        { label: "Auto-detect language", indent: 0 },
        { label: "Transcribe speech", indent: 20 },
        { label: "Translate to target", indent: 10 },
        { label: "Voice synthesis", indent: 30 },
        { label: "Broadcast", indent: 18 },
      ];
      return (
        <div className="relative h-full flex flex-col justify-center">
          <div className="absolute left-[14px] top-3 bottom-3 w-px bg-slate-200" />
          <div className="space-y-2">
            {steps.map((step, i) => (
              <div key={step.label} className="relative flex items-center"
                style={{
                  paddingLeft: `${10 + step.indent}px`,
                  opacity: active ? 1 : 0.4,
                  transform: active ? "translateX(0)" : `translateX(-8px)`,
                  transition: t(0.05 + i * 0.07),
                }}
              >
                <div className="absolute left-[11px] w-[7px] h-[7px] rounded-full border-2 border-orange-400"
                  style={{ backgroundColor: active ? "#FB923C" : "white", transition: t(0.05 + i * 0.07) }} />
                <span className="inline-block bg-slate-100 border border-slate-200 rounded-lg px-3.5 py-2 text-slate-700 text-[11px] font-semibold whitespace-nowrap">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute left-[11px] bottom-1 w-[7px] h-[7px] rounded-full bg-green-500"
            style={{ opacity: active ? 1 : 0.3, transform: active ? "scale(1)" : "scale(0.6)", transition: t(0.45) }} />
        </div>
      );
    },
  },

  /* ═══ 6. DONUT CHART ═══ */
  {
    title: "Reduce operational complexity",
    description: "One platform replaces scheduling, equipment, and coordination overhead.",
    accentFrom: "#A78BFA",
    accentTo: "#7C3AED",
    icon: (active) => {
      const r = 32;
      const c = Math.PI * 2 * r;
      const segments = [
        { pct: 0.45, color: "#7C3AED", label: "Automated" },
        { pct: 0.25, color: "#A78BFA", label: "Simplified" },
        { pct: 0.18, color: "#C4B5FD", label: "Managed" },
        { pct: 0.12, color: "#DDD6FE", label: "Manual" },
      ];
      let offset = 0;
      return (
        <div className="flex items-center justify-center gap-5 h-full">
          <svg viewBox="0 0 80 80" className="w-24 h-24 flex-shrink-0">
            <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="8" />
            {segments.map((seg, i) => {
              const dashLen = seg.pct * c;
              const dashOff = offset;
              offset += dashLen;
              return (
                <circle key={i} cx="40" cy="40" r={r} fill="none" stroke={seg.color} strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${dashLen} ${c - dashLen}`}
                  strokeDashoffset={-dashOff}
                  transform="rotate(-90 40 40)"
                  style={{ opacity: active ? 1 : 0.3, transition: t(0.08 + i * 0.06) }} />
              );
            })}
            <text x="40" y="37" textAnchor="middle" fill="#7C3AED" fontSize="12" fontWeight="800"
              style={{ opacity: active ? 1 : 0.4, transition: t(0.15) }}>88%</text>
            <text x="40" y="48" textAnchor="middle" fill="#7C3AED" fontSize="5.5" fontWeight="500"
              style={{ opacity: active ? 0.6 : 0.25, transition: t(0.2) }}>automated</text>
          </svg>
          <div className="space-y-2 flex-1 min-w-0">
            {segments.map((seg, i) => (
              <div key={i} className="flex items-center gap-2.5"
                style={{ opacity: active ? 1 : 0.35, transform: active ? "translateX(0)" : "translateX(6px)", transition: t(0.12 + i * 0.05) }}>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                <span className="text-slate-700 text-[10px] font-semibold truncate">{seg.label}</span>
                <span className="text-slate-400 text-[10px] font-medium ml-auto">{Math.round(seg.pct * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },

  /* ═══ 7. BUBBLE CHART ═══ */
  {
    title: "Keep families worshipping together",
    description: "Parents and children stay in the same service — everyone understands.",
    accentFrom: "#F9A8D4",
    accentTo: "#EC4899",
    icon: (active) => {
      const bubbles = [
        { x: 24, y: 36, r: 18, label: "ES", color: "#EC4899" },
        { x: 54, y: 28, r: 15, label: "KO", color: "#F472B6" },
        { x: 40, y: 64, r: 12, label: "FR", color: "#FB7185" },
        { x: 68, y: 54, r: 10, label: "PT", color: "#FDA4AF" },
        { x: 10, y: 66, r: 8, label: "ZH", color: "#FECDD3" },
        { x: 72, y: 16, r: 7, label: "AR", color: "#FFF1F2" },
      ];
      return (
        <svg viewBox="0 0 80 85" className="w-full h-full">
          {bubbles.slice(1).map((b, i) => (
            <line key={`cl${i}`} x1={bubbles[0].x} y1={bubbles[0].y} x2={b.x} y2={b.y}
              stroke="#EC4899" strokeWidth="0.5"
              style={{ opacity: active ? 0.2 : 0.06, transition: t(0.1 + i * 0.04) }} />
          ))}
          {bubbles.map((b, i) => (
            <g key={i} style={{
              opacity: active ? 1 : 0.4,
              transform: active ? "scale(1)" : "scale(0.8)",
              transformOrigin: `${b.x}px ${b.y}px`,
              transition: t(0.05 + i * 0.05),
            }}>
              <circle cx={b.x} cy={b.y} r={b.r} fill={b.color} fillOpacity="0.12" stroke={b.color} strokeWidth="1.2" />
              <text x={b.x} y={b.y + 1} textAnchor="middle" dominantBaseline="middle" fill={b.color}
                fontSize={b.r > 12 ? "9" : b.r > 8 ? "7" : "5"} fontWeight="700">{b.label}</text>
            </g>
          ))}
          <text x="40" y="82" textAnchor="middle" fill="rgba(0,0,0,0.2)" fontSize="5" fontWeight="500"
            style={{ opacity: active ? 1 : 0.4, transition: t(0.35) }}>all in one service</text>
        </svg>
      );
    },
  },

  /* ═══ 8. LINE / AREA CHART ═══ */
  {
    title: "Expand global reach",
    description: "Plant churches, support missionaries, and connect communities worldwide.",
    accentFrom: "#2DD4BF",
    accentTo: "#0D9488",
    icon: (active) => {
      const pts = "8,58 16,54 24,50 32,45 40,38 48,32 56,22 64,17 72,12";
      const area = pts + " 72,68 8,68";
      return (
        <svg viewBox="0 0 80 75" className="w-full h-full">
          {[20, 35, 50, 65].map((y, i) => (
            <line key={i} x1="6" y1={y} x2="74" y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="0.5"
              style={{ opacity: active ? 1 : 0.5, transition: t(0.03 * i) }} />
          ))}
          <text x="4" y="22" fill="rgba(0,0,0,0.15)" fontSize="4" textAnchor="end"
            style={{ opacity: active ? 1 : 0.4, transition: t(0.05) }}>100</text>
          <text x="4" y="52" fill="rgba(0,0,0,0.15)" fontSize="4" textAnchor="end"
            style={{ opacity: active ? 1 : 0.4, transition: t(0.08) }}>50</text>
          {/* Area */}
          <polygon points={area} fill="url(#areaGrad)"
            style={{ opacity: active ? 1 : 0.3, transition: t(0.15) }} />
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Line */}
          <polyline points={pts} fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{
              strokeDasharray: "120",
              strokeDashoffset: active ? "0" : "60",
              opacity: active ? 1 : 0.4,
              transition: `all 0.8s ${ease} 0.08s`,
            }} />
          {/* Data points */}
          {[[8,58],[24,50],[40,38],[56,22],[72,12]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#0D9488" stroke="#2DD4BF" strokeWidth="1.5"
              style={{ opacity: active ? 1 : 0.3, transform: active ? "scale(1)" : "scale(0.6)", transformOrigin: `${cx}px ${cy}px`, transition: t(0.15 + i * 0.06) }} />
          ))}
          {/* Header */}
          <text x="8" y="8" fill="rgba(0,0,0,0.35)" fontSize="5.5" fontWeight="700"
            style={{ opacity: active ? 1 : 0.5, transition: t(0) }}>Countries Reached</text>
          <g style={{ opacity: active ? 1 : 0.3, transition: t(0.4) }}>
            <rect x="50" y="3" width="24" height="9" rx="4.5" fill="#2DD4BF" fillOpacity="0.12" stroke="#2DD4BF" strokeWidth="0.6" />
            <text x="62" y="10" textAnchor="middle" fill="#0D9488" fontSize="5" fontWeight="700">+127 this yr</text>
          </g>
        </svg>
      );
    },
  },
];

/* ═══════════════════════════════════════════════
 * BENTO CARD
 * ═══════════════════════════════════════════════ */
function BentoCard({ card, index }: { card: BenefitCard; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, w: 1, h: 1 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || prefersReduced || isTouch) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width, h: rect.height });
    },
    [prefersReduced, isTouch]
  );

  const normX = mouse.w ? (mouse.x - mouse.w / 2) / (mouse.w / 2) : 0;
  const normY = mouse.h ? (mouse.y - mouse.h / 2) / (mouse.h / 2) : 0;
  const tiltX = isHovered && !prefersReduced && !isTouch ? normY * -4 : 0;
  const tiltY = isHovered && !prefersReduced && !isTouch ? normX * 4 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-2xl overflow-hidden cursor-default h-full"
        style={{
          transform: isHovered && !prefersReduced && !isTouch
            ? `translate3d(0,-8px,0) scale(1.04) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
            : isHovered && isTouch
            ? "translate3d(0,-4px,0) scale(1.02)"
            : "translate3d(0,0,0) scale(1)",
          transformStyle: "preserve-3d",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease, background-color 0.4s ease",
          boxShadow: isHovered
            ? `0 20px 60px ${card.accentFrom}18, 0 8px 24px rgba(0,0,0,0.06)`
            : "0 1px 4px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
          border: `1px solid ${isHovered ? `${card.accentFrom}35` : "rgba(0,0,0,0.06)"}`,
          backgroundColor: isHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {isHovered && !prefersReduced && !isTouch && (
          <div className="absolute inset-0 pointer-events-none z-0"
            style={{ background: `radial-gradient(circle 200px at ${mouse.x}px ${mouse.y}px, ${card.accentFrom}10, transparent)` }} />
        )}

        <div className="relative z-10">
          {/* Graphic panel */}
          <div className="rounded-xl bg-gradient-to-b from-slate-50/80 to-slate-100/40 border border-slate-100 mx-1.5 mt-1.5 p-4 overflow-hidden h-[180px]">
            {card.icon(isHovered)}
          </div>

          {/* Text */}
          <div className="px-5 pt-4 pb-5">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1.5 leading-snug"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              {card.title}
            </h3>
            <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
 * MAIN
 * ═══════════════════════════════════════════════ */
export default function WhyChurchesChoose() {
  return (
    <section id="why-churches-choose" className="relative py-24 md:py-32 overflow-hidden">
      <style>{`@keyframes bentoTyping { 0%,100% { opacity: 0.3; transform: translateY(0); } 50% { opacity: 0.8; transform: translateY(-2px); } }`}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-section-soft opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(ellipse, rgba(234,214,255,0.12), rgba(214,245,255,0.08), transparent)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <motion.div className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold tracking-[0.18em] uppercase mb-7">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            Built for Churches
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-5 text-base-content"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}>
            Why Churches Choose{" "}
            <span className="text-primary">Exbabel</span>
          </h2>
          <p className="text-base-content/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed font-medium">
            Everything your church needs to break the language barrier — nothing it doesn&apos;t.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {BENEFITS.map((card, i) => (
            <div key={card.title}>
              <BentoCard card={card} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
