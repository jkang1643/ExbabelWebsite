"use client";

import { motion } from "framer-motion";

export default function EsotericWallpaperCTA() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none mix-blend-screen z-0 flex items-center justify-center opacity-90">
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ 
          opacity: [0.3, 0.9, 0.3],
          filter: [
            "drop-shadow(0 0 5px rgba(245,158,11,0.2))",
            "drop-shadow(0 0 40px rgba(253,224,71,1)) drop-shadow(0 0 20px rgba(245,158,11,0.9))",
            "drop-shadow(0 0 5px rgba(245,158,11,0.2))"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full flex items-center justify-center scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="w-full h-full max-w-[1400px] object-contain">
          <defs>
            <linearGradient id="esoteric-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            <g id="seed" fill="none" stroke="url(#esoteric-gold)" strokeWidth="2.5">
              <circle cx="0" cy="0" r="50" />
              <circle cx="0" cy="-50" r="50" />
              <circle cx="43.3" cy="-25" r="50" />
              <circle cx="43.3" cy="25" r="50" />
              <circle cx="0" cy="50" r="50" />
              <circle cx="-43.3" cy="25" r="50" />
              <circle cx="-43.3" cy="-25" r="50" />
              <circle cx="0" cy="0" r="100" />
              <circle cx="0" cy="0" r="105" strokeWidth="1" />
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
              <g strokeWidth="2">
                <line x1="0" y1="-130" x2="0" y2="-160" />
                <line x1="-20" y1="-125" x2="-40" y2="-145" />
                <line x1="20" y1="-125" x2="40" y2="-145" />
              </g>
            </g>

            <g id="hexagram" fill="none" stroke="url(#esoteric-gold)" strokeWidth="3">
              <circle cx="0" cy="0" r="150" />
              <circle cx="0" cy="0" r="140" strokeWidth="1" strokeDasharray="8 8" />
              <circle cx="0" cy="0" r="75" />
              <polygon points="0,-150 129.9,75 -129.9,75" />
              <polygon points="0,150 129.9,-75 -129.9,-75" />
              <circle cx="0" cy="-150" r="10" fill="url(#esoteric-gold)" />
              <circle cx="129.9" cy="75" r="10" fill="url(#esoteric-gold)" />
              <circle cx="-129.9" cy="75" r="10" fill="url(#esoteric-gold)" />
              <circle cx="0" cy="150" r="10" fill="url(#esoteric-gold)" />
              <circle cx="129.9" cy="-75" r="10" fill="url(#esoteric-gold)" />
              <circle cx="-129.9" cy="-75" r="10" fill="url(#esoteric-gold)" />
              <circle cx="0" cy="0" r="15" fill="url(#esoteric-gold)" />
              <line x1="0" y1="-150" x2="0" y2="150" />
              <line x1="-129.9" y1="-75" x2="129.9" y2="75" />
              <line x1="-129.9" y1="75" x2="129.9" y2="-75" />
            </g>

            <g id="filigree" fill="none" stroke="url(#esoteric-gold)" strokeWidth="3">
              <polyline points="0,0 100,0 150,50 150,150" strokeLinejoin="round" />
              <polyline points="20,0 80,0 120,40 120,120" strokeWidth="1.5" strokeLinejoin="round" />
              <polyline points="150,150 150,200 100,250 0,250" strokeLinejoin="round" />
              <circle cx="150" cy="150" r="15" />
              <circle cx="150" cy="150" r="5" fill="url(#esoteric-gold)" />
            </g>

            <g id="moon" fill="url(#esoteric-gold)">
              <path d="M 0,-30 A 30,30 0 1,1 0,30 A 20,20 0 1,0 0,-30 Z" />
            </g>
            <g id="star" fill="url(#esoteric-gold)">
              <polygon points="0,-15 4,-4 15,-4 6,4 10,15 0,8 -10,15 -6,4 -15,-4 -4,-4" />
            </g>

            <g id="sacred-alpha" fill="none" stroke="url(#esoteric-gold)" strokeWidth="3">
              <path d="M -40,-60 C 20,0 80,70 0,100 C -80,70 -20,0 40,-60" strokeLinecap="round" />
              <path d="M -20,-30 C 10,-5 40,40 0,70 C -40,40 -10,-5 20,-30" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="-80" x2="0" y2="120" strokeWidth="1.5" strokeDasharray="6 6" />
              <line x1="-60" y1="30" x2="60" y2="30" strokeWidth="1" />
              <circle cx="0" cy="30" r="12" strokeWidth="1.5" />
              <circle cx="0" cy="30" r="4" fill="url(#esoteric-gold)" />
            </g>

            {/* Jerusalem Rose / Sacred Flower */}
            <g id="sacred-flower" fill="none" stroke="url(#esoteric-gold)" strokeWidth="3">
              <circle cx="0" cy="0" r="120" />
              <circle cx="0" cy="0" r="110" strokeWidth="1" strokeDasharray="4 8" />
              
              {/* Much smaller central node */}
              <circle cx="0" cy="0" r="10" />
              <circle cx="0" cy="0" r="3" fill="url(#esoteric-gold)" />
              
              {/* Teardrop Petals: Rounded on the end touching the center, pointed facing out */}
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

          {/* ----- PROCEDURAL VARIATION: BIG BANG RADIAL EXPANSION ----- */}
          
          {/* Center Origin (The Singularity) */}
          <g transform="translate(500, 500) scale(0.8)">
            <use href="#sacred-flower" />
          </g>
          
          {/* Inner Orbit (Midway out) */}
          {/* Top Right & Bottom Left - Pyramids pointing outward */}
          <g transform="translate(750, 250) rotate(45) scale(1.2)">
            <use href="#pyramid" />
          </g>
          <g transform="translate(250, 750) rotate(-135) scale(1.2)">
            <use href="#pyramid" />
          </g>
          
          {/* Top Left & Bottom Right - Seeds of Life */}
          <g transform="translate(250, 250) scale(1.2)">
            <use href="#seed" />
          </g>
          <g transform="translate(750, 750) scale(1.2)">
            <use href="#seed" />
          </g>

          {/* Extreme Outer Orbit (Corners) - Sacred Alphas */}
          <g transform="translate(50, 50) rotate(-45) scale(1.5)"><use href="#sacred-alpha" /></g>
          <g transform="translate(950, 50) rotate(45) scale(1.5)"><use href="#sacred-alpha" /></g>
          <g transform="translate(50, 950) rotate(-135) scale(1.5)"><use href="#sacred-alpha" /></g>
          <g transform="translate(950, 950) rotate(135) scale(1.5)"><use href="#sacred-alpha" /></g>

          {/* Radial Connective Tissue (Explosion Rays & Shockwaves) */}
          <g stroke="url(#esoteric-gold)" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeDasharray="5 10">
            {/* Rays shooting from the center origin to the outer corners */}
            <line x1="500" y1="500" x2="50" y2="50" />
            <line x1="500" y1="500" x2="950" y2="50" />
            <line x1="500" y1="500" x2="50" y2="950" />
            <line x1="500" y1="500" x2="950" y2="950" />
            
            {/* Rays shooting to the mid edges */}
            <line x1="500" y1="500" x2="500" y2="-100" strokeDasharray="3 6" />
            <line x1="500" y1="500" x2="500" y2="1100" strokeDasharray="3 6" />
            <line x1="500" y1="500" x2="-100" y2="500" strokeDasharray="3 6" />
            <line x1="500" y1="500" x2="1100" y2="500" strokeDasharray="3 6" />

            {/* Circular expansion rings (shockwaves) */}
            <circle cx="500" cy="500" r="150" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="500" cy="500" r="350" strokeWidth="1" strokeDasharray="8 16" />
            <circle cx="500" cy="500" r="500" strokeWidth="2" strokeDasharray="15 30" />
          </g>

          {/* Celestial Decoration Pass (Expanding outward) */}
          <use href="#moon" x="500" y="100" transform="rotate(-90 500 100)" />
          <use href="#moon" x="500" y="900" transform="rotate(90 500 900)" />
          <use href="#moon" x="100" y="500" transform="rotate(180 100 500)" />
          <use href="#moon" x="900" y="500" transform="rotate(0 900 500)" />

          <use href="#star" x="380" y="380" />
          <use href="#star" x="620" y="380" />
          <use href="#star" x="380" y="620" />
          <use href="#star" x="620" y="620" />
          
          <use href="#star" x="200" y="500" />
          <use href="#star" x="800" y="500" />
          <use href="#star" x="500" y="200" />
          <use href="#star" x="500" y="800" />

        </svg>
      </motion.div>
    </div>
  );
}
