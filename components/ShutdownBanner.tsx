"use client";

import React, { useState } from "react";

export default function ShutdownBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2.5 sm:px-6 relative z-[60] shadow-md border-b border-amber-600/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-x-4 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-x-3 text-xs sm:text-sm font-medium">
          <span className="inline-flex items-center rounded-md bg-slate-950 px-2 py-0.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            Important Notice
          </span>
          <p className="text-slate-950 font-semibold leading-tight">
            Exbabel services are winding down. Please review key sunset dates, export your account data, or reach out to support.
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0 mt-2 sm:mt-0 text-xs sm:text-sm">
          <a
            href="mailto:support@exbabel.com"
            className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-3 py-1 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            Contact Support
          </a>
          <button
            onClick={() => setIsVisible(false)}
            type="button"
            className="p-1 rounded-md text-slate-900 hover:text-slate-950 hover:bg-amber-600/20 transition-colors"
            aria-label="Dismiss banner"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
