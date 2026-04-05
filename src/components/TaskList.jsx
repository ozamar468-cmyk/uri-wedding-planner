import TaskCard from './TaskCard.jsx'

const HEBREW_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
]

function formatHebrewDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${d.getDate()} ${HEBREW_MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export default function TaskList({ events, onEdit, onDelete, onToggleDone }) {
  const pending = events.filter(e => !e.done)
  const completed = events.filter(e => e.done)
  const sorted = [...pending, ...completed]

  if (sorted.length === 0) {
    return (
      <div className="task-list-empty">
        <p>🎉 אין משימות עדיין</p>
        <p>לחץ על + כדי להוסיף משימה ראשונה</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      <h3 className="section-title">כל המשימות</h3>
      {sorted.map(event => (
        <div key={event.id} className="task-list-item">
          <span className="task-date-label">{formatHebrewDate(event.date)}</span>
          <TaskCard
            event={event}
            onEdit={() => onEdit(event)}
            onDelete={() => onDelete(event.id)}
            onToggleDone={() => onToggleDone(event.id, event.done)}
          />
        </div>
      ))}
    </div>
  )
}
