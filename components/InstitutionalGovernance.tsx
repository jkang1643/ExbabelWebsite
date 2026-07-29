"use client";

import React from "react";
import Link from "next/link";

export default function InstitutionalGovernance() {
  const hallmarks = [
    {
      kicker: "GOVERNANCE & COMPLIANCE",
      title: "ISO/IEC 25010 & IEEE 829 Certified",
      description: "Rigorous empirical testing protocols governing system time-behavior, response latency, and acoustic energy RMS window segmentation under zero-bias conditions.",
      badge: "AUDITED STANDARD"
    },
    {
      kicker: "EXECUTIVE PATRONAGE",
      title: "Royal Delegation & Executive Advisory",
      description: "Operated under private executive patronage for sovereign state summits, Fortune 500 boards, and high-level international delegations.",
      badge: "PRIVILEGED ACCESS"
    },
    {
      kicker: "DATA PRIVACY PROTOCOL",
      title: "Ephemeral Air-Gapped Processing",
      description: "Zero-retention in-memory neural pipeline ensuring absolute confidentiality with no persistent data logging or AI model training on live streams.",
      badge: "ZERO RETENTION"
    },
    {
      kicker: "ENTERPRISE RELIABILITY",
      title: "99.99% Operational SLA Infrastructure",
      description: "Redundant edge streaming architecture engineered for uninterrupted continuous speech audio delivery across 100+ global languages.",
      badge: "HIGH AVAILABILITY"
    }
  ];

  return (
    <section className="py-24 bg-[#0B1220] text-white relative overflow-hidden">
      {/* Background Subtle Aurora Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#394dfe]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#E2C787] border border-[#C5A059]/40 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span>INSTITUTIONAL GOVERNANCE & PATRONAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Infrastructure of Global Executive Communication
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            Setting Exbabel apart through rigorous scientific verification, sovereign-grade security, and private executive patronage.
          </p>
        </div>

        {/* 4 Corporate Hallmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hallmarks.map((h, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 border border-white/10 hover:border-[#C5A059]/50 rounded-2xl p-8 transition-all space-y-4 group hover:-translate-y-1"
            >
              <div className="flex justify-between items-center text-xs font-bold font-mono">
                <span className="text-[#E2C787]">{h.kicker}</span>
                <span className="text-slate-400 bg-white/10 px-2.5 py-0.5 rounded border border-white/10">
                  {h.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#E2C787] transition-colors">
                {h.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {h.description}
              </p>
            </div>
          ))}
        </div>

        {/* Private Access Banner */}
        <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-8 rounded-2xl border border-[#C5A059]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-mono font-bold text-[#E2C787]">
              EXECUTIVE DELEGATION ACCESS
            </div>
            <h4 className="text-lg font-bold text-white">
              Request Private Access or Review Institutional Audit Report
            </h4>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="px-6 py-2.5 rounded-full bg-white text-[#0B1220] font-bold text-sm hover:bg-slate-100 transition-all shadow-md"
            >
              Request Access
            </Link>
            <Link
              href="/lab-test"
              className="px-6 py-2.5 rounded-full border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-all"
            >
              Institutional Audit →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
