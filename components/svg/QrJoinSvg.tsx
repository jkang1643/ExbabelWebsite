{/* Step 3: Attendees Join — hand-drawn sketch style
   QR code + phone scanning + link sharing
   Black line art + #394DFE accent */}

export default function QrJoinSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Attendees scan QR code or open link to join">
      {/* ── QR Code (center) ── */}
      <g id="qr-code">
        <rect x="230" y="30" width="140" height="140" rx="8" stroke="#0B1220" strokeWidth="2.5" />
        {/* QR pattern — simplified abstract */}
        <rect x="248" y="48" width="30" height="30" rx="3" stroke="#0B1220" strokeWidth="2" />
        <rect x="256" y="56" width="14" height="14" rx="2" fill="#0B1220" />
        <rect x="322" y="48" width="30" height="30" rx="3" stroke="#0B1220" strokeWidth="2" />
        <rect x="330" y="56" width="14" height="14" rx="2" fill="#0B1220" />
        <rect x="248" y="122" width="30" height="30" rx="3" stroke="#0B1220" strokeWidth="2" />
        <rect x="256" y="130" width="14" height="14" rx="2" fill="#0B1220" />
        {/* Random blocks */}
        <rect x="290" y="52" width="8" height="8" fill="#0B1220" />
        <rect x="302" y="52" width="8" height="8" fill="#0B1220" />
        <rect x="290" y="68" width="8" height="8" fill="#0B1220" />
        <rect x="248" y="90" width="8" height="8" fill="#0B1220" />
        <rect x="264" y="90" width="8" height="8" fill="#0B1220" />
        <rect x="290" y="85" width="20" height="20" rx="2" fill="#394DFE" opacity="0.15" />
        <text x="300" y="100" textAnchor="middle" fill="#394DFE" fontSize="10" fontWeight="700" fontFamily="var(--font-sora), sans-serif">EX</text>
        <rect x="322" y="90" width="8" height="8" fill="#0B1220" />
        <rect x="338" y="90" width="8" height="8" fill="#0B1220" />
        <rect x="322" y="125" width="8" height="8" fill="#0B1220" />
        <rect x="338" y="130" width="8" height="8" fill="#0B1220" />
        <rect x="290" y="130" width="8" height="8" fill="#0B1220" />
        <rect x="302" y="140" width="8" height="8" fill="#0B1220" />
      </g>

      {/* ── Phone scanning (left) ── */}
      <g id="phone-scan">
        <rect x="60" y="60" width="70" height="120" rx="10" stroke="#0B1220" strokeWidth="2.5" />
        <rect x="75" y="68" width="40" height="6" rx="3" fill="#0B1220" opacity="0.12" />
        {/* Screen shows language list */}
        <rect x="72" y="82" width="46" height="6" rx="2" fill="#394DFE" />
        <rect x="72" y="93" width="46" height="4" rx="2" fill="#0B1220" opacity="0.1" />
        <rect x="72" y="101" width="46" height="4" rx="2" fill="#0B1220" opacity="0.1" />
        <rect x="72" y="109" width="46" height="4" rx="2" fill="#0B1220" opacity="0.1" />
        <rect x="72" y="117" width="46" height="4" rx="2" fill="#0B1220" opacity="0.1" />
        {/* Camera icon aiming at QR */}
        <rect x="80" y="130" width="30" height="20" rx="4" stroke="#0B1220" strokeWidth="1.5" />
        <circle cx="95" cy="140" r="5" stroke="#0B1220" strokeWidth="1.5" />
        {/* Home bar */}
        <rect x="82" y="168" width="26" height="4" rx="2" fill="#0B1220" opacity="0.12" />
        {/* Scan arrow */}
        <path d="M135 120 C160 110, 190 100, 225 90" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="6 4" />
      </g>

      {/* ── Person with phone (right) ── */}
      <g id="person-scanning">
        <circle cx="500" cy="80" r="22" stroke="#0B1220" strokeWidth="2.5" />
        <circle cx="493" cy="76" r="1.5" fill="#0B1220" />
        <circle cx="507" cy="76" r="1.5" fill="#0B1220" />
        <path d="M493 87 C496 91, 504 91, 507 87" stroke="#0B1220" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Body */}
        <path d="M500 102 L500 160" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M500 120 L470 140" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M500 120 L530 110" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
        {/* Phone in hand */}
        <rect x="525" y="98" width="28" height="45" rx="5" stroke="#0B1220" strokeWidth="2" />
        <rect x="530" y="105" width="18" height="4" rx="1.5" fill="#394DFE" />
        <rect x="530" y="113" width="18" height="3" rx="1" fill="#0B1220" opacity="0.1" />
        <rect x="530" y="119" width="18" height="3" rx="1" fill="#0B1220" opacity="0.1" />
        {/* Arrow from QR to phone */}
        <path d="M375 100 C420 105, 470 108, 522 108" stroke="#394DFE" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="6 4" />
      </g>

      {/* ── "or" divider ── */}
      <text x="300" y="210" textAnchor="middle" fill="#667085" fontSize="13" fontFamily="var(--font-sora), sans-serif">or open a link</text>

      {/* ── Link bar ── */}
      <g id="link-bar">
        <rect x="200" y="225" width="200" height="32" rx="16" stroke="#0B1220" strokeWidth="2" />
        <text x="300" y="246" textAnchor="middle" fill="#394DFE" fontSize="12" fontWeight="600" fontFamily="var(--font-sora), sans-serif">exbabel.com/join/my-event</text>
      </g>

      {/* ── Bottom reassurance ── */}
      <g id="reassurance">
        <text x="170" y="295" textAnchor="middle" fill="#0B1220" fontSize="13" fontWeight="700" fontFamily="var(--font-sora), sans-serif">✓ No downloads</text>
        <text x="300" y="295" textAnchor="middle" fill="#0B1220" fontSize="13" fontWeight="700" fontFamily="var(--font-sora), sans-serif">✓ No apps</text>
        <text x="430" y="295" textAnchor="middle" fill="#0B1220" fontSize="13" fontWeight="700" fontFamily="var(--font-sora), sans-serif">✓ No accounts</text>
      </g>
    </svg>
  );
}
