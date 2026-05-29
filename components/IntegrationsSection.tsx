'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DecorativeWisp from '@/components/DecorativeWisp';

const integrations = [
  { 
    name: 'OBS Studio', 
    desc: 'Native integration with open-source broadcasting.',
    icon: (
      <svg className="w-8 h-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ) 
  },
  { 
    name: 'vMix / Wirecast', 
    desc: 'Professional video production software support.',
    icon: (
      <svg className="w-8 h-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    )
  },
  { 
    name: 'YouTube Live', 
    desc: 'Stream directly to your YouTube channel.',
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    )
  },
  { 
    name: 'Facebook Live', 
    desc: 'Reach your Facebook community instantly.',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    )
  },
  { 
    name: 'RTMP Encoders', 
    desc: 'Compatible with Resi, Teradek, and hardware encoders.',
    icon: (
      <svg className="w-8 h-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    )
  },
  { 
    name: 'HLS Playback', 
    desc: 'Output to your website or custom church apps.',
    icon: (
      <svg className="w-8 h-8 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }
];

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1 }
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function IntegrationsSection() {
  return (
    <section className="py-24 px-6 relative z-10 bg-slate-50 overflow-hidden">
      <DecorativeWisp className="absolute top-0 right-0 w-[600px] h-[600px] -z-10 opacity-30 rotate-12" colorPrimary="#D6F5FF" colorSecondary="#EAD6FF" delay={2} />
      <DecorativeWisp className="absolute bottom-0 left-0 w-[600px] h-[600px] -z-10 opacity-20 -rotate-12" colorPrimary="#FFD6E5" colorSecondary="#FFF7D1" delay={4} />
      
      <motion.div className="max-w-7xl mx-auto" initial="initial" whileInView="whileInView" variants={staggerContainer}>
        <div className="text-center mb-16 space-y-4">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-base-content tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
            Works With Your Setup
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-base-content/70 max-w-2xl mx-auto font-medium">
            We integrate natively with your existing livestreaming infrastructure. Connect Exbabel to your encoders and platforms in minutes, not months.
          </motion.p>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 ring-1 ring-slate-100 group-hover:bg-primary/5 group-hover:ring-primary/20 transition-colors">
                {integration.icon}
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>{integration.name}</h3>
              <p className="text-base-content/70">{integration.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
