'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const STEPS = [
  {
    number: "01",
    title: "Launch a Live Session",
    description: "Create a translation session from any browser. Select your language and begin speaking — no equipment or installation required.",
    image: "/images/step1-launch.png",
  },
  {
    number: "02",
    title: "Configure Target Languages",
    description: "Choose from over 200 languages. Exbabel processes speech in parallel, delivering continuous translation without pausing or buffering.",
    image: "/images/step2-configure.png",
  },
  {
    number: "03",
    title: "Share Access Instantly",
    description: "Attendees join via QR code or web link on any device — phone, tablet, or laptop. No app download required.",
    image: "/images/step3-share.png",
  },
  {
    number: "04",
    title: "Listen and Read in Real Time",
    description: "Translated speech audio streams in approximately two seconds. Multilingual captions appear in approximately one second. Speak naturally — without pausing.",
    image: "/images/step4-listen.png",
  },
];

export default function HowItWorksGraphic() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STEPS.map((step, idx) => (
        <motion.div
          key={step.number}
          {...fadeUp(idx * 0.12)}
          className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {/* Step number overlay */}
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
              <span className="text-xs font-black text-[#4F46E5]">{step.number}</span>
            </div>
          </div>

          {/* Text content */}
          <div className="p-5 space-y-2">
            <h4 className="text-base font-bold text-[#0B1220] leading-snug">{step.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
