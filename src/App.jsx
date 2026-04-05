import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase.js'
import NameScreen from './components/NameScreen.jsx'
import Header from './components/Header.jsx'
import Calendar from './components/Calendar.jsx'
import DayView from './components/DayView.jsx'
import TaskList from './components/TaskList.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TaskForm from './components/TaskForm.jsx'

const WEDDING_DATE = new Date(2026, 7, 16) // August 16, 2026

export default function App() {
  const [userName, setUserName] = useState(localStorage.getItem('wedding_user') || '')
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [activeFilter, setActiveFilter] = useState('הכל')
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const fetchEvents = useCallback(async () => {
    if (!supabase) return
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true })
    if (error) {
      console.error('Fetch events error:', error)
    } else if (data) {
      setEvents(data)
    }
  }, [])

  useEffect(() => {
    if (!userName || !supabase) return
    fetchEvents()

    // Realtime subscription for instant updates
    const channel = supabase
      .channel('calendar_events_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'calendar_events' }, () => {
        fetchEvents()
      })
      .subscribe()

    // Polling fallback - refresh every 10 seconds for cross-user sync
    const pollInterval = setInterval(() => {
      // Don't poll while form is open to prevent re-render interference
      if (!document.querySelector('.modal-overlay')) {
        fetchEvents()
      }
    }, 10000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(pollInterval)
    }
  }, [userName, fetchEvents])

  const handleLogin = (name) => {
    localStorage.setItem('wedding_user', name)
    setUserName(name)
  }

  const handleLogout = () => {
    localStorage.removeItem('wedding_user')
    setUserName('')
  }

  const handleAddEvent = async (event) => {
    if (!supabase) return
    const { error } = await supabase.from('calendar_events').insert({
      ...event,
      created_by: userName
    })
    if (!error) {
      setShowForm(false)
      setEditingEvent(null)
      await fetchEvents()
    }
  }

  const handleUpdateEvent = async (id, updates) => {
    if (!supabase) return
    const { error } = await supabase.from('calendar_events').update(updates).eq('id', id)
    if (!error) {
      setShowForm(false)
      setEditingEvent(null)
      await fetchEvents()
    }
  }

  const handleDeleteEvent = async (id) => {
    if (!supabase) return
    const { error } = await supabase.from('calendar_events').delete().eq('id', id)
    if (!error) await fetchEvents()
  }

  const handleToggleDone = async (id, done) => {
    if (!supabase) return
    const { error } = await supabase.from('calendar_events').update({ done: !done }).eq('id', id)
    if (!error) await fetchEvents()
  }

  const openFormForDate = (date) => {
    setEditingEvent(null)
    setSelectedDate(date)
    setShowForm(true)
  }

  const openEditForm = (event) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const filteredEvents = activeFilter === 'הכל'
    ? events
    : events.filter(e => e.category === activeFilter)

  if (!userName) {
    return <NameScreen onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <Header
        events={events}
        weddingDate={WEDDING_DATE}
        userName={userName}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <Calendar
          events={events}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onAddEvent={openFormForDate}
          weddingDate={WEDDING_DATE}
        />

        {selectedDate && (
          <DayView
            date={selectedDate}
            events={events.filter(e => e.date === selectedDate)}
            onClose={() => setSelectedDate(null)}
            onAdd={() => openFormForDate(selectedDate)}
            onEdit={openEditForm}
            onDelete={handleDeleteEvent}
            onToggleDone={handleToggleDone}
          />
        )}

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          events={events}
        />

        <TaskList
          events={filteredEvents}
          onEdit={openEditForm}
          onDelete={handleDeleteEvent}
          onToggleDone={handleToggleDone}
        />
      </main>

      {showForm && (
        <TaskForm
          event={editingEvent}
          defaultDate={selectedDate}
          onSave={editingEvent ? (data) => handleUpdateEvent(editingEvent.id, data) : handleAddEvent}
          onClose={() => { setShowForm(false); setEditingEvent(null) }}
        />
      )}

      <button className="fab" onClick={() => openFormForDate(selectedDate || new Date().toISOString().split('T')[0])}>
        +
      </button>
    </div>
  )
}
