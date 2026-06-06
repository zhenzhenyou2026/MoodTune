import { Trash2 } from 'lucide-react'
import type { CSSProperties } from 'react'
import { getMoodTheme } from '../data/moodThemes'
import { getMusicTrackForEntry } from '../data/musicTracks'
import type { MoodEntry } from '../types/mood'

interface ArchiveCardProps {
  entry: MoodEntry
  onDelete: (id: string) => void
  onSelect: (entry: MoodEntry) => void
  selected: boolean
}

function formatArchiveDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    day: 'numeric',
    month: 'long',
    weekday: 'short',
  }).format(new Date(value))
}

function ArchiveCard({ entry, onDelete, onSelect, selected }: ArchiveCardProps) {
  const theme = getMoodTheme(entry.mood)
  const track = getMusicTrackForEntry(entry.mood, entry.musicKey)
  const style = {
    '--archive-accent': theme.archiveAccent,
    '--archive-paper': theme.archivePaper,
    '--archive-ink': theme.textColor,
  } as CSSProperties

  return (
    <article
      className={`archive-card ${selected ? 'is-selected' : ''}`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(entry)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(entry)
        }
      }}
    >
      <div className="archive-card__pin" aria-hidden="true" />
      <div className="archive-card__top">
        <span>{formatArchiveDate(entry.createdAt)}</span>
        <strong>{entry.mood}</strong>
      </div>
      <div className="archive-card__tone">
        <span style={{ background: theme.archiveAccent }} aria-hidden="true" />
        {entry.recommendation.visualLabel}
      </div>
      <p className="archive-card__note">
        {entry.note || '这一天没有写下很多字，但它已经被轻轻收藏。'}
      </p>
      <p className="archive-card__quote">{entry.quote}</p>
      <div className="archive-card__footer">
        <span>今日声音：{entry.musicTitle || track.title}</span>
        <button
          className="archive-delete"
          type="button"
          aria-label="删除这条情绪日记"
          onClick={(event) => {
            event.stopPropagation()
            onDelete(entry.id)
          }}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  )
}

export default ArchiveCard
