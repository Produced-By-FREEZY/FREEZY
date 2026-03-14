import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { Breadcrumb } from "@/components/breadcrumb"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />

          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using FЯEEZY's beat store, you accept and agree to be bound by the terms and provision
                of this agreement. If you do not agree to these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (beats/instrumentals) on
                FЯEEZY's website for personal, non-commercial transitory viewing only. This is the grant of a license,
                not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose without purchasing a license</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Beat Licenses</h2>
              <p className="text-muted-foreground leading-relaxed">
                All beats are sold under specific license agreements. Each license type (Basic, Pro, Pro XL, Exclusive)
                has different terms and usage rights. Please review the License Agreement page for detailed information
                about each license type.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                All sales are final. Due to the digital nature of our products, we do not offer refunds once a beat has
                been downloaded. Please listen to the preview carefully before making a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All beats, instrumentals, and content on this website are the intellectual property of FЯEEZY.
                Purchasing a license grants you specific usage rights but does not transfer ownership of the underlying
                composition.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on FЯEEZY's website are provided on an 'as is' basis. FЯEEZY makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall FЯEEZY or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on FЯEEZY's website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at contact@freezy.ca
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
