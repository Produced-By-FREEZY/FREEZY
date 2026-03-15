"use client"

import { useCallback, useEffect, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { startCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeCheckoutProps {
  priceId: string // Added this to match the Checkout Page call
  productName: string
  productDescription: string
  priceInCents: number
  productImage?: string
}

export default function StripeCheckout({
  priceId, // Destructure priceId
  productName,
  productDescription,
  priceInCents,
  productImage,
}: StripeCheckoutProps) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("[v0] StripeCheckout mounted with:", { productName, priceId, priceInCents })

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      console.error("[v0] Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY")
      setError("Stripe is not configured")
    }
  }, [productName, priceId, priceInCents])

  const fetchClientSecret = useCallback(async () => {
    console.log("[v0] Fetching client secret for priceId:", priceId)
    
    // Safety check: if priceId is missing, Stripe will fail
    if (!priceId) {
      console.error("[v0] Cannot checkout: priceId is missing from properties")
      setError("Price ID missing - check Notion database")
      throw new Error("Missing Price ID")
    }

    try {
      // We pass priceId as the first argument to the action
      const clientSecret = await startCheckoutSession(
        priceId, 
        productName, 
        productDescription, 
        priceInCents, 
        productImage
      )
      console.log("[v0] Client secret received")
      return clientSecret
    } catch (err) {
      console.error("[v0] Error fetching client secret:", err)
      setError("Failed to initialize checkout")
      throw err
    }
  }, [priceId, productName, productDescription, priceInCents, productImage])

  if (error) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-red-500 font-semibold">{error}</p>
        <p className="text-sm text-muted-foreground">Please try again or contact support</p>
      </div>
    )
  }

  return (
    <div id="checkout" className="w-full min-h-[500px]">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret,
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
