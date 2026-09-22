"use client";
import { useState, useEffect } from "react";


import ProductGraphicIcon from "./ProductGraphicIcon";


const TypewriterText = ({ x, y, fontFamily, fontSize, fontWeight, fill, textAnchor, text, delayOffset = 0, charSpeed = 0.03 }: any) => {
  return (
    <text x={x} y={y} fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight} fill={fill} textAnchor={textAnchor}>
      {text.split('').map((char: string, index: number) => (
        <tspan
          key={index}
          style={{
            opacity: 0,
            animation: `charAppear 0.01s forwards`,
            animationDelay: `${delayOffset + index * charSpeed}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </tspan>
      ))}
    </text>
  );
};

export default function ExbabelLiveSVG() {
  const [loopKey, setLoopKey] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setLoopKey(k => k + 1), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Main Live Streaming Card */}
      <svg
        translate="no"
        className="notranslate"
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
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.6; }
          }
          @keyframes wave {
            0% { transform: scaleY(0.4); }
            100% { transform: scaleY(1.2); }
          }
          @keyframes charAppear {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes headBob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          @keyframes mouthTalk {
            0%, 100% { transform: scaleY(0.2); }
            50% { transform: scaleY(1.2); }
          }
          @keyframes armWaveLeft {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-8deg); }
          }
          @keyframes armWaveRight {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(8deg); }
          }
          .anim-pulse { animation: pulse 2s infinite ease-in-out; transform-origin: 672px 80px; }
          .anim-wave-1 { animation: wave 0.6s infinite alternate ease-in-out; transform-origin: 244px 295px; }
          .anim-wave-2 { animation: wave 0.8s infinite alternate ease-in-out 0.2s; transform-origin: 252px 293px; }
          .anim-wave-3 { animation: wave 0.7s infinite alternate ease-in-out 0.4s; transform-origin: 260px 295px; }
          .anim-head { animation: headBob 3s infinite ease-in-out; }
          .anim-mouth { animation: mouthTalk 0.4s infinite alternate ease-in-out; transform-origin: 250px 150px; }
          .anim-arm-left { animation: armWaveLeft 3s infinite ease-in-out; transform-origin: 215px 185px; }
          .anim-arm-right { animation: armWaveRight 3s infinite ease-in-out 0.5s; transform-origin: 285px 185px; }
        `}} />

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

        {/* Animated Pastor at Pulpit - Detailed */}
        <ellipse cx="250" cy="200" rx="90" ry="110" fill="#263248" />
        
        <g className="anim-head" style={{ transformOrigin: "250px 180px" }}>
          {/* Back Hair */}
          <rect x="228" y="110" width="44" height="40" rx="15" fill="#5D4037" />
          
          {/* Ears */}
          <circle cx="225" cy="135" r="6" fill="#E6B08F" />
          <circle cx="275" cy="135" r="6" fill="#E6B08F" />
          
          {/* Face Base */}
          <path d="M 230 115 C 230 90, 270 90, 270 115 L 270 145 C 270 160, 230 160, 230 145 Z" fill="#F5CBA7" />
          
          {/* Front Hair / Bangs */}
          <path d="M 225 120 C 230 95, 260 95, 275 115 C 265 105, 245 105, 225 120 Z" fill="#4E342E" />
          <path d="M 235 100 C 245 90, 265 100, 275 120 C 265 105, 250 100, 235 100 Z" fill="#4E342E" />
          
          {/* Eyes & Brows */}
          <path d="M 237 122 Q 242 120 246 122" fill="none" stroke="#4E342E" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 254 122 Q 258 120 263 122" fill="none" stroke="#4E342E" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="242" cy="130" r="2.5" fill="#1e293b" />
          <circle cx="258" cy="130" r="2.5" fill="#1e293b" />
          
          {/* Nose */}
          <path d="M 250 135 L 250 142 L 253 142" fill="none" stroke="#D39871" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Animated Mouth */}
          <ellipse className="anim-mouth" cx="250" cy="150" rx="5" ry="2" fill="#5D4037" />
          
          {/* Neck */}
          <rect x="242" y="155" width="16" height="15" fill="#E6B08F" />
          {/* Shadow under chin */}
          <rect x="242" y="155" width="16" height="4" fill="#D39871" opacity="0.6" />
        </g>
        
        {/* Body (Clerical Suit) */}
        <path d="M 220 170 C 235 160, 265 160, 280 170 L 305 260 L 195 260 Z" fill="#1e293b" />
        
        {/* White Clerical Collar */}
        <rect x="244" y="166" width="12" height="6" fill="#f8fafc" />
        
        {/* Silver Cross Necklace */}
        <path d="M 238 172 C 242 195, 258 195, 262 172" fill="none" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="250" y1="188" x2="250" y2="200" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        <line x1="246" y1="192" x2="254" y2="192" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        
        {/* Left Arm (Gesturing) */}
        <g className="anim-arm-left" style={{ transformOrigin: "215px 185px" }}>
          {/* Sleeve */}
          <path d="M 215 175 C 205 185, 175 220, 165 210 L 175 195 C 190 180, 205 170, 220 170 Z" fill="#1e293b" />
          {/* Hand */}
          <circle cx="165" cy="205" r="8" fill="#F5CBA7" />
        </g>
        
        {/* Right Arm (Gesturing) */}
        <g className="anim-arm-right" style={{ transformOrigin: "285px 185px" }}>
          {/* Sleeve */}
          <path d="M 285 175 C 295 185, 325 220, 335 210 L 325 195 C 310 180, 295 170, 280 170 Z" fill="#1e293b" />
          {/* Hand */}
          <circle cx="335" cy="205" r="8" fill="#F5CBA7" />
        </g>

        {/* Pulpit */}
        <rect x="200" y="245" width="100" height="50" fill="#8D6E63" />
        <rect x="210" y="255" width="80" height="35" fill="#795548" />
        
        {/* Top surface */}
        <path d="M 180 240 L 320 240 L 310 248 L 190 248 Z" fill="#A1887F" />
        
        {/* Open Book */}
        <path d="M 220 242 Q 235 238 250 242 L 250 245 Q 235 241 220 245 Z" fill="#f8fafc" />
        <path d="M 250 242 Q 265 238 280 242 L 280 245 Q 265 241 250 245 Z" fill="#f8fafc" />
        <line x1="250" y1="242" x2="250" y2="245" stroke="#94a3b8" strokeWidth="1" />
        
        {/* Glass of Water */}
        <path d="M 290 230 L 300 230 L 298 245 L 292 245 Z" fill="#e0f2fe" opacity="0.6" />
        <rect x="294" y="245" width="2" height="5" fill="#bae6fd" opacity="0.8" />
        <ellipse cx="295" cy="250" rx="6" ry="1.5" fill="#bae6fd" opacity="0.8" />
        <line x1="292" y1="235" x2="298" y2="235" stroke="#38bdf8" strokeWidth="0.5" opacity="0.5" />
        
        {/* Audio waveform indicator on pulpit front */}
        <rect className="anim-wave-1" x="242" y="265" width="4" height="10" rx="2" fill="#10b981" opacity="0.8" style={{ transformOrigin: "center 270px" }} />
        <rect className="anim-wave-2" x="250" y="261" width="4" height="16" rx="2" fill="#10b981" style={{ transformOrigin: "center 269px" }} />
        <rect className="anim-wave-3" x="258" y="265" width="4" height="10" rx="2" fill="#10b981" opacity="0.8" style={{ transformOrigin: "center 270px" }} />\n\n        {/* Subtitle overlay */}
        <rect x="80" y="320" width="340" height="60" rx="10" fill="#000000" fillOpacity="0.75" />
        <g key={loopKey}>
          <TypewriterText x="250" y="347" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="600" fill="#ffffff" textAnchor="middle" text="Y as&#237; miramos al futuro" delayOffset={0.5} />
          <TypewriterText x="250" y="368" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="600" fill="#ffffff" textAnchor="middle" text="con esperanza." delayOffset={1.5} />
        </g>

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
        <circle className="anim-pulse" cx="672" cy="80" r="4" fill="#10b981" />
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

    
      {/* Connect Your Live Stream - left floating card */}
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          left: "-22%",
          top: "12%",
          width: "35%",
          height: "auto",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.12))",
          transform: "perspective(800px) rotateY(10deg) rotateX(2deg)",
          zIndex: 10,
        }}
      >
        <rect width="320" height="280" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        
        {/* Header */}
        <text x="20" y="32" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="700" fill="#0f172a">Connect Your Live Stream</text>
        <text x="20" y="48" fontFamily="var(--font-sora), sans-serif" fontSize="9" fill="#64748b">Paste any livestream URL &#8212; Exbabel detects and connects automatically</text>
        
        <line x1="0" y1="64" x2="320" y2="64" stroke="#f1f5f9" strokeWidth="1" />
        
        {/* Input box */}
        <rect x="20" y="80" width="280" height="34" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="32" y="101" fontFamily="var(--font-sora), sans-serif" fontSize="11" fill="#cbd5e1">Paste a livestream URL...</text>
        
        <text x="20" y="130" fontFamily="var(--font-sora), sans-serif" fontSize="7.5" fill="#94a3b8">Examples: youtube.com/live/... &#183; twitch.tv/... &#183; churchname.org/live</text>
        
        {/* Section Header */}
        <text x="20" y="160" fontFamily="var(--font-sora), sans-serif" fontSize="8" fontWeight="700" fill="#64748b">SUPPORTS 1,800+ STREAMING PLATFORMS</text>
        
        {/* Pills Row 1 */}
        <rect x="20" y="172" width="65" height="22" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="32" cy="183" r="4" fill="#94a3b8" />
        <text x="40" y="186" fontFamily="var(--font-sora), sans-serif" fontSize="9" fontWeight="600" fill="#94a3b8">YouTube</text>
        
        <rect x="90" y="172" width="55" height="22" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="100" y="179" width="8" height="8" rx="2" fill="#94a3b8" />
        <text x="112" y="186" fontFamily="var(--font-sora), sans-serif" fontSize="9" fontWeight="600" fill="#94a3b8">Twitch</text>
        
        <rect x="150" y="172" width="50" height="22" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="160" y="179" width="8" height="8" fill="#cbd5e1" />
        <text x="172" y="186" fontFamily="var(--font-sora), sans-serif" fontSize="9" fontWeight="600" fill="#94a3b8">Kick</text>
        
        <rect x="205" y="172" width="55" height="22" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="215" cy="183" r="4" fill="#94a3b8" />
        <text x="223" y="186" fontFamily="var(--font-sora), sans-serif" fontSize="9" fontWeight="600" fill="#94a3b8">Vimeo</text>
        
        {/* View all text */}
        <circle cx="26" cy="216" r="4.5" fill="none" stroke="#64748b" strokeWidth="1" />
        <line x1="26" y1="213" x2="26" y2="219" stroke="#64748b" strokeWidth="1" />
        <line x1="23" y1="216" x2="29" y2="216" stroke="#64748b" strokeWidth="1" />
        <text x="38" y="219" fontFamily="var(--font-sora), sans-serif" fontSize="9" fontWeight="600" fill="#475569">View all 1,800+ supported platforms</text>
        
        {/* Button */}
        <rect x="20" y="234" width="280" height="34" rx="6" fill="#94a3b8" />
        <path d="M110 248 A 6 6 0 0 1 118 248 M107 245 A 10 10 0 0 1 121 245" stroke="#ffffff" strokeWidth="1" fill="none" />
        <circle cx="114" cy="252" r="1.5" fill="#ffffff" />
        <text x="126" y="254" fontFamily="var(--font-sora), sans-serif" fontSize="11" fontWeight="600" fill="#ffffff">Connect Stream</text>
      </svg>
</div>
  );
}
