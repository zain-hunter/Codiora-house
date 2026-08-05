import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' })
  }

  try {
    const secret = process.env.JWT_SECRET || 'default-secret'
    const decoded = jwt.verify(token, secret)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
