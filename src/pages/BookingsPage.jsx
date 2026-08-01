const bookings = [
  { id: 1, destination: 'Hunza Valley', date: '2026-08-12', status: 'Confirmed' },
  { id: 2, destination: 'Gwadar Coast', date: '2026-09-01', status: 'Pending' },
]

function BookingsPage() {
  return (
    <div className="rounded-2rem border border-emerald-100 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Booking history</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">Track your upcoming adventures</h1>

      <div className="mt-8 grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex flex-wrap items-center justify-between rounded-[1.25rem] border border-slate-200 p-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{booking.destination}</h2>
              <p className="text-sm text-slate-600">Booked on {booking.date}</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{booking.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage
