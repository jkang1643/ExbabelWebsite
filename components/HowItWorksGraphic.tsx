"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { y: 30 },
  whileInView: { y: 0 },
  viewport: { once: true, margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "300px" : "200px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const STEPS = [
  {
    number: "01",
    title: "Launch a Live Session",
    description: "Create a translation session from any browser. Select your language and begin speaking — no equipment or installation required.",
    image: "/images/step1-launch.jpg",
    accentFrom: "#38BDF8", // Sky blue
  },
  {
    number: "02",
    title: "Configure Target Languages",
    description: "Choose from over 200 languages. Exbabel processes speech in parallel, delivering continuous translation without pausing or buffering.",
    image: "/images/step2-configure.jpg",
    accentFrom: "#818CF8", // Indigo
  },
  {
    number: "03",
    title: "Share Access Instantly",
    description: "Attendees join via QR code or web link on any device — phone, tablet, or laptop. No app download required.",
    image: "/images/step3-share.jpg",
    accentFrom: "#34D399", // Emerald
  },
  {
    number: "04",
    title: "Listen and Read in Real Time",
    description: "Translated speech audio streams in approximately two seconds. Multilingual captions appear in approximately one second. Speak naturally — without pausing.",
    image: "/images/step4-listen.jpg",
    accentFrom: "#A78BFA", // Purple
  },
];

function InteractiveStepCard({ step, index }: { step: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, w: 1, h: 1 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || prefersReduced || isTouch) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width, h: rect.height });
    },
    [prefersReduced, isTouch]
  );

  const normX = mouse.w ? (mouse.x - mouse.w / 2) / (mouse.w / 2) : 0;
  const normY = mouse.h ? (mouse.y - mouse.h / 2) / (mouse.h / 2) : 0;
  const tiltX = isHovered && !prefersReduced && !isTouch ? normY * -4 : 0;
  const tiltY = isHovered && !prefersReduced && !isTouch ? normX * 4 : 0;

  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20 w-full relative z-10 px-4`}>
      {/* Text Side */}
      <motion.div 
        className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}
        {...fadeUp(0.1)}
      >
        <div 
          className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 shadow-lg text-white font-black text-xl"
          style={{ background: step.accentFrom, boxShadow: `0 8px 20px ${step.accentFrom}60` }}
        >
          {step.number}
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#0B1220] mb-3">{step.title}</h3>
        <p className="text-base text-slate-600 max-w-sm leading-relaxed">{step.description}</p>
      </motion.div>

      {/* Card Side */}
      <motion.div 
        className="w-full md:w-1/2 relative flex justify-center md:justify-start"
        initial={{ y: 40, scale: 0.95 }}
        whileInView={{ y: 0, scale: 1 }} viewport={{ once: true, margin: typeof window !== 'undefined' && window.innerWidth < 768 ? "300px" : "200px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative rounded-3xl overflow-hidden cursor-default w-full aspect-[4/3] max-w-md"
          style={{
            transform: isHovered && !prefersReduced && !isTouch
              ? `translate3d(0,-8px,0) scale(1.04) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
              : isHovered && isTouch
              ? "translate3d(0,-4px,0) scale(1.02)"
              : "translate3d(0,0,0) scale(1)",
            transformStyle: "preserve-3d",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease, background-color 0.4s ease",
            boxShadow: isHovered
              ? `0 20px 60px ${step.accentFrom}35, 0 8px 24px rgba(0,0,0,0.06)`
              : "0 10px 30px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
            border: `1px solid ${isHovered ? step.accentFrom + "40" : "rgba(0,0,0,0.06)"}`,
            backgroundColor: isHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Inner Image */}
          <div className="absolute inset-1.5 rounded-[20px] overflow-hidden bg-slate-50">
             <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
              }}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          
          {/* Dynamic glare effect based on mouse position */}
          {!prefersReduced && !isTouch && isHovered && (
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                transition: "opacity 0.4s ease",
                }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorksGraphic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Smooth scroll sync: tracks progress as user scrolls through the 4 steps
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 60%"],
  });

  // Heavily overdamped spring (damping ratio ~2.1):
  // Eliminates mouse-wheel bouncing/recoil completely and provides a cushioned, less-sensitive glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 25,
    mass: 0.8,
    restDelta: 0.0005,
  });

  const activePathLength = prefersReduced ? 1 : smoothProgress;

  return (
    <div ref={containerRef} className="relative w-full py-10 mt-10">
      {/* Background Sweeping SVG Path (Wavy Timeline) */}
      <div className="absolute inset-0 flex justify-center overflow-visible pointer-events-none z-0">
        <svg 
          className="w-full max-w-[1000px] h-full" 
          viewBox="0 0 1000 1600" 
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="33%" stopColor="#818CF8" stopOpacity="0.8" />
              <stop offset="66%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="auraGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="40" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Subtle static background path to preview timeline track */}
          <path
            d="M 500,0 C 700,200 800,400 500,600 C 200,800 100,1000 500,1200 C 800,1400 600,1500 500,1600"
            stroke="url(#timelineGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.12"
          />

          {/* Sweeping Wide Ambient Aura (Smoothly syncs with scroll) */}
          <motion.path
            d="M 500,0 C 700,200 800,400 500,600 C 200,800 100,1000 500,1200 C 800,1400 600,1500 500,1600"
            stroke="url(#timelineGrad)"
            strokeWidth="60"
            strokeLinecap="round"
            opacity="0.12"
            filter="url(#auraGlow)"
            style={{ pathLength: activePathLength }}
          />

          {/* Soft Glow Trail (Smoothly syncs with scroll) */}
          <motion.path
            d="M 500,0 C 700,200 800,400 500,600 C 200,800 100,1000 500,1200 C 800,1400 600,1500 500,1600"
            stroke="url(#timelineGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.32"
            filter="url(#glow)"
            style={{ pathLength: activePathLength }}
          />

          {/* Thin Curvy Line (Crisp foreground line, zero-bounce gentle scroll sync) */}
          <motion.path
            d="M 500,0 C 700,200 800,400 500,600 C 200,800 100,1000 500,1200 C 800,1400 600,1500 500,1600"
            stroke="url(#timelineGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
            style={{ pathLength: activePathLength }}
          />

          {/* Continuous Flowing Energy Stream (Living pulse along the line) */}
          {!prefersReduced && (
            <motion.path
              d="M 500,0 C 700,200 800,400 500,600 C 200,800 100,1000 500,1200 C 800,1400 600,1500 500,1600"
              stroke="url(#pulseGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathOffset: 0, pathLength: 0.16 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </svg>
      </div>

      {/* Steps Container */}
      <div className="flex flex-col gap-24 md:gap-32 relative z-10 w-full">
        {STEPS.map((step, idx) => (
          <InteractiveStepCard key={step.number} step={step} index={idx} />
        ))}
      </div>
    </div>
  );
}

