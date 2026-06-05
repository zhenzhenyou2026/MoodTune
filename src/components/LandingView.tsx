import { Archive, ArrowRight } from 'lucide-react'
import DecorativeMusicGlyph from './DecorativeMusicGlyph'

interface LandingViewProps {
  isMusicActive: boolean
  onStart: () => void
  onHistory: () => void
}

function LandingView({ isMusicActive, onStart, onHistory }: LandingViewProps) {
  return (
    <section className="view landing-view page-fade">
      <div className="landing-grid">
        <div className="hero-card glass-panel">
          <p className="eyebrow">情绪音乐日记</p>
          <h1>MoodTune</h1>
          <h2>今天的情绪，适合什么声音？</h2>
          <p className="hero-copy">
            用 60 秒记录此刻心情，让色彩、文字与音乐一起保存今天。
          </p>

          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={onStart}>
              <ArrowRight size={18} />
              开始记录
            </button>
            <button className="archive-button" type="button" onClick={onHistory}>
              <Archive size={18} />
              情绪档案
            </button>
          </div>
        </div>

        <div className="record-stage" aria-hidden="true">
          <div className={`record ${isMusicActive ? 'is-playing' : 'is-paused'}`}>
            <div className="record__ring" />
            <div className="record__core">
              <DecorativeMusicGlyph />
            </div>
          </div>
          <div className="wave wave-a" />
          <div className="wave wave-b" />
          <p className="album-caption">今日心绪存档</p>
        </div>
      </div>
    </section>
  )
}

export default LandingView
