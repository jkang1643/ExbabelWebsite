{/* Step 2: AI Translates — hand-drawn sketch style
   Speaker says "HELLO" → AI chip → Interpreters say "HOLA", "你好", "안녕하세요"
   Flow arrows in brand blue, everything else black line art */}

export default function TranslationPipelineSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 700 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Speaker says hello, AI translates to multiple languages for audience">
      {/* ── SPEAKER (top left) ── */}
      <g id="speaker">
        <circle cx="140" cy="80" r="24" stroke="#0B1220" strokeWidth="2.5" />
        <circle cx="133" cy="76" r="1.5" fill="#0B1220" />
        <circle cx="147" cy="76" r="1.5" fill="#0B1220" />
        <path d="M133 88 C136 92, 144 92, 147 88" stroke="#0B1220" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Body */}
        <path d="M140 104 L140 145" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M140 115 L115 135" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M140 115 L165 130" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        {/* Mic */}
        <circle cx="170" cy="125" r="5" stroke="#0B1220" strokeWidth="1.8" />
        <line x1="170" y1="130" x2="170" y2="140" stroke="#0B1220" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Speech bubble: HELLO */}
      <g id="bubble-hello">
        <ellipse cx="230" cy="55" rx="45" ry="22" stroke="#0B1220" strokeWidth="2" />
        <path d="M200 72 L190 88 L215 75" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="230" y="61" textAnchor="middle" fill="#394DFE" fontSize="15" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">HELLO</text>
      </g>

      <text x="140" y="175" textAnchor="middle" fill="#0B1220" fontSize="13" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">SPEAKER</text>

      {/* ── Flow arrow: Speaker → AI ── */}
      <g id="arrow-speaker-ai">
        <path d="M180 120 C220 140, 260 170, 310 185" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M304 180 L313 186 L306 192" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* ── Sound waves ── */}
      <g id="waves" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round">
        <path d="M280 160 L280 175" />
        <path d="M290 155 L290 180" />
        <path d="M300 158 L300 178" />
      </g>

      {/* ── AI CORE (center) ── */}
      <g id="ai-core">
        <rect x="320" y="168" width="60" height="55" rx="8" stroke="#0B1220" strokeWidth="2.5" />
        {/* Chip pins */}
        <line x1="332" y1="168" x2="332" y2="160" stroke="#0B1220" strokeWidth="2" />
        <line x1="350" y1="168" x2="350" y2="160" stroke="#0B1220" strokeWidth="2" />
        <line x1="368" y1="168" x2="368" y2="160" stroke="#0B1220" strokeWidth="2" />
        <line x1="332" y1="223" x2="332" y2="231" stroke="#0B1220" strokeWidth="2" />
        <line x1="350" y1="223" x2="350" y2="231" stroke="#0B1220" strokeWidth="2" />
        <line x1="368" y1="223" x2="368" y2="231" stroke="#0B1220" strokeWidth="2" />
        <text x="350" y="202" textAnchor="middle" fill="#394DFE" fontSize="16" fontWeight="800" fontFamily="var(--font-sora), sans-serif">AI</text>
        {/* Sparkles */}
        <path d="M312 155 L315 148 L318 155 L315 151 Z" fill="#394DFE" />
        <path d="M382 152 L385 145 L388 152 L385 148 Z" fill="#394DFE" />
      </g>

      <text x="350" y="252" textAnchor="middle" fill="#0B1220" fontSize="13" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">AI ENGINE</text>

      {/* ── Flow arrows: AI → Audience (multiple) ── */}
      <g id="arrows-ai-audience">
        <path d="M380 185 C420 170, 460 150, 500 130" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M494 125 L503 131 L496 137" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M380 200 C420 210, 460 220, 500 230" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M494 225 L503 231 L496 237" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Sound waves after AI */}
      <g id="waves-out" stroke="#394DFE" strokeWidth="2.5" strokeLinecap="round">
        <path d="M400 178 L400 192" />
        <path d="M410 172 L410 198" />
        <path d="M420 175 L420 195" />
      </g>

      {/* ── AUDIENCE (right side) ── */}
      {/* Person 1 — top (with headphones) */}
      <g id="audience-1">
        <circle cx="540" cy="105" r="18" stroke="#394DFE" strokeWidth="2.5" />
        <circle cx="534" cy="102" r="1.5" fill="#394DFE" />
        <circle cx="546" cy="102" r="1.5" fill="#394DFE" />
        <path d="M534 112 C536 115, 544 115, 546 112" stroke="#394DFE" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Headset */}
        <path d="M522 102 C522 86, 558 86, 558 102" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="518" y="100" width="5" height="8" rx="2.5" fill="#394DFE" />
        <rect x="557" y="100" width="5" height="8" rx="2.5" fill="#394DFE" />
        {/* Mic boom */}
        <path d="M558 108 C565 112, 565 118, 558 120" stroke="#394DFE" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="556" cy="122" r="3" fill="#394DFE" />
      </g>

      {/* Person 2 — bottom (with headphones) */}
      <g id="audience-2">
        <circle cx="540" cy="225" r="18" stroke="#394DFE" strokeWidth="2.5" />
        <circle cx="534" cy="222" r="1.5" fill="#394DFE" />
        <circle cx="546" cy="222" r="1.5" fill="#394DFE" />
        <path d="M534 232 C536 235, 544 235, 546 232" stroke="#394DFE" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M522 222 C522 206, 558 206, 558 222" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="518" y="220" width="5" height="8" rx="2.5" fill="#394DFE" />
        <rect x="557" y="220" width="5" height="8" rx="2.5" fill="#394DFE" />
        <path d="M558 228 C565 232, 565 238, 558 240" stroke="#394DFE" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="556" cy="242" r="3" fill="#394DFE" />
      </g>

      {/* Speech bubbles from audience */}
      <g id="bubble-hola">
        <ellipse cx="625" cy="85" rx="38" ry="18" stroke="#0B1220" strokeWidth="2" />
        <path d="M595 98 L585 110 L605 100" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="625" y="91" textAnchor="middle" fill="#394DFE" fontSize="13" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">HOLA</text>
      </g>

      <g id="bubble-chinese">
        <ellipse cx="625" cy="210" rx="38" ry="18" stroke="#0B1220" strokeWidth="2" />
        <path d="M595 223 L585 235 L605 225" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="625" y="216" textAnchor="middle" fill="#394DFE" fontSize="13" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">你好</text>
      </g>

      {/* ── AUDIENCE row (bottom) ── */}
      <g id="audience-row">
        {[0,1,2,3,4].map((i) => {
          const x = 280 + i * 50;
          const isAccent = i === 2 || i === 3;
          const color = isAccent ? "#394DFE" : "#0B1220";
          return (
            <g key={i}>
              <circle cx={x} cy="310" r="14" stroke={color} strokeWidth="2" />
              <circle cx={x - 4} cy="307" r="1.2" fill={color} />
              <circle cx={x + 4} cy="307" r="1.2" fill={color} />
              <path d={`M${x - 4} ${315} C${x - 2} ${318}, ${x + 2} ${318}, ${x + 4} ${315}`} stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <path d={`M${x} ${324} L${x} ${345}`} stroke={color} strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        })}
      </g>

      <text x="350" y="375" textAnchor="middle" fill="#0B1220" fontSize="13" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">AUDIENCE</text>
    </svg>
  );
}
