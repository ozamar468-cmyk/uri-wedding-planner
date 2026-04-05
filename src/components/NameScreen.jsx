import { useState } from 'react'

export default function NameScreen({ onLogin }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) onLogin(name.trim())
  }

  return (
    <div className="name-screen">
      <div className="name-card">
        <div className="name-icon">💍</div>
        <h1>החתונה של אורי 🎊</h1>
        <p className="subtitle">16.8.2026 · יומן שיתופי למלווים</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="מה השם שלך?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={!name.trim()}>
            כניסה ליומן
          </button>
        </form>
      </div>
    </div>
  )
}
