const HEBREW_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
]

const HEBREW_DAYS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']

const CATEGORY_COLORS = {
  'הכנות': '#7E57C2',
  'לוגיסטיקה': '#42A5F5',
  'בילויים': '#FF9800',
  'מתנות': '#EC407A',
  'כללי': '#8BC34A',
}

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function Calendar({ events, currentMonth, setCurrentMonth, selectedDate, onSelectDate, onAddEvent, weddingDate }) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const todayStr = new Date().toISOString().split('T')[0]
  const weddingStr = `${weddingDate.getFullYear()}-${String(weddingDate.getMonth() + 1).padStart(2, '0')}-${String(weddingDate.getDate()).padStart(2, '0')}`

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))

  const eventsByDate = {}
  events.forEach(e => {
    if (!eventsByDate[e.date]) eventsByDate[e.date] = []
    eventsByDate[e.date].push(e)
  })

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(year, month, day)
    const dayEvents = eventsByDate[dateStr] || []
    const isToday = dateStr === todayStr
    const isWedding = dateStr === weddingStr
    const isSelected = dateStr === selectedDate

    const categories = [...new Set(dayEvents.map(e => e.category))]

    days.push(
      <div
        key={day}
        className={`calendar-day ${isToday ? 'today' : ''} ${isWedding ? 'wedding-day' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
        onClick={() => onSelectDate(dateStr)}
        onDoubleClick={() => onAddEvent(dateStr)}
      >
        <span className="day-number">
          {isWedding && '💍 '}{day}
        </span>
        {dayEvents.length > 0 && (
          <div className="day-indicators">
            {categories.slice(0, 3).map((cat, i) => (
              <span
                key={i}
                className="category-dot"
                style={{ backgroundColor: CATEGORY_COLORS[cat] || '#8BC34A' }}
              />
            ))}
            {dayEvents.length > 0 && (
              <span className="event-count">{dayEvents.length}</span>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={nextMonth}>›</button>
        <h2>{HEBREW_MONTHS[month]} {year}</h2>
        <button className="nav-btn" onClick={prevMonth}>‹</button>
      </div>

      <div className="calendar-grid">
        {HEBREW_DAYS.map(d => (
          <div key={d} className="calendar-weekday">{d}</div>
        ))}
        {days}
      </div>
    </div>
  )
}
