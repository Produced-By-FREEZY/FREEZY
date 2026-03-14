"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Gift, Music, Headphones, Download } from "lucide-react"

export default function FreeBeatsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [contactMode, setContactMode] = useState<"email" | "phone">("email")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !agreed) return
    if (contactMode === "email" && (!email || !email.includes("@"))) {
      setError("Please enter a valid email address.")
      return
    }
    if (contactMode === "phone" && !phone) {
      setError("Please enter a valid phone number.")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email: contactMode === "email" ? email : undefined,
          phone: contactMode === "phone" ? phone : undefined,
          agreed,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Submission failed")
      }

      setIsSuccess(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Free Beats" }]} />

        {!isSuccess ? (
          <div className="max-w-5xl mx-auto mt-8">
            {/* Page heading */}
            <div className="text-center space-y-4 mb-14">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                GET x5 FREE BEATS
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Sign up below and we'll send you an exclusive collection of 5 premium beats by FЯEEZY — completely free.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Left — what you get */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground">What's Included</h2>
                  <div className="space-y-3">
                    {[
                      { icon: Music, label: "5 Premium Beats", sub: "Hand-picked across multiple genres" },
                      { icon: Headphones, label: "High-Quality Audio", sub: "Studio-ready WAV & MP3 files" },
                      { icon: Download, label: "Instant Delivery", sub: "Sent directly to your inbox" },
                      { icon: Gift, label: "100% Free", sub: "No credit card required, ever" },
                    ].map(({ icon: Icon, label, sub }) => (
                      <div
                        key={label}
                        className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                  <p className="text-sm font-semibold text-primary">Why sign up?</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Join hundreds of artists already using FЯEEZY beats to create chart-topping music. Get exclusive
                    early access to new releases, special discounts, and more.
                  </p>
                </div>
              </div>

              {/* Right — form */}
              <div className="bg-muted/30 border border-border rounded-lg p-8 space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-foreground">Claim Your Free Beats</h2>
                  <p className="text-sm text-muted-foreground">Enter your details below to receive your pack.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>

                  {/* Email or Phone */}
                  <div className="space-y-2">
                    <Label htmlFor={contactMode}>
                      {contactMode === "email" ? "Email Address" : "Phone Number"}
                    </Label>
                    {contactMode === "email" ? (
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background"
                      />
                    ) : (
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="bg-background"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setContactMode(contactMode === "email" ? "phone" : "email")
                        setEmail("")
                        setPhone("")
                      }}
                      className="text-xs text-primary hover:text-primary/80 transition-colors underline"
                    >
                      {contactMode === "email"
                        ? "Sign up with phone number instead"
                        : "Sign up with email instead"}
                    </button>
                  </div>

                  {/* Agreement */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                      className="mt-1 h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      I agree to subscribe to FЯEEZY's newsletter and receive promotional content. I can unsubscribe
                      at any time.
                    </label>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs text-center">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !agreed}
                    className="w-full bg-[#8c52ff] hover:bg-[#8c52ff]/90 text-white shadow-lg shadow-[#8c52ff]/20"
                  >
                    {isSubmitting ? "Sending..." : "Claim My x5 Free Beats"}
                  </Button>
                </form>

                <p className="text-xs text-center text-muted-foreground">
                  We respect your privacy. Your information will never be shared or sold.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Success state */
          <div className="max-w-2xl mx-auto mt-16 text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-foreground">You're In!</h1>
              <p className="text-muted-foreground text-lg">
                Thanks for signing up, <span className="text-foreground font-semibold">{name}</span>! Your x5 free
                beats are on their way to{" "}
                <span className="text-primary font-semibold">
                  {contactMode === "email" ? email : phone}
                </span>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#8c52ff] hover:bg-[#8c52ff]/90 text-white shadow-lg shadow-[#8c52ff]/20"
              >
                <a href="/beats">Browse More Beats</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
