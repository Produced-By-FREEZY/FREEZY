"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Breadcrumb } from "@/components/breadcrumb"
import { KitFilterSidebar, type KitFilterState } from "@/components/kit-filter-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

interface Kit {
  id: string
  title: string
  price: number
  image: string
  category: string
  description: string
  previewUrls: string[]
  createdBy: string
  isFeatured: boolean
  tags?: string[]
  moods?: string[]
  lemonSqueezyVariantId?: string // Added lemonSqueezyVariantId to store each kit's unique variant ID
  fileSize?: string // Added new fields for kit details
  itemCount?: number
  fileTypes?: string
}

export default function KitsPage() {
  const [kits, setKits] = useState<Kit[]>([])
  const [filteredKits, setFilteredKits] = useState<Kit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<KitFilterState | undefined>(undefined)
  const [sortBy, setSortBy] = useState("newest")
  const [displayCount, setDisplayCount] = useState(25)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    async function fetchKits() {
      try {
        console.log("[v0] Fetching kits from API...")
        const response = await fetch("/api/kits")

        if (!response.ok) {
          throw new Error(`Failed to fetch kits: ${response.statusText}`)
        }

        const data = await response.json()
        console.log("[v0] Kits fetched successfully:", data)
        setKits(data.kits || [])
        setFilteredKits(data.kits || [])
      } catch (err) {
        console.error("[v0] Error fetching kits:", err)
        setError(err instanceof Error ? err.message : "Failed to load kits")
      } finally {
        setLoading(false)
      }
    }

    fetchKits()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setDisplayCount(25)
  }, [filters])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const filteredKitsMemo = useMemo(() => {
    let filtered = [...kits]

    if (!filters) return filtered

    if (filters.showFeaturedOnly) {
      filtered = filtered.filter((kit) => kit.isFeatured)
    }

    if (filters.priceRange) {
      filtered = filtered.filter((kit) => kit.price >= filters.priceRange[0] && kit.price <= filters.priceRange[1])
    }

    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter((kit) => filters.selectedCategories.includes(kit.category))
    }

    if (filters.selectedTags.length > 0) {
      filtered = filtered.filter((kit) => kit.tags?.some((tag) => filters.selectedTags.includes(tag)))
    }

    if (filters.selectedMoods.length > 0) {
      filtered = filtered.filter((kit) => kit.moods?.some((mood) => filters.selectedMoods.includes(mood)))
    }

    switch (sortBy) {
      case "oldest":
        filtered.sort((a, b) => a.id.localeCompare(b.id))
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "popular":
        // Keep default order for now
        break
      case "newest":
      default:
        filtered.sort((a, b) => b.id.localeCompare(a.id))
        break
    }

    return filtered
  }, [filters, kits, sortBy])

  const displayedKits = filteredKitsMemo.slice(0, displayCount)
  const hasMore = displayCount < filteredKitsMemo.length

  const loadMore = () => {
    setDisplayCount((prev) => prev + 25)
  }

  const handleClearFilters = () => {
    setFilters(undefined)
    setSortBy("newest")
  }

  const hasActiveFilters = useMemo(() => {
    if (!filters) return false
    return (
      filters.selectedCategories.length > 0 ||
      filters.selectedTags.length > 0 ||
      filters.selectedMoods.length > 0 ||
      filters.showFeaturedOnly ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 200
    )
  }, [filters])

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "All Kits" }]} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">All Kits</h1>
          <p className="text-muted-foreground">
            Browse the complete collection of sample packs, drum kits, and sound kits by FЯEEZY
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <KitFilterSidebar onFiltersChange={setFilters} onClearFilters={handleClearFilters} />

          <div className="flex-1">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8c52ff] border-r-transparent"></div>
                <p className="mt-4 text-muted-foreground">Loading kits...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <p className="text-sm text-muted-foreground">
                  Make sure NOTION_KITS_DATABASE_ID is set in your environment variables
                </p>
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">All Kits</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {filteredKitsMemo.length} kit{filteredKitsMemo.length !== 1 ? "s" : ""} available
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        className="bg-[#8c52ff] text-white hover:bg-[#7a45e8]"
                      >
                        Clear Filters
                      </Button>
                    )}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {filteredKitsMemo.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground mb-2">No kits found</p>
                    <p className="text-sm text-muted-foreground">
                      {kits.length === 0
                        ? "Add some kits to your Notion database!"
                        : "Try adjusting your filters to find what you're looking for"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {displayedKits.map((kit) => (
                        <ProductCard
                          key={kit.id}
                          title={kit.title}
                          price={`$${kit.price.toFixed(2)}`}
                          image={kit.image}
                          category={kit.category}
                          tags={kit.tags}
                          previewUrls={kit.previewUrls}
                          description={kit.description}
                          lemonSqueezyVariantId={kit.lemonSqueezyVariantId} // Pass lemonSqueezyVariantId to ProductCard
                          fileSize={kit.fileSize} // Pass new fields to ProductCard
                          itemCount={kit.itemCount}
                          fileTypes={kit.fileTypes}
                        />
                      ))}
                    </div>

                    {hasMore && (
                      <div className="flex justify-center pt-8">
                        <Button variant="outline" size="lg" onClick={loadMore}>
                          SHOW MORE
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-[#8c52ff] hover:bg-[#7a45e8] text-white shadow-lg flex items-center justify-center transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <Footer />
    </div>
  )
}
