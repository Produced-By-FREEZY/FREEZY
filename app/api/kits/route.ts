import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featuredOnly = searchParams.get("featured") === "true"

    const notionApiKey = process.env.NOTION_API_KEY
    const databaseId = process.env.NOTION_KITS_DATABASE_ID

    console.log("[v0] Kits API called, featured only:", featuredOnly)
    console.log("[v0] NOTION_API_KEY exists:", !!notionApiKey)
    console.log("[v0] NOTION_BEATS_DATABASE_ID exists:", !!databaseId)

    if (!notionApiKey || !databaseId) {
      console.log("[v0] Missing environment variables - returning empty array for v0 preview")
      return NextResponse.json({ kits: [] })
    }

    console.log("[v0] Fetching kits from Notion...")

    const requestBody: any = {
      sorts: [
        {
          property: "Created Date",
          direction: "descending",
        },
      ],
    }

    if (featuredOnly) {
      requestBody.filter = {
        property: "Is Featured",
        checkbox: {
          equals: true,
        },
      };
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
      console.log("[v0] First kit properties available:", Object.keys(data.results[0].properties))
      const kitNameProp = data.results[0].properties["Kit Name"]
      console.log("[v0] Kit Name property:", JSON.stringify(kitNameProp, null, 2))
    }

    // Transform Notion data to Kit format
    const kits = data.results.map((page: any) => {
      const props = page.properties

      const getText = (prop: any, propName = ""): string => {
        if (!prop) {
          console.log(`[v0] ${propName}: property is null/undefined`)
          return ""
        }

        console.log(`[v0] ${propName}: type = ${prop.type}`)

        // Try rich_text (Text properties in Notion)
        if (prop.type === "rich_text") {
          if (Array.isArray(prop.rich_text) && prop.rich_text.length > 0) {
            const text = prop.rich_text[0]?.plain_text || prop.rich_text[0]?.text?.content || ""
            console.log(`[v0] ${propName}: extracted from rich_text = "${text}"`)
            return text
          }
          console.log(`[v0] ${propName}: rich_text array is empty`)
        }

        // Try title (Title properties in Notion)
        if (prop.type === "title") {
          if (Array.isArray(prop.title) && prop.title.length > 0) {
            const text = prop.title[0]?.plain_text || prop.title[0]?.text?.content || ""
            console.log(`[v0] ${propName}: extracted from title = "${text}"`)
            return text
          }
          console.log(`[v0] ${propName}: title array is empty`)
        }

        console.log(`[v0] ${propName}: no text found, returning empty string`)
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

      console.log(`[v0] === Extracting Preview Links for Kit ===`)
      const previewUrls = []

      for (let i = 1; i <= 8; i++) {
        const propName = `Preview Link ${i}`
        const prop = props[propName]

        const rawUrl = getText(prop, propName)
        const trimmedUrl = rawUrl ? rawUrl.trim() : ""

        console.log(`[v0] ${propName}:`, {
          raw: rawUrl,
          trimmed: trimmedUrl,
          length: trimmedUrl.length,
          isEmpty: !trimmedUrl || trimmedUrl.length === 0,
        })

        // Only add if URL is non-empty and looks like a valid URL
        if (
          trimmedUrl &&
          trimmedUrl.length > 0 &&
          (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://"))
        ) {
          previewUrls.push(trimmedUrl)
          console.log(`[v0] ${propName} ✓ ADDED to array`)
        } else {
          console.log(`[v0] ${propName} ✗ SKIPPED (empty or invalid)`)
        }
      }

      console.log(`[v0] Final preview URLs array (${previewUrls.length} items):`, previewUrls)

      const tagsText = getText(props["Tags"], "Tags")
      const tags = tagsText
        ? tagsText
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : []

      const kitNameProp = props["Kit Name"]
      console.log(`[v0] Extracting Kit Name for page ${page.id}`)
      const kitName = getText(kitNameProp, "Kit Name")
      console.log(`[v0] Final Kit Name value: "${kitName}"`)

      const isFeatured = getCheckbox(props["Is Featured"])

      console.log(`[v0] Kit: "${kitName}", Featured: ${isFeatured}, Tags: ${tags.join(", ")}`)

      const styleMood1 = getText(props["Style/Mood Option 1"], "Style/Mood Option 1")
      const styleMood2 = getText(props["Style/Mood Option 2"], "Style/Mood Option 2")
      const styleMood3 = getText(props["Style/Mood Option 3"], "Style/Mood Option 3")

      const moods = [styleMood1, styleMood2, styleMood3].filter((mood) => mood)

      const kitData = {
        id: page.id,
        title: kitName || "Untitled Kit",
        price: getNumber(props["Price"]),
        image: getText(props["Image URL"], "Image URL") || "/placeholder.svg?height=400&width=400",
        category: getSelect(props["Category"]) || "SAMPLE PACK",
        description: getText(props["Description"], "Description"),
        isFeatured: isFeatured,
        createdBy: getText(props["Created By"], "Created By") || "FЯEEZY",
        previewUrls: previewUrls,
        tags: tags,
        moods: moods,
        fileSize: getText(props["File Size"], "File Size"), // e.g., "1.2 GB"
        itemCount: getNumber(props["Item Count"]), // e.g., 250
        fileTypes: getText(props["File Types"], "File Types"), // e.g., "WAV, MIDI, Presets"
      }

      console.log(`[v0] Transformed kit data:`, kitData)
      return kitData
    })

    console.log("[v0] Total kits transformed:", kits.length)
    console.log(
      "[v0] Kit titles:",
      kits.map((k: any) => k.title), // Added explicit :any type here
    )
    return NextResponse.json({ kits })
  } catch (error: any) {
    console.error("[v0] Error in kits API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 },
    )
  }
}
