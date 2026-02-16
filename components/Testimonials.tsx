"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
    const testimonials = [
        {
            quote: "Exbabel has completely transformed how we reach our Spanish-speaking congregation. The translations are accurate and capture the theological nuances perfectly.",
            name: "Pastor Michael Chen",
            title: "Senior Pastor",
            organization: "Grace Community Church",
            rating: 5,
            initials: "MC",
            color: "bg-blue-500"
        },
        {
            quote: "We've grown our attendance by 40% since implementing Exbabel. Non-English speakers finally feel welcomed and included in our services.",
            name: "Rev. Sarah Martinez",
            title: "Lead Minister",
            organization: "First United Methodist",
            rating: 5,
            initials: "SM",
            color: "bg-purple-500"
        },
        {
            quote: "The setup was incredibly easy. We were translating our first service in less than 10 minutes. The support team has been phenomenal.",
            name: "David Kim",
            title: "Technical Director",
            organization: "New Life Fellowship",
            rating: 5,
            initials: "DK",
            color: "bg-green-500"
        },
        {
            quote: "As a multicultural church, Exbabel is essential. We now offer services in 5 languages simultaneously without any technical headaches.",
            name: "Pastor James Okonkwo",
            title: "Senior Pastor",
            organization: "International Gospel Center",
            rating: 5,
            initials: "JO",
            color: "bg-orange-500"
        },
        {
            quote: "The AI understands context and cultural nuances in ways that surprised us. It's not just translation—it's true communication.",
            name: "Maria Rodriguez",
            title: "Worship Director",
            organization: "Cornerstone Church",
            rating: 5,
            initials: "MR",
            color: "bg-pink-500"
        },
        {
            quote: "Our refugee ministry has exploded thanks to Exbabel. We're now reaching families from 12 different countries in their native languages.",
            name: "Rev. John Thompson",
            title: "Outreach Pastor",
            organization: "City Hope Church",
            rating: 5,
            initials: "JT",
            color: "bg-indigo-500"
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
            {/* Animated gradient blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="showcase-blob absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
                    style={{ background: 'radial-gradient(circle, #7C3AED40 0%, #7C3AED20 50%, transparent 70%)' }} />
                <div className="showcase-blob absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-35"
                    style={{ background: 'radial-gradient(circle, #2563EB35 0%, #2563EB18 50%, transparent 70%)', animationDelay: '3s' }} />
                <div className="showcase-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
                    style={{ background: 'radial-gradient(circle, #059669 30 0%, #05966918 50%, transparent 70%)', animationDelay: '6s' }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-eyebrow mb-4 tracking-widest text-primary/80">
                        LOVED BY CHURCH LEADERS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-base-content tracking-tight">
                        Hear from our community
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Join hundreds of churches using Exbabel to break down language barriers and grow their congregations.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="h-full p-8 bg-white rounded-2xl border-0 shadow-[0_16px_48px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.16),0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col ring-1 ring-slate-900/5 hover:ring-slate-900/10">
                                {/* Star Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 text-yellow-400 fill-current drop-shadow-md"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-base text-slate-600 leading-relaxed mb-6 flex-grow">
                                    &quot;{testimonial.quote}&quot;
                                </blockquote>

                                {/* Author Info */}
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                                    {/* Avatar with initials */}
                                    <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)]`}>
                                        {testimonial.initials}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-slate-900 text-sm">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {testimonial.title}
                                        </div>
                                        <div className="text-xs text-primary font-medium">
                                            {testimonial.organization}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <p className="text-base-content/70 mb-4">
                        Join these leaders in breaking down language barriers
                    </p>
                    <a
                        href="#pricing"
                        className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                    >
                        Start Your Free Trial
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
