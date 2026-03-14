import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Youtube } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-[#8c52ff] tracking-wider">FЯEEZY</div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/beats" className="text-muted-foreground hover:text-primary transition-colors">
              BROWSE BEATS
            </Link>
            <Link href="/kits" className="text-muted-foreground hover:text-primary transition-colors">
              SAMPLE PACKS & KITS
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              ABOUT
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              CONTACT
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://www.instagram.com/produced_by_freezy/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Instagram className="h-4 w-4" />
            </Button>
          </a>
          <a href="https://x.com/produced_Freezy" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Twitter className="h-4 w-4" />
            </Button>
          </a>
          <a href="https://www.youtube.com/@Produced_by_FREEZY" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Youtube className="h-4 w-4" />
            </Button>
          </a>
          <Link href="/contact">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              CONTACT
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
