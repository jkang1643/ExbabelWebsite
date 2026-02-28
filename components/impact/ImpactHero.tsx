"use client";

import React, { useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import LightAuroraBackground from "../LightAuroraBackground";
import { TOTAL_COUNTRIES } from "@/lib/countriesData";

interface StatCardProps {
    value: number;
    suffix: string;
    label: string;
    sublabel: string;
    delay: number;
    inView: boolean;
    accentColor: string;
    isDecimal?: boolean;
}

const StatCard = ({ value, suffix, label, sublabel, delay, inView, accentColor, isDecimal }: StatCardProps) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (inView) {
            const controls = animate(0, value, {
                duration: 2.4,
                ease: "easeOut",
                delay,
                onUpdate: (latest) => {
                    if (ref.current) {
                        ref.current.textContent = isDecimal
                            ? latest.toFixed(1)
                            : Math.round(latest).toLocaleString();
                    }
                },
            });
            return () => controls.stop();
        } else {
            node.textContent = "0";
        }
    }, [inView, value, delay, isDecimal]);

    return (
        <motion.div
            className="relative flex flex-col items-center text-center px-6 py-8 md:py-12"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
        >
            {/* Number */}
            <div className="flex items-baseline gap-1">
                <span
                    ref={ref}
                    className="text-[64px] md:text-[88px] font-extrabold leading-[1] tracking-tight"
                    style={{ color: accentColor }}
                >
                    0
                </span>
                <span
                    className="text-[40px] md:text-[56px] font-bold leading-[1]"
                    style={{ color: accentColor }}
                >
                    {suffix}
                </span>
            </div>

            {/* Label */}
            <p className="text-lg md:text-xl font-semibold text-base-ink mt-4">
                {label}
            </p>
            <p className="text-sm md:text-base text-base-muted mt-1 max-w-[260px]">
                {sublabel}
            </p>
        </motion.div>
    );
};

export default function ImpactHero() {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    return (
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
            <LightAuroraBackground />

            <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Eyebrow */}
                <motion.div
                    className="text-center mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide">
                        🌍 GLOBAL IMPACT
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="text-center text-4xl md:text-6xl font-extrabold text-base-ink tracking-tight leading-[1.1] mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Breaking Language Barriers{" "}
                    <br className="hidden md:block" />
                    Across the Globe
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-center text-lg md:text-xl text-base-muted max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Exbabel supports{" "}
                    <span className="font-semibold text-base-ink">196 countries</span>,{" "}
                    <span className="font-semibold text-base-ink">~90% of all nations</span>, and{" "}
                    <span className="font-semibold text-base-ink">99.9% of world population</span>{" "}
                    — real-time AI translation everywhere people need it.
                </motion.p>

                {/* Stats Row — 4 stats */}
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 max-w-6xl mx-auto">
                    <StatCard
                        value={TOTAL_COUNTRIES}
                        suffix=""
                        label="Countries"
                        sublabel="Every nation on Earth represented"
                        delay={0.2}
                        inView={inView}
                        accentColor="#7C3AED"
                    />
                    <div className="hidden md:block absolute left-1/4 top-[30%] bottom-[30%] w-px bg-gradient-to-b from-transparent via-slate-300/40 to-transparent" />
                    <StatCard
                        value={99.9}
                        suffix="%"
                        label="World Population"
                        sublabel="Of Earth&apos;s population covered"
                        delay={0.35}
                        inView={inView}
                        accentColor="#059669"
                        isDecimal
                    />
                    <div className="hidden md:block absolute left-2/4 top-[30%] bottom-[30%] w-px bg-gradient-to-b from-transparent via-slate-300/40 to-transparent" />
                    <StatCard
                        value={90}
                        suffix="+"
                        label="Languages with Voices"
                        sublabel="Natural AI-powered TTS across all tiers"
                        delay={0.5}
                        inView={inView}
                        accentColor="#2563EB"
                    />
                    <div className="hidden md:block absolute left-3/4 top-[30%] bottom-[30%] w-px bg-gradient-to-b from-transparent via-slate-300/40 to-transparent" />
                    <StatCard
                        value={6700}
                        suffix="+"
                        label="AI Voice Models"
                        sublabel="Gemini, Chirp3 HD, Standard, ElevenLabs"
                        delay={0.65}
                        inView={inView}
                        accentColor="#DC2626"
                    />
                </div>
            </div>
        </section>
    );
}
