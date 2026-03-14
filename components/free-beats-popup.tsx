"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, CheckCircle2 } from "lucide-react"

export function FreeBeatsPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [contactMode, setContactMode] = useState<"email" | "phone">("email")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Check if popup has been shown in this session
    const hasShownPopup = sessionStorage.getItem("freeBeatsPopupShown")

    if (!hasShownPopup) {
      // Show popup after 5-7 seconds (random between 5000-7000ms)
      const delay = Math.floor(Math.random() * 2000) + 5000
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem("freeBeatsPopupShown", "true")
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !agreed) {
      return
    }

    if (contactMode === "email" && (!email || !email.includes("@"))) {
      return
    }

    if (contactMode === "phone" && !phone) {
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Close popup after showing success message
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const toggleContactMode = () => {
    setContactMode(contactMode === "email" ? "phone" : "email")
    setEmail("")
    setPhone("")
  }

  if (!isOpen) return null

  return (
    <>
      <button
        onClick={handleClose}
        className="fixed right-6 top-6 z-[100] rounded-full bg-white/10 p-2 backdrop-blur-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-white/20 focus:outline-none"
        aria-label="Close popup"
      >
        <X className="h-5 w-5 text-white" />
      </button>

      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm pointer-events-none" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="animated-border-glow pointer-events-auto max-w-lg w-full">
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a0a2e] rounded-lg overflow-hidden shadow-2xl relative p-10">
            {/* Decorative gradient orb */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8c52ff]/20 rounded-full blur-3xl" />

            <div className="relative space-y-8">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#8c52ff]/20 flex items-center justify-center border border-[#8c52ff]/30">
                  <Gift className="w-8 h-8 text-[#8c52ff]" />
                </div>
              </div>

              {!isSuccess ? (
                <>
                  {/* Heading */}
                  <div className="text-center space-y-3">
                    <h2 className="text-3xl font-bold text-white">Get x5 Free Beats!</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Exclusive collection of premium beats, absolutely free. No strings attached.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#8c52ff] focus:ring-[#8c52ff] h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor={contactMode} className="text-sm font-medium text-gray-300">
                        Where should we send your free beats?
                      </label>
                      {contactMode === "email" ? (
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#8c52ff] focus:ring-[#8c52ff] h-11"
                        />
                      ) : (
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#8c52ff] focus:ring-[#8c52ff] h-11"
                        />
                      )}
                      {/* Toggle link */}
                      <button
                        type="button"
                        onClick={toggleContactMode}
                        className="text-xs text-[#8c52ff] hover:text-[#7a3fee] transition-colors underline mt-2"
                      >
                        {contactMode === "email"
                          ? "Click here to sign up with phone number instead"
                          : "Click here to sign up with email instead"}
                      </button>
                    </div>

                    {/* Agreement text */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-[#8c52ff] focus:ring-[#8c52ff] focus:ring-offset-0 cursor-pointer"
                      />
                      <label htmlFor="agree" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                        I agree to subscribe to FЯEEZY's newsletter and promotional content. I can unsubscribe anytime.
                      </label>
                    </div>

                    {/* Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting || !agreed}
                      className="w-full bg-[#8c52ff] hover:bg-[#7a3fee] text-white font-semibold py-3 h-12 text-sm transition-all duration-200 shadow-lg shadow-[#8c52ff]/20 hover:shadow-[#8c52ff]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Me Free Beats"}
                    </Button>
                  </form>

                  <p className="text-xs text-center text-gray-500 pt-2">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="text-center space-y-4 py-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      Check Your {contactMode === "email" ? "Email" : "Phone"}!
                    </h3>
                    <p className="text-sm text-gray-400">
                      Your x5 free beats are on their way to{" "}
                      <span className="text-[#8c52ff]">{contactMode === "email" ? email : phone}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
