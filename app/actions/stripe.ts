"use server"

import { stripe } from "@/lib/stripe"

export async function startCheckoutSession(
  productName: string,
  productDescription: string,
  priceInCents: number,
  productImage?: string,
) {
  console.log("[v0] Starting checkout session for:", productName, "Price:", priceInCents)

  // Validate price
  if (priceInCents <= 0) {
    console.error("[v0] Invalid price:", priceInCents)
    throw new Error("Invalid price")
  }

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              description: productDescription,
              ...(productImage && { images: [productImage] }),
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // This metadata helps you identify the specific beat in Stripe/Webhooks
      metadata: {
        beat_name: productName,
      },
      // Updated return_url to match your new success page
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.freezy.ca"}/success?session_id={CHECKOUT_SESSION_ID}`,
    })

    console.log("[v0] Checkout session created:", session.id)

    if (!session.client_secret) {
      console.error("[v0] No client secret in session response")
      throw new Error("Failed to create checkout session")
    }

    return session.client_secret
  } catch (error) {
    console.error("[v0] Stripe session creation error:", error)
    throw error
  }
}
