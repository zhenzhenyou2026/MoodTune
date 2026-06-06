import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import type { AudioState } from '../utils/audio'

interface MusicPlayerBadgeProps {
  audioState: AudioState
  onToggle: () => void
}

function MusicPlayerBadge({ audioState, onToggle }: MusicPlayerBadgeProps) {
  const { currentTrack, isMissing, isPlaying, message, status } = audioState
  const buttonLabel = isPlaying ? '暂停氛围音乐' : '播放氛围音乐'

  return (
    <div
      className={`music-player-badge ${isPlaying ? 'is-on' : ''} ${isMissing ? 'is-missing' : ''}`}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <span className="music-player-badge__orb" aria-hidden="true">
        <Music2 size={16} />
      </span>
      <div className="music-player-badge__text">
        <span>{message}</span>
        <small>
          {currentTrack.artist} · {currentTrack.source}
          {status === 'blocked' ? ' · 等待第一次点击' : ''}
        </small>
      </div>
      <button className="music-player-badge__button" type="button" aria-label={buttonLabel} onClick={onToggle}>
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </div>
  )
}

export default MusicPlayerBadge
