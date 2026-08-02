import mongoose from 'mongoose'

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    popularity: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Destination = mongoose.model('Destination', destinationSchema)
export default Destination
