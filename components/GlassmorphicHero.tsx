"use client";

import { motion, AnimatePresence, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // Fluid Top Bounce & Elastic Parallax System (macOS/iOS rubber-banding + Windows/trackpad top-cushion)
  const { scrollY } = useScroll();
  const rawBounce = useMotionValue(0);

  // Heavily damped physics spring for organic, buttery return
  const springBounce = useSpring(rawBounce, {
    stiffness: 160,
    damping: 24,
    mass: 0.7,
  });

  useEffect(() => {
    let decayTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      // When at the very top of the page and scrolling upward
      if (window.scrollY <= 1 && e.deltaY < 0) {
        const current = rawBounce.get();
        // Logarithmic resistance curve (feels like stretching premium elastic material)
        const resistance = Math.max(0.12, 1 - current / 110);
        const next = Math.min(85, current + Math.abs(e.deltaY) * 0.22 * resistance);
        rawBounce.set(next);

        clearTimeout(decayTimer);
        decayTimer = setTimeout(() => {
          rawBounce.set(0);
        }, 50);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY <= 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY <= 1) {
        const delta = e.touches[0].clientY - touchStartY;
        if (delta > 0) {
          rawBounce.set(Math.min(95, delta * 0.32));
        }
      }
    };

    const handleTouchEnd = () => {
      rawBounce.set(0);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(decayTimer);
    };
  }, [rawBounce]);

  // Handle native negative scrollY on Safari/macOS rubber-banding
  const nativeOverscroll = useTransform(scrollY, (y) => (y < 0 ? Math.abs(y) : 0));
  
  // Unified displacement signal
  const totalBounce = useTransform(
    [springBounce, nativeOverscroll],
    ([synth, nat]: number[]) => Math.min(100, Math.max(synth, nat))
  );

  // Background expands elastically from top origin
  const bgScale = useTransform(totalBounce, [0, 100], [1, 1.06]);
  // Background parallax displacement
  const bgY = useTransform(
    [totalBounce, scrollY],
    ([bounce, y]: number[]) => (y >= 0 ? y * 0.16 : bounce * 0.45)
  );

  // Foreground headline & CTAs cushion down with gentle resistance
  const fgY = useTransform(totalBounce, [0, 100], [0, 18]);
  // LiveTranslationGraphic card cushions with deeper resistance for rich 3D depth
  const graphicY = useTransform(totalBounce, [0, 100], [0, 10]);

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
    <section className="relative min-h-screen bg-white md:bg-base-paper flex flex-col overflow-hidden">
      {/* Dot Grid Pattern with Elastic Parallax (hidden on mobile for clean white Wix canvas) */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none origin-top hidden md:block" 
        style={{ 
          backgroundImage: "radial-gradient(circle at center, #0B1220 1px, transparent 1px)", 
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)",
          scale: bgScale,
          y: bgY
        }} 
      />

      {/* Hero Aurora Background with Fluid Elastic Scale */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none origin-top"
        style={{ scale: bgScale, y: bgY }}
      >
        <HeroAuroraBackground />
      </motion.div>

      <motion.div 
        className="relative z-10 pt-[76px] sm:pt-[96px] md:pt-[120px] pb-6 sm:pb-8 flex flex-col items-center flex-shrink-0"
        style={{ y: fgY }}
      >
        <div className="layout-spine text-center flex flex-col items-center gap-3.5 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-12">

          {/* Headline Group */}
          <motion.div
            className="flex flex-col items-center gap-3 sm:gap-6 md:gap-8 max-w-[960px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {/* Top Banner with Subtle Live Status Indicator */}
            <motion.a
              href="/live"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-white border border-slate-200 text-[#1d1c1d] shadow-sm hover:shadow-md hover:bg-white/90 transition-all group hover:scale-[1.02] active:scale-[0.98] animate-in fade-in slide-in-from-top-2 duration-700 delay-200 fill-mode-both max-w-[92vw] sm:max-w-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">
                <span className="hidden sm:inline">Now Available — Live Video Translation for Global Congregations</span>
                <span className="sm:hidden">Now Available: Live Video Translation</span>
              </span>
              <span className="text-xs sm:text-sm text-base-muted mx-0.5 sm:mx-1 flex-shrink-0">·</span>
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0">Learn more</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <p
              className="text-lg sm:text-2xl md:text-3xl font-bold text-primary/80 leading-[1.15] tracking-tight flex flex-wrap justify-center gap-x-2 sm:gap-x-3 mb-1 sm:mb-2"
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
            <h1 className="text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-base-ink leading-[1.2] sm:leading-[1.15] tracking-tight text-center" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              Real-Time AI Translation for Churches and Live Events
            </h1>

            <p
              className="text-[13px] sm:text-base md:text-xl text-base-muted leading-relaxed max-w-[90vw] sm:max-w-[760px] mx-auto font-medium"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              Exbabel is a real-time church translation system for sermons, worship services, livestreams, conferences, and live events. Translate speech into natural AI audio and live captions so every listener can follow in their language from any device.
            </p>
          </motion.div>



          {/* Restored Classic Premium CTA Row */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200 fill-mode-both"
          >
            <Link
              href="/demo"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-base-ink text-white font-bold text-sm sm:text-lg hover:bg-base-ink/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg relative overflow-hidden group text-center"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
              Schedule a Consultation
            </Link>
            <a
              href="#pricing"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full text-[#1d1c1d] font-bold text-sm sm:text-lg bg-white border border-slate-200/90 sm:border-transparent shadow-sm sm:shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              <span className="hidden md:inline">Explore Capabilities</span>
              <span className="md:hidden">Get Started</span>
            </a>
          </motion.div>

          <motion.div
            className="w-full animate-in fade-in duration-1000 delay-500 fill-mode-both"
          >
            <TrustedPartners />
          </motion.div>
        </div>
      </motion.div>

      {/* Embedded LiveTranslationGraphic Animation */}
      <motion.div
        className="w-full flex-grow relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both"
        style={{ y: graphicY }}
      >
        <div className="mt-8 md:mt-12 border-t border-white/10 shadow-2xl">
          <LiveTranslationGraphic />
        </div>
      </motion.div>

    </section>
  );
}
