"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function NewsletterSection() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!fullName || !email || !agreed) {
      setError("Please enter your name, email and agree to receive newsletters")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          source: "newsletter",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe")
      }

      setIsSuccess(true)
      setFullName("")
      setEmail("")
      setAgreed(false)

      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err: any) {
      setError(err.message || "Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-gradient-to-b from-primary/5 to-background border-y border-border py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            STAY IN THE LOOP
          </h2>
          <p className="text-sm text-muted-foreground">
            Get notified about new beat releases, exclusive discounts, free downloads, and production tips delivered
            straight to your inbox!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading || isSuccess}
              className="max-w-md mx-auto bg-background border-primary/20 focus:border-primary"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isSuccess}
              className="max-w-md mx-auto bg-background border-primary/20 focus:border-primary"
            />
            <div className="flex items-start gap-2 justify-center text-left max-w-md mx-auto">
              <Checkbox
                id="newsletter-agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                disabled={isLoading || isSuccess}
              />
              <Label
                htmlFor="newsletter-agree"
                className="text-xs text-muted-foreground cursor-pointer leading-relaxed"
              >
                Yes, I agree to receive email newsletters. I am aware that I can unsubscribe at any time.
              </Label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {isSuccess && <p className="text-sm text-green-500">Successfully subscribed! Check your inbox.</p>}
            <Button
              type="submit"
              size="lg"
              disabled={isLoading || isSuccess}
              className="bg-[#8c52ff] hover:bg-[#8c52ff]/90 text-white shadow-lg shadow-[#8c52ff]/20"
            >
              {isLoading ? "Subscribing..." : isSuccess ? "Subscribed!" : "Subscribe Now"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
