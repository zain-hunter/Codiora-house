function NotFoundPage() {
  return (
    <div className="rounded-2rem border border-emerald-100 bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">The link you followed may be outdated or has been moved.</p>
    </div>
  )
}

export default NotFoundPage
