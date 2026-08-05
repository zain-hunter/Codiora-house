import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function FavoritesPage({ token }) {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch('/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Unable to load favorites')
        }
        const data = await response.json()
        setFavorites(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [token])

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Saved destinations</h1>
        <p className="mt-2 text-slate-600">Your favorite places are stored here for fast access.</p>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-10 text-center text-slate-700 shadow-sm">Loading favorites…</div>
      ) : error ? (
        <div className="rounded-[2rem] border border-rose-100 bg-rose-50 p-10 text-center text-rose-700 shadow-sm">{error}</div>
      ) : favorites.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-700 shadow-sm">No saved destinations yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((destination) => (
            <Link key={destination._id} to={`/destinations/${destination._id}`} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200">
              <h2 className="text-xl font-semibold text-slate-900">{destination.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{destination.location}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage
