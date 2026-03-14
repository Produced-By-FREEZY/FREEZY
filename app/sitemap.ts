import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date()
  
  return [
    {
      url: 'https://www.freezy.ca',
      lastModified: lastMod,
      changeFrequency: 'daily', // Changed from yearly to daily so Google finds new beats fast
      priority: 1,
    },
    {
      url: 'https://www.freezy.ca/about',
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // IMPORTANT: Add your beats/store page here if it's a separate URL
    {
      url: 'https://www.freezy.ca/beats', 
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
