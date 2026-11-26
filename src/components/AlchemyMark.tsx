export function AlchemyMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.7" aria-hidden="true">
      <path d="M32 4C24 13 19 23 19 33a13 13 0 0 0 26 0C45 23 40 13 32 4Z" />
      <path d="M32 4C24 13 19 23 19 33a13 13 0 0 0 26 0C45 23 40 13 32 4Z" transform="rotate(120 32 35)" />
      <path d="M32 4C24 13 19 23 19 33a13 13 0 0 0 26 0C45 23 40 13 32 4Z" transform="rotate(240 32 35)" />
      <path d="M32 15v8m-4-4h8m-4 10v9m-4.5-4.5h9" />
    </svg>
  )
}
