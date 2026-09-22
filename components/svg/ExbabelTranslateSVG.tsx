"use client";
import { useState, useEffect } from "react";


import ProductGraphicIcon from "./ProductGraphicIcon";


const TypewriterText = ({ x, y, fontFamily, fontSize, fontWeight, fill, text, delayOffset = 0, charSpeed = 0.02 }: any) => {
  return (
    <text x={x} y={y} fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight} fill={fill}>
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

export default function ExbabelTranslateSVG() {
    const [loopKey, setLoopKey] = useState(0);

  const messages = [
    [
      { text: "Bienvenidos a", delay: 1.5, y: 196 },
      { text: "la iglesia.", delay: 2.0, y: 214 }
    ],
    [
      { text: "Que Dios los", delay: 1.5, y: 196 },
      { text: "bendiga a todos.", delay: 2.0, y: 214 }
    ],
    [
      { text: "Esta ma\u00F1ana de", delay: 1.5, y: 196 },
      { text: "domingo predico", delay: 2.1, y: 214 },
      { text: "sobre Jes\u00FAs.", delay: 2.7, y: 232 }
    ]
  ];

  const currentMessage = messages[loopKey % messages.length];

  useEffect(() => {
    const timer = setInterval(() => setLoopKey(k => k + 1), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Main Host Dashboard Card */}
      <svg
        className="notranslate"
        viewBox="0 0 720 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 16,
          filter: "drop-shadow(0 25px 50px rgba(37,75,217,0.18))",
        }}
      >
        {/* Card background */}
        <rect width="720" height="460" rx="16" fill="#ffffff" />
        <rect x="0.5" y="0.5" width="719" height="459" rx="15.5" stroke="#e5e7eb" strokeOpacity="0.6" />

        {/* Left accent stripe */}
        <rect width="4" height="460" rx="2" fill="url(#translateAccent)" />
        <defs>
          <linearGradient id="translateAccent" x1="0" y1="0" x2="0" y2="460">
            <stop stopColor="#818cf8" />
            <stop offset="1" stopColor="#4338ca" />
          </linearGradient>
        </defs>

        {/* Header bar */}
        <rect x="4" width="716" height="52" fill="#fafbfc" />
        <line x1="4" y1="52" x2="720" y2="52" stroke="#e5e7eb" strokeOpacity="0.5" />
        <text x="28" y="33" fontFamily="var(--font-sora), sans-serif" fontSize="15" fontWeight="600" fill="#1a1a2e">Live Translation &#8212; Host</text>
        <circle cx="688" cy="28" r="12" fill="#f3f4f6" />
        <ProductGraphicIcon name="globe" x={681} y={21} size={14} color="#6b7280" />

        {/* Session Code */}
        <text x="360" y="82" fontFamily="var(--font-sora), sans-serif" fontSize="11" fill="#6b7280" textAnchor="middle">Session Code:</text>
        <text x="360" y="118" fontFamily="var(--font-sora), sans-serif" fontSize="36" fontWeight="800" fill="#4338ca" textAnchor="middle" letterSpacing="6">2UU6SV</text>

        {/* QR Code area */}
        <rect x="295" y="130" width="130" height="130" rx="8" fill="#f8f9fa" stroke="#e5e7eb" />
        {/* QR finder patterns - top-left */}
        <rect x="303" y="138" width="24" height="24" rx="2" fill="#1a1a2e" />
        <rect x="307" y="142" width="16" height="16" rx="1" fill="#fff" />
        <rect x="311" y="146" width="8" height="8" fill="#1a1a2e" />
        {/* QR finder patterns - top-right */}
        <rect x="393" y="138" width="24" height="24" rx="2" fill="#1a1a2e" />
        <rect x="397" y="142" width="16" height="16" rx="1" fill="#fff" />
        <rect x="401" y="146" width="8" height="8" fill="#1a1a2e" />
        {/* QR finder patterns - bottom-left */}
        <rect x="303" y="228" width="24" height="24" rx="2" fill="#1a1a2e" />
        <rect x="307" y="232" width="16" height="16" rx="1" fill="#fff" />
        <rect x="311" y="236" width="8" height="8" fill="#1a1a2e" />
        {/* QR data modules */}
        <rect x="335" y="138" width="6" height="6" fill="#1a1a2e" />
        <rect x="347" y="138" width="6" height="6" fill="#1a1a2e" opacity="0.4" />
        <rect x="359" y="138" width="6" height="6" fill="#1a1a2e" />
        <rect x="371" y="146" width="6" height="6" fill="#1a1a2e" />
        <rect x="383" y="146" width="6" height="6" fill="#1a1a2e" opacity="0.5" />
        <rect x="335" y="154" width="6" height="6" fill="#1a1a2e" opacity="0.4" />
        <rect x="359" y="154" width="6" height="6" fill="#1a1a2e" />
        <rect x="383" y="154" width="6" height="6" fill="#1a1a2e" />
        <rect x="347" y="170" width="6" height="6" fill="#1a1a2e" />
        <rect x="371" y="170" width="6" height="6" fill="#1a1a2e" opacity="0.4" />
        <rect x="335" y="186" width="6" height="6" fill="#1a1a2e" />
        <rect x="359" y="186" width="6" height="6" fill="#1a1a2e" opacity="0.5" />
        <rect x="383" y="186" width="6" height="6" fill="#1a1a2e" />
        <rect x="347" y="202" width="6" height="6" fill="#1a1a2e" />
        <rect x="371" y="202" width="6" height="6" fill="#1a1a2e" />
        <rect x="335" y="218" width="6" height="6" fill="#1a1a2e" opacity="0.4" />
        <rect x="359" y="218" width="6" height="6" fill="#1a1a2e" />
        <rect x="383" y="218" width="6" height="6" fill="#1a1a2e" />
        <rect x="347" y="234" width="6" height="6" fill="#1a1a2e" opacity="0.5" />
        <rect x="371" y="234" width="6" height="6" fill="#1a1a2e" />
        <rect x="393" y="234" width="6" height="6" fill="#1a1a2e" opacity="0.4" />

        <text x="360" y="278" fontFamily="var(--font-sora), sans-serif" fontSize="10" fill="#6b7280" textAnchor="middle">Listeners can scan this code to join</text>

        {/* Share button */}
        <rect x="275" y="290" width="170" height="36" rx="8" fill="#4338ca" />
        <ProductGraphicIcon name="share" x={286} y={301} size={14} color="#ffffff" /><ProductGraphicIcon name="chevron" x={425} y={302} size={12} color="#ffffff" /><text x="360" y="313" fontFamily="var(--font-sora), sans-serif" fontSize="12" fontWeight="600" fill="#ffffff" textAnchor="middle">Share with listeners</text>

        {/* Divider */}
        <line x1="28" y1="340" x2="692" y2="340" stroke="#f3f4f6" strokeWidth="1.5" />

        {/* Connected status */}
        <circle cx="38" cy="360" r="4" fill="#10b981" />
        <text x="48" y="364" fontFamily="var(--font-sora), sans-serif" fontSize="11" fill="#10b981" fontWeight="500">Connected</text>

        {/* Configuration */}
        <text x="28" y="386" fontFamily="var(--font-sora), sans-serif" fontSize="13" fontWeight="600" fill="#1a1a2e">Configuration</text>
        <text x="28" y="405" fontFamily="var(--font-sora), sans-serif" fontSize="10" fill="#6b7280">Speaking Language</text>
        <rect x="28" y="412" width="300" height="34" rx="8" fill="#f3f4f6" stroke="#e5e7eb" />
        <text x="48" y="434" fontFamily="var(--font-sora), sans-serif" fontSize="12" fill="#374151">Auto-detect</text>
        <ProductGraphicIcon name="chevron" x={306} y={422} size={12} color="#9ca3af" />

        {/* Start Broadcasting */}
        <rect x="380" y="406" width="190" height="42" rx="10" fill="#ef4444" />
        <ProductGraphicIcon name="microphone" x={391} y={421} size={13} color="#ffffff" /><text x="475" y="432" fontFamily="var(--font-sora), sans-serif" fontSize="13" fontWeight="600" fill="#ffffff" textAnchor="middle">Start Broadcasting</text>

        {/* End Session */}
        <rect x="590" y="412" width="100" height="30" rx="8" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
        <ProductGraphicIcon name="stop" x={596} y={422} size={10} color="#ef4444" /><text x="640" y="431" fontFamily="var(--font-sora), sans-serif" fontSize="10" fontWeight="500" fill="#ef4444" textAnchor="middle">End Session</text>
      </svg>

      {/* Floating Join Session Card */}
      <svg
        viewBox="0 0 300 370"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          right: "-10%",
          top: "5%",
          width: "36%",
          height: "auto",
          borderRadius: 18,
          filter: "drop-shadow(0 30px 60px rgba(16,185,129,0.25))",
          transform: "perspective(800px) rotateY(-12deg) rotateX(3deg)",
        }}
      >
        <rect width="300" height="370" rx="18" fill="#ecfdf5" />
        <rect width="300" height="370" rx="18" fill="url(#mintGradT)" opacity="0.4" />
        <defs>
          <linearGradient id="mintGradT" x1="0" y1="0" x2="300" y2="370">
            <stop stopColor="#d1fae5" />
            <stop offset="1" stopColor="#a7f3d0" />
          </linearGradient>
        </defs>

        <rect x="20" y="30" width="260" height="320" rx="14" fill="#ffffff" fillOpacity="0.88" stroke="#d1fae5" />

        <ProductGraphicIcon name="headphones" x={137} y={48} size={26} color="#059669" />
        <text x="150" y="98" fontFamily="var(--font-sora), sans-serif" fontSize="17" fontWeight="700" fill="#1a1a2e" textAnchor="middle">Join a Session</text>
        <text x="150" y="114" fontFamily="var(--font-sora), sans-serif" fontSize="10" fill="#6b7280" textAnchor="middle">Enter the code shown by your host</text>

        <text x="40" y="140" fontFamily="var(--font-sora), sans-serif" fontSize="8" fontWeight="700" fill="#6b7280" letterSpacing="1.5">SESSION CODE</text>
        <rect x="36" y="146" width="228" height="40" rx="10" fill="#f9fafb" stroke="#e5e7eb" />
        <text x="150" y="173" fontFamily="var(--font-sora), sans-serif" fontSize="20" fontWeight="800" fill="#1a1a2e" textAnchor="middle" letterSpacing="10">2UU6SV</text>

        <text x="40" y="206" fontFamily="var(--font-sora), sans-serif" fontSize="8" fontWeight="700" fill="#6b7280" letterSpacing="1.5">YOUR NAME</text>
        <text x="115" y="206" fontFamily="var(--font-sora), sans-serif" fontSize="8" fill="#9ca3af">(optional)</text>
        <rect x="36" y="212" width="228" height="34" rx="10" fill="#f9fafb" stroke="#e5e7eb" />
        <text x="52" y="234" fontFamily="var(--font-sora), sans-serif" fontSize="11" fill="#9ca3af">Anonymous</text>

        <text x="40" y="266" fontFamily="var(--font-sora), sans-serif" fontSize="8" fontWeight="700" fill="#6b7280" letterSpacing="1.5">TRANSLATION LANGUAGE</text>
        <rect x="36" y="272" width="228" height="34" rx="10" fill="#f9fafb" stroke="#e5e7eb" />
        <text x="52" y="294" fontFamily="var(--font-sora), sans-serif" fontSize="11" fill="#374151">Spanish (Latin America)</text>
        <ProductGraphicIcon name="chevron" x={247} y={284} size={10} color="#9ca3af" />

        <rect x="36" y="316" width="228" height="40" rx="12" fill="#10b981" />
        <ProductGraphicIcon name="arrow" x={222} y={328} size={14} color="#ffffff" /><text x="150" y="341" fontFamily="var(--font-sora), sans-serif" fontSize="13" fontWeight="600" fill="#ffffff" textAnchor="middle">Join Session</text>
      </svg>

      {/* Floating Listener View - mobile phone frame */}
      <svg
        viewBox="0 0 200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          left: "-5%",
          top: "12%",
          width: "23%",
          height: "auto",
          filter: "drop-shadow(0 30px 60px rgba(59,130,246,0.25))",
          transform: "perspective(800px) rotateY(12deg) rotateX(2deg)",
        }}
      >
        {/* Phone frame */}
        <rect width="200" height="400" rx="20" fill="#0a1628" stroke="#1e293b" strokeWidth="2" />

        {/* Status bar chips */}
        <rect x="12" y="12" width="48" height="20" rx="6" fill="#1e293b" />
        <text x="36" y="26" fontFamily="var(--font-sora), sans-serif" fontSize="8" fontWeight="600" fill="#e2e8f0" textAnchor="middle">2UU6SV</text>

        <rect x="64" y="12" width="28" height="20" rx="6" fill="#1e293b" />
        <text x="78" y="26" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">S2S</text>

        <rect x="96" y="12" width="70" height="20" rx="6" fill="#1e293b" />
        <text x="131" y="26" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#e2e8f0" textAnchor="middle">Spanish...</text>

        {/* Active badge */}
        <circle cx="174" cy="22" r="3" fill="#10b981" />
        <text x="174" y="40" fontFamily="var(--font-sora), sans-serif" fontSize="6" fill="#10b981" textAnchor="middle">ACTIVE</text>

        {/* Main dark content area */}
        <rect x="8" y="50" width="184" height="300" rx="10" fill="#0f172a" />

        {/* Translated text */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes charAppear {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
          `}} />
          <g key={loopKey}>
              <TypewriterText x="20" y="160" fontFamily="var(--font-sora), sans-serif" fontSize="11" fill="#94a3b8" text="Live Translation:" delayOffset={0.5} />
      
              {currentMessage.map((line, i) => (
                <TypewriterText key={i} x="20" y={line.y} fontFamily="var(--font-sora), sans-serif" fontSize="12" fontWeight="700" fill="#10b981" text={line.text} delayOffset={line.delay} />
              ))}
            </g>
  
          {/* Bottom bar */}
        <rect x="8" y="356" width="184" height="36" rx="10" fill="#111827" />
        <rect x="16" y="364" width="4" height="16" rx="2" fill="#10b981" opacity="0.5" />
        <rect x="22" y="368" width="4" height="8" rx="2" fill="#10b981" opacity="0.7" />
        <rect x="28" y="362" width="4" height="20" rx="2" fill="#10b981" />
        <rect x="34" y="366" width="4" height="12" rx="2" fill="#10b981" opacity="0.6" />
        <text x="46" y="377" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#94a3b8">Streaming Translated Audio</text>

        <rect x="130" y="365" width="54" height="18" rx="6" fill="#1e293b" />
        <text x="157" y="378" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#e2e8f0" textAnchor="middle">Multi Voice</text>
      </svg>

    </div>
  );
}
