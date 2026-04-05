import ProgressBar from './ProgressBar.jsx'

export default function Header({ events, weddingDate, userName, onLogout }) {
  const today = new Date()
  const diffTime = weddingDate.getTime() - today.getTime()
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  const total = events.length
  const completed = events.filter(e => e.done).length
  const remaining = total - completed
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <header className="header">
      <div className="header-top">
        <h1>💍 החתונה של אורי</h1>
        <div className="user-info">
          <span>{userName}</span>
          <button className="logout-btn" onClick={onLogout}>יציאה</button>
        </div>
      </div>

      <div className="countdown">
        <span className="countdown-number">{daysLeft}</span>
        <span className="countdown-label">ימים לחתונה</span>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-number">{total}</span>
          <span className="stat-label">סה״כ משימות</span>
        </div>
        <div className="stat-box">
          <span className="stat-number completed-num">{completed}</span>
          <span className="stat-label">הושלמו</span>
        </div>
        <div className="stat-box">
          <span className="stat-number remaining-num">{remaining}</span>
          <span className="stat-label">נשארו</span>
        </div>
      </div>

      <ProgressBar percent={percent} />
    </header>
  )
}
