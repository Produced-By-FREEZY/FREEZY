"use client"

import { useEffect, Suspense, use } from "react"
import Link from "next/link"
import { CheckCircle2, Download, Music, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

function SuccessContent({ searchParams }: { searchParams: { session_id?: string } }) {
  useEffect(() => {
    // This is where you trigger the "Purchase" Key Event for Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: searchParams.session_id,
        value: 30.00, // You can make this dynamic later
        currency: 'USD'
      });
    }
  }, [searchParams.session_id]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
      </div>
      
      <h1 className="mb-2 text-4xl font-bold text-foreground">Order Confirmed!</h1>
      <p className="mb-8 text-muted-foreground max-w-md">
        Your payment was successful. A receipt and your license files have been sent to your email.
      </p>

      <div className="grid w-full max-w-md gap-4">
        <div className="rounded-xl border border-border bg-card p-6 text-left">
          <h3 className="mb-4 font-semibold flex items-center gap-2">
            <Music className="h-4 w-4 text-primary" /> Next Steps
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary font-bold">1.</span>
              Check your inbox for the download links.
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">2.</span>
              Import the WAV trackouts into your DAW.
            </li>
            <li className="flex gap-2 text-foreground font-medium">
              <span className="text-primary font-bold">3.</span>
              Tag @FREEZY when you drop the track!
            </li>
          </ul>
        </div>

        {/* The "ROI" Section: Discount for next time */}
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Loyalty Bonus</p>
          <p className="text-sm mb-3">Get 20% off your next beat with code:</p>
          <div className="bg-background border border-dashed border-primary/50 py-2 rounded font-mono text-xl text-primary mb-4">
            FREEZY20
          </div>
          <Link href="/beats">
            <Button variant="link" className="text-primary">
              Browse More Beats <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Link href="/">
          <Button className="w-full py-6 text-lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default function SuccessPage(props: SuccessPageProps) {
  const searchParams = use(props.searchParams)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4">
        <Suspense fallback={<div className="py-20 text-center">Loading your order...</div>}>
          <SuccessContent searchParams={searchParams} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
