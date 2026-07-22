{/* Hero SVG — Hand-drawn sketch style: Speaker → AI → Listeners
   Black line art + Exbabel brand blue (#394DFE) accent
   Inspired by LiveVoice's illustration style */}

export default function HeroFlowSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Speaker speaks, AI translates, audience listens in their language">
      {/* ── SPEAKER (left) ── */}
      <g id="speaker">
        {/* Head */}
        <circle cx="120" cy="160" r="28" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        {/* Eyes */}
        <circle cx="112" cy="155" r="2" fill="#0B1220" />
        <circle cx="128" cy="155" r="2" fill="#0B1220" />
        {/* Mouth */}
        <path d="M112 168 C116 174, 124 174, 128 168" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Body */}
        <path d="M120 188 L120 250" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        {/* Arms */}
        <path d="M120 210 L85 235" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M120 210 L158 200" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        {/* Legs */}
        <path d="M120 250 L100 300" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M120 250 L140 300" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        {/* Microphone in hand */}
        <rect x="152" y="190" width="8" height="22" rx="4" stroke="#0B1220" strokeWidth="2" />
        <circle cx="156" cy="188" r="6" stroke="#0B1220" strokeWidth="2" fill="none" />
      </g>

      {/* Speech bubble — "HELLO" */}
      <g id="speech-hello">
        <path d="M170 120 C170 100, 260 100, 260 120 C260 140, 170 140, 170 120 Z" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M185 140 L175 155 L195 140" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="215" y="126" textAnchor="middle" fill="#394DFE" fontSize="16" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">HELLO</text>
      </g>

      {/* Label: SPEAKER */}
      <text x="120" y="330" textAnchor="middle" fill="#0B1220" fontSize="14" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">SPEAKER</text>

      {/* ── Sound waves ── */}
      <g id="sound-waves" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M280 185 L280 215" />
        <path d="M290 175 L290 225" />
        <path d="M300 180 L300 220" />
        <path d="M310 170 L310 230" />
        <path d="M320 185 L320 215" />
      </g>

      {/* ── Flow arrow: Speaker → AI ── */}
      <g id="arrow-to-ai">
        <path d="M260 200 C300 200, 330 200, 360 200" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M355 193 L365 200 L355 207" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* ── AI Core (center) ── */}
      <g id="ai-core">
        {/* AI chip icon */}
        <rect x="370" y="168" width="60" height="60" rx="10" stroke="#0B1220" strokeWidth="2.5" />
        {/* Pins */}
        <line x1="380" y1="168" x2="380" y2="158" stroke="#0B1220" strokeWidth="2" />
        <line x1="400" y1="168" x2="400" y2="158" stroke="#0B1220" strokeWidth="2" />
        <line x1="420" y1="168" x2="420" y2="158" stroke="#0B1220" strokeWidth="2" />
        <line x1="380" y1="228" x2="380" y2="238" stroke="#0B1220" strokeWidth="2" />
        <line x1="400" y1="228" x2="400" y2="238" stroke="#0B1220" strokeWidth="2" />
        <line x1="420" y1="228" x2="420" y2="238" stroke="#0B1220" strokeWidth="2" />
        {/* AI text */}
        <text x="400" y="205" textAnchor="middle" fill="#394DFE" fontSize="18" fontWeight="800" fontFamily="var(--font-sora), sans-serif">AI</text>
        {/* Sparkles */}
        <path d="M365 155 L368 148 L371 155 L368 152 Z" fill="#394DFE" />
        <path d="M432 150 L435 143 L438 150 L435 147 Z" fill="#394DFE" />
      </g>

      {/* ── Flow arrows: AI → Listeners ── */}
      <g id="arrows-to-audience">
        {/* Top arrow */}
        <path d="M430 185 C470 170, 510 130, 560 120" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M553 114 L563 120 L556 127" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Middle arrow */}
        <path d="M430 200 C480 200, 520 200, 560 200" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M553 193 L563 200 L553 207" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Bottom arrow */}
        <path d="M430 215 C470 230, 510 270, 560 280" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M553 273 L563 280 L556 287" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* ── LISTENERS (right) ── */}
      {/* Listener 1 — top */}
      <g id="listener-1">
        <circle cx="610" cy="100" r="20" stroke="#0B1220" strokeWidth="2" />
        <circle cx="604" cy="96" r="1.5" fill="#0B1220" />
        <circle cx="616" cy="96" r="1.5" fill="#0B1220" />
        <path d="M604 106 C607 110, 613 110, 616 106" stroke="#0B1220" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Headphones */}
        <path d="M590 98 C590 80, 630 80, 630 98" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="586" y="96" width="6" height="10" rx="3" fill="#0B1220" />
        <rect x="628" y="96" width="6" height="10" rx="3" fill="#0B1220" />
        {/* Speech bubble */}
        <path d="M645 70 C645 55, 720 55, 720 70 C720 85, 645 85, 645 70 Z" stroke="#0B1220" strokeWidth="2" fill="none" />
        <path d="M650 85 L643 95 L660 85" stroke="#0B1220" strokeWidth="2" fill="none" />
        <text x="682" y="76" textAnchor="middle" fill="#394DFE" fontSize="14" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">HOLA</text>
      </g>

      {/* Listener 2 — middle */}
      <g id="listener-2">
        <circle cx="610" cy="200" r="20" stroke="#0B1220" strokeWidth="2" />
        <circle cx="604" cy="196" r="1.5" fill="#0B1220" />
        <circle cx="616" cy="196" r="1.5" fill="#0B1220" />
        <path d="M604 206 C607 210, 613 210, 616 206" stroke="#0B1220" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M590 198 C590 180, 630 180, 630 198" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="586" y="196" width="6" height="10" rx="3" fill="#0B1220" />
        <rect x="628" y="196" width="6" height="10" rx="3" fill="#0B1220" />
        <path d="M645 170 C645 155, 720 155, 720 170 C720 185, 645 185, 645 170 Z" stroke="#0B1220" strokeWidth="2" fill="none" />
        <path d="M650 185 L643 195 L660 185" stroke="#0B1220" strokeWidth="2" fill="none" />
        <text x="682" y="176" textAnchor="middle" fill="#394DFE" fontSize="14" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">안녕하세요</text>
      </g>

      {/* Listener 3 — bottom */}
      <g id="listener-3">
        <circle cx="610" cy="300" r="20" stroke="#0B1220" strokeWidth="2" />
        <circle cx="604" cy="296" r="1.5" fill="#0B1220" />
        <circle cx="616" cy="296" r="1.5" fill="#0B1220" />
        <path d="M604 306 C607 310, 613 310, 616 306" stroke="#0B1220" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M590 298 C590 280, 630 280, 630 298" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="586" y="296" width="6" height="10" rx="3" fill="#0B1220" />
        <rect x="628" y="296" width="6" height="10" rx="3" fill="#0B1220" />
        <path d="M645 270 C645 255, 720 255, 720 270 C720 285, 645 285, 645 270 Z" stroke="#0B1220" strokeWidth="2" fill="none" />
        <path d="M650 285 L643 295 L660 285" stroke="#0B1220" strokeWidth="2" fill="none" />
        <text x="682" y="276" textAnchor="middle" fill="#394DFE" fontSize="14" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">你好</text>
      </g>

      {/* Label: AUDIENCE */}
      <text x="610" y="355" textAnchor="middle" fill="#0B1220" fontSize="14" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">AUDIENCE</text>
    </svg>
  );
}
