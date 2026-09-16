import os

content = '''"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function ChurchTranslationIntro() {
  return (
    <section className="py-12 md:py-20 bg-white relative">
      <div className="layout-spine max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-xl shadow-slate-200/40 p-10 md:p-14 text-center"
        >
          {/* Subtle background glow */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full h-[150%] max-w-[600px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm border border-blue-100/50">
              ⛪
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-base-ink mb-6 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              A Church Translation System Built for Live Services
            </h2>
            <p className="text-lg md:text-xl text-base-muted leading-relaxed max-w-3xl mx-auto">
              Traditional church translation systems often require interpreters, wireless receivers, transmitters, translation booths, or dedicated translation equipment. <strong className="text-base-ink font-semibold">Exbabel delivers translated speech and captions through the devices attendees already carry</strong>, allowing churches to translate sermons and services without distributing specialized hardware.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
'''
with open('/home/jkang1643/projects/exbabel/components/ChurchTranslationIntro.tsx', 'w', encoding='utf-8') as f:
    f.write(content)