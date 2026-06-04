import type { MoodEntry } from '../types/mood'

const STORAGE_KEY = 'moodtune_entries'

function canUseStorage() {
  return typeof window !== 'undefined' && 'localStorage' in window
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
    return Array.isArray(parsed) ? parsed : []
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
