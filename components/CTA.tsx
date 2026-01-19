"use client";

import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";
import { AuroraButton } from "./AuroraButton";

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      {/* Aurora Background Layer for CTA */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-base-paper/50" />
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-aurora-purple/40 rounded-full blur-aurora-ambient -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-aurora-mint/40 rounded-full blur-aurora-ambient translate-y-1/2 pointer-events-none" />

      <div className="layout-spine relative z-10 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-base-ink"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-sora), sans-serif' }}
        >
          Supercharge your communication <br /> with AI today!
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-base-muted max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-sora), sans-serif' }}
        >
          Start translating for free with 4 hours of live translation. Join thousands who are breaking down barriers and building connections.
        </motion.p>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block" onClick={() => window.location.href = appRoutes.demo}>
            <AuroraButton variant="primary">
              Get Started Free
            </AuroraButton>
          </div>
        </motion.div>

        {/* Checkmarks */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-20 text-[15px] font-bold text-base-ink/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            "No credit card required",
            "Free forever plan",
            "Cancel anytime"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-aurora-mint/50 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-6 rounded-aurora-xl bg-white/60 backdrop-blur-md border border-aurora-subtle shadow-aurora-card hover:shadow-aurora-hover transition-all duration-aurora-standard relative group overflow-hidden">
            {/* Hover Gradient Blob */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-aurora-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 space-y-1">
              <div className="text-4xl md:text-5xl font-black tabular-nums tracking-tight text-base-ink">2,847</div>
              <div className="text-[13px] font-extrabold text-base-muted uppercase tracking-[0.2em]">Active Sessions</div>
            </div>

            <div className="relative z-10 space-y-1 md:border-x border-aurora-subtle">
              <div className="text-4xl md:text-5xl font-black tabular-nums tracking-tight text-base-ink">150+</div>
              <div className="text-[13px] font-extrabold text-base-muted uppercase tracking-[0.2em]">Languages</div>
            </div>

            <div className="relative z-10 space-y-1">
              <div className="text-4xl md:text-5xl font-black tabular-nums tracking-tight text-base-ink">99.9%</div>
              <div className="text-[13px] font-extrabold text-base-muted uppercase tracking-[0.2em]">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
