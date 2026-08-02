function DestinationFilters({ category, search, categories, onCategoryChange, onSearchChange, onClear }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[1.8fr_1fr]">
      <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm">
        <label className="block text-sm font-semibold text-slate-700">Search destinations</label>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name, country, or location"
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Filter</p>
            <p className="mt-1 text-sm text-slate-600">Browse by category</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            Clear
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <button
            type="button"
            onClick={() => onCategoryChange('')}
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${category === '' ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50'}`}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onCategoryChange(item)}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${category === item ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DestinationFilters
