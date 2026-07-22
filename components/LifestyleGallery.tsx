"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LifestyleGallery() {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="layout-spine max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Real Live Events &amp; Ministries
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-300 text-base md:text-lg font-medium"
          >
            Trusted in auditoriums, houses of worship, global summits, and live broadcasts worldwide.
          </motion.p>
        </div>

        {/* 2 Lifestyle Photos Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Photo 1: Conference Auditorium Audience */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group aspect-[4/3]"
          >
            <Image
              src="/photos/lifestyle_conference_audience.png"
              alt="International Conference Audience in Auditorium"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-8">
              <span className="text-xs font-black uppercase tracking-widest text-primary mb-1">Global Summits</span>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                Multi-Language Audience Distribution
              </h3>
              <p className="text-sm text-slate-300 font-medium">
                Thousands of attendees listen simultaneously in their preferred language over high-density Wi-Fi or cellular networks.
              </p>
            </div>
          </motion.div>

          {/* Photo 2: Church Live Translation & Choir */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group aspect-[4/3]"
          >
            <Image
              src="/photos/lifestyle_church_live_translation.png"
              alt="Live Worship Team Stage and AV Operator Control"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-8">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">Houses of Worship</span>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                Live Worship &amp; Sermon Captions
              </h3>
              <p className="text-sm text-slate-300 font-medium">
                AV teams manage multi-channel AI dubbing and real-time caption overlays directly from an iPad console.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
