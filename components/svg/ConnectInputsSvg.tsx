{/* Step 1: Connect Your Event — hand-drawn sketch style
   Shows laptop with "My Event" dashboard, phone, tablet, microphone
   Black line art + #394DFE accent */}

export default function ConnectInputsSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 700 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Connect your audio source: microphone, laptop, phone, or tablet">
      {/* ── Laptop (center) ── */}
      <g id="laptop">
        {/* Screen */}
        <rect x="180" y="40" width="280" height="180" rx="8" stroke="#0B1220" strokeWidth="2.5" />
        {/* Screen content — dashboard mockup */}
        <text x="210" y="72" fill="#0B1220" fontSize="14" fontWeight="700" fontFamily="var(--font-sora), sans-serif">My Event</text>
        {/* Sidebar */}
        <rect x="196" y="85" width="60" height="14" rx="4" fill="#394DFE" opacity="0.15" />
        <text x="206" y="96" fill="#394DFE" fontSize="9" fontWeight="600" fontFamily="var(--font-sora), sans-serif">Speak</text>
        <rect x="196" y="105" width="60" height="40" rx="6" fill="#394DFE" />
        <text x="210" y="122" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="var(--font-sora), sans-serif">English</text>
        <rect x="200" y="136" width="52" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4" />
        {/* Right panel */}
        <text x="280" y="96" fill="#0B1220" fontSize="9" fontWeight="600" fontFamily="var(--font-sora), sans-serif">Listen</text>
        <circle cx="285" cy="112" r="4" stroke="#0B1220" strokeWidth="1.5" />
        <text x="295" y="116" fill="#0B1220" fontSize="8" fontFamily="var(--font-sora), sans-serif">English</text>
        <circle cx="285" cy="128" r="4" stroke="#394DFE" strokeWidth="1.5" />
        <text x="295" y="132" fill="#0B1220" fontSize="8" fontFamily="var(--font-sora), sans-serif">Spanish</text>
        <circle cx="285" cy="144" r="4" stroke="#0B1220" strokeWidth="1.5" />
        <text x="295" y="148" fill="#0B1220" fontSize="8" fontFamily="var(--font-sora), sans-serif">Korean</text>
        <circle cx="285" cy="160" r="4" stroke="#0B1220" strokeWidth="1.5" />
        <text x="295" y="164" fill="#0B1220" fontSize="8" fontFamily="var(--font-sora), sans-serif">French</text>
        {/* Status bar */}
        <text x="390" y="72" fill="#0B1220" fontSize="8" fontFamily="var(--font-sora), sans-serif" opacity="0.5">Share event</text>
        {/* Base */}
        <path d="M170 220 L200 222 L440 222 L470 220" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="200" y1="222" x2="440" y2="222" stroke="#0B1220" strokeWidth="2.5" />
      </g>

      {/* ── Arrow: "SPEAK" label ── */}
      <g id="speak-label">
        <path d="M140 170 C120 180, 115 190, 170 195" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M163 190 L172 196 L165 201" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="90" y="168" fill="#0B1220" fontSize="14" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">SPEAK</text>
      </g>

      {/* ── Microphone (far left) ── */}
      <g id="microphone">
        <rect x="40" y="80" width="16" height="30" rx="8" stroke="#0B1220" strokeWidth="2.5" />
        <path d="M32 100 C32 118, 64 118, 64 100" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" fill="none" />
        <line x1="48" y1="118" x2="48" y2="135" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" />
        <line x1="36" y1="135" x2="60" y2="135" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* ── Phone (top right) ── */}
      <g id="phone">
        <rect x="520" y="20" width="80" height="130" rx="12" stroke="#0B1220" strokeWidth="2.5" />
        {/* Notch */}
        <rect x="545" y="28" width="30" height="6" rx="3" fill="#0B1220" opacity="0.15" />
        {/* Screen content */}
        <rect x="530" y="42" width="60" height="8" rx="3" fill="#394DFE" />
        <rect x="530" y="55" width="60" height="4" rx="2" fill="#0B1220" opacity="0.1" />
        <rect x="530" y="63" width="45" height="4" rx="2" fill="#0B1220" opacity="0.1" />
        <rect x="530" y="71" width="55" height="4" rx="2" fill="#0B1220" opacity="0.1" />
        {/* Home bar */}
        <rect x="545" y="138" width="30" height="4" rx="2" fill="#0B1220" opacity="0.15" />
      </g>

      {/* ── Sound waves between laptop and phone ── */}
      <g id="waves" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round">
        <path d="M480 115 L480 135" />
        <path d="M490 108 L490 142" />
        <path d="M500 112 L500 138" />
      </g>

      {/* ── Arrow: "LISTEN" label (right) ── */}
      <g id="listen-label">
        <path d="M620 110 C640 120, 640 135, 605 140" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M612 136 L604 142 L610 147" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="630" y="108" fill="#0B1220" fontSize="14" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">LISTEN</text>
      </g>

      {/* ── Labels ── */}
      <text x="320" y="260" textAnchor="middle" fill="#0B1220" fontSize="16" fontWeight="700" fontFamily="var(--font-sora), sans-serif">Works with any smartphone, tablet or computer.</text>
      <text x="320" y="285" textAnchor="middle" fill="#667085" fontSize="13" fontFamily="var(--font-sora), sans-serif">People bring their own devices. No extra hardware necessary.</text>
    </svg>
  );
}
