"use client";

import { motion } from "framer-motion";

export default function Features() {
    const features = [
        {
            title: "Real-Time Translation",
            description: "Experience seamless communication with instant translations as conversations happen.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
            ),
        },
        {
            title: "150+ Languages",
            description: "Connect with people worldwide through support for over 150 languages and dialects.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: "Context-Aware AI",
            description: "Our AI understands context, idioms, and cultural nuances for accurate translations.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
        },
        {
            title: "No Hardware Required",
            description: "Access translation services from any device with just a web browser - no special equipment needed.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: "Unlimited Users",
            description: "No limits on the number of participants who can access translations simultaneously.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
        {
            title: "24/7 Support",
            description: "Our dedicated support team is always available to help you succeed.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section id="features" className="section-pad bg-transparent relative">
            {/* Section specific soft glow if needed, or rely on global */}

            <div className="layout-spine relative z-10">
                {/* Header */}
                <motion.div
                    className="text-editorial mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-eyebrow mb-3 tracking-widest text-base-ink/60">POWERFUL FEATURES</div>
                    <h2 className="text-h2 mb-6 text-base-ink tracking-tight">
                        Why Churches love our platform
                    </h2>
                    <p className="text-body max-w-2xl mx-auto text-lg">
                        Everything you need to break down language barriers and connect with people worldwide.
                    </p>
                </motion.div>

                {/* Feature Grid - Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1100px]">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group h-full"
                        >
                            <div className="h-full p-6 md:p-8 bg-base-white/80 backdrop-blur-sm rounded-aurora-xl shadow-aurora-card border border-aurora-subtle hover:shadow-aurora-hover hover:border-aurora-hover hover:-translate-y-1 transition-all duration-300 ease-aurora-out group relative overflow-hidden flex flex-col">
                                {/* Hover Gradient Blob */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-aurora-purple/40 to-aurora-mint/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full pointer-events-none -z-0 blur-xl" />

                                <div className="relative z-10 w-12 h-12 flex items-center justify-center text-base-ink mb-6 bg-aurora-mint/30 rounded-aurora-sm group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-base-ink mb-3">{feature.title}</h3>
                                <p className="text-base-muted leading-relaxed text-[15px] mb-4 flex-grow">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
