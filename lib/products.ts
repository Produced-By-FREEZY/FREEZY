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
    priceInCents: 2999, // Updated to $29.99
    features: ["MP3 Download", "Non-Profit Use", "2,000 Streams", "1 Music Video", "Tagged Version"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Most popular license for professional artists",
    priceInCents: 4999, // Updated to $49.99
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
    priceInCents: 9997, // Updated to $99.97
    features: [
      "WAV Download",
      "Trackout Stems",
      "Unlimited Streams",
      "Unlimited Music Videos",
      "Untagged Version",
      "Distribution Copies: 5,000",
    ],
  },
  {
    id: "premium", // Added the 4th tier
    name: "Premium",
    description: "Ultimate flexibility for high-level distribution",
    priceInCents: 19997, // Updated to $199.97
    features: [
      "WAV Download",
      "Trackout Stems",
      "Unlimited Streams",
      "Unlimited Music Videos",
      "Untagged Version",
      "All Files Included",
      "Full Ownership Rights",
    ],
  },
]

// Helper function to get license by ID
export function getLicenseById(licenseId: string): Product | undefined {
  // Cleans up the ID to ensure matching (e.g., "Pro XL" becomes "pro-xl")
  return BEAT_LICENSES.find((license) => license.id === licenseId.toLowerCase().replace(/\s+/g, "-"))
}

// Helper function to get license by name
export function getLicenseByName(licenseName: string): Product | undefined {
  return BEAT_LICENSES.find((license) => license.name.toLowerCase() === licenseName.toLowerCase())
}
