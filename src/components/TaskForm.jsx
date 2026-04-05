import { useState } from 'react'

const CATEGORIES = ['הכנות', 'לוגיסטיקה', 'בילויים', 'מתנות', 'כללי']
const CATEGORY_COLORS = {
  'הכנות': '#7E57C2',
  'לוגיסטיקה': '#42A5F5',
  'בילויים': '#FF9800',
  'מתנות': '#EC407A',
  'כללי': '#8BC34A',
}

export default function TaskForm({ event, defaultDate, onSave, onClose }) {
  const [title, setTitle] = useState(event?.title || '')
  const [date, setDate] = useState(event?.date || defaultDate || new Date().toISOString().split('T')[0])
  const [time, setTime] = useState(event?.time?.slice(0, 5) || '')
  const [category, setCategory] = useState(event?.category || 'כללי')
  const [assignee, setAssignee] = useState(event?.assignee || '')
  const [notes, setNotes] = useState(event?.notes || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    onSave({
      title: title.trim(),
      date,
      time: time || null,
      category,
      assignee: assignee.trim() || null,
      notes: notes.trim() || null,
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{event ? 'עריכת משימה' : 'משימה חדשה'}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>מה צריך לעשות?</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="למשל: להזמין צלם"
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>תאריך</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>שעה (אופציונלי)</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>קטגוריה</label>
            <div className="category-buttons">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`category-btn ${category === cat ? 'active' : ''}`}
                  style={category === cat ? { backgroundColor: CATEGORY_COLORS[cat], color: '#fff' } : { borderColor: CATEGORY_COLORS[cat], color: CATEGORY_COLORS[cat] }}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>מי אחראי? (אופציונלי)</label>
            <input
              type="text"
              value={assignee}
              onChange={e => setAssignee(e.target.value)}
              placeholder="שם האחראי"
            />
          </div>

          <div className="form-group">
            <label>הערות (אופציונלי)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="הערות נוספות..."
              rows={3}
            />
          </div>

          <button type="submit" className="save-btn" disabled={!title.trim()}>
            {event ? 'עדכון' : 'שמירה'} ✨
          </button>
        </form>
      </div>
    </div>
  )
}
