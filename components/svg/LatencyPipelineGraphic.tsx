import React from "react";

export default function LatencyPipelineGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Real-Time Translation Latency Pipeline Comparison"
    >
      {/* EXBABEL STREAMING PIPELINE */}
      <g transform="translate(10, 15)">
        {/* Title */}
        <text x="15" y="22" fill="#394DFE" fontSize="13" fontWeight="800" fontFamily="var(--font-sora), sans-serif">
          EXBABEL STREAMING PIPELINE (CONSTANT ~2.0s)
        </text>

        {/* Speaker Icon */}
        <circle cx="35" cy="65" r="16" stroke="#0B1220" strokeWidth="2.5" />
        <circle cx="30" cy="60" r="1.5" fill="#0B1220" />
        <circle cx="40" cy="60" r="1.5" fill="#0B1220" />
        <path d="M30 72 C35 76, 40 76, 40 72" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" />
        <path d="M35 81 L35 105 M25 93 L45 93" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <text x="35" y="120" textAnchor="middle" fill="#0B1220" fontSize="11" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          SPEAKER
        </text>

        {/* Flow Arrow to AI Engine */}
        <path d="M60 75 C85 70, 105 70, 130 75" stroke="#394DFE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M124 69 L132 75 L124 81" stroke="#394DFE" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Sound Waves */}
        <g stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round">
          <path d="M85 75 L85 85" />
          <path d="M92 68 L92 92" />
          <path d="M99 72 L99 88" />
        </g>

        {/* AI Chip */}
        <rect x="140" y="48" width="64" height="54" rx="8" stroke="#0B1220" strokeWidth="2.5" fill="white" />
        <line x1="152" y1="48" x2="152" y2="40" stroke="#0B1220" strokeWidth="2" />
        <line x1="172" y1="48" x2="172" y2="40" stroke="#0B1220" strokeWidth="2" />
        <line x1="192" y1="48" x2="192" y2="40" stroke="#0B1220" strokeWidth="2" />
        <line x1="152" y1="102" x2="152" y2="110" stroke="#0B1220" strokeWidth="2" />
        <line x1="172" y1="102" x2="172" y2="110" stroke="#0B1220" strokeWidth="2" />
        <line x1="192" y1="102" x2="192" y2="110" stroke="#0B1220" strokeWidth="2" />
        <text x="172" y="81" textAnchor="middle" fill="#394DFE" fontSize="16" fontWeight="800">AI</text>
        <path d="M135 40 L138 32 L141 40 L138 36 Z" fill="#394DFE" />
        <text x="172" y="123" textAnchor="middle" fill="#0B1220" fontSize="11" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          STREAMING ENGINE
        </text>

        {/* Flow Arrow to Outputs */}
        <path d="M210 75 C240 60, 270 50, 300 50" stroke="#394DFE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M294 44 L302 50 L294 56" stroke="#394DFE" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        <path d="M210 75 C240 90, 270 100, 300 100" stroke="#394DFE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M294 94 L302 100 L294 106" stroke="#394DFE" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* TTFC Caption Box */}
        <rect x="310" y="32" width="120" height="34" rx="6" stroke="#394DFE" strokeWidth="2" fill="white" />
        <text x="370" y="53" textAnchor="middle" fill="#394DFE" fontSize="11" fontWeight="800" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          1.01s TTFC (HOLA)
        </text>

        {/* TTFS Speech Audio Box */}
        <rect x="310" y="82" width="120" height="34" rx="6" stroke="#394DFE" strokeWidth="2" fill="white" />
        <text x="370" y="103" textAnchor="middle" fill="#394DFE" fontSize="11" fontWeight="800" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          2.02s TTFS AUDIO
        </text>

        {/* Fast Checkmark Badge */}
        <circle cx="455" cy="67" r="14" stroke="#394DFE" strokeWidth="2.5" fill="#394DFE" />
        <path d="M449 67 L453 71 L461 62" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="495" y="71" fill="#394DFE" fontSize="12" fontWeight="800" fontFamily="var(--font-sora), sans-serif">
          INSTANT STREAM
        </text>
      </g>

      {/* WORDLY BUFFERED PIPELINE */}
      <g transform="translate(10, 145)">
        <line x1="15" y1="0" x2="570" y2="0" stroke="#0B1220" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

        {/* Title */}
        <text x="15" y="22" fill="#0B1220" fontSize="13" fontWeight="800" fontFamily="var(--font-sora), sans-serif">
          WORDLY BUFFERED PIPELINE (7.22s AUDIO DELAY)
        </text>

        {/* Buffer Box */}
        <rect x="140" y="35" width="220" height="36" rx="6" stroke="#0B1220" strokeWidth="2" fill="#F8F9FA" />
        <text x="250" y="57" textAnchor="middle" fill="#0B1220" fontSize="11" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          SENTENCE BUFFERING (HOLDS AUDIO)
        </text>

        {/* Delayed Audio Box */}
        <rect x="390" y="35" width="130" height="36" rx="6" stroke="#0B1220" strokeWidth="2" strokeDasharray="3 3" fill="white" />
        <text x="455" y="57" textAnchor="middle" fill="#0B1220" fontSize="11" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          7.22s TTFS DELAY
        </text>
      </g>
    </svg>
  );
}
