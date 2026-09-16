import os

path = '/home/jkang1643/projects/exbabel/app/how-it-works/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    'title: "How It Works | Exbabel - AI Speech Translation in 5 Simple Steps",',
    'title: "How Real-Time AI Translation Works | Exbabel",'
)
c = c.replace(
    'description:\n    "Learn how Exbabel translates live events in 5 simple steps. Connect your audio, AI translates in real time, attendees scan a QR code to listen in 180+ languages.",',
    'description:\n    "See how Exbabel turns live speech into translated AI audio and captions. Connect your audio, choose languages, share a QR code and translate in real time.",'
)
c = c.replace('import LaserFocusedHowItWorks from "@/components/LaserFocusedHowItWorks";',
'import LaserFocusedHowItWorks from "@/components/LaserFocusedHowItWorks";\nconst ChurchTranslationHowItWorks = dynamic(() => import("@/components/ChurchTranslationHowItWorks"), { loading: () => <section className="py-24" aria-hidden /> });')

c = c.replace('<FAQ />', '<ChurchTranslationHowItWorks />\n        <FAQ />')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

path2 = '/home/jkang1643/projects/exbabel/components/LaserFocusedHowItWorks.tsx'
with open(path2, 'r', encoding='utf-8') as f:
    c2 = f.read()
c2 = c2.replace('Live Audio &amp; AI Translation for your event', 'How Exbabel Real-Time AI Translation Works')
with open(path2, 'w', encoding='utf-8') as f:
    f.write(c2)

new_comp = """import React from 'react';
export default function ChurchTranslationHowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-aurora-subtle">
      <div className="layout-spine max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-base-ink mb-12" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
          How Church Translation Works During a Live Service
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 relative">
          
          <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
            <div className="text-4xl mb-3">🎛️</div>
            <div className="font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Sound Board</div>
            <div className="text-sm text-base-muted">Send audio from your existing mixer.</div>
          </div>
          
          <div className="text-primary hidden lg:block text-2xl">→</div>
          
          <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10 border-t-4 border-t-primary">
            <div className="text-4xl mb-3">✨</div>
            <div className="font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Exbabel</div>
            <div className="text-sm text-base-muted">AI instantly translates the speech.</div>
          </div>
          
          <div className="text-primary hidden lg:block text-2xl">→</div>
          
          <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
            <div className="text-4xl mb-3">🌐</div>
            <div className="font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Languages</div>
            <div className="text-sm text-base-muted">Select desired languages & voices.</div>
          </div>
          
          <div className="text-primary hidden lg:block text-2xl">→</div>
          
          <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
            <div className="text-4xl mb-3">📱</div>
            <div className="font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>QR Code</div>
            <div className="text-sm text-base-muted">Attendees scan to join instantly.</div>
          </div>

          <div className="text-primary hidden lg:block text-2xl">→</div>
          
          <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
            <div className="text-4xl mb-3">🎧</div>
            <div className="font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Headphones</div>
            <div className="text-sm text-base-muted">Listen via their own devices.</div>
          </div>

        </div>
      </div>
    </section>
  );
}
"""
with open('/home/jkang1643/projects/exbabel/components/ChurchTranslationHowItWorks.tsx', 'w', encoding='utf-8') as f:
    f.write(new_comp)

print("Patched how it works")