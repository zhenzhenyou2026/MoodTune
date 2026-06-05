import { Music2, Volume2, VolumeX } from 'lucide-react'

interface MusicToggleProps {
  isActive: boolean
  onToggle: () => void
}

function MusicToggle({ isActive, onToggle }: MusicToggleProps) {
  return (
    <button
      className={`music-toggle ${isActive ? 'is-on' : ''}`}
      type="button"
      aria-label={isActive ? '暂停背景音乐' : '播放背景音乐'}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onToggle}
    >
      <span className="music-toggle__orb" aria-hidden="true">
        <Music2 size={15} />
      </span>
      <span>{isActive ? '轻音乐播放中' : '开启轻音乐'}</span>
      {isActive ? <Volume2 size={17} /> : <VolumeX size={17} />}
    </button>
  )
}

export default MusicToggle
