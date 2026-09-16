"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ChurchTranslationIntro() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  // Only start loading/playing when the section is in view
  const { ref: sectionRef, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
      if (inView && videoRef.current && !hasStarted) {
          setHasStarted(true);
          videoRef.current.src = "/videos/9689681bd7407a5a32a1be3f678fb93bdb5b3a134219ef8d25133ba7c3a730fb_1080p.mp4";
          videoRef.current.load();
          videoRef.current.play().catch(() => {});
      }
  }, [inView, hasStarted]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      if (videoRef.current) {
          const nextMuted = !videoRef.current.muted;
          videoRef.current.muted = nextMuted;
          setIsMuted(nextMuted);
      }
  }, []);

  const features = [
    { name: 'Translation', icon: 'T', color: 'text-emerald-500' },
    { name: 'Captions', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" /></svg>, color: 'text-teal-500' },
    { name: 'Transcripts', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>, color: 'text-blue-500' },
    { name: 'Summaries', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" /></svg>, color: 'text-purple-500' }
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-50/50 blur-[100px] rounded-full opacity-60 hidden md:block" />
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/50 blur-[100px] rounded-full opacity-60 hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Animated Waveform Graphic at the top */}
        {mounted && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "300px" : "100px" }}
            transition={{ duration: 0.8 }}
            className="mb-8 h-20 w-full max-w-[300px] relative"
          >
            <svg viewBox="0 0 400 100" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <path 
                d="M0,50 Q20,10 40,50 T80,50 T120,50 T160,50 T200,50 T240,50 T280,50 T320,50 T360,50 T400,50" 
                fill="none" 
                stroke="url(#waveGrad)" 
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-[waveform_3s_ease-in-out_infinite]"
              />
              <path 
                d="M0,50 Q20,30 40,50 T80,50 T120,50 T160,50 T200,50 T240,50 T280,50 T320,50 T360,50 T400,50" 
                fill="none" 
                stroke="url(#waveGrad)" 
                strokeWidth="2"
                opacity="0.3"
                strokeLinecap="round"
                className="animate-[waveform_4s_ease-in-out_infinite_reverse]"
              />
            </svg>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "300px" : "100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
            A Church Translation System Built for Live Services
          </h2>
          
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium mb-12">
            Traditional church translation systems often require interpreters, wireless receivers, transmitters, translation booths, or dedicated translation equipment. <strong className="text-slate-800 font-bold">Exbabel delivers translated speech and captions through the devices attendees already carry</strong>, allowing churches to translate sermons and services without distributing specialized hardware.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "300px" : "100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-20 w-full max-w-4xl"
        >
          {/* Intense Colorful Backdrop Glow for Pills */}
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 w-full h-[80px] bg-gradient-to-r from-emerald-300/40 via-blue-300/40 to-purple-300/40 blur-2xl rounded-full" />
          
          <div className="relative z-10 flex flex-wrap justify-center gap-3 md:gap-4">
            {features.map((feature, i) => (
              <div 
                key={feature.name}
                className="flex items-center gap-2.5 px-5 md:px-7 py-3 md:py-3.5 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300 cursor-default"
              >
                <div className={`font-bold text-lg md:text-xl flex items-center justify-center w-5 h-5 ${feature.color}`}>
                  {feature.icon}
                </div>
                <span className="font-semibold text-slate-700 text-sm md:text-base">{feature.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "300px" : "100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full max-w-5xl mx-auto"
        >
          <div
            className="relative bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-slate-200/50 cursor-pointer group"
            onClick={toggleMute}
          >
            {/* The Video */}
            <video
                ref={videoRef}
                className="w-full h-auto max-h-[70vh] aspect-video object-contain lg:object-cover bg-slate-50 transition-transform duration-700 group-hover:scale-[1.01]"
                muted={isMuted}
                loop
                playsInline
                preload="none"
            />

            {/* Sound Indicator Overlay */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-black/40 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 group-hover:bg-black/60 hover:scale-110 shadow-lg">
                {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>
                )}
            </div>
          </div>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes waveform {
          0%, 100% { d: path('M0,50 Q20,10 40,50 T80,50 T120,50 T160,50 T200,50 T240,50 T280,50 T320,50 T360,50 T400,50'); }
          50% { d: path('M0,50 Q20,90 40,50 T80,50 T120,50 T160,50 T200,50 T240,50 T280,50 T320,50 T360,50 T400,50'); }
        }
      `}} />
    </section>
  );
}
