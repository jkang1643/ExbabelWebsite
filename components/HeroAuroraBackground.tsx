"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden  z-0 pointer-events-none">
      {/* 
        We use an SVG to draw smooth, flowing ribbons that frame the text.
      */}
      {/* Mobile-only fallback background: fades to pure white near the top like Wix */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 via-25% to-[#C6F0FF]/35 md:hidden z-[-1]" />
      {/* Additional top white fade veil to guarantee seamless transition under navbar */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white via-white/95 to-transparent pointer-events-none md:hidden z-0" />
      {/* Soft pastel ambient glow positioned at bottom half on mobile */}
      <div className="absolute -bottom-10 left-[-10%] right-[-10%] h-64 bg-gradient-to-t from-[#C6F0FF]/40 via-[#E5CBFF]/20 to-transparent filter blur-2xl pointer-events-none md:hidden z-[-1]" />
      <svg className="absolute w-full h-full opacity-90 hidden md:block" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="heroGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5CBFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#C6F0FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFF7D1" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="heroGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C6F0FF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E5CBFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFD6E5" stopOpacity="0.05" />
          </linearGradient>
          <filter id="ribbonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Ribbon Main */}
        <motion.path
          d="M -10,0 C 25,35 30,70 -10,110"
          fill="none"
          stroke="url(#heroGradLeft)"
          strokeWidth="7"
          filter="url(#ribbonGlow)"
          animate={{
            d: [
              "M -10,0 C 25,35 30,70 -10,110",
              "M -5,-5 C 30,30 20,75 -5,115",
              "M -10,0 C 25,35 30,70 -10,110"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Left Ribbon Echo */}
        <motion.path
          d="M -20,10 C 15,45 20,80 -20,120"
          fill="none"
          stroke="url(#heroGradLeft)"
          strokeWidth="2.5"
          filter="url(#ribbonGlow)"
          opacity="0.6"
          animate={{
            d: [
              "M -20,10 C 15,45 20,80 -20,120",
              "M -15,5 C 20,40 10,85 -15,125",
              "M -20,10 C 15,45 20,80 -20,120"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Right Ribbon Main */}
        <motion.path
          d="M 110,-10 C 75,25 70,60 110,100"
          fill="none"
          stroke="url(#heroGradRight)"
          strokeWidth="6"
          filter="url(#ribbonGlow)"
          animate={{
            d: [
              "M 110,-10 C 75,25 70,60 110,100",
              "M 105,-15 C 70,30 80,55 105,105",
              "M 110,-10 C 75,25 70,60 110,100"
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Right Ribbon Echo */}
        <motion.path
          d="M 120,0 C 85,35 80,70 120,110"
          fill="none"
          stroke="url(#heroGradRight)"
          strokeWidth="3.5"
          filter="url(#ribbonGlow)"
          opacity="0.7"
          animate={{
            d: [
              "M 120,0 C 85,35 80,70 120,110",
              "M 115,-5 C 80,40 90,65 115,115",
              "M 120,0 C 85,35 80,70 120,110"
            ]
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating 3D Orbs (Glassy Spheres) */}
      <motion.div
        className="absolute w-32 h-32 rounded-full hidden md:block top-[20%] left-[12%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #EAD6FF 60%, #C8A2C8 100%)',
          boxShadow: '0 20px 40px rgba(234, 214, 255, 0.4), inset 0 0 20px rgba(255,255,255,0.9)',
          filter: 'blur(1px)'
        }}
        animate={{
          y: ['0vh', '-4vh', '0vh'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full hidden md:block bottom-[25%] right-[15%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #D6F5FF 60%, #ADD8E6 100%)',
          boxShadow: '0 20px 40px rgba(214, 245, 255, 0.4), inset 0 0 20px rgba(255,255,255,0.9)',
          filter: 'blur(1px)'
        }}
        animate={{
          y: ['0vh', '3vh', '0vh'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-16 h-16 rounded-full hidden md:block top-[15%] right-[28%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #FFD6E5 60%, #FFB6C1 100%)',
          boxShadow: '0 10px 30px rgba(255, 214, 229, 0.4), inset 0 0 15px rgba(255,255,255,0.9)',
          filter: 'blur(1px)'
        }}
        animate={{
          y: ['0vh', '-2vh', '0vh'],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Enhanced optical glows (~10% coverage & saturation increase for even coverage) */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-[#E5CBFF] rounded-full mix-blend-multiply filter blur-[140px] opacity-45 pointer-events-none hidden lg:block" />
      <div className="absolute top-[10%] right-[-10%] w-[55vw] h-[55vw] bg-[#C6F0FF] rounded-full mix-blend-multiply filter blur-[140px] opacity-45 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-[-5%] left-[20%] w-[45vw] h-[35vw] bg-[#FFD6E5] rounded-full mix-blend-multiply filter blur-[130px] opacity-[0.25] pointer-events-none hidden lg:block" />
    </div>
  );
}
