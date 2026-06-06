import { Archive, ArrowRight } from 'lucide-react'
import type { AudioState } from '../utils/audio'
import DecorativeMusicGlyph from './DecorativeMusicGlyph'

interface LandingViewProps {
  audioState: AudioState
  onStart: () => void
  onHistory: () => void
}

function LandingView({ audioState, onStart, onHistory }: LandingViewProps) {
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

          <div className="hero-now-playing">
            <span aria-hidden="true" />
            <p>
              {audioState.isMissing
                ? `待补充：${audioState.currentTrack.title}`
                : `首页声音：${audioState.currentTrack.title}`}
            </p>
          </div>
        </div>

        <div className="record-stage" aria-hidden="true">
          <div
            className={`record ${audioState.isPlaying ? 'is-playing' : 'is-paused'} ${
              audioState.isMissing ? 'is-missing' : ''
            }`}
          >
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
