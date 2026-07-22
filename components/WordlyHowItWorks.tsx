"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";

export default function WordlyHowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Audio or Video",
      subhead: "Broadcast using your existing setup.",
      body: "Connect your live stream through RTMP streaming, YouTube Live, Zoom translation, Microsoft Teams, OBS Studio, or simply use a microphone. Exbabel captures your live speech without changing your production workflow or requiring expensive conference translation software.",
      badges: ["No extra hardware", "Works in 60 seconds"],
      image: "/photos/how_it_works_before.png",
      graphic: (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>INPUT: RTMP / Zoom / OBS / Mic</span>
            <span className="text-emerald-400 font-bold">● CONNECTED</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-lg border border-blue-500/30">RTMP Stream</span>
            <span className="bg-red-500/20 text-red-300 px-2.5 py-1 rounded-lg border border-red-500/30">YouTube Live</span>
            <span className="bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-500/30">Zoom Meeting</span>
            <span className="bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-500/30">MS Teams</span>
            <span className="bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-500/30">OBS Studio</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/30">Microphone</span>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: "AI Instantly Translates Your Speaker",
      subhead: "Real-time simultaneous interpretation in 180+ languages.",
      body: "As soon as someone speaks, Exbabel's neural AI translation engine begins translating their speech into multiple languages simultaneously for seamless multilingual meetings and live events.",
      bulletPoints: [
        "Natural AI-generated translated voices",
        "Live translated captions & subtitles",
        "Real-time simultaneous interpretation",
      ],
      reassurance: "No human interpreters, special booths, or expensive audio equipment required.",
      badges: ["No interpreters needed", "Sub-500ms latency"],
      image: "/photos/how_it_works_during.png",
      graphic: (
        <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>SPEECH &rarr; NEURAL TRANSLATION ENGINE</span>
            <span className="text-primary font-bold">&lt;500ms</span>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-emerald-400">
            &quot;Welcome everyone to today&apos;s live event...&quot;
          </div>
          <div className="flex items-center gap-2 text-slate-300 pt-1">
            <span className="text-base">🇪🇸 🇰🇷 🇫🇷 🇨🇳 🇵🇹</span>
            <span className="text-[11px] font-bold text-slate-400">Streaming into 180+ languages simultaneously</span>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: "Attendees Join with One Click",
      subhead: "Your audience simply scans a QR code or opens a shared link.",
      body: "Each attendee selects their preferred language and immediately hears the translated audio while viewing synchronized live captions directly on their phone, tablet, or computer via browser-based translation.",
      reassuranceList: [
        "No app installation",
        "No account creation",
        "No downloads",
      ],
      badges: ["No downloads", "Works on any device"],
      image: "/photos/exbabel_device_mockup.png",
      graphic: (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Scan QR Code or Click Link</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Web App</span>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-slate-900 rounded-lg p-1 shrink-0 flex items-center justify-center text-white font-bold text-[10px]">
              QR CODE
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">exbabel.com/join/event</div>
              <div className="text-[11px] text-slate-500 font-medium">Select your language &amp; click Play</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "04",
      title: "Reach the World",
      subhead: "Connect global audiences in their native language.",
      body: "Exbabel's live speech translation platform automatically translates your event in real time, allowing every attendee in a multilingual audience to participate in their native language.",
      perfectFor: [
        "Churches & Ministries",
        "Multilingual Conferences",
        "Corporate Meetings",
        "Webinars",
        "Training Sessions",
        "Government Meetings",
        "Universities",
        "Nonprofits",
        "International Livestreams",
      ],
      postEvent: "After your event, automatically receive searchable transcripts, AI summaries, and multilingual archives for future viewing.",
      badges: ["Searchable transcripts", "AI summaries"],
      image: "/photos/how_it_works_after.png",
      graphic: (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>POST-EVENT ASSETS GENERATED</span>
            <span className="text-emerald-400 font-bold">READY</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-800 p-2 rounded border border-slate-700">📄 Searchable TXT/DOCX</div>
            <div className="bg-slate-800 p-2 rounded border border-slate-700">🎬 Subtitles SRT / VTT</div>
            <div className="bg-slate-800 p-2 rounded border border-slate-700">🎙️ AI Video Dubbing</div>
            <div className="bg-slate-800 p-2 rounded border border-slate-700">📊 AI Session Summary</div>
          </div>
        </div>
      ),
    },
  ];

  const whyChooseList = [
    "Real-time AI translation",
    "Natural AI voices",
    "Live captions & subtitles",
    "Browser-based access",
    "QR code attendee joining",
    "No interpreters required",
    "No special hardware",
    "Works with your existing livestream",
    "Searchable transcripts",
    "AI-generated meeting summaries",
    "Affordable usage-based pricing",
  ];

  return (
    <div className="space-y-20 md:space-y-28">
      {/* Page Hero Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white text-center relative overflow-hidden">
        <div className="layout-spine max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-6"
          >
            <span>Live Audio &amp; Caption Infrastructure</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            How Exbabel Works
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-3xl font-bold text-primary mb-6"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            AI Translation for Any Live Event in Minutes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Whether you&apos;re hosting a church service, conference, webinar, corporate meeting, livestream, or international event, Exbabel makes real-time AI translation incredibly simple.
          </motion.p>
        </div>
      </section>

      {/* 4 Simple Steps Container */}
      <section className="layout-spine max-w-6xl mx-auto px-4 space-y-24">
        {steps.map((step, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white border-2 border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                {/* Left Text Content */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Step Badge */}
                  <div className="flex items-center gap-3">
                    <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step.badges.map((b) => (
                        <span key={b} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                    {step.title}
                  </h3>

                  {step.subhead && (
                    <p className="text-base font-bold text-primary">
                      {step.subhead}
                    </p>
                  )}

                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                    {step.body}
                  </p>

                  {/* Bullet Points */}
                  {step.bulletPoints && (
                    <ul className="space-y-2 font-bold text-slate-800 text-sm md:text-base">
                      {step.bulletPoints.map((pt) => (
                        <li key={pt} className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Reassurance text */}
                  {step.reassurance && (
                    <div className="p-4 bg-slate-50 border-l-4 border-emerald-500 rounded-r-xl text-slate-700 font-bold text-sm">
                      {step.reassurance}
                    </div>
                  )}

                  {/* Reassurance list */}
                  {step.reassuranceList && (
                    <div className="flex flex-wrap gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 font-extrabold text-sm">
                      {step.reassuranceList.map((r) => (
                        <div key={r} className="flex items-center gap-1.5">
                          <span>✓</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Perfect For List */}
                  {step.perfectFor && (
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Ideal For:</span>
                      <div className="flex flex-wrap gap-2">
                        {step.perfectFor.map((item) => (
                          <span key={item} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Post Event Summary */}
                  {step.postEvent && (
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      {step.postEvent}
                    </p>
                  )}
                </div>

                {/* Right Column: Graphic & Photo */}
                <div className="lg:col-span-5 space-y-4">
                  {step.graphic}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Why Organizations Choose Exbabel Checklist Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="layout-spine max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Why Organizations Choose Exbabel
            </h2>
            <p className="text-slate-300 text-base md:text-lg font-medium max-w-xl mx-auto">
              Everything you need to deliver seamless live AI translation without high costs or operational friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {whyChooseList.map((item) => (
              <div
                key={item}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-3 font-bold text-white text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center shrink-0 font-black text-xs">
                  ✓
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean SEO Heading Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="layout-spine max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs font-black uppercase text-slate-400 tracking-widest block mb-2">Live AI Interpretation Platform</span>
          <h2
            className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            How AI Translation Works for Live Events
          </h2>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium text-left bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            Exbabel provides <strong>real-time AI translation</strong>, <strong>live captions</strong>, <strong>simultaneous interpretation</strong>, and <strong>multilingual audio</strong> for churches, conferences, corporate meetings, webinars, and livestreams. Connect your audio source, choose your languages, and let attendees listen in their preferred language instantly—without human interpreters, apps, or special equipment.
          </p>
        </div>
      </section>

      {/* Final Conversion Push */}
      <section className="py-16 bg-white text-center">
        <div className="layout-spine max-w-3xl mx-auto px-4">
          <h3 className="text-3xl font-black text-slate-900 mb-4" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
            Ready to Translate Your Live Event?
          </h3>
          <p className="text-slate-600 text-lg mb-8 font-medium">
            Start your 30-day free trial today. It&apos;s on the house!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={appRoutes.pricingStarter}
              className="px-8 py-4 bg-primary text-white text-base font-extrabold rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Start Free Trial
            </a>
            <a
              href="/demo"
              className="px-8 py-4 bg-slate-100 text-slate-800 text-base font-bold rounded-full hover:bg-slate-200 transition-all"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
