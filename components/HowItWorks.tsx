"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";

// --- Assets / Icons ---
const AudioIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
    <path d="M2 10v3" /><path d="M6 6v11" /><path d="M10 3v18" /><path d="M14 8v7" /><path d="M18 5v13" /><path d="M22 10v4" />
  </svg>
);

const QRIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" /><path d="M3 14h7v7H3z" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
  </svg>
);

const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Sparkle = ({ delay = 0, style }: { delay?: number; style?: React.CSSProperties }) => (
  <motion.svg
    width="20" height="20" viewBox="0 0 24 24" fill="#FFB800"
    style={style}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 45, 90] }}
    transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
  </motion.svg>
);

// --- Data ---
const STEPS = [
  {
    id: "audio",
    title: "Connect Audio",
    description: "Stream crystal-clear audio directly from your sound system. No app download required for you or your audience.",
    icon: AudioIcon,
    color: "#611f69" // Slack Purple-ish for accents
  },
  {
    id: "qr",
    title: "Instant Access",
    description: "Display a customized QR code. Attendees simply scan to join the session instantly from any smartphone.",
    icon: QRIcon,
    color: "#36C5F0" // Slack Blue
  },
  {
    id: "language",
    title: "Choose Language",
    description: "Every user picks their preferred language from over 150 options available in real-time.",
    icon: GlobeIcon,
    color: "#2EB67D" // Slack Green
  },
  {
    id: "translation",
    title: "AI Translation",
    description: "Speech is translated instantly with context-aware AI, delivered as live captions or audio.",
    icon: ChatIcon,
    color: "#ECB22E" // Slack Yellow
  }
];

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Japanese", "Korean", "Chinese",
  "Portuguese", "Italian", "Russian", "Dutch", "Arabic", "Hindi", "Turkish",
  "English", "Spanish", "French", "German", "Japanese", "Korean", "Chinese"
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);
  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Update active step based on scroll
  useMemo(() => scrollYProgress.on("change", (v) => {
    // Determine step based on scroll quadrants (0-0.25, 0.25-0.5, etc) with a small buffer?
    // Actually simplicity is best:
    const step = Math.min(Math.floor(v * 4), 3);
    setActiveStep(step);
  }), [scrollYProgress]);

  // Progress Bar Height for the left timeline
  const progressBarHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Background Blob Animations
  const blobTransition = {
    duration: 10,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut"
  };

  return (
    <section className="relative w-full bg-white font-sans text-[#1d1c1d]">

      {/* 1. The Interaction Container */}
      <div ref={containerRef} className="relative h-[400vh]">

        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          {/* 2. Background: Aurora Effect */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* Top Left Blob */}
            <motion.div
              className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[300px] opacity-60"
              style={{ backgroundColor: "#F6E8FF" }}
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={blobTransition}
            />
            {/* Center Blob */}
            <motion.div
              className="absolute top-[30%] left-[25%] w-[40vw] h-[40vw] rounded-full blur-[300px] opacity-50"
              style={{ backgroundColor: "#FFF9E5" }}
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{ ...blobTransition, delay: 2 }}
            />
            {/* Bottom Right Blob */}
            <motion.div
              className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[300px] opacity-60"
              style={{ backgroundColor: "#FFEDF2" }}
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{ ...blobTransition, delay: 4 }}
            />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 h-full items-center">

            {/* 3. Left Side: Narrative */}
            <div className="flex flex-col justify-center h-full relative">
              {/* Timeline Line */}
              <div className="absolute left-[23px] top-[15%] bottom-[15%] w-[2px] bg-black/5 hidden lg:block overflow-hidden rounded-full">
                <motion.div
                  className="w-full bg-[#4A154B]"
                  style={{ height: progressBarHeight }}
                />
              </div>

              <div className="space-y-24 py-20">
                {STEPS.map((step, index) => {
                  const isActive = index === activeStep;
                  return (
                    <motion.div
                      key={step.id}
                      className={`relative pl-0 lg:pl-16 transition-all duration-500 ${isActive ? "opacity-100 blur-0 scale-100" : "opacity-15 blur-[1px] scale-95"}`}
                    >
                      {/* Mobile Step Indicator (Desktop uses the line) */}
                      <div className="lg:absolute lg:left-0 lg:top-1 w-12 h-12 rounded-full border border-black/10 bg-white flex items-center justify-center font-bold text-lg mb-4 lg:mb-0 shadow-sm z-20 transition-colors duration-300"
                        style={{
                          borderColor: isActive ? step.color : 'rgba(0,0,0,0.1)',
                          color: isActive ? step.color : 'inherit'
                        }}>
                        {index + 1}
                      </div>

                      <h3 className="text-3xl font-bold mb-4 tracking-tight">{step.title}</h3>
                      <p className="text-lg text-[#616061] leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 4. Right Side: Morphing UI Window */}
            <div className="h-[500px] w-full flex items-center justify-center perspective-1000">
              <motion.div
                className="relative w-full max-w-[420px] h-[520px] bg-white rounded-[24px] shadow-2xl border border-[#E2E2E2] overflow-hidden flex flex-col"
                layout
                layoutId="morphing-window"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Fake UI Header */}
                <div className="h-10 border-b border-gray-100 flex items-center px-4 gap-2 bg-gray-50/50">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>

                {/* Content Area */}
                <div className="flex-1 relative p-8 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50/30">
                  <AnimatePresence mode="wait">

                    {/* STATE 1: AUDIO */}
                    {activeStep === 0 && (
                      <motion.div
                        key="audio"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center justify-center gap-1 h-32"
                      >
                        {[...Array(9)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-4 bg-[#4A154B] rounded-full"
                            animate={{
                              height: [30, 80, 40, 90, 30],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.1,
                              repeatType: "reverse"
                            }}
                          />
                        ))}
                      </motion.div>
                    )}

                    {/* STATE 2: QR CODE */}
                    {activeStep === 1 && (
                      <motion.div
                        key="qr"
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                        className="relative"
                      >
                        <div className="w-48 h-48 bg-white border-2 border-[#1d1c1d] rounded-2xl p-2 relative shadow-lg">
                          {/* Corner markers */}
                          <div className="absolute top-3 left-3 w-8 h-8 border-4 border-black rounded-lg" />
                          <div className="absolute top-3 right-3 w-8 h-8 border-4 border-black rounded-lg" />
                          <div className="absolute bottom-3 left-3 w-8 h-8 border-4 border-black rounded-lg" />

                          {/* Pixel Grid */}
                          <div className="grid grid-cols-6 gap-1 p-8 h-full">
                            {[...Array(36)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="bg-[#4A154B] rounded-sm"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: Math.random() > 0.3 ? 1 : 0.2, scale: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.01 }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STATE 3: LANGUAGE RAIN */}
                    {activeStep === 2 && (
                      <motion.div
                        key="language"
                        className="w-full h-full relative overflow-hidden mask-linear-fade"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="absolute inset-0 flex flex-col items-center">
                          <motion.div
                            className="w-16 h-16 bg-[#1d1c1d] rounded-full flex items-center justify-center text-white mb-6 z-10 shadow-xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <GlobeIcon />
                          </motion.div>

                          <div className="w-full relative h-[300px] overflow-hidden">
                            <div className="flex flex-col items-center gap-3">
                              {/* Infinite Scroll List copy 1 */}
                              <motion.div
                                className="flex flex-col items-center gap-3 w-full"
                                animate={{ y: [0, -400] }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                              >
                                {LANGUAGES.concat(LANGUAGES).map((lang, i) => (
                                  <div key={i} className="w-[80%] bg-white border border-gray-100 shadow-sm rounded-lg py-3 px-6 text-center font-medium text-gray-600">
                                    {lang}
                                  </div>
                                ))}
                              </motion.div>
                            </div>

                            {/* Gradient overlays to fade top/bottom */}
                            <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STATE 4: TRANSLATION & SPARKLES */}
                    {activeStep === 3 && (
                      <motion.div
                        key="translation"
                        className="relative w-full h-full flex flex-col justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {/* Floating Sparkles */}
                        <Sparkle style={{ position: 'absolute', top: '10%', right: '10%' }} delay={0} />
                        <Sparkle style={{ position: 'absolute', bottom: '20%', left: '5%' }} delay={0.5} />
                        <Sparkle style={{ position: 'absolute', top: '40%', right: '5%' }} delay={1.0} />

                        <div className="space-y-4">
                          <motion.div
                            className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 text-sm text-[#1d1c1d] max-w-[85%]"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <p>Welcome everyone! Today we&apos;ll discuss the Q4 global strategy.</p>
                          </motion.div>

                          <motion.div
                            className="self-end bg-[#4A154B] text-white rounded-2xl rounded-tr-sm p-4 text-sm max-w-[85%] shadow-lg"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <div className="flex items-center gap-2 mb-1 opacity-80 text-xs uppercase tracking-wide">
                              <span>Spanish</span>
                              <div className="w-1 h-1 bg-white rounded-full" />
                              <span>Live</span>
                            </div>
                            <p>¡Hola a todos! Hoy discutiremos la estrategia global para el cuarto trimestre.</p>
                          </motion.div>

                          <motion.div
                            className="self-end bg-[#4A154B] text-white rounded-2xl rounded-tr-sm p-4 text-sm max-w-[85%] shadow-lg opacity-90"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                          >
                            <div className="flex items-center gap-2 mb-1 opacity-80 text-xs uppercase tracking-wide">
                              <span>Japanese</span>
                              <div className="w-1 h-1 bg-white rounded-full" />
                              <span>Live</span>
                            </div>
                            <p>皆さん、こんにちは！今日は第4四半期のグローバル戦略について話し合います。</p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
