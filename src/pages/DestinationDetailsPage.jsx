import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function DestinationDetailsPage() {
  const { id } = useParams()
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDestination() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`/api/destinations/${id}`)
        if (!response.ok) {
          const body = await response.json()
          throw new Error(body.message || 'Destination not found')
        }
        const data = await response.json()
        setDestination(data)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    loadDestination()
  }, [id])

  if (loading) {
    return <div className="rounded-3xl border border-emerald-100 bg-white p-8 text-center text-slate-700 shadow-sm">Loading destination details…</div>
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-100 bg-rose-50 p-8 text-center text-rose-700 shadow-sm">
        <p className="text-lg font-semibold">{error}</p>
        <Link to="/destinations" className="mt-4 inline-block rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
          Back to destinations
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-emerald-100 bg-white shadow-sm">
        <img src={destination.image} alt={destination.name} className="h-[32rem] w-full object-cover" />
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{destination.category}</span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Rating {destination.rating.toFixed(1)}</span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Popularity {destination.popularity}</span>
          </div>
          <h1 className="mt-6 text-4xl font-semibold text-slate-900">{destination.name}</h1>
          <p className="mt-3 text-lg text-slate-600">{destination.location}, {destination.country}</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">{destination.description}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/destinations" className="rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
              Back to destinations
            </Link>
            <button type="button" className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
              Book this trip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationDetailsPage
