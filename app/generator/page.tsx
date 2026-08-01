"use client";

import React, { useState } from "react";
import EsotericGenerator from "@/components/EsotericGenerator";

export default function GeneratorSandbox() {
  const [seed, setSeed] = useState<string>("ALPHA");

  return (
    <main className="min-h-screen bg-[#0B1220] relative flex flex-col items-center justify-center font-mono">
      {/* The Procedural Generator */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <EsotericGenerator seed={seed} />
      </div>
      
      {/* UI Overlay */}
      <div className="relative z-10 bg-[#0B1220]/80 p-8 rounded-xl border border-yellow-500/30 backdrop-blur-md shadow-2xl flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-yellow-400 mb-2 tracking-widest uppercase">
            Infinite Shape Grammar
          </h1>
          <p className="text-slate-400 text-sm max-w-md">
            Type any word or number. The deterministic PRNG engine will compile a unique, mathematically perfect geometric motif.
          </p>
        </div>

        <div className="w-full relative">
          <input 
            type="text" 
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="w-full bg-black/50 border border-yellow-500/50 rounded-lg px-4 py-3 text-white text-center font-bold tracking-widest uppercase focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
            placeholder="ENTER SEED..."
          />
          <div className="absolute -inset-1 bg-yellow-500/20 blur-md -z-10 rounded-lg"></div>
        </div>
        
        <div className="flex space-x-4 text-xs text-yellow-500/60 font-bold uppercase tracking-widest">
          <button 
            onClick={() => setSeed(Math.random().toString(36).substring(7).toUpperCase())}
            className="hover:text-yellow-400 transition-colors"
          >
            [ RANDOMIZE ]
          </button>
          <button 
            onClick={() => setSeed("OMEGA")}
            className="hover:text-yellow-400 transition-colors"
          >
            [ PRESET: OMEGA ]
          </button>
        </div>
      </div>
    </main>
  );
}
