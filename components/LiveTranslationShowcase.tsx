"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PREACHING_LINES = [
  { source: "And so we look to the future with hope.", target: "Y así miramos al futuro con esperanza." },
  { source: "Technology should serve humanity.", target: "La tecnología debería servir a la humanidad." },
  { source: "Breaking down every barrier.", target: "Derribando cada barrera." },
  { source: "Connecting every community together.", target: "Conectando a cada comunidad." },
  { source: "This is our vision for tomorrow.", target: "Esta es nuestra visión para el mañana." },
];

export default function LiveTranslationShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [log, setLog] = useState<{ source: string, target: string }[]>([]);
  
  // Mouse animation states
  const [mousePos, setMousePos] = useState({ x: '80%', y: '80%' });
  const [mouseOpacity, setMouseOpacity] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  // Initial Mouse Animation Sequence
  useEffect(() => {
    // 1. Mouse appears
    const t1 = setTimeout(() => {
      setMouseOpacity(1);
    }, 500);

    // 2. Mouse moves to play button (roughly left side center)
    const t2 = setTimeout(() => {
      setMousePos({ x: '25%', y: '35%' });
    }, 1200);

    // 3. Mouse clicks
    const t3 = setTimeout(() => {
      setIsClicking(true);
    }, 2200);

    // 4. Mouse releases and starts playing
    const t4 = setTimeout(() => {
      setIsClicking(false);
      setIsPlaying(true);
    }, 2400);

    // 5. Mouse moves away and fades out
    const t5 = setTimeout(() => {
      setMousePos({ x: '10%', y: '80%' });
    }, 2700);
    
    const t6 = setTimeout(() => {
      setMouseOpacity(0);
    }, 3200);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); 
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
    };
  }, []);

  // Subtitle progression logic
  useEffect(() => {
    if (!isPlaying) return;

    setLog([PREACHING_LINES[0]]);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= PREACHING_LINES.length) {
          setTimeout(() => {
            setCurrentIndex(0);
            setLog([]);
          }, 3500);
          return prev;
        }
        setLog((prevLog) => [...prevLog, PREACHING_LINES[next]]);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentLine = PREACHING_LINES[currentIndex];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 relative">
      
      {/* Fake Mouse Cursor */}
      <motion.div
        className="absolute z-50 pointer-events-none drop-shadow-xl"
        initial={{ top: '80%', left: '80%', opacity: 0 }}
        animate={{ 
          top: mousePos.y, 
          left: mousePos.x, 
          opacity: mouseOpacity,
          scale: isClicking ? 0.8 : 1
        }}
        transition={{ duration: isClicking ? 0.1 : 0.8, ease: "easeInOut" }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.44c.41 0 .75-.34.75-.75v-.19c0-.2-.08-.39-.22-.53L6.35 2.53a.5.5 0 0 0-.85.35v.33z" fill="white" stroke="#0B1220" strokeWidth="1.5"/>
        </svg>
      </motion.div>

      {/* Outer Browser/App Wrapper */}
      <div className="rounded-2xl border border-white/10 bg-[#0B1220] overflow-hidden shadow-2xl shadow-green-900/10 flex flex-col h-[700px] font-sans text-white relative">
        
        {/* Top App Bar */}
        <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B1220]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight">Exbabel</span>
          </div>
          <div className="flex gap-3">
            <div className="px-3 py-1.5 rounded-md bg-white/5 text-sm font-medium text-gray-300">Sign In</div>
            <div className="px-3 py-1.5 rounded-md bg-blue-600 text-sm font-medium text-white shadow-lg shadow-blue-500/20">Sign Up</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-6 gap-6 bg-[#080d18]">
          
          {/* Left Side: Video Player Section */}
          <div className="flex-[2] flex flex-col gap-4 min-w-0">
            {/* Main Video Viewport */}
            <div className="flex-1 rounded-xl border border-white/5 bg-[#0B1220] relative overflow-hidden group shadow-inner">
              
              {/* Background Pastor Image with "Talking" Animation */}
              <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
                <motion.img 
                  src="/photos/pastor showcase.png" 
                  alt="Pastor Preaching"
                  className="w-full h-full object-cover object-top opacity-70"
                  animate={isPlaying ? {
                     scale: [1, 1.02, 1.01, 1.03, 1], // Subtle breathing/moving scale
                     y: [0, -2, 1, -1, 0], // Subtle vertical bobbing to simulate energy/talking
                  } : { scale: 1, y: 0 }}
                  transition={isPlaying ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}}
                />
                
                {/* Optional "South Park" style split jaw animation for literal lips moving. 
                    Uncomment and adjust the clip-path percentage if you want a more literal talking effect. */}
                {/* 
                <motion.img 
                  src="/photos/pastor showcase.png" 
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-70"
                  style={{ clipPath: 'polygon(0 40%, 100% 40%, 100% 100%, 0 100%)' }} // Adjust 40% to match jawline
                  animate={isPlaying ? { y: [0, 4, 0, 6, 0, 2, 0] } : { y: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                /> 
                */}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0B1220_120%)]" />
              </div>

              {/* Graphical Audio Visualizer / Speech Indicator */}
              <AnimatePresence>
                {isPlaying && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex items-end gap-1 mb-10 opacity-60"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-1.5 bg-emerald-400 rounded-full"
                        animate={{ height: [4, 16, 8, 24, 4][i] }} // Different heights per bar
                        transition={{ 
                          duration: 0.5, 
                          repeat: Infinity, 
                          repeatType: "mirror",
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Video Player Chrome */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 z-10">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-xs font-semibold tracking-wider text-white">
                  {isPlaying ? 'LIVE' : 'READY'}
                </span>
              </div>
              
              <div className="absolute top-4 right-4 hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 z-10">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                <span className="text-xs font-medium text-gray-300">Main Auditorium</span>
              </div>

              {/* Play Button Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div 
                    exit={{ opacity: 0, scale: 1.5 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                  >
                    <motion.div 
                      className={`w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-md border transition-colors
                        ${isClicking ? 'bg-emerald-500/40 border-emerald-400' : 'bg-black/50 border-white/20'}`}
                      animate={isClicking ? { scale: 0.9 } : { scale: 1 }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="ml-2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Real-time Subtitles Overlay */}
              <div className="absolute bottom-6 left-0 right-0 px-8 md:px-12 flex flex-col items-center justify-end z-30 pointer-events-none">
                <AnimatePresence mode="wait">
                  {isPlaying && currentLine && (
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="text-center w-full flex justify-center"
                    >
                      <div className="bg-black/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-xl inline-block max-w-[90%] shadow-2xl">
                         <p className="text-lg md:text-2xl font-semibold text-white drop-shadow-md tracking-wide">
                           {currentLine.target}
                         </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Bottom Stream Info Card */}
            <div className="bg-[#0B1220] border border-white/5 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between shadow-sm gap-4 shrink-0">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  Exbabel Live 
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide
                    ${isPlaying ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                    {isPlaying ? 'Online' : 'Offline'}
                  </span>
                </h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-1">Real-time AI speech translation — captions and voiceovers.</p>
              </div>
              <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-lg border border-white/5 shrink-0">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">AI Voiceover & Subtitles</span>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                      <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Español (Spanish)
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 ml-2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Subtitle Log */}
          <div className="flex-1 bg-[#0B1220] border border-white/5 rounded-xl flex flex-col shadow-sm max-w-full lg:max-w-[320px]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01] rounded-t-xl shrink-0">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h3 className="font-semibold text-sm">Subtitle Log</h3>
              </div>
              <div className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wider
                ${isPlaying ? 'text-emerald-400' : 'text-gray-500'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-gray-500'}`} />
                {isPlaying ? 'CONNECTED' : 'WAITING'}
              </div>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
              <AnimatePresence>
                {log.map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className="group"
                  >
                    <p className="text-xs text-gray-500 mb-1 leading-relaxed transition-colors group-hover:text-gray-400">{entry.source}</p>
                    <p className="text-sm text-emerald-300 font-medium leading-relaxed drop-shadow-sm">{entry.target}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing indicator */}
              {isPlaying && currentLine && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5 mt-2 p-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                </motion.div>
              )}

              {!isPlaying && (
                <div className="h-full flex items-center justify-center text-xs text-gray-500 text-center px-4">
                  Waiting for stream to begin... Click play to start simulation.
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 4px;
        }
      `}} />
    </div>
  );
}
