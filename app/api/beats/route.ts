import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featuredOnly = searchParams.get("featured") === "true"

    const notionApiKey = process.env.NOTION_API_KEY
    const databaseId = process.env.NOTION_BEATS_DATABASE_ID

    if (!notionApiKey || !databaseId) {
      console.log("[v0] Missing environment variables - returning empty array")
      return NextResponse.json({ beats: [] })
    }

    // Sort by "Created time" as seen in your Notion CSV
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
        checkbox: {
          equals: true,
        },
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
      return NextResponse.json({ error: "Failed to fetch from Notion" }, { status: response.status })
    }

    const data = await response.json()

    const beats = data.results.map((page: any) => {
      const props = page.properties

      // Robust helper to extract text from various Notion property types
      const getText = (prop: any): string => {
        if (!prop) return ""
        if (prop.type === "rich_text") return prop.rich_text[0]?.plain_text || ""
        if (prop.type === "title") return prop.title[0]?.plain_text || ""
        if (prop.type === "url") return prop.url || ""
        return ""
      }

      const getNumber = (prop: any): number => {
        if (!prop || prop.type !== "number") return 0
        return prop.number || 0
      }

      const getCheckbox = (prop: any): boolean => {
        if (!prop || prop.type !== "checkbox") return false
        return prop.checkbox || false
      }

      // Handle Genres (Multi-select)
      const genres = props["Genres"]?.multi_select?.map((g: any) => g.name) || []

      // Handle Moods (Comma separated text in your CSV)
      const moodsText = getText(props["Moods"])
      const moods = moodsText ? moodsText.split(",").map((m: string) => m.trim()) : []

      // Extract Price IDs exactly as named in your Notion CSV
      const basicPriceId = getText(props["Basic Price ID"])
      const proPriceId = getText(props["Pro Price ID"])
      const proXlPriceId = getText(props["Pro XL Price ID"])
      const premiumPriceId = getText(props["Premium Price ID"])

      // Extract Numeric Prices for display
      const basicPrice = getNumber(props["Basic Price"]) || 29.99
      const proPrice = getNumber(props["Pro Price"]) || 49.99
      const proXlPrice = getNumber(props["Pro XL Price"]) || 99.97
      const premiumPrice = getNumber(props["Premium Price"]) || 199.97

      const beatName = getText(props["Beat name"])
      const isFree = getCheckbox(props["IsFree"])

      return {
        id: page.id,
        title: beatName || "Untitled Beat",
        artist: getText(props["Produced by"]) || "FЯEEZY",
        // Fallback price string for simple displays
        price: isFree ? "FREE" : `$${basicPrice.toFixed(2)}`,
        bpm: getNumber(props["BPM"]),
        musicalKey: getText(props["Key"]),
        genres: genres,
        image: getText(props["IMG URL"]) || "/placeholder.svg",
        audioUrl: getText(props["MP3 URL"]),
        isFree: isFree,
        isFeatured: getCheckbox(props["IsFeatured"]),
        mood: moods,
        typeBeat: getText(props["TypeBeat"]),
        
        // This is the critical object that fixes "Failed to initialize checkout"
        prices: {
          basic: { id: basicPriceId, amount: basicPrice },
          pro: { id: proPriceId, amount: proPrice },
          proXl: { id: proXlPriceId, amount: proXlPrice },
          premium: { id: premiumPriceId, amount: premiumPrice }
        }
      }
    })

    return NextResponse.json({ beats })
  } catch (error: any) {
    console.error("[v0] Error in beats API:", error)
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    )
  }
}
