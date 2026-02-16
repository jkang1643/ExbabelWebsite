"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
 * DATA MODEL
 * ───────────────────────────────────────────── */
interface Feature {
    id: string;
    title: string;
    description: string;
    accentColor: string;
    videoSrc: string;
    badge?: string;
    videoFit?: "cover" | "contain";
    zoom?: number;
    videoBg?: string;
    translateY?: string;
}

const FEATURES: Feature[] = [
    {
        id: "voices",
        title: "Lifelike Voices for 90 Countries",
        description: "Natural voices that feel human. Coverage for 99%+ of the world population.",
        accentColor: "#7C3AED",
        videoSrc: "/videos/90naturalvoicesv2.mp4",
        badge: "90+",
    },
    {
        id: "languages",
        title: "250+ Languages & Dialects",
        description: "Reach every member, in their language.",
        accentColor: "#2563EB",
        videoSrc: "/videos/250 langugaes and dialects.mp4",
        badge: "250+",
    },
    {
        id: "clarity",
        title: "Smart Clarity Engine",
        description: "Auto-refines grammar and phrasing.",
        accentColor: "#0891B2",
        videoSrc: "/videos/clarity engine.mp4",
        videoBg: "bg-slate-50",
    },
    {
        id: "phrases",
        title: "8,000+ Ministry Phrase Bank",
        description: "Ministry-specific language built in.",
        accentColor: "#059669",
        videoSrc: "/videos/phrase libart v2.mp4",
        badge: "8K+",
    },
    {
        id: "profanity",
        title: "SafeStream™ Profanity Filter",
        description: "Keeps translations worship-appropriate.",
        accentColor: "#DC2626",
        videoSrc: "/videos/profanity filter.mp4",
        zoom: 1.22,
        translateY: "8%",
    },
    {
        id: "bible",
        title: "Bible Verse Detection",
        description: "Automatically recognizes scripture references.",
        accentColor: "#D97706",
        videoSrc: "/videos/biblevesrerecognition.mp4",
    },
    {
        id: "chatgpt",
        title: "Powered by ChatGPT Accuracy",
        description: "Context-aware, sermon-ready precision.",
        accentColor: "#7C3AED",
        videoSrc: "/videos/translationpoweredbychatgpt.mp4",
    },
];

/* ─────────────────────────────────────────────
 * COMPONENT
 * ───────────────────────────────────────────── */
