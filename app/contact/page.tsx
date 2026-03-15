"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Music, DollarSign } from "lucide-react"

function ExclusiveContactContent() {
  const searchParams = useSearchParams()
  const beatTitle = searchParams.get("title") || "Selected Beat"
  const beatImage = searchParams.get("image") || ""
  
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Here you would connect to your Make.com webhook or an email API
    // Example: await fetch('/api/send-offer', { method: 'POST', body: JSON.stringify(formData) })
    
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Offer Received</h1>
        <p className="text-muted-foreground mb-8">
          Your offer for <strong>{beatTitle}</strong> has been sent directly to FЯEEZY. 
          We will review it and contact you via email within 24 hours.
        </p>
        <Button onClick={() => window.location.href = '/beats'}>Return to Marketplace</Button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Beat Info & Perks */}
        <div className="space-y-8">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">Exclusive Inquiry</Badge>
            <h1 className="text-4xl font-black tracking-tighter mb-4">MAKE AN OFFER</h1>
            <p className="text-muted-foreground">
              You are inquiring about full ownership and exclusive rights for:
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border">
            {beatImage && <img src={beatImage} alt={beatTitle} className="w-20 h-20 rounded-lg object-cover shadow-2xl" />}
            <div>
              <h2 className="text-xl font-bold text-white">{beatTitle}</h2>
              <p className="text-sm text-primary font-medium">Produced by FЯEEZY</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg uppercase tracking-widest text-white/70">What's Included:</h3>
            <ul className="space-y-3">
              {[
                "Full Ownership Rights",
                "WAV + Trackout Stems",
                "Unlimited Everything",
                "Beat Removed from Store",
                "Producer Credit Optional"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="bg-card border border-border p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase text-gray-400">Your Full Name</label>
              <Input required placeholder="John Doe" className="bg-muted/50 border-border" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase text-gray-400">Email Address</label>
              <Input required type="email" placeholder="john@example.com" className="bg-muted/50 border-border" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase text-gray-400">What would you like to pay?</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <Input 
                  required 
                  type="number" 
                  placeholder="e.g. 2500" 
                  className="pl-10 bg-muted/50 border-border text-lg font-bold" 
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 italic">
                *Exclusive licenses typically start at $1,000+
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase text-gray-400">Additional Notes / Project Details</label>
              <Textarea 
                placeholder="Tell us about your project or plans for this track..." 
                className="bg-muted/50 border-border min-h-[100px]"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full py-6 text-lg font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white"
            >
              {loading ? "Sending Offer..." : "Submit Exclusive Offer"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  )
}

// Main page component with Suspense boundary
export default function ExclusiveContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<div className="py-20 text-center">Loading inquiry...</div>}>
        <ExclusiveContactContent />
      </Suspense>
      <Footer />
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${className}`}>
      {children}
    </span>
  )
}
