import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    day: { type: Number, required: true, min: 1 },
    date: { type: String, default: '' },
    time: { type: String, default: '' },
    category: { type: String, default: 'General' },
    description: { type: String, default: '' },
  },
  { timestamps: true },
)

const itineraryDaySchema = new mongoose.Schema(
  {
    dayNumber: { type: Number, required: true, min: 1 },
    date: { type: String, default: '' },
    title: { type: String, default: '' },
    activities: [activitySchema],
  },
  { timestamps: true },
)

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tripName: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numberOfTravelers: { type: Number, required: true, min: 1, default: 1 },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['planned', 'ongoing', 'completed', 'cancelled'],
      default: 'planned',
    },
    itinerary: [itineraryDaySchema],
  },
  { timestamps: true },
)

tripSchema.index({ user: 1, createdAt: -1 })

const Trip = mongoose.model('Trip', tripSchema)
export default Trip
