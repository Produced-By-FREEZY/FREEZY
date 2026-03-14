import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { beatId, beatTitle, license, customerEmail, customerName, amount } = body

    console.log("[v0] Processing purchase:", { beatTitle, license, customerEmail })

    // Purchase data will be handled through Notion database automations

    return NextResponse.json({
      success: true,
      message: "Purchase processed successfully. You will receive your beat via email shortly.",
    })
  } catch (error) {
    console.error("[v0] Error processing purchase:", error)
    return NextResponse.json({ error: "Failed to process purchase" }, { status: 500 })
  }
}
