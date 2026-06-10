"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveTranslationGraphic() {
  const targetText = "Me alegra muchísimo que vengas a nuestra iglesia, y que nos escuches por primera vez.";
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    let currentChars = 0;
    const interval = setInterval(() => {
      if (currentChars < targetText.length) {
        currentChars += Math.floor(Math.random() * 2) + 1; // 1 to 2 chars per tick for natural variance
        if (currentChars > targetText.length) currentChars = targetText.length;
        setVisibleChars(currentChars);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setVisibleChars(0);
        }, 4000); // Wait 4 seconds before looping
      }
    }, 45); // Roughly conversational speed
    
    return () => clearInterval(interval);
  }, [visibleChars === 0]); // Re-run effect when reset

  const visibleText = targetText.substring(0, visibleChars);

  return (
    <div className="w-full flex items-center justify-center py-12 px-4 md:px-8 overflow-hidden">
      
      {/* Contained Tech Graphic Card */}
      <div className="relative w-full max-w-[1100px] h-[600px] md:h-[750px] bg-[#1a1a2e] rounded-[2rem] md:rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] flex items-center border border-white/10">
        
        {/* Background Image (Desaturated Pastor) */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[3rem]">
          <motion.img 
            src="/photos/pastor showcase.png" 
            alt="Pastor Preaching"
            className="w-full h-full object-cover object-top opacity-60 grayscale mix-blend-luminosity"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Tech Gradient Overlay (Red/Orange glow on the right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1a2e]/60 to-[#e11d48]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-80" />
        </div>

        {/* Concentric Tech Waves (Audio/Radio waves) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none overflow-hidden rounded-[3rem]">
          <svg className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="100" stroke="white" strokeWidth="2" />
            <circle cx="400" cy="400" r="150" stroke="white" strokeWidth="2" />
            <motion.circle cx="400" cy="400" r="220" stroke="white" strokeWidth="1.5" animate={{ r: [220, 230, 220], opacity: [1, 0.5, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
            <motion.circle cx="400" cy="400" r="300" stroke="white" strokeWidth="1" animate={{ r: [300, 320, 300], opacity: [1, 0.4, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
            <motion.circle cx="400" cy="400" r="400" stroke="white" strokeWidth="0.5" animate={{ r: [400, 430, 400], opacity: [1, 0.3, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
            <motion.circle cx="400" cy="400" r="520" stroke="white" strokeWidth="0.5" opacity="0.5" animate={{ r: [520, 560, 520], opacity: [0.5, 0.1, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
          </svg>
        </div>

        {/* Pink/Red Play Button (Bottom Left, overlapping edge) */}
        <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 z-30">
          <motion.div 
            className="w-24 h-24 md:w-32 md:h-32 bg-[#F43F5E] rounded-full flex items-center justify-center shadow-[0_16px_32px_rgba(244,63,94,0.4)] cursor-pointer border-4 border-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-10 h-10 md:w-14 md:h-14 text-white ml-2 md:ml-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3v18l15-9L5 3z" />
            </svg>
          </motion.div>
        </div>

        {/* Phone Mockup (Right Side) */}
        <div className="absolute right-4 md:right-[10%] top-1/2 -translate-y-1/2 z-20">
          <motion.div 
            className="relative w-[320px] h-[693px] md:w-[375px] md:h-[812px] bg-[#141527] rounded-[40px] md:rounded-[48px] border-[10px] md:border-[12px] border-black shadow-[0_32px_80px_rgba(0,0,0,0.6),_inset_0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col origin-center scale-[0.85] md:scale-100"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
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
                    <motion.div className="w-[2px] md:w-[3px] bg-[#10b981] rounded-full" animate={{ height: [4, 12, 6, 16, 4] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
                    <motion.div className="w-[2px] md:w-[3px] bg-[#10b981] rounded-full" animate={{ height: [10, 16, 8, 12, 10] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
                    <motion.div className="w-[2px] md:w-[3px] bg-[#10b981] rounded-full" animate={{ height: [6, 14, 4, 10, 6] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
                    <motion.div className="w-[2px] md:w-[3px] bg-[#10b981] rounded-full" animate={{ height: [12, 6, 16, 8, 12] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
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
