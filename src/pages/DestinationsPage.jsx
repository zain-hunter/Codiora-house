import { useEffect, useMemo, useState } from 'react'
import DestinationCard from '../components/DestinationCard'
import DestinationFilters from '../components/DestinationFilters'

const categories = ['Adventure', 'Culture', 'Coastal', 'Wellness', 'Family']

function DestinationsPage() {
  const [destinations, setDestinations] = useState([])
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function loadDestinations() {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (search) params.append('search', search)

        const response = await fetch(`/api/destinations${params.toString() ? `?${params.toString()}` : ''}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load destinations')
        }

        const data = await response.json()
        setDestinations(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      } finally {
        setLoading(false)
      }
    }

    loadDestinations()
    return () => controller.abort()
  }, [category, search])

  const resultMessage = useMemo(() => {
    if (loading) return 'Loading destinations…'
    if (error) return error
    if (destinations.length === 0) return 'No destinations match your search.'
    return `${destinations.length} destination${destinations.length === 1 ? '' : 's'} found.`
  }, [destinations.length, error, loading])

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Explore destinations</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Browse Pakistan’s best travel experiences</h1>
        <p className="mt-4 max-w-2xl text-slate-600">Search by category, filter by region, and explore detailed destination pages powered by MongoDB.</p>
      </div>

      <DestinationFilters
        category={category}
        search={search}
        categories={categories}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
        onClear={() => {
          setCategory('')
          setSearch('')
        }}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-700">{resultMessage}</p>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-10 text-center text-slate-700 shadow-sm">Loading destinations…</div>
      ) : error ? (
        <div className="rounded-[2rem] border border-rose-100 bg-rose-50 p-10 text-center text-rose-700 shadow-sm">{error}</div>
      ) : destinations.length === 0 ? (
        <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-10 text-center text-amber-700 shadow-sm">No destinations match your filters. Try another category or keyword.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DestinationsPage
