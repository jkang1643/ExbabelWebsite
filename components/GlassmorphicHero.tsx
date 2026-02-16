"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { appRoutes } from "@/lib/config";

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
    <section className="relative min-h-screen overflow-hidden bg-[#F8F9FA]">
      {/* Slack-style "Aurora" Background with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Pink Blob */}
        <div className="showcase-blob absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFD6E5] rounded-full mix-blend-multiply filter blur-[60px] md:blur-[120px] opacity-70" />

        {/* Light Purple Blob */}
        <div className="showcase-blob absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#EAD6FF] rounded-full mix-blend-multiply filter blur-[60px] md:blur-[120px] opacity-70"
          style={{ animationDelay: '4s' }} />

        {/* Pale Yellow Blob */}
        <div className="showcase-blob absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-[#FFF7D1] rounded-full mix-blend-multiply filter blur-[60px] md:blur-[120px] opacity-70"
          style={{ animationDelay: '8s' }} />

        {/* Subtle Blue/Mint Blob */}
        <div className="showcase-blob absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] bg-[#D6F5FF] rounded-full mix-blend-multiply filter blur-[50px] md:blur-[100px] opacity-70"
          style={{ animationDelay: '12s' }} />
      </div>

      {/* Subtle Sparkles (Static for now, can be animated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[15%] text-indigo-200 text-2xl transform rotate-12">✦</div>
        <div className="absolute top-[30%] right-[20%] text-purple-200 text-xl transform -rotate-12">✦</div>
        <div className="absolute bottom-[40%] left-[10%] text-pink-200 text-3xl">✦</div>
      </div>

      {/* Curved Separator at Bottom */}
      <div className="absolute bottom-0 left-[-50%] w-[200%] h-[120px] bg-white rounded-t-[100%] z-0 pointer-events-none" />

      <div className="relative z-10 pt-24 pb-24 md:pt-32 md:pb-32 flex flex-col items-center">
        {/* Centered Content Spine */}
        <div className="layout-spine text-center space-y-8">

          {/* Headline Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-[840px]"
          >
            {/* Tagline Banner */}
            <motion.a
              href="#impact-stats"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 text-primary hover:border-primary/40 transition-all group shadow-sm hover:shadow-md"
            >
              <span className="text-sm font-semibold">Trusted by churches and teams worldwide</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <h1
              className="text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-base-content leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              Give your church
              <span className="block text-primary mt-2">one voice</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-base-content/80 leading-relaxed max-w-[640px] mx-auto font-medium"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              Break down language barriers with real-time AI translation that understands context, culture, and nuance.
            </p>
          </motion.div>

          {/* CTA Row - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <a
              href={appRoutes.demo}
              className="px-10 py-4 rounded-md bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              Try for Free
            </a>
            <a
              href="#how-it-works"
              className="px-10 py-4 rounded-md text-primary font-bold text-lg bg-white border-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
              style={{ fontFamily: 'var(--font-sora), sans-serif' }}
            >
              How it works
            </a>
          </motion.div>

          {/* Demo Container - Stacked Below */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[800px] mt-16 md:mt-24 relative min-h-[600px] md:min-h-[700px]"
          >
            {/* Main Glass Card - Live Translation Console */}
            <div
              className="relative rounded-3xl p-6 md:p-8 bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] border-0 backdrop-blur-sm ring-1 ring-gray-900/5"
            >
              {/* Subtle inner glow for depth */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white via-transparent to-gray-50/20 pointer-events-none"></div>

              {/* Header with LIVE Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full text-xs font-bold tracking-wide uppercase shadow-[0_4px_14px_0_rgba(59,130,246,0.4)] border-0">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg" />
                  Live Translation
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-0 flex items-center justify-center text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.3)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </div>
                  <span>Recording in progress...</span>
                </div>
              </div>

              {/* Live Transcription Area - Vertical Layout */}
              <div className="space-y-8 text-left relative z-10">

                {/* Source Input */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200/50 shadow-sm">EN</span>
                    <h3 className="text-sm font-bold text-slate-900">Live Transcription</h3>
                  </div>
                  <div className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-50/50 border-0 rounded-2xl p-6 h-[100px] flex items-start text-lg md:text-xl text-slate-900 font-medium shadow-[0_8px_30px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-slate-900/5 overflow-hidden">
                    <div className="w-full">
                      {transcript || <span className="text-slate-400 italic">Listening for speech...</span>}
                      {partialText && <span className="text-slate-400">{partialText.substring(transcript.length)}</span>}
                    </div>
                  </div>
                </div>

                {/* Target Output */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-200/50 shadow-sm">ES</span>
                    <h3 className="text-sm font-bold text-slate-900">Live Translation</h3>
                  </div>
                  <div className="w-full bg-white border-0 rounded-2xl p-6 h-[100px] flex items-start text-lg md:text-xl text-slate-900 font-medium shadow-[0_12px_40px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5 overflow-hidden">
                    <div className="w-full">
                      {spanishTranscript || <span className="text-slate-400 italic">Translation will appear here...</span>}
                      {spanishPartialText && <span className="opacity-50 text-slate-400">{spanishPartialText.substring(spanishTranscript.length)}</span>}
                    </div>
                  </div>
                </div>

                {/* Translation History */}
                <div className="space-y-3 pt-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-green-600">ES</span>
                    <h3 className="text-sm font-bold text-slate-800">Translation History</h3>
                  </div>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {translatedLines.length === 0 && (
                      <div className="text-slate-400 text-sm italic p-2">History will appear here...</div>
                    )}
                    {[...translatedLines].reverse().map((pair, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white border-0 rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.16),0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 ring-1 ring-slate-900/5 hover:ring-slate-900/10"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/50 shadow-sm">
                            EN <span className="text-slate-400">→</span> ES
                          </div>
                          <svg className="w-4 h-4 text-green-500 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-slate-500 mb-2 text-sm leading-relaxed">{pair.english}</p>
                        <p className="text-slate-900 font-bold text-lg leading-snug">{pair.spanish}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Decorative blobbies behind the card */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl -z-10 mix-blend-multiply" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -z-10 mix-blend-multiply" />

          </motion.div>

        </div>
      </div>
    </section>
  );
}
