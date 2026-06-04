import { Flame, Home, Music2, Plus, Trash2, Waves } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Mood, MoodEntry } from '../types/mood'
import { clearEntries, deleteEntry, getEntries } from '../utils/storage'
import StatCard from './StatCard'

interface HistoryViewProps {
  onHome: () => void
  onCreate: () => void
}

function average(entries: MoodEntry[], key: 'energy' | 'stress') {
  if (entries.length === 0) {
    return '0.0'
  }

  const total = entries.reduce((sum, entry) => sum + entry[key], 0)
  return (total / entries.length).toFixed(1)
}

function recordedDays(entries: MoodEntry[]) {
  const dayKeys = entries.map((entry) => new Date(entry.createdAt).toDateString())
  return new Set(dayKeys).size.toString()
}

function topMood(entries: MoodEntry[]) {
  if (entries.length === 0) {
    return '暂无'
  }

  const counts = entries.reduce<Record<Mood, number>>((result, entry) => {
    result[entry.mood] = (result[entry.mood] || 0) + 1
    return result
  }, {} as Record<Mood, number>)

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '暂无'
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

function HistoryView({ onHome, onCreate }: HistoryViewProps) {
  const [entries, setEntries] = useState<MoodEntry[]>(() => getEntries())

  const stats = useMemo(
    () => ({
      days: recordedDays(entries),
      energy: average(entries, 'energy'),
      stress: average(entries, 'stress'),
      mood: topMood(entries),
    }),
    [entries],
  )

  function handleDelete(id: string) {
    setEntries(deleteEntry(id))
  }

  function handleClear() {
    clearEntries()
    setEntries([])
  }

  return (
    <section className="view history-view page-fade">
      <div className="section-header history-header">
        <button className="icon-text-button" type="button" onClick={onHome}>
          <Home size={18} />
          返回首页
        </button>
        <div>
          <p className="eyebrow">MoodTune Archive</p>
          <h1>情绪回声</h1>
          <p>这些记录像一组私人歌单，保存着你曾经经过的状态。</p>
        </div>
        <button className="primary-button compact-action" type="button" onClick={onCreate}>
          <Plus size={18} />
          新记录
        </button>
      </div>

      <div className="stats-grid">
        <StatCard icon={<Music2 size={20} />} label="已记录天数" value={stats.days} />
        <StatCard icon={<Flame size={20} />} label="平均能量值" value={stats.energy} />
        <StatCard icon={<Waves size={20} />} label="平均压力值" value={stats.stress} />
        <StatCard icon={<Music2 size={20} />} label="最常出现的心情" value={stats.mood} />
      </div>

      {entries.length === 0 ? (
        <div className="empty-state glass-panel">
          <h2>还没有记录。先为今天生成一张情绪音乐卡片吧。</h2>
          <button className="primary-button" type="button" onClick={onCreate}>
            <Plus size={18} />
            开始记录
          </button>
        </div>
      ) : (
        <>
          <div className="history-tools">
            <button className="danger-button" type="button" onClick={handleClear}>
              <Trash2 size={18} />
              清空所有记录
            </button>
          </div>

          <div className="history-grid">
            {entries.map((entry) => (
              <article className="history-card" key={entry.id}>
                <div
                  className="history-card__stripe"
                  style={{ background: entry.recommendation.gradient }}
                />
                <div className="history-card__top">
                  <span>{formatShortDate(entry.createdAt)}</span>
                  <strong>{entry.mood}</strong>
                </div>
                <h2>{entry.recommendation.musicMood}</h2>
                <p>{entry.note || '这一天没有写下日记，但留下了情绪声音。'}</p>
                <div className="history-card__meta">
                  <span>风格 {entry.recommendation.genres[0]}</span>
                  <span>能量 {entry.energy}</span>
                  <span>压力 {entry.stress}</span>
                </div>
                <button
                  className="icon-text-button delete-button"
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                >
                  <Trash2 size={16} />
                  删除
                </button>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default HistoryView
