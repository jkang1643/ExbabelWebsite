"use client";

import { motion, AnimatePresence } from "framer-motion";
import HeroAuroraBackground from "./HeroAuroraBackground";
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
    <section className="relative min-h-screen bg-base-paper flex flex-col">
      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at center, #0B1220 1px, transparent 1px)", 
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)"
        }} 
      />

      <HeroAuroraBackground />

      <div className="relative z-10 pt-[120px] pb-8 flex flex-col items-center flex-shrink-0">
        <div className="layout-spine text-center flex flex-col items-center gap-8">

          {/* Headline Group */}
          <motion.div
            className="flex flex-col items-center gap-8 max-w-[960px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {/* Top Banner with Subtle Live Status Indicator */}
            <motion.a
              href="/live"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 text-[#1d1c1d] shadow-sm hover:shadow-md hover:bg-white/90 transition-all group hover:scale-[1.02] active:scale-[0.98] animate-in fade-in slide-in-from-top-2 duration-700 delay-200 fill-mode-both"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="text-sm font-semibold tracking-tight">Now Available — Live Video Translation for Global Congregations</span>
              <span className="text-sm text-base-muted mx-1">·</span>
              <span className="text-sm font-medium">Learn more</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <p
              className="text-2xl md:text-3xl font-bold text-primary/80 leading-[1.15] tracking-tight flex flex-wrap justify-center gap-x-3 mb-2"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span className="text-base-ink/80">Every voice.</span>
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
                      initial={{ y: 20, }}
                      animate={{ y: 0, }}
                      exit={{ y: -20, }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="whitespace-nowrap"
                    >
                      {flipWords[flipIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-base-ink leading-[1.15] tracking-tight text-center" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              Real-Time AI Translation for Churches and Live Events
            </h1>

            <p
              className="text-lg md:text-xl text-base-muted leading-relaxed max-w-[760px] mx-auto font-medium"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              Exbabel is a real-time church translation system for sermons, worship services, livestreams, conferences, and live events. Translate speech into natural AI audio and live captions so every listener can follow in their language from any device.
            </p>
          </motion.div>



          {/* Restored Classic Premium CTA Row */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200 fill-mode-both"
          >
            <Link
              href="/demo"
              className="px-8 py-4 rounded-full bg-base-ink text-white font-bold text-lg hover:bg-base-ink/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg relative overflow-hidden group"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
              Schedule a Consultation
            </Link>
            <a
              href="#pricing"
              className="px-8 py-4 rounded-full text-[#1d1c1d] font-bold text-lg bg-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              Explore Capabilities
            </a>
          </motion.div>

          <motion.div
            className="w-full animate-in fade-in duration-1000 delay-500 fill-mode-both"
          >
            <TrustedPartners />
          </motion.div>
        </div>
      </div>

      {/* Embedded LiveTranslationGraphic Animation */}
      <motion.div
        className="w-full flex-grow relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both"
      >
        <div className="mt-8 md:mt-12 border-t border-white/10 shadow-2xl">
          <LiveTranslationGraphic />
        </div>
      </motion.div>

    </section>
  );
}
