"use client";

import React from "react";

/**
 * LightAuroraBackground
 * 
 * Pure CSS implementation — removed Framer Motion JS-driven animations.
 * Uses GPU-composited CSS animations for smooth 60fps blob drifting.
 */
export default function LightAuroraBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-base-100 -z-10 pointer-events-none">
            {/* Blob 1: Soft Pink (Top Left) */}
            <div
                className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#FFD6E5] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 will-change-transform"
                style={{
                    animation: 'aurora-drift-1 15s ease-in-out infinite',
                }}
            />

            {/* Blob 2: Light Purple (Top Right) */}
            <div
                className="absolute top-[5%] -right-[15%] w-[50%] h-[60%] bg-[#EAD6FF] rounded-full mix-blend-multiply filter blur-[130px] opacity-60 will-change-transform"
                style={{
                    animation: 'aurora-drift-2 18s ease-in-out infinite 2s',
                }}
            />

            {/* Blob 3: Subtle Blue (Bottom Left) */}
            <div
                className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[#D6F5FF] rounded-full mix-blend-multiply filter blur-[140px] opacity-60 will-change-transform"
                style={{
                    animation: 'aurora-drift-3 20s ease-in-out infinite 4s',
                }}
            />

            {/* Blob 4: Pale Yellow (Bottom Center/Right) */}
            <div
                className="absolute bottom-[10%] right-[10%] w-[40%] h-[50%] bg-[#FFF7D1] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 will-change-transform"
                style={{
                    animation: 'aurora-drift-4 22s ease-in-out infinite 1s',
                }}
            />

            {/* CSS keyframes — GPU-composited transform-only animations */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes aurora-drift-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(50px, -30px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.95); }
                }
                @keyframes aurora-drift-2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-30px, 40px) scale(1.2); }
                    66% { transform: translate(40px, -30px) scale(0.9); }
                }
                @keyframes aurora-drift-3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(40px, -20px) scale(0.9); }
                    66% { transform: translate(-40px, 30px) scale(1.1); }
                }
                @keyframes aurora-drift-4 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-20px, 30px) scale(1.1); }
                    66% { transform: translate(30px, -20px) scale(0.9); }
                }
                @media (prefers-reduced-motion: reduce) {
                    [style*="aurora-drift"] { animation: none !important; }
                }
            `}} />
        </div>
    );
}
