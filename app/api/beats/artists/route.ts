import { NextResponse } from "next/server"

export async function GET() {
  try {
    const notionApiKey = process.env.NOTION_API_KEY
    const databaseId = process.env.NOTION_BEATS_DATABASE_ID

    if (!notionApiKey || !databaseId) {
      return NextResponse.json({ error: "Missing Notion configuration" }, { status: 500 })
    }

    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: "Failed to fetch from Notion", details: errorText },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Extract unique TypeBeat values
    const artistsSet = new Set<string>()

    data.results.forEach((page: any) => {
      const typeBeatProp = page.properties["TypeBeat"]
      if (typeBeatProp?.type === "rich_text" && typeBeatProp.rich_text?.[0]?.plain_text) {
        const artist = typeBeatProp.rich_text[0].plain_text.trim()
        if (artist) {
          artistsSet.add(artist)
        }
      }
    })

    // Convert to sorted array
    const artists = Array.from(artistsSet).sort()

    return NextResponse.json({ artists })
  } catch (error: any) {
    console.error("[v0] Error fetching artists:", error)
    return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 })
  }
}
