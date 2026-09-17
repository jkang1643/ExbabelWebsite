"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface GuideContentProps {
    slug: string;
    guide: {
        title: string;
        src: string;
        transcript: { time: string; text: string }[];
    };
}

export default function GuideContent({ slug, guide }: GuideContentProps) {
    return (
        <main className="mobile-fade-up min-h-screen bg-base-paper pt-28 pb-20">
            <div className="mobile-fade-up layout-spine max-w-4xl mx-auto px-6">
                {/* Navigation */}
                <Link
                    href="/"
                    className="mobile-fade-up inline-flex items-center text-sm font-medium text-base-muted hover:text-primary transition-colors mb-8"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mobile-fade-up h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>

                <div className="mobile-fade-up flex flex-col md:flex-row gap-6 mb-12">
                    <Link
                        href="/guides/listener"
                        className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${slug === 'listener' ? 'bg-primary text-white shadow-aurora-glow' : 'bg-base-white text-base-ink hover:bg-base-100'}`}
                    >
                        Listener Guide
                    </Link>
                    <Link
                        href="/guides/broadcasting"
                        className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${slug === 'broadcasting' ? 'bg-primary text-white shadow-aurora-glow' : 'bg-base-white text-base-ink hover:bg-base-100'}`}
                    >
                        Broadcaster Guide
                    </Link>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="mobile-fade-up text-4xl md:text-5xl font-bold text-base-ink mb-10 tracking-tight">
                        {guide.title}
                    </h1>

                    {/* Video Player */}
                    <div className="mobile-fade-up relative w-full aspect-video rounded-aurora-xl overflow-hidden shadow-aurora-card border border-aurora-subtle bg-base-white p-2 mb-12">
                        <iframe
                            src={guide.src}
                            title={guide.title}
                            className="mobile-fade-up w-full h-full rounded-lg"
                            allowFullScreen
                            allow="clipboard-write"
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-forms allow-same-origin allow-presentation"
                            referrerPolicy="unsafe-url"
                        />
                    </div>

                    {/* Transcript / Instructions */}
                    <div className="mobile-fade-up bg-base-white rounded-aurora-xl p-8 shadow-sm border border-base-border">
                        <h2 className="mobile-fade-up text-2xl font-bold text-base-ink mb-6">Step-by-Step Instructions</h2>
                        <div className="mobile-fade-up space-y-6">
                            {guide.transcript.map((step, index) => (
                                <div key={index} className="mobile-fade-up flex gap-4 group">
                                    <div className="mobile-fade-up flex-shrink-0 w-16 text-sm font-mono text-base-muted/70 group-hover:text-primary transition-colors">
                                        {step.time}
                                    </div>
                                    <p className="mobile-fade-up text-base-ink/80 leading-relaxed text-lg pb-4 border-b border-base-border/40 last:border-0 w-full group-hover:text-base-ink transition-colors">
                                        {step.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
