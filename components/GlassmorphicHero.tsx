"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import LiveTranslationGraphic from "./LiveTranslationGraphic";
import TrustedPartners from "./TrustedPartners";
import EsotericWallpaper from "./EsotericWallpaper";

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

  // Rotating Text Slogans
  const flipWords = [
    "Every language.",
    "One service.",
    "Understood.",
    "Connected."
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
    <section className="relative min-h-screen bg-[#050810] flex flex-col overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────
          ESOTERIC FRACTAL BACKGROUND
      ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep Velvet & Indigo Auroras */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full filter blur-[120px] md:blur-[180px] opacity-40 mix-blend-screen" style={{ backgroundColor: '#4F46E5' }} />
        <div className="absolute top-[10%] right-[-20%] w-[50vw] h-[50vw] rounded-full filter blur-[120px] md:blur-[180px] opacity-30 mix-blend-screen" style={{ backgroundColor: '#7C3AED' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[70vw] h-[70vw] rounded-full filter blur-[140px] md:blur-[200px] opacity-20 mix-blend-screen" style={{ backgroundColor: '#F59E0B' }} />

        {/* Animated React Component with Drop-Shadow Glow Effects */}
        <EsotericWallpaper />
      </div>

      <div className="relative z-10 pt-[120px] pb-8 flex flex-col items-center flex-shrink-0">
        <div className="layout-spine text-center flex flex-col items-center gap-8">

          {/* Headline Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8 max-w-[960px] mx-auto"
          >
            {/* Top Banner with Subtle Live Status Indicator */}
            <motion.a
              href="/live"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900/60 border border-slate-700/60 backdrop-blur-md text-indigo-200 shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:bg-slate-800/80 transition-all group hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,1)]"></span>
              <span className="text-sm font-semibold tracking-tight">Now Available — Live Video Translation for Global Congregations</span>
              <span className="text-sm text-slate-500 mx-1">·</span>
              <span className="text-sm font-medium text-amber-300">Learn more</span>
              <svg className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <h1 className="sr-only">Every voice. Every language. One service.</h1>
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.15] tracking-tight flex flex-col md:flex-row flex-wrap items-center justify-center gap-x-3 drop-shadow-xl text-center"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span>Every voice.</span>
              <span className="text-amber-400 inline-grid text-center drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                {flipWords.map((word, index) => (
                  <span key={index} className="col-start-1 row-start-1 invisible pointer-events-none select-none whitespace-nowrap" aria-hidden="true">
                    {word}
                  </span>
                ))}
                
                <span className="col-start-1 row-start-1 flex justify-center">
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
              className="text-lg md:text-xl text-indigo-100/80 leading-relaxed max-w-[760px] mx-auto font-medium drop-shadow-md"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              The real-time AI translation platform trusted by churches and institutions worldwide to deliver live speech, captions, and audio — simultaneously, in over 100 languages.
            </p>
          </motion.div>



          {/* Premium Esoteric CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/demo"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-lg hover:from-amber-400 hover:to-yellow-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(245,158,11,0.4)] relative overflow-hidden group border border-amber-300/50"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
              Schedule a Consultation
            </Link>
            <a
              href="#pricing"
              className="px-8 py-4 rounded-full text-indigo-200 font-bold text-lg bg-slate-900/50 border border-indigo-500/30 backdrop-blur-md shadow-lg hover:bg-slate-800/80 hover:border-indigo-400/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              Explore Capabilities
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full filter invert-[0.8] brightness-[2] sepia-[0.2] hue-rotate-[180deg]" // Adjusted to make partners look good on dark
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
        <div className="mt-8 md:mt-12 border-t border-indigo-900/30 shadow-[0_-20px_60px_rgba(79,70,229,0.1)]">
          <LiveTranslationGraphic />
        </div>
      </motion.div>

    </section>
  );
}
