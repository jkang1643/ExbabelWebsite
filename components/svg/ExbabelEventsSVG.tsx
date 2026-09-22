"use client";

import ProductGraphicIcon from "./ProductGraphicIcon";

export default function ExbabelEventsSVG() {
  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Main Events Dashboard Card */}
      <svg
        className="notranslate"
        viewBox="0 0 720 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 16,
          filter: "drop-shadow(0 25px 50px rgba(8,118,80,0.18))",
        }}
      >
        {/* Card background */}
        <rect width="720" height="460" rx="16" fill="#ffffff" />
        <rect x="0.5" y="0.5" width="719" height="459" rx="15.5" stroke="#e5e7eb" strokeOpacity="0.6" />

        {/* Sidebar */}
        <rect width="140" height="460" rx="16" fill="#fafbfc" />
        <rect x="128" width="12" height="460" fill="#fafbfc" />
        <line x1="140" y1="0" x2="140" y2="460" stroke="#f3f4f6" />

        {/* Logo */}
        <text x="20" y="32" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="700" fill="#1a1a2e">Exbabel</text>

        {/* Org selector */}
        <rect x="16" y="50" width="112" height="32" rx="8" fill="#ffffff" stroke="#e5e7eb" />
        <circle cx="30" cy="66" r="8" fill="#4f46e5" />
        <text x="30" y="70" fontFamily="var(--font-sora), sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">U</text>
        <text x="44" y="70" fontFamily="var(--font-sora), sans-serif" fontSize="9" fill="#374151">UPCI</text>
        <ProductGraphicIcon name="chevron" x={112} y={60} size={10} color="#9ca3af" />

        {/* Sidebar nav items */}
        <rect x="12" y="96" width="120" height="30" rx="8" fill="#eef2ff" />
        <ProductGraphicIcon name="home" x={19} y={104} size={12} color="#4f46e5" /><text x="36" y="115" fontFamily="var(--font-sora), sans-serif" fontSize="10" fontWeight="600" fill="#4f46e5">Events Dashboard</text>

        <ProductGraphicIcon name="users" x={19} y={137} size={12} color="#6b7280" /><text x="36" y="148" fontFamily="var(--font-sora), sans-serif" fontSize="10" fill="#6b7280">Team Directory</text>

        {/* Help card */}
        <rect x="12" y="360" width="120" height="80" rx="10" fill="#ffffff" stroke="#e5e7eb" />
        <circle cx="30" cy="380" r="9" fill="#4f46e5" />
        <text x="30" y="384" fontFamily="var(--font-sora), sans-serif" fontSize="10" fill="#fff" textAnchor="middle">?</text>
        <text x="12" y="404" fontFamily="var(--font-sora), sans-serif" fontSize="9" fontWeight="600" fill="#1a1a2e">  Need help?</text>
        <text x="12" y="416" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#6b7280">  Please check our docs</text>
        <rect x="16" y="422" width="68" height="14" rx="4" fill="#f3f4f6" />
        <text x="50" y="432" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#374151" textAnchor="middle">DOCUMENTATION</text>

        {/* Top breadcrumb */}
        <text x="156" y="18" fontFamily="var(--font-sora), sans-serif" fontSize="9" fill="#6b7280">Pages / Events Dashboard</text>
        <text x="156" y="34" fontFamily="var(--font-sora), sans-serif" fontSize="12" fontWeight="600" fill="#1a1a2e">Events Dashboard</text>

        {/* User avatar */}
        <circle cx="688" cy="22" r="10" fill="#f3f4f6" />
        <ProductGraphicIcon name="user" x={682} y={16} size={12} color="#6b7280" />

        {/* Stats cards row */}
        <rect x="156" y="50" width="80" height="48" rx="8" fill="#4f46e5" />
        <text x="164" y="66" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#c7d2fe">Upcoming Events</text>
        <text x="164" y="86" fontFamily="var(--font-sora), sans-serif" fontSize="18" fontWeight="700" fill="#ffffff">2</text>
        <ProductGraphicIcon name="trend" x={196} y={77} size={10} color="#c7d2fe" />

        <rect x="244" y="50" width="68" height="48" rx="8" fill="#ffffff" stroke="#e5e7eb" />
        <text x="252" y="66" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#6b7280">Live Sessions</text>
        <text x="252" y="86" fontFamily="var(--font-sora), sans-serif" fontSize="18" fontWeight="700" fill="#1a1a2e">2</text>

        <rect x="320" y="50" width="68" height="48" rx="8" fill="#ffffff" stroke="#e5e7eb" />
        <text x="328" y="66" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#6b7280">Total Attendees</text>
        <text x="328" y="86" fontFamily="var(--font-sora), sans-serif" fontSize="16" fontWeight="700" fill="#1a1a2e">1,248</text>

        <rect x="396" y="50" width="68" height="48" rx="8" fill="#ffffff" stroke="#e5e7eb" />
        <text x="404" y="66" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#6b7280">Translation Hrs</text>
        <text x="404" y="86" fontFamily="var(--font-sora), sans-serif" fontSize="14" fontWeight="700" fill="#1a1a2e">143 hrs</text>

        <rect x="472" y="50" width="68" height="48" rx="8" fill="#ffffff" stroke="#e5e7eb" />
        <text x="480" y="66" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#6b7280">Languages</text>
        <text x="480" y="86" fontFamily="var(--font-sora), sans-serif" fontSize="18" fontWeight="700" fill="#1a1a2e">27</text>

        <rect x="548" y="50" width="68" height="48" rx="8" fill="#ffffff" stroke="#e5e7eb" />
        <text x="556" y="66" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#6b7280">AI Summaries</text>
        <text x="556" y="86" fontFamily="var(--font-sora), sans-serif" fontSize="18" fontWeight="700" fill="#1a1a2e">96</text>

        <rect x="624" y="50" width="80" height="48" rx="8" fill="#ffffff" stroke="#e5e7eb" />
        <text x="632" y="66" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#6b7280">Estimated Cost</text>
        <text x="632" y="86" fontFamily="var(--font-sora), sans-serif" fontSize="13" fontWeight="700" fill="#1a1a2e">$1,240</text>

        {/* Welcome section */}
        <rect x="156" y="110" width="240" height="180" rx="12" fill="#ffffff" stroke="#f3f4f6" />
        <text x="172" y="138" fontFamily="var(--font-sora), sans-serif" fontSize="16" fontWeight="700" fill="#1a1a2e">Welcome Back</text>
        <text x="172" y="156" fontFamily="var(--font-sora), sans-serif" fontSize="10" fill="#6b7280">Good afternoon, Joseph</text>

        <text x="172" y="184" fontFamily="var(--font-sora), sans-serif" fontSize="10" fill="#374151" fontWeight="500">You have:</text>
        <circle cx="182" cy="200" r="3" fill="#4f46e5" />
        <text x="192" y="204" fontFamily="var(--font-sora), sans-serif" fontSize="9" fill="#6b7280">2 upcoming events</text>
        <circle cx="182" cy="216" r="3" fill="#4f46e5" />
        <text x="192" y="220" fontFamily="var(--font-sora), sans-serif" fontSize="9" fill="#6b7280">0 live broadcasts</text>
        <circle cx="182" cy="232" r="3" fill="#4f46e5" />
        <text x="192" y="236" fontFamily="var(--font-sora), sans-serif" fontSize="9" fill="#6b7280">0 active rooms</text>

        <text x="172" y="260" fontFamily="var(--font-sora), sans-serif" fontSize="10" fill="#374151" fontWeight="600">Your Active Events:</text>

        {/* Event items */}
        <circle cx="182" cy="278" r="3" fill="#4f46e5" />
        <text x="192" y="276" fontFamily="var(--font-sora), sans-serif" fontSize="9" fontWeight="600" fill="#1a1a2e">Mens conference</text>
        <text x="192" y="286" fontFamily="var(--font-sora), sans-serif" fontSize="7" fill="#9ca3af">Draft</text>

        {/* Create Event card */}
        <rect x="406" y="110" width="160" height="180" rx="12" fill="url(#createEventGrad)" />
        <defs>
          <linearGradient id="createEventGrad" x1="406" y1="110" x2="566" y2="290">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#4338ca" />
          </linearGradient>
        </defs>

        <ProductGraphicIcon name="camera" x={424} y={128} size={20} color="#ffffff" />

        <text x="424" y="190" fontFamily="var(--font-sora), sans-serif" fontSize="15" fontWeight="700" fill="#ffffff">Create a new</text>
        <text x="424" y="210" fontFamily="var(--font-sora), sans-serif" fontSize="15" fontWeight="700" fill="#ffffff">Event</text>

        <text x="424" y="232" fontFamily="var(--font-sora), sans-serif" fontSize="8" fill="#c7d2fe">One-Time Event</text>
        <text x="424" y="244" fontFamily="var(--font-sora), sans-serif" fontSize="8" fill="#c7d2fe">Recurring Program</text>
        <text x="424" y="256" fontFamily="var(--font-sora), sans-serif" fontSize="8" fill="#c7d2fe">Quick Meeting</text>

        <rect x="424" y="268" width="90" height="26" rx="13" fill="#ffffff" />
        <text x="469" y="285" fontFamily="var(--font-sora), sans-serif" fontSize="9" fontWeight="600" fill="#4f46e5" textAnchor="middle">Create Event</text>

        {/* Organizations card */}
        <rect x="580" y="110" width="124" height="180" rx="12" fill="#ffffff" stroke="#f3f4f6" />
        <text x="596" y="138" fontFamily="var(--font-sora), sans-serif" fontSize="12" fontWeight="700" fill="#1a1a2e">Organizations</text>
        <text x="596" y="154" fontFamily="var(--font-sora), sans-serif" fontSize="8" fill="#6b7280">Manage your churches,</text>
        <text x="596" y="166" fontFamily="var(--font-sora), sans-serif" fontSize="8" fill="#6b7280">companies, universities,</text>
        <text x="596" y="178" fontFamily="var(--font-sora), sans-serif" fontSize="8" fill="#6b7280">or conferences.</text>

        {/* People icons */}
        <rect x="596" y="190" width="92" height="48" rx="6" fill="#f8fafc" />
        <circle cx="616" cy="206" r="8" fill="#e2e8f0" />
        <circle cx="636" cy="206" r="8" fill="#dbeafe" />
        <circle cx="656" cy="206" r="8" fill="#fce7f3" />
        <circle cx="676" cy="206" r="8" fill="#d1fae5" />
        <circle cx="616" cy="226" r="8" fill="#fef3c7" />
        <circle cx="636" cy="226" r="8" fill="#e0e7ff" />

        <text x="596" y="264" fontFamily="var(--font-sora), sans-serif" fontSize="10" fontWeight="600" fill="#1a1a2e">8 Organizations</text>
        <ProductGraphicIcon name="arrow" x={650} y={271} size={12} color="#ef4444" /><text x="596" y="280" fontFamily="var(--font-sora), sans-serif" fontSize="9" fontWeight="500" fill="#ef4444">Manage</text>
      </svg>
    </div>
  );
}
