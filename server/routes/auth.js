import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const router = express.Router()

const createToken = (id) => {
  const secret = process.env.JWT_SECRET || 'default-secret'
  return jwt.sign({ id }, secret, { expiresIn: '7d' })
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, profileImage, bio } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      profileImage,
      bio,
    })

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
      },
      token: createToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: 'Unable to create user', error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
      },
      token: createToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: 'Unable to login', error: error.message })
  }
})

export default router
