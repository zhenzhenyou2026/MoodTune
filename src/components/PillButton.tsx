import type { ReactNode } from 'react'

interface PillButtonProps {
  active: boolean
  label: string
  icon?: ReactNode
  onClick: () => void
}

function PillButton({ active, label, icon, onClick }: PillButtonProps) {
  return (
    <button
      type="button"
      className={`pill-button ${active ? 'is-active' : ''}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default PillButton
