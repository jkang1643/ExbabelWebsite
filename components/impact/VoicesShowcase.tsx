"use client";

import React, { useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { VOICE_TIERS, type VoiceTier } from "@/lib/countriesData";
import DarkAuroraBackground from "../DarkAuroraBackground";

/* ─────────────────────────────────────────────
 * Animated Progress Bar
 * ───────────────────────────────────────────── */
const AnimatedBar = ({ percentage, color, inView, delay }: { percentage: number; color: string; inView: boolean; delay: number }) => {
    return (
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${percentage}%` } : { width: 0 }}
                transition={{ duration: 1.2, delay, ease: "easeOut" }}
            />
        </div>
    );
};

/* ─────────────────────────────────────────────
 * Voice Tier Card
 * ───────────────────────────────────────────── */
const TierCard = ({ tier, index, inView }: { tier: VoiceTier; index: number; inView: boolean }) => {
    const countRef = useRef<HTMLSpanElement>(null);
    const delay = 0.15 + index * 0.1;

    useEffect(() => {
        const node = countRef.current;
        if (!node) return;

        if (inView) {
            const controls = animate(0, tier.languageCount, {
                duration: 1.8,
                ease: "easeOut",
                delay,
                onUpdate: (latest) => {
                    if (countRef.current) {
                        countRef.current.textContent = Math.round(latest).toString();
                    }
                },
            });
            return () => controls.stop();
        } else {
            node.textContent = "0";
        }
    }, [inView, tier.languageCount, delay]);

    // Calculate percentage relative to maximum (87 Gemini languages)
    const percentage = (tier.languageCount / 87) * 100;

    const qualityBadgeColor: Record<string, string> = {
        "Highest": "bg-purple-500/20 text-purple-300 border-purple-500/30",
        "Premium": "bg-blue-500/20 text-blue-300 border-blue-500/30",
        "Standard": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        "Ultra-Premium": "bg-red-500/20 text-red-300 border-red-500/30",
        "Fast": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay }}
            className="relative group"
        >
            <div className="relative bg-white/[0.06] backdrop-blur-sm rounded-2xl border border-white/10 
                      p-6 hover:bg-white/[0.10] hover:border-white/20 transition-all duration-300 h-full">
                {/* Accent line */}
                <div
                    className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60"
                    style={{ backgroundColor: tier.accentColor }}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-4 mt-2">
                    <div>
                        <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                        <p className="text-xs text-white/50 font-medium">{tier.provider}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${qualityBadgeColor[tier.quality] || ""}`}>
                        {tier.quality}
                    </span>
                </div>

                {/* Language count */}
                <div className="flex items-baseline gap-1 mb-2">
                    <span
                        ref={countRef}
                        className="text-3xl font-extrabold"
                        style={{ color: tier.accentColor }}
                    >
                        0
                    </span>
                    <span className="text-sm text-white/60 font-medium">languages</span>
                </div>

                {/* Progress bar */}
                <AnimatedBar percentage={percentage} color={tier.accentColor} inView={inView} delay={delay + 0.3} />

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed mt-4">
                    {tier.description}
                </p>
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
 * Main Component
 * ───────────────────────────────────────────── */
export default function VoicesShowcase() {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: false });

    return (
        <section ref={ref} className="relative bg-[#0F0B15] py-24 md:py-32 overflow-hidden">
            <DarkAuroraBackground />

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-bold mb-4 border border-white/10">
                        🔊 VOICES SHOWCASE
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                        6,700+ Natural AI Voices
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        We leverage the world&apos;s best text-to-speech engines for studio-quality, lifelike
                        speech synthesis in every supported language.
                    </p>
                </motion.div>

                {/* Tier Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {VOICE_TIERS.map((tier, idx) => (
                        <TierCard key={tier.name} tier={tier} index={idx} inView={inView} />
                    ))}
                </div>

                {/* Bottom note */}
                <motion.p
                    className="text-center text-sm text-white/40 mt-12 max-w-xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1 }}
                >
                    Voice availability varies by language. All listed countries receive translation support.
                    Voice support powered by Gemini (87 languages), ElevenLabs (75), and Google Standard (60).
                </motion.p>
            </div>
        </section>
    );
}
