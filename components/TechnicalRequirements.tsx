"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TechnicalRequirements() {
    const requirements = [
        {
            title: "Computer & Browser",
            items: [
                "Any computer (Windows, Mac, Linux)",
                "Chrome browser (recommended)",
                "Stable internet connection (5+ Mbps)",
            ],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: "Audio Input",
            items: [
                "Connect from sound system",
                "Hardware audio interface, OR",
                "Dante network audio, OR",
                "Built-in microphone",
            ],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            ),
        },
        {
            title: "User Devices",
            items: [
                "iOS (iPhone, iPad)",
                "Android phones & tablets",
                "Laptops & computers",
                "No special hardware needed",
            ],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-20 px-4 bg-base-200">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">
                        What You Need to <span className="text-primary">Get Started</span>
                    </h2>
                    <p className="text-lg text-base-content max-w-2xl mx-auto">
                        Simple technical requirements - if you can stream a video, you can use Exbabel
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {requirements.map((req, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="card bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-[#5a5d80]/20 hover:border-[#5a5d80]/40 rounded-3xl">
                                <div className="card-body p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary">
                                            {req.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-base-content">{req.title}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {req.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-base-content text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Setup Guide CTA */}
                <motion.div
                    className="card bg-gradient-to-br from-[#5a5d80]/5 to-white/70 backdrop-blur-sm shadow-lg border border-[#5a5d80]/20 rounded-3xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="card-body p-8 items-center text-center">
                        <h3 className="text-2xl font-bold text-base-content mb-2">
                            Need Help Setting Up?
                        </h3>
                        <p className="text-base-content/70 mb-6 max-w-2xl">
                            Our support team is here to help you get started. We provide detailed setup guides, video tutorials, and live support - including on Sundays!
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/guides" className="btn btn-primary rounded-full px-6 border-none shadow-lg hover:shadow-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                View Setup Guide
                            </Link>
                            <button className="btn btn-primary rounded-full px-6 border-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Contact Support
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
