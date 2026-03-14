"use client"

import { useCallback, useEffect, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { startCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeCheckoutProps {
  productName: string
  productDescription: string
  priceInCents: number
  productImage?: string
}

export default function StripeCheckout({
  productName,
  productDescription,
  priceInCents,
  productImage,
}: StripeCheckoutProps) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("[v0] StripeCheckout mounted with:", { productName, priceInCents })

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      console.error("[v0] Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY")
      setError("Stripe is not configured")
    }
  }, [productName, priceInCents])

  const fetchClientSecret = useCallback(async () => {
    console.log("[v0] Fetching client secret...")
    try {
      const clientSecret = await startCheckoutSession(productName, productDescription, priceInCents, productImage)
      console.log("[v0] Client secret received")
      return clientSecret
    } catch (err) {
      console.error("[v0] Error fetching client secret:", err)
      setError("Failed to initialize checkout")
      throw err
    }
  }, [productName, productDescription, priceInCents, productImage])

  const appearance = {
    theme: "night" as const,
    variables: {
      colorPrimary: "#8c52ff",
      colorBackground: "#0a0a0a",
      colorText: "#ffffff",
      colorDanger: "#ef4444",
      fontFamily: "system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "8px",
    },
  }

  if (error) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-red-500">{error}</p>
        <p className="text-sm text-muted-foreground">Please try again or contact support</p>
      </div>
    )
  }

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret,
          appearance,
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
