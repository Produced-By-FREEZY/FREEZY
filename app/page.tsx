import { Header } from "@/components/header"
import { SearchHero } from "@/components/search-hero"
import { FeaturedSection } from "@/components/featured-section"
import { StoreSection } from "@/components/store-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { FeaturesSection } from "@/components/features-section"
import { ArtistDirectory } from "@/components/artist-directory"
import { Footer } from "@/components/footer"
import { FreeBeatsPopup } from "@/components/free-beats-popup"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchHero />

      <FeaturedSection />

      <div className="container mx-auto px-4 pb-12 flex justify-center">
        <Link href="/beats">
          <Button size="lg" className="bg-[#8c52ff] hover:bg-[#8c52ff]/90 text-white shadow-lg shadow-[#8c52ff]/20">
            VIEW ALL BEATS
          </Button>
        </Link>
      </div>

      <StoreSection />
      <FeaturesSection />
      <NewsletterSection />
      <ArtistDirectory />
      <Footer />

      <FreeBeatsPopup />
    </div>
  )
}
