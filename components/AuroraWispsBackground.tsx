'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AuroraWispsBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-white">
      <svg className="absolute w-full h-full opacity-60" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          {/* Pink to Blue Gradient */}
          <linearGradient id="wispGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD6E5" />
            <stop offset="50%" stopColor="#EAD6FF" />
            <stop offset="100%" stopColor="#D6F5FF" />
          </linearGradient>
          
          {/* Blue to Pink Gradient */}
          <linearGradient id="wispGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#D6F5FF" />
            <stop offset="50%" stopColor="#EAD6FF" />
            <stop offset="100%" stopColor="#FFD6E5" />
          </linearGradient>

          {/* Yellow to Purple Gradient */}
          <linearGradient id="wispGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF7D1" />
            <stop offset="50%" stopColor="#EAD6FF" />
            <stop offset="100%" stopColor="#FFD6E5" />
          </linearGradient>

          {/* Glow Filter for Smoky/Ribbon Effect */}
          <filter id="wispGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Wisp 1: Top Edge */}
        <motion.path
          d="M -20,5 C 20,15 60,-5 120,5"
          fill="none"
          stroke="url(#wispGrad1)"
          strokeWidth="3"
          filter="url(#wispGlow)"
          animate={{
            d: [
              "M -20,5 C 20,15 60,-5 120,5",
              "M -20,10 C 30,0 70,15 120,10",
              "M -20,5 C 20,15 60,-5 120,5"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wisp 2: Bottom Edge */}
        <motion.path
          d="M -20,95 C 40,85 80,105 120,95"
          fill="none"
          stroke="url(#wispGrad2)"
          strokeWidth="4"
          filter="url(#wispGlow)"
          animate={{
            d: [
              "M -20,95 C 40,85 80,105 120,95",
              "M -20,90 C 20,100 60,85 120,90",
              "M -20,95 C 40,85 80,105 120,95"
            ]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wisp 3: Left Edge */}
        <motion.path
          d="M 5,-20 C -5,20 15,60 5,120"
          fill="none"
          stroke="url(#wispGrad3)"
          strokeWidth="3.5"
          filter="url(#wispGlow)"
          opacity="0.8"
          animate={{
            d: [
              "M 5,-20 C -5,20 15,60 5,120",
              "M 10,-20 C 0,30 -5,80 10,120",
              "M 5,-20 C -5,20 15,60 5,120"
            ]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wisp 4: Right Edge */}
        <motion.path
          d="M 95,-20 C 105,30 85,70 95,120"
          fill="none"
          stroke="rgba(214, 245, 255, 0.8)"
          strokeWidth="2"
          filter="url(#wispGlow)"
          animate={{
            d: [
              "M 95,-20 C 105,30 85,70 95,120",
              "M 90,-20 C 100,20 105,80 90,120",
              "M 95,-20 C 105,30 85,70 95,120"
            ]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
