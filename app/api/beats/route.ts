import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featuredOnly = searchParams.get("featured") === "true"

    const notionApiKey = process.env.NOTION_API_KEY
    const databaseId = process.env.NOTION_BEATS_DATABASE_ID

    if (!notionApiKey || !databaseId) {
      console.error("[v0] Missing Notion Environment Variables")
      return NextResponse.json({ beats: [] })
    }

    // Query Notion using the exact property name for sorting from your CSV
    const requestBody: any = {
      sorts: [
        {
          property: "Created time", 
          direction: "descending",
        },
      ],
    }

    if (featuredOnly) {
      requestBody.filter = {
        property: "IsFeatured",
        checkbox: { equals: true },
      }
    }

    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Notion API error:", response.status, errorText)
      // Return empty array instead of error object to prevent frontend crashes
      return NextResponse.json({ beats: [] })
    }

    const data = await response.json()

    const beats = data.results.map((page: any) => {
      const props = page.properties

      // Helper to safely get text values
      const getText = (prop: any): string => {
        if (!prop) return ""
        if (prop.type === "rich_text") return prop.rich_text[0]?.plain_text || ""
        if (prop.type === "title") return prop.title[0]?.plain_text || ""
        if (prop.type === "url") return prop.url || ""
        return ""
      }

      // Helper to safely get numeric values
      const getNumber = (prop: any): number => {
        if (!prop || prop.type !== "number") return 0
        return prop.number || 0
      }

      // 1. SAFE DATA EXTRACTION (with fallbacks)
      const beatName = getText(props["Beat name"]) || "Untitled Beat"
      const basicPrice = getNumber(props["Basic Price"]) || 29.99
      const isFree = props["IsFree"]?.checkbox || false

      // 2. SAFE ARRAY EXTRACTION (Prevents .map errors on frontend)
      const genres = props["Genres"]?.multi_select?.map((g: any) => g.name) || []
      const moodsText = getText(props["Moods"])
      const moods = moodsText ? moodsText.split(",").map((m: string) => m.trim()) : []
      const tagsText = getText(props["Tags"])
      const tags = tagsText ? tagsText.split(",").map((t: string) => t.trim()) : []

      // 3. SOUNDSLIKE FALLBACK
      const soundsLike: string[] = []
      for (let i = 1; i <= 5; i++) {
        const val = getText(props[`SoundsLike ${i}`])
        if (val) soundsLike.push(val)
      }

      return {
        id: page.id,
        title: beatName,
        artist: getText(props["Produced by"]) || "FЯEEZY",
        
        // LEGACY FIELD: Keeps the marketplace from crashing
        price: isFree ? "FREE" : `$${basicPrice.toFixed(2)}`,
        
        bpm: getNumber(props["BPM"]) || 0,
        musicalKey: getText(props["Key"]) || "N/A",
        genres: genres,
        mood: moods,
        tags: tags,
        soundsLike: soundsLike,
        image: getText(props["IMG URL"]) || "/placeholder.svg",
        audioUrl: getText(props["MP3 URL"]) || "",
        isFree: isFree,
        isFeatured: props["IsFeatured"]?.checkbox || false,
        typeBeat: getText(props["TypeBeat"]) || "",
        
        // CHECKOUT OBJECT: Critical for the License Modal
        prices: {
          basic: { id: getText(props["Basic Price ID"]), amount: basicPrice },
          pro: { id: getText(props["Pro Price ID"]), amount: getNumber(props["Pro Price"]) || 49.99 },
          proXl: { id: getText(props["Pro XL Price ID"]), amount: getNumber(props["Pro XL Price"]) || 99.97 },
          premium: { id: getText(props["Premium Price ID"]), amount: getNumber(props["Premium Price"]) || 199.97 }
        }
      }
    })

    return NextResponse.json({ beats })
  } catch (error: any) {
    console.error("[v0] Critical API Error:", error.message)
    // Return empty array on crash to allow frontend to stay alive
    return NextResponse.json({ beats: [] })
  }
}
