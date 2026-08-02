import { Link } from 'react-router-dom'

function DestinationCard({ destination }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img src={destination.image} alt={destination.name} className="h-56 w-full object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{destination.category}</span>
          <span className="text-sm font-semibold text-slate-700">⭐ {destination.rating.toFixed(1)}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-slate-900">{destination.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{destination.location}, {destination.country}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{destination.description}</p>
        <div className="mt-6 flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
          <span>{destination.popularity} reviews</span>
          <Link
            to={`/destinations/${destination._id}`}
            className="rounded-full bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default DestinationCard
