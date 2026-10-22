/** Elemental mark for Flow of the Elements. */
export function FlowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="14" fill="#1a2430" />
      <rect
        x="7"
        y="7"
        width="50"
        height="50"
        rx="10"
        fill="#f3ebe0"
        stroke="#5c4030"
        strokeWidth="2"
      />
      {/* Water */}
      <path
        d="M22 34c0-5 4-10 4-10s4 5 4 10a4 4 0 1 1-8 0z"
        fill="#3a7ca5"
      />
      {/* Fire */}
      <path
        d="M38 22c2 4 1 7-1 9 4-1 7-5 5-10-1 2-2 2-4 1z"
        fill="#c45c26"
      />
      {/* Earth */}
      <rect x="34" y="36" width="12" height="8" rx="1.5" fill="#6b8f3c" />
      {/* Air */}
      <path
        d="M18 20h14M16 24h18"
        stroke="#7a9eb8"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
