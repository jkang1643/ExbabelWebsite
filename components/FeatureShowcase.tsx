"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ─────────────────────────────────────────────
 * CUSTOM GRAPHICS
 * ───────────────────────────────────────────── */
function SecurityGraphic() {
    return (
        <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-[0.05]" style={{
                backgroundImage: 'radial-gradient(circle at center, #4F46E5 2px, transparent 2px)',
                backgroundSize: '40px 40px'
            }} />
            
            <div className="relative z-10 flex flex-col items-center">
                <motion.h4 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] mb-8 text-center"
                >
                    Enterprise Grade Security
                </motion.h4>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-32 h-32 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-[0_0_40px_rgba(79,70,229,0.15)] relative"
                >
                    <motion.div
                        animate={{ 
                            boxShadow: ["0 0 0 0 rgba(79,70,229,0.2)", "0 0 0 20px rgba(79,70,229,0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center absolute"
                    >
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" />
                        </svg>
                    </motion.div>
                </motion.div>
                
                <div className="mt-8 flex items-center gap-3 flex-wrap justify-center">
                    {['End-to-End', 'Zero-Retention', 'AES-256'].map((text, i) => (
                        <motion.div
                            key={text}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 + 0.3 }}
                            className="px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 shadow-sm"
                        >
                            {text}
                        </motion.div>
                    ))}
                </div>
            </div>
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
                <motion.line
                    x1="0%" y1="50%" x2="100%" y2="50%"
                    stroke="#4F46E5" strokeWidth="2" strokeDasharray="10 10"
                    animate={{ strokeDashoffset: [0, -100] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </svg>
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
    customGraphic?: React.ReactNode;
    badge?: string;
    statusSymbol?: string;
    videoFit?: "cover" | "contain";
    zoom?: number;
    videoBg?: string;
    translateY?: string;
}

const FEATURES: Feature[] = [
    {
        id: "voices",
        title: "100+ Languages, One Platform",
        description: "Speech-to-speech translation across more than 100 languages, preserving the speaker's natural cadence, tone, and emotional clarity.",
        accentColor: "#394DFE",
        videoSrc: "/videos/90 lanaguges supported.mp4",
        badge: "100+ Active",
    },
    {
        id: "continuous",
        title: "Continuous Streaming Architecture",
        description: "Eliminates sentence buffering entirely. Translated speech streams in approximately two seconds — delivering a 10× advantage over segmented systems.",
        accentColor: "#0284C7",
        videoSrc: "/videos/continousstreamingarchitecture.mp4",
        badge: "10.2× Faster",
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
        customGraphic: <SecurityGraphic />,
        badge: "ISO 25010",
    },
];

/* ─────────────────────────────────────────────
 * MOBILE LAZY VIDEO CARD
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
        <div ref={ref} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#EAD6FF]/60 flex flex-col h-full">
            <div className={`relative w-full ${feature.videoBg || "bg-white"}`} style={{ height: '300px' }}>
                {feature.customGraphic ? (
                    <div className="w-full h-full">{feature.customGraphic}</div>
                ) : (
                    <video
                        ref={videoRef}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-contain bg-slate-50"
                    />
                )}
            </div>
            <div className="p-6 flex-1 border-t border-slate-100" style={{ borderLeft: `5px solid ${feature.accentColor}` }}>
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
                <a href="/lab-test" className="inline-flex items-center gap-1.5 text-sm font-bold transition-all mt-auto" style={{ color: feature.accentColor }}>
                    View performance report →
                </a>
            </div>
        </div>
    );
}

export default function FeatureShowcase() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [activeSlot, setActiveSlot] = useState<"A" | "B">("A");
    
    const [featureA, setFeatureA] = useState<Feature>(FEATURES[0]);
    const [featureB, setFeatureB] = useState<Feature | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReduced = useReducedMotion();

    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);

    const active = FEATURES[activeIdx];

    const handleStepChange = useCallback((newIdx: number) => {
        if (newIdx === activeIdx) return;

        const nextFeature = FEATURES[newIdx];
        
        if (activeSlot === "A") {
            setFeatureB(nextFeature);
            setActiveSlot("B");
        } else {
            setFeatureA(nextFeature);
            setActiveSlot("A");
        }

        setActiveIdx(newIdx);
    }, [activeIdx, activeSlot]);

    useEffect(() => {
        const nextVideo = activeSlot === "A" ? videoARef.current : videoBRef.current;
        if (nextVideo && nextVideo.src) {
            nextVideo.play().catch(() => {});
        }
    }, [activeSlot, featureA, featureB]);

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

    const renderSlot = (feature: Feature | null, isActive: boolean, videoRef: React.RefObject<HTMLVideoElement>) => {
        if (!feature) return null;
        return (
            <div
                className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-out"
                style={{
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 20 : 10,
                }}
            >
                {feature.customGraphic ? (
                    feature.customGraphic
                ) : (
                    <video
                        ref={videoRef}
                        src={feature.videoSrc}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
            </div>
        );
    };

    return (
        <>
            {/* DESKTOP: Scrollytelling (lg and above) */}
            <div className="hidden lg:block">
                <div ref={containerRef} className="relative h-[400vh]">
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
                                            {renderSlot(featureA, activeSlot === "A", videoARef)}
                                            {renderSlot(featureB, activeSlot === "B", videoBRef)}
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
