"use client";

import React, { useState } from "react";
import EsotericGeneratorImage from "@/components/EsotericGeneratorImage";
import { computeImageFingerprint } from "@/lib/imageFingerprint";

export default function GeneratorImageSandbox() {
  const [seed, setSeed] = useState<string>("ROSE");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Load image for the algorithmic vectorizer
      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        setUploadedImage(dataUrl);

        // 2. Perceptual Image Fingerprinting:
        // DCT-II frequency decomposition (same math as JPEG compression),
        // Hu Invariant Moments (shape physics from 1962 paper by Ming-Kuei Hu),
        // and HSL dominant color extraction are combined to produce a 64-char
        // hex fingerprint that mathematically represents the image's visual essence.
        const fingerprint = await computeImageFingerprint(dataUrl);
        setSeed(fingerprint);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="h-[400vh] bg-[#0B1220] relative font-mono">
      {/* The Procedural Generator featuring the Deconstructed Image */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <EsotericGeneratorImage seed={seed} imageUrl={uploadedImage} isAnimated={isAnimated} />
      </div>
      
      {/* UI Overlay */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-2xl bg-[#0B1220]/80 p-8 rounded-xl border border-yellow-500/30 backdrop-blur-md shadow-2xl flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-yellow-400 mb-2 tracking-widest uppercase">
            Image Hybrid Generator
          </h1>
          <p className="text-slate-400 text-sm max-w-md mb-4">
            Upload an image to serve as the central singularity. Scroll to drive the physical optics engine!
          </p>
        </div>

        <div className="w-full relative space-y-4">
          <input 
            type="text" 
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="w-full bg-black/50 border border-yellow-500/50 rounded-lg px-4 py-3 text-white text-center font-bold tracking-widest uppercase focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
            placeholder="ENTER SEED..."
          />
          
          <div className="relative group">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full bg-yellow-500/10 border-2 border-dashed border-yellow-500/50 group-hover:border-yellow-400 group-hover:bg-yellow-500/20 rounded-lg px-4 py-3 text-yellow-500/80 text-center font-bold tracking-widest transition-all">
              {uploadedImage ? "[ IMAGE LOADED - CLICK TO REPLACE ]" : "[ UPLOAD CUSTOM IMAGE ]"}
            </div>
          </div>

          <div className="absolute -inset-1 bg-yellow-500/20 blur-md -z-10 rounded-lg"></div>
        </div>
        
        <div className="flex space-x-4 text-xs font-bold uppercase tracking-widest">
          <button 
            onClick={() => setSeed(Math.random().toString(36).substring(7).toUpperCase())}
            className="text-yellow-500/60 hover:text-yellow-400 transition-colors"
          >
            [ RANDOMIZE SURROUNDINGS ]
          </button>
          <button 
            onClick={() => setIsAnimated(!isAnimated)}
            className={`${isAnimated ? 'text-yellow-400' : 'text-yellow-500/60'} hover:text-yellow-400 transition-colors`}
          >
            [ ROTATIONAL MOTOR: {isAnimated ? "ON" : "OFF"} ]
          </button>
        </div>

        <div className="text-[9px] text-yellow-500/40 tracking-[0.4em] uppercase pt-4 border-t border-yellow-500/20 w-full text-center select-none">
          Project212
        </div>
      </div>
    </main>
  );
}