export default function FeatureShowcase() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReduced = useReducedMotion();

    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);
    const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");
    const [isTransitioning, setIsTransitioning] = useState(false);

    const active = FEATURES[activeIdx];

    // Derived state for responsive card animation
    const segmentSize = 1 / FEATURES.length;
    const currentSegmentStart = activeIdx * segmentSize;
    const localProgress = Math.max(0, Math.min(1, (scrollProgress - currentSegmentStart) / segmentSize));

    // Calculate continuous values for "scroll-through" feel
    // Card scrolls up continuously from bottom (400px) to top (-400px)
    // This creates the effect of scrolling through the fixed viewport
    const cardY = 400 - (localProgress * 800); // Starts at 400px (below), ends at -400px (above)

    // Keep opacity at 1 for most of the journey, only fade at very edges
    const cardOpacity =
        localProgress < 0.05 ? localProgress / 0.05 :  // Quick fade in at start
            localProgress > 0.95 ? 1 - (localProgress - 0.95) / 0.05 :  // Quick fade out at end
                1;

    /* ── Smooth transition to next feature ── */
    const transitionToFeature = useCallback(
        async (nextIdx: number) => {
            // Allow transition even if transitioning, to keep up with scroll
            if (nextIdx === activeIdx) return;

            setIsTransitioning(true);
            const nextFeature = FEATURES[nextIdx];

            // Determine which video is hidden (will become active)
            const hiddenVideo = activeVideo === "A" ? videoBRef : videoARef;
            const hiddenVideoEl = hiddenVideo.current;

            if (!hiddenVideoEl) {
                setIsTransitioning(false);
                return;
            }

            // Set new source and wait for it to be ready
            hiddenVideoEl.src = nextFeature.videoSrc;
            hiddenVideoEl.load();

            // Wait for video to be ready
            await new Promise<void>((resolve) => {
                const checkReady = () => {
                    if (hiddenVideoEl.readyState >= 3) {
                        resolve();
                    } else {
                        hiddenVideoEl.addEventListener("canplaythrough", () => resolve(), { once: true });
                    }
                };
                checkReady();
            });

            // Start playing the new video
            hiddenVideoEl.play().catch(() => { });

            // Swap active video (triggers CSS transition)
            setActiveVideo(activeVideo === "A" ? "B" : "A");
            setActiveIdx(nextIdx);

            // After transition, pause the old video
            setTimeout(() => {
                const oldVideo = activeVideo === "A" ? videoARef : videoBRef;
                if (oldVideo.current) {
                    oldVideo.current.pause();
                    oldVideo.current.currentTime = 0;
                }
                setIsTransitioning(false);
            }, 700);
        },
        [activeIdx, activeVideo]
    );

    /* ── Auto-play active video ── */
    useEffect(() => {
        const currentRef = activeVideo === "A" ? videoARef : videoBRef;
        if (currentRef.current) {
            currentRef.current.play().catch(() => { });
        }
    }, [activeVideo]);

    /* ── Scroll-driven progress tracking ── */
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Calculate scroll progress through the container
            // When container top hits top of viewport, we start (progress = 0)
            // When container bottom hits top of viewport, we end (progress = 1)
            const scrollableHeight = containerHeight - viewportHeight;
            const scrolled = Math.max(0, -rect.top);
            const progress = scrollableHeight > 0 ? Math.min(1, scrolled / scrollableHeight) : 0;

            setScrollProgress(progress);

            // Determine active feature based on progress
            // Divide progress into equal segments for each feature
            const segmentSize = 1 / FEATURES.length;
            const featureIndex = Math.min(
                FEATURES.length - 1,
                Math.floor(progress / segmentSize)
            );

            if (featureIndex !== activeIdx) {
                transitionToFeature(featureIndex);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeIdx, transitionToFeature]);

    return (
        <>
            {/* DESKTOP: Sticky scroll experience (lg and up) */}
            <div className="hidden lg:block">
                {/* Spacer to create scroll range - this is what makes the section "sticky" */}
                <div
                    ref={containerRef}
                    style={{ height: `${FEATURES.length * 100}vh` }}
                    className="relative"
                >
                    {/* Fixed viewport frame */}
                    <div className="sticky top-0 h-screen overflow-hidden">
                        <section className="section-pad relative h-full flex items-center">
                            {/* Section-level soft glow */}
                            <div className="absolute inset-0 bg-section-soft opacity-60 pointer-events-none" />

                            <div className="layout-spine relative z-10 w-full">
                                {/* ── Header Section ── */}
                                <div className="text-center mb-12 md:mb-16">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                                        ✨ POWERFUL FEATURES
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                                        What sets Exbabel apart
                                    </h2>
                                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                                        Experience the features that make real-time translation seamless
                                    </p>
                                </div>

                                {/* ── Two-column layout ── */}
                                <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-20 items-center">
                                    {/* ─── LEFT: Feature card (Responsive Scroll) ─── */}
                                    <div className="relative min-h-[300px]">
                                        <div
                                            className="w-full px-8 py-8 rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-slate-900/5 transition-colors duration-300"
                                            style={{
                                                borderLeft: `5px solid ${active.accentColor}`,
                                                opacity: cardOpacity,
                                                transform: `translateY(${cardY}px)`,
                                            }}
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <h3 className="text-2xl font-bold text-slate-900">
                                                    {active.title}
                                                </h3>
                                                {active.badge && (
                                                    <span
                                                        className="text-xs font-bold px-2.5 py-1 rounded-lg text-white"
                                                        style={{ backgroundColor: active.accentColor }}
                                                    >
                                                        {active.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-base leading-relaxed text-slate-600">
                                                {active.description}
                                            </p>

                                            {/* Progress indicator */}
                                            <div className="mt-6 flex items-center gap-2">
                                                {FEATURES.map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="h-1 rounded-full transition-all duration-300"
                                                        style={{
                                                            width: idx === activeIdx ? "32px" : "8px",
                                                            backgroundColor: idx === activeIdx ? active.accentColor : "#CBD5E1",
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ─── RIGHT: Video stage ─── */}
                                    <div className="relative w-full aspect-[4/3]">
                                        {/* Progress counter */}
                                        <div className="absolute -top-10 left-0 text-sm font-semibold text-slate-400 tabular-nums">
                                            {String(activeIdx + 1).padStart(2, "0")} / {String(FEATURES.length).padStart(2, "0")}
                                        </div>

                                        {/* Blob background */}
                                        <div
                                            className="showcase-blob absolute -inset-32 rounded-[60px] transition-all duration-700 ease-out"
                                            style={{
                                                background: `radial-gradient(ellipse at 50% 40%, ${active.accentColor}50 0%, ${active.accentColor}30 35%, ${active.accentColor}15 55%, transparent 75%)`,
                                            }}
                                        />

                                        {/* Video container */}
                                        <div className={`relative z-10 w-full h-full rounded-[24px] overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.12),0_6px_20px_rgba(0,0,0,0.08)] ring-1 ring-slate-900/5 ${active.videoBg || "bg-white"}`}>
                                            {/* Video A */}
                                            <video
                                                ref={videoARef}
                                                src={FEATURES[0].videoSrc}
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                className={`absolute inset-0 w-full h-full object-${active.videoFit || "cover"} transition-all duration-700 ease-out`}
                                                style={{
                                                    opacity: activeVideo === "A" ? 1 : 0,
                                                    transform:
                                                        activeVideo === "A"
                                                            ? `translateY(${active.translateY || "0"}) scale(${active.zoom || 1})`
                                                            : prefersReduced
                                                                ? "translateY(0) scale(1)"
                                                                : "translateY(16px) scale(1.01)",
                                                    zIndex: activeVideo === "A" ? 20 : 10,
                                                }}
                                            />

                                            {/* Video B */}
                                            <video
                                                ref={videoBRef}
                                                src={FEATURES[1].videoSrc}
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                className={`absolute inset-0 w-full h-full object-${active.videoFit || "cover"} transition-all duration-700 ease-out`}
                                                style={{
                                                    opacity: activeVideo === "B" ? 1 : 0,
                                                    transform:
                                                        activeVideo === "B"
                                                            ? `translateY(${active.translateY || "0"}) scale(${active.zoom || 1})`
                                                            : prefersReduced
                                                                ? "translateY(0) scale(1)"
                                                                : "translateY(16px) scale(1.01)",
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

            {/* MOBILE: Simple vertical list (below lg) */}
            <section className="block lg:hidden py-12 px-4 relative overflow-hidden">
                {/* Section-level soft glow */}
                <div className="absolute inset-0 bg-section-soft opacity-60 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    {/* ── Header Section ── */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                            ✨ POWERFUL FEATURES
                        </div>
                        <h2 className="text-3xl font-bold text-base-content mb-4">
                            What sets Exbabel apart
                        </h2>
                        <p className="text-base text-base-content/70">
                            Experience the features that make real-time translation seamless
                        </p>
                    </div>

                    {/* ── Feature List ── */}
                    <div className="space-y-8">
                        {FEATURES.map((feature, idx) => (
                            <div key={feature.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                {/* Video */}
                                <div className={`relative w-full ${feature.videoBg || "bg-white"}`} style={{ maxHeight: '60vh' }}>
                                    <video
                                        src={feature.videoSrc}
                                        muted
                                        loop
                                        playsInline
                                        autoPlay
                                        className="w-full h-full object-contain"
                                        style={{ maxHeight: '60vh' }}
                                    />
                                </div>

                                {/* Content */}
                                <div
                                    className="p-6"
                                    style={{ borderLeft: `5px solid ${feature.accentColor}` }}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {feature.title}
                                        </h3>
                                        {feature.badge && (
                                            <span
                                                className="text-xs font-bold px-2.5 py-1 rounded-lg text-white"
                                                style={{ backgroundColor: feature.accentColor }}
                                            >
                                                {feature.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
