"use client";

import React, { useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface StatItemProps {
    value: number;
    suffix?: string;
    prefix?: string;
    description: React.ReactNode;
    statusSymbol: string;
    delay?: number;
    inView: boolean;
}

const StatItem = ({ value, suffix = "", prefix = "", description, statusSymbol, delay = 0, inView }: StatItemProps) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (inView) {
            const controls = animate(0, value, {
                duration: 2,
                ease: "easeOut",
                delay: delay,
                onUpdate: (latest) => {
                    if (ref.current) {
                        ref.current.textContent = Math.round(latest).toString();
                    }
                },
            });

            return () => controls.stop();
        } else {
            node.textContent = "0";
        }
    }, [inView, value, delay]);

    return (
        <motion.div
            className="mobile-fade-up flex flex-col space-y-3 bg-[#F8F9FA] p-8 rounded-3xl border border-[#EAD6FF]/80 shadow-sm text-center"
            initial={{ y: 30 }}
            animate={inView ? { y: 0 } : { y: 30 }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        >
            <div className="mobile-fade-up inline-block mx-auto">
                <span className="mobile-fade-up text-[10px] font-semibold px-2.5 py-1 rounded bg-[#0B1220] text-[#D6F5FF] tracking-wide uppercase">
                    {statusSymbol}
                </span>
            </div>
            <div className="mobile-fade-up flex items-baseline justify-center text-5xl md:text-6xl font-extrabold text-[#394dfe] font-sans">
                {prefix && <span>{prefix}</span>}
                <span ref={ref}>0</span>
                {suffix && <span>{suffix}</span>}
            </div>
            <p className="mobile-fade-up text-sm md:text-base font-semibold leading-relaxed text-slate-700 max-w-[280px] mx-auto">
                {description}
            </p>
        </motion.div>
    );
};

export default function ImpactStats() {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    return (
        <section ref={ref} className="mobile-fade-up py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="mobile-fade-up max-w-[1200px] mx-auto px-6 md:px-12 text-center space-y-16">
                
                {/* Header */}
                <div className="mobile-fade-up max-w-3xl mx-auto space-y-4">
                    <div className="mobile-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold tracking-widest uppercase">
                        Performance
                    </div>
                    <h2 className="mobile-fade-up text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight">
                        Measured. Verified. Proven.
                    </h2>
                    <p className="mobile-fade-up text-base sm:text-lg text-slate-600 leading-relaxed">
                        Platform performance benchmarked under IEEE 829 and ISO 25010 testing standards.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mobile-fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatItem
                        value={10}
                        suffix="×"
                        statusSymbol="10.2× Advantage"
                        description="Continuous speed advantage during live speech vs buffered systems"
                        delay={0.1}
                        inView={inView}
                    />
                    <StatItem
                        value={1}
                        suffix="s"
                        statusSymbol="1.01s TTFC"
                        description="Time to first caption onset from live speech"
                        delay={0.2}
                        inView={inView}
                    />
                    <StatItem
                        value={100}
                        suffix="+"
                        statusSymbol="100+ Languages"
                        description="Multilingual speech-to-speech translation languages supported"
                        delay={0.3}
                        inView={inView}
                    />
                    <StatItem
                        value={99}
                        suffix="%"
                        statusSymbol="ISO Verified"
                        description="Contextual decibel and acoustic translation accuracy"
                        delay={0.4}
                        inView={inView}
                    />
                </div>
            </div>
        </section>
    );
}
