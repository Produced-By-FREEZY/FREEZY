"use server"

import { stripe } from "@/lib/stripe"

export async function startCheckoutSession(
  priceId: string,           // Argument 1: The ID from Notion (e.g., price_1TAxt...)
  productName: string,       // Argument 2
  productDescription: string, // Argument 3
  priceInCents: number,      // Argument 4
  productImage?: string      // Argument 5
) {
  console.log("[v0] Starting checkout session for:", productName, "PriceID:", priceId)

  // Validate that we actually have a Price ID to send to Stripe
  if (!priceId || priceId === "") {
    console.error("[v0] Missing Price ID for product:", productName)
    throw new Error("Price ID is required to start checkout")
  }

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // We use the direct Price ID from your Notion database here
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      // Metadata allows you to see exactly what was bought in your Stripe Dashboard logs
      metadata: {
        beat_name: productName,
        license_description: productDescription,
      },
      // return_url handles the redirection after the embedded checkout is completed
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.freezy.ca"}/success?session_id={CHECKOUT_SESSION_ID}`,
    })

    console.log("[v0] Checkout session created:", session.id)

    if (!session.client_secret) {
      console.error("[v0] No client secret in session response")
      throw new Error("Failed to create checkout session")
    }

    return session.client_secret
  } catch (error: any) {
    console.error("[v0] Stripe session creation error:", error)
    // If Stripe returns a specific error (like an invalid Price ID), this sends it to the frontend
    throw new Error(error.message || "Stripe session creation failed")
  }
}
