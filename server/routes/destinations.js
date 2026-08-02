import express from 'express'
import Destination from '../models/destinationModel.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query
    const filter = {}

    if (category) {
      filter.category = category
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { country: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ]
    }

    const destinations = await Destination.find(filter).sort({ featured: -1, popularity: -1, rating: -1 })
    res.json(destinations)
  } catch (error) {
    res.status(500).json({ message: 'Unable to load destinations', error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }
    res.json(destination)
  } catch (error) {
    res.status(500).json({ message: 'Unable to load destination', error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const destination = new Destination(req.body)
    await destination.save()
    res.status(201).json(destination)
  } catch (error) {
    res.status(400).json({ message: 'Unable to create destination', error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }

    res.json(destination)
  } catch (error) {
    res.status(400).json({ message: 'Unable to update destination', error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id)
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }
    res.json({ message: 'Destination removed' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete destination', error: error.message })
  }
})

export default router
