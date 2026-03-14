import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, beatTitle, beatId } = await request.json()

    console.log("[v0] Subscriber submission received:", { name, email, phone, beatTitle, beatId })

    // Validate input
    if (!name || (!email && !phone)) {
      console.error("[v0] Missing required fields:", { name, email, phone })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate environment variables
    if (!process.env.NOTION_API_KEY) {
      console.error("[v0] NOTION_API_KEY is not set")
      return NextResponse.json({ error: "Server configuration error: NOTION_API_KEY not set" }, { status: 500 })
    }

    if (!process.env.NOTION_SUBSCRIBERS_DATABASE_ID) {
      console.error("[v0] NOTION_SUBSCRIBERS_DATABASE_ID is not set")
      return NextResponse.json(
        { error: "Server configuration error: NOTION_SUBSCRIBERS_DATABASE_ID not set" },
        { status: 500 },
      )
    }

    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    })

    console.log("[v0] Attempting to create Notion page in Subscribers database...")

    // Create properties object
    const properties: any = {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      "Beat Title": {
        rich_text: [
          {
            text: {
              content: beatTitle || "Unknown",
            },
          },
        ],
      },
      "Beat ID": {
        rich_text: [
          {
            text: {
              content: beatId || "Unknown",
            },
          },
        ],
      },
    }

    // Add email or phone based on what was provided
    if (email) {
      properties.Email = {
        email: email,
      }
    }

    if (phone) {
      properties.Phone = {
        phone_number: phone,
      }
    }

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_SUBSCRIBERS_DATABASE_ID,
      },
      properties,
    })

    console.log("[v0] Successfully created Notion page:", response.id)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Subscriber submission error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      code: error.code,
      status: error.status,
    })

    if (error.body) {
      console.error("[v0] Notion API error body:", JSON.stringify(error.body, null, 2))
    }

    return NextResponse.json(
      {
        error: "Failed to subscribe. Please try again later.",
        details: error.message,
        hint: "Check that your Notion database has Name (title), Email (email), Phone (phone_number), Beat Title (text), and Beat ID (text) properties",
      },
      { status: 500 },
    )
  }
}
