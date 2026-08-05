import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    profileImage: { type: String, default: '' },
    bio: { type: String, default: '' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
    recentlyViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)
export default User
