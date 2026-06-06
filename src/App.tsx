import { useEffect, useState } from 'react'
import EntryView from './components/EntryView'
import HistoryView from './components/HistoryView'
import LandingView from './components/LandingView'
import MusicToggle from './components/MusicToggle'
import ResultView from './components/ResultView'
import type { Mood, MoodEntry } from './types/mood'
import { setMoodSound, setMuted, startAmbient, stopAmbient } from './utils/audio'
import { saveEntry } from './utils/storage'

type View = 'landing' | 'entry' | 'result' | 'history'

function App() {
  const [view, setView] = useState<View>('landing')
  const [currentEntry, setCurrentEntry] = useState<MoodEntry | null>(null)
  const [saved, setSaved] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [musicActive, setMusicActive] = useState(false)

  useEffect(() => {
    let mounted = true

    startAmbient().then((started) => {
      if (mounted) {
        setMusicActive(started)
      }
    })

    return () => {
      mounted = false
      stopAmbient()
    }
  }, [])

  async function activateMusic(nextMood?: Mood) {
    if (!musicEnabled) {
      return
    }

    const started = await startAmbient(nextMood ?? currentEntry?.mood)
    setMusicActive(started)
  }

  function handleMoodAudio(nextMood: Mood) {
    setMoodSound(nextMood)
    void activateMusic(nextMood)
  }

  async function handleMusicToggle() {
    if (musicEnabled && musicActive) {
      setMusicEnabled(false)
      setMusicActive(false)
      await setMuted(true)
      return
    }

    setMusicEnabled(true)
    const started = await setMuted(false)
    setMusicActive(started)
  }

  function handleGenerated(entry: MoodEntry) {
    setCurrentEntry(entry)
    setSaved(false)
    setView('result')
  }

  function handleSave() {
    if (!currentEntry) {
      return
    }

    saveEntry(currentEntry)
    setSaved(true)
  }

  return (
    <main className="app-shell" onPointerDown={() => void activateMusic()}>
      <div className="ambient-bg" aria-hidden="true" />
      <MusicToggle isActive={musicEnabled && musicActive} onToggle={handleMusicToggle} />

      {view === 'landing' && (
        <LandingView
          isMusicActive={musicEnabled && musicActive}
          onStart={() => {
            void activateMusic()
            setView('entry')
          }}
          onHistory={() => {
            void activateMusic()
            setView('history')
          }}
        />
      )}

      {view === 'entry' && (
        <EntryView
          onGenerated={handleGenerated}
          onHome={() => setView('landing')}
          onMoodChange={handleMoodAudio}
        />
      )}

      {view === 'result' && currentEntry && (
        <ResultView
          entry={currentEntry}
          saved={saved}
          onSave={handleSave}
          onAgain={() => setView('entry')}
          onHistory={() => setView('history')}
          onHome={() => setView('landing')}
        />
      )}

      {view === 'history' && (
        <HistoryView onHome={() => setView('landing')} onCreate={() => setView('entry')} />
      )}
    </main>
  )
}

export default App
