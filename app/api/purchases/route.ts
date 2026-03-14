import { Client } from "@notionhq/client"
import { type NextRequest, NextResponse } from "next/server"

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerEmail,
      beatTitle,
      licenseName,
      amount,
      currency,
      stripeSessionId,
      lemonSqueezyOrderId,
      purchaseDate,
    } = body

    console.log("[v0] Recording purchase to Notion:", body)

    const databaseId = process.env.NOTION_PURCHASES_DATABASE_ID

    if (!databaseId) {
      console.error("[v0] NOTION_PURCHASES_DATABASE_ID not configured")
      return NextResponse.json({ error: "Purchases database not configured" }, { status: 500 })
    }

    const paymentId = lemonSqueezyOrderId || stripeSessionId || "Unknown"
    const paymentProvider = lemonSqueezyOrderId ? "Lemon Squeezy" : "Stripe"

    // Create purchase record in Notion
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "Customer Name": {
          title: [
            {
              text: {
                content: customerName || "Unknown",
              },
            },
          ],
        },
        Email: {
          email: customerEmail,
        },
        "Beat Title": {
          rich_text: [
            {
              text: {
                content: beatTitle,
              },
            },
          ],
        },
        License: {
          select: {
            name: licenseName,
          },
        },
        Amount: {
          number: amount,
        },
        Currency: {
          select: {
            name: currency.toUpperCase(),
          },
        },
        "Payment ID": {
          rich_text: [
            {
              text: {
                content: `${paymentProvider}: ${paymentId}`,
              },
            },
          ],
        },
        "Purchase Date": {
          date: {
            start: purchaseDate || new Date().toISOString(),
          },
        },
      },
    })

    console.log("[v0] Purchase recorded in Notion:", response.id)

    return NextResponse.json({ success: true, notionPageId: response.id })
  } catch (error: any) {
    console.error("[v0] Error recording purchase:", error)
    return NextResponse.json({ error: error.message || "Failed to record purchase" }, { status: 500 })
  }
}
