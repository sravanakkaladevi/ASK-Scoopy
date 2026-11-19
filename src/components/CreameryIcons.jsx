export const ScoopBlueberry = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sb-grad" cx="38%" cy="32%" r="62%">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="25%" stopColor="#8B5CF6" />
        <stop offset="65%" stopColor="#6D28D9" />
        <stop offset="100%" stopColor="#431407" />
      </radialGradient>
      <filter id="sb-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Base scoop sphere */}
    <circle cx="50" cy="50" r="42" fill="url(#sb-grad)" filter="url(#sb-shadow)" />
    {/* Ruffled scoop skirts at bottom */}
    <path
      d="M18 64c3-4 8-2 12 1 4 3 8 2 11-1 4-4 9-3 13 0 4 3 9 2 13-1 4-3 9-1 13 2 4 4 1 8-2 10-12 8-46 9-60-1-3-2-2-7 0-10z"
      fill="#5B21B6"
      opacity="0.95"
    />
    {/* Blueberry bits & texture flecks */}
    <circle cx="36" cy="38" r="3" fill="#3B0764" />
    <circle cx="56" cy="34" r="3.5" fill="#2E1065" />
    <circle cx="68" cy="52" r="3" fill="#3B0764" />
    <circle cx="44" cy="58" r="2.5" fill="#1E1B4B" />
    <circle cx="30" cy="52" r="2" fill="#2E1065" />
    {/* Specular gloss highlight */}
    <ellipse cx="38" cy="30" rx="14" ry="8" transform="rotate(-20 38 30)" fill="#EDE9FE" opacity="0.45" />
    <circle cx="34" cy="26" r="3.5" fill="#FFFFFF" opacity="0.75" />
  </svg>
)

export const ScoopMango = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sm-grad" cx="38%" cy="32%" r="62%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="25%" stopColor="#FBBF24" />
        <stop offset="65%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#C2410C" />
      </radialGradient>
      <filter id="sm-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="42" fill="url(#sm-grad)" filter="url(#sm-shadow)" />
    <path
      d="M18 64c3-4 8-2 12 1 4 3 8 2 11-1 4-4 9-3 13 0 4 3 9 2 13-1 4-3 9-1 13 2 4 4 1 8-2 10-12 8-46 9-60-1-3-2-2-7 0-10z"
      fill="#EA580C"
      opacity="0.95"
    />
    <circle cx="42" cy="44" r="2.5" fill="#9A3412" opacity="0.6" />
    <circle cx="62" cy="40" r="2.5" fill="#9A3412" opacity="0.6" />
    <ellipse cx="38" cy="30" rx="14" ry="8" transform="rotate(-20 38 30)" fill="#FEF9C3" opacity="0.5" />
    <circle cx="34" cy="26" r="3.5" fill="#FFFFFF" opacity="0.8" />
  </svg>
)

export const ScoopStrawberry = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ss-grad" cx="38%" cy="32%" r="62%">
        <stop offset="0%" stopColor="#FECDD3" />
        <stop offset="25%" stopColor="#FB7185" />
        <stop offset="65%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#881337" />
      </radialGradient>
      <filter id="ss-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="42" fill="url(#ss-grad)" filter="url(#ss-shadow)" />
    <path
      d="M18 64c3-4 8-2 12 1 4 3 8 2 11-1 4-4 9-3 13 0 4 3 9 2 13-1 4-3 9-1 13 2 4 4 1 8-2 10-12 8-46 9-60-1-3-2-2-7 0-10z"
      fill="#BE123C"
      opacity="0.95"
    />
    {/* Strawberry seed flecks */}
    <circle cx="35" cy="42" r="2" fill="#881337" />
    <circle cx="52" cy="36" r="2.5" fill="#881337" />
    <circle cx="65" cy="48" r="2" fill="#881337" />
    <circle cx="46" cy="56" r="2" fill="#881337" />
    <ellipse cx="38" cy="30" rx="14" ry="8" transform="rotate(-20 38 30)" fill="#FFF1F2" opacity="0.45" />
    <circle cx="34" cy="26" r="3.5" fill="#FFFFFF" opacity="0.75" />
  </svg>
)

