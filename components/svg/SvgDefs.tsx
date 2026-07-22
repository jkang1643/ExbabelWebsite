{/*
  Shared SVG Definitions — Exbabel Design System
  Colors: Primary #394DFE, Aurora Pink #FFD6E5, Aurora Purple #EAD6FF,
          Aurora Mint #D6F5FF, Aurora Yellow #FFF7D1,
          Ink #0B1220, Muted #667085, Paper #F8F9FA, White #FFFFFF
*/}
export default function SvgDefs() {
  return (
    <defs>
      {/* ─── Brand Gradients ─── */}
      <linearGradient id="grad-brand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#394DFE" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      <linearGradient id="grad-brand-h" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#394DFE" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>

      {/* ─── Aurora Gradients ─── */}
      <linearGradient id="grad-aurora-pink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD6E5" />
        <stop offset="100%" stopColor="#EAD6FF" />
      </linearGradient>
      <linearGradient id="grad-aurora-purple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EAD6FF" />
        <stop offset="100%" stopColor="#D6F5FF" />
      </linearGradient>
      <linearGradient id="grad-aurora-mint" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D6F5FF" />
        <stop offset="100%" stopColor="#EAD6FF" />
      </linearGradient>
      <linearGradient id="grad-aurora-warm" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD6E5" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#EAD6FF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#D6F5FF" stopOpacity="0.2" />
      </linearGradient>

      {/* ─── Connection / Flow Gradients ─── */}
      <linearGradient id="grad-flow-h" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#394DFE" stopOpacity="0" />
        <stop offset="20%" stopColor="#394DFE" stopOpacity="0.5" />
        <stop offset="80%" stopColor="#6366F1" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="grad-flow-v" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#394DFE" stopOpacity="0" />
        <stop offset="20%" stopColor="#394DFE" stopOpacity="0.4" />
        <stop offset="80%" stopColor="#EAD6FF" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#EAD6FF" stopOpacity="0" />
      </linearGradient>

      {/* ─── Glass Surface ─── */}
      <linearGradient id="grad-glass-dark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.04" />
      </linearGradient>
      <linearGradient id="grad-glass-light" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
        <stop offset="100%" stopColor="#F8F9FA" stopOpacity="0.80" />
      </linearGradient>
      <linearGradient id="grad-surface" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F8F9FA" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>

      {/* ─── Radial Glows (Aurora light bleed) ─── */}
      <radialGradient id="grad-glow-brand" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#394DFE" stopOpacity="0.25" />
        <stop offset="60%" stopColor="#394DFE" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#394DFE" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="grad-glow-pink" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD6E5" stopOpacity="0.35" />
        <stop offset="60%" stopColor="#FFD6E5" stopOpacity="0.10" />
        <stop offset="100%" stopColor="#FFD6E5" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="grad-glow-purple" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EAD6FF" stopOpacity="0.30" />
        <stop offset="60%" stopColor="#EAD6FF" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#EAD6FF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="grad-glow-mint" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D6F5FF" stopOpacity="0.30" />
        <stop offset="60%" stopColor="#D6F5FF" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#D6F5FF" stopOpacity="0" />
      </radialGradient>

      {/* ─── Filters ─── */}
      <filter id="glow-sm" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-md" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-lg" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="16" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Aurora-tinted drop shadows */}
      <filter id="shadow-card" x="-15%" y="-10%" width="130%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="16" floodColor="#EAD6FF" floodOpacity="0.22" />
        <feDropShadow dx="0" dy="15" stdDeviation="55" floodColor="#D6F5FF" floodOpacity="0.18" />
      </filter>
      <filter id="shadow-sm" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#0B1220" floodOpacity="0.08" />
      </filter>
      <filter id="shadow-md" x="-10%" y="-10%" width="120%" height="140%">
        <feDropShadow dx="0" dy="5" stdDeviation="15" floodColor="#0B1220" floodOpacity="0.10" />
      </filter>

      {/* Soft ambient blur for background elements */}
      <filter id="blur-ambient" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="40" />
      </filter>
    </defs>
  );
}
