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
  // un-used state below can be kept for future or removed, keeping for safety
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [translatedLines, setTranslatedLines] = useState<TranslationPair[]>([]);

  // Flipping Slogan Logic
  const flipWords = [
    "Be understood.",
    "Reach everyone.",
    "Connect globally.",
    "Break barriers."
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
        // Loop back to the beginning
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

          // Show partial of next English word
          if (nextEnglishWord) {
            const partialLength = Math.min(3, Math.floor(nextEnglishWord.length / 2));
            setPartialText(currentEnglishWords + " " + nextEnglishWord.substring(0, partialLength) + "...");
          } else {
            setPartialText("");
          }

          setTranscript(currentEnglishWords);

          // Spanish transcription with 0.3s delay
          setTimeout(() => {
            if (wordIdx < spanishWords.length) {
              const currentSpanishWords = spanishWords.slice(0, wordIdx + 1).join(" ");
              const nextSpanishWord = spanishWords[wordIdx + 1];

              // Show partial of next Spanish word
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

          setTimeout(transcribeWords, 120);
        } else {
          // Line complete, trigger translation
          setPartialText("");
          setSpanishPartialText("");
          setTimeout(() => {
            setTranslatedLines(prev => [...prev, currentLine]);
            setTranscript("");
            setSpanishTranscript("");
            lineIdx++;
            setTimeout(processLine, 800);
          }, 600);
        }
      };

      transcribeWords();
    };

    processLine();
  }, []);

  useEffect(() => {
    // Initial listening phase
    const listeningTimer = setTimeout(() => {
      setPhase('transcribing');
      startTranscription();
    }, 1500);

    return () => clearTimeout(listeningTimer);
  }, [startTranscription]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-base-paper flex flex-col">
      
      {/* Dot Grid Pattern - Modern SaaS look */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at center, #0B1220 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />

      {/* Slack-style "Aurora" Background with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Pink Blob */}
        <div className="showcase-blob absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[80px] md:blur-[160px] opacity-60" style={{ backgroundColor: 'var(--color-aurora-pink)' }} />

        {/* Light Purple Blob */}
        <div className="showcase-blob absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[80px] md:blur-[160px] opacity-60"
          style={{ backgroundColor: 'var(--color-aurora-purple)', animationDelay: '4s' }} />

        {/* Pale Yellow Blob */}
        <div className="showcase-blob absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full filter blur-[80px] md:blur-[160px] opacity-60"
          style={{ backgroundColor: 'var(--color-aurora-yellow)', animationDelay: '8s' }} />

        {/* Subtle Blue/Mint Blob */}
        <div className="showcase-blob absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full filter blur-[70px] md:blur-[140px] opacity-60"
          style={{ backgroundColor: 'var(--color-aurora-mint)', animationDelay: '12s' }} />
      </div>

      <div className="relative z-10 pt-24 pb-8 md:pt-28 flex flex-col items-center flex-shrink-0">
        {/* Centered Content Spine */}
        <div className="layout-spine text-center space-y-6">

          {/* Headline Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-[960px] mx-auto"
          >
            {/* Upscale Glassmorphic Banner */}
            <motion.a
              href="/live"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] text-base-ink hover:bg-white/70 transition-all group hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-bold tracking-tight">Introducing Exbabel Live Video Translation</span>
              <span className="text-sm text-base-muted mx-1">•</span>
              <span className="text-sm font-medium">Learn more</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <h1 className="sr-only">Speak once. Break language barriers.</h1>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-base-ink leading-[1.15] tracking-tight flex flex-wrap justify-center gap-x-3"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span>Speak once.</span>
              <span className="text-primary inline-grid text-left">
                {/* Invisible widest words to hold the layout width constant */}
                {flipWords.map((word, index) => (
                  <span key={index} className="col-start-1 row-start-1 invisible pointer-events-none select-none whitespace-nowrap" aria-hidden="true">
                    {word}
                  </span>
                ))}
                
                {/* The actual animated word */}
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
              className="text-lg md:text-xl text-base-muted leading-relaxed max-w-[760px] mx-auto font-medium"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              The complete church translation platform for multilingual congregations. Live captions, audio translation, video translation, and AI-powered interpretation built specifically for ministry.
            </p>
          </motion.div>

          {/* Premium CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2"
          >
            <Link
              href="/demo"
              className="px-8 py-4 rounded-md bg-base-ink text-white font-bold text-lg hover:bg-base-ink/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm relative overflow-hidden group"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
              Book a demo
            </Link>
            <a
              href="#pricing"
              className="px-8 py-4 rounded-md text-base-ink font-bold text-lg bg-white border border-base-ink/20 shadow-sm hover:border-base-ink/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              Find your plan &rarr;
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-8 pb-0 w-full"
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
        <div className="mt-4 md:mt-6 border-t border-white/10 shadow-2xl">
          <LiveTranslationGraphic />
        </div>
      </motion.div>

    </section>
  );
}
