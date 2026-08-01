function ReviewsSection({ reviews }) {
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Traveler stories</p>
        <h2 className="text-3xl font-semibold text-slate-900">What visitors love most</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-1.5rem border border-emerald-100 bg-white p-6 shadow-sm">
            <p className="text-lg text-slate-700">“{review.text}”</p>
            <p className="mt-4 font-semibold text-slate-900">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ReviewsSection
