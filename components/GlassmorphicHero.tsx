"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { appRoutes } from "@/lib/config";
import LiveTranslationGraphic from "./LiveTranslationGraphic";
import TrustedPartners from "./TrustedPartners";

interface TranslationPair {
  english: string;
  spanish: string;
}

export default function GlassmorphicHero() {
  const [phase, setPhase] = useState<'listening' | 'transcribing' | 'complete'>('listening');
  const [transcript, setTranscript] = useState("");
  const [partialText, setPartialText] = useState("");
  const [spanishTranscript, setSpanishTranscript] = useState("");
  const [spanishPartialText, setSpanishPartialText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [translatedLines, setTranslatedLines] = useState<TranslationPair[]>([]);

  // Flipping Slogan Logic
  const flipWords = [
    "Reach everyone.",
    "Stream in real-time.",
    "Break language barriers.",
    "Connect globally."
  ];
  const [flipIndex, setFlipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipIndex((prev) => (prev + 1) % flipWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [flipWords.length]);

  const startTranscription = useCallback(() => {
    const lines = [
      {
        english: "When we walk through the fire, God is still faithful.",
        spanish: "Cuando caminamos por el fuego, Dios sigue siendo fiel."
      },
      {
        english: "Even when the storm surrounds us, His presence remains.",
        spanish: "Incluso cuando la tormenta nos rodea, Su presencia permanece."
      },
      {
        english: "Do not be afraid — your breakthrough is near.",
        spanish: "No tengas miedo: tu avance está cerca."
      }
    ];

    let lineIdx = 0;

    const processLine = () => {
      if (lineIdx >= lines.length) {
        lineIdx = 0;
        setTimeout(processLine, 1500);
        return;
      }

      const currentLine = lines[lineIdx];
      const englishWords = currentLine.english.split(" ");
      const spanishWords = currentLine.spanish.split(" ");
      let wordIdx = 0;

      const transcribeWords = () => {
        if (wordIdx < englishWords.length) {
          const currentEnglishWords = englishWords.slice(0, wordIdx + 1).join(" ");
          const nextEnglishWord = englishWords[wordIdx + 1];

          if (nextEnglishWord) {
            const partialLength = Math.min(3, Math.floor(nextEnglishWord.length / 2));
            setPartialText(currentEnglishWords + " " + nextEnglishWord.substring(0, partialLength) + "...");
          } else {
            setPartialText("");
          }

          setTranscript(currentEnglishWords);

          setTimeout(() => {
            if (wordIdx < spanishWords.length) {
              const currentSpanishWords = spanishWords.slice(0, wordIdx + 1).join(" ");
              const nextSpanishWord = spanishWords[wordIdx + 1];

              if (nextSpanishWord) {
                const partialLength = Math.min(3, Math.floor(nextSpanishWord.length / 2));
                setSpanishPartialText(currentSpanishWords + " " + nextSpanishWord.substring(0, partialLength) + "...");
              } else {
                setSpanishPartialText("");
              }

              setSpanishTranscript(currentSpanishWords);
            }
          }, 300);

          wordIdx++;
          setTimeout(transcribeWords, 220);
        } else {
          setTimeout(() => {
            lineIdx++;
            setTranscript("");
            setPartialText("");
            setSpanishTranscript("");
            setSpanishPartialText("");
            setTimeout(processLine, 800);
          }, 600);
        }
      };

      transcribeWords();
    };

    processLine();
  }, []);

  useEffect(() => {
    const listeningTimer = setTimeout(() => {
      setPhase('transcribing');
      startTranscription();
    }, 1500);

    return () => clearTimeout(listeningTimer);
  }, [startTranscription]);

  return (
    <section className="relative min-h-screen bg-base-paper flex flex-col">
      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at center, #0B1220 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />

      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="showcase-blob absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[80px] md:blur-[160px] opacity-60 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-pink)' }} />
        <div className="showcase-blob absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[80px] md:blur-[160px] opacity-60 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-purple)', animationDelay: '4s' }} />
        <div className="showcase-blob absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full filter blur-[80px] md:blur-[160px] opacity-60 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-yellow)', animationDelay: '8s' }} />
        <div className="showcase-blob absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full filter blur-[70px] md:blur-[140px] opacity-60 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-mint)', animationDelay: '12s' }} />
      </div>

      <div className="relative z-10 pt-[120px] pb-8 flex flex-col items-center flex-shrink-0">
        <div className="layout-spine text-center flex flex-col items-center gap-8">

          {/* Headline Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8 max-w-[980px] mx-auto"
          >
            {/* Status Symbol Badge Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-2.5"
            >
              {/* Status Symbol 1: Live Engine */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 shadow-sm text-xs font-bold font-mono">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>STATUS: ENGINE ONLINE</span>
              </div>

              {/* Status Symbol 2: Latency Benchmark */}
              <Link
                href="/lab-test"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary shadow-sm text-xs font-bold font-mono hover:bg-primary/20 transition-all"
              >
                <span>⚡ 10.2× CONTINUOUS SPEECH ADVANTAGE</span>
              </Link>

              {/* Status Symbol 3: ISO/IEEE Verified */}
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold font-mono hidden sm:inline-flex">
                <span>🛡️ IEEE 829 & ISO 25010 AUDITED</span>
              </span>
            </motion.div>

            <h1 className="sr-only">Speak once. Break language barriers.</h1>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-base-ink leading-[1.15] tracking-tight flex flex-wrap justify-center gap-x-3"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span>Speak once.</span>
              <span className="text-primary inline-grid text-left">
                {flipWords.map((word, index) => (
                  <span key={index} className="col-start-1 row-start-1 invisible pointer-events-none select-none whitespace-nowrap" aria-hidden="true">
                    {word}
                  </span>
                ))}
                
                <span className="col-start-1 row-start-1 flex justify-start">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={flipIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="whitespace-nowrap"
                    >
                      {flipWords[flipIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </h2>

            <p
              className="text-lg md:text-xl text-base-muted leading-relaxed max-w-[800px] mx-auto font-medium"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              The zero-latency translation platform engineered for continuous speech. Delivering live streaming audio (~2.0s) and captions (~1.0s) in 100+ languages—up to 30× faster than traditional sentence buffering.
            </p>
          </motion.div>

          {/* Status Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-[840px] mx-auto"
          >
            <div className="bg-white p-3.5 rounded-2xl border border-[#EAD6FF]/80 shadow-sm text-center space-y-1">
              <div className="text-[10px] font-bold font-mono tracking-widest text-[#394dfe] uppercase">STATUS: TTFC</div>
              <div className="text-xl font-extrabold text-[#0B1220]">1.013s</div>
              <div className="text-[11px] text-slate-500 font-medium">First Caption Onset</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-[#EAD6FF]/80 shadow-sm text-center space-y-1">
              <div className="text-[10px] font-bold font-mono tracking-widest text-[#394dfe] uppercase">STATUS: TTFS</div>
              <div className="text-xl font-extrabold text-[#0B1220]">2.027s</div>
              <div className="text-[11px] text-slate-500 font-medium">Audio Playback Stream</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-[#EAD6FF]/80 shadow-sm text-center space-y-1">
              <div className="text-[10px] font-bold font-mono tracking-widest text-[#394dfe] uppercase">BENCHMARK</div>
              <div className="text-xl font-extrabold text-[#394dfe]">10.2×</div>
              <div className="text-[11px] text-slate-500 font-medium">Continuous Advantage</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-[#EAD6FF]/80 shadow-sm text-center space-y-1">
              <div className="text-[10px] font-bold font-mono tracking-widest text-emerald-600 uppercase">PROTOCOL</div>
              <div className="text-xl font-extrabold text-[#0B1220]">ISO 25010</div>
              <div className="text-[11px] text-slate-500 font-medium">Empirical Audit Passed</div>
            </div>
          </motion.div>

          {/* Premium CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/demo"
              className="px-8 py-4 rounded-full bg-base-ink text-white font-bold text-lg hover:bg-base-ink/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg relative overflow-hidden group"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
              Book a live demo
            </Link>
            
            <Link
              href="/lab-test"
              className="px-8 py-4 rounded-full text-[#394dfe] font-bold text-lg bg-white border border-[#394dfe]/30 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span>View Lab Benchmarks</span>
              <span>→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full"
          >
            <TrustedPartners />
          </motion.div>
        </div>
      </div>

      {/* Embedded LiveTranslationGraphic Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex-grow relative"
      >
        <div className="mt-8 md:mt-12 border-t border-white/10 shadow-2xl">
          <LiveTranslationGraphic />
        </div>
      </motion.div>

    </section>
  );
}
