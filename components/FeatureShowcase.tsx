"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ─────────────────────────────────────────────
 * MOBILE LAZY VIDEO CARD
 * Only loads/plays video when scrolled into view
 * ───────────────────────────────────────────── */
function MobileFeatureCard({ feature }: { feature: Feature }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

    useEffect(() => {
        if (inView && videoRef.current && feature.videoSrc) {
            videoRef.current.src = feature.videoSrc;
            videoRef.current.load();
            videoRef.current.play().catch(() => {});
        }
    }, [inView, feature.videoSrc]);

    return (
        <div ref={ref} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#EAD6FF]/60">
            <div className={`relative w-full ${feature.videoBg || "bg-white"}`} style={{ minHeight: feature.animationComponent ? '300px' : 'auto', maxHeight: '60vh' }}>
                {feature.animationComponent ? (
                    <div className="absolute inset-0 w-full h-full">
                        {feature.animationComponent}
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-contain"
                        style={{ maxHeight: '60vh' }}
                    />
                )}
            </div>
            <div className="p-6" style={{ borderLeft: `5px solid ${feature.accentColor}` }}>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    {feature.statusSymbol && (
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                            {feature.statusSymbol}
                        </span>
                    )}
                    {feature.badge && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg text-white" style={{ backgroundColor: feature.accentColor }}>
                            {feature.badge}
                        </span>
                    )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 mb-4">{feature.description}</p>
                <a href="/lab-test" className="inline-flex items-center gap-1.5 text-sm font-bold transition-all" style={{ color: feature.accentColor }}>
                    View performance report →
                </a>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
 * DATA MODEL
 * ───────────────────────────────────────────── */
interface Feature {
    id: string;
    title: string;
    description: string;
    accentColor: string;
    videoSrc?: string;
    animationComponent?: React.ReactNode;
    badge?: string;
    statusSymbol?: string;
    videoFit?: "cover" | "contain";
    zoom?: number;
    videoBg?: string;
    translateY?: string;
}

function SecurityAnimation() {
    const [display, setDisplay] = useState("99.00");

    useEffect(() => {
        let current = 99.00;
        let paused = false;

        const intervalId = setInterval(() => {
            if (paused) return;
            
            current += 0.01;
            if (current >= 99.99) {
                current = 99.99;
                setDisplay("99.99");
                paused = true;
                setTimeout(() => {
                    current = 99.00;
                    paused = false;
                }, 3000);
            } else {
                setDisplay(current.toFixed(2));
            }
        }, 15);
        
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full bg-[#FCFCFD] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.4 }} />
            
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 sm:p-8">
                
                {/* Title */}
                <div className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-4xl font-bold text-[#0B1220] tracking-tight mb-6 sm:mb-8">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0B1220]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Enterprise Security
                </div>

                {/* Animated Shield */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 mb-6 sm:mb-8"
                >
                    <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-indigo-200 flex items-center justify-center bg-indigo-50/50 backdrop-blur-md relative shadow-[0_8px_32px_rgba(79,70,229,0.15)]">
                        <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] z-20"
                        />
                        <svg className="w-10 h-10 sm:w-14 sm:h-14 text-indigo-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ rotate: i * 120 }}
                                animate={{ rotate: i * 120 + 360 }}
                                transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-14px] sm:inset-[-18px] rounded-full border border-dashed border-indigo-200"
                            >
                                <div className="w-2 h-2 bg-indigo-500 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                
                {/* Looping Counter */}
                <motion.div 
                    key={display === "99.99" ? "done" : "counting"}
                    initial={display === "99.99" ? { scale: 1.05 } : { scale: 1 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-[4rem] sm:text-[6rem] lg:text-[7.5rem] font-black tracking-tighter text-[#3B82F6] leading-none"
                    style={{ letterSpacing: '-0.04em' }}
                >
                    {display}%
                </motion.div>
            </div>
        </div>
    );
}

const FEATURES: Feature[] = [
    {
        id: "voices",
        title: "100+ Languages, One Platform",
        description: "Speech-to-speech translation across more than 100 languages, preserving the speaker's natural cadence, tone, and emotional clarity.",
        accentColor: "#394DFE",
        videoSrc: "/videos/90naturalvoices.mp4",
        badge: "100+ Active",
    },
    {
        id: "languages",
        title: "250 Languages and Regional Dialects",
        description: "Full speech-to-speech coverage across 250 languages and regional dialects \u2014 from widely spoken global languages to underrepresented local variants. Every voice is heard, everywhere.",
        accentColor: "#8B5CF6",
        videoSrc: "/videos/250 langugaes and dialects.mp4",
        badge: "250+ Active",
    },
    {
        id: "continuous",
        title: "Continuous Streaming Architecture",
        description: "Eliminates sentence buffering entirely. Translated speech streams in approximately two seconds \u2014 delivering a 10\u00d7 advantage over segmented systems.",
        accentColor: "#0284C7",
        videoSrc: "/videos/continousstreamingarchitecture.mp4",
        badge: "10.2\u00d7 Faster",
    },
    {
        id: "captions",
        title: "Sub-Second Multilingual Captions",
        description: "Live captions appear within one second of speech onset, tested and verified under IEEE 829 and ISO 25010 quality standards.",
        accentColor: "#059669",
        videoSrc: "/videos/subsecond latency.mp4",
        badge: "1.01s TTFC",
    },
    {
        id: "privacy",
        title: "Enterprise-Grade Security",
        description: "Zero-retention processing with end-to-end encryption. No audio is stored, logged, or used for model training. 99.99% uptime SLA.",
        accentColor: "#4F46E5",
        animationComponent: <SecurityAnimation />,
        badge: "ISO 25010",
    },
];


export default function FeatureShowcase() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReduced = useReducedMotion();

    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);

    const active = FEATURES[activeIdx];

    const handleStepChange = useCallback((newIdx: number) => {
        if (newIdx === activeIdx) return;

        const nextFeature = FEATURES[newIdx];
        const nextVideo = activeVideo === "A" ? videoBRef.current : videoARef.current;

        if (nextVideo && nextFeature.videoSrc) {
            nextVideo.src = nextFeature.videoSrc;
            nextVideo.load();
            nextVideo.play().catch(() => {});
        }

        setActiveVideo((prev) => (prev === "A" ? "B" : "A"));
        setActiveIdx(newIdx);
    }, [activeIdx, activeVideo]);

    useEffect(() => {
        if (videoARef.current) {
            videoARef.current.play().catch(() => {});
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const sectionHeight = rect.height;
            const scrollProgress = -rect.top / (sectionHeight - window.innerHeight);
            const clamped = Math.max(0, Math.min(1, scrollProgress));

            const step = Math.min(
                FEATURES.length - 1,
                Math.floor(clamped * FEATURES.length)
            );

            if (step !== activeIdx) {
                handleStepChange(step);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeIdx, handleStepChange]);

    return (
        <>
            {/* DESKTOP: Scrollytelling (lg and above) */}
            <div className="hidden lg:block">
                <div ref={containerRef} className="relative h-[500vh]">
                    <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
                        <section className="w-full py-12 px-6 md:px-12 relative z-10 max-w-7xl mx-auto">
                            <div className="max-w-6xl mx-auto">
                                
                                {/* Section Header */}
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold tracking-widest uppercase">
                                        Platform Capabilities
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
                                        Built for Continuous Speech at Scale
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                    
                                    {/* LEFT: Text Info */}
                                    <div className="space-y-6">
                                        <div className="relative">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={active.id}
                                                    initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: prefersReduced ? 0 : -20 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="space-y-4"
                                                >
                                                    {/* Badge */}
                                                    <div className="flex items-center gap-2">
                                                        {active.badge && (
                                                            <span
                                                                className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                                                                style={{ backgroundColor: active.accentColor }}
                                                            >
                                                                {active.badge}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] leading-snug">
                                                        {active.title}
                                                    </h3>
                                                    <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                                                        {active.description}
                                                    </p>
                                                </motion.div>
                                            </AnimatePresence>

                                            <div className="pt-4">
                                                <a
                                                    href="/lab-test"
                                                    className="inline-flex items-center gap-2 text-sm font-bold transition-all group/link"
                                                    style={{ color: active.accentColor }}
                                                >
                                                    <span>View performance report</span>
                                                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                                </a>
                                            </div>

                                            {/* Progress Indicator */}
                                            <div className="mt-8 flex items-center gap-2">
                                                {FEATURES.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleStepChange(idx)}
                                                        className="h-1.5 rounded-full transition-all duration-300 focus:outline-none"
                                                        style={{
                                                            width: idx === activeIdx ? "36px" : "10px",
                                                            backgroundColor: idx === activeIdx ? active.accentColor : "#CBD5E1",
                                                        }}
                                                        aria-label={`Go to feature ${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT: Video Stage */}
                                    <div className="relative w-full aspect-[4/3]">
                                        {/* Progress Counter */}
                                        <div className="absolute -top-8 left-0 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Capability {String(activeIdx + 1).padStart(2, "0")} / {String(FEATURES.length).padStart(2, "0")}
                                        </div>

                                        {/* Blob Background */}
                                        <div
                                            className="showcase-blob absolute -inset-32 rounded-[60px] transition-all duration-700 ease-out pointer-events-none"
                                            style={{
                                                background: `radial-gradient(ellipse at 50% 40%, ${active.accentColor}40 0%, ${active.accentColor}20 35%, transparent 75%)`,
                                            }}
                                        />

                                        {/* Video Container */}
                                        <div className={`relative z-10 w-full h-full rounded-[24px] overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.12)] ring-1 ring-slate-900/5 ${active.videoBg || "bg-white"}`}>
                                            
                                            {/* Custom Animation Overlay */}
                                            <div 
                                                className="absolute inset-0 transition-opacity duration-700 ease-out z-30 bg-white"
                                                style={{ opacity: active.animationComponent ? 1 : 0, pointerEvents: active.animationComponent ? 'auto' : 'none' }}
                                            >
                                                {active.animationComponent}
                                            </div>
                                            <video
                                                ref={videoARef}
                                                src={FEATURES[0].videoSrc}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                                                style={{
                                                    opacity: activeVideo === "A" ? 1 : 0,
                                                    zIndex: activeVideo === "A" ? 20 : 10,
                                                }}
                                            />
                                            <video
                                                ref={videoBRef}
                                                src={FEATURES[1].videoSrc}
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                                                style={{
                                                    opacity: activeVideo === "B" ? 1 : 0,
                                                    zIndex: activeVideo === "B" ? 20 : 10,
                                                }}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* MOBILE: Simple Vertical List */}
            <section className="block lg:hidden py-12 px-6 relative overflow-hidden bg-slate-50">
                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <div className="text-center mb-8 space-y-2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold tracking-widest uppercase">
                            Platform Capabilities
                        </div>
                        <h2 className="text-2xl font-extrabold text-[#0B1220]">
                            Built for Continuous Speech at Scale
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {FEATURES.map((feature) => (
                            <MobileFeatureCard key={feature.id} feature={feature} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
