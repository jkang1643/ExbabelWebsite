import React from "react";

export default function ContinuousSpeechGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Continuous Speech Audio Latency Comparison Graphic"
    >
      {/* TRACK 1: CONTINUOUS SPEECH SOURCE WAVEFORM */}
      <g transform="translate(40, 15)">
        <text x="0" y="16" fill="#0B1220" fontSize="12" fontWeight="800" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          CONTINUOUS UNINTERRUPTED SPEECH (&quot;THEN PETER SAID UNTO THEM...&quot;)
        </text>
        
        {/* Waveform Bar (0s to 6.8s) */}
        <rect x="0" y="24" width="410" height="24" rx="4" stroke="#0B1220" strokeWidth="2" fill="#F8F9FA" />
        <g stroke="#394DFE" strokeWidth="2" strokeLinecap="round">
          <path d="M12 36 L12 36" /><path d="M24 31 L24 41" /><path d="M36 28 L36 44" /><path d="M48 32 L48 40" />
          <path d="M72 29 L72 43" /><path d="M96 28 L96 44" /><path d="M120 30 L120 42" />
          <path d="M144 28 L144 44" /><path d="M168 32 L168 40" /><path d="M192 29 L192 43" />
          <path d="M216 28 L216 44" /><path d="M240 31 L240 41" /><path d="M264 28 L264 44" />
          <path d="M288 30 L288 42" /><path d="M312 28 L312 44" /><path d="M336 32 L336 40" />
          <path d="M360 29 L360 43" /><path d="M384 31 L384 41" /><path d="M396 34 L396 38" />
        </g>
      </g>

      {/* TRACK 2: EXBABEL STREAMING AUDIO (PARALLEL TO SPEECH) */}
      <g transform="translate(40, 80)">
        <text x="0" y="14" fill="#394DFE" fontSize="11" fontWeight="800" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          EXBABEL: INSTANT PARALLEL AUDIO STREAMING
        </text>

        {/* Audio Arrow Line Starting at 2.0s (X=120) */}
        <path d="M120 28 L530 28" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M524 22 L532 28 L524 34" stroke="#394DFE" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Audio Start Pill Badge */}
        <rect x="120" y="16" width="145" height="24" rx="12" stroke="#394DFE" strokeWidth="2" fill="white" />
        <text x="192" y="32" textAnchor="middle" fill="#394DFE" fontSize="10" fontWeight="800" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          AUDIO STREAMS AT ~2.0s
        </text>
      </g>

      {/* TRACK 3: WORDLY SENTENCE BUFFER ZONE */}
      <g transform="translate(40, 135)">
        <text x="0" y="14" fill="#0B1220" fontSize="11" fontWeight="800" fontStyle="italic" opacity="0.8" fontFamily="var(--font-sora), sans-serif">
          WORDLY: SENTENCE BUFFERING (AUDIO BLOCKED UNTIL SPEAKER PAUSES)
        </text>

        {/* Buffer Box spanning 0s to 6.8s (X=0 to 410) */}
        <rect x="0" y="22" width="410" height="26" rx="4" stroke="#0B1220" strokeWidth="1.5" strokeDasharray="4 4" fill="#F8F9FA" />
        <text x="205" y="39" textAnchor="middle" fill="#0B1220" fontSize="10" fontWeight="700" fontStyle="italic" opacity="0.75" fontFamily="var(--font-sora), sans-serif">
          SPEECH BUFFERED IN MEMORY (7.22s DELAY)
        </text>

        {/* Wordly Audio Start Pill at 7.2s (X=434) */}
        <rect x="425" y="22" width="125" height="26" rx="4" stroke="#0B1220" strokeWidth="2" fill="white" />
        <text x="487" y="39" textAnchor="middle" fill="#0B1220" fontSize="10" fontWeight="800" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">
          7.22s AUDIO START
        </text>
      </g>

      {/* TRACK 4: TIMELINE AXIS & STAGGERED TICKS */}
      <g transform="translate(40, 210)">
        <line x1="0" y1="0" x2="540" y2="0" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" />

        {/* 0.0s Speech Onset */}
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#0B1220" strokeWidth="2" />
        <text x="0" y="20" textAnchor="middle" fill="#0B1220" fontSize="10" fontWeight="700" fontFamily="var(--font-sora), sans-serif">
          0.0s (Speech Onset)
        </text>

        {/* 2.0s Exbabel Audio */}
        <line x1="120" y1="-8" x2="120" y2="8" stroke="#394DFE" strokeWidth="2.5" />
        <text x="120" y="20" textAnchor="middle" fill="#394DFE" fontSize="10" fontWeight="800" fontFamily="var(--font-sora), sans-serif">
          2.0s (Exbabel Audio)
        </text>

        {/* 6.8s Speech End (Label Above Timeline to avoid collision) */}
        <line x1="410" y1="-8" x2="410" y2="5" stroke="#0B1220" strokeWidth="2" />
        <text x="410" y="-12" textAnchor="middle" fill="#0B1220" fontSize="10" fontWeight="700" fontFamily="var(--font-sora), sans-serif">
          6.8s (Speech End)
        </text>

        {/* 7.2s Wordly Audio (Label Below Timeline) */}
        <line x1="434" y1="-5" x2="434" y2="8" stroke="#0B1220" strokeWidth="2" />
        <text x="445" y="20" textAnchor="start" fill="#0B1220" fontSize="10" fontWeight="800" fontFamily="var(--font-sora), sans-serif">
          7.2s (Wordly Audio)
        </text>
      </g>
    </svg>
  );
}
