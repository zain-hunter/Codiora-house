import { useEffect, useMemo, useState } from 'react'

const emptyActivity = {
  title: '',
  location: '',
  date: '',
  time: '',
  category: 'Sightseeing',
  description: '',
}

const emptyTripForm = {
  tripName: '',
  destination: '',
  startDate: '',
  endDate: '',
  numberOfTravelers: 1,
  description: '',
  status: 'planned',
}

const categoryOptions = ['Sightseeing', 'Food', 'Adventure', 'Culture', 'Relaxation', 'Transport', 'Accommodation', 'General']

function TripsPage({ token }) {
  const [trips, setTrips] = useState([])
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [tripForm, setTripForm] = useState(emptyTripForm)
  const [activityForm, setActivityForm] = useState({ dayNumber: 1, ...emptyActivity })

  const stats = useMemo(() => {
    const upcoming = trips.filter((trip) => trip.status === 'planned' || trip.status === 'ongoing').length
    const completed = trips.filter((trip) => trip.status === 'completed').length
    const plannedDays = trips.reduce((total, trip) => {
      const start = new Date(trip.startDate)
      const end = new Date(trip.endDate)
      const diffDays = Math.max(1, Math.ceil((end - start) / 86400000) + 1)
      return total + diffDays
    }, 0)

    return { upcoming, completed, total: trips.length, plannedDays }
  }, [trips])

  const loadTrips = async () => {
    try {
      const response = await fetch('/api/trips', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) {
        throw new Error('Unable to load trips')
      }
      const data = await response.json()
      setTrips(data)
      if (data[0]) {
        setSelectedTrip(data[0])
      }
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTrips()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleCreateTrip = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tripForm),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Unable to create trip')
      }

      setTripForm(emptyTripForm)
      setSelectedTrip(data)
      const updatedTrips = [...trips, data]
      setTrips(updatedTrips)
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setSaving(false)
    }
  }

  const handleAddActivity = async (event) => {
    event.preventDefault()
    if (!selectedTrip) return

    const payload = {
      dayNumber: Number(activityForm.dayNumber || 1),
      activity: {
        title: activityForm.title,
        location: activityForm.location,
        date: activityForm.date,
        time: activityForm.time,
        category: activityForm.category,
        description: activityForm.description,
      },
    }

    try {
      const response = await fetch(`/api/trips/${selectedTrip._id}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Unable to add activity')
      }

      setSelectedTrip(data)
      setTrips((current) => current.map((trip) => (trip._id === data._id ? data : trip)))
      setActivityForm({ dayNumber: Number(activityForm.dayNumber || 1) + 1, ...emptyActivity })
    } catch (fetchError) {
      setError(fetchError.message)
    }
  }

  const handleDeleteActivity = async (activityId) => {
    if (!selectedTrip) return

    try {
      const response = await fetch(`/api/trips/${selectedTrip._id}/activities/${activityId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete activity')
      }
      setSelectedTrip(data)
      setTrips((current) => current.map((trip) => (trip._id === data._id ? data : trip)))
    } catch (fetchError) {
      setError(fetchError.message)
    }
  }

  const handleDeleteTrip = async (tripId) => {
    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Unable to delete trip')
      }
      const nextTrips = trips.filter((trip) => trip._id !== tripId)
      setTrips(nextTrips)
      setSelectedTrip(nextTrips[0] || null)
    } catch (fetchError) {
      setError(fetchError.message)
    }
  }

  if (loading) {
    return <div className="rounded-2xl border border-emerald-100 bg-white p-10 text-center text-slate-600">Loading your trip planner…</div>
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Trips</p><p className="mt-3 text-3xl font-semibold text-slate-900">{stats.total}</p></div>
        <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Upcoming</p><p className="mt-3 text-3xl font-semibold text-slate-900">{stats.upcoming}</p></div>
        <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Completed</p><p className="mt-3 text-3xl font-semibold text-slate-900">{stats.completed}</p></div>
        <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Planned days</p><p className="mt-3 text-3xl font-semibold text-slate-900">{stats.plannedDays}</p></div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.05fr_1.35fr]">
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Trip planner</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create your journey</h1>
            </div>
          </div>

          <form onSubmit={handleCreateTrip} className="mt-6 space-y-4">
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Trip name"
              value={tripForm.tripName}
              onChange={(e) => setTripForm({ ...tripForm, tripName: e.target.value })}
            />
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Destination"
              value={tripForm.destination}
              onChange={(e) => setTripForm({ ...tripForm, destination: e.target.value })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="date"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                value={tripForm.startDate}
                onChange={(e) => setTripForm({ ...tripForm, startDate: e.target.value })}
              />
              <input
                type="date"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                value={tripForm.endDate}
                onChange={(e) => setTripForm({ ...tripForm, endDate: e.target.value })}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="number"
                min="1"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="Travelers"
                value={tripForm.numberOfTravelers}
                onChange={(e) => setTripForm({ ...tripForm, numberOfTravelers: Number(e.target.value) || 1 })}
              />
              <select
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                value={tripForm.status}
                onChange={(e) => setTripForm({ ...tripForm, status: e.target.value })}
              >
                <option value="planned">Planned</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <textarea
              rows="4"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Trip description"
              value={tripForm.description}
              onChange={(e) => setTripForm({ ...tripForm, description: e.target.value })}
            />
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button type="submit" disabled={saving} className="w-full rounded-full bg-emerald-700 px-4 py-3 font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving…' : 'Create trip'}
            </button>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900">Saved trips</h2>
            <div className="mt-4 space-y-4">
              {trips.length === 0 ? (
                <p className="text-sm text-slate-600">No trips yet — start building a new plan.</p>
              ) : (
                trips.map((trip) => (
                  <button
                    key={trip._id}
                    type="button"
                    onClick={() => setSelectedTrip(trip)}
                    className={`w-full rounded-[1.25rem] border p-4 text-left transition ${selectedTrip?._id === trip._id ? 'border-emerald-700 bg-emerald-50' : 'border-slate-200 hover:border-emerald-200'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">{trip.tripName}</p>
                        <p className="text-sm text-slate-600">{trip.destination}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">{trip.status}</span>
                    </div>
                    <div className="mt-3 text-sm text-slate-500">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {selectedTrip ? (
            <>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Trip overview</p>
                    <h2 className="mt-2 text-3xl font-semibold text-slate-900">{selectedTrip.tripName}</h2>
                    <p className="mt-2 text-slate-600">{selectedTrip.destination} • {selectedTrip.numberOfTravelers} travelers</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteTrip(selectedTrip._id)}
                    className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600"
                  >
                    Delete trip
                  </button>
                </div>
                <p className="mt-4 text-slate-600">{selectedTrip.description || 'No description yet.'}</p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">Add itinerary activity</h3>
                <form onSubmit={handleAddActivity} className="mt-5 grid gap-4 md:grid-cols-2">
                  <input
                    type="number"
                    min="1"
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    placeholder="Day number"
                    value={activityForm.dayNumber}
                    onChange={(e) => setActivityForm({ ...activityForm, dayNumber: Number(e.target.value) || 1 })}
                  />
                  <input
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    placeholder="Activity title"
                    value={activityForm.title}
                    onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                  />
                  <input
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    placeholder="Location"
                    value={activityForm.location}
                    onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })}
                  />
                  <select
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    value={activityForm.category}
                    onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                  >
                    {categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  <input
                    type="date"
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    value={activityForm.date}
                    onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                  />
                  <input
                    type="time"
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    value={activityForm.time}
                    onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })}
                  />
                  <textarea
                    rows="3"
                    className="md:col-span-2 rounded-2xl border border-slate-200 px-4 py-3"
                    placeholder="Activity notes"
                    value={activityForm.description}
                    onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                  />
                  <button type="submit" className="md:col-span-2 rounded-full bg-emerald-700 px-4 py-3 font-semibold text-white">
                    Add activity
                  </button>
                </form>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">Itinerary</h3>
                <div className="mt-5 space-y-4">
                  {selectedTrip.itinerary.length === 0 ? (
                    <p className="text-sm text-slate-600">No itinerary planned yet.</p>
                  ) : (
                    selectedTrip.itinerary.map((day) => (
                      <div key={day._id || `${selectedTrip._id}-${day.dayNumber}`} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-lg font-semibold text-slate-900">Day {day.dayNumber}</p>
                          <span className="text-sm text-slate-500">{day.date || 'Flexible date'}</span>
                        </div>
                        <div className="mt-4 space-y-3">
                          {day.activities.length === 0 ? (
                            <p className="text-sm text-slate-500">No activities scheduled.</p>
                          ) : (
                            day.activities.map((activity) => (
                              <div key={activity._id} className="rounded-2xl border border-slate-200 bg-white p-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="font-semibold text-slate-900">{activity.title}</p>
                                    <p className="text-sm text-slate-600">{activity.location}</p>
                                  </div>
                                  <button type="button" onClick={() => handleDeleteActivity(activity._id)} className="text-sm font-medium text-rose-600">Remove</button>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                                  {activity.date && <span>{activity.date}</span>}
                                  {activity.time && <span>{activity.time}</span>}
                                  {activity.category && <span>{activity.category}</span>}
                                </div>
                                {activity.description && <p className="mt-2 text-sm text-slate-600">{activity.description}</p>}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
              Select a saved trip to review or edit the itinerary.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default TripsPage
