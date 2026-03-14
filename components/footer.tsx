import Link from "next/link"
import { Instagram, Twitter, Youtube, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="text-2xl font-bold text-[#8c52ff] tracking-wider">FЯEEZY</div>
            <p className="text-sm text-muted-foreground">
              Premium beats for your next hit. Crafted with passion, delivered with quality.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/produced_by_freezy/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Instagram className="h-4 w-4 text-primary" />
              </a>
              <a
                href="https://x.com/produced_Freezy"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Twitter className="h-4 w-4 text-primary" />
              </a>
              <a
                href="https://www.youtube.com/@Produced_by_FREEZY"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Youtube className="h-4 w-4 text-primary" />
              </a>
              <Link
                href="/contact"
                className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/beats" className="text-muted-foreground hover:text-primary transition-colors">
                Browse Beats
              </Link>
              <Link href="/kits" className="text-muted-foreground hover:text-primary transition-colors">
                Sample Packs & Kits
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Legal</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/license-agreement" className="text-muted-foreground hover:text-primary transition-colors">
                License Agreement
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center space-y-3">
          <p className="text-sm text-muted-foreground">© 2025 FЯEEZY. All rights reserved.</p>

          <p className="text-sm text-muted-foreground">
            Managed by{" "}
            <a
              href="https://www.synapticsound.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 inline-block"
            >
              Synaptic Sound
            </a>
          </p>

          <p className="text-sm text-muted-foreground">
            Designed by{" "}
            <a
              href="https://www.mythicmarketing.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 inline-block"
            >
              Mythic Marketing
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
