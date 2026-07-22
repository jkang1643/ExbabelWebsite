"use client";

import { motion } from "framer-motion";

export default function RoleCardsGraphic() {
  const cards = [
    {
      title: "Event Hosts & Speakers",
      subtitle: "Speak naturally in your native language. Exbabel handles live translation, captions, and distribution automatically.",
      bgColor: "bg-slate-50 border border-slate-200/60",
      graphic: (
        <div className="relative w-full h-44 bg-gradient-to-b from-blue-50/50 to-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Mockup transcript window */}
          <div className="bg-white rounded-xl p-3 shadow-md border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400">Live Speech Input</span>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">EN-US</span>
            </div>
            <p className="text-xs text-slate-700 font-mono leading-relaxed">
              &quot;Welcome everyone to today&apos;s sermon...&quot;
            </p>
          </div>

          {/* Emoji Badge */}
          <div className="self-end bg-white rounded-full p-2.5 shadow-lg border border-slate-100 text-xl animate-bounce">
            👋
          </div>
        </div>
      ),
    },
    {
      title: "AV & Production Teams",
      subtitle: "Connect existing soundboards, OBS, or video feeds with zero friction and zero audio latency.",
      bgColor: "bg-slate-50 border border-slate-200/60",
      graphic: (
        <div className="relative w-full h-44 bg-gradient-to-b from-purple-50/50 to-white rounded-2xl border border-slate-100 p-4 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Central status badge */}
          <div className="relative z-10 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 text-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary mx-auto mb-2 flex items-center justify-center font-bold text-xs">
              ☁️
            </div>
            <div className="text-xs font-bold text-slate-800">Live Processing</div>
            <div className="text-[10px] text-slate-400">0.2s latency</div>
          </div>

          {/* Floating file badges */}
          <span className="absolute top-3 left-4 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">RTMP</span>
          <span className="absolute bottom-4 left-6 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">SRT</span>
          <span className="absolute top-4 right-5 bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">OBS</span>
          <span className="absolute bottom-3 right-4 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">NDI</span>
        </div>
      ),
    },
    {
      title: "Event Organizers",
      subtitle: "Manage multi-channel language streams, access real-time audience analytics, and customize glossary rules.",
      bgColor: "bg-slate-50 border border-slate-200/60",
      graphic: (
        <div className="relative w-full h-44 bg-gradient-to-b from-indigo-50/50 to-white rounded-2xl border border-slate-100 p-4 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Node graph mockup */}
          <div className="relative z-10 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg font-bold">
            ⚙️
          </div>

          {/* Connected app icons */}
          <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none opacity-80">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">Zoom</div>
            <div className="w-8 h-8 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">YT</div>
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">Web</div>
          </div>
        </div>
      ),
    },
    {
      title: "Global Attendees",
      subtitle: "Listen in crystal-clear natural AI audio or read real-time captions on any smartphone without installing apps.",
      bgColor: "bg-slate-50 border border-slate-200/60",
      graphic: (
        <div className="relative w-full h-44 bg-gradient-to-b from-pink-50/50 to-white rounded-2xl border border-slate-100 p-4 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Table view mockup */}
          <div className="w-full bg-white rounded-xl p-3 shadow-md border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-500 ml-auto">1,240 Listeners</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 bg-emerald-100 rounded-full w-full" />
              <div className="h-2 bg-blue-100 rounded-full w-4/5" />
              <div className="h-2 bg-purple-100 rounded-full w-3/5" />
            </div>
          </div>

          {/* Floating reaction avatars */}
          <div className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-md text-xs">😍</div>
          <div className="absolute bottom-2 right-4 bg-white rounded-full p-1 shadow-md text-xs">⭐</div>
          <div className="absolute top-3 right-6 bg-white rounded-full p-1 shadow-md text-xs">👍</div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="layout-spine max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Built for Every Stakeholder
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-600 font-medium"
          >
            Empowering hosts, production teams, organizers, and audiences seamlessly.
          </motion.p>
        </div>

        {/* 2x2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-8 ${card.bgColor} shadow-lg hover:shadow-xl transition-all flex flex-col justify-between`}
            >
              <div className="mb-6">{card.graphic}</div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                  {card.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
