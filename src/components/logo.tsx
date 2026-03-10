/** Inline SVG logo — leaf mark + wordmark */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Two Brother's Property Management"
      role="img"
    >
      {/* Leaf mark */}
      <path
        d="M8 38 C8 18 24 6 24 6 C24 6 16 20 20 32 C22 28 24 22 24 16 C28 24 30 34 24 42 C18 48 8 44 8 38Z"
        fill="currentColor"
      />
      {/* TB monogram inside leaf */}
      <text
        x="17.5"
        y="35"
        textAnchor="middle"
        fontSize="11"
        fontWeight="bold"
        fontFamily="Georgia, serif"
        fill="#FAFAF5"
      >
        TB
      </text>
      {/* Wordmark */}
      <text
        x="42"
        y="20"
        fontSize="14"
        fontWeight="bold"
        fontFamily="Georgia, 'DM Serif Display', serif"
        fill="currentColor"
      >
        Two Brother&apos;s
      </text>
      <text
        x="42"
        y="36"
        fontSize="9.5"
        fontFamily="'DM Sans', sans-serif"
        letterSpacing="0.5"
        fill="currentColor"
        opacity="0.7"
      >
        Property Management
      </text>
    </svg>
  );
}
