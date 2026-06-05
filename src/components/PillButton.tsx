import type { ReactNode } from 'react'

interface PillButtonProps {
  active: boolean
  label: string
  icon?: ReactNode
  onClick: () => void
  tone?: string
}

function PillButton({ active, label, icon, onClick, tone = 'neutral' }: PillButtonProps) {
  return (
    <button
      type="button"
      className={`pill-button tone-${tone} ${active ? 'is-active' : ''}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default PillButton
