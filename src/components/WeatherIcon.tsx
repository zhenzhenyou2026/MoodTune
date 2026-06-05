import type { Weather } from '../types/mood'

interface WeatherIconProps {
  weather: Weather
}

function WeatherIcon({ weather }: WeatherIconProps) {
  if (weather === '晴天') {
    return (
      <svg className="weather-icon" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
        <circle cx="22" cy="22" r="9" fill="#ffd88a" />
        <g stroke="#ffb35f" strokeLinecap="round" strokeWidth="3">
          <path d="M22 5v5" />
          <path d="M22 34v5" />
          <path d="M5 22h5" />
          <path d="M34 22h5" />
          <path d="m10 10 4 4" />
          <path d="m30 30 4 4" />
          <path d="m34 10-4 4" />
          <path d="m14 30-4 4" />
        </g>
        <circle cx="28" cy="16" r="3" fill="#fff7ea" opacity="0.86" />
      </svg>
    )
  }

  if (weather === '阴天') {
    return (
      <svg className="weather-icon" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
        <circle cx="15" cy="18" r="9" fill="#dfe8ee" />
        <circle cx="25" cy="15" r="10" fill="#c9dbe3" />
        <path
          d="M12 30h21a7 7 0 0 0 0-14 12 12 0 0 0-22-1A8 8 0 0 0 12 30Z"
          fill="#f8fbf8"
          opacity="0.94"
        />
        <path d="M13 30h21" stroke="#8fa8b7" strokeLinecap="round" strokeWidth="2" />
      </svg>
    )
  }

  if (weather === '雨天') {
    return (
      <svg className="weather-icon" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
        <path
          d="M12 24h21a7 7 0 0 0 0-14 12 12 0 0 0-22-1A8 8 0 0 0 12 24Z"
          fill="#dfe8f7"
        />
        <g stroke="#77a6cf" strokeLinecap="round" strokeWidth="3">
          <path d="m15 30-3 5" />
          <path d="m24 30-3 5" />
          <path d="m33 30-3 5" />
        </g>
        <circle cx="30" cy="12" r="3" fill="#b8a7ff" opacity="0.72" />
      </svg>
    )
  }

  return (
    <svg className="weather-icon" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <path
        d="M27 8a15 15 0 1 0 8 26 14 14 0 0 1-8-26Z"
        fill="#dcd9ff"
        opacity="0.96"
      />
      <path d="M30 12a13 13 0 0 0 7 22" fill="none" stroke="#8d85cf" strokeWidth="2" />
      <circle cx="15" cy="13" r="2.4" fill="#ffd88a" />
      <circle cx="34" cy="8" r="2" fill="#fff7ea" />
      <circle cx="36" cy="28" r="1.8" fill="#fff7ea" opacity="0.88" />
    </svg>
  )
}

export default WeatherIcon
