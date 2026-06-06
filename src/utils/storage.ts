import type { MoodEntry, MoodInput } from '../types/mood'
import { getMoodQuote, getMoodTheme } from '../data/moodThemes'
import { getMusicTrack, getMusicTrackForMood } from '../data/musicTracks'
import { moods, weathers } from '../types/mood'
import { generateRecommendation } from './recommendation'

const STORAGE_KEY = 'moodtune_entries'

function canUseStorage() {
  return typeof window !== 'undefined' && 'localStorage' in window
}

function normalizeEntry(value: unknown): MoodEntry | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const raw = value as Record<string, unknown>

  if (
    typeof raw.id !== 'string' ||
    typeof raw.createdAt !== 'string' ||
    !moods.includes(raw.mood as MoodEntry['mood']) ||
    !weathers.includes(raw.weather as MoodEntry['weather']) ||
    typeof raw.energy !== 'number' ||
    typeof raw.stress !== 'number'
  ) {
    return null
  }

  const input: MoodInput = {
    mood: raw.mood as MoodEntry['mood'],
    energy: raw.energy,
    stress: raw.stress,
    weather: raw.weather as MoodEntry['weather'],
    note: typeof raw.note === 'string' ? raw.note : '',
  }
  const theme = getMoodTheme(input.mood)
  const track = getMusicTrack(typeof raw.musicKey === 'string' ? raw.musicKey : undefined) ?? getMusicTrackForMood(input.mood)

  return {
    ...input,
    id: raw.id,
    createdAt: raw.createdAt,
    musicArtist: typeof raw.musicArtist === 'string' ? raw.musicArtist : track.artist,
    musicKey: track.key || theme.musicKey,
    musicTitle: typeof raw.musicTitle === 'string' ? raw.musicTitle : track.title,
    quote:
      typeof raw.quote === 'string' && raw.quote.trim()
        ? raw.quote
        : getMoodQuote(input.mood, raw.createdAt),
    recommendation:
      raw.recommendation && typeof raw.recommendation === 'object'
        ? (raw.recommendation as MoodEntry['recommendation'])
        : generateRecommendation(input),
  }
}

export function getEntries(): MoodEntry[] {
  if (!canUseStorage()) {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed)
      ? parsed.map((entry) => normalizeEntry(entry)).filter((entry): entry is MoodEntry => Boolean(entry))
      : []
  } catch {
    return []
  }
}

function writeEntries(entries: MoodEntry[]) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function saveEntry(entry: MoodEntry): void {
  const nextEntries = [entry, ...getEntries().filter((item) => item.id !== entry.id)]
  writeEntries(nextEntries)
}

export function deleteEntry(id: string): MoodEntry[] {
  const nextEntries = getEntries().filter((entry) => entry.id !== id)
  writeEntries(nextEntries)
  return nextEntries
}

export function clearEntries(): void {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
}
