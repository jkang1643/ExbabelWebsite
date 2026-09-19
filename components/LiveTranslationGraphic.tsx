"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveTranslationGraphic() {
  const targetText = "Me alegra muchísimo que vengas a nuestra iglesia, y que nos escuches por primera vez.";
  const [visibleChars, setVisibleChars] = useState(0);

  // Video playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Background transcription typewriter effect (clean cycle, paused when video is active)
  useEffect(() => {
    if (isPlaying) return;

    let currentChars = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startTyping = () => {
      currentChars = 0;
      setVisibleChars(0);
      intervalId = setInterval(() => {
        if (currentChars < targetText.length) {
          currentChars += Math.floor(Math.random() * 2) + 1;
          if (currentChars > targetText.length) currentChars = targetText.length;
          setVisibleChars(currentChars);
        } else {
          if (intervalId) clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            startTyping();
          }, 4000);
        }
      }, 45);
    };

    startTyping();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  // Handle keyboard shortcuts (Escape to close video)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPlaying) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsPaused(false);

    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }

    if (videoRef.current) {
      if (videoRef.current.currentTime !== 0) {
        videoRef.current.currentTime = 0;
      }
      videoRef.current.muted = isMuted;
      // Direct invocation within click event maintains synchronous user gesture permissions
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay with audio restricted, falling back to muted:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const togglePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPaused(false)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // High-performance direct DOM update without triggering React re-renders
  const handleTimeUpdate = () => {
    if (!videoRef.current || !progressBarRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration) {
      const pct = (currentTime / duration) * 100;
      progressBarRef.current.style.width = `${pct}%`;
    }
  };

  const visibleText = targetText.substring(0, visibleChars);

  return (
    <div className="w-full flex items-center justify-center pb-8 sm:pb-12 md:pb-20 px-3 sm:px-6 md:px-8 overflow-hidden">
      
      {/* Contained Tech Graphic Card (Resized on mobile like Wix card layout) */}
      <div className="relative w-full max-w-[1100px] h-[250px] sm:h-[340px] md:h-[450px] bg-[#1a1a2e] rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] shadow-[0_24px_50px_rgba(0,0,0,0.3)] flex items-center border border-white/10 overflow-hidden sm:overflow-visible">
        
        {/* Background Image (Desaturated Pastor) */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-[2rem] md:rounded-[3rem]">
          <motion.img 
            src="/photos/pastor-showcase.webp" 
            alt="Pastor Preaching"
            className={`w-full h-full object-cover object-top grayscale mix-blend-luminosity transition-opacity duration-700 ${isPlaying ? 'opacity-0' : 'opacity-60'}`}
            animate={{ scale: isPlaying ? 1.15 : [1.15, 1.18, 1.15] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            fetchPriority="high"
          />
          {/* Tech Gradient Overlay (Red/Orange glow on the right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1a2e]/60 to-[#e11d48]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-80" />
        </div>

        {/* Concentric Tech Waves (Audio/Radio waves) */}
        <div className={`absolute right-0 sm:right-4 md:right-[10%] top-1/2 -translate-y-1/2 w-[134px] h-[291px] sm:w-[166px] sm:h-[360px] md:w-[221px] md:h-[480px] lg:w-[254px] lg:h-[550px] flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="absolute w-[800px] h-[800px] flex items-center justify-center opacity-25 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 800" fill="none">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={i}
                  cx="400"
                  cy="400"
                  r="50"
                  stroke="white"
                  strokeWidth="1.5"
                  animate={{
                    r: isPlaying ? 50 : [50, 450],
                    opacity: isPlaying ? 0 : [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 1
                  }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Pink/Red Play Button (Bottom Left, contained cleanly on mobile) */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-3 left-3 sm:-bottom-6 sm:-left-6 md:-bottom-8 md:-left-8 z-30"
            >
              {/* Subtle ambient pulse ring */}
              <div 
                className="absolute inset-0 rounded-full bg-[#F43F5E]/30 animate-ping pointer-events-none" 
                style={{ animationDuration: '3s' }} 
              />

              <motion.button 
                onClick={handlePlay}
                aria-label="Play whiteboard video demonstration"
                title="Play Video Demonstration"
                className="relative group w-14 h-14 sm:w-20 sm:h-20 md:w-32 md:h-32 bg-[#F43F5E] hover:bg-[#e11d48] rounded-full flex items-center justify-center shadow-[0_16px_32px_rgba(244,63,94,0.45)] cursor-pointer border-2 sm:border-4 border-white transition-colors"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-14 md:h-14 text-white ml-1 md:ml-3 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 3v18l15-9L5 3z" />
                </svg>

                {/* Tooltip hint on hover */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/85 md:backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                  Watch Animation
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Overlay Layer: Always in DOM to preload, just hidden when not playing */}
        <motion.div
            initial={false}
            animate={{ 
                opacity: isPlaying ? 1 : 0, 
                pointerEvents: isPlaying ? "auto" : "none" 
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 z-40 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black flex items-center justify-center shadow-2xl border border-white/10"
        >
            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              src="/photos/hero-watch-animation.mp4"
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center select-none pointer-events-none"
              onPlay={() => setIsPaused(false)}
              onPause={() => setIsPaused(true)}
              onEnded={handleVideoEnd}
              onTimeUpdate={handleTimeUpdate}
            />

              {/* Center Pause Indicator Overlay */}
              <AnimatePresence>
                {isPaused && (
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center z-45 cursor-pointer"
                    onClick={togglePlayPause}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/25 hover:bg-white/35 md:backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-2xl transition-transform hover:scale-110">
                      <svg className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sleek Top Controls Bar */}
              <div 
                className="absolute top-3 md:top-5 right-3 md:right-5 z-50 flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Play/Pause Toggle */}
                <button
                  onClick={togglePlayPause}
                  className="p-2 md:p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white md:backdrop-blur-md transition-all border border-white/20 shadow-lg hover:scale-105 active:scale-95"
                  aria-label={isPaused ? "Resume video" : "Pause video"}
                  title={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? (
                    <svg className="w-4 h-4 md:w-5 md:h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  )}
                </button>

                {/* Mute/Unmute Toggle */}
                <button
                  onClick={toggleMute}
                  className="p-2 md:p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white md:backdrop-blur-md transition-all border border-white/20 shadow-lg hover:scale-105 active:scale-95"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="flex items-center gap-1.5 px-3 py-1.5 md:py-2 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white md:backdrop-blur-md transition-all border border-white/20 shadow-lg hover:scale-105 active:scale-95 text-xs md:text-sm font-medium"
                  aria-label="Close video and return to graphic"
                  title="Close (Esc)"
                >
                  <svg className="w-4 h-4 md:w-4.5 md:h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>

              {/* Sleek Bottom Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-50 pointer-events-none">
                <div 
                  ref={progressBarRef}
                  className="h-full w-0 bg-gradient-to-r from-[#F43F5E] via-[#f59e0b] to-[#10b981] shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                />
              </div>
        </motion.div>

        {/* Phone Mockup (Right Side) */}
        <div className={`right-0 sm:right-4 md:right-[10%] top-1/2 -translate-y-1/2 z-20 w-[115px] h-[250px] sm:w-[166px] sm:h-[360px] md:w-[221px] md:h-[480px] lg:w-[254px] lg:h-[550px] rounded-[10px] sm:rounded-[14px] md:rounded-[18px] lg:rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.5)] phone-container-clip transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <motion.div 
            className="absolute top-0 left-0 w-[320px] h-[693px] md:w-[375px] md:h-[812px] bg-[#141527] rounded-[40px] md:rounded-[48px] border-[10px] md:border-[12px] border-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col origin-top-left phone-mockup-transform shrink-0"
            initial={{ y: 30, }}
            animate={{ y: 0, }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            
            {/* iOS Status Bar (White) */}
            <div className="h-10 md:h-12 w-full bg-white flex items-center justify-between px-5 md:px-6 shrink-0 z-50 text-black font-semibold text-[12px] md:text-[14px]">
              <span>8:32</span>
              
              {/* Dynamic Island Cutout */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1.5 md:top-2 w-[100px] md:w-[120px] h-[24px] md:h-[30px] bg-black rounded-full z-50 shadow-inner" />
              
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-2.5 md:w-[18px] md:h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 22h20V2z" />
                </svg>
                <span className="font-bold text-[11px] md:text-[13px] tracking-tight">5G</span>
                <div className="w-5 h-2.5 md:w-6 md:h-3 rounded-[3px] border border-black p-[1px] relative">
                  <div className="bg-black w-[58%] h-full rounded-[1px]" />
                  <div className="absolute -right-1 top-1 w-[2px] h-1 bg-black rounded-r-sm" />
                </div>
              </div>
            </div>

            {/* App Top Navigation Bar */}
            <div className="h-[56px] md:h-[64px] bg-[#141527] border-b border-white/5 flex items-center justify-between px-3 md:px-4 shrink-0 z-40">
              <div className="flex items-center gap-1.5">
                {/* Session ID Pill */}
                <div className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-md border border-[#0d593f] bg-[#072d20] text-[#10b981] text-[10px] md:text-[11px] font-extrabold tracking-wider">
                  2UU6SV
                </div>
                {/* S2S Pill */}
                <div className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-md bg-white/5 text-[#84879e] text-[10px] md:text-[11px] font-bold">
                  S2S
                </div>
                {/* Language Dropdown */}
                <div className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-md border border-white/10 bg-white/5 flex items-center gap-1 md:gap-1.5">
                  <span className="text-[12px] md:text-[14px]">🇪🇸</span>
                  <span className="text-white text-[10px] md:text-[11px] font-semibold">Spanish (Spain)...</span>
                  <svg className="w-2 h-2 md:w-2.5 md:h-2.5" viewBox="0 0 24 24" fill="none" stroke="#84879e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
              
              {/* Active Status */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full border border-[#0d593f] bg-[#072d20] text-[#10b981] text-[9px] md:text-[10px] font-bold tracking-wider">
                <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                ACTIVE
              </div>
            </div>

            {/* Main Transcript Area */}
            <div className="flex-1 flex flex-col justify-end p-4 md:p-5 pb-6 md:pb-8 relative bg-[#141527]">
              
              <div className="flex flex-col gap-5 md:gap-7 text-[18px] md:text-[22px] leading-[1.3] font-bold tracking-tight">
                {/* Completed Sentences */}
                <div className="text-[#84879e] drop-shadow-sm">
                  Peter, y luego arrepiéntanse y sean bautizados cada uno de ustedes en el nombre de Jesucristo.
                </div>
                <div className="text-[#84879e] drop-shadow-sm">
                  ¡Sí, aleluya!
                </div>
                <div className="text-[#84879e] drop-shadow-sm">
                  Gracias por escuchar este mensaje hoy.
                </div>
                
                {/* Active Streaming Sentence */}
                <div className="text-[#10b981] drop-shadow-sm min-h-[80px] md:min-h-[100px]">
                  {visibleText}
                  <motion.span 
                    className="inline-block w-[2px] h-[18px] md:h-[22px] bg-[#10b981] ml-[2px] align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Floating Auto-Scroll Button */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40">
                <button className="bg-[#10b981] hover:bg-[#0ea5e9] transition-colors text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1.5 md:gap-2 shadow-[0_8px_20px_rgba(16,185,129,0.3)]">
                  <div className="bg-white/20 w-4 h-4 md:w-5 md:h-5 rounded flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>
                  Resume Auto-Scroll
                </button>
              </div>
            </div>

            {/* App Bottom Audio Control Bar */}
            <div className="h-[60px] md:h-[70px] bg-[#1a1b2e] border-t border-white/5 px-3 md:px-4 flex flex-col justify-center shrink-0 z-40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-2.5">
                  {/* Animated Waveform */}
                  <div className="flex items-center gap-[2px] h-4">
                    <motion.div className="w-[2px] md:w-[3px] bg-[#10b981] rounded-full" animate={{ height: isPlaying ? 4 : [4, 12, 6, 16, 4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
                    <motion.div className="w-[2px] md:w-[3px] bg-[#10b981] rounded-full" animate={{ height: isPlaying ? 4 : [10, 16, 8, 12, 10] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
                    <motion.div className="w-[2px] md:w-[3px] bg-[#10b981] rounded-full" animate={{ height: isPlaying ? 4 : [6, 14, 4, 10, 6] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
                    <motion.div className="w-[2px] md:w-[3px] bg-[#10b981] rounded-full" animate={{ height: isPlaying ? 4 : [12, 6, 16, 8, 12] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
                  </div>
                  <span className="text-[#84879e] text-[10px] md:text-xs font-semibold tracking-wide">Streaming Translated Audio</span>
                </div>
                
                <button className="px-2.5 py-1.5 md:px-3.5 md:py-2 rounded-lg border border-white/10 bg-white/5 text-[#a1a1aa] text-[9px] md:text-[10px] font-bold tracking-wider hover:bg-white/10 transition-colors">
                  Switch to Text Mode
                </button>
              </div>
            </div>

            {/* Safari / iOS Browser Bottom Chrome */}
            <div className="h-[74px] md:h-[84px] bg-[#f2f2f7] flex items-start pt-2.5 md:pt-3 justify-between px-4 md:px-5 shrink-0 text-black border-t border-gray-300 z-50">
              <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-500 hover:text-black transition-colors">
                <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              
              <div className="flex-1 max-w-[180px] md:max-w-[200px] h-[38px] md:h-[44px] bg-white rounded-xl mx-2 md:mx-3 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-gray-200 flex items-center justify-between px-2.5 md:px-3">
                <div className="flex items-center gap-2 text-blue-600">
                   <svg className="w-4 h-4 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                </div>
                <span className="text-[13px] md:text-[15px] font-medium tracking-tight">app.exbabel.com</span>
                <button className="text-gray-400 hover:text-black">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 1 0 2.1-5.7L2 8"></path></svg>
                </button>
              </div>
              
              <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-500 hover:text-black transition-colors">
                 <div className="w-1 h-1 rounded-full bg-currentColor flex items-center justify-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-current absolute -translate-x-2"></span>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    <span className="w-1 h-1 rounded-full bg-current absolute translate-x-2"></span>
                 </div>
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
