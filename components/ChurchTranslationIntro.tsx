"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Captions, FileText, Languages, ListChecks, Phone, Radio, ScanFace, Video } from 'lucide-react';
import { motion, type MotionProps } from 'framer-motion';
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

  const viewport: MotionProps["viewport"] = {
    once: true,
    margin: mounted && window.innerWidth < 768 ? "300px" : "100px",
  };

  const features = [
    { name: 'Translation', icon: Languages },
    { name: 'Captions', icon: Captions },
    { name: 'Transcripts', icon: FileText },
    { name: 'Summaries', icon: ListChecks },
    { name: 'Join by Phone', icon: Phone },
    { name: 'Live Broadcasts', icon: Radio },
    { name: 'Zoom Calls', icon: Video },
    { name: 'AI Avatars', icon: ScanFace },
  ];

  return (
    <section id="church-translation" ref={sectionRef} aria-labelledby="church-translation-title" className="relative scroll-mt-20 overflow-hidden border-t border-slate-100 bg-[#f8fafc] py-20 md:py-24">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        {/* Animated Waveform Graphic at the top */}
        {mounted && (
          <motion.div 
            initial={{ y: 20 }}
            whileInView={{ y: 0 }} viewport={viewport}
            transition={{ duration: 0.8 }}
            className="relative mb-5 h-12 w-full max-w-[240px] text-[#234fdb] md:mb-7"
          >
            <svg aria-hidden="true" viewBox="0 0 400 100" className="h-full w-full">
              <path 
                d="M0,50 Q20,10 40,50 T80,50 T120,50 T160,50 T200,50 T240,50 T280,50 T320,50 T360,50 T400,50" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="motion-safe:animate-[waveform_3s_ease-in-out_infinite]"
              />
              <path 
                d="M0,50 Q20,30 40,50 T80,50 T120,50 T160,50 T200,50 T240,50 T280,50 T320,50 T360,50 T400,50" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.3"
                strokeLinecap="round"
                className="motion-safe:animate-[waveform_4s_ease-in-out_infinite_reverse]"
              />
            </svg>
          </motion.div>
        )}

        <motion.div 
          initial={{ y: 20 }}
          whileInView={{ y: 0 }} viewport={viewport}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl"
        >
          <h2 id="church-translation-title" className="homepage-section-title mb-6 text-balance text-slate-900">
            Meet the <span className="text-[#234fdb]">Exbabel Suite</span>
          </h2>
          
          <p className="mx-auto mb-9 max-w-[71ch] text-base leading-relaxed text-slate-600 md:text-lg">
            Welcome more people into every live gathering. With unlimited simultaneous languages for live translation, everyone can follow the same session in their preferred supported language. Keep the message going with transcripts and summaries.
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20 }}
          whileInView={{ y: 0 }} viewport={viewport}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12 w-full max-w-4xl md:mb-16"
        >
          <ul role="list" className="mx-auto grid max-w-3xl grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3.5">
            {features.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#dce5f7] bg-white px-2.5 py-2 text-[13px] font-semibold leading-snug text-slate-800 shadow-[0_5px_15px_-8px_#234fdb45] md:px-3 md:text-sm"
              >
                <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#234fdb]" strokeWidth={1.75} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, y: 40 }}
          whileInView={{ scale: 1, y: 0 }} viewport={viewport}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full max-w-5xl mx-auto"
        >
          <div
            className="relative bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_18px_38px_-27px_#234fdb50] ring-1 ring-[#dce5f7] cursor-pointer group"
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
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-black/40 md:backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 group-hover:bg-black/60 hover:scale-110 shadow-lg">
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
