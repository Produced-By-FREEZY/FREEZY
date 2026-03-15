export interface Product {
  id: string
  name: string
  description: string
  // Use number for paid tiers, null for "Contact for Pricing"
  priceInCents: number | null 
  features: string[]
}

// Beat licenses - source of truth for all beat license pricing
export const BEAT_LICENSES: Product[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for non-profit use and getting started",
    priceInCents: 2999, // $29.99
    features: ["MP3 Download", "Non-Profit Use", "2,000 Streams", "1 Music Video", "Tagged Version"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Most popular license for professional artists",
    priceInCents: 4999, // $49.99
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
    priceInCents: 9997, // $99.97
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
    id: "premium",
    name: "Premium",
    description: "Ultimate flexibility for high-level distribution",
    priceInCents: 19997, // $199.97
    features: [
      "WAV Download",
      "Trackout Stems",
      "Unlimited Streams",
      "Unlimited Music Videos",
      "Untagged Version",
      "All Files Included",
    ],
  },
  {
    id: "exclusive",
    name: "Exclusive",
    description: "Full ownership rights. Beat removed from store.",
    priceInCents: null, // Triggers "Contact for Pricing" UI
    features: [
      "Full Ownership Rights",
      "WAV + Trackout Stems",
      "Unlimited Streams",
      "Unlimited Music Videos",
      "Producer Credit Optional",
      "Beat Removed from Store",
    ],
  },
]

/**
 * Helper function to get license by ID
 * Ensures "Pro XL" or "Pro-XL" matches "pro-xl"
 */
export function getLicenseById(licenseId: string): Product | undefined {
  const normalizedId = licenseId.toLowerCase().trim().replace(/\s+/g, "-")
  return BEAT_LICENSES.find((license) => license.id === normalizedId)
}

/**
 * Helper function to get license by name
 */
export function getLicenseByName(licenseName: string): Product | undefined {
  return BEAT_LICENSES.find((license) => license.name.toLowerCase() === licenseName.toLowerCase())
}
