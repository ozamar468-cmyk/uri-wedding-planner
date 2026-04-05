const CATEGORY_COLORS = {
  'הכנות': '#7E57C2',
  'לוגיסטיקה': '#42A5F5',
  'בילויים': '#FF9800',
  'מתנות': '#EC407A',
  'כללי': '#8BC34A',
}

export default function TaskCard({ event, onEdit, onDelete, onToggleDone }) {
  const catColor = CATEGORY_COLORS[event.category] || '#8BC34A'

  return (
    <div className={`task-card ${event.done ? 'done' : ''}`}>
      <div className="task-card-right">
        <button
          className={`checkbox ${event.done ? 'checked' : ''}`}
          onClick={onToggleDone}
          style={event.done ? { backgroundColor: '#6B9E7A', borderColor: '#6B9E7A' } : {}}
        >
          {event.done && '✓'}
        </button>
        <div className="task-info">
          <span className="task-title">{event.title}</span>
          <div className="task-meta">
            <span className="category-tag" style={{ backgroundColor: catColor + '20', color: catColor }}>
              {event.category}
            </span>
            {event.time && <span className="task-time">🕐 {event.time.slice(0, 5)}</span>}
            {event.assignee && <span className="task-assignee">👤 {event.assignee}</span>}
          </div>
          {event.notes && <p className="task-notes">{event.notes}</p>}
        </div>
      </div>
      <div className="task-actions">
        <button className="action-btn edit-btn" onClick={onEdit}>✏️</button>
        <button className="action-btn delete-btn" onClick={onDelete}>🗑️</button>
      </div>
    </div>
  )
}
