"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { COUNTRIES, CONTINENTS, type Continent, type CountryData } from "@/lib/countriesData";

/* ─────────────────────────────────────────────
 * Flag Image — uses flagcdn.com real images
 * Falls back to emoji if image fails
 * ───────────────────────────────────────────── */
const FlagImage = ({ code, name, size = "lg" }: { code: string; name: string; size?: "sm" | "lg" }) => {
    const [errored, setErrored] = useState(false);
    const cdnCode = code.toLowerCase();
    const src = `https://flagcdn.com/${size === "lg" ? "w80" : "w40"}/${cdnCode}.png`;

    if (errored) {
        // Slim fallback: just show code letters
        return (
            <span className={`inline-flex items-center justify-center font-bold text-slate-500 ${size === "lg" ? "text-3xl w-16 h-12" : "text-sm w-7 h-5"}`}>
                {code}
            </span>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={`Flag of ${name}`}
            onError={() => setErrored(true)}
            className={size === "lg"
                ? "w-16 h-auto rounded-md shadow-sm border border-slate-100 mb-3"
                : "w-7 h-auto rounded-sm border border-slate-100 flex-shrink-0"}
            loading="lazy"
        />
    );
};

/* ─────────────────────────────────────────────
 * Country Card
 * ───────────────────────────────────────────── */
const CountryCard = ({ country, index }: { country: CountryData; index: number }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.6) }}
            className="group relative cursor-pointer"
            onClick={() => setFlipped(!flipped)}
        >
            <div className="relative bg-white rounded-aurora-xl shadow-aurora-card border border-aurora-subtle
                      hover:shadow-aurora-hover hover:border-aurora-hover hover:-translate-y-1
                      transition-all duration-300 ease-out overflow-hidden h-full min-h-[200px]">

                {/* Subtle hover glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-aurora-purple/20 to-aurora-mint/20
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full pointer-events-none blur-2xl" />

                <AnimatePresence mode="wait">
                    {!flipped ? (
                        /* ── Front ── */
                        <motion.div
                            key="front"
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-5 flex flex-col items-center text-center h-full justify-center"
                        >
                            {/* Real flag image */}
                            <FlagImage code={country.code} name={country.name} size="lg" />

                            {/* Country name */}
                            <h3 className="text-base font-bold text-base-ink leading-tight mb-2">
                                {country.name}
                            </h3>

                            {/* Voice badge */}
                            {country.hasVoice ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Voice Supported
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-semibold border border-slate-200">
                                    Translation Only
                                </span>
                            )}

                            {/* Tap hint */}
                            <p className="text-[10px] text-base-muted/60 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                Tap for fun fact →
                            </p>
                        </motion.div>
                    ) : (
                        /* ── Back ── */
                        <motion.div
                            key="back"
                            initial={{ rotateY: -90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: 90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-5 flex flex-col h-full justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <FlagImage code={country.code} name={country.name} size="sm" />
                                    <h3 className="text-sm font-bold text-base-ink">{country.name}</h3>
                                </div>
                                <p className="text-sm text-base-muted leading-relaxed">
                                    {country.fact}
                                </p>
                            </div>

                            {/* Language + Voice badge */}
                            <div className="mt-4 flex flex-wrap gap-1.5 items-center">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                    🗣 {country.primaryLanguage}
                                </span>
                                {country.hasVoice ? (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        ✅ Voice TTS
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 border border-slate-200">
                                        Text Only
                                    </span>
                                )}
                            </div>

                            <p className="text-[10px] text-base-muted/60 mt-3">
                                ← Tap to flip back
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
 * Countries Showcase
 * ───────────────────────────────────────────── */
export default function CountriesShowcase() {
    const [activeContinent, setActiveContinent] = useState<Continent | "All" | "Voice">("All");
    const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: false });

    const filteredCountries = COUNTRIES.filter((c) => {
        if (activeContinent === "All") return true;
        if (activeContinent === "Voice") return c.hasVoice;
        return c.continent === activeContinent;
    });

    const tabs: (Continent | "All" | "Voice")[] = ["All", "Voice", ...CONTINENTS];

    return (
        <section ref={ref} className="relative py-20 md:py-28">
            {/* Section-level soft glow */}
            <div className="absolute inset-0 bg-section-soft opacity-60 pointer-events-none" />

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-eyebrow mb-4 block">COUNTRIES SHOWCASE</span>
                    <h2 className="text-h2 text-base-ink tracking-tight mb-4">
                        196 Countries. 87% of the World.
                    </h2>
                    <p className="text-body max-w-2xl mx-auto">
                        Tap any country to discover a linguistic fact and its voice support status.
                        Countries with{" "}
                        <span className="text-emerald-600 font-semibold">Voice Support</span> have
                        natural AI-powered text-to-speech — 171 of 196 nations covered.
                    </p>
                </motion.div>

                {/* Continent Filter Tabs */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 mb-12"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    {tabs.map((tab) => {
                        const count =
                            tab === "All"
                                ? COUNTRIES.length
                                : tab === "Voice"
                                    ? COUNTRIES.filter((c) => c.hasVoice).length
                                    : COUNTRIES.filter((c) => c.continent === tab).length;

                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveContinent(tab)}
                                className={`
                  px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  ${activeContinent === tab
                                        ? "bg-primary text-white shadow-md"
                                        : "bg-white/80 text-base-muted hover:bg-white hover:text-base-ink border border-aurora-subtle hover:border-aurora-hover"
                                    }
                `}
                            >
                                {tab === "Voice" ? "🔊 Voice Supported" : tab}
                                <span className="ml-1.5 text-xs opacity-70">({count})</span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* Countries Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCountries.map((country, idx) => (
                            <CountryCard key={country.code} country={country} index={idx} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Count bar */}
                <motion.p
                    className="text-center text-sm text-base-muted mt-8"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Showing <span className="font-bold text-base-ink">{filteredCountries.length}</span>{" "}
                    {activeContinent === "All" ? "countries" : activeContinent === "Voice" ? "voice-supported countries" : `countries in ${activeContinent}`}
                </motion.p>
            </div>
        </section>
    );
}
