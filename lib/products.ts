export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
}

// Beat licenses - source of truth for all beat license pricing
export const BEAT_LICENSES: Product[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for non-profit use and getting started",
    priceInCents: 3000, // $30.00 CAD
    features: ["MP3 Download", "Non-Profit Use", "2,000 Streams", "1 Music Video", "Tagged Version"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Most popular license for professional artists",
    priceInCents: 7500, // $75.00 CAD
    features: [
      "WAV Download",
      "For-Profit Use",
      "10,000 Streams",
      "3 Music Videos",
      "Untagged Version",
      "Trackout Stems",
    ],
  },
  {
    id: "pro-xl",
    name: "Pro XL",
    description: "Extended license for serious releases",
    priceInCents: 10000, // $100.00 CAD
    features: [
      "WAV Download",
      "Trackout Stems",
      "Unlimited Streams",
      "Unlimited Music Videos",
      "Untagged Version",
      "Distribution Copies: 5,000",
    ],
  },
]

// Helper function to get license by ID
export function getLicenseById(licenseId: string): Product | undefined {
  return BEAT_LICENSES.find((license) => license.id === licenseId.toLowerCase().replace(/\s+/g, "-"))
}

// Helper function to get license by name
export function getLicenseByName(licenseName: string): Product | undefined {
  return BEAT_LICENSES.find((license) => license.name.toLowerCase() === licenseName.toLowerCase())
}
