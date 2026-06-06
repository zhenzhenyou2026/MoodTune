import type { CSSProperties } from 'react'

interface PreviewDecorationProps {
  tone: string
}

function PreviewDecoration({ tone }: PreviewDecorationProps) {
  return (
    <svg
      className="preview-decoration"
      viewBox="0 0 180 180"
      aria-hidden="true"
      focusable="false"
      style={{ '--decoration-tone': tone } as CSSProperties}
    >
      <path
        className="preview-decoration__wash"
        d="M28 112c18-44 61-72 108-55 24 9 38 34 23 58-23 37-91 47-129 23-12-8-14-18-2-26Z"
      />
      <path
        className="preview-decoration__line"
        d="M22 118c34-22 52-20 80-9 23 9 46 8 64-16"
      />
      <path
        className="preview-decoration__line soft"
        d="M28 94c28-17 51-14 73-3 26 13 48 8 66-12"
      />
      <path
        className="preview-decoration__line fine"
        d="M46 137c24 7 51 5 78-7"
      />
      <g className="preview-decoration__tracks">
        <circle cx="88" cy="86" r="42" />
        <circle cx="88" cy="86" r="29" />
        <circle cx="88" cy="86" r="14" />
      </g>
      <g className="preview-decoration__stars">
        <path d="M139 31l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
        <path d="M43 41l1.6 3.6 3.7 1.5-3.7 1.4-1.6 3.7-1.5-3.7-3.7-1.4 3.7-1.5Z" />
        <circle cx="151" cy="130" r="3" />
        <circle cx="36" cy="151" r="2.5" />
      </g>
    </svg>
  )
}

export default PreviewDecoration
