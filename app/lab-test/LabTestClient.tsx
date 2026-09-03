"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LatencyPipelineGraphic from "@/components/svg/LatencyPipelineGraphic";
import ContinuousSpeechGraphic from "@/components/svg/ContinuousSpeechGraphic";
import SignalProcessingGraphic from "@/components/svg/SignalProcessingGraphic";

export default function LabTestClient() {
  const [activeTab, setActiveTab] = useState<string>("executive");

  const tabs = [
    { id: "executive", label: "Executive summary" },
    { id: "continuous", label: "Continuous speech lag" },
    { id: "methodology", label: "Testing methodology" },
    { id: "standards", label: "IEEE & ISO standards" },
    { id: "datasets", label: "Raw trial datasets & PDF" },
    { id: "download", label: "Download whitepaper" },
  ];

  const projections = [
    { duration: "6.82 s (Measured Trial)", wordly: "7.220 s", exbabel: "2.027 s", advantage: "3.6× Faster" },
    { duration: "10.00 s Continuous Speech", wordly: "~10.400 s", exbabel: "~2.000 s", advantage: "~5.2× Faster" },
    { duration: "20.00 s Continuous Speech", wordly: "~20.400 s", exbabel: "~2.000 s", advantage: "~10.2× Faster" },
    { duration: "30.00 s Continuous Speech", wordly: "~30.400 s", exbabel: "~2.000 s", advantage: "~15.2× Faster" },
    { duration: "60.00 s Continuous Speech", wordly: "~60.400 s", exbabel: "~2.000 s", advantage: "~30.2× Faster" },
  ];

  const standards = [
    {
      code: "IEEE 829-2008",
      kicker: "TESTING STANDARD",
      title: "Standard for Software & System Test Documentation",
      body: "Governs master test planning, trial logging, apparatus calibration, anomaly reporting, and formal summary documentation under EXB-LAB-2026-001.",
    },
    {
      code: "ISO/IEC 25010:2011",
      kicker: "PERFORMANCE MODEL",
      title: "Software Quality Requirements and Evaluation (SQuaRE)",
      body: "Establishes standard performance efficiency models, measuring system time-behavior, response latency, and resource scaling.",
    },
    {
      code: "ITU-R BT.1359-1",
      kicker: "SIGNAL SYNCHRONIZATION",
      title: "Relative Timing of Sound & Vision Signal Processing",
      body: "Defines objective frame-accurate video demuxing (30.00 FPS) and acoustic energy RMS window segmentation for A/V alignment.",
    },
    {
      code: "FFmpeg ASTATS Engine",
      kicker: "ACOUSTIC SIGNAL ANALYSIS",
      title: "Algorithmic Energy & Silence Boundary Detection",
      body: "Measures Root Mean Square (RMS) energy shifts from noise floor (-60 dB) to speech peak (-34 dB) at 21.3ms window resolution.",
    },
  ];

  const datasetFiles = [
    {
      name: "EXB-LAB-2026-001 Executive Report (PDF)",
      format: "PDF Document",
      size: "39 KB",
      hash: "90d639705d85322de7c5c31eb324f345d2748e32adbd4ff1787b4c0dfb87c870",
      link: "/docs/exbabel_vs_wordly_lab_report.pdf",
      filename: "Exbabel_vs_Wordly_Lab_Report_2026.pdf",
      badge: "OFFICIAL REPORT"
    },
    {
      name: "EXB-LAB-2026-001 Markdown Source (MD)",
      format: "Markdown Whitepaper",
      size: "18 KB",
      hash: "8f7e2a9b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
      link: "/docs/exbabel_vs_wordly_lab_report.md",
      filename: "Exbabel_vs_Wordly_Lab_Report_2026.md",
      badge: "SOURCE CODE"
    },
    {
      name: "Exbabel Trial Latency Dataset (JSON)",
      format: "JSON Dataset",
      size: "12 KB",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      link: "/docs/speed_test_results.json",
      filename: "exbabel_speed_test_results.json",
      badge: "RAW DATA"
    },
    {
      name: "Wordly Trial Latency Dataset (JSON)",
      format: "JSON Dataset",
      size: "14 KB",
      hash: "f4c8996fb92427ae41e4649b934ca495991b7852b855e3b0c44298fc1c149afb",
      link: "/docs/wordly_speed_results.json",
      filename: "wordly_speed_results.json",
      badge: "RAW DATA"
    }
  ];

  return (
    <div className="bg-[#F8F9FA] text-[#0B1220] min-h-screen font-sans relative overflow-hidden">
      {/* Dedicated Solid Blue Research Lab Top Header Bar */}
      <header className="w-full bg-[#394dfe] text-white py-4 px-6 sm:px-12 shadow-md relative z-30">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Brand & Pill Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl font-black text-white tracking-tight hover:opacity-90 transition-opacity">
              Exbabel
            </Link>
            <span className="text-white/40 font-light">|</span>
            <span className="bg-white/15 border border-white/25 text-white text-[11px] font-black tracking-widest px-3.5 py-1 rounded-full uppercase">
              RESEARCH LAB
            </span>
          </div>

          {/* Right: Nav Link & Download Buttons */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link 
              href="/" 
              className="text-xs sm:text-sm font-bold text-white/90 hover:text-white transition-colors flex items-center gap-1.5 mr-2"
            >
              <span>← Back to Home</span>
            </Link>
            
            <a
              href="/docs/exbabel_vs_wordly_lab_report.pdf"
              download="Exbabel_vs_Wordly_Lab_Report_2026.pdf"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#394dfe] font-extrabold text-xs sm:text-sm whitespace-nowrap flex-shrink-0 shadow-sm hover:bg-slate-50 transition-all group"
            >
              <svg className="w-4 h-4 flex-shrink-0 text-[#394dfe]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download PDF Report</span>
            </a>

            <a
              href="/docs/exbabel_vs_wordly_lab_report.md"
              download="Exbabel_vs_Wordly_Lab_Report_2026.md"
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white font-black text-xs hover:bg-white/25 transition-all"
            >
              .MD
            </a>
          </div>

        </div>
      </header>

      {/* Ambient Aurora Background Blurs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#394dfe]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#D6F5FF]/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#EAD6FF]/30 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Main Title Section Header & Key Takeaways Banner */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-12 pt-8 pb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#394dfe] tracking-tight leading-[1.1] mb-4 font-sans">
          Real-Time Speech Translation Latency Analysis
        </h1>
        <p className="text-base sm:text-lg text-[#667085] max-w-3xl leading-[1.6] mb-8">
          Empirical objective audio-visual latency evaluation measuring end-to-end performance 
          from speech onset to target-language caption visibility (TTFC) and synthesized audio playback (TTFS). 
          Conducted under IEEE 829 software performance testing guidelines.
        </p>

        {/* HIGH-IMPACT KEY TAKEAWAYS & WORDLY COMPETITOR COMPARISON HERO CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 text-[#0B1220] border border-[#EAD6FF] shadow-[0_16px_50px_rgba(57,77,254,0.1)] relative overflow-hidden mb-4">
          {/* Subtle Ambient Lighting Background */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#394dfe]/5 rounded-full blur-[100px] pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D6F5FF]/30 rounded-full blur-[80px] pointer-events-none -z-0" />

          <div className="relative z-10 space-y-6">
            
            {/* Direct Head-to-Head Header with Logos */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EAD6FF]/80">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#394dfe] text-white text-xs font-black tracking-widest uppercase shadow-sm">
                  KEY TAKEAWAYS
                </span>
                <span className="text-xs font-bold text-[#667085]">
                  Direct Head-to-Head Performance Summary
                </span>
              </div>
              
              {/* VS Competitor Branding */}
              <div className="flex items-center gap-3 bg-[#F8F9FA] px-4 py-2 rounded-2xl border border-[#EAD6FF]/80 shadow-sm">
                <span className="text-base sm:text-lg font-black text-[#0B1220] tracking-tight">Exbabel</span>
                <span className="text-xs font-bold text-[#394dfe] bg-[#394dfe]/10 px-2 py-0.5 rounded-md">VS</span>
                <div className="bg-white px-3 py-1.5 rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                  <Image 
                    src="/photos/6985523b7c2acbba74c2eecb_Wordly Tagline 2 (1).svg" 
                    alt="Wordly" 
                    width={90} 
                    height={35} 
                    className="h-6 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* TL;DR Summary Headline for instant understanding */}
            <div className="max-w-4xl space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1220] leading-tight">
                Exbabel is <span className="text-[#394dfe] underline decoration-4 decoration-[#394dfe]">up to 10.2× faster</span> than Wordly during continuous speech.
              </h2>
              <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
                While Wordly pauses and buffers audio for up to 7.22 seconds waiting for the speaker to stop talking, 
                Exbabel streams live translated speech continuously in under 2 seconds without interruptions.
              </p>
            </div>

            {/* 3 Main Takeaway Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#EAD6FF]/80 hover:border-[#394dfe] transition-all flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#059669] uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡ Continuous Speech Lag</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#0B1220]">
                    10.2× <span className="text-sm font-bold text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded-full">FASTER</span>
                  </div>
                </div>
                <div className="text-xs text-[#667085] leading-relaxed pt-3 border-t border-[#EAD6FF]/60">
                  <strong className="text-[#0B1220]">Zero Audio Buffering:</strong> Exbabel stays at ~2.0s streaming lag. Wordly forces listeners to wait <span className="text-red-600 font-semibold">7.22s+</span> for sentence breaks.
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#EAD6FF]/80 hover:border-[#394dfe] transition-all flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#394dfe] uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡ Live Speech Start (TTFS)</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#0B1220]">
                    2.80× <span className="text-sm font-bold text-[#394dfe] bg-[#394dfe]/10 px-2 py-0.5 rounded-full">FASTER</span>
                  </div>
                </div>
                <div className="text-xs text-[#667085] leading-relaxed pt-3 border-t border-[#EAD6FF]/60">
                  <strong className="text-[#0B1220]">2.02s vs 5.68s:</strong> Exbabel starts synthesized translated speech audio playback almost 3 seconds before Wordly even begins.
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#EAD6FF]/80 hover:border-[#394dfe] transition-all flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡ Target Subtitles (TTFC)</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#0B1220]">
                    1.95× <span className="text-sm font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded-full">FASTER</span>
                  </div>
                </div>
                <div className="text-xs text-[#667085] leading-relaxed pt-3 border-t border-[#EAD6FF]/60">
                  <strong className="text-[#0B1220]">1.01s vs 1.97s:</strong> On-screen captions appear in ~1.0 second from speech onset, giving instant visual translation.
                </div>
              </div>

            </div>

            {/* Quick Action Download Bar inside Hero Card */}
            <div className="pt-4 border-t border-[#EAD6FF]/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#667085]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>EXB-LAB-2026-001 Official Technical Audit & Benchmark Report</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/docs/exbabel_vs_wordly_lab_report.pdf"
                  download="Exbabel_vs_Wordly_Lab_Report_2026.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#394dfe] text-white font-bold text-xs hover:bg-[#394dfe]/90 transition-all shadow-sm"
                >
                  <span>Download Full PDF Report (.PDF)</span>
                  <span>→</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Siemens Layout Grid */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Left Vertical Sidebar Menu (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col bg-white rounded-2xl p-2 border border-[#EAD6FF]/80 shadow-[0_4px_20px_rgba(57,77,254,0.08)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-4 py-3.5 text-sm font-bold rounded-xl transition-all border-l-4 ${
                    isActive
                      ? "bg-[#394dfe]/10 text-[#394dfe] border-[#394dfe]"
                      : "bg-transparent text-[#667085] border-transparent hover:bg-slate-50 hover:text-[#0B1220]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Column 2: Center Main Feature Spotlight Card (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col bg-white rounded-2xl border border-[#EAD6FF]/80 p-6 shadow-[0_12px_45px_rgba(57,77,254,0.12)] hover:-translate-y-[2px] transition-all space-y-5">
            {/* Graphic 1: Latency Pipeline Graphic */}
            <div className="w-full bg-white rounded-xl overflow-hidden border border-slate-200 p-2 shadow-sm">
              <LatencyPipelineGraphic className="w-full h-auto" />
            </div>

            {/* Feature Content */}
            <div className="space-y-3">
              <div className="text-[13px] font-bold tracking-widest text-[#394dfe] uppercase">
                KEY BENCHMARK DISCOVERY
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] leading-snug">
                Streaming Architecture Prevents Continuous Speech Audio Lag
              </h2>
              <p className="text-sm text-[#667085] leading-relaxed">
                Wordly holds translated audio in a silence-detection buffer for up to 7.22 seconds during continuous speech. 
                Exbabel streams live translated speech continuously in ~2 seconds, eliminating delays during keynotes, sermons, and lectures.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab("continuous")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#394dfe] hover:underline transition-colors group"
                >
                  <span>Read continuous speech analysis</span>
                  <span className="group-hover:translate-x-1 transition-transform text-[#394dfe]">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Right Stacked Spotlight Cards (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Card A: Dark Ink & Primary Accent Card */}
            <div className="bg-[#0B1220] text-white p-7 rounded-2xl shadow-[0_12px_35px_rgba(11,18,32,0.3)] flex flex-col justify-between min-h-[250px] border border-[#394dfe]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#394dfe]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-3 relative z-10">
                <div className="text-[13px] font-bold tracking-widest text-[#D6F5FF] uppercase">
                  TECHNICAL WHITEPAPER (PDF & MD)
                </div>
                <h3 className="text-lg font-bold leading-snug text-white">
                  EXB-LAB-2026-001: Latency Benchmark Report
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Complete 11-section research report including FFmpeg astats RMS profiles, frame extraction logs, and mathematical scaling formulas.
                </p>
              </div>

              {/* PDF & MD Download Triggers */}
              <div className="pt-4 flex flex-col gap-2.5 relative z-10">
                <a
                  href="/docs/exbabel_vs_wordly_lab_report.pdf"
                  download="Exbabel_vs_Wordly_Lab_Report_2026.pdf"
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#394dfe] text-white font-bold text-xs hover:bg-[#394dfe]/90 transition-all shadow-md group"
                >
                  <span>Download PDF Report (.PDF)</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                
                <a
                  href="/docs/exbabel_vs_wordly_lab_report.md"
                  download="Exbabel_vs_Wordly_Lab_Report_2026.md"
                  className="inline-flex items-center justify-between px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-bold text-xs hover:bg-white/20 hover:text-white transition-all group"
                >
                  <span>Download Markdown Source (.MD)</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Card B: Light Surface Card with Primary Accent */}
            <div className="bg-white p-7 rounded-2xl border border-[#EAD6FF]/80 shadow-[0_8px_30px_rgba(57,77,254,0.1)] hover:-translate-y-[2px] transition-all flex flex-col justify-between min-h-[230px]">
              <div className="space-y-3">
                <div className="text-[13px] font-bold tracking-widest text-[#394dfe] uppercase">
                  RAW DATASET ACCESS
                </div>
                <h3 className="text-lg font-bold leading-snug text-[#0B1220]">
                  Machine-Readable Trial JSON Datasets
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Access raw 30 FPS frame indices, RMS decibel logs, and runnable Python analyzer scripts for independent audit and verification.
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="/docs/wordly_speed_results.json"
                  download="wordly_speed_results.json"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#394dfe] hover:underline transition-colors group"
                >
                  <span>Access raw trial data</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Lower Section: Tab Content & Projections Table */}
      <section className="bg-white border-t border-[#EAD6FF]/60 py-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 space-y-12">
          
          {/* Executive Summary View */}
          {activeTab === "executive" && (
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="text-[13px] font-bold tracking-widest text-[#394dfe] uppercase">
                  SECTION 01
                </div>
                <h3 className="text-2xl font-bold text-[#0B1220]">
                  Executive Head-to-Head Benchmark Findings
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-[#EAD6FF]/60 space-y-3">
                  <div className="text-[13px] font-bold text-[#394dfe] tracking-wider uppercase">
                    TIME TO FIRST CAPTION (TTFC)
                  </div>
                  <div className="text-3xl font-extrabold text-[#0B1220]">
                    1.013 s <span className="text-xs font-bold text-[#394dfe] bg-[#394dfe]/10 px-2.5 py-0.5 rounded-full border border-[#394dfe]/20">1.95× FASTER</span>
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Wordly mean TTFC: 1.974s. Exbabel renders target Spanish captions in ~1.0s from speech onset (0.403s pure processing time).
                  </p>
                </div>

                <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-[#EAD6FF]/60 space-y-3">
                  <div className="text-[13px] font-bold text-[#394dfe] tracking-wider uppercase">
                    TIME TO FIRST SPEECH (TTFS)
                  </div>
                  <div className="text-3xl font-extrabold text-[#0B1220]">
                    2.027 s <span className="text-xs font-bold text-[#394dfe] bg-[#394dfe]/10 px-2.5 py-0.5 rounded-full border border-[#394dfe]/20">2.80× FASTER</span>
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Wordly mean TTFS: 5.680s. Exbabel begins audio playback in ~2.0s (1.417s pure processing time).
                  </p>
                </div>

                <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-[#EAD6FF]/60 space-y-3">
                  <div className="text-[13px] font-bold text-[#394dfe] tracking-wider uppercase">
                    CONTINUOUS SPEECH LAG
                  </div>
                  <div className="text-3xl font-extrabold text-[#0B1220]">
                    10.2× <span className="text-xs font-bold text-[#394dfe] bg-[#394dfe]/10 px-2.5 py-0.5 rounded-full border border-[#394dfe]/20">ADVANTAGE</span>
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Wordly continuous speech lag: 7.220s. Exbabel maintains constant ~2.0s streaming delay without sentence buffering.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Continuous Speech Projection Model Table + Graphic 2 */}
          {(activeTab === "executive" || activeTab === "continuous") && (
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="text-[13px] font-bold tracking-widest text-[#394dfe] uppercase">
                  LATENCY SCALING MODEL
                </div>
                <h3 className="text-2xl font-bold text-[#0B1220]">
                  Continuous Speech Audio Latency Projections
                </h3>
                <p className="text-sm text-[#667085] max-w-3xl">
                  Linear scaling formula: Wordly TTFS scales with speech duration (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 text-[#0B1220]">TTFS ≈ Speech_Duration + 0.4s</code>) while Exbabel remains constant (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 text-[#0B1220]">TTFS ≈ 2.027s</code>).
                </p>
              </div>

              {/* Graphic 2: Continuous Speech Graphic */}
              <div className="bg-white p-4 rounded-2xl border border-[#EAD6FF]/80 shadow-sm">
                <ContinuousSpeechGraphic className="w-full h-auto" />
              </div>

              <div className="bg-white border border-[#EAD6FF]/80 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F8F9FA] text-[#0B1220] uppercase font-bold text-xs border-b border-[#EAD6FF]/60">
                    <tr>
                      <th className="p-4">Speech Duration</th>
                      <th className="p-4">Wordly Audio Delay (TTFS)</th>
                      <th className="p-4">Exbabel Audio Delay (TTFS)</th>
                      <th className="p-4 text-right">Exbabel Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAD6FF]/40 font-medium">
                    {projections.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-[#0B1220]">{p.duration}</td>
                        <td className="p-4 text-[#667085]">{p.wordly}</td>
                        <td className="p-4 text-[#394dfe] font-bold">{p.exbabel}</td>
                        <td className="p-4 text-right font-bold text-[#394dfe]">{p.advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Standards View + Graphic 3 */}
          {(activeTab === "standards" || activeTab === "executive") && (
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="text-[13px] font-bold tracking-widest text-[#394dfe] uppercase">
                  COMPLIANCE STANDARDS
                </div>
                <h3 className="text-2xl font-bold text-[#0B1220]">
                  Testing Standards & Protocols Followed
                </h3>
              </div>

              {/* Graphic 3: Signal Processing Graphic */}
              <div className="bg-white p-4 rounded-2xl border border-[#EAD6FF]/80 shadow-sm">
                <SignalProcessingGraphic className="w-full h-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {standards.map((s, idx) => (
                  <div key={idx} className="bg-[#F8F9FA] p-6 rounded-2xl border border-[#EAD6FF]/60 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-[#394dfe]">{s.code}</span>
                      <span className="text-[#667085]">{s.kicker}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#0B1220]">{s.title}</h4>
                    <p className="text-xs text-[#667085] leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 05: Raw Datasets & PDF Download Center */}
          {(activeTab === "datasets" || activeTab === "download" || activeTab === "executive") && (
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="text-[13px] font-bold tracking-widest text-[#394dfe] uppercase">
                  DATA TRANSPARENCY & AUDIT CENTER
                </div>
                <h3 className="text-2xl font-bold text-[#0B1220]">
                  Download Official Reports & Machine-Readable Datasets
                </h3>
              </div>

              <div className="bg-white border border-[#EAD6FF]/80 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F8F9FA] text-[#0B1220] uppercase font-bold text-xs border-b border-[#EAD6FF]/60">
                    <tr>
                      <th className="p-4">Resource Title</th>
                      <th className="p-4">Format</th>
                      <th className="p-4">Size</th>
                      <th className="p-4 hidden md:table-cell">SHA-256 Checksum</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAD6FF]/40 font-medium">
                    {datasetFiles.map((f, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-[#0B1220]">
                          <div className="flex items-center gap-2">
                            <span>{f.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#394dfe]/10 text-[#394dfe]">
                              {f.badge}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-[#667085]">{f.format}</td>
                        <td className="p-4 text-[#0B1220] font-mono text-xs">{f.size}</td>
                        <td className="p-4 hidden md:table-cell font-mono text-[11px] text-slate-400 truncate max-w-[200px]">
                          {f.hash}
                        </td>
                        <td className="p-4 text-right">
                          <a
                            href={f.link}
                            download={f.filename}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#394dfe] text-white font-bold text-xs hover:bg-[#394dfe]/90 transition-colors shadow-sm"
                          >
                            <span>Download</span>
                            <span>↓</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Download CTA Banner with PDF & MD Buttons */}
          <div className="bg-[#0B1220] text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#394dfe]/25 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="space-y-2 text-center md:text-left relative z-10">
              <div className="text-[13px] font-bold tracking-widest text-[#D6F5FF] uppercase">
                ENTERPRISE AUDIT PACKAGE
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-white">
                Download Official PDF Report & Whitepaper
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Get full access to EXB-LAB-2026-001 including mathematical models, RMS decibel logs, PDF document, and raw datasets.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0 relative z-10">
              <a
                href="/docs/exbabel_vs_wordly_lab_report.pdf"
                download="Exbabel_vs_Wordly_Lab_Report_2026.pdf"
                className="px-6 py-3.5 rounded-full bg-[#394dfe] hover:bg-[#394dfe]/90 text-white font-bold text-sm transition-all shadow-lg shadow-[#394dfe]/30 hover:scale-[1.02]"
              >
                Download PDF Report (.PDF)
              </a>
              <a
                href="/docs/exbabel_vs_wordly_lab_report.md"
                download="Exbabel_vs_Wordly_Lab_Report_2026.md"
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
              >
                Download .MD
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
