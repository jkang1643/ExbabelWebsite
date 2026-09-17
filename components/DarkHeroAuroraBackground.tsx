"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DarkHeroAuroraBackground() {
  return (
    <div className="mobile-fade-up absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dot Grid Pattern - Dark Version */}
      <div 
        className="mobile-fade-up absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", 
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)"
        }} 
      />

      {/* 
        We use an SVG to draw smooth, flowing ribbons that frame the text.
      */}
      <svg className="mobile-fade-up absolute w-full h-full opacity-70" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="darkHeroGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#394dfe" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#022C43" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2E0249" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="darkHeroGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D6F5FF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#394dfe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4A042E" stopOpacity="0.0" />
          </linearGradient>
          <filter id="darkRibbonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Ribbon Main */}
        <motion.path
          d="M -10,0 C 25,35 30,70 -10,110"
          fill="none"
          stroke="url(#darkHeroGradLeft)"
          strokeWidth="7"
          filter="url(#darkRibbonGlow)"
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
          stroke="url(#darkHeroGradLeft)"
          strokeWidth="2.5"
          filter="url(#darkRibbonGlow)"
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
          stroke="url(#darkHeroGradRight)"
          strokeWidth="6"
          filter="url(#darkRibbonGlow)"
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
          stroke="url(#darkHeroGradRight)"
          strokeWidth="3.5"
          filter="url(#darkRibbonGlow)"
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
        className="mobile-fade-up absolute w-32 h-32 rounded-full hidden md:block top-[20%] left-[12%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #4a5cff 0%, #394dfe 60%, #1e29a8 100%)',
          boxShadow: '0 20px 40px rgba(57, 77, 254, 0.4), inset 0 0 20px rgba(255,255,255,0.2)',
          filter: 'blur(2px)'
        }}
        animate={{
          y: ['0vh', '-4vh', '0vh'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="mobile-fade-up absolute w-24 h-24 rounded-full hidden md:block bottom-[25%] right-[15%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #D6F5FF 0%, #6bc1ff 60%, #207ab5 100%)',
          boxShadow: '0 20px 40px rgba(107, 193, 255, 0.4), inset 0 0 20px rgba(255,255,255,0.2)',
          filter: 'blur(2px)'
        }}
        animate={{
          y: ['0vh', '3vh', '0vh'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Massive subtle background glows to tie it all together */}
      <div className="mobile-fade-up absolute top-[0%] left-[10%] w-[50vw] h-[50vw] bg-[#394dfe] rounded-full mix-blend-screen filter blur-[180px] opacity-20 pointer-events-none hidden lg:block" />
      <div className="mobile-fade-up absolute bottom-[0%] right-[10%] w-[50vw] h-[50vw] bg-[#D6F5FF] rounded-full mix-blend-screen filter blur-[160px] opacity-10 pointer-events-none hidden lg:block" />
    </div>
  );
}
