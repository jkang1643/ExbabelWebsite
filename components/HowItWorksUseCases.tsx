"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HowItWorksUseCases() {
  const [activeTab, setActiveTab] = useState<"churches" | "conferences" | "education" | "government">("churches");

  const useCases = {
    churches: {
      title: "Churches & Ministries",
      badge: "Sermon Translation & Multilingual Congregations",
      points: [
        "Translate Sunday sermons live into Spanish, Korean, Mandarin, or Vietnamese.",
        "Integrate with church soundboards or OBS livestream encoders.",
        "Provide printed QR codes in pews so visitors listen on their phones.",
      ],
      quote: "Exbabel transformed our multicultural church service. Non-English speaking members now participate fully every Sunday.",
    },
    conferences: {
      title: "Global Conferences & Summits",
      badge: "Keynotes, Breakouts & Multi-Hall Events",
      points: [
        "Replace expensive interpreter booths ($5,000+/day) with scalable AI translation.",
        "Provide live stage subtitle overlays and web audio feeds for 5,000+ attendees.",
        "Pre-load speaker glossaries, brand names, and keynote slide terminology.",
      ],
      quote: "We hosted 3,000 international delegates across 12 breakout tracks seamlessly with Exbabel.",
    },
    education: {
      title: "Higher Education & Universities",
      badge: "Lectures, Commencements & International Students",
      points: [
        "Provide real-time lecture captions for international students and ESOL programs.",
        "Broadcast commencement speeches live into parents' native languages.",
        "Export transcript archives directly into Canvas or Blackboard LMS.",
      ],
      quote: "Our international students can now follow complex academic lectures in real-time.",
    },
    government: {
      title: "Government & Public Assemblies",
      badge: "City Council Meetings, Public Hearings & Community Forums",
      points: [
        "Ensure ADA & Section 508 compliance with high-accuracy live captions.",
        "Provide public hearing translation for diverse municipal communities.",
        "Maintain zero-retention data privacy and SOC 2 security compliance.",
      ],
      quote: "City council meetings are now fully accessible to all non-English speaking residents in our city.",
    },
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="layout-spine max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase text-blue-400 tracking-widest block mb-2">Tailored Workflows</span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            How Exbabel Adapts to Your Setting
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-medium">
            Explore how Exbabel fits your specific event environment and operational needs.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {(["churches", "conferences", "education", "government"] as const).map((key) => {
            const labels = {
              churches: "Churches & Ministries",
              conferences: "Global Conferences",
              education: "Higher Education",
              government: "Government & Public",
            };
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                {labels[key]}
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block px-3 py-1 bg-primary/20 text-blue-300 text-xs font-bold rounded-full">
                  {useCases[activeTab].badge}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  {useCases[activeTab].title}
                </h3>
                <ul className="space-y-3 text-slate-300 text-sm md:text-base font-medium">
                  {useCases[activeTab].points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-xs mt-0.5">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 border border-slate-800 italic text-slate-300 text-sm leading-relaxed relative">
                <span className="text-4xl text-primary opacity-30 font-serif leading-none block mb-2">&ldquo;</span>
                <p className="mb-4">{useCases[activeTab].quote}</p>
                <div className="text-xs font-bold text-white not-italic">— Verified Exbabel Customer</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
