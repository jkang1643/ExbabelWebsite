"use client";

import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-base-100 via-blue-50/30 to-sky-50/30 overflow-hidden pt-24 pb-20">
      {/* Soft gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-sky-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.h1 
              className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-neutral leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Translate your conversations into{" "}
              <span className="bg-gradient-to-r from-error via-warning via-success via-info to-primary bg-clip-text text-transparent">
                150+ languages
              </span>{" "}
              in real-time
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl text-neutral mb-8 leading-relaxed"
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
              <a href={appRoutes.demo} className="btn btn-primary btn-lg rounded-full px-8 shadow-lg hover:shadow-xl border-none">
                Try for Free
              </a>
              <a href={appRoutes.demo} className="btn btn-outline btn-lg rounded-full px-8">
                Request a Demo
              </a>
            </motion.div>

            <motion.div 
              className="mt-8 text-sm text-neutral/70 flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
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
              className="absolute top-0 left-0 card bg-white/80 backdrop-blur-xl shadow-xl border border-primary/10 w-48"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="card-body p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-xs text-neutral">Languages Supported</div>
              </div>
            </motion.div>

            {/* Accuracy Card - Top Right */}
            <motion.div
              className="absolute top-12 right-0 card bg-white/80 backdrop-blur-xl shadow-xl border border-accent/10 w-48"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="card-body p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-xs text-neutral">Translation Accuracy</div>
              </div>
            </motion.div>

            {/* Main Chat Card - Center */}
            <motion.div
              className="absolute top-32 left-8 card bg-white/90 backdrop-blur-xl shadow-2xl border border-primary/10 w-80"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ y: -5 }}
            >
              <div className="card-body p-5">
                <h3 className="font-semibold text-neutral mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  Live Translation
                </h3>
                <div className="space-y-3">
                  <div className="bg-primary/5 rounded-2xl p-3">
                    <div className="text-xs text-neutral mb-1">English</div>
                    <div className="text-sm">Welcome to our event today!</div>
                  </div>
                  <div className="bg-accent/5 rounded-2xl p-3">
                    <div className="text-xs text-neutral mb-1">Español</div>
                    <div className="text-sm">¡Bienvenidos a nuestro evento hoy!</div>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-3">
                    <div className="text-xs text-neutral mb-1">日本語</div>
                    <div className="text-sm">今日のイベントへようこそ！</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Performance Card - Bottom Left */}
            <motion.div
              className="absolute bottom-0 left-0 card bg-gradient-to-br from-primary/10 to-blue-100/50 backdrop-blur-xl shadow-xl border border-primary/20 w-56"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              whileHover={{ scale: 1.05, y: 5 }}
            >
              <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-semibold text-neutral">Translations</div>
                  <div className="badge badge-success badge-sm">+12%</div>
                </div>
                <div className="text-2xl font-bold text-primary mb-2">10M+</div>
                <div className="flex gap-1 h-12 items-end">
                  {[40, 70, 45, 80, 60, 90, 75].map((height, i) => (
                    <div 
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-sm"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* User Count Card - Bottom Right */}
            <motion.div
              className="absolute bottom-12 right-4 card bg-white/80 backdrop-blur-xl shadow-xl border border-blue-200 w-44"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="card-body p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="avatar-group -space-x-3">
                      <div className="avatar w-6">
                        <div className="bg-gradient-to-br from-primary to-secondary rounded-full" />
                      </div>
                      <div className="avatar w-6">
                        <div className="bg-gradient-to-br from-accent to-blue-600 rounded-full" />
                      </div>
                      <div className="avatar w-6">
                        <div className="bg-gradient-to-br from-info to-secondary rounded-full" />
                      </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-neutral">Active Users</div>
                <div className="text-xs text-neutral">Unlimited connections</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

