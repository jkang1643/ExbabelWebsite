'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HowItWorksGraphic() {
  const [step, setStep] = useState(0);

  // 0: Initial/Reset
  // 1: Pastor Speaks (Left side activates)
  // 2: AI Processing (Center activates, data flows)
  // 3: Output Streams (Right side activates, translations appear)
  useEffect(() => {
    const sequence = [
      { step: 1, duration: 2500 }, // Pastor speaking duration
      { step: 2, duration: 2500 }, // AI translating duration
      { step: 3, duration: 4000 }, // Viewers listening duration
      { step: 0, duration: 500 },  // Reset
    ];

    let timeoutId: NodeJS.Timeout;
    
    const runSequence = (index = 0) => {
      setStep(sequence[index].step);
      timeoutId = setTimeout(() => {
        runSequence((index + 1) % sequence.length);
      }, sequence[index].duration);
    };

    runSequence();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    // Removed overflow-hidden so popups and glows don't get cut off at the edges
    <div className="relative w-full max-w-4xl h-[500px] md:h-[400px] flex flex-col md:flex-row items-center justify-between p-8 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-0"
          animate={{ opacity: step >= 2 ? 1 : 0.3 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
          animate={{ scale: step === 2 ? 1.5 : 1, opacity: step === 2 ? 0.8 : 0.2 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      {/* STEP 1: Pastor Speaks */}
      <div className="relative z-10 w-full md:w-1/3 flex flex-col items-center gap-4">
        {/* Step Label */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
          className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
        >
          1. Pastor Speaks
        </motion.div>

        <motion.div 
          className="w-40 h-40 bg-white rounded-[2rem] shadow-xl ring-1 ring-slate-200 flex flex-col items-center justify-center gap-3 relative"
          animate={step >= 1 ? { scale: 1.05, y: 0 } : { scale: 0.95, y: 10, opacity: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Audio Waveform Animation */}
          <div className="flex items-end gap-1.5 h-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                key={i}
                className="w-2 bg-primary rounded-full"
                initial={{ height: "20%" }}
                animate={step >= 1 ? { height: ["20%", "100%", "40%", "80%", "20%"] } : { height: "20%" }}
                transition={step >= 1 ? { 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                } : {}}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-800">English Audio</span>
          </div>
        </motion.div>
      </div>

      {/* DATA FLOW (Left to Center) */}
      <div className="hidden md:block absolute left-1/3 right-2/3 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-slate-200 w-32 -mx-16 z-0">
        <motion.div 
          className="absolute top-[-5px] left-0 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          initial={{ x: "0%", opacity: 0 }}
          animate={step >= 2 ? { x: "100%", opacity: [0, 1, 1, 0] } : { x: "0%", opacity: 0 }}
          transition={step >= 2 ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
        />
      </div>

      {/* STEP 2: AI Engine */}
      <div className="relative z-20 w-full md:w-1/3 flex flex-col items-center gap-4 my-8 md:my-0">
        {/* Step Label */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 10 }}
          className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-primary/30"
        >
          2. Exbabel Translates
        </motion.div>

        <motion.div 
          className="w-48 h-48 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl ring-1 ring-white flex flex-col items-center justify-center gap-4 relative overflow-hidden"
          animate={step >= 2 ? { scale: 1.1 } : { scale: 0.9, opacity: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Internal rotating gradient */}
          <motion.div 
            className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(59,130,246,0.2)_360deg)]"
            animate={step >= 2 ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-slate-800 relative z-10">AI Engine</span>
        </motion.div>
      </div>

      {/* DATA FLOW (Center to Right) */}
      <div className="hidden md:block absolute left-2/3 right-1/3 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-slate-200 w-32 ml-12 z-0">
        <motion.div 
          className="absolute top-[-5px] left-0 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
          initial={{ x: "0%", opacity: 0 }}
          animate={step >= 3 ? { x: "100%", opacity: [0, 1, 1, 0] } : { x: "0%", opacity: 0 }}
          transition={step >= 3 ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
        />
      </div>

      {/* STEP 3: Viewers Listen */}
      <div className="relative z-10 w-full md:w-1/3 flex flex-col items-center gap-4">
        {/* Step Label */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
          className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
        >
          3. Viewers Listen
        </motion.div>

        <div className="flex flex-col gap-4 w-full px-4">
          {/* Spanish Stream */}
          <motion.div 
            className="w-full bg-white rounded-2xl p-4 shadow-xl ring-1 ring-slate-200 flex items-center gap-3 relative"
            animate={step >= 3 ? { x: 0, opacity: 1, scale: 1 } : { x: 20, opacity: 0.5, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-pink-600 font-bold text-xs">ES</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-xs font-bold text-slate-800 mb-1">Spanish Audio & Captions</div>
              <motion.div 
                className="h-1.5 bg-slate-100 rounded-full w-full overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-pink-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={step >= 3 ? { width: "100%" } : { width: "0%" }}
                  transition={step >= 3 ? { duration: 2, ease: "linear" } : {}}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Korean Stream */}
          <motion.div 
            className="w-full bg-white rounded-2xl p-4 shadow-xl ring-1 ring-slate-200 flex items-center gap-3 relative"
            animate={step >= 3 ? { x: 0, opacity: 1, scale: 1 } : { x: 20, opacity: 0.5, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-blue-600 font-bold text-xs">KO</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-xs font-bold text-slate-800 mb-1">Korean Audio & Captions</div>
              <motion.div 
                className="h-1.5 bg-slate-100 rounded-full w-full overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-blue-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={step >= 3 ? { width: "100%" } : { width: "0%" }}
                  transition={step >= 3 ? { duration: 2, ease: "linear", delay: 0.5 } : {}}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
