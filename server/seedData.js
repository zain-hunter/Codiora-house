import Destination from './models/destinationModel.js'

const sampleDestinations = [
  {
    name: 'Hunza Valley',
    country: 'Pakistan',
    location: 'Gilgit-Baltistan',
    description: 'A high-altitude valley of turquoise lakes, terraced orchards, and cultural heritage trails.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
    category: 'Adventure',
    rating: 4.9,
    popularity: 98,
    featured: true,
  },
  {
    name: 'Skardu Lakes',
    country: 'Pakistan',
    location: 'Baltistan',
    description: 'Crystal lakes and mountain camps perfect for trekking, photography, and quiet riverside nights.',
    image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=900&q=80',
    category: 'Wellness',
    rating: 4.8,
    popularity: 92,
    featured: true,
  },
  {
    name: 'Swat Valley',
    country: 'Pakistan',
    location: 'Khyber Pakhtunkhwa',
    description: 'Lush green valleys, cultural villages, and riverside resorts for families and explorers.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    category: 'Culture',
    rating: 4.7,
    popularity: 88,
    featured: false,
  },
  {
    name: 'Gwadar Coast',
    country: 'Pakistan',
    location: 'Balochistan',
    description: 'Golden beaches and coastal adventures with modern marinas and seaside dining.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
    category: 'Coastal',
    rating: 4.6,
    popularity: 84,
    featured: false,
  },
]

export default async function seedData() {
  const count = await Destination.countDocuments()
  if (count === 0) {
    await Destination.create(sampleDestinations)
    console.log('Seeded destination collection with sample data.')
  }
}
