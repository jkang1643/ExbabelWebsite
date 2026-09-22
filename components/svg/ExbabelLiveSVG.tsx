"use client";

import ProductGraphicIcon from "./ProductGraphicIcon";

export default function ExbabelLiveSVG() {
  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Main Live Streaming Card */}
      <svg
        viewBox="0 0 720 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 16,
          filter: "drop-shadow(0 25px 50px rgba(103,64,200,0.22))",
        }}
      >
        {/* Dark background */}
        <rect width="720" height="460" rx="16" fill="#0f172a" />
        <rect x="0.5" y="0.5" width="719" height="459" rx="15.5" stroke="#1e293b" />

        {/* Navbar */}
        <rect width="720" height="48" rx="16" fill="#111827" />
        <rect y="16" width="720" height="32" fill="#111827" />
        <line x1="0" y1="48" x2="720" y2="48" stroke="#1e293b" />

        {/* Logo */}
        <rect x="20" y="12" width="26" height="26" rx="6" fill="#10b981" />
        <ProductGraphicIcon name="play" x={24} y={16} size={18} color="#ffffff" />
        <text x="56" y="30" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="700" fill="#ffffff">Exbabel</text>

        {/* Nav buttons */}
        <text x="600" y="30" fontFamily="var(--font-sora), sans-serif" fontSize="11" fill="#94a3b8">Sign In</text>
        <rect x="650" y="14" width="56" height="26" rx="6" fill="#10b981" />
        <text x="678" y="31" fontFamily="var(--font-sora), sans-serif" fontSize="10" fontWeight="600" fill="#ffffff" textAnchor="middle">Sign Up</text>

        {/* Main video area */}
        <rect x="20" y="60" width="460" height="340" rx="12" fill="#1a2332" />

        {/* Video gradient overlay */}
        <rect x="20" y="60" width="460" height="340" rx="12" fill="url(#videoGrad)" opacity="0.3" />
        <defs>
          <linearGradient id="videoGrad" x1="250" y1="60" x2="250" y2="400">
            <stop stopColor="#0f172a" stopOpacity="0" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* LIVE badge */}
        <rect x="36" y="74" width="52" height="22" rx="6" fill="#1e293b" fillOpacity="0.9" />
        <circle cx="48" cy="85" r="3" fill="#ef4444" />
        <text x="58" y="89" fontFamily="var(--font-sora), sans-serif" fontSize="10" fontWeight="600" fill="#ffffff">LIVE</text>

        {/* Camera badge */}
        <rect x="380" y="74" width="88" height="22" rx="6" fill="#1e293b" fillOpacity="0.9" />
        <text x="392" y="89" fontFamily="var(--font-sora), sans-serif" fontSize="9" fill="#94a3b8">Main Auditorium</text>

        {/* Speaker silhouette - abstract representation */}
        <ellipse cx="250" cy="200" rx="90" ry="110" fill="#263248" />
        <circle cx="250" cy="160" r="40" fill="#334155" />
        <rect x="210" y="195" width="80" height="100" rx="10" fill="#334155" />

        {/* Audio waveform indicator */}
        <rect x="242" y="290" width="4" height="10" rx="2" fill="#10b981" opacity="0.8" />
        <rect x="250" y="286" width="4" height="14" rx="2" fill="#10b981" />
        <rect x="258" y="290" width="4" height="10" rx="2" fill="#10b981" opacity="0.8" />

        {/* Subtitle overlay */}
        <rect x="80" y="320" width="340" height="60" rx="10" fill="#000000" fillOpacity="0.75" />
        <text x="250" y="347" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="600" fill="#ffffff" textAnchor="middle">Y as&#237; miramos al futuro</text>
        <text x="250" y="368" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="600" fill="#ffffff" textAnchor="middle">con esperanza.</text>

        {/* Status bar at bottom of video */}
        <rect x="20" y="400" width="460" height="50" rx="0" fill="#111827" />
        <rect x="20" y="440" width="460" height="10" rx="5" fill="#111827" />

        {/* Exbabel Live label */}
        <text x="36" y="422" fontFamily="var(--font-sora), sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">Exbabel Live</text>
        <rect x="120" y="411" width="52" height="18" rx="9" fill="#064e3b" />
        <text x="146" y="424" fontFamily="var(--font-sora), sans-serif" fontSize="8" fontWeight="600" fill="#10b981" textAnchor="middle">ONLINE</text>

        {/* Language selector */}
        <rect x="290" y="407" width="180" height="28" rx="8" fill="#1e293b" />
        <text x="300" y="417" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#64748b" letterSpacing="1">AI VOICEOVER & SUBTITLES</text>
        <text x="308" y="430" fontFamily="var(--font-sora), sans-serif" fontSize="10" fill="#e2e8f0">Espa&#241;ol (Spanish)</text>
        <ProductGraphicIcon name="chevron" x={450} y={418} size={12} color="#64748b" />

        {/* Subtitle Log Panel */}
        <rect x="496" y="60" width="208" height="340" rx="12" fill="#111827" stroke="#1e293b" />

        {/* Subtitle Log header */}
        <rect x="496" y="60" width="208" height="40" rx="12" fill="#1a2332" />
        <rect x="496" y="88" width="208" height="12" fill="#1a2332" />
        <text x="516" y="86" fontFamily="var(--font-sora), sans-serif" fontSize="12" fontWeight="600" fill="#e2e8f0">Subtitle Log</text>

        {/* Connected indicator */}
        <circle cx="672" cy="80" r="4" fill="#10b981" />
        <text x="688" y="84" fontFamily="var(--font-sora), sans-serif" fontSize="8" fontWeight="500" fill="#10b981">CONNECTED</text>

        {/* Log lines placeholder */}
        <circle cx="510" cy="120" r="2" fill="#475569" />
        <circle cx="518" cy="120" r="2" fill="#475569" />
        <circle cx="526" cy="120" r="2" fill="#475569" />

        {/* Listener status bar */}
        <rect x="496" y="400" width="208" height="50" rx="0" fill="#0f172a" />
        <rect x="496" y="440" width="208" height="10" rx="5" fill="#0f172a" />
      </svg>

      {/* Floating Live Translation Card */}
      <svg
        viewBox="0 0 240 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          right: "-5%",
          top: "40%",
          width: "28%",
          height: "auto",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
          transform: "perspective(800px) rotateY(-10deg) rotateX(2deg)",
        }}
      >
        <rect width="240" height="150" rx="16" fill="#ffffff" fillOpacity="0.95" stroke="#e2e8f0" />
        <circle cx="20" cy="24" r="3" fill="#059669" />
        <text x="30" y="28" fontFamily="var(--font-sora), sans-serif" fontSize="10" fontWeight="600" fill="#64748b">Live translation</text>
        
        <text x="30" y="65" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="600" fill="#0f172a">English</text>
        <text x="90" y="64" fontFamily="var(--font-sora), sans-serif" fontSize="12" fill="#94a3b8">→</text>
        <text x="115" y="65" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="600" fill="#0f172a">Français</text>
        
        <text x="30" y="95" fontFamily="var(--font-sora), sans-serif" fontSize="12" fill="#64748b">Everyone is welcome.</text>
        <text x="30" y="120" fontFamily="var(--font-sora), sans-serif" fontSize="16" fontWeight="500" fill="#4f46e5">Bienvenue à tous.</text>
      </svg>

    </div>
  );
}
