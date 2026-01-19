"use client";

import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";
import { AuroraButton } from "./AuroraButton";

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-24 pb-20">
      {/* Aurora Ambient Blobs (Local reinforcement for Hero) */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-aurora-purple/30 rounded-full blur-aurora-hero pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-aurora-mint/30 rounded-full blur-aurora-hero pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-left"
          >
            <motion.div
              className="text-eyebrow mb-4 tracking-widest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              REAL-TIME AI TRANSLATION
            </motion.div>

            <motion.h1
              className="text-h1 mb-6 text-base-ink"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Translate your conversations into{" "}
              <span className="bg-gradient-to-r from-aurora-purple via-aurora-pink to-aurora-mint bg-clip-text text-transparent drop-shadow-sm filter backdrop-brightness-75">
                180+ languages
              </span>{" "}
              in real-time
            </motion.h1>

            <motion.p
              className="text-body mb-8 max-w-lg text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Break down language barriers with AI-powered translation that understands context, culture, and nuance.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="contents" onClick={() => window.location.href = appRoutes.demo}>
                <AuroraButton variant="primary">
                  Try for Free
                </AuroraButton>
              </div>
              <div className="contents" onClick={() => window.location.href = appRoutes.demo}>
                <AuroraButton variant="ghost">
                  Request a Demo
                </AuroraButton>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 text-sm text-base-muted flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free forever plan
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Floating Cards */}
          <motion.div
            className="relative h-[600px] hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Stats Card - Top Left */}
            <motion.div
              className="absolute top-0 left-0 bg-white/70 backdrop-blur-xl shadow-aurora-card border border-aurora-subtle rounded-aurora-xl w-48"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "var(--shadow-aurora-hover)" }}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-purple to-aurora-pink flex items-center justify-center">
                    <svg className="w-4 h-4 text-base-ink opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-base-ink">180+</div>
                <div className="text-xs text-base-muted">Languages Supported</div>
              </div>
            </motion.div>

            {/* Accuracy Card - Top Right */}
            <motion.div
              className="absolute top-12 right-0 bg-white/70 backdrop-blur-xl shadow-aurora-card border border-aurora-subtle rounded-aurora-xl w-48"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "var(--shadow-aurora-hover)" }}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-mint to-blue-200 flex items-center justify-center">
                    <svg className="w-4 h-4 text-base-ink opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-base-ink">98%</div>
                <div className="text-xs text-base-muted">Translation Accuracy</div>
              </div>
            </motion.div>

            {/* Main Chat Card - Center */}
            <motion.div
              className="absolute top-32 left-8 bg-white/80 backdrop-blur-xl shadow-aurora-card border border-aurora-default rounded-aurora-xl w-80"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ y: -5, boxShadow: "var(--shadow-aurora-hover)" }}
            >
              <div className="p-5">
                <h3 className="font-semibold text-base-ink mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Live Translation
                </h3>
                <div className="space-y-3">
                  <div className="bg-aurora-purple/20 rounded-2xl p-3 border border-aurora-purple/10">
                    <div className="text-xs text-base-muted mb-1">English</div>
                    <div className="text-sm text-base-ink">Welcome to our event today!</div>
                  </div>
                  <div className="bg-aurora-pink/20 rounded-2xl p-3 border border-aurora-pink/10">
                    <div className="text-xs text-base-muted mb-1">Español</div>
                    <div className="text-sm text-base-ink">¡Bienvenidos a nuestro evento hoy!</div>
                  </div>
                  <div className="bg-aurora-mint/20 rounded-2xl p-3 border border-aurora-mint/10">
                    <div className="text-xs text-base-muted mb-1">日本語</div>
                    <div className="text-sm text-base-ink">今日のイベントへようこそ！</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Performance Card - Bottom Left */}
            <motion.div
              className="absolute bottom-0 left-0 bg-white/70 backdrop-blur-xl shadow-aurora-card border border-aurora-subtle rounded-aurora-xl w-56"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              whileHover={{ scale: 1.05, y: 5, boxShadow: "var(--shadow-aurora-hover)" }}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-semibold text-base-ink">Translations</div>
                  <div className="badge bg-emerald-100 text-emerald-700 border-none badge-sm">+12%</div>
                </div>
                <div className="text-2xl font-bold text-base-ink mb-2">10M+</div>
                <div className="flex gap-1 h-12 items-end">
                  {[40, 70, 45, 80, 60, 90, 75].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-aurora-purple to-aurora-pink rounded-aurora-sm opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* User Count Card - Bottom Right */}
            <motion.div
              className="absolute bottom-12 right-4 bg-white/70 backdrop-blur-xl shadow-aurora-card border border-aurora-subtle rounded-aurora-xl w-44"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{ scale: 1.05, boxShadow: "var(--shadow-aurora-hover)" }}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full bg-aurora-purple flex items-center justify-center text-xs text-base-ink font-bold border border-white">A</div>
                    </div>
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full bg-aurora-mint flex items-center justify-center text-xs text-base-ink font-bold border border-white">B</div>
                    </div>
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full bg-aurora-pink flex items-center justify-center text-xs text-base-ink font-bold border border-white">C</div>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-base-ink">Active Users</div>
                <div className="text-xs text-base-muted">Unlimited connections</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>

  );
}

