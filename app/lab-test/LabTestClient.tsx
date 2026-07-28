"use client";

import { useState } from "react";
import Link from "next/link";
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
    { id: "datasets", label: "Raw trial datasets" },
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

  return (
    <div className="bg-[#F8F9FA] text-[#0B1220] min-h-screen font-sans relative overflow-hidden">
      {/* Ambient Aurora Background Blurs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#394dfe]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#D6F5FF]/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#EAD6FF]/30 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Main Title Section Header with Primary Blue H1 Headline */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-12 pt-12 pb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl font-black text-[#394dfe] tracking-tight">Exbabel</span>
          <span className="text-slate-300 font-light">|</span>
          <span className="text-[13px] font-bold tracking-widest text-[#394dfe] uppercase">
            RESEARCH LAB BENCHMARK REPORT
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#394dfe] tracking-tight leading-[1.1] mb-5 font-sans">
          Real-Time Speech Translation Latency Analysis
        </h1>
        <p className="text-base sm:text-lg text-[#667085] max-w-3xl leading-[1.6]">
          Empirical objective audio-visual latency evaluation measuring end-to-end performance 
          from speech onset to target-language caption visibility (TTFC) and synthesized audio playback (TTFS). 
          Conducted under IEEE 829 software performance testing guidelines.
        </p>
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
            <div className="bg-[#0B1220] text-white p-7 rounded-2xl shadow-[0_12px_35px_rgba(11,18,32,0.3)] flex flex-col justify-between min-h-[230px] border border-[#394dfe]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#394dfe]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-3 relative z-10">
                <div className="text-[13px] font-bold tracking-widest text-[#D6F5FF] uppercase">
                  TECHNICAL WHITEPAPER
                </div>
                <h3 className="text-lg font-bold leading-snug text-white">
                  EXB-LAB-2026-001: Latency Benchmark Report
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Complete 11-section research report including FFmpeg astats RMS profiles, frame extraction logs, and mathematical scaling formulas.
                </p>
              </div>
              <div className="pt-4 relative z-10">
                <a
                  href="/docs/exbabel_vs_wordly_lab_report.md"
                  download="Exbabel_vs_Wordly_Lab_Report_2026.md"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#D6F5FF] hover:text-white transition-colors group"
                >
                  <span>Download report (.MD)</span>
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

          {/* Download CTA Banner with Exbabel Primary Blue Pill Buttons */}
          <div className="bg-[#0B1220] text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#394dfe]/25 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="space-y-2 text-center md:text-left relative z-10">
              <div className="text-[13px] font-bold tracking-widest text-[#D6F5FF] uppercase">
                ENTERPRISE AUDIT PACKAGE
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-white">
                Download the Complete Technical Whitepaper
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Get full access to EXB-LAB-2026-001 including mathematical models, RMS decibel logs, and raw datasets.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0 relative z-10">
              <a
                href="/docs/exbabel_vs_wordly_lab_report.md"
                download="Exbabel_vs_Wordly_Lab_Report_2026.md"
                className="px-8 py-3.5 rounded-full bg-[#394dfe] hover:bg-[#394dfe]/90 text-white font-bold text-sm transition-all shadow-lg shadow-[#394dfe]/30 hover:scale-[1.02]"
              >
                Download Whitepaper (.MD)
              </a>
              <Link
                href="/demo"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
              >
                Schedule Live Demo
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
