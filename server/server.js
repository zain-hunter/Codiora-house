import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import destinationsRouter from './routes/destinations.js'
import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import tripsRouter from './routes/trips.js'
import seedData from './seedData.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/destinations', destinationsRouter)
app.use('/api/trips', tripsRouter)

app.get('/api', (req, res) => {
  res.json({ message: 'Tourism API is running' })
})

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tourism'

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB')
    await seedData()
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  })
