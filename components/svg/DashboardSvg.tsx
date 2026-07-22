{/* Step 5: After the Event — hand-drawn sketch style
   Simple icon grid: Transcript, Summary, Captions, Search/Analytics
   Black line art + #394DFE accent, like LiveVoice's feature grid */}

export default function DashboardSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="After event: full transcript, AI summary, caption files, analytics dashboard">
      {/* Row 1 */}
      {/* Transcript icon */}
      <g id="icon-transcript">
        <rect x="50" y="30" width="50" height="60" rx="4" stroke="#0B1220" strokeWidth="2.5" />
        <rect x="60" y="42" width="30" height="3" rx="1.5" fill="#0B1220" opacity="0.3" />
        <rect x="60" y="50" width="25" height="3" rx="1.5" fill="#0B1220" opacity="0.2" />
        <rect x="60" y="58" width="28" height="3" rx="1.5" fill="#0B1220" opacity="0.2" />
        <rect x="60" y="66" width="20" height="3" rx="1.5" fill="#0B1220" opacity="0.2" />
        <rect x="60" y="74" width="30" height="3" rx="1.5" fill="#0B1220" opacity="0.15" />
        <text x="75" y="115" textAnchor="middle" fill="#0B1220" fontSize="12" fontWeight="700" fontFamily="var(--font-sora), sans-serif">Full Transcript</text>
      </g>

      {/* AI Summary icon */}
      <g id="icon-summary">
        {/* Sparkle / AI wand */}
        <path d="M215 35 L218 28 L221 35 L218 31 Z" fill="#394DFE" />
        <path d="M240 30 L243 23 L246 30 L243 26 Z" fill="#394DFE" />
        <rect x="200" y="42" width="50" height="48" rx="4" stroke="#0B1220" strokeWidth="2.5" />
        <rect x="210" y="52" width="30" height="3" rx="1.5" fill="#394DFE" opacity="0.3" />
        <rect x="210" y="60" width="25" height="3" rx="1.5" fill="#0B1220" opacity="0.15" />
        <rect x="210" y="68" width="28" height="3" rx="1.5" fill="#0B1220" opacity="0.15" />
        <rect x="210" y="76" width="20" height="3" rx="1.5" fill="#0B1220" opacity="0.12" />
        <text x="225" y="115" textAnchor="middle" fill="#0B1220" fontSize="12" fontWeight="700" fontFamily="var(--font-sora), sans-serif">AI Summary</text>
      </g>

      {/* Caption Files icon */}
      <g id="icon-captions">
        {/* Caption / subtitle icon */}
        <rect x="350" y="38" width="56" height="38" rx="6" stroke="#0B1220" strokeWidth="2.5" />
        <rect x="360" y="48" width="20" height="5" rx="2" fill="#394DFE" opacity="0.3" />
        <rect x="384" y="48" width="12" height="5" rx="2" fill="#0B1220" opacity="0.15" />
        <rect x="360" y="58" width="16" height="5" rx="2" fill="#0B1220" opacity="0.15" />
        <rect x="380" y="58" width="18" height="5" rx="2" fill="#394DFE" opacity="0.3" />
        {/* File types below */}
        <rect x="350" y="84" width="24" height="12" rx="3" stroke="#0B1220" strokeWidth="1.5" />
        <text x="362" y="93" textAnchor="middle" fill="#0B1220" fontSize="7" fontWeight="600" fontFamily="var(--font-sora), sans-serif">.srt</text>
        <rect x="380" y="84" width="24" height="12" rx="3" stroke="#0B1220" strokeWidth="1.5" />
        <text x="392" y="93" textAnchor="middle" fill="#0B1220" fontSize="7" fontWeight="600" fontFamily="var(--font-sora), sans-serif">.vtt</text>
        <text x="378" y="115" textAnchor="middle" fill="#0B1220" fontSize="12" fontWeight="700" fontFamily="var(--font-sora), sans-serif">Caption Files</text>
      </g>

      {/* Analytics icon */}
      <g id="icon-analytics">
        {/* Bar chart */}
        <rect x="500" y="64" width="10" height="24" rx="2" stroke="#0B1220" strokeWidth="2" />
        <rect x="515" y="52" width="10" height="36" rx="2" stroke="#0B1220" strokeWidth="2" fill="#394DFE" opacity="0.1" />
        <rect x="530" y="44" width="10" height="44" rx="2" stroke="#0B1220" strokeWidth="2" />
        <rect x="545" y="56" width="10" height="32" rx="2" stroke="#0B1220" strokeWidth="2" fill="#394DFE" opacity="0.1" />
        {/* Trend line */}
        <path d="M505 58 L520 48 L535 40 L550 50" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="505" cy="58" r="2.5" fill="#394DFE" />
        <circle cx="520" cy="48" r="2.5" fill="#394DFE" />
        <circle cx="535" cy="40" r="2.5" fill="#394DFE" />
        <circle cx="550" cy="50" r="2.5" fill="#394DFE" />
        <text x="528" y="115" textAnchor="middle" fill="#0B1220" fontSize="12" fontWeight="700" fontFamily="var(--font-sora), sans-serif">Analytics</text>
      </g>

      {/* Row 2 */}
      {/* Search icon */}
      <g id="icon-search">
        <circle cx="85" cy="175" r="18" stroke="#0B1220" strokeWidth="2.5" fill="none" />
        <line x1="98" y1="189" x2="112" y2="203" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <text x="85" y="230" textAnchor="middle" fill="#0B1220" fontSize="12" fontWeight="700" fontFamily="var(--font-sora), sans-serif">Searchable</text>
      </g>

      {/* Translation History icon */}
      <g id="icon-history">
        {/* Clock */}
        <circle cx="235" cy="178" r="18" stroke="#0B1220" strokeWidth="2.5" fill="none" />
        <line x1="235" y1="178" x2="235" y2="166" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" />
        <line x1="235" y1="178" x2="246" y2="182" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" />
        {/* Circular arrow */}
        <path d="M218 168 C212 176, 214 190, 225 196" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M220 164 L217 170 L224 169" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="235" y="230" textAnchor="middle" fill="#0B1220" fontSize="12" fontWeight="700" fontFamily="var(--font-sora), sans-serif">History</text>
      </g>

      {/* Multi-language export */}
      <g id="icon-export">
        {/* Globe */}
        <circle cx="385" cy="178" r="18" stroke="#0B1220" strokeWidth="2.5" fill="none" />
        <ellipse cx="385" cy="178" rx="18" ry="8" stroke="#0B1220" strokeWidth="1.5" fill="none" />
        <line x1="385" y1="160" x2="385" y2="196" stroke="#0B1220" strokeWidth="1.5" />
        <line x1="367" y1="178" x2="403" y2="178" stroke="#0B1220" strokeWidth="1.5" />
        {/* Download arrow */}
        <path d="M408 186 L408 200 L418 194 L408 200 L398 194" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="385" y="230" textAnchor="middle" fill="#0B1220" fontSize="12" fontWeight="700" fontFamily="var(--font-sora), sans-serif">Export</text>
      </g>

      {/* Share/Embed */}
      <g id="icon-share">
        {/* Share nodes */}
        <circle cx="520" cy="168" r="7" stroke="#0B1220" strokeWidth="2" fill="none" />
        <circle cx="545" cy="178" r="7" stroke="#0B1220" strokeWidth="2" fill="none" />
        <circle cx="520" cy="192" r="7" stroke="#0B1220" strokeWidth="2" fill="none" />
        <line x1="527" y1="170" x2="538" y2="176" stroke="#0B1220" strokeWidth="2" />
        <line x1="527" y1="190" x2="538" y2="180" stroke="#0B1220" strokeWidth="2" />
        <circle cx="520" cy="168" r="3" fill="#394DFE" opacity="0.3" />
        <circle cx="545" cy="178" r="3" fill="#394DFE" opacity="0.3" />
        <circle cx="520" cy="192" r="3" fill="#394DFE" opacity="0.3" />
        <text x="535" y="230" textAnchor="middle" fill="#0B1220" fontSize="12" fontWeight="700" fontFamily="var(--font-sora), sans-serif">Share</text>
      </g>

      <text x="300" y="270" textAnchor="middle" fill="#667085" fontSize="12" fontFamily="var(--font-sora), sans-serif">Everything saved automatically in your dashboard.</text>
    </svg>
  );
}
