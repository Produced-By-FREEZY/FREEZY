"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, X } from "lucide-react"

interface FreeDownloadModalProps {
  isOpen: boolean
  onClose: () => void
  beatTitle: string
  beatBpm: number
  beatImage: string
  beatId: string
}

export function FreeDownloadModal({ isOpen, onClose, beatTitle, beatBpm, beatImage, beatId }: FreeDownloadModalProps) {
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [agreedToNewsletter, setAgreedToNewsletter] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: contactMethod === "email" ? email : "",
          phone: contactMethod === "phone" ? phone : "",
          source: `Free Beat Download: ${beatTitle}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      // Show success message
      setIsSuccess(true)

      // Close modal after 3 seconds
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setName("")
        setEmail("")
        setPhone("")
        setAgreedToNewsletter(false)
      }, 3000)
    } catch (error) {
      console.error("[v0] Error submitting free download:", error)
      alert("Failed to send download link. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setName("")
    setEmail("")
    setPhone("")
    setIsSuccess(false)
    setAgreedToNewsletter(false)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <button
        onClick={handleClose}
        className="fixed right-6 top-6 z-[100] rounded-full bg-white/10 p-2 backdrop-blur-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-white/20 focus:outline-none"
        aria-label="Close popup"
      >
        <X className="h-5 w-5 text-white" />
      </button>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="animated-border-glow-green pointer-events-auto max-w-md w-full">
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0a1a0a] rounded-lg overflow-hidden shadow-2xl relative p-8">
            {/* Decorative gradient orb */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />

            <div className="relative space-y-6">
              <h2 className="text-2xl font-bold text-white">Download Free Beat</h2>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <img src={beatImage || "/placeholder.svg"} alt={beatTitle} className="w-14 h-14 rounded object-cover" />
                <div>
                  <h3 className="font-semibold text-white text-sm">{beatTitle}</h3>
                  <p className="text-xs text-gray-400">({beatBpm} BPM)</p>
                  <p className="text-xs text-gray-400">Produced by: FЯEEZY</p>
                </div>
              </div>

              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Download className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Download Link Sent!</h3>
                  <p className="text-sm text-gray-400">
                    Check your {contactMethod === "email" ? "email" : "phone"} for the download link.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name-input" className="text-sm font-medium text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name-input"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 h-11"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-white">
                      Where would you like me to send your free beat?
                    </Label>

                    <RadioGroup
                      value={contactMethod}
                      onValueChange={(value) => setContactMethod(value as "email" | "phone")}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" className="border-white/20 text-green-500" />
                        <Label htmlFor="email" className="text-sm cursor-pointer text-gray-300">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" className="border-white/20 text-green-500" />
                        <Label htmlFor="phone" className="text-sm cursor-pointer text-gray-300">
                          Phone (Text Message)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {contactMethod === "email" ? (
                    <div className="space-y-2">
                      <Label htmlFor="email-input" className="text-sm font-medium text-gray-300">
                        Email Address
                      </Label>
                      <Input
                        id="email-input"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 h-11"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="phone-input" className="text-sm font-medium text-gray-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone-input"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 h-11"
                      />
                    </div>
                  )}

                  <div className="flex items-start space-x-3 py-2">
                    <Checkbox
                      id="newsletter-consent"
                      checked={agreedToNewsletter}
                      onCheckedChange={(checked) => setAgreedToNewsletter(checked as boolean)}
                      required
                      className="mt-0.5 border-white/20 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label
                      htmlFor="newsletter-consent"
                      className="text-xs text-gray-400 leading-relaxed cursor-pointer"
                    >
                      I agree, by downloading this beat I agree to subscribe to FЯEEZY's newsletter and promotional
                      content. I can unsubscribe anytime.
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !agreedToNewsletter}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 h-12 text-sm transition-all duration-200 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Download Link"}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    By downloading, you agree to our terms of service and license agreement.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
