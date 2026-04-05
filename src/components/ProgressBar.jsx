export default function ProgressBar({ percent }) {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-text">{percent}% הושלם</span>
    </div>
  )
}
