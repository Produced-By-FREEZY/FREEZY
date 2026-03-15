import { NextResponse } from "next/server"



export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url)

    const featuredOnly = searchParams.get("featured") === "true"



    const notionApiKey = process.env.NOTION_API_KEY

    const databaseId = process.env.NOTION_BEATS_DATABASE_ID



    console.log("[v0] Beats API called, featured only:", featuredOnly)

    console.log("[v0] NOTION_API_KEY exists:", !!notionApiKey)

    console.log("[v0] NOTION_BEATS_DATABASE_ID exists:", !!databaseId)



    if (!notionApiKey || !databaseId) {

      console.log("[v0] Missing environment variables - returning empty array for v0 preview")

      return NextResponse.json({ beats: [] })

    }



    console.log("[v0] Fetching beats from Notion...")



    const requestBody: any = {

      sorts: [

        {

          property: "Created",

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

      return NextResponse.json(

        {

          error: "Failed to fetch from Notion",

          status: response.status,

          details: errorText,

        },

        { status: response.status },

      )

    }



    const data = await response.json()

    console.log("[v0] Notion response received, results count:", data.results?.length || 0)



    if (data.results?.[0]) {

      console.log("[v0] First beat properties available:", Object.keys(data.results[0].properties))

    }



    const beats = data.results.map((page: any) => {

      const props = page.properties



      const getText = (prop: any, propName = ""): string => {

        if (!prop) {

          console.log(`[v0] ${propName}: property is null/undefined`)

          return ""

        }



        // Try rich_text (Text properties in Notion)

        if (prop.type === "rich_text") {

          if (Array.isArray(prop.rich_text) && prop.rich_text.length > 0) {

            const text = prop.rich_text[0]?.plain_text || prop.rich_text[0]?.text?.content || ""

            return text

          }

        }



        // Try title (Title properties in Notion)

        if (prop.type === "title") {

          if (Array.isArray(prop.title) && prop.title.length > 0) {

            const text = prop.title[0]?.plain_text || prop.title[0]?.text?.content || ""

            return text

          }

        }



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



      const getSelect = (prop: any): string => {

        if (!prop || prop.type !== "select") return ""

        return prop.select?.name || ""

      }



      const getMultiSelect = (prop: any, propName = ""): string[] => {

        if (!prop) {

          console.log(`[v0] ${propName}: property is null/undefined`)

          return []

        }



        // Multi-select properties in Notion

        if (prop.type === "multi_select") {

          if (Array.isArray(prop.multi_select)) {

            const values = prop.multi_select.map((item: any) => item.name).filter((name: string) => name)

            console.log(`[v0] ${propName}: extracted multi-select values:`, values)

            return values

          }

        }



        return []

      }



      const genres = getMultiSelect(props["Genres"], "Genres")



      const moodsText = getText(props["Moods"], "Moods")

      const moods = moodsText

        ? moodsText

            .split(",")

            .map((m) => m.trim())

            .filter((m) => m)

        : []



      const tagsText = getText(props["Tags"], "Tags")

      const tags = tagsText

        ? tagsText

            .split(",")

            .map((tag) => tag.trim())

            .filter((tag) => tag)

        : []



      const soundsLike: string[] = []

      for (let i = 1; i <= 5; i++) {

        const soundsLikeValue = getText(props[`SoundsLike ${i}`], `SoundsLike ${i}`)

        if (soundsLikeValue) {

          soundsLike.push(soundsLikeValue)

        }

      }



      const beatName = getText(props["Beat name"], "Beat name")

      const isFeatured = getCheckbox(props["IsFeatured"])

      const isFree = getCheckbox(props["IsFree"])

      const producedBy = getText(props["Produced by"], "Produced by") || "FЯEEZY"

      const typeBeat = getText(props["TypeBeat"], "TypeBeat")

      const bpm = getNumber(props["BPM"])

      const key = getText(props["Key"], "Key")

      const imageUrl = getText(props["IMG URL"], "IMG URL")

      const mp3Url = getText(props["MP3 URL"], "MP3 URL")



      console.log(`[v0] Beat: "${beatName}", Featured: ${isFeatured}, Free: ${isFree}, Genres: ${genres.join(", ")}`)



      const beatData = {

        id: page.id,

        title: beatName || "Untitled Beat",

        artist: producedBy,

        price: isFree ? "FREE" : "$30.00",

        bpm: bpm,

        musicalKey: key,

        genres: genres,

        tags: tags,

        typeBeat: typeBeat,

        image: imageUrl || "/placeholder.svg?height=400&width=400",

        audioUrl: mp3Url || "",

        isFree: isFree,

        isFeatured: isFeatured,

        mood: moods,

        soundsLike: soundsLike,

      }



      console.log(`[v0] Transformed beat data:`, beatData)

      return beatData

    })



    console.log("[v0] Total beats transformed:", beats.length)

    console.log(

      "[v0] Beat titles:",

      beats.map((b: any) => b.title), // Fixed: added explicit 'any' type to 'b'

    )

    return NextResponse.json({ beats })

  } catch (error: any) {

    console.error("[v0] Error in beats API:", error)

    return NextResponse.json(

      {

        error: "Internal server error",

        message: error.message,

      },

      { status: 500 },

    )

  }

}
