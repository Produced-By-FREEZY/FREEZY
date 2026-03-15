import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featuredOnly = searchParams.get("featured") === "true"

    const notionApiKey = process.env.NOTION_API_KEY
    const databaseId = process.env.NOTION_BEATS_DATABASE_ID

    // Safety check for Environment Variables
    if (!notionApiKey || !databaseId) {
      console.error("[API] Missing Notion Environment Variables")
      return NextResponse.json({ beats: [] })
    }

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
      console.error("[API] Notion Error:", response.status, errorText)
      return NextResponse.json({ beats: [] })
    }

    const data = await response.json()

    const beats = (data.results || []).map((page: any) => {
      const props = page.properties || {}

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

      // Extract raw values with hard fallbacks to prevent frontend crashes
      const beatName = getText(props["Beat name"]) || "Untitled Beat"
      const basicPrice = getNumber(props["Basic Price"]) || 29.99
      const proPrice = getNumber(props["Pro Price"]) || 49.99
      const proXlPrice = getNumber(props["Pro XL Price"]) || 99.97
      const premiumPrice = getNumber(props["Premium Price"]) || 199.97
      const isFree = props["IsFree"]?.checkbox || false

      // Safely handle arrays (Crucial for preventing .map errors)
      const genres = props["Genres"]?.multi_select?.map((g: any) => g.name) || []
      const moodsText = getText(props["Moods"])
      const moods = moodsText ? moodsText.split(",").map((m: string) => m.trim()).filter(Boolean) : []
      const tagsText = getText(props["Tags"])
      const tags = tagsText ? tagsText.split(",").map((t: string) => t.trim()).filter(Boolean) : []

      return {
        id: page.id || Math.random().toString(),
        title: beatName,
        artist: getText(props["Produced by"]) || "FЯEEZY",
        
        // LEGACY DISPLAY PRICE (Used by the Marketplace Grid)
        price: isFree ? "FREE" : `$${basicPrice.toFixed(2)}`,
        
        bpm: getNumber(props["BPM"]) || 0,
        musicalKey: getText(props["Key"]) || "N/A",
        genres: genres,
        mood: moods,
        tags: tags,
        image: getText(props["IMG URL"]) || "/placeholder.svg",
        audioUrl: getText(props["MP3 URL"]) || "",
        isFree: isFree,
        isFeatured: props["IsFeatured"]?.checkbox || false,
        typeBeat: getText(props["TypeBeat"]) || "",
        
        // STRIPE CHECKOUT OBJECT (Used by the License Modal)
        prices: {
          basic: { id: getText(props["Basic Price ID"]), amount: basicPrice },
          pro: { id: getText(props["Pro Price ID"]), amount: proPrice },
          proXl: { id: getText(props["Pro XL Price ID"]), amount: proXlPrice },
          premium: { id: getText(props["Premium Price ID"]), amount: premiumPrice }
        }
      }
    })

    return NextResponse.json({ beats })
  } catch (error: any) {
    console.error("[API] Critical Failure:", error.message)
    // Return empty list so the UI shows "No beats" instead of crashing
    return NextResponse.json({ beats: [] })
  }
}
