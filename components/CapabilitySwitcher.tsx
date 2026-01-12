"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LightAuroraBackground from "./LightAuroraBackground";

export default function CapabilitySwitcher() {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            id: 0,
            label: "Real-time Translation",
            description: "Instant speech-to-text translation in 150+ languages.",
            content: (
                <div className="flex flex-col h-full">
                    <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-white">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">PA</div>
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-slate-800">Pastor Allen</span>
                                    <span className="text-xs text-slate-400">10:42 AM</span>
                                </div>
                                <div className="bg-slate-100 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-slate-700 text-sm">
                                    Welcome everyone. Today we are talking about faith and perseverance.
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600">AI</div>
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-slate-800">Exbabel Translator</span>
                                    <span className="text-xs text-slate-400">10:42 AM</span>
                                </div>
                                <div className="bg-purple-50 border border-purple-100 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-slate-800 text-sm">
                                    <div className="flex items-center gap-2 mb-1 text-xs font-bold text-purple-600 uppercase tracking-wider">
                                        🇪🇸 Spanish
                                    </div>
                                    Bienvenidos a todos. Hoy hablamos de fe y perseverancia.
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600">AI</div>
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-slate-800">Exbabel Translator</span>
                                    <span className="text-xs text-slate-400">10:42 AM</span>
                                </div>
                                <div className="bg-purple-50 border border-purple-100 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-slate-800 text-sm">
                                    <div className="flex items-center gap-2 mb-1 text-xs font-bold text-purple-600 uppercase tracking-wider">
                                        🇰🇷 Korean
                                    </div>
                                    모두 환영합니다. 오늘 우리는 믿음과 인내에 대해 이야기하고 있습니다.
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Input Area Mockup */}
                    <div className="p-4 border-t border-slate-100 bg-slate-50">
                        <div className="h-10 border border-slate-200 rounded-lg bg-white flex items-center px-3 text-slate-400 text-sm">
                            Bot is listening...
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 1,
            label: "Context-Aware Agent",
            description: "Understand theological terms and cultural nuances automatically.",
            content: (
                <div className="flex flex-col h-full bg-white">
                    <div className="p-6">
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
                            <div className="flex gap-2 items-start">
                                <div className="mt-0.5 text-amber-500">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">Context Alert detected</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        The speaker used the term <strong>&quot;Agape&quot;</strong>. Exbabel automatically added a context note for translators and viewers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">🤖</div>
                                <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-3 w-full">
                                    <div className="text-xs font-bold text-slate-400 mb-1">DEFINITION CARD</div>
                                    <div className="font-bold text-slate-800 mb-1">Agape (Greek)</div>
                                    <p className="text-sm text-slate-600">The highest form of love, charity; the love of God for man and of man for God. Distinct from <em>eros</em> or <em>philia</em>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            label: "Zero-Latency Audio",
            description: "Stream high-fidelity audio directly to mobile devices.",
            content: (
                <div className="flex flex-col h-full bg-slate-900 relative overflow-hidden">
                    {/* Visualizer Background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 gap-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="w-2 bg-blue-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 60 + 20}%`, animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/30">
                            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a2 2 0 002.828 0l6.364-6.364a2 2 0 000-2.828l-6.364-6.364a2 2 0 00-2.828 0l-6.364 6.364a2 2 0 000 2.828z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Live Audio Stream</h3>
                        <p className="text-slate-400 text-sm mb-6">Stereo • 48kHz • 24ms Latency</p>
                        <div className="flex gap-2 bg-slate-800/50 p-1.5 rounded-lg backdrop-blur-md">
                            <div className="px-4 py-1.5 bg-green-500/20 text-green-400 text-xs font-bold rounded">Connected</div>
                            <div className="px-4 py-1.5 text-slate-300 text-xs font-bold">buffer: 0.02s</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            label: "Enterprise Security",
            description: "Bank-grade encryption for private counseling or meetings.",
            content: (
                <div className="flex flex-col h-full bg-white">
                    <div className="p-8 flex flex-col items-center justify-center h-full">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">End-to-End Encrypted</h4>
                        <p className="text-center text-slate-500 text-sm mb-8 leading-relaxed">
                            Your audio and transcriptions are encrypted and ephemeral. We never train models on your private conversation data.
                        </p>
                        <div className="w-full max-w-xs bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600 font-semibold">Encryption</span>
                                <span className="text-green-600 font-mono">AES-256</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600 font-semibold">Data Retention</span>
                                <span className="text-slate-900 font-mono">0 Days</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="py-24 md:py-32 text-base-content relative overflow-hidden">
            <LightAuroraBackground />

            <div className="layout-spine relative z-10">
                <motion.div
                    className="text-center mb-16 md:mb-24 max-w-[800px] mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight text-base-content">
                        Reimagine what’s possible with <br className="hidden md:block" /> AI translation.
                    </h2>
                    <p className="text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto leading-relaxed">
                        More than just words. Exbabel understands context, culture, and theology to bring your message to the world.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-center w-full max-w-[1240px]">

                    {/* Left: Capability Selector */}
                    <div className="flex flex-col gap-2">
                        {features.map((feature) => (
                            <button
                                key={feature.id}
                                onClick={() => setActiveFeature(feature.id)}
                                className={`text-left p-6 rounded-xl transition-all duration-300 group outline-none ${activeFeature === feature.id
                                    ? "bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.1)] scale-[1.02]"
                                    : "hover:bg-base-200/50 text-base-content/60"
                                    }`}
                            >
                                <h3 className={`text-lg font-bold mb-2 transition-colors ${activeFeature === feature.id ? "text-primary" : "text-base-content"
                                    }`}>
                                    {feature.label}
                                </h3>
                                <p className={`text-sm leading-relaxed transition-colors ${activeFeature === feature.id ? "text-base-content" : "text-base-content/60 group-hover:text-base-content/80"
                                    }`}>
                                    {feature.description}
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Right: Dynamic Preview Window */}
                    <div className="relative h-[500px] w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature}
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                {/* Window Frame */}
                                <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.5)] flex flex-col border border-white/10">
                                    {/* Window Header */}
                                    <div className="bg-slate-100 border-b border-slate-200 h-10 flex items-center px-4 gap-2 shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                        {/* Fake URL/Title */}
                                        <div className="ml-4 flex-1 flex justify-center">
                                            <div className="h-5 w-48 bg-white rounded-md flex items-center justify-center text-[10px] text-slate-400 font-mono tracking-wide">
                                                exbabel.com/live
                                            </div>
                                        </div>
                                        <div className="w-10" /> {/* Spacer for balance */}
                                    </div>

                                    {/* Window Content */}
                                    <div className="flex-1 overflow-hidden relative">
                                        {features[activeFeature].content}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
