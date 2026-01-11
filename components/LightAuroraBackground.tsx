"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * LightAuroraBackground
 * 
 * Implements the "Aurora" background gradient effect as described in the style guide.
 * Base: White/Off-White
 * Blobs: Soft Pink (#FFD6E5), Light Purple (#EAD6FF), Pale Yellow (#FFF7D1), Subtle Blue (#D6F5FF)
 */
export default function LightAuroraBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-base-100 -z-10 pointer-events-none">
            {/* Blob 1: Soft Pink (Top Left) */}
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
                className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#FFD6E5] rounded-full mix-blend-multiply filter blur-[120px] opacity-60"
            />

            {/* Blob 2: Light Purple (Top Right) */}
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
                className="absolute top-[5%] -right-[15%] w-[50%] h-[60%] bg-[#EAD6FF] rounded-full mix-blend-multiply filter blur-[130px] opacity-60"
            />

            {/* Blob 3: Subtle Blue (Bottom Left) */}
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
                className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[#D6F5FF] rounded-full mix-blend-multiply filter blur-[140px] opacity-60"
            />

            {/* Blob 4: Pale Yellow (Bottom Center/Right) */}
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
                className="absolute bottom-[10%] right-[10%] w-[40%] h-[50%] bg-[#FFF7D1] rounded-full mix-blend-multiply filter blur-[120px] opacity-60"
            />
        </div>
    );
}
