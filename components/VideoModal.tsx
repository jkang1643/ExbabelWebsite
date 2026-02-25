"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
    title: string;
    description?: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc, title, description }: VideoModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 md:p-12 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-5xl rounded-2xl md:rounded-3xl bg-gray-900 shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="video-modal-title"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white/70 hover:bg-black/80 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                            aria-label="Close modal"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="relative w-full aspect-video bg-black flex-shrink-0 flex items-center justify-center">
                            {!videoSrc ? (
                                <p className="text-white/50 text-xl font-medium">Video playback not available</p>
                            ) : videoSrc.includes("youtube.com") ? (
                                <iframe
                                    src={videoSrc}
                                    title={title}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    ref={videoRef}
                                    src={videoSrc}
                                    className="w-full h-full object-contain"
                                    controls
                                    autoPlay
                                    playsInline
                                />
                            )}
                        </div>

                        <div className="p-6 md:p-8 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                            <h3 id="video-modal-title" className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                            {description && (
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                                    {description}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
