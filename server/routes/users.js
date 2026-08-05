import express from 'express'
import Destination from '../models/destinationModel.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.get('/me', async (req, res) => {
  try {
    await req.user.populate('favorites')
    await req.user.populate('recentlyViewed')
    const featuredRecommendations = await Destination.find({ featured: true }).limit(4)

    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profileImage: req.user.profileImage,
        bio: req.user.bio,
        favorites: req.user.favorites,
        recentlyViewed: req.user.recentlyViewed,
      },
      featuredRecommendations,
      statistics: {
        favoriteCount: req.user.favorites.length,
        recentlyViewedCount: req.user.recentlyViewed.length,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Unable to load dashboard data', error: error.message })
  }
})

router.get('/favorites', async (req, res) => {
  try {
    await req.user.populate('favorites')
    res.json(req.user.favorites)
  } catch (error) {
    res.status(500).json({ message: 'Unable to load favorites', error: error.message })
  }
})

router.post('/favorites/:destinationId', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.destinationId)
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }
    const exists = req.user.favorites.some((item) => item.toString() === destination._id.toString())
    if (!exists) {
      req.user.favorites.push(destination._id)
      await req.user.save()
    }
    await req.user.populate('favorites')
    res.json(req.user.favorites)
  } catch (error) {
    res.status(500).json({ message: 'Unable to save favorite', error: error.message })
  }
})

router.delete('/favorites/:destinationId', async (req, res) => {
  try {
    req.user.favorites = req.user.favorites.filter((item) => item.toString() !== req.params.destinationId)
    await req.user.save()
    await req.user.populate('favorites')
    res.json(req.user.favorites)
  } catch (error) {
    res.status(500).json({ message: 'Unable to remove favorite', error: error.message })
  }
})

router.post('/recently-viewed', async (req, res) => {
  try {
    const { destinationId } = req.body
    const destination = await Destination.findById(destinationId)
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }

    req.user.recentlyViewed = req.user.recentlyViewed.filter((id) => id.toString() !== destinationId)
    req.user.recentlyViewed.unshift(destination._id)
    req.user.recentlyViewed = req.user.recentlyViewed.slice(0, 6)
    await req.user.save()
    await req.user.populate('recentlyViewed')
    res.json(req.user.recentlyViewed)
  } catch (error) {
    res.status(500).json({ message: 'Unable to update recently viewed', error: error.message })
  }
})

export default router
