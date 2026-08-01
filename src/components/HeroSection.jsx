function HeroSection({ title, subtitle, stats, featuredRoute }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
      <div className="space-y-6">
        <span className="inline-flex rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-sm font-medium text-emerald-700 shadow-sm">
          Sustainable tourism in Pakistan
        </span>
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">{subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <a href="#destinations" className="rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-800">
            Explore Destinations
          </a>
          <a href="#reviews" className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700">
            See Traveler Stories
          </a>
        </div>
        <div className="grid gap-4 pt-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm">
              <p className="text-xl font-semibold text-slate-900">{item.value}</p>
              <p className="text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2rem border border-emerald-100 bg-white/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
          alt="Beautiful mountain landscape in Pakistan"
          className="h-80 w-full rounded-1.5rem object-cover"
        />
        <div className="mt-4 rounded-[1.25rem] border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Featured route</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">{featuredRoute.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{featuredRoute.description}</p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
