"use client";

import { motion } from "framer-motion";

export default function HowItWorksPostEvent() {
  const deliverables = [
    {
      icon: "📜",
      title: "Instant Exportable Transcripts",
      desc: "Download full verbatim transcripts and translations in TXT, DOCX, SRT, and VTT subtitle formats immediately after the session ends.",
    },
    {
      icon: "🎙️",
      title: "Multi-Language AI Dubbing",
      desc: "Automatically dub post-event sermon videos or keynote recordings into studio-quality voice tracks for YouTube, Vimeo, or podcast distribution.",
    },
    {
      icon: "📊",
      title: "Executive Summaries & Notes",
      desc: "AI automatically generates structured summaries, action items, and key takeaways formatted for church newsletters or executive reports.",
    },
    {
      icon: "🔒",
      title: "Enterprise Compliance & Security",
      desc: "Bank-grade data encryption in transit and at rest. Fully compliant with SOC 2 Type II, ISO 27001, GDPR, HIPAA, and CCPA standards.",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="layout-spine max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase text-purple-600 tracking-widest block mb-2">Phase 4 — Post-Event &amp; Intelligence</span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Post-Event Dubbing, Transcripts &amp; Security
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            Your event doesn&apos;t end when the live stream stops. Exbabel turns live audio into persistent multilingual media assets and verified transcripts.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Compliance Security Grid */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-2xl relative">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block mb-1">Security &amp; Compliance Standards</span>
            <h4 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              Enterprise-Grade Data Protection
            </h4>
            <p className="text-xs text-slate-300">
              Zero audio retention policy options available for sensitive executive, legal, or governmental proceedings.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center font-bold text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200">ISO 27001</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200">SOC 2 Type II</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200">GDPR Compliant</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200">HIPAA Ready</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200">CCPA Certified</div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200">VPAT Accessible</div>
          </div>
        </div>
      </div>
    </section>
  );
}
