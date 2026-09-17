import React from 'react';
export default function ChurchTranslationHowItWorks() {
  return (
    <section className="mobile-fade-up py-16 md:py-24 bg-slate-50 border-t border-aurora-subtle">
      <div className="mobile-fade-up layout-spine max-w-7xl mx-auto px-4 text-center">
        <h2 className="mobile-fade-up text-3xl md:text-4xl font-bold text-base-ink mb-12" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
          How Church Translation Works During a Live Service
        </h2>
        <div className="mobile-fade-up flex flex-col lg:flex-row justify-between items-center gap-6 relative">
          
          <div className="mobile-fade-up flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
            <div className="mobile-fade-up text-4xl mb-3">🎛️</div>
            <div className="mobile-fade-up font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Sound Board</div>
            <div className="mobile-fade-up text-sm text-base-muted">Send audio from your existing mixer.</div>
          </div>
          
          <div className="mobile-fade-up text-primary hidden lg:block text-2xl">→</div>
          
          <div className="mobile-fade-up flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10 border-t-4 border-t-primary">
            <div className="mobile-fade-up text-4xl mb-3">✨</div>
            <div className="mobile-fade-up font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Exbabel</div>
            <div className="mobile-fade-up text-sm text-base-muted">AI instantly translates the speech.</div>
          </div>
          
          <div className="mobile-fade-up text-primary hidden lg:block text-2xl">→</div>
          
          <div className="mobile-fade-up flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
            <div className="mobile-fade-up text-4xl mb-3">🌐</div>
            <div className="mobile-fade-up font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Languages</div>
            <div className="mobile-fade-up text-sm text-base-muted">Select desired languages & voices.</div>
          </div>
          
          <div className="mobile-fade-up text-primary hidden lg:block text-2xl">→</div>
          
          <div className="mobile-fade-up flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
            <div className="mobile-fade-up text-4xl mb-3">📱</div>
            <div className="mobile-fade-up font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>QR Code</div>
            <div className="mobile-fade-up text-sm text-base-muted">Attendees scan to join instantly.</div>
          </div>

          <div className="mobile-fade-up text-primary hidden lg:block text-2xl">→</div>
          
          <div className="mobile-fade-up flex-1 w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
            <div className="mobile-fade-up text-4xl mb-3">🎧</div>
            <div className="mobile-fade-up font-bold text-base-ink mb-1" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Headphones</div>
            <div className="mobile-fade-up text-sm text-base-muted">Listen via their own devices.</div>
          </div>

        </div>
      </div>
    </section>
  );
}
