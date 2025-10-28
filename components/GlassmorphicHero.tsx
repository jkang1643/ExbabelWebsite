"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

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

  const startTranscription = useCallback(() => {
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
    <section className="relative min-h-screen overflow-hidden">
      {/* Hero gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-hero-light to-hero-light" />
      
      {/* Ethereal vignette - positioned more dramatically */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.6),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(165,180,252,0.3),transparent_60%)]" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-secondary/20 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* Light shafts - more dramatic */}
      <div className="absolute top-0 right-1/3 w-2 h-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent opacity-30" />
      <div className="absolute top-0 right-2/3 w-1 h-full bg-gradient-to-b from-secondary/8 via-secondary/4 to-transparent opacity-40" />

      {/* Micro-grain texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4.5\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 min-h-screen flex flex-col justify-center py-32">
        {/* 1/3 - 2/3 Layout */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-center max-w-[1400px] mx-auto w-full">
          {/* Left: Hero Content (1/3) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral leading-[1.15]"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              The most{" "}
              <span className="bg-gradient-to-r from-info to-success bg-clip-text text-transparent">
                advanced
              </span>
              {" "}AI-powered{" "}
              <span className="bg-gradient-to-r from-warning to-error bg-clip-text text-transparent">
                translation
              </span>
              {" "}and{" "}
              <span className="bg-gradient-to-r from-success to-info bg-clip-text text-transparent">
                worship
              </span>
              {" "}technology{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-error via-warning to-success bg-clip-text text-transparent">
                  platform
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-info to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-neutral/70 leading-relaxed"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Break down language barriers with real-time AI translation that understands context, culture, and nuance. Empower your worship services globally.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                className="group relative px-8 py-4 bg-primary rounded-[20px] text-white font-bold text-base overflow-hidden"
                style={{ 
                  fontFamily: 'var(--font-sora), sans-serif',
                  boxShadow: '0 6px 24px rgba(30,58,138,0.5), 0 1px 4px rgba(59,91,219,0.12), 0 0 0 2px rgba(210,230,230,0.06)'
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 8px 30px rgba(59,130,246,0.38), 0 2px 8px rgba(59,91,219,0.2), 0 0 0 2px rgba(210,230,230,0.12)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Try Live Demo</span>
                <div className="absolute inset-0 bg-gradient-to-b from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                className="px-8 py-4 rounded-[20px] text-neutral font-semibold text-base border-2 border-primary/20"
                style={{ 
                  fontFamily: 'var(--font-sora), sans-serif',
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{ 
                  scale: 1.02,
                  background: 'rgba(255,255,255,0.8)',
                  borderColor: 'rgba(var(--color-primary), 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Live Translation Demo (2/3) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full"
          >
            {/* Main Glass Card - Live Translation Console */}
            <div 
              className="relative rounded-[28px] p-6 md:p-8"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(165,180,252,0.3)',
                boxShadow: '0 8px 32px rgba(59,130,246,0.15), 0 2px 8px rgba(99,102,241,0.1)',
              }}
            >
              {/* Header with LIVE Badge */}
              <div className="flex justify-between items-center mb-3">
                <motion.div 
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20"
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(99,102,241,0.2)',
                      '0 0 0 6px rgba(99,102,241,0)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="flex items-center gap-1.5" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                    <motion.span 
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-primary font-bold text-xs">LIVE TRANSLATION</span>
                  </span>
                </motion.div>

                {/* Real-time indicator bars */}
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-6 bg-primary/60 rounded-full"
                      animate={{ 
                        height: phase === 'transcribing' ? [6, 24, 6] : 6,
                        opacity: phase === 'transcribing' ? [0.4, 1, 0.4] : 0.4,
                      }}
                      transition={{ 
                        duration: 1.2,
                        repeat: phase === 'transcribing' ? Infinity : 0,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Microphone Icon & Status */}
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                  animate={phase === 'listening' || phase === 'transcribing' ? {
                    boxShadow: [
                      '0 0 0 0 rgba(99,102,241,0.4)',
                      '0 0 0 10px rgba(99,102,241,0)',
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </motion.div>
                <motion.p 
                  className="text-[11px] font-semibold text-primary/80"
                  style={{ fontFamily: 'var(--font-sora), sans-serif' }}
                  key={phase}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {phase === 'listening' && "Listening... Detecting speech input..."}
                  {phase === 'transcribing' && "Recording in progress..."}
                  {phase === 'complete' && "Translation Complete ✓"}
                </motion.p>
              </div>

              {/* Live Transcription Area */}
              <div className="mb-3">
                <label className="block text-neutral/70 text-xs font-semibold mb-1.5 flex items-center gap-2" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-[10px] text-primary">
                    EN
                  </div>
                  Live Transcription
                </label>
                <motion.div 
                  className="rounded-[16px] p-3 bg-gradient-to-br from-white/[0.6] to-white/[0.4] border border-primary/15 h-[3.5rem] flex items-center overflow-hidden"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  <p className="text-neutral text-sm leading-tight line-clamp-2" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                    {transcript}
                    {partialText && (
                      <span className="text-neutral/40 italic">
                        {partialText.substring(transcript.length)}
                      </span>
                    )}
                    {(phase === 'listening' || (phase === 'transcribing' && !transcript)) && (
                      <motion.span
                        className="inline-block w-0.5 h-4 bg-primary ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </p>
                </motion.div>
              </div>

              {/* Live Spanish Translation */}
              <div className="mb-3">
                <label className="block text-neutral/70 text-xs font-semibold mb-1.5 flex items-center gap-2" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-success/30 to-info/30 flex items-center justify-center text-[10px] text-success">
                    ES
                  </div>
                  Live Translation
                </label>
                <motion.div 
                  className="rounded-[16px] p-3 bg-gradient-to-br from-white/[0.6] to-white/[0.4] border border-success/15 h-[3.5rem] flex items-center overflow-hidden"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  <p className="text-neutral text-sm leading-tight line-clamp-2" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                    {spanishTranscript}
                    {spanishPartialText && (
                      <span className="text-neutral/40 italic">
                        {spanishPartialText.substring(spanishTranscript.length)}
                      </span>
                    )}
                    {(phase === 'listening' || (phase === 'transcribing' && !spanishTranscript)) && (
                      <motion.span
                        className="inline-block w-0.5 h-4 bg-success ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </p>
                </motion.div>
              </div>

              {/* Translation History */}
              <div>
                <label className="block text-neutral/70 text-xs font-semibold mb-1.5 flex items-center gap-2" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-success/30 to-info/30 flex items-center justify-center text-[10px] text-success">
                    ES
                  </div>
                  Translation History
                </label>
                <div className="space-y-2 h-[8rem] overflow-y-auto">
                  <AnimatePresence>
                    {translatedLines.map((pair, index) => (
                <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-[12px] p-2.5 bg-gradient-to-br from-white/[0.6] to-white/[0.4] border border-success/20"
                  style={{ backdropFilter: 'blur(8px)' }}
                      >
                        <div className="flex items-start gap-1.5 mb-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">EN → ES</span>
                          <span className="text-success text-xs">✓</span>
                        </div>
                        <p className="text-neutral/70 text-xs mb-1 leading-tight line-clamp-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                          {pair.english}
                        </p>
                    <motion.p 
                          className="text-neutral text-xs font-medium leading-tight line-clamp-1"
                      style={{ fontFamily: 'var(--font-sora), sans-serif' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          {pair.spanish}
                    </motion.p>
                </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {translatedLines.length === 0 && (
                    <div className="rounded-[12px] p-3 bg-gradient-to-br from-white/[0.4] to-white/[0.3] border border-primary/10 text-center h-[8rem] flex items-center justify-center">
                      <p className="text-neutral/40 text-xs italic" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                        Translations will appear here...
                      </p>
                    </div>
                  )}
                    </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1.5, duration: 0.5 }, y: { duration: 2, repeat: Infinity } }}
        >
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1 h-2 bg-primary/50 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

