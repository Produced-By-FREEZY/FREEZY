"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Breadcrumb } from "@/components/breadcrumb"
import { getLicenseByName } from "@/lib/products"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import StripeCheckout from "@/components/stripe-checkout"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const [beatTitle, setBeatTitle] = useState("")
  const [beatBpm, setBeatBpm] = useState("")
  const [beatImage, setBeatImage] = useState("")
  const [licenseType, setLicenseType] = useState("")
  const [priceId, setPriceId] = useState("") // Added state for Stripe Price ID
  const [license, setLicense] = useState<any>(null)

  useEffect(() => {
    const title = searchParams.get("title") || ""
    const bpm = searchParams.get("bpm") || ""
    const image = searchParams.get("image") || ""
    const type = searchParams.get("license") || searchParams.get("type") || ""
    const pid = searchParams.get("priceId") || "" // Get the priceId from the URL

    setBeatTitle(title)
    setBeatBpm(bpm)
    setBeatImage(image)
    setLicenseType(type)
    setPriceId(pid)

    const foundLicense = getLicenseByName(type)
    setLicense(foundLicense)
  }, [searchParams])

  // Handle Missing Data
  if (!license || !beatTitle) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Invalid Checkout</h1>
            <p className="text-muted-foreground">Missing required checkout information</p>
            <Link href="/beats">
              <Button className="bg-[#8c52ff] hover:bg-[#7a45e6]">Browse Beats</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Handle Exclusive Rights (Redirect to Contact)
  if (license.name === "Exclusive") {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "All Beats", href: "/beats" }, { label: "Checkout" }]}
            />
            <Link
              href="/beats"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Beats
            </Link>
            <Card className="p-8 bg-card border-border space-y-6">
              <h1 className="text-3xl font-bold text-foreground">Exclusive Rights</h1>
              <p className="text-muted-foreground">
                Exclusive rights require custom pricing and negotiation. Please contact us directly to discuss exclusive
                licensing for this beat.
              </p>
              <div className="flex gap-4">
                <Link href={`/contact?title=${encodeURIComponent(beatTitle)}&type=exclusive`} className="flex-1">
                  <Button className="w-full bg-[#8c52ff] hover:bg-[#7a45e6]">Make an Offer</Button>
                </Link>
                <Link href="/beats" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Browse Other Beats
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "All Beats", href: "/beats" }, { label: "Checkout" }]}
          />

          <Link
            href="/beats"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Beats
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground text-white">Checkout</h1>

              <Card className="p-6 bg-card border-border space-y-6">
                <h2 className="text-xl font-bold text-foreground text-white">Order Summary</h2>

                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <img
                    src={beatImage || "/placeholder.svg"}
                    alt={beatTitle}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{beatTitle}</h3>
                    {beatBpm && <p className="text-sm text-muted-foreground">({beatBpm} BPM)</p>}
                    <p className="text-sm text-muted-foreground">Produced by: FЯEEZY</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">License Type</span>
                    <Badge className="bg-[#8c52ff] text-white">{license.name}</Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white">Includes:</p>
                    <ul className="space-y-1">
                      {license.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-[#8c52ff] mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-[#8c52ff]">${(license.priceInCents / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Payment */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Payment</h2>
              <Card className="p-6 bg-card border-border">
                {/* PASSING THE PRICE ID HERE FIXES THE STRIPE ERROR */}
                <StripeCheckout
                  priceId={priceId} 
                  productName={`${beatTitle} - ${license.name} License`}
                  productDescription={`${beatBpm ? `${beatBpm} BPM ` : ""}Beat produced by FЯEEZY`}
                  priceInCents={license.priceInCents}
                  productImage={beatImage}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Loading checkout...</p>
            </div>
          </div>
          <Footer />
        </>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
