"use client";

import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";
import HowItWorksGraphic from "@/components/HowItWorksGraphic";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const STEPS = [
  {
    number: "01",
    statusSymbol: "[STATUS: INGEST READY]",
    title: "Instant One-Click Session Launch",
    description:
      "Create a live streaming session in seconds. Select source language and microphone input—zero hardware or local app installation required.",
  },
  {
    number: "02",
    statusSymbol: "[STATUS: NEURAL PIPELINE]",
    title: "Sub-Second Target Configuration",
    description:
      "Configure target languages instantly. Exbabel's neural pipeline processes continuous speech parallel to your live audio stream.",
  },
  {
    number: "03",
    statusSymbol: "[STATUS: ZERO-FRICTION ACCESS]",
    title: "Instant Web & QR Code Access",
    description:
      "Attendees scan a QR code or tap a web link on any phone, tablet, or browser to join immediately without downloading apps.",
  },
  {
    number: "04",
    statusSymbol: "[STATUS: LIVE STREAM DELIVERED]",
    title: "Continuous Speech Audio & Captions",
    description:
      "Speak naturally without pausing. Exbabel streams live translated speech audio (~2.0s) and frame-accurate captions (~1.0s) in real-time.",
  },
];

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-primary">Exbabel</span>
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono">STATUS: ONLINE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200" />
            <span className="text-xs text-slate-500">Live Host</span>
          </div>
        </div>

        <div className="relative p-8 flex items-center justify-center min-h-[200px] bg-slate-100/50">
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-40">
            <div className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">
              Create live session
            </div>
          </div>

          <motion.div
            className="relative z-10 bg-white rounded-xl shadow-2xl p-6 w-64 border border-slate-100"
            {...fadeUp(0.2)}
          >
            <div className="text-xs font-bold text-slate-400 mb-1 font-mono">[SESSION PARAMETERS]</div>
            <div className="text-sm font-bold text-slate-900 mb-4">Start Live Stream</div>
            
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">Source Language</label>
                <div className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 border border-slate-200 flex items-center justify-between">
                  <span>English (US)</span>
                  <span className="text-emerald-600 font-bold text-[10px] font-mono">DETECTED</span>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">Target Pipeline</label>
                <div className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
                  Multilingual Streaming
                </div>
              </div>
            </div>

            <div className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg text-center shadow-md shadow-primary/20">
              Start Session →
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LanguageSelectorMockup() {
  const selectedLangs = ["Spanish", "Mandarin", "French", "Arabic", "Portuguese", "Korean"];
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-6 border border-slate-100 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold text-slate-400 font-mono">[PIPELINE TARGETS]</div>
            <div className="text-sm font-bold text-slate-900">Configured Output Languages</div>
          </div>
          <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            100+ READY
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {selectedLangs.map((lang, idx) => (
            <motion.div
              key={lang}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80 text-xs font-medium text-slate-700"
            >
              <span>{lang}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QrCodeMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-6 border border-slate-100 flex flex-col items-center text-center space-y-4">
        <div className="text-xs font-bold text-slate-400 font-mono">[ZERO-APP ATTENDEE ACCESS]</div>
        <div className="w-36 h-36 bg-slate-900 rounded-xl p-3 flex items-center justify-center relative shadow-inner">
          <div className="w-full h-full border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center text-white font-mono text-xs font-bold">
            QR CODE
          </div>
        </div>
        <div className="text-xs font-bold text-slate-700">Scan or visit exbabel.live/join</div>
      </div>
    </div>
  );
}

function TranslateLiveMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-6 border border-slate-100 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold font-mono text-emerald-700">STREAM ACTIVE</span>
          </div>
          <span className="text-xs font-mono text-slate-400">LATENCY: 2.02s</span>
        </div>

        <div className="space-y-2">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-400 block mb-0.5">SPEAKER (ENGLISH)</span>
            <p className="text-slate-800 font-medium">"Welcome everyone to our service today."</p>
          </div>

          <div className="bg-primary/10 p-3 rounded-xl border border-primary/20 text-xs">
            <span className="font-bold text-primary block mb-0.5">STREAM (SPANISH)</span>
            <p className="text-slate-900 font-bold">"Bienvenidos a todos a nuestro servicio hoy."</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold font-mono">
            ⚙️ WORKFLOW ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight">
            How Exbabel Delivers Real-Time Translation
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Zero app downloads. Zero expensive hardware. Operational in under two minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              {...fadeUp(idx * 0.15)}
              className="bg-[#F8F9FA] rounded-2xl p-6 border border-[#EAD6FF]/60 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-[#394dfe] font-mono">{step.number}</span>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {step.statusSymbol}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] leading-snug">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Workflow Graphic */}
        <div className="mt-16 bg-[#F8F9FA] p-6 rounded-3xl border border-[#EAD6FF]/80 shadow-sm">
          <HowItWorksGraphic />
        </div>
      </div>
    </section>
  );
}
