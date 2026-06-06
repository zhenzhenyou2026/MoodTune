import { Music2, Sparkles } from 'lucide-react'
import type { CSSProperties } from 'react'
import { getMoodTheme } from '../data/moodThemes'
import type { MoodEntry } from '../types/mood'
import PreviewDecoration from './PreviewDecoration'

interface MoodCardProps {
  entry: MoodEntry
  compact?: boolean
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))
}

function MoodCard({ entry, compact = false }: MoodCardProps) {
  const theme = getMoodTheme(entry.mood)
  const style = {
    '--card-gradient': entry.recommendation.gradient,
    '--card-ink': theme.textColor,
    '--card-decoration': theme.decorationTone,
  } as CSSProperties

  return (
    <article className={`mood-card ${compact ? 'is-compact' : ''}`} style={style}>
      <div className="mood-card__texture" aria-hidden="true" />
      <PreviewDecoration tone={theme.decorationTone} />
      <div className="mood-card__top">
        <span className="brand-mark">
          <Music2 size={16} />
          MoodTune
        </span>
        <span className="mood-card__date">{formatDate(entry.createdAt)}</span>
      </div>

      <div className="mood-card__body">
        <div>
          <p className="card-kicker">今日情绪</p>
          <h2>{entry.mood}</h2>
        </div>
        <div className="disc-mark" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="music-label">
        <Sparkles size={18} />
        <span>{entry.recommendation.musicMood}</span>
      </div>

      {!compact && (
        <p className="note-line">
          {entry.note || '今天没有写下句子，但情绪已经被保存成一段声音。'}
        </p>
      )}

      <div className="mood-card__meta">
        <span>能量 {entry.energy}/10</span>
        <span>压力 {entry.stress}/10</span>
        <span>{entry.weather}</span>
      </div>

      <div className="genre-row">
        {entry.recommendation.genres.map((genre) => (
          <span key={genre}>{genre}</span>
        ))}
      </div>

      {!compact && (
        <div className="reason-block">
          <p>{entry.recommendation.reason}</p>
          <small>{entry.quote || entry.recommendation.visualLabel}</small>
        </div>
      )}
    </article>
  )
}

export default MoodCard
