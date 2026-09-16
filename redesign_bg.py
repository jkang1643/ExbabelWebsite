import os

bg_content = '''"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FAFBFF] -z-10 pointer-events-none">
      {/* 
        We use an SVG to draw smooth, flowing ribbons that frame the text.
      */}
      <svg className="absolute w-full h-full opacity-90" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="heroGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAD6FF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D6F5FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFF7D1" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="heroGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D6F5FF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#EAD6FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFD6E5" stopOpacity="0.0" />
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

      {/* Massive subtle background glows to tie it all together */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#EAD6FF] rounded-full mix-blend-multiply filter blur-[140px] opacity-40 pointer-events-none hidden lg:block" />
      <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-[#D6F5FF] rounded-full mix-blend-multiply filter blur-[140px] opacity-40 pointer-events-none hidden lg:block" />
    </div>
  );
}
'''

path = '/home/jkang1643/projects/exbabel/components/HeroAuroraBackground.tsx'
with open(path, 'w', encoding='utf-8') as f:
    f.write(bg_content)

hero_path = '/home/jkang1643/projects/exbabel/components/GlassmorphicHero.tsx'
with open(hero_path, 'r', encoding='utf-8') as f:
    hero_content = f.read()

# Import the new component
if 'import HeroAuroraBackground' not in hero_content:
    hero_content = hero_content.replace('import { motion, AnimatePresence } from "framer-motion";',
                                      'import { motion, AnimatePresence } from "framer-motion";\nimport HeroAuroraBackground from "./HeroAuroraBackground";')

# Replace Dot Grid Pattern
old_dot = '''      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at center, #0B1220 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />'''
new_dot = '''      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at center, #0B1220 1px, transparent 1px)", 
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)"
        }} 
      />'''
hero_content = hero_content.replace(old_dot, new_dot)

# Replace Aurora Background
old_aurora = '''      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="showcase-blob absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[80px] md:blur-[160px] opacity-60 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-pink)' }} />
        <div className="showcase-blob absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[80px] md:blur-[160px] opacity-60 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-purple)', animationDelay: '4s' }} />
        <div className="showcase-blob absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full filter blur-[80px] md:blur-[160px] opacity-60 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-yellow)', animationDelay: '8s' }} />
        <div className="showcase-blob absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full filter blur-[70px] md:blur-[140px] opacity-60 hidden lg:block" style={{ backgroundColor: 'var(--color-aurora-mint)', animationDelay: '12s' }} />
      </div>'''
new_aurora = '''      <HeroAuroraBackground />'''
hero_content = hero_content.replace(old_aurora, new_aurora)

with open(hero_path, 'w', encoding='utf-8') as f:
    f.write(hero_content)

print("Redesign applied successfully")