import express from 'express'
import Trip from '../models/tripModel.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

const normalizeActivity = (activity = {}, dayNumber = 1) => ({
  title: activity.title || 'New activity',
  location: activity.location || 'TBD',
  day: Number(activity.day ?? dayNumber),
  date: activity.date || '',
  time: activity.time || '',
  category: activity.category || 'General',
  description: activity.description || '',
})

const buildItineraryFromDates = (startDate, endDate) => {
  const days = []
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return days
  }

  let cursor = new Date(start)
  let dayNumber = 1

  while (cursor <= end) {
    const dateValue = new Date(cursor)
    days.push({
      dayNumber,
      date: dateValue.toISOString().slice(0, 10),
      title: `Day ${dayNumber}`,
      activities: [],
    })
    cursor.setDate(cursor.getDate() + 1)
    dayNumber += 1
  }

  return days
}

router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({ startDate: 1 })
    res.json(trips)
  } catch (error) {
    res.status(500).json({ message: 'Unable to load trips', error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id })
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' })
    }
    res.json(trip)
  } catch (error) {
    res.status(500).json({ message: 'Unable to load trip', error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const {
      tripName,
      destination,
      startDate,
      endDate,
      numberOfTravelers,
      description,
      status,
      itinerary,
    } = req.body

    if (!tripName || !destination || !startDate || !endDate) {
      return res.status(400).json({ message: 'Trip name, destination, start date, and end date are required' })
    }

    const validStatus = ['planned', 'ongoing', 'completed', 'cancelled'].includes(status)
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return res.status(400).json({ message: 'Start date must be before end date' })
    }

    const normalizedItinerary = Array.isArray(itinerary) && itinerary.length > 0
      ? itinerary.map((day, index) => ({
          dayNumber: Number(day.dayNumber || index + 1),
          date: day.date || new Date(start.getTime() + index * 86400000).toISOString().slice(0, 10),
          title: day.title || `Day ${index + 1}`,
          activities: Array.isArray(day.activities) ? day.activities.map((activity) => normalizeActivity(activity, index + 1)) : [],
        }))
      : buildItineraryFromDates(start, end)

    const trip = await Trip.create({
      user: req.user._id,
      tripName,
      destination,
      startDate: start,
      endDate: end,
      numberOfTravelers: Number(numberOfTravelers || 1),
      description: description || '',
      status: validStatus ? status : 'planned',
      itinerary: normalizedItinerary,
    })

    res.status(201).json(trip)
  } catch (error) {
    res.status(400).json({ message: 'Unable to create trip', error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id })
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' })
    }

    const { tripName, destination, startDate, endDate, numberOfTravelers, description, status, itinerary } = req.body

    if (tripName) trip.tripName = tripName
    if (destination) trip.destination = destination
    if (startDate) trip.startDate = new Date(startDate)
    if (endDate) trip.endDate = new Date(endDate)
    if (numberOfTravelers) trip.numberOfTravelers = Number(numberOfTravelers)
    if (description !== undefined) trip.description = description
    if (status) trip.status = ['planned', 'ongoing', 'completed', 'cancelled'].includes(status) ? status : trip.status

    if (itinerary) {
      trip.itinerary = itinerary.map((day, index) => ({
        dayNumber: Number(day.dayNumber || index + 1),
        date: day.date || '',
        title: day.title || `Day ${index + 1}`,
        activities: Array.isArray(day.activities) ? day.activities.map((activity) => normalizeActivity(activity, index + 1)) : [],
      }))
    }

    if (trip.startDate > trip.endDate) {
      return res.status(400).json({ message: 'Start date must be before end date' })
    }

    await trip.save()
    res.json(trip)
  } catch (error) {
    res.status(400).json({ message: 'Unable to update trip', error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' })
    }
    res.json({ message: 'Trip deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete trip', error: error.message })
  }
})

router.post('/:id/activities', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id })
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' })
    }

    const { dayNumber, activity } = req.body
    const normalizedDay = Number(dayNumber || 1)
    const targetDay = trip.itinerary.find((day) => day.dayNumber === normalizedDay)

    if (!targetDay) {
      const newDay = {
        dayNumber: normalizedDay,
        date: '',
        title: `Day ${normalizedDay}`,
        activities: [],
      }
      trip.itinerary.push(newDay)
      trip.itinerary.sort((a, b) => a.dayNumber - b.dayNumber)
    }

    const finalDay = trip.itinerary.find((day) => day.dayNumber === normalizedDay)
    finalDay.activities.push(normalizeActivity(activity, normalizedDay))
    await trip.save()
    res.status(201).json(trip)
  } catch (error) {
    res.status(400).json({ message: 'Unable to add activity', error: error.message })
  }
})

router.put('/:tripId/activities/:activityId', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, user: req.user._id })
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' })
    }

    let updated = false
    trip.itinerary.forEach((day) => {
      const activityIndex = day.activities.findIndex((item) => item._id.toString() === req.params.activityId)
      if (activityIndex !== -1) {
        const nextActivity = { ...day.activities[activityIndex].toObject(), ...req.body }
        day.activities[activityIndex] = normalizeActivity(nextActivity, day.dayNumber)
        updated = true
      }
    })

    if (!updated) {
      return res.status(404).json({ message: 'Activity not found' })
    }

    await trip.save()
    res.json(trip)
  } catch (error) {
    res.status(400).json({ message: 'Unable to update activity', error: error.message })
  }
})

router.delete('/:tripId/activities/:activityId', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, user: req.user._id })
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' })
    }

    let removed = false
    trip.itinerary = trip.itinerary.map((day) => {
      const before = day.activities.length
      day.activities = day.activities.filter((item) => {
        const match = item._id.toString() !== req.params.activityId
        if (!match) removed = true
        return match
      })
      return before !== day.activities.length ? day : day
    })

    if (!removed) {
      return res.status(404).json({ message: 'Activity not found' })
    }

    await trip.save()
    res.json(trip)
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete activity', error: error.message })
  }
})

export default router
