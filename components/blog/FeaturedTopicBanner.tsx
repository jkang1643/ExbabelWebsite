"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedTopicBanner() {
  return (
    <section className="w-full py-8 sm:py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Large 50/50 Split Container with pale brand background & 36px rounded corners */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#E8F8B6] border border-[#d9ec9c] flex flex-col lg:flex-row items-stretch min-h-[440px] shadow-sm hover:shadow-xl transition-shadow"
        >
          {/* Left: Art-Directed Fluid Glass with Animated Live Equalizer Waves */}
          <div className="lg:w-1/2 relative bg-gradient-to-tr from-[#99E3D8] via-[#B5F1D3] to-[#C9F8B5] p-8 sm:p-12 flex items-center justify-center overflow-hidden min-h-[320px] lg:min-h-auto">
            {/* Ambient Refraction Elements */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white/40 blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-cyan-200/50 blur-3xl"
            />
            
            {/* Dynamic Glass Wave Visual with Floating Motion */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-md aspect-[1.3/1] rounded-[28px] bg-white/40 backdrop-blur-md border border-white/70 p-6 flex flex-col justify-between shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-slate-800 text-xs font-semibold shadow-xs">
                  <span className="text-sm text-emerald-600 animate-spin">✦</span>
                  <span>Audio & Caption Engine</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-800 bg-white/60 px-2 py-0.5 rounded-md">
                  1.013s
                </span>
              </div>

              {/* Rhythmic Animated Equalizer Audio Bars (5x Motion) */}
              <div className="flex items-end justify-center gap-2.5 h-20 py-2">
                {[0.4, 0.9, 0.6, 1.0, 0.7, 0.3, 0.85, 0.5, 0.95, 0.4].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scaleY: [h * 0.3, h * 1.3, h * 0.5, h * 1.1, h * 0.3],
                    }}
                    transition={{
                      duration: 1.4 + (i % 3) * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                    className="w-2.5 rounded-full bg-slate-900 origin-bottom"
                    style={{ height: "100%" }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-800 font-medium pt-2 border-t border-slate-900/10">
                <span className="font-bold">180+ Languages</span>
                <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  Active Live Stream
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-700 uppercase mb-4">
              CHURCH TRANSLATION HUB
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-950 tracking-tight leading-[1.12] mb-5">
              Everything you need to know about AI translation for churches
            </h2>

            <p className="text-slate-800 text-base sm:text-lg mb-8 leading-relaxed max-w-lg font-normal">
              Explore our complete knowledge hub covering sermon audio streams, member phone access, AV mixer routing, livestream integration, and multilingual worship.
            </p>

            <div>
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="w-fit"
              >
                <Link
                  href="/blog/category/church-translation"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-md"
                >
                  Explore Church Translation →
                </Link>
              </motion.div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