export const ScoopPistachio = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sp-grad" cx="38%" cy="32%" r="62%">
        <stop offset="0%" stopColor="#ECFCCB" />
        <stop offset="25%" stopColor="#A3E635" />
        <stop offset="65%" stopColor="#65A30D" />
        <stop offset="100%" stopColor="#365314" />
      </radialGradient>
      <filter id="sp-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="42" fill="url(#sp-grad)" filter="url(#sp-shadow)" />
    <path
      d="M18 64c3-4 8-2 12 1 4 3 8 2 11-1 4-4 9-3 13 0 4 3 9 2 13-1 4-3 9-1 13 2 4 4 1 8-2 10-12 8-46 9-60-1-3-2-2-7 0-10z"
      fill="#4D7C0F"
      opacity="0.95"
    />
    {/* Crushed pistachio bits */}
    <rect x="36" y="38" width="4" height="3" rx="1" fill="#14532D" transform="rotate(25 38 39)" />
    <rect x="58" y="32" width="4" height="3" rx="1" fill="#365314" transform="rotate(-15 60 33)" />
    <rect x="64" y="52" width="3" height="4" rx="1" fill="#14532D" transform="rotate(40 65 54)" />
    <ellipse cx="38" cy="30" rx="14" ry="8" transform="rotate(-20 38 30)" fill="#F7FEE7" opacity="0.45" />
    <circle cx="34" cy="26" r="3.5" fill="#FFFFFF" opacity="0.75" />
  </svg>
)

export const ScoopChoco = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sc-grad" cx="38%" cy="32%" r="62%">
        <stop offset="0%" stopColor="#A87355" />
        <stop offset="25%" stopColor="#6C412C" />
        <stop offset="65%" stopColor="#452316" />
        <stop offset="100%" stopColor="#1E0D07" />
      </radialGradient>
      <filter id="sc-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="42" fill="url(#sc-grad)" filter="url(#sc-shadow)" />
    <path
      d="M18 64c3-4 8-2 12 1 4 3 8 2 11-1 4-4 9-3 13 0 4 3 9 2 13-1 4-3 9-1 13 2 4 4 1 8-2 10-12 8-46 9-60-1-3-2-2-7 0-10z"
      fill="#2A140C"
      opacity="0.95"
    />
    {/* Dark fudge ribbons */}
    <path d="M30 44c6-4 16-2 22 2s14 1 20-3" stroke="#1A0A05" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="38" cy="30" rx="14" ry="8" transform="rotate(-20 38 30)" fill="#D7B9A5" opacity="0.35" />
    <circle cx="34" cy="26" r="3" fill="#FFFFFF" opacity="0.65" />
  </svg>
)

export const ScoopCoconut = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="scc-grad" cx="38%" cy="32%" r="62%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#F5F5F4" />
        <stop offset="70%" stopColor="#D6D3D1" />
        <stop offset="100%" stopColor="#A8A29E" />
      </radialGradient>
      <filter id="scc-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="42" fill="url(#scc-grad)" filter="url(#scc-shadow)" />
    <path
      d="M18 64c3-4 8-2 12 1 4 3 8 2 11-1 4-4 9-3 13 0 4 3 9 2 13-1 4-3 9-1 13 2 4 4 1 8-2 10-12 8-46 9-60-1-3-2-2-7 0-10z"
      fill="#A8A29E"
      opacity="0.95"
    />
    {/* Coconut shreds */}
    <path d="M35 38c3-1 6 2 9 0" stroke="#E7E5E4" strokeWidth="2" strokeLinecap="round" />
    <path d="M58 45c4 2 8 0 11 1" stroke="#E7E5E4" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="38" cy="30" rx="14" ry="8" transform="rotate(-20 38 30)" fill="#FFFFFF" opacity="0.8" />
    <circle cx="34" cy="26" r="4" fill="#FFFFFF" />
  </svg>
)

export const IconWaffleCone = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="waffle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="40%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
      <filter id="waffle-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    {/* Pointed Cone */}
    <polygon points="26,14 74,14 50,90" fill="url(#waffle-grad)" filter="url(#waffle-shadow)" />
    {/* Waffle Rim */}
    <ellipse cx="50" cy="14" rx="24" ry="5" fill="#FDE68A" />
    {/* Crosshatch Waffle Lattice Lines */}
    <line x1="32" y1="26" x2="62" y2="52" stroke="#92400E" strokeWidth="2" opacity="0.6" />
    <line x1="38" y1="42" x2="56" y2="70" stroke="#92400E" strokeWidth="2" opacity="0.6" />
    <line x1="68" y1="26" x2="38" y2="52" stroke="#92400E" strokeWidth="2" opacity="0.6" />
    <line x1="62" y1="42" x2="44" y2="70" stroke="#92400E" strokeWidth="2" opacity="0.6" />
    <line x1="42" y1="18" x2="58" y2="18" stroke="#FDE68A" strokeWidth="2" opacity="0.8" />
  </svg>
)

