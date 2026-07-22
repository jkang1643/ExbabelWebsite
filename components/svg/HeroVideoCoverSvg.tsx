{/*
  HeroVideoCoverSvg — Hand holding smartphone with language channels & wireless earbuds.
  Hand-drawn sketch style matching LiveVoice hero illustration.
  Black line art (#0B1220) + Exbabel brand blue (#394DFE).
*/}

export default function HeroVideoCoverSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Hand holding a smartphone displaying real-time translation channels with wireless earbuds"
    >
      {/* ── Soft grey background card ── */}
      <rect x="60" y="40" width="380" height="320" rx="24" fill="#F1F5F9" />

      {/* ── Floating Wireless Earbuds (Top Right) ── */}
      <g id="earbuds">
        {/* Left Earbud */}
        <path
          d="M380 90 C370 70, 395 55, 410 70 C418 78, 415 95, 400 100 C390 103, 385 115, 385 130"
          stroke="#0B1220"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="395" cy="80" r="10" stroke="#0B1220" strokeWidth="2" fill="#F1F5F9" />

        {/* Right Earbud */}
        <path
          d="M415 110 C405 90, 430 75, 445 90 C453 98, 450 115, 435 120 C425 123, 420 135, 420 150"
          stroke="#0B1220"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="430" cy="100" r="10" stroke="#0B1220" strokeWidth="2" fill="#F1F5F9" />
      </g>

      {/* ── Smartphone (Angled slightly) ── */}
      <g id="phone-group" transform="rotate(-6 230 200)">
        {/* Phone Body Outline */}
        <rect
          x="140"
          y="60"
          width="170"
          height="280"
          rx="24"
          stroke="#0B1220"
          strokeWidth="3"
          fill="#FFFFFF"
        />

        {/* Speaker Notch */}
        <line x1="205" y1="74" x2="245" y2="74" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />

        {/* Language Options List */}
        {/* Option 1: English */}
        <g id="lang-english">
          <polygon points="175,120 175,134 187,127" fill="#0B1220" />
          <text
            x="200"
            y="132"
            fill="#0B1220"
            fontSize="18"
            fontWeight="700"
            fontFamily="var(--font-sora), sans-serif"
          >
            English
          </text>
        </g>

        {/* Option 2: Spanish */}
        <g id="lang-spanish">
          <polygon points="175,165 175,179 187,172" fill="#0B1220" />
          <text
            x="200"
            y="177"
            fill="#0B1220"
            fontSize="18"
            fontWeight="700"
            fontFamily="var(--font-sora), sans-serif"
          >
            Spanish
          </text>
        </g>

        {/* Option 3: Korean (Active / Playing) */}
        <g id="lang-korean">
          {/* Pause Icon for active stream */}
          <rect x="175" y="208" width="4" height="14" fill="#394DFE" rx="1" />
          <rect x="183" y="208" width="4" height="14" fill="#394DFE" rx="1" />
          <text
            x="200"
            y="222"
            fill="#394DFE"
            fontSize="18"
            fontWeight="800"
            fontFamily="var(--font-sora), sans-serif"
          >
            Korean
          </text>
        </g>

        {/* Option 4: French */}
        <g id="lang-french">
          <polygon points="175,255 175,269 187,262" fill="#0B1220" />
          <text
            x="200"
            y="267"
            fill="#0B1220"
            fontSize="18"
            fontWeight="700"
            fontFamily="var(--font-sora), sans-serif"
          >
            French
          </text>
        </g>
      </g>

      {/* ── Hand Holding Phone (Left & Right fingers wrapping around) ── */}
      <g id="hand-fingers">
        {/* Left Thumb / Fingers wrapping around left edge */}
        <path d="M125 150 C110 150, 110 170, 128 170" stroke="#0B1220" strokeWidth="3" strokeLinecap="round" fill="#FFFFFF" />
        <path d="M120 180 C100 180, 100 205, 124 205" stroke="#0B1220" strokeWidth="3" strokeLinecap="round" fill="#FFFFFF" />
        <path d="M118 215 C95 215, 95 240, 122 240" stroke="#0B1220" strokeWidth="3" strokeLinecap="round" fill="#FFFFFF" />
        <path d="M122 250 C100 250, 105 275, 126 275" stroke="#0B1220" strokeWidth="3" strokeLinecap="round" fill="#FFFFFF" />

        {/* Palm & Wrist line coming from bottom */}
        <path d="M130 280 C135 320, 150 360, 160 380" stroke="#0B1220" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M295 290 C300 330, 305 360, 310 380" stroke="#0B1220" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* ── Small label (Bottom Right) ── */}
      <text
        x="425"
        y="335"
        textAnchor="end"
        fill="#667085"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-sora), sans-serif"
      >
        Exbabel explained in 180s
      </text>
    </svg>
  );
}
