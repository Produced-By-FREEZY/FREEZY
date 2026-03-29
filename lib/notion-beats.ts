import { beatsData } from "./beats-data"

export async function fetchBeatsFromNotion(filters?: {
  search?: string
  genre?: string
  typeBeat?: string
}) {
  // Check if Notion is configured
  const isNotionConfigured = process.env.NOTION_API_KEY && process.env.NOTION_BEATS_DATABASE_ID

  if (!isNotionConfigured) {
    console.log("[v0] Notion not configured, using mock data")
    // Return filtered mock data
    return filterMockBeats(beatsData, filters)
  }

  try {
    const params = new URLSearchParams()
    if (filters?.search) params.append("search", filters.search)
    if (filters?.genre) params.append("genre", filters.genre)
    if (filters?.typeBeat) params.append("typeBeat", filters.typeBeat)

    const response = await fetch(`/api/beats?${params.toString()}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch beats")
    }

    const data = await response.json()
    return data.beats
  } catch (error) {
    console.error("[v0] Error fetching beats from Notion, falling back to mock data:", error)
    return filterMockBeats(beatsData, filters)
  }
}

function filterMockBeats(
  beats: any[],
  filters?: {
    search?: string
    genre?: string
    typeBeat?: string
  },
) {
  let filtered = [...beats]

  if (filters?.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (beat) =>
        beat.title.toLowerCase().includes(search) ||
        beat.typeBeat?.toLowerCase().includes(search) ||
        beat.tags.some((tag: string) => tag.toLowerCase().includes(search)),
    )
  }

  if (filters?.genre) {
    // UPDATED: Since beat.genres is now a string, we check if the selected 
    // genre string exists within that text.
    filtered = filtered.filter((beat) => 
      beat.genres.toLowerCase().includes(filters.genre!.toLowerCase())
    )
  }

  if (filters?.typeBeat) {
    filtered = filtered.filter((beat) => beat.typeBeat === filters.typeBeat)
  }

  return filtered
}
