import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { Check } from "lucide-react"
import { Breadcrumb } from "@/components/breadcrumb"

export default function LicenseAgreementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "License Agreement" }]} />

          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            License Agreement
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              This License Agreement outlines the terms and conditions for the use of beats and instrumentals purchased
              from FЯEEZY. Please read carefully before making a purchase.
            </p>

            <section className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Basic License - $30</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>MP3 Download (320kbps)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Non-Profit Use Only</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Up to 2,000 Streams</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>1 Music Video</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Tagged Version (Producer tag remains)</span>
                </li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Pro License - $75</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>WAV Download</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>For-Profit Use (Streaming, Sales)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Up to 10,000 Streams</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>3 Music Videos</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Untagged Version</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Trackout Stems Included</span>
                </li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Pro XL License - $100</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>WAV Download</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Trackout Stems Included</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Unlimited Streams</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Unlimited Music Videos</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Untagged Version</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Distribution Copies: 5,000</span>
                </li>
              </ul>
            </section>

            <section className="bg-card border border-primary/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Exclusive Rights</h2>
              <p className="text-muted-foreground mb-4">
                For exclusive rights to a beat, please contact us directly. Exclusive rights include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>WAV Download</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Trackout Stems Included</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Full Ownership Rights</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Beat Removed from Store</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Unlimited Streams and Distribution</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>All Files (WAV, MP3, Stems, Project Files)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Publishing Rights Negotiable</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">General Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  <strong className="text-foreground">Credit:</strong> Producer credit must be given as "Produced by
                  FЯEEZY" on all releases using non-exclusive licenses.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Distribution:</strong> You may distribute your song on all major
                  platforms (Spotify, Apple Music, YouTube, etc.) according to your license terms.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Performances:</strong> You may perform songs created with licensed
                  beats at live shows and concerts.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Modifications:</strong> You may modify the beat (add/remove
                  elements, change arrangement) for your creative purposes.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Resale:</strong> You may NOT resell, redistribute, or sublicense
                  the beat to other parties.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Multiple Sales:</strong> Non-exclusive licenses may be sold to
                  multiple artists. Only exclusive rights guarantee sole ownership.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact for Licensing Questions</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about licensing or need a custom license agreement, please contact us at
                contact@freezy.ca
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-12">Last updated: January 2025</p>
          </div>
        </div>
      </main>

      <NewsletterSection />
      <Footer />
    </div>
  )
}
