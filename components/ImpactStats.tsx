"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import LightAuroraBackground from "./LightAuroraBackground";

interface StatItemProps {
    value: number;
    suffix?: string;
    description: React.ReactNode;
    delay?: number;
    inView: boolean;
}

const StatItem = ({ value, suffix = "", description, delay = 0, inView }: StatItemProps) => {
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
            // Reset when out of view to ensure re-trigger works
            node.textContent = "0";
        }
    }, [inView, value, delay]);

    return (
        <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        >
            <div className="flex items-baseline justify-center text-[80px] leading-[1] md:text-[90px] font-bold text-primary font-sans">
                <span ref={ref}>0</span>
                {suffix && <span>{suffix}</span>}
            </div>
            <p className="text-[18px] md:text-[20px] font-medium leading-[1.5] text-base-content/90 max-w-[300px] mx-auto">
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
        <section className="relative py-32 md:py-40">
            <LightAuroraBackground />
            {/* Upward-curved white divider at the top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
                <svg
                    className="relative block w-full h-[60px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 60"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,60 Q600,0 1200,60 V0 H0 Z"
                        fill="#FFFFFF"
                    ></path>
                </svg>
            </div>

            <div ref={ref} className="container mx-auto px-4 text-center relative z-10">
                <motion.h2
                    className="text-3xl md:text-5xl font-bold text-base-content mb-20 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    We’re in the business of <br className="hidden md:block" /> removing language barriers.
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full max-w-6xl mx-auto">
                    {/* Stat 1 */}
                    <StatItem
                        value={90}
                        suffix="%"
                        description={
                            <>
                                of listeners say Exbabel helps them understand live speech in real time
                            </>
                        }
                        inView={inView}
                        delay={0.1}
                    />

                    {/* Stat 2 */}
                    <StatItem
                        value={250}
                        suffix="+"
                        description={
                            <>
                                supported languages including regional variants and dialects
                            </>
                        }
                        inView={inView}
                        delay={0.3}
                    />

                    {/* Stat 3 */}
                    <StatItem
                        value={87}
                        suffix="%"
                        description={
                            <>
                                of organizations say Exbabel helps them reach more people
                            </>
                        }
                        inView={inView}
                        delay={0.5}
                    />
                </div>
            </div>

            {/* Optional: We can keep the bottom divider if needed for the next section, 
          but the prompt only specified the top one. Current implementation had a bottom one.
          I'll leave the bottom simple or clean to let the next section start naturally?
          Or add a simple bottom curve? The prompt says "transition from the previous white section" via top divider.
          It does not specify bottom. I will omit the bottom divider to strictly follow "a Stats component" instructions 
          unless it looks broken. Given "High fidelity", usually we want smooth exit too.
          But I will stick to the requested top divider.
      */}
        </section>
    );
}
