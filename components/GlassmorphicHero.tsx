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
    "Global executive summits.",
    "International delegations.",
    "Institutional excellence.",
    "Sovereign communications."
  ];
  const [flipIndex, setFlipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipIndex((prev) => (prev + 1) % flipWords.length);
    }, 3200);
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
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at center, #0B1220 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />

      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="showcase-blob absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[120px] opacity-40 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-purple)' }} />
        <div className="showcase-blob absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full filter blur-[120px] opacity-40 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-mint)' }} />
      </div>

      <div className="relative z-10 pt-[130px] pb-8 flex flex-col items-center flex-shrink-0">
        <div className="layout-spine text-center flex flex-col items-center gap-9">

          {/* Main Content Group */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-7 max-w-[980px] mx-auto"
          >
            {/* Royal Patronage & Executive Patron Crest Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#0B1220] text-white border border-[#C5A059]/40 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-widest text-[#E2C787] uppercase">
                EXECUTIVE PATRONAGE & INSTITUTIONAL ACCESS
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="sr-only">The Standard for Real-Time Multilingual Communication</h1>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1220] leading-[1.12] tracking-tight flex flex-wrap justify-center gap-x-3"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span>The Gold Standard for</span>
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
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -18, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="whitespace-nowrap"
                    >
                      {flipWords[flipIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </h2>

            {/* Sub-headline */}
            <p
              className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-[820px] mx-auto font-medium"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              Engineered for global leadership, executive summits, and international delegations. Exbabel delivers sub-second neural speech translation (~2.0s) and frame-accurate captioning with uncompromising confidentiality.
            </p>
          </motion.div>

          {/* Institutional Trust Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[900px] mx-auto"
          >
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm text-center space-y-1">
              <div className="text-[10px] font-bold font-mono tracking-widest text-[#394dfe] uppercase">GOVERNANCE</div>
              <div className="text-lg font-extrabold text-[#0B1220]">ISO/IEC 25010</div>
              <div className="text-[11px] text-slate-500 font-medium">Audited Performance Standard</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm text-center space-y-1">
              <div className="text-[10px] font-bold font-mono tracking-widest text-[#394dfe] uppercase">CAPTION ONSET</div>
              <div className="text-lg font-extrabold text-[#0B1220]">1.013s TTFC</div>
              <div className="text-[11px] text-slate-500 font-medium">Sub-Second Processing</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm text-center space-y-1">
              <div className="text-[10px] font-bold font-mono tracking-widest text-[#394dfe] uppercase">STREAM LATENCY</div>
              <div className="text-lg font-extrabold text-[#394dfe]">10.2× ADVANTAGE</div>
              <div className="text-[11px] text-slate-500 font-medium">Continuous Speech Benchmark</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm text-center space-y-1">
              <div className="text-[10px] font-bold font-mono tracking-widest text-emerald-600 uppercase">CONFIDENTIALITY</div>
              <div className="text-lg font-extrabold text-[#0B1220]">ZERO STORAGE</div>
              <div className="text-[11px] text-slate-500 font-medium">Ephemeral Memory Pipeline</div>
            </div>
          </motion.div>

          {/* Corporate Executive Access CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/demo"
              className="px-9 py-4 rounded-full bg-[#0B1220] hover:bg-[#0B1220]/90 text-white font-bold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg border border-[#C5A059]/40 relative overflow-hidden group"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
              Request Executive Access
            </Link>
            
            <Link
              href="/lab-test"
              className="px-9 py-4 rounded-full text-[#0B1220] font-bold text-base bg-white border border-slate-300 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span>View Institutional Audit Report</span>
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
