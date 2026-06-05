function DecorativeMusicGlyph() {
  return (
    <svg
      className="music-glyph"
      viewBox="0 0 120 120"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="glyphGlow" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#fff7ea" />
          <stop offset="54%" stopColor="#ffd88a" />
          <stop offset="100%" stopColor="#f4a7b9" />
        </radialGradient>
        <linearGradient id="glyphStroke" x1="24" x2="96" y1="18" y2="102">
          <stop offset="0%" stopColor="#6d4d72" />
          <stop offset="50%" stopColor="#9b617f" />
          <stop offset="100%" stopColor="#2d2433" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="50" fill="url(#glyphGlow)" opacity="0.96" />
      <circle cx="60" cy="60" r="36" fill="none" stroke="#fff7ea" strokeOpacity="0.48" />
      <circle cx="60" cy="60" r="18" fill="#fffaf1" opacity="0.42" />
      <path
        d="M50 72V38l29-7v34"
        fill="none"
        stroke="url(#glyphStroke)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />
      <path
        d="M50 44c10 2 19 0 29-4"
        fill="none"
        stroke="#fff7ea"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.58"
      />
      <ellipse cx="42" cy="76" rx="11" ry="8" fill="#2d2433" opacity="0.86" />
      <ellipse cx="71" cy="68" rx="11" ry="8" fill="#2d2433" opacity="0.86" />
      <circle cx="34" cy="34" r="3" fill="#fff7ea" />
      <circle cx="88" cy="47" r="2.4" fill="#fff7ea" opacity="0.82" />
      <path
        d="M35 99c18 8 43 8 63-7"
        fill="none"
        stroke="#fff7ea"
        strokeLinecap="round"
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  )
}

export default DecorativeMusicGlyph
