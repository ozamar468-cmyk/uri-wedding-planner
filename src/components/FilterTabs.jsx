const CATEGORIES = ['הכל', 'הכנות', 'לוגיסטיקה', 'בילויים', 'מתנות', 'כללי']

export default function FilterTabs({ activeFilter, onFilterChange, events }) {
  const getCount = (cat) => {
    if (cat === 'הכל') return events.length
    return events.filter(e => e.category === cat).length
  }

  return (
    <div className="filter-tabs">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
          onClick={() => onFilterChange(cat)}
        >
          {cat} ({getCount(cat)})
        </button>
      ))}
    </div>
  )
}
