import { Flame, Home, Music2, Plus, Trash2, Waves } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import { getMoodTheme } from '../data/moodThemes'
import type { Mood, MoodEntry } from '../types/mood'
import { clearEntries, deleteEntry, getEntries } from '../utils/storage'
import ArchiveCard from './ArchiveCard'
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

function formatDetailDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function HistoryView({ onHome, onCreate }: HistoryViewProps) {
  const [entries, setEntries] = useState<MoodEntry[]>(() => getEntries())
  const [selectedId, setSelectedId] = useState<string | null>(() => getEntries()[0]?.id ?? null)

  const sortedEntries = useMemo(
    () =>
      [...entries].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [entries],
  )

  const selectedEntry = useMemo(
    () => sortedEntries.find((entry) => entry.id === selectedId) ?? sortedEntries[0] ?? null,
    [selectedId, sortedEntries],
  )

  const stats = useMemo(
    () => ({
      days: recordedDays(sortedEntries),
      energy: average(sortedEntries, 'energy'),
      stress: average(sortedEntries, 'stress'),
      mood: topMood(sortedEntries),
    }),
    [sortedEntries],
  )

  function handleDelete(id: string) {
    const nextEntries = deleteEntry(id)
    setEntries(nextEntries)
    if (selectedId === id) {
      setSelectedId(nextEntries[0]?.id ?? null)
    }
  }

  function handleClear() {
    clearEntries()
    setEntries([])
    setSelectedId(null)
  }

  const selectedTheme = selectedEntry ? getMoodTheme(selectedEntry.mood) : null

  return (
    <section className="view history-view page-fade">
      <div className="section-header history-header">
        <button className="icon-text-button" type="button" onClick={onHome}>
          <Home size={18} />
          返回首页
        </button>
        <div>
          <p className="eyebrow">MoodTune Archive</p>
          <h1>我的情绪档案</h1>
          <p>这里保存着你每天的心情、颜色与声音。</p>
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

      {sortedEntries.length === 0 ? (
        <div className="empty-state glass-panel">
          <div className="empty-illustration" aria-hidden="true" />
          <h2>这里还没有心情被收藏，去记录今天的第一段声音吧。</h2>
          <button className="primary-button" type="button" onClick={onCreate}>
            <Plus size={18} />
            去记录今天
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

          <div className="archive-layout">
            <div className="archive-grid">
              {sortedEntries.map((entry) => (
                <ArchiveCard
                  key={entry.id}
                  entry={entry}
                  selected={selectedEntry?.id === entry.id}
                  onDelete={handleDelete}
                  onSelect={(nextEntry) => setSelectedId(nextEntry.id)}
                />
              ))}
            </div>

            {selectedEntry && selectedTheme && (
              <aside
                className="archive-detail glass-panel"
                style={
                  {
                    '--archive-accent': selectedTheme.archiveAccent,
                    '--archive-paper': selectedTheme.archivePaper,
                    '--archive-ink': selectedTheme.textColor,
                } as CSSProperties
              }
              >
                <div className="archive-detail__paper">
                  <p className="eyebrow">翻开这一页</p>
                  <h2>{formatDetailDate(selectedEntry.createdAt)}</h2>
                  <div className="archive-detail__mood">
                    <span style={{ background: selectedTheme.archiveAccent }} aria-hidden="true" />
                    {selectedEntry.mood} · {selectedEntry.recommendation.musicMood}
                  </div>
                  <p className="archive-detail__quote">{selectedEntry.quote}</p>
                  <p className="archive-detail__note">
                    {selectedEntry.note || '这一天没有写下很多字，但它仍然留下了颜色和声音。'}
                  </p>
                  <div className="archive-detail__meta">
                    <span>{selectedEntry.weather}</span>
                    <span>能量 {selectedEntry.energy}/10</span>
                    <span>压力 {selectedEntry.stress}/10</span>
                    <span>{selectedEntry.recommendation.genres.join(' / ')}</span>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default HistoryView
