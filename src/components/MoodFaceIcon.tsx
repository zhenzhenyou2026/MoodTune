import type { MusicKey } from '../data/moodThemes'

interface MoodFaceIconProps {
  iconKey: MusicKey
}

const faceColors: Record<MusicKey, { cheek: string; fill: string; line: string; spark: string }> = {
  home: { cheek: '#f4a7b9', fill: '#fff3d8', line: '#6f4d56', spark: '#ffd88a' },
  happy: { cheek: '#ff9f7a', fill: '#fff0b8', line: '#7a4a32', spark: '#ffd88a' },
  calm: { cheek: '#a8d8c1', fill: '#f4ffe8', line: '#42685f', spark: '#dfe8cc' },
  anxious: { cheek: '#b9ccc8', fill: '#f4f1e7', line: '#526966', spark: '#d6cfdd' },
  tired: { cheek: '#c9ada7', fill: '#fff4e8', line: '#735b59', spark: '#f2e9e4' },
  sad: { cheek: '#aeb7dd', fill: '#eef3ff', line: '#56648d', spark: '#d8bfd0' },
  hopeful: { cheek: '#ff9fba', fill: '#fff0f7', line: '#734d93', spark: '#c8b6ff' },
}

function mouthPath(iconKey: MusicKey) {
  if (iconKey === 'happy') {
    return 'M17 25c3 4 9 4 12 0'
  }
  if (iconKey === 'calm') {
    return 'M18 25c2.5 2 6.5 2 9 0'
  }
  if (iconKey === 'anxious') {
    return 'M18 27c3-1.5 6-1.5 9 0'
  }
  if (iconKey === 'tired') {
    return 'M18 27c2.5 1.8 6.5 1.8 9 0'
  }
  if (iconKey === 'sad') {
    return 'M18 29c3-3 6-3 9 0'
  }
  if (iconKey === 'hopeful') {
    return 'M17 25c3.5 3.5 8.5 3.5 12 0'
  }
  return 'M18 25c2.5 2.5 6.5 2.5 9 0'
}

function MoodFaceIcon({ iconKey }: MoodFaceIconProps) {
  const colors = faceColors[iconKey]
  const sleepy = iconKey === 'tired'
  const closed = iconKey === 'calm' || iconKey === 'tired'
  const worried = iconKey === 'anxious'
  const sad = iconKey === 'sad'
  const hopeful = iconKey === 'hopeful'

  return (
    <svg className="mood-face" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <circle cx="22" cy="22" r="18" fill={colors.fill} />
      <circle cx="15" cy="28" r="3.2" fill={colors.cheek} opacity="0.38" />
      <circle cx="30" cy="28" r="3.2" fill={colors.cheek} opacity="0.38" />

      {closed ? (
        <g fill="none" stroke={colors.line} strokeLinecap="round" strokeWidth="2.2">
          <path d="M13 19c2 1.5 4 1.5 6 0" />
          <path d="M26 19c2 1.5 4 1.5 6 0" />
        </g>
      ) : (
        <g fill={colors.line}>
          <circle cx="16.5" cy="19" r={hopeful ? 2.6 : 2.1} />
          <circle cx="29" cy="19" r={hopeful ? 2.6 : 2.1} />
        </g>
      )}

      {worried && (
        <g fill="none" stroke={colors.line} strokeLinecap="round" strokeWidth="1.8" opacity="0.75">
          <path d="M12 15c2-1.4 4-1.2 6 .4" />
          <path d="M26 15.4c2-1.6 4-1.8 6-.4" />
        </g>
      )}

      <path
        d={mouthPath(iconKey)}
        fill="none"
        stroke={colors.line}
        strokeLinecap="round"
        strokeWidth="2.3"
      />

      {sad && (
        <path
          d="M32 23c1.6 2 1.6 3.5 0 5"
          fill="none"
          stroke="#7fa0cf"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      )}

      {sleepy && (
        <text x="30" y="13" fill={colors.line} fontSize="7" fontWeight="700">
          z
        </text>
      )}

      <path
        d={hopeful ? 'M34 10l1.4 3 3 .9-3 1.1-1.4 3-1.2-3-3.2-1.1 3.2-.9Z' : 'M34 9l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1Z'}
        fill={colors.spark}
        opacity="0.88"
      />
      <circle cx="11" cy="11" r="2" fill={colors.spark} opacity="0.62" />
    </svg>
  )
}

export default MoodFaceIcon
