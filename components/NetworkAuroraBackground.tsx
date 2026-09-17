"use client";

import React from "react";
import { motion } from "framer-motion";

export default function NetworkAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#D6F5FF] rounded-full mix-blend-multiply filter blur-[140px] opacity-60 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#EAD6FF] rounded-full mix-blend-multiply filter blur-[160px] opacity-50 pointer-events-none hidden lg:block" />
      <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-[#E0F7FA] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none hidden lg:block" />

      {/* Network Orbits & Nodes SVG */}
      <svg className="absolute w-full h-full opacity-80" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="orbitGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#394dfe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#394dfe" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="orbitGradRight" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#394dfe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#394dfe" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Left Orbits */}
        <path d="M -20,0 A 70,70 0 0,0 30,120" fill="none" stroke="url(#orbitGradLeft)" strokeWidth="0.15" />
        <path d="M -10,-10 A 90,90 0 0,0 50,110" fill="none" stroke="url(#orbitGradLeft)" strokeWidth="0.08" />
        <path d="M -30,20 A 50,50 0 0,0 10,130" fill="none" stroke="url(#orbitGradLeft)" strokeWidth="0.08" />

        {/* Right Orbits */}
        <path d="M 120,100 A 70,70 0 0,0 70,-20" fill="none" stroke="url(#orbitGradRight)" strokeWidth="0.15" />
        <path d="M 110,110 A 90,90 0 0,0 50,-10" fill="none" stroke="url(#orbitGradRight)" strokeWidth="0.08" />
        <path d="M 130,80 A 50,50 0 0,0 90,-30" fill="none" stroke="url(#orbitGradRight)" strokeWidth="0.08" />

        {/* Left Nodes */}
        <circle cx="2" cy="65" r="0.8" fill="#394dfe" opacity="0.6" />
        <circle cx="15" cy="30" r="0.5" fill="#394dfe" opacity="0.4" />
        <circle cx="25" cy="95" r="0.6" fill="#394dfe" opacity="0.5" />
        <circle cx="8" cy="85" r="0.4" fill="#394dfe" opacity="0.7" />

        {/* Right Nodes */}
        <circle cx="98" cy="35" r="0.8" fill="#394dfe" opacity="0.6" />
        <circle cx="85" cy="70" r="0.5" fill="#394dfe" opacity="0.4" />
        <circle cx="75" cy="5" r="0.6" fill="#394dfe" opacity="0.5" />
        <circle cx="92" cy="15" r="0.4" fill="#394dfe" opacity="0.7" />
      </svg>

      {/* Floating Network Spheres (Glassy/Frosty) */}
      <motion.div
        className="absolute w-40 h-40 rounded-full hidden md:block top-[25%] left-[8%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #a8c0ff 60%, #3f2b96 100%)',
          boxShadow: '0 20px 40px rgba(57, 77, 254, 0.15), inset 0 0 20px rgba(255,255,255,1)',
          filter: 'blur(1px)'
        }}
        animate={{
          y: ['0vh', '-3vh', '0vh'],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-20 h-20 rounded-full hidden md:block bottom-[25%] left-[18%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #D6F5FF 60%, #5C258D 100%)',
          boxShadow: '0 15px 30px rgba(57, 77, 254, 0.1), inset 0 0 15px rgba(255,255,255,0.9)',
          filter: 'blur(1px)'
        }}
        animate={{
          y: ['0vh', '4vh', '0vh'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute w-28 h-28 rounded-full hidden md:block top-[40%] right-[10%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #EAD6FF 60%, #4389A2 100%)',
          boxShadow: '0 20px 40px rgba(57, 77, 254, 0.15), inset 0 0 20px rgba(255,255,255,1)',
          filter: 'blur(1.5px)'
        }}
        animate={{
          y: ['0vh', '3vh', '0vh'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Very faint dot grid for added texture */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at center, #0B1220 1px, transparent 1px)", 
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, transparent 40%, black 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 40%, black 100%)"
        }} 
      />
    </div>
  );
}
