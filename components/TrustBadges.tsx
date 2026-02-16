"use client";

import { motion } from "framer-motion";

export default function TrustBadges() {
    const badges = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Secure Payments",
            description: "Powered by Stripe"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "GDPR Compliant",
            description: "Your data is safe"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
            title: "Money-Back Guarantee",
            description: "30-day refund policy"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            title: "24/7 Support",
            description: "Always here to help"
        }
    ];

    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                {badge.icon}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-base-content">
                                    {badge.title}
                                </div>
                                <div className="text-xs text-base-content/60">
                                    {badge.description}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Payment Methods */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <p className="text-xs text-base-content/50 mb-4 uppercase tracking-wider">
                        Accepted Payment Methods
                    </p>
                    <div className="flex justify-center items-center gap-6 flex-wrap">
                        {/* Stripe Logo */}
                        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-lg font-bold text-[#635BFF]">stripe</span>
                        </div>
                        {/* Credit Card Icons */}
                        <div className="flex gap-3">
                            {["Visa", "Mastercard", "Amex"].map((card) => (
                                <div
                                    key={card}
                                    className="w-12 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600"
                                >
                                    {card.slice(0, 4)}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
