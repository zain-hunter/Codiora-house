import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function DashboardPage({ user, token }) {
  const [dashboard, setDashboard] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Unable to load dashboard')
        }

        const data = await response.json()
        setDashboard(data)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [token])

  if (loading) {
    return <div className="rounded-[2rem] border border-emerald-100 bg-white p-10 shadow-sm text-center">Loading dashboard…</div>
  }

  if (error) {
    return <div className="rounded-[2rem] border border-rose-100 bg-rose-50 p-10 shadow-sm text-center text-rose-700">{error}</div>
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Welcome back</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{dashboard.user.name}</h1>
            <p className="mt-2 text-slate-600">Here is your personalized travel hub.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-slate-600">Favorites</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{dashboard.statistics.favoriteCount}</p>
            </div>
            <div className="rounded-[1.5rem] bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-slate-600">Recently viewed</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{dashboard.statistics.recentlyViewedCount}</p>
            </div>
            <div className="rounded-[1.5rem] bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-slate-600">Recommendations</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{dashboard.featuredRecommendations.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Favorite destinations</h2>
          <div className="mt-5 space-y-4">
            {dashboard.user.favorites.length === 0 ? (
              <p className="text-sm text-slate-600">No saved destinations yet.</p>
            ) : (
              dashboard.user.favorites.map((destination) => (
                <Link key={destination._id} to={`/destinations/${destination._id}`} className="block rounded-2xl border border-slate-100 px-4 py-3 hover:bg-slate-50">
                  <p className="font-semibold text-slate-900">{destination.name}</p>
                  <p className="text-sm text-slate-600">{destination.location}</p>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recently viewed</h2>
          <div className="mt-5 space-y-4">
            {dashboard.user.recentlyViewed.length === 0 ? (
              <p className="text-sm text-slate-600">No recent views yet.</p>
            ) : (
              dashboard.user.recentlyViewed.map((destination) => (
                <Link key={destination._id} to={`/destinations/${destination._id}`} className="block rounded-2xl border border-slate-100 px-4 py-3 hover:bg-slate-50">
                  <p className="font-semibold text-slate-900">{destination.name}</p>
                  <p className="text-sm text-slate-600">{destination.location}</p>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Featured recommendations</h2>
          <div className="mt-5 space-y-4">
            {dashboard.featuredRecommendations.map((destination) => (
              <Link key={destination._id} to={`/destinations/${destination._id}`} className="block rounded-2xl border border-slate-100 px-4 py-3 hover:bg-slate-50">
                <p className="font-semibold text-slate-900">{destination.name}</p>
                <p className="text-sm text-slate-600">{destination.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
