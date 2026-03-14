"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Package, Download, Infinity, Shield, HardDrive, Hash } from "lucide-react"
import { Breadcrumb } from "@/components/breadcrumb"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import StripeCheckout from "@/components/stripe-checkout"

function KitCheckoutContent() {
  const searchParams = useSearchParams()
  const [kitTitle, setKitTitle] = useState("")
  const [kitImage, setKitImage] = useState("")
  const [kitCategory, setKitCategory] = useState("")
  const [kitPrice, setKitPrice] = useState(0)
  const [kitDescription, setKitDescription] = useState("")
  const [fileSize, setFileSize] = useState("")
  const [itemCount, setItemCount] = useState(0)
  const [fileTypes, setFileTypes] = useState("")

  useEffect(() => {
    const title = searchParams.get("title") || ""
    const image = searchParams.get("image") || ""
    const category = searchParams.get("category") || ""
    const price = Number.parseFloat(searchParams.get("price") || "0")
    const description = searchParams.get("description") || ""
    const size = searchParams.get("fileSize") || ""
    const count = Number.parseInt(searchParams.get("itemCount") || "0")
    const types = searchParams.get("fileTypes") || ""

    setKitTitle(title)
    setKitImage(image)
    setKitCategory(category)
    setKitPrice(price)
    setKitDescription(description)
    setFileSize(size)
    setItemCount(count)
    setFileTypes(types)
  }, [searchParams])

  if (!kitTitle || kitPrice === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="text-center space-y-4 max-w-lg">
            <h1 className="text-2xl font-bold text-foreground">Invalid Checkout</h1>
            <p className="text-muted-foreground">Missing required checkout information</p>
            <Link href="/kits">
              <Button className="bg-[#8c52ff] hover:bg-[#7a45e6]">Browse Kits</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const kitIncludes = [
    { icon: Download, text: "Instant Digital Download" },
    { icon: Package, text: fileTypes || "All Files (WAV, MIDI, Presets)" },
    { icon: Infinity, text: "Unlimited Use in Productions" },
    { icon: Shield, text: "Royalty-Free Commercial License" },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Sample Packs & Kits", href: "/kits" },
              { label: "Checkout" },
            ]}
          />

          <Link
            href="/kits"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Kits
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">Checkout</h1>

              <Card className="p-6 bg-card border-border space-y-6">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <img
                      src={kitImage || "/placeholder.svg?height=120&width=120"}
                      alt={kitTitle}
                      className="w-24 h-24 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-foreground">{kitTitle}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Produced by: FЯEEZY</p>
                      <div className="mt-2">
                        <span className="inline-block bg-[#8c52ff]/20 text-[#8c52ff] px-3 py-1 text-xs font-bold rounded uppercase">
                          {kitCategory || "SAMPLE PACK"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {kitDescription && (
                    <div className="px-4 py-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground leading-relaxed">{kitDescription}</p>
                    </div>
                  )}

                  {(fileSize || itemCount > 0) && (
                    <div className="grid grid-cols-2 gap-3 px-4 py-3 bg-muted/30 rounded-lg">
                      {fileSize && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#8c52ff]/10 flex items-center justify-center flex-shrink-0">
                            <HardDrive className="w-4 h-4 text-[#8c52ff]" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">File Size</p>
                            <p className="text-sm font-semibold text-foreground">{fileSize}</p>
                          </div>
                        </div>
                      )}
                      {itemCount > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#8c52ff]/10 flex items-center justify-center flex-shrink-0">
                            <Hash className="w-4 h-4 text-[#8c52ff]" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Total Items</p>
                            <p className="text-sm font-semibold text-foreground">{itemCount} Files</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <p className="text-sm font-semibold text-foreground uppercase tracking-wide">What's Included</p>
                    <div className="space-y-3">
                      {kitIncludes.map((item) => {
                        const Icon = item.icon
                        return (
                          <div key={item.text} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#8c52ff]/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-[#8c52ff]" />
                            </div>
                            <span className="text-sm text-foreground">{item.text}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 mt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-[#8c52ff]">${kitPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">One-time payment • No subscriptions</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">Payment</h2>
              <Card className="p-6 bg-card border-border">
                <StripeCheckout
                  productName={kitTitle}
                  productDescription={kitDescription || `${kitCategory || "Sample Pack"} produced by FЯEEZY`}
                  priceInCents={Math.round(kitPrice * 100)}
                  productImage={kitImage}
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

export default function KitCheckoutPage() {
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
      <KitCheckoutContent />
    </Suspense>
  )
}
