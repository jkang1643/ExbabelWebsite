"use client";

import { motion } from "framer-motion";

export default function EsotericWallpaper() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none mix-blend-screen z-0 flex items-center justify-center opacity-90">
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: [0.8, 1, 0.8],
          filter: [
            "drop-shadow(0 0 10px rgba(245,158,11,0.5))",
            "drop-shadow(0 0 30px rgba(253,224,71,0.9)) drop-shadow(0 0 15px rgba(245,158,11,0.8))",
            "drop-shadow(0 0 10px rgba(245,158,11,0.5))"
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
              {/* Outer sweeping legs of the 'A' */}
              <path d="M 0,-120 Q -60,-20 -100,100" />
              <path d="M 0,-120 Q 60,-20 100,100" />
              
              {/* Inner straight legs */}
              <line x1="0" y1="-120" x2="-60" y2="100" strokeWidth="1.5" />
              <line x1="0" y1="-120" x2="60" y2="100" strokeWidth="1.5" />
              
              {/* Apex horizontal separator (creating the top triangle) */}
              <line x1="-30" y1="-60" x2="30" y2="-60" />
              
              {/* Main crossbars of the 'A' */}
              <line x1="-75" y1="20" x2="75" y2="20" strokeWidth="2.5" />
              <line x1="-50" y1="35" x2="50" y2="35" strokeWidth="1" />
              
              {/* Narrow Glaring Eye resting inside the apex triangle */}
              <path d="M -20,-90 Q 0,-105 20,-90 Q 0,-75 -20,-90 Z" strokeWidth="2" />
              {/* Reptilian/Royal vertical slit pupil */}
              <ellipse cx="0" cy="-90" rx="2" ry="7" fill="url(#esoteric-gold)" />
              
              {/* Radiant crown energy lines */}
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

            {/* Sacred Alpha / Ichthys Symbol */}
            <g id="sacred-alpha" fill="none" stroke="url(#esoteric-gold)" strokeWidth="3">
              <path d="M -40,-60 C 20,0 80,70 0,100 C -80,70 -20,0 40,-60" strokeLinecap="round" />
              <path d="M -20,-30 C 10,-5 40,40 0,70 C -40,40 -10,-5 20,-30" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="-80" x2="0" y2="120" strokeWidth="1.5" strokeDasharray="6 6" />
              <line x1="-60" y1="30" x2="60" y2="30" strokeWidth="1" />
              <circle cx="0" cy="30" r="12" strokeWidth="1.5" />
              <circle cx="0" cy="30" r="4" fill="url(#esoteric-gold)" />
            </g>
          </defs>

          <use href="#hexagram" x="500" y="500" transform="scale(1.4)" />
          
          <use href="#pyramid" x="500" y="200" transform="scale(1.1)" />
          <use href="#pyramid" x="500" y="800" transform="rotate(180 500 800) scale(1.1)" />

          <use href="#seed" x="200" y="500" transform="scale(1.3)" />
          <use href="#seed" x="800" y="500" transform="scale(1.3)" />

          <use href="#filigree" x="50" y="50" />
          <use href="#filigree" x="950" y="50" transform="scale(-1, 1) translate(-1000, 0)" />
          <use href="#filigree" x="50" y="950" transform="scale(1, -1) translate(0, -1000)" />
          <use href="#filigree" x="950" y="950" transform="scale(-1, -1) translate(-1000, -1000)" />

          {/* Sacred Alpha Symbol filling the upper right corner */}
          <g transform="translate(920, 200) rotate(45) scale(1.6)">
            <use href="#sacred-alpha" />
          </g>

          {/* Celestial Scatter (Adjusted to accommodate the new symbols) */}
          <use href="#moon" x="200" y="750" transform="rotate(-45 200 750)" />
          <use href="#moon" x="800" y="750" transform="rotate(135 800 750)" />
          
          <use href="#star" x="120" y="350" />
          <use href="#star" x="880" y="350" />
          <use href="#star" x="850" y="650" />
          <use href="#star" x="150" y="650" />
          <use href="#star" x="350" y="850" />
          <use href="#star" x="650" y="850" />

          <g stroke="url(#esoteric-gold)" strokeWidth="2.5" fill="none" strokeLinejoin="round">
            <polyline points="50,500 150,500 250,400 250,250" />
            <polyline points="950,500 850,500 750,400 750,250" />
            <polyline points="50,500 150,500 250,600 250,750" />
            <polyline points="950,500 850,500 750,600 750,750" />
            <polygon points="500,80 880,500 500,920 120,500" strokeWidth="1.5" strokeDasharray="15 15" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
