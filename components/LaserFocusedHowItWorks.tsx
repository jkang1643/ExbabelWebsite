"use client";

import { useState } from "react";
import { appRoutes } from "@/lib/config";
import HeroVideoCoverSvg from "@/components/svg/HeroVideoCoverSvg";
import ConnectInputsSvg from "@/components/svg/ConnectInputsSvg";
import TranslationPipelineSvg from "@/components/svg/TranslationPipelineSvg";
import QrJoinSvg from "@/components/svg/QrJoinSvg";
import AudienceListenSvg from "@/components/svg/AudienceListenSvg";
import DashboardSvg from "@/components/svg/DashboardSvg";
import BeforeDuringAfterGraphic from "@/components/BeforeDuringAfterGraphic";

export default function LaserFocusedHowItWorks() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="py-16 md:py-24">
        <div className="layout-spine max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            {/* Left — Content */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-h1 text-base-ink" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                Live Audio &amp; AI Translation for your event
              </h1>
              <p className="text-body text-base-muted leading-relaxed text-lg">
                AI voice translation, simultaneous interpretation, guided tours, silent conferencing and more.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={appRoutes.pricingStarter}
                  className="px-8 py-4 bg-primary text-white text-base font-extrabold rounded-button-pill shadow-cta-hover hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  Start for free &rarr;
                </a>
                <a
                  href="/demo"
                  className="px-8 py-4 bg-base-paper text-base-ink text-base font-bold rounded-button-pill border border-aurora-subtle hover:bg-base-300 transition-all"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  Book a Demo
                </a>
              </div>
            </div>

            {/* Right — Interactive Sketch Cover & Video Player */}
            <div className="lg:col-span-6 relative">
              {!isPlayingVideo ? (
                <div
                  onClick={() => setIsPlayingVideo(true)}
                  className="relative group cursor-pointer select-none"
                  role="button"
                  aria-label="Play Exbabel demo video"
                >
                  {/* SVG Cover Illustration */}
                  <HeroVideoCoverSvg className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.01]" />

                  {/* Floating Pill Play Button ("▶ Watch") */}
                  <div className="absolute top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="flex items-center gap-2.5 px-6 py-3.5 bg-primary text-white text-base font-bold rounded-full shadow-lg group-hover:bg-blue-700 group-hover:scale-105 transition-all">
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Watch</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full aspect-video rounded-aurora-xl overflow-hidden shadow-aurora-card border border-aurora-subtle">
                  <iframe
                    src="https://www.youtube.com/embed/rNwDGQVu_o0?autoplay=1&rel=0&modestbranding=1"
                    title="How Exbabel Works — Real-Time AI Translation Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                  <button
                    onClick={() => setIsPlayingVideo(false)}
                    className="absolute top-3 right-3 z-30 px-3 py-1.5 bg-black/70 hover:bg-black text-white text-xs font-bold rounded-full transition-all"
                  >
                    ✕ Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <div className="space-y-24 md:space-y-32">
        {/* Step 1 */}
        <section className="layout-spine max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-eyebrow text-primary">Step 1</span>
            <h2 className="text-h2 text-base-ink mt-2" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              Connect Your Event
            </h2>
            <p className="text-body text-base-muted mt-3 max-w-xl mx-auto">
              Connect Exbabel to your live audio or video source. Your production workflow stays exactly the same.
            </p>
          </div>
          <ConnectInputsSvg className="w-full h-auto max-w-3xl mx-auto" />
        </section>

        {/* Step 2 */}
        <section className="layout-spine max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-eyebrow text-primary">Step 2</span>
            <h2 className="text-h2 text-base-ink mt-2" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              AI Translates in Real Time
            </h2>
            <p className="text-body text-base-muted mt-3 max-w-xl mx-auto">
              As your speaker talks, Exbabel automatically listens, transcribes, translates, and generates natural AI voices—all within seconds.
            </p>
          </div>
          <TranslationPipelineSvg className="w-full h-auto max-w-3xl mx-auto" />
        </section>

        {/* Step 3 */}
        <section className="layout-spine max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-eyebrow text-primary">Step 3</span>
            <h2 className="text-h2 text-base-ink mt-2" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              Attendees Join Instantly
            </h2>
            <p className="text-body text-base-muted mt-3 max-w-xl mx-auto">
              Attendees scan a QR code or open a link. They choose their language and immediately start listening.
            </p>
          </div>
          <QrJoinSvg className="w-full h-auto max-w-2xl mx-auto" />
        </section>

        {/* Step 4 */}
        <section className="layout-spine max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-eyebrow text-primary">Step 4</span>
            <h2 className="text-h2 text-base-ink mt-2" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              Listen in Your Language
            </h2>
            <p className="text-body text-base-muted mt-3 max-w-xl mx-auto">
              Each attendee hears crystal-clear AI audio and follows synchronized captions in their selected language.
            </p>
          </div>
          <AudienceListenSvg className="w-full h-auto max-w-3xl mx-auto" />
        </section>

        {/* Step 5 */}
        <section className="layout-spine max-w-5xl mx-auto px-4 pb-16">
          <div className="text-center mb-8">
            <span className="text-eyebrow text-primary">Step 5</span>
            <h2 className="text-h2 text-base-ink mt-2" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              After the Event
            </h2>
            <p className="text-body text-base-muted mt-3 max-w-xl mx-auto">
              Exbabel automatically saves everything: full transcript, AI summary, caption files, and translation history.
            </p>
          </div>
          <DashboardSvg className="w-full h-auto max-w-2xl mx-auto" />
        </section>
      </div>

      {/* ── WORKS EVERYWHERE ── */}
      <section className="py-16 md:py-20 border-t border-aurora-subtle">
        <div className="layout-spine max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-h2 text-base-ink" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
            On-site. Online. Hybrid.
          </h2>
          <p className="text-body text-base-muted mt-3">
            All you need is mobile internet or WiFi.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
            {[
              { name: "Churches", icon: "⛪" },
              { name: "Conferences", icon: "🎤" },
              { name: "Corporate", icon: "💼" },
              { name: "Government", icon: "🏛️" },
              { name: "Universities", icon: "🎓" },
              { name: "Webinars", icon: "💻" },
              { name: "Training", icon: "📋" },
              { name: "Livestreams", icon: "📡" },
            ].map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2 py-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm font-bold text-base-ink" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── END-TO-END WORKFLOW ── */}
      <BeforeDuringAfterGraphic />

      {/* ── STATS ── */}
      <section className="py-16 border-t border-aurora-subtle">
        <div className="layout-spine max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-h1 text-primary">180+</div>
              <div className="text-eyebrow text-base-muted mt-1">Languages</div>
            </div>
            <div>
              <div className="text-h2 text-base-ink">Real-Time</div>
              <div className="text-eyebrow text-base-muted mt-1">Translation</div>
            </div>
            <div>
              <div className="text-h1 text-primary">90+</div>
              <div className="text-eyebrow text-base-muted mt-1">AI Voices</div>
            </div>
            <div>
              <div className="text-h2 text-base-ink">Live</div>
              <div className="text-eyebrow text-base-muted mt-1">Captions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 text-center border-t border-aurora-subtle">
        <div className="layout-spine max-w-3xl mx-auto px-4">
          <h2 className="text-h1 text-base-ink" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
            Ready to Reach a Global Audience?
          </h2>
          <p className="text-body text-base-muted mt-4">
            Start translating your next event in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <a
              href={appRoutes.pricingStarter}
              className="px-8 py-4 bg-primary text-white text-base font-extrabold rounded-button-pill shadow-cta-hover hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Start Free Trial
            </a>
            <a
              href="/demo"
              className="px-8 py-4 bg-base-ink text-white text-base font-bold rounded-button-pill hover:opacity-90 transition-all"
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
