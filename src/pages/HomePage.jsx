import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import DestinationsSection from '../components/DestinationsSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import TripPlannerSection from '../components/TripPlannerSection'
import ReviewsSection from '../components/ReviewsSection'

const destinations = [
  {
    name: 'Hunza Valley',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
    tag: 'Mountain Escape',
  },
  {
    name: 'Skardu Lakes',
    region: 'Baltistan',
    image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=900&q=80',
    tag: 'Crystal Waters',
  },
  {
    name: 'Swat Valley',
    region: 'Khyber Pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    tag: 'Green Meadows',
  },
  {
    name: 'Gwadar Coast',
    region: 'Balochistan',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
    tag: 'Sea Breeze',
  },
]

const heroStats = [
  { value: '25+', label: 'handpicked spots' },
  { value: '4.9/5', label: 'traveler rating' },
  { value: '100%', label: 'eco-conscious stays' },
]

const highlights = [
  'Handpicked eco-friendly stays',
  'Local guides rooted in community travel',
  'Flexible trip planning for families and explorers',
]

const reviews = [
  { name: 'Ayesha K.', text: 'The itinerary felt thoughtful, scenic, and incredibly easy to follow.' },
  { name: 'Bilal R.', text: 'A beautiful way to experience Pakistan responsibly and comfortably.' },
]

const categories = ['Adventure', 'Culture', 'Coastal', 'Wellness', 'Family']
const tripSteps = [
  'Select your dream destination and travel month',
  'Choose experience themes like trekking, culture, or coast',
  'Confirm your stay, transport, and local guide support',
]

function HomePage() {
  return (
    <>
      <HeroSection
        title="Discover Pakistan’s living landscapes, one unforgettable journey at a time."
        subtitle="From the emerald valleys of Swat to the blue waters of Skardu, build a responsible travel experience shaped by nature, culture, and local communities."
        stats={heroStats}
        featuredRoute={{ title: 'Northern Adventure Loop', description: 'A 7-day journey through Hunza, Skardu, and Fairy Meadows with eco-lodges and cultural visits.' }}
      />
      <DestinationsSection destinations={destinations} />
      <WhyChooseUsSection highlights={highlights} />
      <TripPlannerSection categories={categories} steps={tripSteps} />
      <ReviewsSection reviews={reviews} />

      <section id="contact" className="mx-auto max-w-7xl px-2 pb-10 pt-6">
        <div className="rounded-2rem border border-emerald-100 bg-gradient-to-red from-emerald-700 to-teal-600 p-8 text-white shadow-lg lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100">Ready to begin</p>
              <h2 className="mt-2 text-3xl font-semibold">Let’s craft your next Pakistan escape.</h2>
              <p className="mt-3 max-w-2xl text-emerald-50">Share your dates, interests, and travel style and we will shape a route around your pace.</p>
            </div>
            <Link to="/auth" className="rounded-full bg-white px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50">Start Planning</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
