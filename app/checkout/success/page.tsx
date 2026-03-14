"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

function SuccessContent() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<{
    title: string
    license: string
    price: string
    bpm?: string
    image?: string
    itemType: "beat" | "kit"
  } | null>(null)

  useEffect(() => {
    const title = searchParams.get("title")
    const license = searchParams.get("license")
    const price = searchParams.get("price")
    const bpm = searchParams.get("bpm")
    const image = searchParams.get("image")
    const itemType = (searchParams.get("itemType") as "beat" | "kit") || "beat"

    if (title && license && price) {
      setOrderDetails({
        title,
        license,
        price,
        bpm: bpm || undefined,
        image: image || undefined,
        itemType,
      })
    }
  }, [searchParams])

  const browseLink = orderDetails?.itemType === "kit" ? "/kits" : "/beats"
  const browseLinkText = orderDetails?.itemType === "kit" ? "Browse More Kits" : "Browse More Beats"

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-card border-border space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-green-500/10 p-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Order Confirmed!</h1>
              <p className="text-muted-foreground">Thank you for your purchase</p>
            </div>

            {/* Order Details */}
            {orderDetails && (
              <div className="space-y-6 border-t border-border pt-6">
                <h2 className="text-xl font-bold text-foreground">Order Details</h2>

                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  {orderDetails.image && (
                    <img
                      src={orderDetails.image || "/placeholder.svg"}
                      alt={orderDetails.title}
                      className="w-20 h-20 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{orderDetails.title}</h3>
                    {orderDetails.bpm && <p className="text-sm text-muted-foreground">({orderDetails.bpm} BPM)</p>}
                    <p className="text-sm text-muted-foreground">Produced by: FЯEEZY</p>
                  </div>
                  <Badge className="bg-[#8c52ff] text-white">{orderDetails.license}</Badge>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-foreground">Total Paid</span>
                    <span className="text-[#8c52ff]">${orderDetails.price}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Important Information */}
            <div className="space-y-4 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-[#8c52ff] mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">What's Next?</h3>
                  <p className="text-sm text-muted-foreground">You will receive an email shortly with:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>Your {orderDetails?.itemType === "kit" ? "kit" : "beat"} download link</li>
                    <li>License agreement PDF</li>
                    <li>Order receipt and invoice</li>
                    <li>Instructions for using your {orderDetails?.itemType === "kit" ? "samples" : "beat"}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={browseLink} className="flex-1">
                <Button className="w-full bg-[#8c52ff] hover:bg-[#7a45e6]">{browseLinkText}</Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </Link>
            </div>

            {/* Support Note */}
            <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
              <p>
                Questions? Check your email or{" "}
                <Link href="/contact" className="text-[#8c52ff] hover:underline">
                  contact us
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Loading order confirmation...</p>
            </div>
          </div>
          <Footer />
        </>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
