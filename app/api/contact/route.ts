import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

export async function POST(request: Request) {
  try {
    console.log("[v0] Contact form submission received")

    const { name, email, subject, message } = await request.json()

    console.log("[v0] Form data:", { name, email, subject, messageLength: message?.length })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("[v0] Validation failed: missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[v0] Validation failed: invalid email format")
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const apiKey = process.env.NOTION_API_KEY
    const databaseId = process.env.NOTION_CONTACT_DATABASE_ID

    console.log("[v0] Environment check:", {
      hasApiKey: !!apiKey,
      apiKeyPrefix: apiKey?.substring(0, 10),
      hasDatabaseId: !!databaseId,
      databaseId: databaseId,
    })

    if (!apiKey) {
      console.error("[v0] Missing NOTION_API_KEY environment variable")
      return NextResponse.json({ error: "API key configuration missing" }, { status: 500 })
    }

    if (!databaseId) {
      console.error("[v0] Missing NOTION_CONTACT_DATABASE_ID environment variable")
      return NextResponse.json({ error: "Database configuration missing" }, { status: 500 })
    }

    // Initialize Notion client
    console.log("[v0] Initializing Notion client")
    const notion = new Client({
      auth: apiKey,
    })

    console.log("[v0] Creating Notion page with properties:", {
      databaseId,
      name,
      email,
      subject,
    })

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          rich_text: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        Subject: {
          rich_text: [
            {
              text: {
                content: subject,
              },
            },
          ],
        },
        Message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
      },
    })

    console.log("[v0] Notion page created successfully:", response.id)
    return NextResponse.json({ success: true, message: "Contact form submitted successfully" })
  } catch (error: any) {
    console.error("[v0] Error submitting contact form to Notion:")
    console.error("[v0] Error name:", error?.name)
    console.error("[v0] Error message:", error?.message)
    console.error("[v0] Error code:", error?.code)
    console.error("[v0] Error body:", JSON.stringify(error?.body, null, 2))
    console.error("[v0] Full error:", error)

    return NextResponse.json(
      {
        error: "Failed to submit contact form. Please try again later.",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}
