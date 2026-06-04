import { Archive, Check, Home, RotateCcw, Save } from 'lucide-react'
import type { MoodEntry } from '../types/mood'
import MoodCard from './MoodCard'

interface ResultViewProps {
  entry: MoodEntry
  saved: boolean
  onSave: () => void
  onAgain: () => void
  onHistory: () => void
  onHome: () => void
}

function ResultView({ entry, saved, onSave, onAgain, onHistory, onHome }: ResultViewProps) {
  return (
    <section className="view result-view page-fade">
      <div className="section-header centered">
        <p className="eyebrow">MoodTune</p>
        <h1>今日情绪卡片</h1>
      </div>

      <div className="result-grid">
        <MoodCard entry={entry} />

        <aside className="result-details glass-panel">
          <div className="detail-row">
            <p className="detail-label">今日心情</p>
            <strong>{entry.mood}</strong>
          </div>
          <div className="detail-row">
            <p className="detail-label">能量 / 压力 / 天气</p>
            <strong>
              能量 {entry.energy}/10 · 压力 {entry.stress}/10 · {entry.weather}
            </strong>
          </div>
          <div>
            <p className="detail-label">今日关键词</p>
            <strong>{entry.keywords || '未填写关键词'}</strong>
          </div>
          <div>
            <p className="detail-label">一句话日记</p>
            <span>{entry.note || '今天没有写下句子，但情绪已经被保存成一段声音。'}</span>
          </div>
          <div>
            <p className="detail-label">今日情绪颜色</p>
            <span className="color-chip">
              <span
                className="color-swatch"
                style={{ background: entry.recommendation.moodColor }}
                aria-hidden="true"
              />
              {entry.recommendation.visualLabel}
            </span>
          </div>
          <div>
            <p className="detail-label">推荐音乐氛围</p>
            <strong>{entry.recommendation.musicMood}</strong>
          </div>
          <div>
            <p className="detail-label">推荐音乐风格</p>
            <strong>{entry.recommendation.genres.join(' / ')}</strong>
          </div>
          <div>
            <p className="detail-label">推荐理由</p>
            <span>{entry.recommendation.reason}</span>
          </div>

          <div className="result-actions">
            <button className="primary-button" type="button" onClick={onSave} disabled={saved}>
              {saved ? <Check size={18} /> : <Save size={18} />}
              {saved ? '已保存' : '保存记录'}
            </button>
            <button className="ghost-button" type="button" onClick={onAgain}>
              <RotateCcw size={18} />
              再记一次
            </button>
            <button className="ghost-button" type="button" onClick={onHistory}>
              <Archive size={18} />
              查看历史
            </button>
            <button className="ghost-button" type="button" onClick={onHome}>
              <Home size={18} />
              返回首页
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default ResultView
