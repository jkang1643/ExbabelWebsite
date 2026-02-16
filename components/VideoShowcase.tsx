"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function VideoShowcase() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure video plays on mount
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked, that's okay
            });
        }
    }, []);

    return (
        <section className="py-12 md:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
            {/* Animated gradient blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="showcase-blob absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
                    style={{ background: 'radial-gradient(circle, #7C3AED22 0%, #7C3AED10 50%, transparent 70%)' }} />
                <div className="showcase-blob absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-15"
                    style={{ background: 'radial-gradient(circle, #2563EB18 0%, #2563EB08 50%, transparent 70%)', animationDelay: '5s' }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">
                        See Exbabel in Action
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Watch how real-time translation transforms your services
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5">
                        <video
                            ref={videoRef}
                            className="w-full h-auto max-h-[70vh] object-contain lg:object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src="/videos/9689681bd7407a5a32a1be3f678fb93bdb5b3a134219ef8d25133ba7c3a730fb_1080p.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
