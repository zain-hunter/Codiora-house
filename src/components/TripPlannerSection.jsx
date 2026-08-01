function TripPlannerSection({ categories, steps }) {
  return (
    <section id="plans" className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-14">
      <div className="rounded-2rem border border-emerald-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Trip planner</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Build your own eco-friendly route</h2>
        <p className="mt-4 text-slate-600">
          Choose your region, style of stay, and pace. Then let us turn it into a flexible itinerary for your next adventure.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2rem border border-emerald-100 bg-emerald-50 p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-slate-900">Plan in three easy steps</h3>
        <div className="mt-6 space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <p className="text-sm text-slate-600">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TripPlannerSection
