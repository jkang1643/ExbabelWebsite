import React from "react";

export default function SignalProcessingGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ISO and IEEE Signal Processing Measurement Protocol"
    >
      {/* FRAME DEMUXING BOX (30 FPS ±33.3ms) */}
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="260" height="90" rx="8" stroke="#0B1220" strokeWidth="2.5" fill="white" />
        <text x="15" y="24" fill="#0B1220" fontSize="12" fontWeight="800" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          VISUAL FRAME DEMUXING (30.00 FPS)
        </text>
        <text x="15" y="42" fill="#394DFE" fontSize="11" fontWeight="700" fontFamily="var(--font-sora), sans-serif">
          ±33.3ms FRAME PRECISION
        </text>

        {/* Film strip frames */}
        <g transform="translate(15, 52)">
          <rect x="0" y="0" width="32" height="24" rx="3" stroke="#0B1220" strokeWidth="1.5" />
          <text x="16" y="16" textAnchor="middle" fill="#0B1220" fontSize="9" fontFamily="monospace">F01</text>

          <rect x="40" y="0" width="32" height="24" rx="3" stroke="#0B1220" strokeWidth="1.5" />
          <text x="56" y="16" textAnchor="middle" fill="#0B1220" fontSize="9" fontFamily="monospace">F02</text>

          <rect x="80" y="0" width="32" height="24" rx="3" stroke="#394DFE" strokeWidth="2" fill="#394DFE" fillOpacity="0.1" />
          <text x="96" y="16" textAnchor="middle" fill="#394DFE" fontSize="9" fontWeight="800">TTFC</text>

          <rect x="120" y="0" width="32" height="24" rx="3" stroke="#0B1220" strokeWidth="1.5" />
          <text x="136" y="16" textAnchor="middle" fill="#0B1220" fontSize="9" fontFamily="monospace">F04</text>

          <rect x="160" y="0" width="32" height="24" rx="3" stroke="#0B1220" strokeWidth="1.5" />
          <text x="176" y="16" textAnchor="middle" fill="#0B1220" fontSize="9" fontFamily="monospace">F05</text>
        </g>
      </g>

      {/* AUDIO RMS WAVEFORM ANALYSIS BOX (21.3ms WINDOW) */}
      <g transform="translate(305, 20)">
        <rect x="0" y="0" width="275" height="90" rx="8" stroke="#0B1220" strokeWidth="2.5" fill="white" />
        <text x="15" y="24" fill="#0B1220" fontSize="12" fontWeight="800" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          ACOUSTIC RMS DECIBEL ANALYSIS
        </text>
        <text x="15" y="42" fill="#394DFE" fontSize="11" fontWeight="700" fontFamily="var(--font-sora), sans-serif">
          ±21.3ms WINDOW RESOLUTION
        </text>

        {/* Decibel Level Scale */}
        <g transform="translate(15, 52)">
          <line x1="0" y1="20" x2="240" y2="20" stroke="#0B1220" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
          <text x="0" y="12" fill="#0B1220" fontSize="9" fontFamily="monospace">-60 dB (NOISE FLOOR)</text>

          {/* Peak speech wave */}
          <path d="M70 20 Q80 2, 90 20 Q100 20, 110 20 Q120 -5, 130 20" stroke="#394DFE" strokeWidth="2" fill="none" />
          <text x="135" y="12" fill="#394DFE" fontSize="9" fontWeight="800">-34 dB SPEECH PEAK</text>
        </g>
      </g>

      {/* COMPLIANCE STANDARDS SEAL */}
      <g transform="translate(20, 130)">
        <rect x="0" y="0" width="560" height="85" rx="8" stroke="#0B1220" strokeWidth="2.5" fill="#F8F9FA" />
        
        {/* Sparkles */}
        <path d="M25 25 L28 17 L31 25 L28 21 Z" fill="#394DFE" />
        
        <text x="40" y="32" fill="#0B1220" fontSize="13" fontWeight="800" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          IEEE 829-2008 & ISO/IEC 25010:2011 COMPLIANT TEST HARNESS
        </text>
        
        <text x="40" y="54" fill="#394DFE" fontSize="11" fontWeight="700" fontFamily="var(--font-sora), sans-serif">
          ZERO-BIAS BLACK-BOX TRIAL PROTOCOL • HOUSTON RESEARCH FACILITY
        </text>

        <text x="40" y="70" fill="#0B1220" fontSize="11" opacity="0.75" fontFamily="var(--font-sora), sans-serif">
          Synchronized dual-channel audio-visual loopback capture with open-source Python verification scripts.
        </text>

        {/* Verification Check Badge */}
        <circle cx="510" cy="42" r="18" stroke="#394DFE" strokeWidth="2.5" fill="#394DFE" />
        <path d="M502 42 L508 47 L518 35" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="510" y="72" textAnchor="middle" fill="#394DFE" fontSize="10" fontWeight="800" fontFamily="var(--font-sora), sans-serif">
          VERIFIED
        </text>
      </g>
    </svg>
  );
}
