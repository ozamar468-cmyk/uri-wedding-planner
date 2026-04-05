import TaskCard from './TaskCard.jsx'

const HEBREW_DAYS_FULL = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
const HEBREW_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
]

export default function DayView({ date, events, onClose, onAdd, onEdit, onDelete, onToggleDone }) {
  const d = new Date(date + 'T00:00:00')
  const dayName = HEBREW_DAYS_FULL[d.getDay()]
  const dayNum = d.getDate()
  const monthName = HEBREW_MONTHS[d.getMonth()]

  return (
    <div className="day-view">
      <div className="day-view-header">
        <button className="close-btn" onClick={onClose}>✕</button>
        <div>
          <h3>יום {dayName}, {dayNum} {monthName}</h3>
          <span className="day-view-count">{events.length} משימות</span>
        </div>
        <button className="add-day-btn" onClick={onAdd}>+ הוסף משימה</button>
      </div>

      {events.length === 0 ? (
        <div className="empty-day">
          <p>אין משימות ליום הזה</p>
          <button className="add-day-btn" onClick={onAdd}>הוסף משימה ראשונה</button>
        </div>
      ) : (
        <div className="day-events-list">
          {events.map(event => (
            <TaskCard
              key={event.id}
              event={event}
              onEdit={() => onEdit(event)}
              onDelete={() => onDelete(event.id)}
              onToggleDone={() => onToggleDone(event.id, event.done)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
