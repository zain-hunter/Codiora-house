const trips = [
  { id: 1, title: 'Northern Adventure', destinations: ['Hunza', 'Skardu'], status: 'Planned' },
  { id: 2, title: 'Cultural Escape', destinations: ['Swat', 'Abbottabad'], status: 'In Progress' },
]

function TripsPage() {
  return (
    <div className="rounded-2rem border border-emerald-100 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Trip planner</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Your saved travel itineraries</h1>
        </div>
        <button className="rounded-full bg-emerald-700 px-4 py-2 font-semibold text-white">Create Trip</button>
      </div>

      <div className="mt-8 grid gap-4">
        {trips.map((trip) => (
          <div key={trip.id} className="rounded-[1.25rem] border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{trip.title}</h2>
                <p className="text-sm text-slate-600">Stops: {trip.destinations.join(', ')}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{trip.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TripsPage
