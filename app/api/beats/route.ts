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

    const requestBody: any = {
      sorts: [
        {
          property: "Created time", // Updated to match your CSV column name
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
      return NextResponse.json({ error: "Failed to fetch from Notion" }, { status: response.status })
    }

    const data = await response.json()

    const beats = data.results.map((page: any) => {
      const props = page.properties

      // Helper to extract Text from Notion
      const getText = (prop: any): string => {
        if (!prop) return ""
        if (prop.type === "rich_text") return prop.rich_text[0]?.plain_text || ""
        if (prop.type === "title") return prop.title[0]?.plain_text || ""
        if (prop.type === "url") return prop.url || ""
        return ""
      }

      // Helper to extract Numbers from Notion
      const getNumber = (prop: any): number => {
        if (!prop || prop.type !== "number") return 0
        return prop.number || 0
      }

      // Helper to extract Checkbox from Notion
      const getCheckbox = (prop: any): boolean => {
        if (!prop || prop.type !== "checkbox") return false
        return prop.checkbox || false
      }

      // Map genres and moods from your CSV columns
      const genresText = getText(props["Genres"])
      const genres = genresText ? genresText.split(",").map((g: string) => g.trim()) : []
      
      const moodsText = getText(props["Moods"])
      const moods = moodsText ? moodsText.split(",").map((m: string) => m.trim()) : []

      // EXTRACTING STRIPE IDs (Must match CSV column names exactly)
      const basicPriceId = getText(props["Basic Price ID"])
      const proPriceId = getText(props["Pro Price ID"])
      const proXlPriceId = getText(props["Pro XL Price ID"])
      const exclusivePriceId = getText(props["Exclusive Price ID"])

      // EXTRACTING NUMERIC PRICES (Must match CSV column names)
      const basicPrice = getNumber(props["Basic Price"]) || 29.99
      const proPrice = getNumber(props["Pro Price"]) || 49.99
      const proXlPrice = getNumber(props["Pro XL Price"]) || 99.99

      return {
        id: page.id,
        title: getText(props["Beat name"]) || "Untitled Beat",
        artist: getText(props["Produced by"]) || "FЯEEZY",
        bpm: getNumber(props["BPM"]),
        musicalKey: getText(props["Key"]),
        genres: genres,
        image: getText(props["IMG URL"]) || "/placeholder.svg",
        audioUrl: getText(props["MP3 URL"]),
        isFree: getCheckbox(props["IsFree"]),
        isFeatured: getCheckbox(props["IsFeatured"]),
        mood: moods,
        typeBeat: getText(props["TypeBeat"]),
        
        // This object is what the Checkout modal uses to show info and charge the user
        prices: {
          basic: { id: basicPriceId, amount: basicPrice },
          pro: { id: proPriceId, amount: proPrice },
          proXl: { id: proXlPriceId, amount: proXlPrice },
          exclusive: { id: exclusivePriceId, amount: 997.99 }
        }
      }
    })

    return NextResponse.json({ beats })
  } catch (error: any) {
    console.error("[v0] Error in beats API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
