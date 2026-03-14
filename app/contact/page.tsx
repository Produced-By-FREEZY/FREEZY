"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, User } from "lucide-react"
import { useState } from "react"
import { Breadcrumb } from "@/components/breadcrumb"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit contact form")
      }

      setIsSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              GET IN TOUCH
            </h1>
            <p className="text-muted-foreground text-lg">
              Have questions about beats, licensing, or custom production? Reach out and let's create something amazing
              together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 py-8">
            <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg bg-muted/30 border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground">contact@freezy.ca</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg bg-muted/30 border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Response Time</h3>
              <p className="text-sm text-muted-foreground">Within 24 hours</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg bg-muted/30 border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Custom Work</h3>
              <p className="text-sm text-muted-foreground">Available for hire</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-muted/30 p-8 rounded-lg border border-border">
            {isSuccess && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-center">
                Message sent successfully! We'll get back to you within 24 hours.
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                disabled={isLoading}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Tell me more about your project or inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                disabled={isLoading}
                className="bg-background resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-[#8c52ff] hover:bg-[#8c52ff]/90 text-white shadow-lg shadow-[#8c52ff]/20"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>
              For urgent inquiries or custom production requests, please include your deadline and budget in the
              message.
            </p>
            <p>All messages are responded to within 24 hours during business days.</p>
          </div>
        </div>
      </div>

      <NewsletterSection />
      <Footer />
    </div>
  )
}
