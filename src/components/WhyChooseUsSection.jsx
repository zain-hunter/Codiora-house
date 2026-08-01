function WhyChooseUsSection({ highlights }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="grid gap-8 rounded-2rem border border-emerald-100 bg-slate-900 p-8 text-white lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Why travel with us</p>
          <h2 className="mt-3 text-3xl font-semibold">A cleaner, richer way to experience Pakistan</h2>
          <p className="mt-4 text-slate-300">
            Our platform combines scenic discovery, low-impact stays, and community-led guidance so every journey feels meaningful.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
