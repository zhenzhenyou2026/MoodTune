import {
  Home,
  Moon,
  Smile,
  Sparkles,
  Waves,
  Zap,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Mood, MoodEntry, MoodInput, Weather } from '../types/mood'
import { moods, weathers } from '../types/mood'
import { generateRecommendation } from '../utils/recommendation'
import MoodCard from './MoodCard'
import PillButton from './PillButton'
import RangeControl from './RangeControl'
import WeatherIcon from './WeatherIcon'

interface EntryViewProps {
  onGenerated: (entry: MoodEntry) => void
  onHome: () => void
  onMoodChange: (mood: Mood) => void
}

const moodIcons = {
  开心: <Smile size={18} />,
  平静: <Waves size={18} />,
  焦虑: <Waves size={18} />,
  疲惫: <Moon size={18} />,
  低落: <Moon size={18} />,
  兴奋: <Zap size={18} />,
} satisfies Record<Mood, JSX.Element>

const moodTones = {
  开心: 'happy',
  平静: 'calm',
  焦虑: 'anxious',
  疲惫: 'tired',
  低落: 'sad',
  兴奋: 'excited',
} satisfies Record<Mood, string>

const weatherTones = {
  晴天: 'sunny',
  阴天: 'cloudy',
  雨天: 'rainy',
  夜晚: 'night',
} satisfies Record<Weather, string>

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function EntryView({ onGenerated, onHome, onMoodChange }: EntryViewProps) {
  const [mood, setMood] = useState<Mood | ''>('')
  const [energy, setEnergy] = useState(5)
  const [stress, setStress] = useState(5)
  const [weather, setWeather] = useState<Weather | ''>('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  const previewEntry = useMemo<MoodEntry>(() => {
    const safeInput: MoodInput = {
      mood: mood || '平静',
      energy,
      stress,
      weather: weather || '夜晚',
      note,
    }

    return {
      ...safeInput,
      id: 'preview',
      createdAt: new Date().toISOString(),
      recommendation: generateRecommendation(safeInput),
    }
  }, [energy, mood, note, stress, weather])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!mood || !weather) {
      setError('请选择今日心情和天气，再生成情绪卡片。')
      return
    }

    const input: MoodInput = {
      mood,
      energy,
      stress,
      weather,
      note: note.trim(),
    }

    onGenerated({
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
      recommendation: generateRecommendation(input),
    })
  }

  return (
    <section className="view entry-view page-fade">
      <div className="section-header">
        <button className="icon-text-button" type="button" onClick={onHome}>
          <Home size={18} />
          返回首页
        </button>
        <div>
          <p className="eyebrow">MoodTune</p>
          <h1>记录今天的情绪</h1>
          <p>不用写很多，只要留下几个线索。MoodTune 会把它们转化成一张属于今天的情绪音乐卡片。</p>
        </div>
      </div>

      <div className="entry-layout">
        <form className="entry-form glass-panel" onSubmit={handleSubmit}>
          <div className="form-section">
            <span className="field-heading">今日心情</span>
            <div className="choice-grid">
              {moods.map((item) => (
                <PillButton
                  key={item}
                  active={mood === item}
                  icon={moodIcons[item]}
                  label={item}
                  tone={moodTones[item]}
                  onClick={() => {
                    setMood(item)
                    onMoodChange(item)
                    setError('')
                  }}
                />
              ))}
            </div>
          </div>

          <div className="slider-grid">
            <RangeControl
              label="能量值"
              minLabel="慢下来"
              maxLabel="很有劲"
              value={energy}
              onChange={setEnergy}
            />
            <RangeControl
              label="压力值"
              minLabel="松弛"
              maxLabel="紧绷"
              value={stress}
              onChange={setStress}
            />
          </div>

          <div className="form-section">
            <span className="field-heading">天气</span>
            <div className="weather-grid">
              {weathers.map((item) => (
                <PillButton
                  key={item}
                  active={weather === item}
                  icon={<WeatherIcon weather={item} />}
                  label={item}
                  tone={weatherTones[item]}
                  onClick={() => {
                    setWeather(item)
                    setError('')
                  }}
                />
              ))}
            </div>
          </div>

          <label className="text-field">
            <span className="field-heading">一句话日记</span>
            <textarea
              value={note}
              rows={4}
              maxLength={120}
              placeholder="把今天留下一句就好。"
              onChange={(event) => setNote(event.target.value)}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button wide-button" type="submit">
            <Sparkles size={18} />
            生成今日情绪卡片
          </button>
        </form>

        <aside className="preview-column">
          <p className="preview-title">实时预览</p>
          <MoodCard entry={previewEntry} compact />
        </aside>
      </div>
    </section>
  )
}

export default EntryView
