"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function EsotericWallpaperKaleidoscope() {
  const { scrollY } = useScroll();
  
  // Create an interactive "motor" driven purely by the user's scroll depth.
  // We map every 1000px of scrolling to a full 2PI cycle of the kaleidoscope.
  const motor = useTransform(scrollY, (y) => (y / 1000) * Math.PI * 2);

  // Transform 1: The inner elements (Sacred Alpha) orbit and spin
  const alphaY = useTransform(motor, (m) => -(250 + Math.sin(m * 2) * 80));
  const alphaRotate = useTransform(motor, (m) => m * (180 / Math.PI) * 1.5);

  // Transform 2: The middle elements (Pyramids) breathe radially
  const pyramidY = useTransform(motor, (m) => -(450 + Math.cos(m) * 120));
  const pyramidRotate = useTransform(motor, (m) => -m * (180 / Math.PI) * 0.8);

  // Transform 3: Outer framing elements (Seeds of life) sweeping
  const seedY = useTransform(motor, (m) => -(700 + Math.sin(m * 0.5) * 200));
  const seedRotate = useTransform(motor, (m) => m * (180 / Math.PI) * 2.5);

  // Line opacity
  const lineOpacity = useTransform(motor, (m) => 0.2 + (Math.sin(m) + 1) * 0.2);

  // Central singularity transforms
  const centerRotate = useTransform(motor, m => m * (180 / Math.PI) * 0.5);
  
  // Outer frame transforms
  const frameRotate = useTransform(motor, m => -m * (180 / Math.PI) * 0.25);

  // Number of symmetry segments (N-fold Dihedral Symmetry D_n)
  const N = 12;
  const segments = Array.from({ length: N }).map((_, i) => i * (360 / N));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none mix-blend-screen z-0 flex items-center justify-center opacity-80">
      <div className="w-full h-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" className="w-full h-full max-w-[2000px] object-cover scale-125 md:scale-100">
          <defs>
            <linearGradient id="esoteric-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            {/* Primitive Library */}
            <g id="seed" fill="none" stroke="url(#esoteric-gold)" strokeWidth="2.5">
              <circle cx="0" cy="0" r="50" />
              <circle cx="0" cy="-50" r="50" />
              <circle cx="43.3" cy="-25" r="50" />
              <circle cx="43.3" cy="25" r="50" />
              <circle cx="0" cy="50" r="50" />
              <circle cx="-43.3" cy="25" r="50" />
              <circle cx="-43.3" cy="-25" r="50" />
              <circle cx="0" cy="0" r="100" />
            </g>

            <g id="pyramid" fill="none" stroke="url(#esoteric-gold)" strokeWidth="2.5">
              <path d="M 0,-120 Q -60,-20 -100,100" />
              <path d="M 0,-120 Q 60,-20 100,100" />
              <line x1="0" y1="-120" x2="-60" y2="100" strokeWidth="1.5" />
              <line x1="0" y1="-120" x2="60" y2="100" strokeWidth="1.5" />
              <line x1="-30" y1="-60" x2="30" y2="-60" />
              <line x1="-75" y1="20" x2="75" y2="20" strokeWidth="2.5" />
              <line x1="-50" y1="35" x2="50" y2="35" strokeWidth="1" />
              <path d="M -20,-90 Q 0,-105 20,-90 Q 0,-75 -20,-90 Z" strokeWidth="2" />
              <ellipse cx="0" cy="-90" rx="2" ry="7" fill="url(#esoteric-gold)" />
            </g>

            <g id="sacred-alpha" fill="none" stroke="url(#esoteric-gold)" strokeWidth="3">
              <path d="M -40,-60 C 20,0 80,70 0,100 C -80,70 -20,0 40,-60" strokeLinecap="round" />
              <path d="M -20,-30 C 10,-5 40,40 0,70 C -40,40 -10,-5 20,-30" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="0" cy="30" r="12" strokeWidth="1.5" />
              <circle cx="0" cy="30" r="4" fill="url(#esoteric-gold)" />
            </g>

            <g id="sacred-flower" fill="none" stroke="url(#esoteric-gold)" strokeWidth="3">
              <circle cx="0" cy="0" r="120" />
              <circle cx="0" cy="0" r="110" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="0" cy="0" r="10" />
              <circle cx="0" cy="0" r="3" fill="url(#esoteric-gold)" />
              <path d="M 0,-110 Q 30,-60 15,-25 A 15,15 0 0,1 -15,-25 Q -30,-60 0,-110 Z" />
              <path d="M 0,110 Q -30,60 -15,25 A 15,15 0 0,1 15,25 Q 30,60 0,110 Z" />
              <path d="M 110,0 Q 60,30 25,15 A 15,15 0 0,1 25,-15 Q 60,-30 110,0 Z" />
              <path d="M -110,0 Q -60,-30 -25,-15 A 15,15 0 0,1 -25,15 Q -60,30 -110,0 Z" />
              <circle cx="60" cy="60" r="4" fill="url(#esoteric-gold)" />
              <circle cx="-60" cy="-60" r="4" fill="url(#esoteric-gold)" />
              <circle cx="60" cy="-60" r="4" fill="url(#esoteric-gold)" />
              <circle cx="-60" cy="60" r="4" fill="url(#esoteric-gold)" />
            </g>
          </defs>

          {/* ----- PROCEDURAL KALEIDOSCOPE ENGINE ----- */}
          {/* Applying the Dihedral Symmetry Group (D_n) */}
          <g transform="translate(1000, 1000)">
            {/* 1. The Central Singularity */}
            <motion.g style={{ rotate: centerRotate, scale: 1.5, transformOrigin: "0px 0px" }}>
              <use href="#sacred-flower" />
            </motion.g>

            {/* 2. The D_n Mirror Multiplier */}
            {segments.map((angle) => (
              <g key={`segment-${angle}`} transform={`rotate(${angle})`}>
                
                {/* The Real Wedge */}
                <g>
                  <motion.g style={{ y: alphaY, rotate: alphaRotate, transformOrigin: "0px 0px" }}>
                    <use href="#sacred-alpha" transform="scale(0.8)" />
                  </motion.g>
                  <motion.g style={{ y: pyramidY, rotate: pyramidRotate, transformOrigin: "0px 0px" }}>
                    <use href="#pyramid" transform="scale(0.8)" />
                  </motion.g>
                  <motion.g style={{ y: seedY, rotate: seedRotate, transformOrigin: "0px 0px" }}>
                    <use href="#seed" transform="scale(0.8)" />
                  </motion.g>
                  <motion.line 
                    x1="0" y1="0" 
                    x2="0" y2="-1200" 
                    stroke="url(#esoteric-gold)" 
                    strokeWidth="1.5" 
                    strokeDasharray="5 15"
                    style={{ opacity: lineOpacity, transformOrigin: "0px 0px" }}
                  />
                </g>
                
                {/* The Mirrored Wedge (Creates true Dihedral Reflection) */}
                <g transform="scale(-1, 1)">
                  <motion.g style={{ y: alphaY, rotate: alphaRotate, transformOrigin: "0px 0px" }}>
                    <use href="#sacred-alpha" transform="scale(0.8)" />
                  </motion.g>
                  <motion.g style={{ y: pyramidY, rotate: pyramidRotate, transformOrigin: "0px 0px" }}>
                    <use href="#pyramid" transform="scale(0.8)" />
                  </motion.g>
                  <motion.g style={{ y: seedY, rotate: seedRotate, transformOrigin: "0px 0px" }}>
                    <use href="#seed" transform="scale(0.8)" />
                  </motion.g>
                  <motion.line 
                    x1="0" y1="0" 
                    x2="0" y2="-1200" 
                    stroke="url(#esoteric-gold)" 
                    strokeWidth="1.5" 
                    strokeDasharray="5 15"
                    style={{ opacity: lineOpacity, transformOrigin: "0px 0px" }}
                  />
                </g>

              </g>
            ))}
            
            {/* Outer Frame to ground the kaleidoscope */}
            <motion.circle 
              cx="0" cy="0" r="950" 
              stroke="url(#esoteric-gold)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="20 40" 
              style={{ rotate: frameRotate, transformOrigin: "0px 0px" }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
