const stats = [
  { label: 'Total Users', value: '128' },
  { label: 'Bookings', value: '86' },
  { label: 'Destinations', value: '18' },
  { label: 'Revenue', value: '$24k' },
]

function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2rem border border-emerald-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Admin dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Platform management overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.25rem] border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-1.5rem border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Manage destinations</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="rounded-xl border border-slate-200 p-3">Hunza Valley — Featured</li>
            <li className="rounded-xl border border-slate-200 p-3">Skardu Lakes — Updated</li>
            <li className="rounded-xl border border-slate-200 p-3">Gwadar Coast — New</li>
          </ul>
        </div>

        <div className="rounded-1.5rem border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Booking review</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="rounded-xl border border-slate-200 p-3">Ayesha — Hunza Valley</li>
            <li className="rounded-xl border border-slate-200 p-3">Bilal — Swat Valley</li>
            <li className="rounded-xl border border-slate-200 p-3">Nadia — Skardu Lakes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
