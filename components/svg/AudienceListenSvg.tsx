{/* Step 4: Listen in Your Language — hand-drawn sketch style
   Speaker on stage with screen → audience with phones/headphones each getting different language
   Black line art + #394DFE accent */}

export default function AudienceListenSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 700 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Speaker on stage, audience listening in their preferred language on their devices">
      {/* ── Stage / Screen (top center) ── */}
      <g id="stage">
        {/* Projection screen */}
        <rect x="230" y="20" width="240" height="140" rx="4" stroke="#0B1220" strokeWidth="2.5" />
        {/* Presentation content */}
        <rect x="250" y="40" width="100" height="8" rx="3" fill="#0B1220" opacity="0.15" />
        <rect x="250" y="55" width="200" height="5" rx="2" fill="#0B1220" opacity="0.08" />
        <rect x="250" y="65" width="180" height="5" rx="2" fill="#0B1220" opacity="0.08" />
        <rect x="250" y="75" width="190" height="5" rx="2" fill="#0B1220" opacity="0.08" />
        <rect x="250" y="95" width="80" height="50" rx="4" fill="#394DFE" opacity="0.08" stroke="#394DFE" strokeWidth="1" strokeOpacity="0.2" />
        <rect x="350" y="95" width="100" height="5" rx="2" fill="#0B1220" opacity="0.08" />
        <rect x="350" y="105" width="80" height="5" rx="2" fill="#0B1220" opacity="0.08" />
        <rect x="350" y="115" width="90" height="5" rx="2" fill="#0B1220" opacity="0.08" />
        {/* Stand */}
        <line x1="350" y1="160" x2="350" y2="175" stroke="#0B1220" strokeWidth="2" />
      </g>

      {/* ── Speaker (at podium) ── */}
      <g id="speaker-podium">
        <circle cx="350" cy="195" r="16" stroke="#0B1220" strokeWidth="2.5" />
        <circle cx="345" cy="192" r="1.2" fill="#0B1220" />
        <circle cx="355" cy="192" r="1.2" fill="#0B1220" />
        <path d="M345 200 C347 203, 353 203, 355 200" stroke="#0B1220" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M350 211 L350 235" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M350 220 L330 238" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M350 220 L375 230" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        {/* Mic */}
        <circle cx="378" cy="226" r="4" stroke="#0B1220" strokeWidth="1.5" />
        <line x1="378" y1="230" x2="378" y2="238" stroke="#0B1220" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── Sound waves from speaker ── */}
      <g id="sound" stroke="#394DFE" strokeWidth="2" strokeLinecap="round">
        <path d="M395 215 L395 230" />
        <path d="M405 210 L405 235" />
        <path d="M415 213 L415 232" />
      </g>

      {/* ── Curved arrows down to audience ── */}
      <g id="arrows-down">
        <path d="M300 235 C260 260, 180 275, 130 285" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M136 280 L128 286 L134 292" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        
        <path d="M400 240 C440 265, 510 275, 560 285" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M554 280 L562 286 L556 292" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* ── AUDIENCE (bottom row) ── */}
      {/* Each person has a phone showing their language */}
      {[
        { x: 60, lang: "ES", langFull: "Español" },
        { x: 175, lang: "KO", langFull: "한국어" },
        { x: 290, lang: "FR", langFull: "Français" },
        { x: 405, lang: "ZH", langFull: "中文" },
        { x: 520, lang: "PT", langFull: "Português" },
      ].map((p, i) => {
        const isAccent = i % 2 === 0;
        const color = isAccent ? "#394DFE" : "#0B1220";
        return (
          <g key={p.lang} id={`audience-${p.lang}`}>
            {/* Head */}
            <circle cx={p.x + 40} cy={295} r="16" stroke={color} strokeWidth="2" />
            <circle cx={p.x + 35} cy={292} r="1.2" fill={color} />
            <circle cx={p.x + 45} cy={292} r="1.2" fill={color} />
            <path d={`M${p.x + 35} ${300} C${p.x + 37} ${303}, ${p.x + 43} ${303}, ${p.x + 45} ${300}`} stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
            {/* Body */}
            <path d={`M${p.x + 40} ${311} L${p.x + 40} ${340}`} stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d={`M${p.x + 40} ${320} L${p.x + 25} ${335}`} stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d={`M${p.x + 40} ${320} L${p.x + 55} ${315}`} stroke={color} strokeWidth="2" strokeLinecap="round" />
            {/* Phone in hand */}
            <rect x={p.x + 52} y={305} width="20" height="32" rx="4" stroke={color} strokeWidth="1.5" />
            <rect x={p.x + 55} y={310} width="14" height="4" rx="1.5" fill={color} opacity="0.3" />
            <rect x={p.x + 55} y={317} width="14" height="2.5" rx="1" fill={color} opacity="0.12" />
            <rect x={p.x + 55} y={322} width="10" height="2.5" rx="1" fill={color} opacity="0.08" />
            {/* Language label */}
            <text x={p.x + 40} y={365} textAnchor="middle" fill={color} fontSize="11" fontWeight="700" fontStyle="italic" fontFamily="var(--font-sora), sans-serif">{p.langFull}</text>
          </g>
        );
      })}
    </svg>
  );
}
