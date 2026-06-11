'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OBSSetupAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => (prev + 1) % 16);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cursor positions based on phase
  const getCursorPos = () => {
    if (phase < 1) return { x: 300, y: 300 }; // Idle in middle
    if (phase === 1) return { x: 500, y: 380 }; // Moving to Settings button
    if (phase === 2) return { x: 120, y: 150 }; // Moving to Stream tab in modal
    if (phase >= 3 && phase <= 4) return { x: 250, y: 180 }; // Moving to Server input
    if (phase >= 5 && phase <= 6) return { x: 250, y: 250 }; // Moving to Stream Key input
    if (phase === 7) return { x: 450, y: 350 }; // Moving to OK button
    if (phase >= 8 && phase <= 9) return { x: 500, y: 300 }; // Moving to Start Streaming button
    return { x: 600, y: 400 }; // Moved away
  };

  const cursorState = getCursorPos();
  
  const isModalOpen = phase >= 2 && phase <= 7;
  const isStreamTabOpen = phase >= 3;
  const showServerUrl = phase >= 4;
  const showStreamKey = phase >= 6;
  const isStreaming = phase >= 10 && phase <= 14;

  return (
    <div className="relative w-full max-w-[700px] aspect-video bg-[#1e1e1e] rounded-xl shadow-2xl border border-[#333] overflow-hidden select-none font-sans text-sm">
      {/* OBS Header */}
      <div className="h-8 bg-[#2d2d2d] flex items-center px-4 justify-between border-b border-[#111]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-gray-400 text-xs font-semibold">OBS Studio 30.0.0 (64-bit, windows) - Profile: Untitled</div>
        <div className="w-12" />
      </div>

      {/* OBS Main Content */}
      <div className="flex h-[calc(100%-2rem)]">
        {/* Main Viewport */}
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="flex-1 bg-black border border-[#111] relative flex items-center justify-center overflow-hidden">
             {/* Fake pastor video feed */}
             <img src="/photos/exbabel_live_translation_concept_1780070697205.webp" className="w-full h-full object-cover opacity-50 blur-[2px]" alt="feed" loading="lazy" />
             {isStreaming && (
               <div className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white font-bold text-xs rounded-sm flex items-center gap-2 animate-pulse">
                 <div className="w-2 h-2 bg-white rounded-full" />
                 LIVE
               </div>
             )}
          </div>
          
          {/* Bottom Docks (Audio Mixer, Scenes, Controls) */}
          <div className="h-40 flex gap-4">
            <div className="w-1/4 bg-[#252525] border border-[#111] p-2 flex flex-col gap-1">
               <div className="text-gray-400 text-xs font-bold mb-1">Scenes</div>
               <div className="bg-primary/20 text-white px-2 py-1 text-xs">Scene 1</div>
            </div>
            <div className="w-1/4 bg-[#252525] border border-[#111] p-2 flex flex-col gap-1">
               <div className="text-gray-400 text-xs font-bold mb-1">Sources</div>
               <div className="text-white px-2 py-1 text-xs">Video Capture Device</div>
            </div>
            <div className="flex-1 bg-[#252525] border border-[#111] p-2 flex flex-col gap-1">
               <div className="text-gray-400 text-xs font-bold mb-1">Controls</div>
               <div className={`px-2 py-1.5 text-center text-xs font-bold border transition-colors ${isStreaming ? 'bg-red-600/20 text-red-400 border-red-500/50' : 'bg-[#333] text-gray-200 border-[#444]'}`}>
                 {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
               </div>
               <div className="px-2 py-1.5 text-center text-xs text-gray-300 bg-[#333] border border-[#444]">Start Recording</div>
               <div className={`px-2 py-1.5 text-center text-xs text-gray-300 border transition-colors ${phase === 1 || phase === 2 ? 'bg-primary/20 border-primary' : 'bg-[#333] border-[#444]'}`}>Settings</div>
               <div className="px-2 py-1.5 text-center text-xs text-gray-300 bg-[#333] border border-[#444]">Exit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
          >
            <div className="w-[500px] h-[350px] bg-[#2d2d2d] border border-[#111] shadow-2xl flex flex-col">
              <div className="h-8 bg-[#333] flex items-center px-3 text-xs text-gray-200 border-b border-[#111]">
                Settings
              </div>
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-32 bg-[#252525] border-r border-[#111] py-2 flex flex-col gap-1">
                  <div className="px-4 py-1.5 text-xs text-gray-400 hover:bg-[#333]">General</div>
                  <div className={`px-4 py-1.5 text-xs transition-colors ${isStreamTabOpen ? 'bg-primary/20 text-white border-l-2 border-primary' : 'text-gray-400 hover:bg-[#333]'}`}>Stream</div>
                  <div className="px-4 py-1.5 text-xs text-gray-400 hover:bg-[#333]">Output</div>
                  <div className="px-4 py-1.5 text-xs text-gray-400 hover:bg-[#333]">Audio</div>
                  <div className="px-4 py-1.5 text-xs text-gray-400 hover:bg-[#333]">Video</div>
                </div>
                
                {/* Modal Content */}
                <div className="flex-1 p-6 bg-[#2d2d2d]">
                  {isStreamTabOpen ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 text-right text-xs text-gray-300">Service</div>
                        <div className="flex-1 bg-[#1e1e1e] border border-[#444] px-2 py-1 text-xs text-gray-200">Custom...</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-20 text-right text-xs text-gray-300">Server</div>
                        <div className="flex-1 bg-[#1e1e1e] border border-[#444] px-2 py-1 text-xs text-gray-200 flex items-center">
                          {showServerUrl && (
                            <motion.span
                              initial={{ clipPath: 'inset(0 100% 0 0)' }}
                              animate={{ clipPath: 'inset(0 0% 0 0)' }}
                              transition={{ duration: 1 }}
                            >
                              rtmp://live.exbabel.com/app
                            </motion.span>
                          )}
                          {showServerUrl && phase < 5 && <span className="w-0.5 h-3 bg-white animate-pulse ml-0.5" />}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-20 text-right text-xs text-gray-300">Stream Key</div>
                        <div className="flex-1 bg-[#1e1e1e] border border-[#444] px-2 py-1 text-xs text-gray-200 flex items-center">
                          {showStreamKey && (
                            <motion.span
                              initial={{ clipPath: 'inset(0 100% 0 0)' }}
                              animate={{ clipPath: 'inset(0 0% 0 0)' }}
                              transition={{ duration: 1 }}
                            >
                              ••••••••••••••••••••
                            </motion.span>
                          )}
                          {showStreamKey && phase < 7 && <span className="w-0.5 h-3 bg-white animate-pulse ml-0.5" />}
                        </div>
                      </div>
                      <div className="pl-24 mt-2">
                        <span className="text-[10px] text-gray-500">Use authentication</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-gray-500 text-xs">Select a category on the left</div>
                  )}
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="h-12 border-t border-[#111] bg-[#252525] flex justify-end items-center px-4 gap-2">
                <div className={`px-4 py-1 text-xs bg-[#444] text-gray-200 border border-[#555] rounded-sm transition-colors ${phase === 7 ? 'bg-primary border-primary' : ''}`}>OK</div>
                <div className="px-4 py-1 text-xs bg-[#444] text-gray-200 border border-[#555] rounded-sm">Cancel</div>
                <div className="px-4 py-1 text-xs bg-[#444] text-gray-500 border border-[#444] rounded-sm">Apply</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Cursor */}
      <motion.div 
        className="absolute w-5 h-5 z-50 pointer-events-none drop-shadow-md"
        animate={{ x: cursorState.x, y: cursorState.y }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2L20 12L11.5 13.5L8.5 22L4 2Z" fill="white" stroke="black" strokeWidth="1"/>
        </svg>
      </motion.div>
    </div>
  );
}
