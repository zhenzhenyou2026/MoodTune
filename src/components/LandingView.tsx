import { Archive, ArrowRight, Music2 } from 'lucide-react'

interface LandingViewProps {
  onStart: () => void
  onHistory: () => void
}

function LandingView({ onStart, onHistory }: LandingViewProps) {
  return (
    <section className="view landing-view page-fade">
      <div className="landing-grid">
        <div className="hero-card glass-panel">
          <p className="eyebrow">情绪音乐日记</p>
          <h1>MoodTune</h1>
          <h2>今天的情绪，适合什么声音？</h2>
          <p className="hero-copy">
            用一分钟记录此刻的心情，让颜色、文字和音乐氛围为你保存今天。
          </p>

          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={onStart}>
              <ArrowRight size={18} />
              开始记录
            </button>
            <button className="ghost-button" type="button" onClick={onHistory}>
              <Archive size={18} />
              查看历史
            </button>
          </div>
        </div>

        <div className="record-stage" aria-hidden="true">
          <div className="record">
            <div className="record__ring" />
            <div className="record__core">
              <Music2 size={30} />
            </div>
          </div>
          <div className="wave wave-a" />
          <div className="wave wave-b" />
          <div className="album-caption">
            <span>private mood archive</span>
            <strong>vol. 01</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingView
