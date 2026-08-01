const adminStats = [
  { label: 'Active Trips', value: '24' },
  { label: 'Bookings', value: '118' },
  { label: 'Destinations', value: '18' },
  { label: 'Pending Reviews', value: '7' },
]

const adminTables = [
  { title: 'Popular Destinations', items: ['Hunza Valley', 'Skardu Lakes', 'Fairy Meadows'] },
  { title: 'Recent Bookings', items: ['Ayesha - Hunza', 'Bilal - Swat', 'Nadia - Gwadar'] },
]

function AdminPanel() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      <div className="rounded-2rem border border-emerald-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Admin control center</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Manage tours, bookings, and content</h2>
          </div>
          <button className="rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800">
            Add New Destination
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {adminStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {adminTables.map((table) => (
            <div key={table.title} className="rounded-1.5rem border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">{table.title}</h3>
              <ul className="mt-4 space-y-3">
                {table.items.map((item) => (
                  <li key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
