const destinations = [
  { id: 1, name: 'Hunza Valley', category: 'Adventure', price: '$320', rating: 4.9, description: 'Scenic karakoram roads, lakes, and culture.' },
  { id: 2, name: 'Skardu Lakes', category: 'Coastal', price: '$280', rating: 4.8, description: 'Majestic lakes with serene camping experiences.' },
  { id: 3, name: 'Swat Valley', category: 'Culture', price: '$240', rating: 4.7, description: 'Mountain villages and rich heritage walks.' },
  { id: 4, name: 'Gwadar Coast', category: 'Coastal', price: '$300', rating: 4.6, description: 'Golden beaches and coastal adventures.' },
]

function DestinationsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2rem border border-emerald-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Explore destinations</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Browse Pakistan’s best travel experiences</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Search by category, filter by region, and plan a family-friendly or eco-conscious trip.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {destinations.map((item) => (
          <article key={item.id} className="rounded-1.5rem border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{item.category}</span>
              <span className="text-sm font-semibold text-slate-700">⭐ {item.rating}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{item.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-emerald-700">{item.price}</span>
              <button className="rounded-full border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700">Book Now</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default DestinationsPage
