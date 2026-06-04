interface RangeControlProps {
  label: string
  maxLabel: string
  minLabel: string
  value: number
  onChange: (value: number) => void
}

function RangeControl({ label, maxLabel, minLabel, value, onChange }: RangeControlProps) {
  return (
    <label className="range-control">
      <span className="field-heading">
        {label}
        <strong>{value}</strong>
      </span>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="range-scale">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </span>
    </label>
  )
}

export default RangeControl
