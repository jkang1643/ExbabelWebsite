'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DecorativeWispProps {
  className?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  delay?: number;
  reverse?: boolean;
}

export default function DecorativeWisp({ 
  className = "", 
  colorPrimary = "#FFD6E5", 
  colorSecondary = "#D6F5FF",
  delay = 0,
  reverse = false
}: DecorativeWispProps) {
  // Generate a unique ID for gradients to prevent overlap, ensure it starts with a letter
  const id = "wisp-" + React.useId().replace(/:/g, "");

  // Create an undulating wavy motion instead of a wide circle
  const path1 = reverse 
    ? "M 200,200 C 100,150 100,50 0,0" 
    : "M 0,0 C 100,50 100,150 200,200";
    
  const path2 = reverse
    ? "M 200,200 C 150,100 50,100 0,0"
    : "M 0,0 C 50,100 150,100 200,200";

  return (
    <div className={`pointer-events-none ${className}`}>
      <svg className="w-full h-full opacity-90 overflow-visible" preserveAspectRatio="none" viewBox="0 0 200 200">
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorPrimary} />
            <stop offset="100%" stopColor={colorSecondary} />
          </linearGradient>
        </defs>

        <g>
          {/* Layer 1: Simulated Outer Glow (Fast Geometric Stroke) */}
          <motion.path
            d={path1}
            fill="none"
            stroke={`url(#grad-${id})`}
            strokeWidth="60"
            strokeLinecap="round"
            opacity="0.15"
            animate={{ d: [path1, path2, path1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: delay }}
          />
          
          {/* Layer 2: Simulated Inner Glow (Fast Geometric Stroke) */}
          <motion.path
            d={path1}
            fill="none"
            stroke={`url(#grad-${id})`}
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.4"
            animate={{ d: [path1, path2, path1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: delay }}
          />
          
          {/* Layer 3: Main ribbon body */}
          <motion.path
            d={path1}
            fill="none"
            stroke={`url(#grad-${id})`}
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.8"
            animate={{ d: [path1, path2, path1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: delay }}
          />
          
          {/* Layer 4: Sinuous bright core */}
          <motion.path
            d={path1}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ d: [path1, path2, path1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: delay }}
          />
        </g>
      </svg>
    </div>
  );
}
