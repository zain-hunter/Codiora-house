function DestinationsSection({ destinations }) {
  return (
    <section id="destinations" className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Popular places</p>
          <h2 className="text-3xl font-semibold text-slate-900">Explore legendary destinations</h2>
        </div>
        <a href="#contact" className="text-sm font-semibold text-emerald-700">
          Request a custom itinerary
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {destinations.map((place) => (
          <article key={place.name} className="overflow-hidden rounded-1.5rem border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <img src={place.image} alt={place.name} className="h-44 w-full object-cover" />
            <div className="p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{place.tag}</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{place.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{place.region}</p>
              <button className="mt-4 rounded-full border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                View details
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DestinationsSection