export const IconChocoCone = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chocowaffle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
    </defs>
    {/* Waffle base */}
    <polygon points="26,14 74,14 50,90" fill="url(#chocowaffle-grad)" />
    <line x1="32" y1="36" x2="58" y2="60" stroke="#92400E" strokeWidth="2" opacity="0.6" />
    <line x1="68" y1="36" x2="42" y2="60" stroke="#92400E" strokeWidth="2" opacity="0.6" />
    {/* Thick Dark Chocolate Dip at Top */}
    <path
      d="M26 14 C32 10, 68 10, 74 14 C75 24, 70 32, 65 30 C60 28, 57 36, 51 34 C45 32, 42 38, 36 33 C30 28, 25 24, 26 14 Z"
      fill="#27130A"
    />
    <ellipse cx="50" cy="14" rx="24" ry="5" fill="#451E10" />
    {/* Crunchy nut crumbs on chocolate */}
    <circle cx="36" cy="22" r="2" fill="#FDE68A" />
    <circle cx="48" cy="26" r="2.2" fill="#FDE68A" />
    <circle cx="62" cy="22" r="2" fill="#FDE68A" />
    <circle cx="56" cy="18" r="1.8" fill="#FDE68A" />
    <circle cx="42" cy="16" r="1.8" fill="#FDE68A" />
    <circle cx="66" cy="28" r="1.6" fill="#FDE68A" />
  </svg>
)

export const IconEcoCup = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cup-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="60%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    {/* Scoops inside cup */}
    <circle cx="40" cy="36" r="18" fill="#FBBF24" />
    <circle cx="60" cy="36" r="18" fill="#F43F5E" />
    <circle cx="50" cy="28" r="16" fill="#F5F5F4" />
    {/* Wooden Spoon */}
    <path d="M64 12 L72 38 L68 40 L60 14 Z" fill="#D97706" />
    {/* Blue Cup */}
    <polygon points="20,44 80,44 72,88 28,88" fill="url(#cup-grad)" />
    <ellipse cx="50" cy="44" rx="30" ry="6" fill="#BFDBFE" />
    <ellipse cx="50" cy="88" rx="22" ry="4" fill="#1E40AF" />
    <text x="50" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" letterSpacing="0.8">
      SCOOPY
    </text>
  </svg>
)

export const IconBriocheBun = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="brioche-grad" cx="45%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="25%" stopColor="#F59E0B" />
        <stop offset="70%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#78350F" />
      </radialGradient>
    </defs>
    {/* Golden baked round bun */}
    <ellipse cx="50" cy="52" rx="42" ry="34" fill="url(#brioche-grad)" />
    {/* French brioche fluted brioche top knot */}
    <ellipse cx="50" cy="34" rx="20" ry="15" fill="#D97706" />
    <ellipse cx="50" cy="30" rx="14" ry="10" fill="#FBBF24" />
    {/* Egg wash gloss highlights */}
    <ellipse cx="38" cy="38" rx="12" ry="6" transform="rotate(-15 38 38)" fill="#FEF3C7" opacity="0.6" />
    <ellipse cx="62" cy="44" rx="10" ry="5" transform="rotate(20 62 44)" fill="#FEF3C7" opacity="0.4" />
  </svg>
)

export const IconHotFudge = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ramekin bowl */}
    <ellipse cx="50" cy="40" rx="42" ry="16" fill="#3D2214" />
    <polygon points="8,40 92,40 80,78 20,78" fill="#1C1816" />
    <ellipse cx="50" cy="78" rx="30" ry="8" fill="#0C0A09" />
    {/* Molten chocolate inside */}
    <ellipse cx="50" cy="40" rx="38" ry="13" fill="#2E160C" />
    <ellipse cx="44" cy="38" rx="20" ry="6" fill="#4A2515" />
    <ellipse cx="40" cy="36" rx="10" ry="3" fill="#854D27" opacity="0.8" />
  </svg>
)

export const IconSundaeBowl = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stemmed glass */}
    <ellipse cx="50" cy="88" rx="22" ry="6" fill="#E2E8F0" opacity="0.8" />
    <rect x="47" y="68" width="6" height="20" fill="#E2E8F0" opacity="0.7" />
    <polygon points="22,46 78,46 64,68 36,68" fill="#CBD5E1" opacity="0.5" />
    <ellipse cx="50" cy="46" rx="28" ry="8" fill="#E2E8F0" opacity="0.6" />
    {/* Scoops */}
    <circle cx="40" cy="40" r="14" fill="#8B5CF6" />
    <circle cx="60" cy="40" r="14" fill="#F59E0B" />
    <circle cx="50" cy="30" r="15" fill="#F43F5E" />
    {/* Whipped cream & cherry */}
    <ellipse cx="50" cy="22" rx="10" ry="7" fill="#FFFFFF" />
    <circle cx="50" cy="14" r="5" fill="#DC2626" />
    <path d="M51 10 Q58 2 64 6" stroke="#991B1B" strokeWidth="1.5" fill="none" />
  </svg>
)
