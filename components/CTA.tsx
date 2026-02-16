"use client";

import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-[#4F46E5] via-[#E11D48] to-[#0D9488]">
      {/* Animated gradient blobs for depth */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="showcase-blob absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[60px] md:blur-[120px] opacity-50"
          style={{ background: 'radial-gradient(circle, #818CF850 0%, #818CF825 50%, transparent 70%)' }} />
        <div className="showcase-blob absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[60px] md:blur-[120px] opacity-45"
          style={{ background: 'radial-gradient(circle, #14B8A645 0%, #14B8A622 50%, transparent 70%)', animationDelay: '5s' }} />
        <div className="showcase-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full blur-[80px] md:blur-[140px] opacity-40"
          style={{ background: 'radial-gradient(circle, #FB718540 0%, #FB718520 50%, transparent 70%)', animationDelay: '10s' }} />
      </div>

      <div className="layout-spine relative z-10 text-center text-white">
        <motion.h2
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-sora), sans-serif' }}
        >
          Supercharge your communication <br /> with AI today!
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-sora), sans-serif' }}
        >
          Join 500+ churches breaking down barriers and building connections. Start your 30-day free trial today — no credit card required.
        </motion.p>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a
            href={appRoutes.pricingStarter}
            className="inline-block px-12 py-4 bg-white text-primary text-lg font-extrabold rounded-full hover:shadow-[0_8px_30px_rgba(255,255,255,0.4)] transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
            style={{ fontFamily: 'var(--font-sora), sans-serif' }}
          >
            Start Your Free Trial
          </a>
        </motion.div>

        {/* Checkmarks */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-20 text-[15px] font-bold text-white/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            "No credit card required",
            "30-day money-back guarantee",
            "Cancel anytime — no questions asked"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {text}
            </div>
          ))}
        </motion.div>

        {/* Stats Box - Glassmorphism */}
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-6 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl relative group overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-1">
              <div className="text-4xl md:text-5xl font-black tabular-nums tracking-tight">2,847</div>
              <div className="text-[13px] font-extrabold text-white/60 uppercase tracking-[0.2em]">Active Sessions</div>
            </div>

            <div className="relative z-10 space-y-1 md:border-x border-white/10">
              <div className="text-4xl md:text-5xl font-black tabular-nums tracking-tight">180+</div>
              <div className="text-[13px] font-extrabold text-white/60 uppercase tracking-[0.2em]">Languages</div>
            </div>

            <div className="relative z-10 space-y-1">
              <div className="text-4xl md:text-5xl font-black tabular-nums tracking-tight">99.9%</div>
              <div className="text-[13px] font-extrabold text-white/60 uppercase tracking-[0.2em]">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
