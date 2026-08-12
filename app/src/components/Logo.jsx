/* ZOTO logo — teal mark carrying the flight-arc motif from the boarding pass. */
export function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#14554B" />
      <path d="M7 21.5 Q16 8.5 25 21.5" fill="none" stroke="#E8850C" strokeWidth="2.2" strokeDasharray="3.2 3.2" strokeLinecap="round" />
      <circle cx="7" cy="21.5" r="1.9" fill="#F6EDDE" />
      <circle cx="25" cy="21.5" r="2.8" fill="#E8850C" />
    </svg>
  );
}

export default function Logo({ size = 30 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <LogoMark size={size} />
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 640, fontSize: '1.4rem', letterSpacing: '.02em', color: 'var(--ink)' }}>
        ZOTO<span style={{ color: 'var(--saffron)' }}>.</span>
      </span>
    </span>
  );
}
