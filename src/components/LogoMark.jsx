// Brand mark: a washer drum with a snowflake inside (AC + washing machine).
// Keep in sync with public/favicon.svg.
function LogoMark({ size = 40, className = '' }) {
  return (
    <svg className={`logo-mark ${className}`} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="logo-mark-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f80ff" />
          <stop offset="1" stopColor="#5b21b6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logo-mark-g)" />
      <circle cx="14.5" cy="13.5" r="4" fill="#ff7a00" />
      <rect x="24" y="11.5" width="26" height="4" rx="2" fill="#fff" opacity=".55" />
      <circle cx="32" cy="37" r="17" fill="none" stroke="#fff" strokeWidth="5" />
      <g className="logo-mark-flake" stroke="#fff" strokeWidth="3.6" strokeLinecap="round">
        <path d="M32 28v18M24.2 32.5l15.6 9M24.2 41.5l15.6-9" />
      </g>
    </svg>
  )
}

export default LogoMark
