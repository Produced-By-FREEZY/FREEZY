import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, agreed } = await request.json()

    // Validate input — require name, agreed, and at least one of email or phone
    if (!fullName || !agreed || (!email && !phone)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate environment variables
    if (!process.env.NOTION_API_KEY) {
      console.error("[v0] NOTION_API_KEY is not set")
      return NextResponse.json({ error: "Server configuration error: NOTION_API_KEY not set" }, { status: 500 })
    }

    if (!process.env.NOTION_NEWSLETTER_DATABASE_ID) {
      console.error("[v0] NOTION_NEWSLETTER_DATABASE_ID is not set")
      return NextResponse.json(
        { error: "Server configuration error: NOTION_NEWSLETTER_DATABASE_ID not set" },
        { status: 500 },
      )
    }

    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    })

    console.log("[v0] Attempting to create Notion page...")

    const properties: Record<string, any> = {
      "Subscriber Name": {
        rich_text: [{ text: { content: fullName } }],
      },
      Agreed: {
        select: { name: "Yes" },
      },
    }

    if (email) {
      properties["Email"] = {
        rich_text: [{ text: { content: email } }],
      }
    }

    if (phone) {
      properties["Phone"] = {
        rich_text: [{ text: { content: phone } }],
      }
    }

    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_NEWSLETTER_DATABASE_ID },
      properties,
    })

    console.log("[v0] Successfully created Notion page:", response.id)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Newsletter submission error:", error)
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
        hint: "Check that your Notion database has Email and Subscriber Name as Text properties, and Agreed as a Select property with 'Yes' option",
      },
      { status: 500 },
    )
  }
}
