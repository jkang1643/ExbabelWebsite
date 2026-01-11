"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * DarkAuroraBackground
 * 
 * Implements a "way darker" version of the Aurora gradient effect.
 * Uses a deep dark base with heavy blurred blobs in dark variants of
 * Pink, Purple, Yellow, and Blue to create a premium, deep atmosphere.
 * Animated with Framer Motion for a subtle, living background.
 */
export default function DarkAuroraBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#0F0B15] -z-10 pointer-events-none">
            {/* Blob 1: Dark Deep Purple (Top Left) */}
            <motion.div
                initial={{ x: 0, y: 0, scale: 1 }}
                animate={{
                    x: [0, 50, -20, 0],
                    y: [0, -30, 20, 0],
                    scale: [1, 1.1, 0.95, 1]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#2E0249] rounded-full mix-blend-screen filter blur-[120px] opacity-50"
            />

            {/* Blob 2: Dark Raspberry/Pink (Top Right) */}
            <motion.div
                initial={{ x: 0, y: 0, scale: 1 }}
                animate={{
                    x: [0, -30, 40, 0],
                    y: [0, 40, -30, 0],
                    scale: [1, 1.2, 0.9, 1]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-[5%] -right-[15%] w-[50%] h-[60%] bg-[#4A042E] rounded-full mix-blend-screen filter blur-[130px] opacity-40"
            />

            {/* Blob 3: Deep Navy/Blue (Bottom Left) */}
            <motion.div
                initial={{ x: 0, y: 0, scale: 1 }}
                animate={{
                    x: [0, 40, -40, 0],
                    y: [0, -20, 30, 0],
                    scale: [1, 0.9, 1.1, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
                className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[#022C43] rounded-full mix-blend-screen filter blur-[140px] opacity-50"
            />

            {/* Blob 4: Deep Amber/Gold (Bottom Center/Right) */}
            <motion.div
                initial={{ x: 0, y: 0, scale: 1 }}
                animate={{
                    x: [0, -20, 30, 0],
                    y: [0, 30, -20, 0],
                    scale: [1, 1.1, 0.9, 1]
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-[10%] right-[10%] w-[40%] h-[50%] bg-[#3D2C00] rounded-full mix-blend-screen filter blur-[120px] opacity-30"
            />

            {/* Overlay to unify contrast */}
            <div className="absolute inset-0 bg-black/20" />
        </div>
    );
}
