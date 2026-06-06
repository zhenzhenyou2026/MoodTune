import { useEffect, useState } from 'react'
import EntryView from './components/EntryView'
import HistoryView from './components/HistoryView'
import LandingView from './components/LandingView'
import MusicPlayerBadge from './components/MusicPlayerBadge'
import ResultView from './components/ResultView'
import type { Mood, MoodEntry } from './types/mood'
import {
  getAudioState,
  setMoodSound,
  setMuted,
  startAmbient,
  stopAmbient,
  subscribeAudio,
} from './utils/audio'
import { saveEntry } from './utils/storage'

type View = 'landing' | 'entry' | 'result' | 'history'

function App() {
  const [view, setView] = useState<View>('landing')
  const [currentEntry, setCurrentEntry] = useState<MoodEntry | null>(null)
  const [saved, setSaved] = useState(false)
  const [audioState, setAudioState] = useState(() => getAudioState())

  useEffect(() => {
    let mounted = true
    const unsubscribe = subscribeAudio((nextState) => {
      if (mounted) {
        setAudioState(nextState)
      }
    })

    startAmbient().then((started) => {
      if (mounted) {
        setAudioState(started)
      }
    })

    return () => {
      mounted = false
      unsubscribe()
      stopAmbient()
    }
  }, [])

  async function activateMusic(nextMood?: Mood) {
    const started = await startAmbient(nextMood ?? currentEntry?.mood)
    setAudioState(started)
  }

  function handleMoodAudio(nextMood: Mood) {
    void setMoodSound(nextMood).then(setAudioState)
  }

  async function handleMusicToggle() {
    if (audioState.isPlaying) {
      const nextState = await setMuted(true)
      setAudioState(nextState)
      return
    }

    const nextState = await setMuted(false)
    setAudioState(nextState)
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
      <MusicPlayerBadge audioState={audioState} onToggle={handleMusicToggle} />

      {view === 'landing' && (
        <LandingView
          audioState={audioState}
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
          audioState={audioState}
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
