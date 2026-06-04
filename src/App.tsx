import { useState } from 'react'
import EntryView from './components/EntryView'
import HistoryView from './components/HistoryView'
import LandingView from './components/LandingView'
import ResultView from './components/ResultView'
import type { MoodEntry } from './types/mood'
import { saveEntry } from './utils/storage'

type View = 'landing' | 'entry' | 'result' | 'history'

function App() {
  const [view, setView] = useState<View>('landing')
  const [currentEntry, setCurrentEntry] = useState<MoodEntry | null>(null)
  const [saved, setSaved] = useState(false)

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
    <main className="app-shell">
      <div className="ambient-bg" aria-hidden="true" />

      {view === 'landing' && (
        <LandingView onStart={() => setView('entry')} onHistory={() => setView('history')} />
      )}

      {view === 'entry' && (
        <EntryView onGenerated={handleGenerated} onHome={() => setView('landing')} />
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
