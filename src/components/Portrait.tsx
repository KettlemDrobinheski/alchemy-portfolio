export function Portrait({ src }: { src: string }) {
  return (
    <div className="portrait">
      <svg className="portrait-circle" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <circle cx="200" cy="200" r="183" />
        <circle cx="200" cy="200" r="173" strokeDasharray="1 6" />
        <circle cx="200" cy="200" r="151" opacity=".65" />
        <path d="M200 49 331 276H69L200 49ZM200 351 69 124H331L200 351Z" opacity=".45" />
        <path d="M200 8l5 9-5 9-5-9ZM200 374l5 9-5 9-5-9ZM8 200l9-5 9 5-9 5ZM374 200l9-5 9 5-9 5Z" fill="currentColor" />
        <g strokeWidth="1.35" strokeLinejoin="round" strokeLinecap="round">
          <path transform="translate(85 85)" d="M0-7 7 6H-7Z" />
          <path transform="translate(315 85)" d="M-7-6H7L0 7Z" />
          <path transform="translate(315 315)" d="M0-7 7 6H-7ZM-4 1H4" />
          <path transform="translate(85 315)" d="M-7-6H7L0 7ZM-4-1H4" />
        </g>
        <g className="portrait-circle-lights">
          <path transform="translate(36 200)" d="M0-7 1.6-1.6 5 0 1.6 1.6 0 7-1.6 1.6-5 0-1.6-1.6Z" />
          <path transform="translate(364 200)" d="M0-7 1.6-1.6 5 0 1.6 1.6 0 7-1.6 1.6-5 0-1.6-1.6Z" />
        </g>
      </svg>
      <img
        className="portrait-image"
        src={src}
        alt="Retrato de Kettlem Drobinheski"
        width={1214}
        height={1295}
      />
    </div>
  )
}
