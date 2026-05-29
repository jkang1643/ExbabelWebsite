'use client';

import React from 'react';
import { motion } from 'framer-motion';
import OBSSetupAnimation from '@/components/OBSSetupAnimation';

const steps = [
  {
    number: "1",
    title: "Connect Your Stream",
    desc: "Open your encoder settings (OBS, vMix, etc.) and enter your unique Exbabel RTMP URL and Stream Key. No extra hardware required."
  },
  {
    number: "2",
    title: "Exbabel Translates",
    desc: "Start streaming! Our AI engine automatically processes the incoming audio, generating live translated voiceovers and captions in sub-second latency."
  },
  {
    number: "3",
    title: "Share With Your Audience",
    desc: "Embed the Exbabel multi-language player on your website or route the translated HLS feeds directly into your existing church app."
  }
];

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.15 }
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function GettingStartedSection() {
  return (
    <section className="py-32 px-6 relative z-10 bg-slate-50 border-y border-slate-100">
      <motion.div className="max-w-7xl mx-auto" initial="initial" whileInView="whileInView" variants={staggerContainer}>
        
        <div className="text-center mb-20 space-y-4">
          <motion.div variants={fadeInUp}>
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Getting Started</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-base-content tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
            Setup takes minutes, not months.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-base-content/70 max-w-2xl mx-auto font-medium">
            You don't need a dedicated IT team to start offering multi-language livestreams. We've designed Exbabel to plug right into the tools you already know how to use.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps List */}
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="flex gap-6 group"
              >
                <div className="w-16 h-16 shrink-0 bg-white rounded-full shadow-lg ring-1 ring-slate-200 flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:ring-primary/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-2xl font-extrabold text-primary" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>{step.number}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-base-content mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>{step.title}</h3>
                  <p className="text-base-content/70 text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
            
            <motion.div variants={fadeInUp} className="pt-4 pl-22">
               <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary/10 text-primary font-bold text-lg hover:bg-primary/20 transition-colors" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                  Read our full setup guide
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </a>
            </motion.div>
          </div>

          {/* OBS Animation Graphic */}
          <motion.div 
            className="flex justify-center lg:justify-end relative"
            variants={fadeInUp}
          >
            {/* Ambient glow behind animation */}
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full -z-10" />
            <OBSSetupAnimation />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
