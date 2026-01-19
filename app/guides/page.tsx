"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GuidesLandingPage() {
    return (
        <main className="min-h-screen bg-base-paper pt-32 pb-20">
            <div className="layout-spine max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-base-ink mb-6 tracking-tight">
                        How can we help you?
                    </h1>
                    <p className="text-lg text-base-muted/80 max-w-2xl mx-auto">
                        Select the guide that matches your role to get started with Exbabel.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Listener Card */}
                    <Link href="/guides/listener" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="h-full bg-base-white p-8 rounded-aurora-xl shadow-aurora-card border border-aurora-subtle hover:shadow-aurora-hover hover:border-aurora-hover hover:-translate-y-1 transition-all duration-300 ease-aurora-out relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-aurora-purple/20 to-aurora-mint/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full pointer-events-none blur-2xl" />

                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-base-ink mb-3 group-hover:text-primary transition-colors">Session Listener</h2>
                            <p className="text-base-muted leading-relaxed">
                                Learn how to join a session, select your language, and customize your listening experience.
                            </p>

                            <div className="mt-8 flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                                View Guide
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Broadcaster Card */}
                    <Link href="/guides/broadcasting" className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="h-full bg-base-white p-8 rounded-aurora-xl shadow-aurora-card border border-aurora-subtle hover:shadow-aurora-hover hover:border-aurora-hover hover:-translate-y-1 transition-all duration-300 ease-aurora-out relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-aurora-purple/20 to-aurora-mint/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full pointer-events-none blur-2xl" />

                            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-base-ink mb-3 group-hover:text-secondary transition-colors">Broadcaster</h2>
                            <p className="text-base-muted leading-relaxed">
                                For admins and churches. Learn how to set up broadcasts, manage audio, and configure latency.
                            </p>

                            <div className="mt-8 flex items-center text-secondary font-semibold group-hover:translate-x-2 transition-transform">
                                View Guide
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
